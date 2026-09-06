import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineHome,
  HiOutlineBookOpen,
  HiOutlineUser, 
  HiOutlineMenuAlt3, 
  HiOutlineX, 
  HiOutlineLogout, 
  HiOutlineViewGrid, 
  HiOutlineInformationCircle,
  HiOutlineMail,
  HiOutlineBell,
  HiOutlineChevronDown,
  HiOutlineShieldCheck,
  HiOutlineSun,
  HiOutlineMoon
} from 'react-icons/hi';
import { supabase } from "../lib/supabaseClient";

export default function ResponsiveHeader({ isAuthenticated, userRole, userName, onLogout, isDark, setIsDark }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');
  const [platformName, setPlatformName] = useState("Z E D");
  const [logoUrl, setLogoUrl] = useState("");
  const [notificationsCount] = useState(2);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }

    async function fetchHeaderSettings() {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("site_name, logo_url")
          .order("id", { ascending: false })
          .limit(1);

        if (data && data.length > 0 && !error) {
          if (data[0].site_name) setPlatformName(data[0].site_name);
          if (data[0].logo_url) setLogoUrl(data[0].logo_url);
        }
      } catch (err) {
        console.error("خطأ في جلب إعدادات الهوية للـ Header:", err);
      }
    }
    fetchHeaderSettings();
  }, []);

  const navItems = [
    { name: 'الرئيسية', path: '/', icon: HiOutlineHome },
    { name: 'الكورسات', path: '/courses', icon: HiOutlineBookOpen },
    { name: 'عن المنصة', path: '/about', icon: HiOutlineInformationCircle },
    { name: 'تواصل معنا', path: '/contact', icon: HiOutlineMail },
  ];

  return (
    <>
      {/* 1. تصميم شاشات سطح المكتب (Desktop Navigation) */}
      <header className="hidden md:block fixed top-4 left-0 right-0 z-50 px-6 max-w-7xl mx-auto" dir="rtl">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0',
            color: isDark ? '#ffffff' : '#0f172a'
          }}
          className="backdrop-blur-2xl border px-6 py-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center justify-between transition-colors duration-300"
        >
          <a href="/" className="group flex items-center gap-3">
            <div className="relative">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="w-10 h-10 rounded-xl object-cover border border-cyan-500/30 shadow-lg" />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-cyan-500/20 border border-cyan-400/30">
                  {platformName ? platformName.charAt(0) : 'Z'}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wide" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>{platformName}</span>
              <span className="text-[9px] text-cyan-500 font-bold tracking-widest uppercase">تعلم . تطور . زد تفوقك</span>
            </div>
          </a>

          <nav 
            style={{
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : '#f1f5f9',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#e2e8f0'
            }}
            className="flex items-center gap-1.5 p-1.5 rounded-xl border"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <a 
                  key={item.path}
                  href={item.path}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all duration-300 ${
                    isActive 
                      ? 'text-white bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg shadow-cyan-500/25 border border-cyan-400/30' 
                      : isDark ? 'text-gray-400 hover:text-white hover:bg-white/[0.05]' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-cyan-500'}`} />
                  {item.name}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsDark(!isDark)}
              style={{
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#f1f5f9',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0',
                color: isDark ? '#facc15' : '#0891b2'
              }}
              className="w-9 h-9 border rounded-xl flex items-center justify-center transition-all cursor-pointer"
              title="تغيير المظهر"
              type="button"
            >
              {isDark ? <HiOutlineSun className="w-4 h-4" /> : <HiOutlineMoon className="w-4 h-4" />}
            </button>

            {!isAuthenticated ? (
              <div className="flex items-center gap-2.5">
                <a href="/auth" className={`px-4 py-2 text-xs font-bold transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'}`}>
                  تسجيل الدخول
                </a>
                <a href="/auth?mode=register" className="px-5 py-2 text-xs font-black text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl shadow-lg shadow-cyan-500/25 hover:opacity-90 transition-all border border-cyan-400/30">
                  حساب جديد
                </a>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button 
                  style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#f1f5f9',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0'
                  }}
                  className="relative w-9 h-9 border rounded-xl flex items-center justify-center transition-all"
                >
                  <HiOutlineBell className="w-4 h-4 text-cyan-500" />
                  {notificationsCount > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>}
                </button>

                <div className="relative">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    style={{
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#f1f5f9',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0'
                    }}
                    className="flex items-center gap-2.5 p-1.5 pl-3 rounded-xl border transition-all"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-lg flex items-center justify-center font-black text-xs shadow-sm">
                      {userName ? userName.charAt(0) : <HiOutlineUser className="w-4 h-4" />}
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="font-black text-xs max-w-[90px] truncate" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>{userName || "مستخدم"}</span>
                      <span className="text-[9px] text-cyan-500 font-bold uppercase">{userRole === 'teacher' ? 'مدرس 👨‍🏫' : 'طالب 🎓'}</span>
                    </div>
                    <HiOutlineChevronDown className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} style={{ color: isDark ? '#94a3b8' : '#64748b' }} />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        style={{
                          backgroundColor: isDark ? '#0f172a' : '#ffffff',
                          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0'
                        }}
                        className="absolute left-0 mt-2 w-48 border rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-xl"
                      >
                        <a href={userRole === 'teacher' ? "/teacher/dashboard" : "/student/dashboard"} className={`flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold transition-colors ${isDark ? 'text-gray-200 hover:bg-white/10' : 'text-slate-700 hover:bg-slate-100'}`}>
                          <HiOutlineViewGrid className="w-4 h-4 text-cyan-500" /> لوحة التحكم
                        </a>
                        <a href="/profile" className={`flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold transition-colors ${isDark ? 'text-gray-200 hover:bg-white/10' : 'text-slate-700 hover:bg-slate-100'}`}>
                          <HiOutlineUser className="w-4 h-4 text-slate-400" /> الملف الشخصي
                        </a>
                        <div className="border-t my-1" style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0' }}></div>
                        <button onClick={() => { setIsDropdownOpen(false); onLogout(); }} className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-rose-500 text-right transition-colors ${isDark ? 'hover:bg-rose-500/10' : 'hover:bg-rose-50'}`}>
                          <HiOutlineLogout className="w-4 h-4" /> تسجيل الخروج
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </header>

      {/* 2. تصميم هيدر الموبايل العلوي */}
      <header className="fixed top-3 left-3 right-3 z-40 md:hidden" dir="rtl">
        <div 
          style={{
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0'
          }}
          className="backdrop-blur-2xl border px-4 py-2.5 rounded-2xl shadow-md flex items-center justify-between transition-colors duration-300"
        >
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-md shadow-cyan-500/20 border border-cyan-400/30 overflow-hidden">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                platformName ? platformName.charAt(0) : 'Z'
              )}
            </div>
            <span className="text-xs font-black tracking-wider" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>{platformName}</span>
          </a>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsDark(!isDark)}
              style={{
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#f1f5f9',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0',
                color: isDark ? '#facc15' : '#0891b2'
              }}
              className="w-8 h-8 border rounded-xl flex items-center justify-center cursor-pointer"
              type="button"
            >
              {isDark ? <HiOutlineSun className="w-3.5 h-3.5" /> : <HiOutlineMoon className="w-3.5 h-3.5" />}
            </button>

            {isAuthenticated && (
              <button 
                style={{
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#f1f5f9',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0'
                }}
                className="relative w-8 h-8 border rounded-xl flex items-center justify-center"
              >
                <HiOutlineBell className="w-3.5 h-3.5 text-cyan-500" />
                {notificationsCount > 0 && <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></span>}
              </button>
            )}

            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              style={{
                backgroundColor: isDark ? 'rgba(6, 182, 212, 0.15)' : '#eff6ff',
                borderColor: isDark ? 'rgba(6, 182, 212, 0.3)' : '#bfdbfe',
                color: isDark ? '#67e8f9' : '#2563eb'
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 border rounded-xl font-bold text-xs"
              type="button"
            >
              <HiOutlineMenuAlt3 className="w-4 h-4" />
              <span>القائمة</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. شريط التنقل السفلي للموبايل */}
      <nav className="fixed bottom-4 left-4 right-4 z-40 md:hidden" dir="rtl">
        <div 
          style={{
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            borderColor: isDark ? 'rgba(6, 182, 212, 0.2)' : '#e2e8f0'
          }}
          className="backdrop-blur-2xl border px-2 py-2 rounded-2xl shadow-xl flex items-center justify-between transition-colors duration-300"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <a 
                key={item.path} 
                href={item.path} 
                style={isActive ? {
                  backgroundColor: isDark ? 'rgba(6, 182, 212, 0.2)' : '#eff6ff',
                  borderColor: isDark ? 'rgba(6, 182, 212, 0.4)' : '#bfdbfe',
                  color: isDark ? '#67e8f9' : '#2563eb'
                } : {}}
                className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-300 relative border border-transparent ${
                  isActive 
                    ? 'shadow-md font-black scale-105' 
                    : isDark ? 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.03]' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 mb-1 ${isActive ? 'text-cyan-500' : isDark ? 'text-gray-400' : 'text-slate-500'}`} />
                <span className="text-[10px] tracking-tight">{item.name}</span>
                {isActive && (
                  <span className="absolute -bottom-1 w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                )}
              </a>
            );
          })}
        </div>
      </nav>

      {/* 4. القائمة المنبثقة من الأسفل للموبايل */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end" dir="rtl">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              style={{
                backgroundColor: isDark ? '#0f172a' : '#ffffff',
                borderColor: isDark ? 'rgba(6, 182, 212, 0.3)' : '#e2e8f0'
              }}
              className="relative w-full border-t rounded-t-[2.5rem] p-6 space-y-5 shadow-2xl max-h-[85vh] overflow-y-auto transition-colors duration-300"
            >
              <div className="w-12 h-1.5 rounded-full mx-auto mb-1" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : '#cbd5e1' }}></div>

              <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-2xl flex items-center justify-center text-white font-black text-base shadow-lg shadow-cyan-500/20 border border-white/20 overflow-hidden">
                    {logoUrl ? (
                      <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      userName ? userName.charAt(0) : 'Z'
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-black text-sm" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>{userName || "زائر المنصة"}</span>
                    <span className="text-[10px] text-cyan-500 font-bold flex items-center gap-1">
                      <HiOutlineShieldCheck className="w-3.5 h-3.5" />
                      {userRole === 'teacher' ? 'حساب محاضر معتمد' : 'حساب طالب نشط'}
                    </span>
                  </div>
                </div>
                
                <button 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0',
                    color: isDark ? '#94a3b8' : '#64748b'
                  }}
                  className="w-9 h-9 border rounded-2xl flex items-center justify-center transition-all cursor-pointer hover:text-rose-500"
                  type="button"
                >
                  <HiOutlineX className="w-5 h-5" />
                </button>
              </div>

              <div 
                style={{
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#f1f5f9',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0'
                }}
                className="flex items-center justify-between p-3.5 rounded-2xl border"
              >
                <span className="text-xs font-bold" style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}>المظهر ({isDark ? 'الوضع الليلي' : 'الوضع الفاتح'})</span>
                <button 
                  onClick={() => setIsDark(!isDark)}
                  style={{
                    backgroundColor: isDark ? 'rgba(6, 182, 212, 0.2)' : '#eff6ff',
                    borderColor: isDark ? 'rgba(6, 182, 212, 0.3)' : '#bfdbfe',
                    color: isDark ? '#67e8f9' : '#2563eb'
                  }}
                  className="px-4 py-2 border rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer"
                  type="button"
                >
                  {isDark ? <HiOutlineSun className="w-4 h-4 text-amber-400" /> : <HiOutlineMoon className="w-4 h-4 text-cyan-600" />}
                  <span>تغيير</span>
                </button>
              </div>

              {isAuthenticated && (
                <div className="grid grid-cols-2 gap-3">
                  <a 
                    href={userRole === 'teacher' ? "/teacher/dashboard" : "/student/dashboard"} 
                    style={{
                      backgroundColor: isDark ? 'rgba(6, 182, 212, 0.15)' : '#eff6ff',
                      borderColor: isDark ? 'rgba(6, 182, 212, 0.3)' : '#bfdbfe',
                      color: isDark ? '#67e8f9' : '#2563eb'
                    }}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border font-bold text-xs shadow-md"
                  >
                    <HiOutlineViewGrid className="w-4 h-4" /> لوحة التحكم
                  </a>
                  <a 
                    href="/profile" 
                    style={{
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#f1f5f9',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0',
                      color: isDark ? '#e2e8f0' : '#1e293b'
                    }}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border font-bold text-xs"
                  >
                    <HiOutlineUser className="w-4 h-4 text-cyan-500" /> الملف الشخصي
                  </a>
                </div>
              )}

              <div className="space-y-2 pt-1">
                <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase px-1">القائمة الرئيسية</span>
                <div className="grid grid-cols-2 gap-2.5">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPath === item.path;
                    return (
                      <a 
                        key={item.path} 
                        href={item.path} 
                        style={isActive ? {
                          color: '#ffffff',
                          background: 'linear-gradient(to bottom right, #2563eb, #0891b2)',
                          borderColor: 'rgba(6, 182, 212, 0.4)'
                        } : {
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : '#f8fafc',
                          borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#e2e8f0',
                          color: isDark ? '#d1d5db' : '#334155'
                        }}
                        className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl font-bold text-xs transition-all border shadow-lg"
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isActive ? 'bg-white text-blue-600 dark:bg-cyan-500 dark:text-slate-950' : isDark ? 'bg-white/[0.05] text-cyan-400' : 'bg-slate-200 text-cyan-600'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span>{item.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3">
                {isAuthenticated ? (
                  <button 
                    onClick={() => { setIsMobileMenuOpen(false); onLogout(); }} 
                    style={{
                      backgroundColor: isDark ? 'rgba(244, 63, 94, 0.1)' : '#fff1f2',
                      borderColor: isDark ? 'rgba(244, 63, 94, 0.2)' : '#fecdd3',
                      color: isDark ? '#fb7185' : '#e11d48'
                    }}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 border rounded-2xl font-black text-xs transition-all shadow-md cursor-pointer"
                    type="button"
                  >
                    <HiOutlineLogout className="w-4 h-4" /> تسجيل الخروج من الحساب
                  </button>
                ) : (
                  <a 
                    href="/auth" 
                    className="w-full block text-center py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl font-black text-xs shadow-xl shadow-cyan-500/20 border border-cyan-400/30"
                  >
                    تسجيل الدخول / إنشاء حساب جديد
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}