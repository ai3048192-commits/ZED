import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineBell, 
  HiOutlineUser, 
  HiOutlineMenuAlt3, 
  HiOutlineX, 
  HiOutlineLogout, 
  HiOutlineViewGrid, 
  HiOutlineHome,
  HiOutlineBookOpen,
  HiOutlineInformationCircle,
  HiOutlineMail,
  HiOutlineSparkles
} from 'react-icons/hi';

export default function Header({ isAuthenticated, userRole, userName, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notificationsCount] = useState(3);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white/90 backdrop-blur-xl border-b border-blue-50 sticky top-0 z-50 shadow-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* 1. الشعار (Logo) */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <a href="/" className="group flex items-center gap-3 focus:outline-none">
              <div className="relative flex items-center justify-center">
                <div className="w-12 h-12 bg-[#002aff] rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-600/20 group-hover:rotate-6 transition-transform duration-300">
                  Z
                </div>
                <span className="absolute -top-1.5 -right-1.5 text-[#00bfff] font-black text-lg bg-white rounded-full px-1 shadow-xs">
                  +
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-[#002aff] tracking-wider">
                  Z E D
                </span>
                <span className="text-[10px] text-gray-500 font-bold tracking-tight">
                  تعلم . تطور . زد 
                </span>
              </div>
            </a>
          </motion.div>

          {/* 2. القائمة الرئيسية (لأجهزة سطح المكتب) */}
          <nav className="hidden md:flex items-center space-x-1 space-x-reverse bg-blue-50/50 p-1.5 rounded-2xl border border-blue-100/60">
            <a href="/" className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-[#002aff] rounded-xl shadow-xs transition-all">
              <HiOutlineHome className="h-4 w-4" />
              الرئيسية
            </a>
            <a href="/courses" className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-[#002aff] hover:bg-white/80 rounded-xl transition-all">
              <HiOutlineBookOpen className="h-4 w-4" />
              الكورسات
            </a>
            <a href="/about" className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-[#002aff] hover:bg-white/80 rounded-xl transition-all">
              <HiOutlineInformationCircle className="h-4 w-4" />
              عن المنصة
            </a>
            <a href="/contact" className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-[#002aff] hover:bg-white/80 rounded-xl transition-all">
              <HiOutlineMail className="h-4 w-4" />
              تواصل معنا
            </a>
          </nav>

          {/* 3. أزرار المصادقة أو لوحة المستخدم */}
          <div className="hidden md:flex items-center gap-3">
            {!isAuthenticated ? (
              <div className="flex items-center gap-3">
                <a 
                  href="/auth" 
                  className="px-5 py-2.5 text-sm font-bold text-gray-700 hover:text-[#002aff] transition-colors"
                >
                  تسجيل الدخول
                </a>
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/register" 
                  className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold bg-[#002aff] hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-600/30 transition-all"
                >
                  <HiOutlineSparkles className="h-4 w-4 text-[#00bfff]" />
                  ابدأ مجاناً
                </motion.a>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                {/* أيقونة الإشعارات */}
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-11 h-11 flex items-center justify-center text-gray-600 hover:text-[#002aff] hover:bg-blue-50/50 rounded-2xl relative transition-all border border-blue-100"
                >
                  <HiOutlineBell className="h-5 w-5" />
                  {notificationsCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 bg-rose-500 text-white text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-white shadow-sm"
                    >
                      {notificationsCount}
                    </motion.span>
                  )}
                </motion.button>

                {/* قائمة المستخدم المنسدلة */}
                <div className="relative">
                  <motion.button 
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-3 focus:outline-none bg-blue-50/40 hover:bg-blue-50 p-1.5 pl-3 rounded-2xl border border-blue-100 transition-all shadow-2xs"
                  >
                    <div className="w-10 h-10 bg-[#002aff] text-white rounded-xl flex items-center justify-center font-black text-sm shadow-md shadow-blue-600/20">
                      {userName ? userName.charAt(0) : <HiOutlineUser className="h-5 w-5" />}
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-gray-900 font-bold text-xs truncate max-w-[100px]">{userName || "مستخدم"}</span>
                      <span className="text-[10px] text-[#00bfff] font-extrabold uppercase">{userRole === 'teacher' ? 'مدرس 👨‍🏫' : 'طالب 🎓'}</span>
                    </div>
                  </motion.button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-3 w-60 bg-white/95 backdrop-blur-xl border border-blue-50 rounded-3xl shadow-2xl py-2 z-50 overflow-hidden"
                      >
                        <div className="px-5 py-3 border-b border-gray-100 bg-blue-50/30 mb-1">
                          <p className="text-[11px] text-gray-400 font-semibold">حسابك النشط</p>
                          <p className="text-sm font-black text-gray-900 truncate">{userName}</p>
                        </div>
                        <a 
                          href={userRole === 'teacher' ? "/teacher/dashboard" : "/student/dashboard"} 
                          className="flex items-center gap-3 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-[#002aff] transition-all"
                        >
                          <div className="p-2 bg-blue-50 text-[#002aff] rounded-xl">
                            <HiOutlineViewGrid className="h-4 w-4" />
                          </div>
                          لوحة التحكم
                        </a>
                        <a 
                          href="/profile" 
                          className="flex items-center gap-3 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-[#002aff] transition-all"
                        >
                          <div className="p-2 bg-gray-100 text-gray-600 rounded-xl">
                            <HiOutlineUser className="h-4 w-4" />
                          </div>
                          الملف الشخصي
                        </a>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button 
                          onClick={onLogout}
                          className="w-full flex items-center gap-3 px-5 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-all text-right"
                        >
                          <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
                            <HiOutlineLogout className="h-4 w-4" />
                          </div>
                          تسجيل الخروج
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>

          {/* زر قائمة الهواتف المحمولة */}
          <div className="flex md:hidden items-center">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-11 h-11 flex items-center justify-center text-gray-700 hover:text-[#002aff] bg-blue-50/50 rounded-2xl border border-blue-100 focus:outline-none transition-all"
            >
              {isMobileMenuOpen ? <HiOutlineX className="h-6 w-6" /> : <HiOutlineMenuAlt3 className="h-6 w-6" />}
            </motion.button>
          </div>

        </div>
      </div>

      {/* القائمة المنسدلة لشاشات الموبايل */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-2xl border-t border-blue-50 px-6 pt-4 pb-6 space-y-2 shadow-2xl overflow-hidden"
          >
            <a href="/" className="flex items-center gap-3 px-4 py-3 text-gray-800 font-bold hover:bg-blue-50 hover:text-[#002aff] rounded-2xl transition-all">
              <HiOutlineHome className="h-5 w-5 text-[#002aff]" /> الرئيسيّة
            </a>
            <a href="/courses" className="flex items-center gap-3 px-4 py-3 text-gray-800 font-bold hover:bg-blue-50 hover:text-[#002aff] rounded-2xl transition-all">
              <HiOutlineBookOpen className="h-5 w-5 text-[#002aff]" /> الكورسات
            </a>
            <a href="/about" className="flex items-center gap-3 px-4 py-3 text-gray-800 font-bold hover:bg-blue-50 hover:text-[#002aff] rounded-2xl transition-all">
              <HiOutlineInformationCircle className="h-5 w-5 text-[#002aff]" /> عن المنصة
            </a>
            <a href="/contact" className="flex items-center gap-3 px-4 py-3 text-gray-800 font-bold hover:bg-blue-50 hover:text-[#002aff] rounded-2xl transition-all">
              <HiOutlineMail className="h-5 w-5 text-[#002aff]" /> تواصل معنا
            </a>

            <div className="border-t border-gray-100 pt-4 mt-2">
              {!isAuthenticated ? (
                <div className="flex flex-col gap-2.5">
                  <a href="/auth" className="w-full text-center py-3 text-[#002aff] bg-blue-50/70 hover:bg-blue-100 rounded-2xl font-black transition-all">تسجيل الدخول</a>
                  <a href="/register" className="w-full text-center py-3 bg-[#002aff] text-white rounded-2xl font-black shadow-lg shadow-blue-600/30 transition-all">ابدأ حسابك الآن</a>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-800 font-bold hover:bg-blue-50 rounded-2xl">
                    <HiOutlineViewGrid className="h-5 w-5 text-[#002aff]" /> لوحة التحكم
                  </a>
                  <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-rose-600 font-bold hover:bg-rose-50 rounded-2xl transition-all text-right">
                    <HiOutlineLogout className="h-5 w-5 text-rose-500" /> تسجيل الخروج
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}