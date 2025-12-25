"use client";

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationSectionProps {
  children: ReactNode;
  gradientText?: boolean; // optional gradient animation
  pin?: boolean; // optional pin
}

export default function ScrollAnimationSection({
  children,
  gradientText = false,
  pin = false,
}: ScrollAnimationSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gradientText && containerRef.current) {
        const headings = containerRef.current.querySelectorAll(
          "h1, h2, h3, .gradient-text"
        );
        headings.forEach((el) => {
          gsap.to(el, {
            backgroundPosition: "200% center",
            duration: 4,
            repeat: -1,
            ease: "linear",
          });
        });
      }

      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        }
      );

      if (pin && containerRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: true,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [gradientText, pin]);

  return <div ref={containerRef}>{children}</div>;
}
