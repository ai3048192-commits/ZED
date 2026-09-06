import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight, Compass, ShieldCheck, Zap } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface HowItWorksInteractiveProps {
  isDark: boolean;
}

export default function HowItWorksInteractive({ isDark }: HowItWorksInteractiveProps) {
  const [steps, setSteps] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJourneySteps() {
      try {
        const { data, error } = await supabase
          .from('journey_steps')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          setSteps(
            data.map((item: any, index: number) => ({
              id: item.id,
              number: `0${index + 1}`,
              title: item.title,
              description: item.description,
              image: item.image_url,
              tag: `المحطة الرئيسية 0${index + 1}`,
            }))
          );
        } else {
          setSteps([
            {
              id: 1,
              number: '01',
              title: 'التسجيل وبناء الملف الشخصي',
              description: 'ابدأ بإنشاء حسابك وتحديد أهدافك التعليمية لكي يقوم نظامنا الذكي بتخصيص مسار فريد يلائم طموحاتك المهنية.',
              image: null,
              tag: 'المحطة الرئيسية 01',
            },
            {
              id: 2,
              number: '02',
              title: 'استكشاف المناهج التفاعلية',
              description: 'انغمس في محتوى غني مدعوم بمشاريع عملية واقعية وشرح سلس من نخبة الخبراء والمتخصصين في مجالك.',
              image: null,
              tag: 'المحطة الرئيسية 02',
            },
            {
              id: 3,
              number: '03',
              title: 'التطبيق العملي ونيل الشهادة',
              description: 'نفذ مشاريع تخرج حقيقية تختبر مهاراتك، واحصل على شهادة اعتماد رسمية تعزز حضورك في سوق العمل.',
              image: null,
              tag: 'المحطة الرئيسية 03',
            },
          ]);
        }
      } catch (err) {
        console.error('Error fetching steps:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchJourneySteps();
  }, []);

  const nextStep = () => {
    if (steps.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    if (steps.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <section 
      style={{
        backgroundColor: isDark ? '#020617' : '#f8fafc',
      }}
      className="relative w-full py-32 px-6 overflow-hidden border-t transition-colors duration-300" 
      dir="rtl"
    >
      
      {/* خلفية تفاعلية */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* رأس القسم */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.08)',
              borderColor: isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)',
              color: isDark ? '#67e8f9' : '#0284c7'
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6 backdrop-blur-md shadow-lg"
          >
            <Sparkles className="w-4 h-4 animate-pulse text-cyan-500" />
            <span>تجربة تفاعلية متكاملة</span>
          </motion.div>
          
          <h2 
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
            className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-6"
          >
            كيف تتكشف رحلتك معنا خطوة بخطوة؟
          </h2>
          
          <p 
            style={{ color: isDark ? '#94a3b8' : '#475569' }}
            className="text-base sm:text-lg font-medium leading-relaxed"
          >
            تنقل عبر محطات النجاح واكتشف كيف نصنع معاً فارقاً حقيقياً في مسارك التقني.
          </p>
        </div>

        {/* حالة التحميل */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-400 font-medium text-sm">جاري تجهيز محطات الرحلة...</p>
          </div>
        ) : steps.length === 0 ? (
          <div className="text-center text-slate-400 py-12">لا توجد خطوات متوفرة حالياً.</div>
        ) : (
          <div 
            style={{
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.4)' : '#ffffff',
              borderColor: isDark ? '#1e293b' : '#cbd5e1'
            }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden transition-colors duration-300"
          >
            
            {/* القائمة الجانبية للمحطات */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {steps.map((step, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={step.id || idx}
                    onClick={() => setActiveIndex(idx)}
                    style={{
                      backgroundColor: isActive 
                        ? (isDark ? 'rgba(37, 99, 235, 0.2)' : 'rgba(37, 99, 235, 0.1)') 
                        : (isDark ? 'rgba(15, 23, 42, 0.6)' : '#f8fafc'),
                      borderColor: isActive 
                        ? '#3b82f6' 
                        : (isDark ? '#1e293b' : '#cbd5e1'),
                    }}
                    className={`text-right p-5 rounded-2xl transition-all duration-300 border flex items-center justify-between group relative overflow-hidden shadow-sm`}
                  >
                    {isActive && (
                      <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-blue-500 rounded-l" />
                    )}

                    <div className="flex items-center gap-4">
                      <span className={`text-lg font-black transition-colors ${isActive ? 'text-blue-500' : (isDark ? 'text-slate-500' : 'text-slate-400')}`}>
                        {step.number}
                      </span>
                      <div>
                        <span className="block text-xs font-bold text-slate-400 mb-1">{step.tag}</span>
                        <h4 
                          style={{
                            color: isActive 
                              ? (isDark ? '#ffffff' : '#0f172a') 
                              : (isDark ? '#cbd5e1' : '#334155')
                          }}
                          className="text-base sm:text-lg font-bold transition-colors"
                        >
                          {step.title}
                        </h4>
                      </div>
                    </div>

                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isActive ? 'bg-blue-600 text-white shadow-md' : (isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700')
                    }`}>
                      <ChevronLeft className="w-4 h-4" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* محتوى المحطة النشطة */}
            <div 
              style={{
                backgroundColor: isDark ? 'rgba(2, 6, 23, 0.6)' : '#f8fafc',
                borderColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#cbd5e1'
              }}
              className="lg:col-span-7 relative min-h-[380px] border rounded-2xl p-8 flex flex-col justify-between overflow-hidden shadow-inner transition-colors duration-300"
            >
              
              <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10 flex flex-col h-full justify-between gap-6"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div 
                        style={{
                          backgroundColor: isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(37, 99, 235, 0.15)',
                          borderColor: 'rgba(59, 130, 246, 0.5)'
                        }}
                        className="w-12 h-12 rounded-xl border p-3 flex items-center justify-center text-white shadow-md"
                      >
                        {steps[activeIndex].image ? (
                          <img 
                            src={steps[activeIndex].image} 
                            alt={steps[activeIndex].title} 
                            className="w-full h-full object-cover rounded-lg" 
                          />
                        ) : (
                          <Compass className="w-full h-full text-blue-400 drop-shadow-md" />
                        )}
                      </div>
                      <span 
                        style={{
                          backgroundColor: isDark ? '#0f172a' : '#ffffff',
                          borderColor: isDark ? '#334155' : '#cbd5e1',
                          color: isDark ? '#67e8f9' : '#0284c7'
                        }}
                        className="px-3.5 py-1.5 rounded-full border text-xs font-bold shadow-sm"
                      >
                        {steps[activeIndex].number} / 0{steps.length}
                      </span>
                    </div>

                    <h3 
                      style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                      className="text-2xl sm:text-3xl font-black mb-4 tracking-tight"
                    >
                      {steps[activeIndex].title}
                    </h3>
                    
                    <p 
                      style={{ color: isDark ? '#cbd5e1' : '#475569' }}
                      className="text-base font-medium leading-relaxed"
                    >
                      {steps[activeIndex].description}
                    </p>
                  </div>

                  {/* مزايا إضافية */}
                  <div 
                    style={{ borderColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#cbd5e1' }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold" style={{ color: isDark ? '#cbd5e1' : '#334155' }}>
                      <ShieldCheck className="w-4 h-4 text-blue-500" />
                      <span>موثق ومعتمد بالكامل</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold" style={{ color: isDark ? '#cbd5e1' : '#334155' }}>
                      <Zap className="w-4 h-4 text-indigo-500" />
                      <span>تطبيق عملي فوري</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* أزرار التنقل السفلية */}
              <div 
                style={{ borderColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#cbd5e1' }}
                className="flex items-center justify-between pt-6 mt-6 border-t relative z-10"
              >
                <span className="text-xs font-bold" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>انتقل بين المحطات للتعرف أكثر</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={prevStep}
                    style={{
                      backgroundColor: isDark ? '#1e293b' : '#ffffff',
                      borderColor: isDark ? '#334155' : '#cbd5e1',
                      color: isDark ? '#ffffff' : '#0f172a'
                    }}
                    className="w-10 h-10 rounded-xl border hover:opacity-80 flex items-center justify-center transition-all shadow-md"
                    aria-label="المحطة السابقة"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={nextStep}
                    style={{
                      backgroundColor: '#2563eb',
                      borderColor: '#3b82f6',
                      color: '#ffffff'
                    }}
                    className="w-10 h-10 rounded-xl border hover:opacity-90 flex items-center justify-center transition-all shadow-md shadow-blue-600/30"
                    aria-label="المحطة التالية"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}