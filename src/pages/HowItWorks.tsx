import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Compass, Trophy, ArrowLeft, Sparkles } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'أنشئ حسابك مجاناً',
      description: 'سجل بريدك الإلكتروني في ثوانٍ معدودة وانضم إلى مجتمع ZED التعليمي.',
      icon: UserPlus,
      badge: 'الخطوة الأولى',
    },
    {
      number: '02',
      title: 'اختر كورسك وتخصصك',
      description: 'تصفح مئات الدورات والمناهج المتقدمة واختر ما يناسب شغفك ومستقبلك.',
      icon: Compass,
      badge: 'الخطوة الثانية',
    },
    {
      number: '03',
      title: 'ابدأ التعلم وتفوق',
      description: 'شاهد الدروس، تفاعل مع الاختبارات الفورية، واحصل على شهادة اعتمادك.',
      icon: Trophy,
      badge: 'الخطوة الثالثة',
    },
  ];

  return (
    <section className="relative w-full py-28 px-6 bg-[#070b19] overflow-hidden border-t border-white/5" dir="rtl">
      
      {/* خلفية جمالية خفيفة */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-gradient-to-tr from-[#002aff]/15 to-[#00bfff]/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* رأس القسم */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-[#38bdf8] text-xs font-bold mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>خطوات بسيطة نحو نجاحك</span>
          </motion.div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6">
            كيف تبدأ رحلتك مع <span className="bg-gradient-to-r from-[#00bfff] via-[#38bdf8] to-[#002aff] bg-clip-text text-transparent">ZED</span>؟
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-medium">
            ثلاث خطوات سهلة تفصلك عن الانطلاق الحقيقي وتطوير مهاراتك الدراسية والمهنية.
          </p>
        </div>

        {/* شبكة الخطوات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="relative group bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-[#00bfff]/40 rounded-3xl p-8 backdrop-blur-2xl transition-all duration-500 shadow-2xl flex flex-col justify-between"
              >
                {/* تأثير إضاءة عند التحويم */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#002aff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

                <div>
                  {/* رأس الكارد: الرقم والشارة */}
                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <span className="text-4xl font-black text-slate-700 group-hover:text-[#00bfff] transition-colors">
                      {step.number}
                    </span>
                    <span className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold text-slate-300">
                      {step.badge}
                    </span>
                  </div>

                  {/* الأيقونة */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 p-0.5 shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <div className="w-full h-full bg-[#070b19] rounded-[14px] flex items-center justify-center text-[#38bdf8]">
                      <Icon className="w-8 h-8" />
                    </div>
                  </div>

                  {/* النصوص */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* مؤشر سفلي جمالي */}
                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-slate-300 transition-colors relative z-10">
                  <span>ابدأ الآن</span>
                  <div className="w-7 h-7 rounded-full bg-white/[0.04] flex items-center justify-center group-hover:bg-[#002aff] group-hover:text-white transition-all">
                    <ArrowLeft className="w-3.5 h-3.5" />
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

export default HowItWorks;