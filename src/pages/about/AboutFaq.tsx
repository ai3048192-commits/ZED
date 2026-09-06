import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  HiOutlineSparkles, 
  HiOutlineLightBulb,
  HiOutlineArrowUpRight,
} from "react-icons/hi2";
import { supabase } from "../../lib/supabaseClient.js";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

interface AboutFaqProps {
  openFaq: number | null;
  toggleFaq: (index: number) => void;
  isDark: boolean;
}

export default function AboutFaq({ openFaq, toggleFaq, isDark }: AboutFaqProps) {
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const { data, error } = await supabase
        .from("about_faqs")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error("خطأ في جلب الأسئلة الشائعة:", error.message);
      } else if (data) {
        setFaqs(data);
      }
    } catch (err) {
      console.error("حدث خطأ غير متوقع:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-28 pt-16 pb-24 overflow-hidden relative" dir="rtl">
      
      {/* إضاءات خلفية سينمائية ديناميكية */}
      <div className="absolute top-20 right-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* الهيدر العصري المدمج */}
      <div className="max-w-3xl mx-auto text-center space-y-4 px-4">
        <div 
          style={{
            backgroundColor: isDark ? 'rgba(6, 182, 212, 0.1)' : 'rgba(6, 182, 212, 0.08)',
            borderColor: isDark ? 'rgba(6, 182, 212, 0.3)' : 'rgba(6, 182, 212, 0.2)',
            color: isDark ? '#22d3ee' : '#0891b2'
          }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase border shadow-xl backdrop-blur-md"
        >
          <HiOutlineSparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
          <span>مركز المعرفة والاستفسارات</span>
        </div>
        
        <h2 
          style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.2]"
        >
          كل ما تحتاج معرفته عن <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">منصة ZED</span>
        </h2>

        <p 
          style={{ color: isDark ? '#94a3b8' : '#475569' }}
          className="text-xs sm:text-sm font-medium leading-relaxed max-w-2xl mx-auto"
        >
          إجابات واضحة ومباشرة صُممت خصيصاً لتمنحك رؤية شاملة وتجربة استخدام مرنة ومطمئنة.
        </p>
      </div>

      {/* تصميم البطاقات العريضة الأفقية (Wide Horizontal Cards) */}
      <div className="max-w-4xl mx-auto px-4">
        {loading ? (
          <div 
            style={{
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.4)' : 'rgba(255, 255, 255, 0.8)',
              borderColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#cbd5e1',
              color: isDark ? '#94a3b8' : '#64748b'
            }}
            className="text-center py-16 text-xs font-bold rounded-3xl border backdrop-blur-xl shadow-sm"
          >
            جاري تحميل الاستفسارات...
          </div>
        ) : faqs.length === 0 ? (
          <div 
            style={{
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.4)' : 'rgba(255, 255, 255, 0.8)',
              borderColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#cbd5e1',
              color: isDark ? '#94a3b8' : '#64748b'
            }}
            className="text-center py-16 text-xs font-bold rounded-3xl border backdrop-blur-xl shadow-sm"
          >
            لا توجد أسئلة شائعة مضافة حالياً.
          </div>
        ) : (
          <div className="space-y-5">
            {faqs.map((faq, idx) => {
              return (
                <div
                  key={faq.id || idx}
                  style={{
                    background: isDark 
                      ? 'linear-gradient(to right, rgba(15, 23, 42, 0.9), #030712, rgba(2, 6, 23, 0.95))' 
                      : 'linear-gradient(to right, rgba(255, 255, 255, 0.9), #f8fafc, rgba(241, 245, 249, 0.95))',
                    borderColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#cbd5e1'
                  }}
                  className="group relative p-6 sm:p-8 rounded-[2rem] border hover:border-cyan-500/50 backdrop-blur-2xl shadow-xl transition-all duration-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/15 transition-all" />

                  {/* الجزء الخاص بالسؤال والعنوان */}
                  <div className="space-y-3 flex-1 relative z-10">
                    <div className="flex items-center gap-3">
                      <span 
                        style={{
                          backgroundColor: isDark ? 'rgba(6, 182, 212, 0.1)' : 'rgba(6, 182, 212, 0.08)',
                          borderColor: isDark ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.3)',
                          color: isDark ? '#22d3ee' : '#0891b2'
                        }}
                        className="w-8 h-8 rounded-xl border flex items-center justify-center text-xs font-black shadow-sm"
                      >
                        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </span>
                      <h3 
                        style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                        className="text-base sm:text-lg font-black group-hover:text-cyan-500 transition-colors leading-snug"
                      >
                        {faq.question}
                      </h3>
                    </div>

                    <p 
                      style={{ color: isDark ? '#cbd5e1' : '#475569' }}
                      className="text-xs sm:text-sm leading-relaxed font-medium pr-11"
                    >
                      {faq.answer}
                    </p>
                  </div>

                  {/* الجزء الخاص بالزر أو التصنيف الجانبي */}
                  <div 
                    style={{ borderColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#e2e8f0' }}
                    className="flex items-center justify-between md:justify-end w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 gap-4 relative z-10 shrink-0"
                  >
                    <span className="hidden xl:flex items-center gap-1.5 text-xs text-cyan-500 font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                      <HiOutlineLightBulb className="w-4 h-4 text-cyan-500" /> معلومة معتمدة
                    </span>
                    <div 
                      style={{
                        backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#e2e8f0',
                        color: isDark ? '#94a3b8' : '#475569'
                      }}
                      className="w-9 h-9 rounded-xl group-hover:bg-cyan-500 group-hover:text-slate-950 flex items-center justify-center transition-all shadow-inner"
                    >
                      <HiOutlineArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}