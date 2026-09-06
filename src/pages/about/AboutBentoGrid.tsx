import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HiOutlineSparkles,
  HiOutlineArrowLeft,
  HiOutlineStar,
  HiOutlineShieldCheck,
  HiOutlineClock,
  HiOutlineVideoCamera,
  HiOutlineAcademicCap,
  HiOutlineUserGroup,
  HiOutlineCheckCircle
} from 'react-icons/hi2';
import { supabase } from "../../lib/supabaseClient.js";

interface AboutBentoGridProps {
  activeTab?: 'all' | 'students' | 'instructors';
  isDark?: boolean;
}

export default function AboutBentoGrid({ activeTab, isDark = true }: AboutBentoGridProps) {
  const navigate = useNavigate();
  const [ecosystemData, setEcosystemData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEcosystemData();
  }, []);

  const fetchEcosystemData = async () => {
    try {
      const { data, error } = await supabase
        .from('about_ecosystem')
        .select('*')
        .order('id', { ascending: false })
        .limit(1)
        .single();

      if (data && !error) {
        setEcosystemData(data);
      }
    } catch (err) {
      console.error('Error fetching ecosystem data:', err);
    } finally {
      setLoading(false);
    }
  };

  const defaultData = {
    title: "حلول تقنية متكاملة ترتقي بمسيرتك الأكاديمية والمهنية",
    subtitle: "صممنا كل ميزة بعناية فائقة لتلبي احتياجاتك الاحترافية وتضمن لك تجربة تعليمية غير مسبوقة.",
    description: "ابدأ رحلتك بلا أي التزامات مسبقة",
    sub_description: "امنح نفسك حق الوصول الكامل لجميع كورسات المنصة ومميزات لوحة التحكم لمدة 120 ساعة متواصلة. بدون بطاقات ائتمان.",
    features: [
      "محتوى مرئي بجودة عالية وعروض حية",
      "جلسات إرشاد ومراجعة مباشرة مع الخبراء",
      "مجتمع طلابي تفاعلي وداعم للمشاريع",
      "شهادات إنجاز معتمدة عند إتمام المسار"
    ]
  };

  const currentData = ecosystemData || defaultData;
  
  let rawFeatures: string[] = [];
  try {
    if (Array.isArray(currentData.features)) {
      rawFeatures = currentData.features;
    } else if (typeof currentData.features === 'string') {
      rawFeatures = JSON.parse(currentData.features || '[]');
    }
  } catch {
    rawFeatures = [
      "محتوى مرئي بجودة عالية وعروض حية",
      "جلسات إرشاد ومراجعة مباشرة مع الخبراء",
      "مجتمع طلابي تفاعلي وداعم للمشاريع",
      "شهادات إنجاز معتمدة عند إتمام المسار"
    ];
  }

  const featureIcons = [
    <HiOutlineVideoCamera className="w-6 h-6 text-cyan-500" />,
    <HiOutlineAcademicCap className="w-6 h-6 text-teal-500" />,
    <HiOutlineUserGroup className="w-6 h-6 text-indigo-500" />,
    <HiOutlineSparkles className="w-6 h-6 text-purple-500" />
  ];

  return (
    <div className="space-y-16 relative overflow-hidden" dir="rtl">
      
      {/* العنوان الرئيسي */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto space-y-4"
      >
        <div 
          style={{
            backgroundColor: isDark ? 'rgba(6, 182, 212, 0.1)' : 'rgba(6, 182, 212, 0.08)',
            borderColor: isDark ? 'rgba(6, 182, 212, 0.3)' : 'rgba(6, 182, 212, 0.2)',
            color: isDark ? '#22d3ee' : '#0891b2'
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black tracking-wider uppercase border"
        >
          <HiOutlineSparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
          <span>منظومة القوة والتميز الرقمي</span>
        </div>
        <h2 
          style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.2]"
        >
          أدوات احترافية لصناعة <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-500">مستقبل رقمي</span> بلا حدود
        </h2>
        <p 
          style={{ color: isDark ? '#94a3b8' : '#64748b' }}
          className="text-xs sm:text-sm font-medium leading-relaxed max-w-2xl mx-auto"
        >
          {currentData.subtitle}
        </p>
      </motion.div>

      {/* شبكة البطاقات */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* قسم المميزات الرئيسي */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            backgroundColor: isDark ? '#0f172a' : '#ffffff',
            borderColor: isDark ? '#1e293b' : '#e2e8f0'
          }}
          className="lg:col-span-12 xl:col-span-7 p-8 sm:p-10 rounded-[2.5rem] border relative overflow-hidden transition-all duration-500"
        >
          <div className="space-y-6 relative z-10">
            <div className="flex items-center justify-between">
              <div 
                style={{
                  backgroundColor: isDark ? 'rgba(6, 182, 212, 0.1)' : 'rgba(6, 182, 212, 0.08)',
                  borderColor: isDark ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.2)',
                  color: isDark ? '#22d3ee' : '#0891b2'
                }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl border text-xs font-black"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <span>المميزات الحصرية المعتمدة</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {rawFeatures.map((feature: string, index: number) => {
                const currentIcon = featureIcons[index % featureIcons.length];
                return (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.01, x: -4 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      backgroundColor: isDark ? '#030712' : '#f8fafc',
                      borderColor: isDark ? '#1e293b' : '#e2e8f0'
                    }}
                    className="p-5 sm:p-6 rounded-2xl border flex items-center justify-between gap-4 transition-all"
                  >
                    <span 
                      style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                      className="text-sm sm:text-base font-black tracking-tight"
                    >
                      {feature}
                    </span>
                    
                    <div 
                      style={{
                        backgroundColor: isDark ? 'rgba(6, 182, 212, 0.1)' : '#ffffff',
                        borderColor: isDark ? 'rgba(6, 182, 212, 0.2)' : '#cbd5e1'
                      }}
                      className="w-12 h-12 rounded-xl border shrink-0 flex items-center justify-center transition-all"
                    >
                      {currentIcon}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* قسم فلسفة المنصة الجانبي */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            backgroundColor: isDark ? '#0f172a' : '#ffffff',
            borderColor: isDark ? '#1e293b' : '#e2e8f0'
          }}
          className="lg:col-span-12 xl:col-span-5 p-8 sm:p-10 rounded-[2.5rem] border relative overflow-hidden transition-all duration-500 flex flex-col justify-between"
        >
          <div className="space-y-6 relative z-10">
            <div 
              style={{
                backgroundColor: isDark ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.08)',
                borderColor: isDark ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.2)',
                color: isDark ? '#c084fc' : '#9333ea'
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs font-black"
            >
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
              <span>فلسفة المنصة</span>
            </div>

            <h3 
              style={{ color: isDark ? '#ffffff' : '#0f172a' }}
              className="text-2xl sm:text-3xl font-black leading-tight"
            >
              {currentData.title}
            </h3>

            <p 
              style={{ color: isDark ? '#cbd5e1' : '#475569' }}
              className="text-sm leading-relaxed font-medium"
            >
              نعمل باستمرار على توفير بيئة تعليمية متكاملة تدمج بين التطبيق العملي والأداء الأكاديمي الرفيع لضمان تميزك الميداني.
            </p>
          </div>

          <div 
            style={{ borderColor: isDark ? '#1e293b' : '#e2e8f0' }}
            className="mt-8 pt-6 border-t relative z-10 space-y-3.5"
          >
            <div className="flex items-center gap-3 text-xs sm:text-sm font-bold" style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}>
              <div className="w-7 h-7 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                <HiOutlineCheckCircle className="w-4 h-4" />
              </div>
              <span>تحديثات مستمرة للمناهج والمسارات</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm font-bold" style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}>
              <div className="w-7 h-7 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                <HiOutlineCheckCircle className="w-4 h-4" />
              </div>
              <span>دعم مباشر ومتابعة دقيقة لمستوى التقدم</span>
            </div>
          </div>
        </motion.div>

        {/* قسم دعوة اتخاذ الإجراء VIP (Call To Action) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            backgroundColor: isDark ? '#0f172a' : '#ffffff',
            borderColor: isDark ? 'rgba(6, 182, 212, 0.3)' : '#e2e8f0'
          }}
          className="lg:col-span-12 relative p-8 sm:p-12 rounded-[2.5rem] border flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden transition-all duration-500"
        >
          <div className="space-y-4 max-w-2xl relative z-10 text-right">
            <div className="flex flex-wrap items-center gap-3">
              <div 
                style={{
                  backgroundColor: isDark ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.08)',
                  borderColor: isDark ? 'rgba(6, 182, 212, 0.4)' : 'rgba(6, 182, 212, 0.2)',
                  color: isDark ? '#67e8f9' : '#0891b2'
                }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border"
              >
                <HiOutlineStar className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                <span>عرض VIP حصري</span>
              </div>
              <div 
                style={{
                  backgroundColor: isDark ? 'rgba(6, 182, 212, 0.1)' : '#f8fafc',
                  borderColor: isDark ? 'rgba(6, 182, 212, 0.2)' : '#cbd5e1',
                  color: isDark ? '#22d3ee' : '#334155'
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-xl border"
              >
                <HiOutlineShieldCheck className="w-4 h-4" /> بدون بطاقات ائتمان
              </div>
              <div 
                style={{
                  backgroundColor: isDark ? 'rgba(16, 185, 129, 0.1)' : '#f8fafc',
                  borderColor: isDark ? 'rgba(16, 185, 129, 0.2)' : '#cbd5e1',
                  color: isDark ? '#34d399' : '#334155'
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-xl border"
              >
                <HiOutlineClock className="w-4 h-4" /> 120 ساعة كاملة
              </div>
            </div>

            <div className="space-y-2">
              <h3 
                style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                className="text-2xl sm:text-3xl font-black leading-snug"
              >
                {currentData.description}
              </h3>
              <p 
                style={{ color: isDark ? '#cbd5e1' : '#64748b' }}
                className="text-xs sm:text-sm leading-relaxed font-medium"
              >
                {currentData.sub_description}
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto shrink-0 relative z-10">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/auth')}
              className="w-full md:w-auto py-5 px-10 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-sm tracking-wide transition-all cursor-pointer flex items-center justify-center gap-3 group/btn border border-cyan-200/50"
            >
              <span>ابدأ رحلتك التعليمية الآن</span>
              <HiOutlineArrowLeft className="w-5 h-5 text-slate-950 group-hover/btn:-translate-x-1.5 transition-transform" />
            </motion.button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}