"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";

export default function ThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
absolute
top-6
right-6
z-[1000]
flex
h-12
w-12
items-center
justify-center
rounded-full
bg-white
shadow-xl
dark:bg-zinc-800
"
    >
      {theme === "light" ? <Moon /> : <Sun className="text-white" />}
    </button>
  );
}
