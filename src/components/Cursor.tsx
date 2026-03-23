"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = mx - 4 + "px";
        cursorRef.current.style.top = my - 4 + "px";
      }
    };

    const animRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx - 16 + "px";
        ringRef.current.style.top = ry - 16 + "px";
      }
      rafId = requestAnimationFrame(animRing);
    };

    const onEnter = () => {
      if (cursorRef.current) cursorRef.current.style.transform = "scale(3)";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const onLeave = () => {
      if (cursorRef.current) cursorRef.current.style.transform = "scale(1)";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    document.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(animRing);

    const links = document.querySelectorAll("a, button");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      links.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999] transition-transform duration-150"
        style={{ mixBlendMode: "difference" }}
      />
      <div
        ref={ringRef}
        className="fixed w-8 h-8 rounded-full pointer-events-none z-[9998] transition-all duration-100 border border-accent/40"
      />
    </>
  );
}
