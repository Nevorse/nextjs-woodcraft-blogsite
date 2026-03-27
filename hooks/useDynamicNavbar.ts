import { useEffect, useRef, useState } from "react";

export const useDynamicNavbar = () => {
  const [isCompact, setIsCompact] = useState(false);
  const [breakpoint, setBreakpoint] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      const container = containerRef.current;
      const content = contentRef.current;

      if (!container) return;

      if (!isCompact && content) {
        if (content.scrollWidth > container.clientWidth) {
          setBreakpoint(content.scrollWidth);
          setIsCompact(true);
        }
      } else if (isCompact && breakpoint !== null) {
        if (container.clientWidth > breakpoint + 20) {
          setIsCompact(false);
          setBreakpoint(null);
        }
      }
    };

    const resizeObserver = new ResizeObserver(() => checkOverflow());

    if (containerRef.current) resizeObserver.observe(containerRef.current);

    checkOverflow();

    return () => resizeObserver.disconnect();
  }, [isCompact, breakpoint]);

  return { isCompact, contentRef, containerRef };
};
