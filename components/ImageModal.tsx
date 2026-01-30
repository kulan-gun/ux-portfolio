"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ImageModal({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // lock scroll when open
  useEffect(() => {
    if (!open) return;
    const { style } = document.documentElement;
    const prev = style.overflow;
    style.overflow = "hidden";
    return () => { style.overflow = prev; };
  }, [open]);

  const Overlay = (
    <div
      className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={() => setOpen(false)}
    >
      <button
        aria-label="Close image"
        onClick={(e) => { e.stopPropagation(); setOpen(false); }}
        className="absolute top-6 right-6 text-white text-5xl font-bold leading-none"
      >
        ×
      </button>

      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-w-[95vw] max-h-[95vh] object-contain rounded-2xl shadow-2xl"
      />
    </div>
  );

  return (
    <>
      <img
        src={src}
        alt={alt}
        onClick={() => setOpen(true)}
        className="w-full rounded-2xl cursor-pointer"
      />
      {open && mounted ? createPortal(Overlay, document.body) : null}
    </>
  );
}
