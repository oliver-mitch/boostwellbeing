"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

// Invisible component — captures UTM params + fbclid + referrer into sessionStorage
// on first render. Add to any retail landing page that should track attribution.
export default function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
