import React, { useState, useEffect } from 'react';
import { Users, GraduationCap, Award, BookOpen, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';

const StatsBar = ({ isDark }) => {
  const [stats, setStats] = useState([
    {
      id: 1,
      value: '+15K',
      label: 'طالب نشط',
      description: 'يتعلمون مهارات المستقبل معنا',
      icon: Users,
      icon_url: null,
    },
    {
      id: 2,
      value: '+250',
      label: 'خبير ومعتمد',
      description: 'نخبة من أفضل الأكاديميين',
      icon: GraduationCap,
      icon_url: null,
    },
    {
      id: 3,
      value: '98%',
      label: 'نسبة الرضا',
      description: 'بناءً على تقييمات الخريجين',
      icon: Award,
      icon_url: null,
    },
    {
      id: 4,
      value: '+50',
      label: 'برنامج تعليمي',
      description: 'مسارات مهنية متكاملة',
      icon: BookOpen,
      icon_url: null,
    },
  ]);

  useEffect(() => {
    async function fetchStats() {
      const { data, error } = await supabase
        .from('platform_stats')
        .select('*')
        .order('id', { ascending: true });

      if (data && !error && data.length > 0) {
        const formattedStats = data.map((item, index) => ({
          id: item.id,
          value: item.count,
          label: item.name,
          description: item.description || 'إحصائية معتمدة من المنصة',
          icon_url: item.icon_url,
          icon: [Users, GraduationCap, Award, BookOpen][index % 4],
        }));
        setStats(formattedStats);
      }
    }

    fetchStats();
  }, []);

  return (
    <section 
      style={{
        backgroundColor: isDark ? '#020617' : '#f8fafc',
        color: isDark ? '#f1f5f9' : '#0f172a'
      }}
      className="relative w-full py-24 overflow-hidden transition-colors duration-300" 
      dir="rtl"
    >
      
      {/* خلفية جمالية شبكية مع تدرج ضوئي متمركز */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* العنوان والوصف في المنتصف بتصميم عصري */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.08)',
              borderColor: isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.15)',
              color: isDark ? '#60a5fa' : '#2563eb'
            }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold mb-4 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-blue-500" />
            <span>مسيرة نجاح متواصلة</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
            className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight"
          >
            أرقام تعكس <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">ثقتكم</span> وتميزنا
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ color: isDark ? '#94a3b8' : '#475569' }}
            className="text-sm md:text-base mt-4 leading-relaxed font-medium"
          >
            نضع بين يديك بيئة تعليمية متكاملة تتطور باستمرار لتلبي طموحاتك المهنية وتحقق أهدافك بكفاءة عالية.
          </motion.p>
        </div>

        {/* شريط الإحصائيات المدمج والفاخر */}
        <div 
          style={{
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.8)',
            borderColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#e2e8f0'
          }}
          className="relative border rounded-[2.5rem] p-3 backdrop-blur-2xl shadow-2xl transition-colors duration-300"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map((stat, idx) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (idx * 0.1), duration: 0.4 }}
                  style={{
                    backgroundColor: isDark ? 'rgba(2, 6, 23, 0.4)' : 'rgba(248, 250, 252, 0.9)',
                  }}
                  className="group relative hover:border-blue-500/30 border border-transparent rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm"
                >
                  {/* خط مضيء علوي يظهر عند التحويم */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div>
                    {/* رأس البطاقة: الأيقونة مع زر تفاعلي خفيف */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                        {stat.icon_url ? (
                          <img 
                            src={stat.icon_url} 
                            alt={stat.label} 
                            className="w-5 h-5 object-cover rounded-lg" 
                          />
                        ) : (
                          <IconComponent className="w-5 h-5" />
                        )}
                      </div>
                      
                      <div 
                        style={{
                          backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : '#e2e8f0',
                          color: isDark ? '#94a3b8' : '#64748b'
                        }}
                        className="w-8 h-8 rounded-full flex items-center justify-center group-hover:text-blue-500 group-hover:bg-blue-500/10 transition-colors"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* القيمة الكبيرة واسم الإحصائية */}
                    <div>
                      <div 
                        style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                        className="text-3xl lg:text-4xl font-black tracking-tight group-hover:text-blue-500 transition-colors"
                      >
                        {stat.value}
                      </div>
                      <div 
                        style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
                        className="text-sm font-bold mt-1"
                      >
                        {stat.label}
                      </div>
                    </div>
                  </div>

                  {/* الوصف القصير في الأسفل */}
                  <div 
                    style={{ borderColor: isDark ? 'rgba(30, 41, 59, 0.5)' : '#e2e8f0' }}
                    className="mt-6 pt-3 border-t"
                  >
                    <p 
                      style={{ color: isDark ? '#94a3b8' : '#64748b' }}
                      className="text-[11px] font-medium leading-relaxed line-clamp-1"
                    >
                      {stat.description}
                    </p>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default StatsBar;