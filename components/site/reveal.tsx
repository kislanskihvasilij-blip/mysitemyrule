"use client"

import { motion, useReducedMotion } from "motion/react"
import type { ReactNode } from "react"

type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
  /** Тег-обёртка: "li" — чтобы не ломать разметку списков */
  as?: "div" | "li"
}

/** Плавное появление снизу при прокрутке к элементу */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const reduced = useReducedMotion()
  const Tag = as === "li" ? motion.li : motion.div
  return (
    <Tag
      className={className}
      initial={reduced ? false : { opacity: 0, y: 32, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  )
}
