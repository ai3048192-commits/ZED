import { Sun, Moon } from "lucide-react";

type ThemeToggleProps = {
  isDark: boolean;
  setIsDark: (val: boolean) => void;
};

export default function ThemeToggle({ isDark, setIsDark }: ThemeToggleProps) {
  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
        isDark
          ? "bg-[#0D111C] border-[#1E273F] text-amber-400 hover:bg-[#151D33]"
          : "bg-blue-50/70 border-blue-200 text-slate-700 hover:bg-blue-100"
      }`}
      aria-label="Toggle Theme"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} className="text-blue-600" />}
    </button>
  );
}