import React from "react";
import { motion } from "framer-motion";
import {
  HiAcademicCap,
  HiUserGroup,
  HiOutlineLightningBolt,
  HiSparkles,
  HiCheckCircle,
} from "react-icons/hi";
import StatsBar from "./StatsBar";
import CoreFeatures from "./CoreFeatures";
import HowItWorks from "./HowItWorks";
import TestimonialsSection from "./TestimonialsSection";

export default function HomePage() {
  return (
    <div
      className="min-h-screen bg-[#070b19] text-white flex flex-col items-center overflow-x-hidden selection:bg-[#002aff] selection:text-white"
      dir="rtl"
    >
      {/* القسم الرئيسي: خلفية صورة كاملة مع تصميم فخم */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-24 lg:py-32">
        
        {/* 1. الصورة كخلفية كاملة للشاشة مع تأثير Parallax ناعم */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2400&auto=format&fit=crop"
            alt="ZED Platform Background"
            className="w-full h-full object-cover scale-105 filter brightness-75 contrast-110"
          />
          {/* طبقات تدرج ذكية لدمج الصورة مع الهوية البصرية الغامقة للموقع */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b19] via-[#070b19]/80 to-[#070b19]/60 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070b19]/90 via-transparent to-[#070b19]/90" />
        </div>

        {/* 2. عناصر إضاءة خلفية متحركة */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-gradient-to-tr from-[#002aff]/40 to-[#00bfff]/40 rounded-full blur-[140px] pointer-events-none z-0" />

        {/* 3. المحتوى في المنتصف */}
        <div className="relative max-w-6xl mx-auto px-6 text-center z-10 w-full flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center"
          >
            {/* شارة إعلانية فخمة */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.08] border border-white/20 backdrop-blur-xl text-[#38bdf8] font-semibold text-xs md:text-sm mb-8 shadow-[0_0_30px_rgba(0,191,255,0.2)]">
              <HiSparkles className="w-4 h-4 text-[#00bfff] animate-pulse" />
              <span>المنصة التعليمية الأحدث والأسرع تطوراً في الشرق الأوسط</span>
            </div>

            {/* العنوان الرئيسي */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.1] mb-8 max-w-5xl">
              ارتقِ بمعرفتك مع{" "}
              <span className="bg-gradient-to-r from-[#00bfff] via-[#38bdf8] to-[#002aff] bg-clip-text text-transparent drop-shadow-[0_10px_20px_rgba(0,42,255,0.5)]">
                ZED
              </span>
              ، بوابتك نحو المستقبل.
            </h1>

            {/* الوصف */}
            <p className="text-lg sm:text-2xl text-slate-300 font-medium max-w-3xl mb-12 leading-relaxed drop-shadow-md">
              تعلم من النخبة، في أي وقت ومن أي مكان. توفر لك ZED الأدوات والمحتوى المتقدم لتتفوق في دراستك أو مسيرتك المهنية.
            </p>

            {/* أزرار التفاعل */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full mb-16">
              <a
                href="/auth"
                className="w-full sm:w-auto px-10 py-5 bg-[#002aff] hover:bg-blue-600 text-white font-extrabold rounded-2xl shadow-[0_20px_50px_rgba(0,42,255,0.5)] transition-all flex items-center justify-center gap-3 text-base hover:-translate-y-1 active:scale-95"
              >
                <HiAcademicCap className="w-6 h-6 text-sky-200" />
                <span>ابدأ التعلم الآن مجاناً</span>
              </a>
              <a
                href="/auth"
                className="w-full sm:w-auto px-10 py-5 bg-white/[0.06] hover:bg-white/[0.12] text-white font-extrabold rounded-2xl border border-white/20 backdrop-blur-xl transition-all flex items-center justify-center gap-3 text-base hover:-translate-y-1 active:scale-95 shadow-lg"
              >
                <HiUserGroup className="w-6 h-6 text-[#00bfff]" />
                <span>سجل كمدرس معتمد</span>
              </a>
            </div>

            {/* بطاقة مصغرة عائمة تحت الكلام تعطي طابع احترافي */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="bg-slate-900/80 backdrop-blur-2xl px-6 py-4 rounded-2xl border border-white/15 shadow-2xl flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center border border-emerald-500/30">
                <HiCheckCircle className="w-6 h-6" />
              </div>
              <div className="text-right">
                <div className="font-extrabold text-sm text-white">انضم لأكثر من +10,000 طالب نشط</div>
                <div className="text-xs text-slate-400">ابدأ رحلتك التعليمية اليوم وتفوق في مجالك</div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* باقي الأقسام */}
      <div className="w-full">
        <StatsBar />
      </div>
      <div className="w-full">
        <CoreFeatures />
      </div>
      <div className="w-full">
        <HowItWorks />
      </div>
      <div className="w-full">
        <TestimonialsSection />
      </div>
    </div>
  );
}