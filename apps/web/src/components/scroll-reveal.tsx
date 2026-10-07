"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Tag = "div" | "ul" | "li";

const MOTION_TAG = {
  div: motion.div,
  ul: motion.ul,
  li: motion.li,
} as const;

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  fromX?: number;
};

export function ScrollReveal({ children, className, delay = 0, fromX }: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const offset = fromX !== undefined ? { x: fromX } : { y: 48 };

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, ...offset }}
      whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const groupVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

type ScrollRevealGroupProps = {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
};

export function ScrollRevealGroup({ children, className, as = "div" }: ScrollRevealGroupProps) {
  const shouldReduceMotion = useReducedMotion();
  const Component = MOTION_TAG[as];

  return (
    <Component
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      variants={groupVariants}
      className={className}
    >
      {children}
    </Component>
  );
}

export function ScrollRevealItem({ children, className, as = "div" }: ScrollRevealGroupProps) {
  const Component = MOTION_TAG[as];

  return (
    <Component variants={itemVariants} className={className}>
      {children}
    </Component>
  );
}
