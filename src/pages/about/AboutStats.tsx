import React, { useState, useEffect } from 'react';
import { 
  HiOutlineAcademicCap, 
  HiOutlineUserGroup, 
  HiOutlineSparkles, 
  HiOutlineHeart,
  HiOutlineArrowUpRight,
  HiOutlineChartBarSquare
} from 'react-icons/hi2';
import { supabase } from "../../lib/supabaseClient.js";

const iconsList = [
  <HiOutlineAcademicCap className="w-5 h-5" />,
  <HiOutlineUserGroup className="w-5 h-5" />,
  <HiOutlineSparkles className="w-5 h-5" />,
  <HiOutlineHeart className="w-5 h-5" />
];

const cardThemes = [
  {
    gradient: 'from-cyan-500/10 via-blue-500/5 to-transparent',
    border: 'hover:border-cyan-500/40',
    text: 'text-cyan-400',
    glow: 'group-hover:shadow-cyan-500/10'
  },
  {
    gradient: 'from-blue-500/10 via-indigo-500/5 to-transparent',
    border: 'hover:border-blue-500/40',
    text: 'text-blue-400',
    glow: 'group-hover:shadow-blue-500/10'
  },
  {
    gradient: 'from-indigo-500/10 via-purple-500/5 to-transparent',
    border: 'hover:border-indigo-500/40',
    text: 'text-indigo-400',
    glow: 'group-hover:shadow-indigo-500/10'
  },
  {
    gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    border: 'hover:border-emerald-500/40',
    text: 'text-emerald-400',
    glow: 'group-hover:shadow-emerald-500/10'
  }
];

interface AboutStatsProps {
  isDark: boolean;
}

export default function AboutStats({ isDark }: AboutStatsProps) {
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { data, error } = await supabase
      .from('about_experts')
      .select('*')
      .order('id', { ascending: true });
      
    if (!error && data) {
      setStats(data);
    }
  };

  return (
    <div className="w-full space-y-12" dir="rtl">
      
      {/* رأس Section */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div 
          style={{
            backgroundColor: isDark ? 'rgba(6, 182, 212, 0.1)' : 'rgba(6, 182, 212, 0.08)',
            borderColor: isDark ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.25)',
            color: isDark ? '#22d3ee' : '#0891b2'
          }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border shadow-inner"
        >
          <HiOutlineChartBarSquare className="w-4 h-4" />
          <span>لغة الأرقام والحقائق</span>
        </div>
        <h2 
          style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          className="text-3xl sm:text-4xl font-black tracking-tight"
        >
          إنجازات نتحدث عنها بكل <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">فخر واعتزاز</span>
        </h2>
        <p 
          style={{ color: isDark ? '#94a3b8' : '#475569' }}
          className="text-xs sm:text-sm font-medium leading-relaxed"
        >
          أرقام تعكس ثقة مئات الآلاف من الطلاب والخبراء في بناء مستقبلهم التقني معنا.
        </p>
      </div>

      {/* تصميم الـ Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.length > 0 ? (
          stats.map((item, index) => {
            const currentIcon = iconsList[index % iconsList.length];
            const theme = cardThemes[index % cardThemes.length];

            return (
              <div 
                key={item.id || index}
                style={{
                  backgroundColor: isDark ? 'rgba(15, 23, 42, 0.4)' : '#ffffff',
                  borderColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#cbd5e1'
                }}
                className={`relative group overflow-hidden rounded-3xl border p-6 sm:p-7 backdrop-blur-xl transition-all duration-500 ${theme.border} hover:-translate-y-1 hover:shadow-2xl ${theme.glow}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative z-10 flex flex-col justify-between h-full space-y-8">
                  
                  {/* رأس الكارد */}
                  <div className="flex items-center justify-between">
                    <div 
                      style={{
                        backgroundColor: isDark ? '#0f172a' : '#f1f5f9',
                        borderColor: isDark ? '#1e293b' : '#e2e8f0'
                      }}
                      className={`w-11 h-11 rounded-xl border flex items-center justify-center ${theme.text} shadow-sm group-hover:scale-110 transition-transform duration-300`}
                    >
                      {currentIcon}
                    </div>
                    <div 
                      style={{
                        backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : '#f1f5f9',
                        borderColor: isDark ? 'rgba(51, 65, 85, 0.5)' : '#cbd5e1',
                        color: isDark ? '#94a3b8' : '#64748b'
                      }}
                      className="w-8 h-8 rounded-full border flex items-center justify-center group-hover:text-white group-hover:bg-slate-800 transition-colors"
                    >
                      <HiOutlineArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* تفاصيل الرقم والمسمى */}
                  <div className="space-y-2">
                    <div 
                      style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                      className="text-3xl sm:text-4xl font-black tracking-tight flex items-baseline gap-1"
                    >
                      {item.count}
                    </div>
                    <p 
                      style={{ color: isDark ? '#94a3b8' : '#475569' }}
                      className="text-xs font-medium group-hover:text-cyan-500 transition-colors"
                    >
                      {item.name}
                    </p>
                  </div>

                  {/* شريط سفلي متحرك */}
                  <div 
                    style={{ backgroundColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#e2e8f0' }}
                    className="w-full h-1 rounded-full overflow-hidden"
                  >
                    <div className={`h-full w-0 group-hover:w-full bg-gradient-to-r from-transparent via-current to-transparent ${theme.text} transition-all duration-700`} />
                  </div>

                </div>
              </div>
            );
          })
        ) : (
          <div 
            style={{
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.2)' : '#ffffff',
              borderColor: isDark ? '#1e293b' : '#cbd5e1',
              color: isDark ? '#64748b' : '#64748b'
            }}
            className="col-span-full py-12 text-center text-sm rounded-3xl border"
          >
            جاري جلب أحدث الإحصائيات...
          </div>
        )}
      </div>

    </div>
  );
}