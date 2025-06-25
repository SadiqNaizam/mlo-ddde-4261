import React, { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

interface AnimatedCounterProps {
  /** The numerical value to display and animate to. */
  value: number;
  /** Optional className for custom styling. */
  className?: string;
}

/**
 * A component that animates a numerical value when it changes.
 * Perfect for displaying dynamic data like scores, prices, or counts.
 */
const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const prevValueRef = useRef(value);

  useEffect(() => {
    console.log('AnimatedCounter effect triggered for value:', value);
    const node = ref.current;
    if (!node) return;

    const fromValue = prevValueRef.current;

    // Do not animate on initial render
    if (fromValue === value) {
      node.textContent = value.toFixed(2);
      return;
    }
    
    const controls = animate(fromValue, value, {
      duration: 0.7, // A slightly longer duration for a smoother feel
      ease: 'easeOut',
      onUpdate: (latest) => {
        // As per the user journey, this is a cost, so we format to 2 decimal places.
        if (node) {
            node.textContent = latest.toFixed(2);
        }
      },
    });

    // Update the ref to the new value for the next render cycle.
    prevValueRef.current = value;

    // Cleanup function to stop the animation if the component unmounts.
    return () => controls.stop();
  }, [value]);

  console.log('AnimatedCounter loaded');

  // Set the initial value directly so there's no flash of empty content
  // and it's correctly displayed on the server or if JS is disabled.
  return <span ref={ref} className={className}>{value.toFixed(2)}</span>;
};

export default AnimatedCounter;