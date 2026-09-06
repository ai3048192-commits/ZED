import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  HiAcademicCap,
  HiUserGroup,
  HiArrowLeft,
  HiStar,
  HiShieldCheck,
  HiBolt,
  HiGlobeAlt,
  HiFire,
  HiCheckBadge
} from "react-icons/hi2";
import { supabase } from "../lib/supabaseClient";
import StatsBar from "./StatsBar";
import CoreFeatures from "./CoreFeatures";
import HowItWorks from "./HowItWorks";
import TestimonialsSection from "./TestimonialsSection";

export default function HomePage({ isDark }) {
  const [heroData, setHeroData] = useState({
    title: "انطلق نحو قمة التفوق الأكاديمي والمهني مع منصة ZED",
    subtitle:
      "بيئة تعليمية ذكية ومتكاملة تضع بين يديك محتوى احترافياً وإشرافاً مباشراً من نخبة الخبراء، لتصل بأهدافك إلى الواقع في أي وقت ومن أي مكان.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2400&auto=format&fit=crop",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestHero() {
      try {
        const { data, error } = await supabase
          .from("hero_section")
          .select("*")
          .order("id", { ascending: false })
          .limit(1);

        if (data && data.length > 0 && !error) {
          setHeroData({
            title: data[0].title || "انطلق نحو قمة التفوق الأكاديمي والمهني مع منصة ZED",
            subtitle: data[0].subtitle || "بيئة تعليمية ذكية ومتكاملة تضع بين يديك محتوى احترافياً وإشرافاً مباشراً.",
            image: data[0].image_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2400&auto=format&fit=crop",
          });
        }
      } catch (err) {
        console.error("خطأ في جلب بيانات الواجهة:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLatestHero();
  }, []);

  return (
    <div
      style={{
        backgroundColor: isDark ? '#020617' : '#f8fafc',
        color: isDark ? '#f1f5f9' : '#0f172a'
      }}
      className="min-h-screen flex flex-col items-center overflow-x-hidden selection:bg-blue-600 selection:text-white transition-colors duration-300"
      dir="rtl"
    >
      {/* قسم الهيرو بتصميم الفاجر الحديث (Cyber-Bento Flow) */}
      <section className="relative w-full min-h-[92vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-12 overflow-hidden">
        
        {/* شبكة هندسية خلفية ونقاط إضاءة نيون */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f60a_1px,transparent_1px),linear-gradient(to_bottom,#3b82f60a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[150px] pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* الجانب الأيمن: النصوص الاحترافية */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start text-right space-y-6"
          >
            {/* بادج متوهج */}
            <div 
              style={{
                backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.08)',
                borderColor: isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)',
                color: isDark ? '#67e8f9' : '#0284c7'
              }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl text-xs font-black tracking-wider uppercase border shadow-[0_0_20px_rgba(59,130,246,0.15)] backdrop-blur-xl"
            >
              <HiFire className="w-4 h-4 text-cyan-500 animate-bounce" />
              <span>المنصة الأذكى للتعلم المتقدم</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </div>

            {/* العنوان الرئيسي */}
            <h1 
              style={{ color: isDark ? '#ffffff' : '#0f172a' }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.3] sm:leading-[1.2]"
            >
              {heroData.title}
            </h1>

            {/* الوصف */}
            <p 
              style={{ color: isDark ? '#cbd5e1' : '#475569' }}
              className="text-sm sm:text-base lg:text-lg font-medium leading-relaxed max-w-2xl"
            >
              {heroData.subtitle}
            </p>

            {/* أزرار التفاعل */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full pt-3">
              <motion.a
                whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(37,99,235,0.5)" }}
                whileTap={{ scale: 0.98 }}
                href="/auth"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-black rounded-2xl shadow-xl shadow-blue-600/30 flex items-center justify-center gap-3 text-sm transition-all"
              >
                <HiAcademicCap className="w-5 h-5" />
                <span>ابدأ رحلة التعلم الآن</span>
                <HiArrowLeft className="w-4 h-4 rtl:rotate-180" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="/auth"
                style={{
                  backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : '#ffffff',
                  borderColor: isDark ? 'rgba(59, 130, 246, 0.3)' : '#cbd5e1',
                  color: isDark ? '#ffffff' : '#0f172a'
                }}
                className="px-8 py-4 font-bold rounded-2xl border backdrop-blur-xl flex items-center justify-center gap-3 text-sm transition-all shadow-md"
              >
                <HiUserGroup className="w-5 h-5 text-cyan-500" />
                <span>انضم كمعلم في Z E D</span>
              </motion.a>
            </div>

            {/* شريط الإحصائيات السريع */}
            <div 
              style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0' }}
              className="pt-6 flex flex-wrap items-center gap-6 text-xs font-bold border-t w-0.5-full w-full"
            >
              <div className="flex items-center gap-2" style={{ color: isDark ? '#cbd5e1' : '#334155' }}>
                <HiShieldCheck className="w-5 h-5 text-blue-500" />
                <span>شهادات معتمدة دولياً</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: isDark ? '#cbd5e1' : '#334155' }}>
                <HiStar className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span>تقييم 4.9 / 5.0</span>
              </div>
            </div>
          </motion.div>

          {/* الجانب الأيسر: عرض الصورة والكروت العائمة */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: -1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 w-full flex flex-col gap-4 relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-[2.5rem] blur-xl opacity-30 transition duration-1000" />

            <div 
              style={{
                backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                borderColor: isDark ? 'rgba(59, 130, 246, 0.3)' : '#cbd5e1'
              }}
              className="relative rounded-[2.5rem] p-3 backdrop-blur-2xl border shadow-2xl overflow-hidden group"
            >
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] bg-slate-900">
                <img
                  src={heroData.image}
                  alt="ZED Platform Preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />

                {/* شريط معلومات داخل الصورة */}
                <div 
                  style={{
                    backgroundColor: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.95)',
                    borderColor: isDark ? '#1e293b' : '#e2e8f0'
                  }}
                  className="absolute bottom-4 right-4 left-4 p-3.5 rounded-2xl backdrop-blur-xl border flex items-center justify-between shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-500 flex items-center justify-center border border-blue-500/30">
                      <HiCheckBadge className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>مسارات تفاعلية</h4>
                      <p className="text-[10px]" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>تحديثات مستمرة للمحتوى</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-cyan-500/10 text-cyan-500 border border-cyan-500/30 px-3 py-1 rounded-xl font-bold">
                    نشط الآن
                  </span>
                </div>
              </div>
            </div>

            {/* بطاقات معلومات سفلية */}
            <div className="grid grid-cols-2 gap-3">
              <div 
                style={{
                  backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : '#ffffff',
                  borderColor: isDark ? 'rgba(59, 130, 246, 0.2)' : '#cbd5e1'
                }}
                className="p-4 rounded-2xl border backdrop-blur-xl flex items-center gap-3 shadow-lg"
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-500 flex items-center justify-center shrink-0 border border-cyan-500/30">
                  <HiBolt className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h5 className="text-xs font-black" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>+12,000 طالب</h5>
                  <p className="text-[10px] text-cyan-500 font-bold">متواجدون حالياً</p>
                </div>
              </div>

              <div 
                style={{
                  backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : '#ffffff',
                  borderColor: isDark ? 'rgba(59, 130, 246, 0.2)' : '#cbd5e1'
                }}
                className="p-4 rounded-2xl border backdrop-blur-xl flex items-center gap-3 shadow-lg"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-500 flex items-center justify-center shrink-0 border border-blue-500/30">
                  <HiGlobeAlt className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-black" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>بث مباشر</h5>
                  <p className="text-[10px] text-blue-500 font-bold">أسبوعياً بلا انقطاع</p>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </section>

      {/* باقي الأقسام مع تمرير الثيم إذا لزم الأمر */}
      <div className="w-full">
        <StatsBar isDark={isDark} />
      </div>
      <div className="w-full">
        <CoreFeatures isDark={isDark} />
      </div>
      <div className="w-full">
        <HowItWorks isDark={isDark} />
      </div>
      <div className="w-full">
        <TestimonialsSection isDark={isDark} />
      </div>
    </div>
  );
}