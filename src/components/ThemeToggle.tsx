import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';

interface ThemeToggleProps {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ThemeToggle({ isDark, setIsDark }: ThemeToggleProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      onClick={() => setIsDark(!isDark)}
      className={`relative w-16 h-9 rounded-full p-1 transition-colors duration-500 cursor-pointer shadow-inner border ${
        isDark 
          ? 'bg-slate-900 border-slate-700 shadow-cyan-950/50' 
          : 'bg-slate-200 border-slate-300 shadow-slate-300'
      }`}
      type="button"
      aria-label="تغيير الثيم"
    >
      {/* الدائرة المتحركة */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md ${
          isDark 
            ? 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950' 
            : 'bg-white text-amber-500'
        }`}
        style={{
          x: isDark ? 0 : 28 // يتحكم في اتجاه الحركة (يتوافق مع الـ RTL)
        }}
      >
        {isDark ? (
          <HiOutlineMoon className="w-4 h-4 text-white" />
        ) : (
          <HiOutlineSun className="w-4 h-4 text-amber-500" />
        )}
      </motion.div>
    </motion.button>
  );
}