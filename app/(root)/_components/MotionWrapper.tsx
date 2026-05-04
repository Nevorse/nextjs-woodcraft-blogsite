"use client";
import { motion, HTMLMotionProps } from "motion/react";

type MotionWrapperProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
};
export default function MotionWrapper({
  children,
  initial,
  animate,
  transition,
  className = "",
  ...rest
}: MotionWrapperProps) {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
