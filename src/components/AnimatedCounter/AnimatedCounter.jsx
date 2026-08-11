import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function AnimatedCounter({ end, duration = 1500, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  const startCountAnimation = useCallback(() => {
    const numericStr = String(end).replace(/[^0-9.]/g, '');
    const target = parseFloat(numericStr);
    if (isNaN(target)) {
      setCount(end);
      return;
    }

    const isDecimal = String(end).includes('.');
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = easeProgress * target;

      if (isDecimal) {
        setCount(currentVal.toFixed(1));
      } else {
        setCount(Math.floor(currentVal));
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  useEffect(() => {
    const currentElement = elementRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          startCountAnimation();
        }
      },
      { threshold: 0.1 }
    );

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [startCountAnimation]);

  return (
    <span ref={elementRef}>
      {prefix}
      {hasAnimated.current ? count : '0'}
      {suffix}
    </span>
  );
}
