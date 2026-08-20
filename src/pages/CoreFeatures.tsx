import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, Atom, Code2, Languages, Globe2, Cpu, ArrowLeft, Sparkles } from 'lucide-react';

const CategoriesBento = () => {
  const categories = [
    {
      title: 'البرمجة وتقنية المعلومات',
      count: '180+ دورة متقدمة',
      description: 'تعلم تطوير الويب، التطبيقات، والذكاء الاصطناعي أحدث التقنيات البرمجية.',
      icon: Code2,
      span: 'col-span-1 lg:col-span-2', // كارد عريض
      bgGradient: 'from-blue-600/20 via-indigo-600/10 to-transparent',
      borderColor: 'group-hover:border-blue-500/50',
      iconColor: 'text-blue-400',
    },
    {
      title: 'الرياضيات والمنطق',
      count: '120+ دورة',
      description: 'بناء التفكير النقدي وحل المسائل المعقدة.',
      icon: Calculator,
      span: 'col-span-1',
      bgGradient: 'from-cyan-500/20 via-blue-600/10 to-transparent',
      borderColor: 'group-hover:border-cyan-500/50',
      iconColor: 'text-cyan-400',
    },
    {
      title: 'العلوم والفيزياء',
      count: '95+ دورة',
      description: 'استكشاف أسرار الكون والطبيعة بطرق تفاعلية.',
      icon: Atom,
      span: 'col-span-1',
      bgGradient: 'from-indigo-500/20 via-purple-600/10 to-transparent',
      borderColor: 'group-hover:border-indigo-500/50',
      iconColor: 'text-indigo-400',
    },
    {
      title: 'اللغات والآداب',
      count: '110+ دورة',
      description: 'أتقن اللغات العالمية بطلاقة مع خبراء معتمدين.',
      icon: Languages,
      span: 'col-span-1 lg:col-span-2', // كارد عريض
      bgGradient: 'from-sky-400/20 via-blue-600/10 to-transparent',
      borderColor: 'group-hover:border-sky-400/50',
      iconColor: 'text-sky-400',
    },
    {
      title: 'الذكاء الاصطناعي',
      count: '85+ دورة',
      description: 'تعلم نماذج الذكاء الحديثة وهندسة الأوامر.',
      icon: Cpu,
      span: 'col-span-1 lg:col-span-2',
      bgGradient: 'from-blue-500/20 via-teal-500/10 to-transparent',
      borderColor: 'group-hover:border-teal-500/50',
      iconColor: 'text-teal-400',
    },
    {
      title: 'الدراسات الاجتماعية',
      count: '70+ دورة',
      description: 'فهم التاريخ، الجغرافيا، والاقتصاد العالمي.',
      icon: Globe2,
      span: 'col-span-1',
      bgGradient: 'from-blue-600/20 via-cyan-500/10 to-transparent',
      borderColor: 'group-hover:border-blue-400/50',
      iconColor: 'text-blue-300',
    },
  ];

  return (
    <section className="relative w-full py-28 px-6 bg-[#070b19] overflow-hidden border-t border-white/5" dir="rtl">
      
      {/* خلفية مضيئة متناسقة */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-[#002aff]/20 to-[#00bfff]/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* رأس القسم */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-[#38bdf8] text-xs font-bold mb-4"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>تصميم بنتو الحديث (Bento Grid)</span>
            </motion.div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              استكشف <span className="bg-gradient-to-r from-[#00bfff] via-[#38bdf8] to-[#002aff] bg-clip-text text-transparent">التخصصات الدراسية</span>
            </h2>
          </div>
          
          <p className="text-slate-400 text-sm max-w-sm font-medium leading-relaxed">
            اختر مجالك المفضل وابدأ رحلة التعلم مع أحدث المناهج المصممة خصيصاً لتطوير مهاراتك.
          </p>
        </div>

        {/* شبكة البنتو (Bento Grid Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className={`relative group bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 ${cat.borderColor} rounded-3xl p-8 backdrop-blur-2xl transition-all duration-500 cursor-pointer overflow-hidden shadow-2xl flex flex-col justify-between ${cat.span}`}
              >
                {/* خلفية متدرجة ديناميكية تظهر عند التحويم */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div>
                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                      <Icon className={`w-7 h-7 ${cat.iconColor}`} />
                    </div>
                    <span className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold text-slate-300 shadow-sm">
                      {cat.count}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-2xl font-black text-white group-hover:text-[#38bdf8] transition-colors mb-3 tracking-tight">
                      {cat.title}
                    </h3>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-white transition-colors relative z-10">
                  <span>تصفح المواد والمناهج</span>
                  <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center group-hover:bg-[#002aff] group-hover:text-white transition-all">
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CategoriesBento;