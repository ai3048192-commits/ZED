import React from 'react';
import { Users, GraduationCap, Award, BookOpen, Building2, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const StatsBar = () => {
  // بيانات الإحصائيات (الأرقام)
  const stats = [
    {
      id: 1,
      value: '+15 ألف',
      label: 'طالب نشط يتعلم معنا',
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 2,
      value: '+250',
      label: 'مدرس معتمد وخبير',
      icon: GraduationCap,
      gradient: 'from-indigo-500 to-blue-500',
    },
    {
      id: 3,
      value: '98%',
      label: 'نسبة النجاح والرضا',
      icon: Award,
      gradient: 'from-sky-400 to-blue-600',
    },
    {
      id: 4,
      value: '+50',
      label: 'دورة وبرنامج تعليمي',
      icon: BookOpen,
      gradient: 'from-cyan-400 to-indigo-600',
    },
  ];

  // أسماء شركاء النجاح
  const partners = [
    'أكاديمية المستقبل',
    'مدارس النخبة الدولية',
    'جامعة العلوم الحديثة',
    'منصة إدراك الرقمية',
    'معهد التكنولوجيا المتقدمة',
    'أكاديمية البرمجة الذكية',
    'كلية المستقبل للعلوم'
  ];

  return (
    <section className="relative w-full py-20 overflow-hidden bg-[#070b19]" dir="rtl">
      
      {/* خلفية جمالية خفيفة */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(0,42,255,0.06),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-16">
        
        {/* شبكة الإحصائيات الفاخرة */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <motion.div 
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="relative group bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-[#00bfff]/40 rounded-3xl p-6 backdrop-blur-xl transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1"
              >
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-[#002aff]/0 via-[#00bfff]/20 to-[#002aff]/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="flex items-center gap-4 relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} p-0.5 shadow-lg flex items-center justify-center shrink-0`}>
                    <div className="w-full h-full bg-[#070b19] rounded-[14px] flex items-center justify-center text-[#38bdf8]">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-3xl font-black text-white tracking-tight">
                      {stat.value}
                    </h3>
                    <p className="text-xs font-semibold text-slate-400 mt-1">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* --- قسم شركاء النجاح بتصميم (شريط متحرك / Ticker) عصري جداً --- */}
      <div className="relative w-full overflow-hidden border-y border-white/10 bg-white/[0.01] py-8">
        
        {/* تدرج جانبي لإخفاء الحواف بشكل فني (Fade Effect) */}
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#070b19] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#070b19] to-transparent z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-[#00bfff]" />
            <span>نعتز بثقة كبرى المؤسسات والجهات التعليمية</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>شراكات استراتيجية مستمرة</span>
          </div>
        </div>

        {/* الحاوية المتحركة */}
        <div className="flex overflow-hidden relative w-full">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="flex items-center gap-6 shrink-0 whitespace-nowrap min-w-max"
          >
            {/* نكرر القائمة مرتين لضمان استمرارية الحركة بدون فراغات */}
            {[...partners, ...partners].map((partner, index) => (
              <div 
                key={index}
                className="group flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.07] hover:border-[#00bfff]/40 transition-all duration-300 shadow-sm cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-[#00bfff]/10 flex items-center justify-center text-[#00bfff] group-hover:scale-110 transition-transform">
                  <Building2 className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold tracking-wide">{partner}</span>
              </div>
            ))}
          </motion.div>
        </div>

      </div>

    </section>
  );
};

 export default  StatsBar; // تم تصحيحها لـ export default أدناه
