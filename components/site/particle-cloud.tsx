"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

/** Палитра частиц: фиолетовый доминирует, янтарь и бирюза — искры */
const PALETTE = [
  "#8052ff", "#8052ff", "#a07bff", "#6a3dff",
  "#ffb829", "#ffcf6b",
  "#15846e", "#2ec4a6",
  "#ff5c8a", "#4f7cff", "#c77dff",
]
const DEPTH_BUCKETS = 3
const INTRO_MS = 2200
const MOUSE_RADIUS = 130
const MOUSE_FORCE = 38

type Particle = {
  // Позиция на «облаке» в 3D (единичные координаты)
  x: number; y: number; z: number
  // Стартовая позиция для интро (экранные доли)
  sx: number; sy: number
  // Смещение от курсора (плавно затухает)
  ox: number; oy: number
  size: number; rot: number; spin: number; color: number
}

type Ambient = {
  x: number; y: number; vx: number; vy: number
  size: number; rot: number; spin: number; color: number
}

/** Детерминированный ГПСЧ — облако одинаковое при каждой загрузке */
function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const MASK = 300

/** Монограмма KV из толстых линий — одинаково на любой ОС, без зависимости от шрифтов */
function drawMonogram(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = "#fff"
  ctx.lineWidth = 30
  ctx.lineJoin = "miter"
  ctx.lineCap = "butt"
  ctx.beginPath()
  ctx.moveTo(48, 70) // K: ствол
  ctx.lineTo(48, 230)
  ctx.moveTo(52, 162) // K: верхняя ветвь
  ctx.lineTo(140, 70)
  ctx.moveTo(84, 128) // K: нижняя ветвь
  ctx.lineTo(146, 230)
  ctx.moveTo(166, 70) // V
  ctx.lineTo(220, 228)
  ctx.lineTo(274, 70)
  ctx.stroke()
}

/** Точки монограммы: контур читается глазом, заливка даёт объём */
function createMonogram(count: number, rand: () => number): Particle[] {
  const mask = document.createElement("canvas")
  mask.width = MASK
  mask.height = MASK
  const mctx = mask.getContext("2d")
  if (!mctx) return []
  drawMonogram(mctx)
  const data = mctx.getImageData(0, 0, MASK, MASK).data
  const inside = (x: number, y: number) =>
    x >= 0 && x < MASK && y >= 0 && y < MASK && data[(y * MASK + x) * 4 + 3] > 128

  const edge: number[] = []
  const fill: number[] = []
  for (let y = 0; y < MASK; y += 2) {
    for (let x = 0; x < MASK; x += 2) {
      if (!inside(x, y)) continue
      const isEdge = !inside(x - 3, y) || !inside(x + 3, y) || !inside(x, y - 3) || !inside(x, y + 3)
      ;(isEdge ? edge : fill).push(x, y)
    }
  }

  return Array.from({ length: count }, () => {
    const useEdge = rand() < 0.6
    const pool = useEdge ? edge : fill
    const i = Math.floor(rand() * (pool.length / 2)) * 2
    const px = pool[i] + (rand() - 0.5) * 2
    const py = pool[i + 1] + (rand() - 0.5) * 2
    return {
      x: (px / MASK) * 2 - 1,
      y: (py / MASK) * 2 - 1,
      // Буквы — «толстые плиты»: заливка получает глубину, контур почти плоский
      z: (rand() - 0.5) * (useEdge ? 0.08 : 0.3),
      sx: rand() * 1.6 - 0.3, sy: rand() * 1.6 - 0.3,
      ox: 0, oy: 0,
      size: 1.4 + rand() * 2.4,
      rot: rand() * Math.PI * 2,
      spin: (rand() - 0.5) * 0.02,
      color: Math.floor(rand() * PALETTE.length),
    }
  })
}

function createAmbient(count: number, rand: () => number): Ambient[] {
  return Array.from({ length: count }, () => ({
    x: rand(), y: rand(),
    vx: (rand() - 0.5) * 0.00012, vy: (rand() - 0.5) * 0.00012,
    size: 1.5 + rand() * 2.5,
    rot: rand() * Math.PI * 2,
    spin: (rand() - 0.5) * 0.01,
    color: Math.floor(rand() * PALETTE.length),
  }))
}

/** CanvasPath — общий интерфейс Path2D и контекста canvas */
function triangle(ctx: CanvasPath, x: number, y: number, s: number, rot: number) {
  for (let i = 0; i < 3; i++) {
    const a = rot + (i * Math.PI * 2) / 3
    const px = x + Math.cos(a) * s
    const py = y + Math.sin(a) * s
    if (i === 0) ctx.moveTo(px, py)
    else ctx.lineTo(px, py)
  }
  ctx.closePath()
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

export function ParticleCloud({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const rand = mulberry32(42)
    const isSmall = window.innerWidth < 768
    const cloud = createMonogram(isSmall ? 900 : 2000, rand)
    const ambient = createAmbient(isSmall ? 50 : 120, rand)

    let width = 0
    let height = 0
    let raf = 0
    let visible = true
    const start = performance.now()
    const mouse = { x: -9999, y: -9999 }
    // Куда «смотрит» силуэт: плавно следует за курсором (-1..1)
    const look = { x: 0, y: 0, tx: 0, ty: 0 }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (reducedMotion) draw(performance.now())
    }

    // Пути группируются по цвету и глубине: ~33 stroke() за кадр вместо тысяч
    const paths: Path2D[][] = PALETTE.map(() =>
      Array.from({ length: DEPTH_BUCKETS }, () => new Path2D()),
    )

    const draw = (now: number) => {
      const elapsed = now - start
      const intro = reducedMotion ? 1 : easeOutCubic(Math.min(elapsed / INTRO_MS, 1))
      look.x += (look.tx - look.x) * 0.04
      look.y += (look.ty - look.y) * 0.04
      const sway = reducedMotion ? 0 : Math.sin(elapsed * 0.0005) * 0.18
      const angle = sway + look.x * 0.4
      const cosA = Math.cos(angle)
      const sinA = Math.sin(angle)
      const tilt = look.y * 0.15
      const cosT = Math.cos(tilt)
      const sinT = Math.sin(tilt)
      const cx = width * 0.5
      const radius = Math.min(width * 0.42, height * 0.44)
      const cy = height * 0.5

      ctx.clearRect(0, 0, width, height)
      ctx.lineWidth = 1
      for (const row of paths) for (let d = 0; d < DEPTH_BUCKETS; d++) row[d] = new Path2D()

      for (const p of cloud) {
        // Вращение вокруг Y, затем наклон по X
        const rx = p.x * cosA - p.z * sinA
        const rz = p.x * sinA + p.z * cosA
        const ry = p.y * cosT - rz * sinT
        const rz2 = p.y * sinT + rz * cosT
        const persp = 3.2 / (3.2 + rz2)
        const tx = cx + rx * radius * persp
        const ty = cy + ry * radius * persp

        let x = p.sx * width + (tx - p.sx * width) * intro
        let y = p.sy * height + (ty - p.sy * height) * intro

        // Отталкивание от курсора
        const dx = x - mouse.x
        const dy = y - mouse.y
        const dist = Math.hypot(dx, dy)
        let targetX = 0
        let targetY = 0
        if (dist < MOUSE_RADIUS && dist > 0.01) {
          const f = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE
          targetX = (dx / dist) * f
          targetY = (dy / dist) * f
        }
        p.ox += (targetX - p.ox) * 0.08
        p.oy += (targetY - p.oy) * 0.08
        x += p.ox
        y += p.oy

        if (!reducedMotion) p.rot += p.spin
        const depth = Math.min(DEPTH_BUCKETS - 1, Math.max(0, Math.floor(((rz2 + 1.2) / 2.4) * DEPTH_BUCKETS)))
        triangle(paths[p.color][DEPTH_BUCKETS - 1 - depth], x, y, p.size * persp, p.rot)
      }

      for (let c = 0; c < PALETTE.length; c++) {
        ctx.strokeStyle = PALETTE[c]
        for (let d = 0; d < DEPTH_BUCKETS; d++) {
          ctx.globalAlpha = (0.3 + (d / (DEPTH_BUCKETS - 1)) * 0.7) * (0.4 + 0.6 * intro)
          ctx.stroke(paths[c][d])
        }
      }

      // Рассеянные частицы вокруг
      ctx.globalAlpha = 0.35
      for (const a of ambient) {
        if (!reducedMotion) {
          a.x = (a.x + a.vx + 1) % 1
          a.y = (a.y + a.vy + 1) % 1
          a.rot += a.spin
        }
        ctx.strokeStyle = PALETTE[a.color]
        ctx.beginPath()
        triangle(ctx, a.x * width, a.y * height, a.size, a.rot)
        ctx.stroke()
      }
      ctx.globalAlpha = 1
    }

    const loop = (now: number) => {
      draw(now)
      if (visible && !document.hidden) raf = requestAnimationFrame(loop)
    }

    const play = () => {
      cancelAnimationFrame(raf)
      if (!reducedMotion && visible && !document.hidden) raf = requestAnimationFrame(loop)
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      look.tx = Math.max(-1, Math.min(1, (mouse.x - rect.width / 2) / (rect.width / 2)))
      look.ty = Math.max(-1, Math.min(1, (mouse.y - rect.height / 2) / (rect.height / 2)))
    }
    const onPointerLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
      look.tx = 0
      look.ty = 0
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      play()
    })
    io.observe(canvas)
    document.addEventListener("visibilitychange", play)
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    document.addEventListener("pointerleave", onPointerLeave)

    resize()
    if (reducedMotion) draw(performance.now())
    else play()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener("visibilitychange", play)
      window.removeEventListener("pointermove", onPointerMove)
      document.removeEventListener("pointerleave", onPointerLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("block size-full", className)}
    />
  )
}
