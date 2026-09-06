import React from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlineShieldCheck, 
  HiOutlineServer, 
  HiOutlineMail,
  HiOutlineDocumentText,
  HiOutlineDatabase,
  HiOutlineKey,
  HiOutlineGlobe,
  HiOutlineCheckCircle
} from 'react-icons/hi';

interface PrivacyPolicyProps {
  isDark: boolean;
}

export default function PrivacyPolicy({ isDark }: PrivacyPolicyProps) {
  return (
    <div 
      style={{
        backgroundColor: isDark ? '#020617' : '#f8fafc',
        color: isDark ? '#f1f5f9' : '#0f172a'
      }}
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-10 relative overflow-hidden transition-colors duration-300" 
      dir="rtl"
    >
      {/* خلفيات جمالية متطورة */}
      <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-12">
        {/* الترويسة العليا */}
        <div className="text-center space-y-4 pt-8">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.08)',
              borderColor: isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.2)',
              color: isDark ? '#38bdf8' : '#0284c7'
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-black shadow-lg backdrop-blur-md"
          >
            <HiOutlineShieldCheck className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>منصة Z E D التعليمية • الوثيقة الرسمية لسياسة الخصوصية وأمن البيانات</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
            className="text-3xl sm:text-5xl font-black tracking-tight leading-tight"
          >
            سياسة <span className="text-cyan-400 drop-shadow-md">الخصوصية</span> والشروط القانونية
          </motion.h1>

          <p 
            style={{ color: isDark ? '#cbd5e1' : '#475569' }}
            className="text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed"
          >
            آخر تحديث رسمي: يناير 2026. تسري هذه السياسة على كافة المستخدمين والمعلمين والزوار لمنصة Z E D التعليمية.
          </p>
        </div>

        {/* حاوية البيانات بتنسيق منوع ومنطقي */}
        <div className="space-y-6">

          {/* 1. مقدمة ونطاق التطبيق */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.8)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(203, 213, 225, 0.8)'
            }}
            className="border p-6 sm:p-8 rounded-[28px] backdrop-blur-xl shadow-xl space-y-3 transition-colors duration-300"
          >
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <HiOutlineDocumentText className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-black" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>1. مقدمة ونطاق التطبيق</h2>
            </div>
            <p className="text-sm leading-relaxed pr-2" style={{ color: isDark ? '#cbd5e1' : '#334155' }}>
              تلتزم منصة Z E D بحماية خصوصيتك ومعلوماتها الشخصية. توضح هذه الوثيقة كيف نقوم بجمع، استخدام، معالجة، وحماية بياناتك عند تصفح المنصة، إنشاء الحساب، التسجيل في الدورات التدريبية، أو تحميل الملفات والملازم المرفقة. استخدامك للمنصة يُعني موافقتك الصريحة على بنود هذه السياسة.
            </p>
          </motion.div>

          {/* 2. أنواع البيانات */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.8)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(203, 213, 225, 0.8)'
            }}
            className="border p-6 sm:p-8 rounded-[28px] backdrop-blur-xl shadow-xl space-y-4 transition-colors duration-300"
          >
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <HiOutlineDatabase className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-black" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>2. أنواع البيانات التي يتم جمعها</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div 
                style={{
                  backgroundColor: isDark ? 'rgba(2, 6, 23, 0.6)' : 'rgba(241, 245, 249, 0.8)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(226, 232, 240, 1)'
                }}
                className="p-4 rounded-2xl border space-y-1.5"
              >
                <span className="text-xs font-black text-cyan-400 block">بيانات الحساب</span>
                <p className="text-xs leading-relaxed" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>الاسم الكامل، البريد الإلكتروني، وكلمات المرور المشفرة بأمان.</p>
              </div>
              <div 
                style={{
                  backgroundColor: isDark ? 'rgba(2, 6, 23, 0.6)' : 'rgba(241, 245, 249, 0.8)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(226, 232, 240, 1)'
                }}
                className="p-4 rounded-2xl border space-y-1.5"
              >
                <span className="text-xs font-black text-blue-400 block">النشاط التعليمي</span>
                <p className="text-xs leading-relaxed" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>الكورسات المسجلة، الفيديوهات المشاهدة، وتاريخ تحميل الملفات.</p>
              </div>
              <div 
                style={{
                  backgroundColor: isDark ? 'rgba(2, 6, 23, 0.6)' : 'rgba(241, 245, 249, 0.8)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(226, 232, 240, 1)'
                }}
                className="p-4 rounded-2xl border space-y-1.5"
              >
                <span className="text-xs font-black text-emerald-400 block">البيانات التقنية</span>
                <p className="text-xs leading-relaxed" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>عنوان الـ IP، نوع المتصفح، وملفات تعريف الارتباط للجلسات.</p>
              </div>
            </div>
          </motion.div>

          {/* 3 & 4. الغرض وأمن التخزين */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.8)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(203, 213, 225, 0.8)'
              }}
              className="border p-6 rounded-[28px] backdrop-blur-xl shadow-xl space-y-3 flex flex-col justify-between transition-colors duration-300"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <HiOutlineKey className="w-5 h-5" />
                  </span>
                  <h2 className="text-base font-black" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>3. الغرض من الاستخدام</h2>
                </div>
                <ul className="space-y-2 text-xs pr-2" style={{ color: isDark ? '#cbd5e1' : '#334155' }}>
                  <li className="flex items-center gap-2"><HiOutlineCheckCircle className="text-emerald-400 w-4 h-4 shrink-0" /> التحقق الصارم من الهوية ومنع القرصنة.</li>
                  <li className="flex items-center gap-2"><HiOutlineCheckCircle className="text-emerald-400 w-4 h-4 shrink-0" /> تخصيص التجربة وعرض الكورسات المناسبة.</li>
                  <li className="flex items-center gap-2"><HiOutlineCheckCircle className="text-emerald-400 w-4 h-4 shrink-0" /> إرسال الإشعارات البريدية وتحديثات الحساب.</li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              style={{
                backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.8)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(203, 213, 225, 0.8)'
              }}
              className="border p-6 rounded-[28px] backdrop-blur-xl shadow-xl space-y-3 flex flex-col justify-between transition-colors duration-300"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                    <HiOutlineServer className="w-5 h-5" />
                  </span>
                  <h2 className="text-base font-black" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>4. أمن وتخزين البيانات</h2>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: isDark ? '#cbd5e1' : '#334155' }}>
                  تُخزن البيانات باستخدام بنية سحابية مؤمنة كلياً عبر Supabase. نطبق معايير صارمة تشمل تشفير الاتصالات (SSL/TLS) وحماية جلسات العمل ضد أي تلاعب أو اختراق مزدوج.
                </p>
              </div>
            </motion.div>
          </div>

          {/* 5 & 6. مشاركة البيانات وحقوق المستخدم */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.8)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(203, 213, 225, 0.8)'
            }}
            className="border p-6 sm:p-8 rounded-[28px] backdrop-blur-xl shadow-xl space-y-4 transition-colors duration-300"
          >
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <HiOutlineGlobe className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-black" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>5 & 6. مشاركة البيانات وحقوقك القانونية</h2>
            </div>
            <div className="space-y-3 text-xs leading-relaxed" style={{ color: isDark ? '#cbd5e1' : '#334155' }}>
              <p>
                <strong style={{ color: isDark ? '#ffffff' : '#0f172a' }} className="font-bold">مشاركة البيانات:</strong> نؤكد التزامنا التام بعدم بيع أو تأجير أو مشاركة بياناتك الشخصية مع أي طرف ثالث تجاري. تقتصر المشاركة تقنياً على مزودي السحابة المسؤولين عن صيانة الحماية.
              </p>
              <p>
                <strong style={{ color: isDark ? '#ffffff' : '#0f172a' }} className="font-bold">حقوق المستخدم:</strong> يحق لك تماماً طلب استعراض نسخة من بياناتك، تعديلها، أو إرسال طلب رسمي لحذف الحساب نهائياً وإزالة كافة السجلات من قواعد البيانات متى شئت.
              </p>
            </div>
          </motion.div>

          {/* 7. التواصل والدعم الفني */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            style={{
              backgroundColor: isDark ? 'rgba(30, 58, 138, 0.3)' : 'rgba(224, 242, 254, 0.8)',
              borderColor: isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(186, 230, 253, 1)'
            }}
            className="border p-6 rounded-[28px] backdrop-blur-xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors duration-300"
          >
            <div className="flex items-center gap-3">
              <span className="p-3 rounded-2xl bg-blue-500/20 text-cyan-400 shrink-0">
                <HiOutlineMail className="w-6 h-6" />
              </span>
              <div>
                <h3 className="text-sm font-black" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>7. هل لديك استفسار قانوني أو تقني؟</h3>
                <p className="text-xs" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>لأية أسئلة بخصوص سياسة الخصوصية، تواصل معنا عبر قنوات الدعم الفني بالمنصة.</p>
              </div>
            </div>
            <span className="px-4 py-2 bg-blue-600/30 border border-blue-500/30 text-cyan-300 text-xs font-black rounded-xl whitespace-nowrap">
              Z E D Support
            </span>
          </motion.div>

        </div>
      </div>
    </div>
  );
}