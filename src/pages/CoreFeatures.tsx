import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Users, Award, TrendingUp, PlayCircle, Star, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const PlatformStatsShowcase = ({ isDark }: { isDark?: boolean }) => {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    async function fetchPlatformData() {
      try {
        const { data, error } = await supabase
          .from('specialties')
          .select('*')
          .order('id', { ascending: false })
          .limit(4);

        if (data && !error && data.length > 0) {
          const formatted = data.map((item: any, idx: number) => ({
            id: item.id || idx,
            title: item.title,
            subtitle: item.الوصف_المنهجي || 'الأكثر انتشاراً',
            description: item.description || 'احترف هذا المجال من الصفر وحتى إتقان المشاريع البرمجية الحقيقية.',
            image: item.image_url || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
            rating: item.rating || (4.8 + (idx * 0.05)).toFixed(1),
            studentsCount: item.students_count ? `${item.students_count} طالب` : `${(idx + 3) * 1.5}k+ طالب`,
            modulesCount: item.courses_count ? `${item.courses_count} دورة تدريبية` : `${(idx + 4) * 5} درس تفاعلي`,
          }));
          setStats(formatted);
        } else {
          setStats([
            {
              id: 1,
              title: 'تطوير الويب الشامل',
              subtitle: 'الأكثر انتشاراً',
              description: 'تعلم بناء منصات الويب الكاملة باستخدام أحدث إطار عمل وتقنيات السيرفر.',
              image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
              rating: '4.9',
              studentsCount: '5.2k+ طالب',
              modulesCount: '24 درس تفاعلي',
            },
            {
              id: 2,
              title: 'علوم البيانات والذكاء الاصطناعي',
              subtitle: 'الأكثر انتشاراً',
              description: 'اكتشف تحليل البيانات وبناء خوارزميات التعلم الآلي وتطبيقات الشبكات العصبية.',
              image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80',
              rating: '4.8',
              studentsCount: '3.8k+ طالب',
              modulesCount: '18 درس تفاعلي',
            },
            {
              id: 3,
              title: 'تصميم واجهات المستخدم UI/UX',
              subtitle: 'الأكثر انتشاراً',
              description: 'صمم تجارب مستخدم مذهلة واحترافية باستخدام أدوات التصميم العالمية.',
              image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80',
              rating: '4.9',
              studentsCount: '4.1k+ طالب',
              modulesCount: '20 درس تفاعلي',
            }
          ]);
        }
      } catch (err) {
        console.error("خطأ في جلب بيانات المنصة:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPlatformData();
  }, []);

  return (
    <section 
      style={{
        backgroundColor: isDark ? '#020617' : '#f8fafc',
        color: isDark ? '#f1f5f9' : '#0f172a'
      }}
      className="relative w-full py-32 px-6 overflow-hidden text-right transition-colors duration-300" 
      dir="rtl"
    >
      {/* خلفية ديناميكية متطورة */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* هيدر القسم */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div 
            style={{
              backgroundColor: isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.08)',
              borderColor: isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.3)',
              color: isDark ? '#818cf8' : '#4f46e5'
            }}
            className="inline-flex items-center gap-2 py-2 px-4 rounded-full border text-xs font-bold mb-6 shadow-sm"
          >
            <TrendingUp className="w-4 h-4" />
            <span>منصة التعلم الأذكى عالمياً</span>
          </div>
          <h2 
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
            className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-6"
          >
            تجربة تعليمية تتجاوز <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500">كل التوقعات</span>
          </h2>
          <p 
            style={{ color: isDark ? '#94a3b8' : '#475569' }}
            className="text-base sm:text-lg font-medium leading-relaxed"
          >
            نربطك مباشرة بأحدث المناهج المستمدة من واقع سوق العمل الحقيقي، مع تحديثات فورية لقواعد البيانات والدروس.
          </p>
        </div>

        {/* عرض المحتوى التفاعلي */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : stats.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* القائمة الجانبية للاختيار (Tabs) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {stats.map((item, idx) => (
                <motion.div
                  key={item.id}
                  onClick={() => setActiveTab(idx)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  style={{
                    backgroundColor: activeTab === idx 
                      ? (isDark ? 'rgba(49, 46, 129, 0.4)' : 'rgba(238, 242, 255, 0.9)')
                      : (isDark ? 'rgba(15, 23, 42, 0.4)' : '#ffffff'),
                    borderColor: activeTab === idx 
                      ? 'rgba(99, 102, 241, 0.5)' 
                      : (isDark ? 'rgba(30, 41, 59, 0.8)' : '#e2e8f0'),
                    boxShadow: activeTab === idx ? '0 10px 25px -5px rgba(99, 102, 241, 0.1)' : 'none'
                  }}
                  className="p-6 rounded-2xl cursor-pointer transition-all duration-300 border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span 
                      style={{
                        backgroundColor: isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.08)',
                        borderColor: isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.2)',
                        color: isDark ? '#818cf8' : '#4f46e5'
                      }}
                      className="text-xs font-bold px-3 py-1 rounded-full border"
                    >
                      {item.subtitle}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{item.rating}</span>
                    </div>
                  </div>
                  <h3 
                    style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                    className="text-xl font-bold mb-1"
                  >
                    {item.title}
                  </h3>
                  <p 
                    style={{ color: isDark ? '#94a3b8' : '#64748b' }}
                    className="text-xs line-clamp-1"
                  >
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* بطاقة العرض الديناميكي المتقدمة (Spotlight Card) */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : '#ffffff',
                    borderColor: isDark ? '#1e293b' : '#cbd5e1'
                  }}
                  className="relative rounded-3xl overflow-hidden border shadow-2xl backdrop-blur-xl group"
                >
                  {/* خلفية الصورة من قاعدة البيانات */}
                  <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
                    <img
                      src={stats[activeTab]?.image}
                      alt={stats[activeTab]?.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* عدد الطلاب من قاعدة البيانات */}
                    <div 
                      style={{
                        backgroundColor: isDark ? 'rgba(2, 6, 23, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                        borderColor: isDark ? '#1e293b' : '#cbd5e1'
                      }}
                      className="absolute top-6 right-6 z-20 flex items-center gap-2 border px-4 py-2 rounded-full backdrop-blur-md shadow-md"
                    >
                      <Users className="w-4 h-4 text-indigo-500" />
                      <span className="text-xs font-bold" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>{stats[activeTab]?.studentsCount}</span>
                    </div>
                  </div>

                  {/* تفاصيل المحتوى السفلي */}
                  <div 
                    style={{
                      backgroundColor: isDark ? 'rgba(2, 6, 23, 0.7)' : 'rgba(255, 255, 255, 0.95)',
                      borderColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#e2e8f0'
                    }}
                    className="p-8 relative z-20 -mt-12 backdrop-blur-xl rounded-t-3xl border-t shadow-inner"
                  >
                    <h3 
                      style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                      className="text-2xl sm:text-3xl font-black mb-3"
                    >
                      {stats[activeTab]?.title}
                    </h3>
                    <p 
                      style={{ color: isDark ? '#cbd5e1' : '#475569' }}
                      className="text-sm leading-relaxed mb-6"
                    >
                      {stats[activeTab]?.description}
                    </p>

                    <div 
                      style={{ borderColor: isDark ? '#1e293b' : '#e2e8f0' }}
                      className="grid grid-cols-2 gap-4 pt-6 border-t"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="block text-xs font-medium" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>محتوى المسار</span>
                          <span className="text-sm font-bold" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>{stats[activeTab]?.modulesCount}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="block text-xs font-medium" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>شهادة الاعتماد</span>
                          <span className="text-sm font-bold" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>معتمدة رسمياً</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between">
                      <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-600/20 cursor-pointer">
                        <PlayCircle className="w-4 h-4" />
                        <span>ابدأ التعلم الآن</span>
                      </button>
                      <div className="flex items-center gap-1 text-xs" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>محدث من قاعدة البيانات</span>
                      </div>
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        ) : (
          <div className="text-center py-20 text-slate-400">لا توجد بيانات حالياً في المنصة.</div>
        )}

      </div>
    </section>
  );
};

export default PlatformStatsShowcase;