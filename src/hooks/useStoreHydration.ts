"use client";

import { useSyncExternalStore } from "react";
import { useCompareStore } from "@/lib/store/compareStore";

function getServerSnapshot(): boolean {
  return false;
}

export function useStoreHydration(): boolean {
  return useSyncExternalStore(
    (notify) => {
      const persist = (useCompareStore as { persist?: { onFinishHydration: (cb: () => void) => () => void } }).persist;
      if (!persist) return () => {};
      return persist.onFinishHydration(() => notify());
    },
    () => {
      const persist = (useCompareStore as { persist?: { hasHydrated: () => boolean } }).persist;
      return persist ? persist.hasHydrated() : false;
    },
    getServerSnapshot,
  );
}
