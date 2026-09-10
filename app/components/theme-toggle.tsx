"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
    setDark(shouldUseDark);
  }, []);

  function toggleTheme(): void {
    const nextTheme = !dark;
    document.documentElement.classList.toggle("dark", nextTheme);
    window.localStorage.setItem("theme", nextTheme ? "dark" : "light");
    setDark(nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition-colors hover:border-zinc-900 hover:text-zinc-900"
    >
      {dark ? <Sun size={17} strokeWidth={1.8} /> : <Moon size={17} strokeWidth={1.8} />}
    </button>
  );
}
