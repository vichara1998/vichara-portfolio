import { useState, useEffect } from "react";

const MODES = ["auto", "light", "dark"];

function savedMode() {
  try {
    const saved = localStorage.getItem("theme");
    return MODES.includes(saved) ? saved : "auto";
  } catch {
    return "auto";
  }
}

export function useTheme() {
  const [mode, setMode] = useState(savedMode);

  useEffect(() => {
    const system = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = () => {
      const dark = mode === "dark" || (mode === "auto" && system.matches);
      document.documentElement.classList.toggle("dark", dark);
      document.documentElement.style.colorScheme = dark ? "dark" : "light";
      document.documentElement.dataset.themeMode = mode;
    };
    applyTheme();
    try { localStorage.setItem("theme", mode); } catch { /* Theme still works without storage. */ }
    if (mode === "auto") system.addEventListener("change", applyTheme);
    return () => system.removeEventListener("change", applyTheme);
  }, [mode]);

  const nextMode = MODES[(MODES.indexOf(mode) + 1) % MODES.length];
  const cycleTheme = () => setMode((current) => MODES[(MODES.indexOf(current) + 1) % MODES.length]);
  return { mode, nextMode, cycleTheme };
}
