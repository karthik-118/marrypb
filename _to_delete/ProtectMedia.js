"use client";

import { useEffect } from "react";

// Deters casual saving of photos: blocks right-click "Save image", drag-to-save,
// and long-press save on mobile (via CSS). Note: this cannot stop OS screenshots
// — the tiled watermark on the photos is what protects against re-sharing.
export default function ProtectMedia() {
  useEffect(() => {
    const isImg = (e) => e.target && e.target.tagName === "IMG";
    const onContext = (e) => {
      if (isImg(e)) e.preventDefault();
    };
    const onDrag = (e) => {
      if (isImg(e)) e.preventDefault();
    };
    document.addEventListener("contextmenu", onContext);
    document.addEventListener("dragstart", onDrag);
    return () => {
      document.removeEventListener("contextmenu", onContext);
      document.removeEventListener("dragstart", onDrag);
    };
  }, []);
  return null;
}
