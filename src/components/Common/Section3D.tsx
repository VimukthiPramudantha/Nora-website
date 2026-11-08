import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Section3DProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "zoom";
}

export const Section3D: React.FC<Section3DProps> = ({
  children,
  className = "",
  direction = "up",
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Calculate 3D transformation values based on scroll progress
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.8, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [direction === "up" ? 18 : 12, 0]);
  const rotateY = useTransform(
    scrollYProgress,
    [0, 1],
    [direction === "left" ? 12 : direction === "right" ? -12 : 0, 0]
  );
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <div
      ref={ref}
      style={{ perspective: 1200 }}
      className="w-full my-6 md:my-10"
    >
      <motion.div
        style={{
          opacity,
          scale,
          rotateX,
          rotateY,
          y,
          transformStyle: "preserve-3d",
        }}
        className={`w-full will-change-transform ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Section3D;
