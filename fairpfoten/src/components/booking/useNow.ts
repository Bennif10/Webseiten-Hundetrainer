"use client";

import { useSyncExternalStore } from "react";

const RESOLUTION_MS = 60_000;

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, RESOLUTION_MS);
  return () => window.clearInterval(id);
}

const getSnapshot = () => Math.floor(Date.now() / RESOLUTION_MS) * RESOLUTION_MS;
const getServerSnapshot = () => null;

/**
 * Aktuelle Zeit (minutengenau) – nur im Browser.
 * Auf dem Server bzw. beim ersten Rendern `null`, damit es keine
 * Hydration-Unterschiede durch abweichende Uhrzeiten/Zeitzonen gibt.
 */
export function useNow(): number | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
