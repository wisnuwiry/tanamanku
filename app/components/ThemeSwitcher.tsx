"use client";

import { useEffect, useState } from "react";
import IcDark from "./icons/IcDark";
import IcLight from "./icons/IcLight";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <></>;

  return (
    <button
      type="button"
      className="block font-medium rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <span className="group inline-flex shrink-0 justify-center items-center size-9 text-neutral-600 dark:text-neutral-200">
        {resolvedTheme === "dark" ? <IcLight /> : <IcDark />}
      </span>
    </button>
  );
}
