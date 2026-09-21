import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineAcademicCap, 
  HiOutlineVideoCamera, 
  HiOutlineBookOpen,
  HiOutlineUserGroup,
  HiOutlineChip,
  HiOutlineBadgeCheck,
  HiOutlineSupport,
  HiOutlineChartBar,
  HiOutlineCheckCircle,
  HiOutlineRefresh,
  HiOutlineGlobe,
  HiOutlineSparkles,
  HiOutlineLightningBolt,
  HiOutlineCode,
  HiOutlineDatabase,
  HiOutlineShieldCheck,
  HiOutlineCalculator
} from 'react-icons/hi';

interface EducationalPlatformProps {
  isDark: boolean;
}

export default function EducationalPlatform({ isDark }: EducationalPlatformProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'courses' | 'live' | 'ai' | 'community' | 'advanced'>('all');

  const platformSections = [
    {
      id: 'edu-1',
      category: 'courses',
      title: 'المسارات الأكاديمية والمناهج المتقدمة',
      icon: <HiOutlineAcademicCap className="w-7 h-7" />,
      badge: 'المناهج الدراسية',
      gradient: 'from-blue-500 via-indigo-500 to-purple-600',
      desc: 'مسارات تعليمية متكاملة مصممة بأعلى معايير الجودة العالمية لتغطية كافة المراحل الدراسية والمهنية بإشراف نخبة من أكفأ الخبراء:',
      features: [
        'مناهج مرنة ومحدثة باستمرار لتواكب أحدث المعايير التعليمية.',
        'شرح عميق ومبسط يفكك أتعقد المفاهيم الأكاديمية.',
        'اختبارات تقييمية ذكية بعد كل درس لقياس مستوى الفهم والتحصيل.'
      ]
    },
    {
      id: 'edu-2',
      category: 'live',
      title: 'الحصص التفاعلية والبث المباشر الفائق',
      icon: <HiOutlineVideoCamera className="w-7 h-7" />,
      badge: 'بث مباشر تفاعلي',
      gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
      desc: 'قاعات افتراضية متطورة تتيح لك التفاعل الحي مع المعلمين، طرح الأسئلة، ومشاركة الشاشات وكأنك في قاعة دراسية حقيقية:',
      features: [
        'بث فائق الجودة (HD) بدون أي تقطيع مع ميزة رفع اليد والمداخلات الصوتية.',
        'مكتبة تسجيلات كاملة يمكنك العودة إليها في أي وقت للمراجعة.',
        'حصص استثنائية مخصصة للتدريب على حل التمارين والامتحانات السابقة.'
      ]
    },
    {
      id: 'edu-3',
      category: 'courses',
      title: 'المكتبة الرقمية والملازم الشاملة',
      icon: <HiOutlineBookOpen className="w-7 h-7" />,
      badge: 'المراجع والملخصات',
      gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
      desc: 'مرجعك الشامل الذي يضم مئات الملازم، الكتب الإلكترونية، والملخصات الذهبية الجاهزة للقراءة والتحميل الفوري:',
      features: [
        'خرائط ذهنية وملخصات بصرية مصممة لتثبيت المعلومات بسرعة.',
        'بنك أسئلة ضخم ومتجدد يغطي كافة الأفكار الامتحانية.',
        'إمكانية التصفح السريع عبر المنصة أو التحميل بصيغة PDF عالية الدقة.'
      ]
    },
    {
      id: 'edu-4',
      category: 'ai',
      title: 'المساعد الذكي الشخصي (AI Tutor)',
      icon: <HiOutlineChip className="w-7 h-7" />,
      badge: 'الذكاء الاصطناعي',
      gradient: 'from-violet-500 via-purple-500 to-pink-600',
      desc: 'معلمك الذكي المرافق لك طوال الأวัน، جاهز للإجابة عن أي استفسار، شرح المعادلات المعقدة، وتبسيط العلوم الصعبة:',
      features: [
        'شرح فوري وتفصيلي للمسائل والمعادلات الرياضية بخطوات مرتبة.',
        'توليد اختبارات وتحديات مخصصة خصيصاً لمعالجة نقاط ضعفك.',
        'تحليل أداء ذكي يوجهك للمواضيع التي تحتاج إلى تركيز ومضاعفة جهد.'
      ]
    },
    {
      id: 'edu-5',
      category: 'community',
      title: 'المجتمع الطلابي وغرف النقاش النشطة',
      icon: <HiOutlineUserGroup className="w-7 h-7" />,
      badge: 'المجتمع التفاعلي',
      gradient: 'from-amber-400 via-orange-500 to-red-600',
      desc: 'انضم لبيئة طلابية محفزة، تعاون مع زملائك في حل التمارين، وتبادل الخبرات والمعلومات الدراسية بكل حماسة وشغف:',
      features: [
        'منتديات نقاش مخصصة لكل مادة دراسية للتفاعل الجماعي.',
        'مسابقات وتحديات أسبوعية بين الطلاب لخلق روح المنافسة الشريفة.',
        'إشراف ومتابعة مستمرة من مشرفي المنصة لحل أي استفسار جماعي.'
      ]
    },
    {
      id: 'edu-6',
      category: 'ai',
      title: 'لوحة القياس ومتابعة الأداء الأكاديمي',
      icon: <HiOutlineChartBar className="w-7 h-7" />,
      badge: 'التقارير التحليلية',
      gradient: 'from-pink-500 via-rose-500 to-purple-600',
      desc: 'رسوم بيانية وتقارير إحصائية دقيقة توضح بدقة نسب إنجازك، نقاط قوتك، والمسارات التي تتطلب منك مزيداً من الجهد:',
      features: [
        'متابعة تفصيلية لنسب إتمام الفيديوهات والدروس والمهام.',
        'رصد بياني لتطور درجاتك في الاختبارات عبر الزمني.',
        'تقارير دورية متقدمة لأولياء الأمور لمتابعة تحصيل أبنائهم الدراسي.'
      ]
    },
    {
      id: 'edu-7',
      category: 'courses',
      title: 'شهادات الإتمام المعتمدة والموثقة',
      icon: <HiOutlineBadgeCheck className="w-7 h-7" />,
      badge: 'الشهادات الرسمية',
      gradient: 'from-blue-600 via-cyan-500 to-teal-500',
      desc: 'احصل على شهادات رسمية موثقة من منصة Z E D عند إتمام المسارات، تدعم سيرتك الذاتية وتعزز مكانتك الأكاديمية:',
      features: [
        'شهادات رقمية فاخرة مزودة برمز تحقق فريد (QR Code).',
        'إمكانية المشاركة الفورية للشهادة على منصات التوظيف وشبكات التواصل.',
        'إثبات حقيقي للمهارات المكتسبة طوال فترة الدراسة.'
      ]
    },
    {
      id: 'edu-8',
      category: 'community',
      title: 'الدعم الفني والأكاديمي على مدار الساعة',
      icon: <HiOutlineSupport className="w-7 h-7" />,
      badge: 'دعم 24/7',
      gradient: 'from-indigo-600 via-blue-600 to-cyan-600',
      desc: 'فريق دعم متكامل تقنياً وأكاديمياً متواجد طوال الوقت لضمان سير تجربتك التعليمية بسلاسة تامة ودون أي عقبات:',
      features: [
        'استجابة سريعة وفورية لحل أي مشكلة تقنية أو برمجية.',
        'مساعدة في إعداد الحسابات وضبط إعدادات التصفح.',
        'إرشادات توجيهية مستمرة للطلاب الجدد للاستفادة القصوى من المنصة.'
      ]
    },
    {
      id: 'edu-9',
      category: 'advanced',
      title: 'معامل البرمجة وتطوير البرمجيات الافتراضية',
      icon: <HiOutlineCode className="w-7 h-7" />,
      badge: 'المعامل التفاعلية',
      gradient: 'from-emerald-500 via-green-600 to-teal-700',
      desc: 'بيئة برمجة حية ومدمجة داخل المتصفح تتيح لك كتابة الكود، تنفيذه، وتصحيح أخطائه فوراً دون الحاجة لتثبيت برامج معقدة:',
      features: [
        'دعم كامل لكافة لغات البرمجة الحديثة (Python, JavaScript, C++, وغيرها).',
        'مصحح أخطاء ذكي يوضح لك سبب المشكلة في كودك البرمجي.',
        'مشاريع عملية تطبيقية تضعك على أول طريق الاحتراف.'
      ]
    },
    {
      id: 'edu-10',
      category: 'advanced',
      title: 'إدارة قواعد البيانات وتحليل البيانات الضخمة',
      icon: <HiOutlineDatabase className="w-7 h-7" />,
      badge: 'علوم البيانات',
      gradient: 'from-blue-700 via-indigo-700 to-purple-800',
      desc: 'مسارات متخصصة في عالم البيانات، تعلم كيفية استخراج، تحليل، وتصنيف البيانات الضخمة باستخدام أحدث الأدوات والتقنيات:',
      features: [
        'تطبيقات عملية على قواعد البيانات العلائقية وغير العلائقية.',
        'بناء لوحات معلومات (Dashboards) تفصيلية واحترافية.',
        'فهم عميق لأنماط استخراج القرار المبني على البيانات.'
      ]
    },
    {
      id: 'edu-11',
      category: 'advanced',
      title: 'أمن Information Security والأمن السيبراني',
      icon: <HiOutlineShieldCheck className="w-7 h-7" />,
      badge: 'الأمن السيبراني',
      gradient: 'from-red-500 via-rose-600 to-pink-700',
      desc: 'احمِ العالم الرقمي وتعرف على أحدث استراتيجيات تأمين الأنظمة، اكتشاف الثغرات، وحماية البيانات من الاختراقات:',
      features: [
        'سيناريوهات حية لاختبار الاختراق الأخلاقي وحماية الشبكات.',
        'دراسة أحدث بروتوكولات التشفير وأمان التطبيقات.',
        'تدريبات عملية مكثفة لكشف الثغرات الأمنية ومعالجتها.'
      ]
    },
    {
      id: 'edu-12',
      category: 'advanced',
      title: 'الرياضيات المتقدمة وحل المسائل الهندسية المعقدة',
      icon: <HiOutlineCalculator className="w-7 h-7" />,
      badge: 'العلوم والرياضيات',
      gradient: 'from-amber-500 via-yellow-600 to-orange-700',
      desc: 'منظومة فريدة لتبسيط العلوم البحتة والرياضيات المتقدمة، مع أمثلة تطبيقية تربط النظريات بواقع الحياة العملية:',
      features: [
        'شرح مرئي ثلاثي الأبعاد للنظريات الهندسية والجبرية.',
        'تدريبات تفاعلية متدرجة الصعوبة لترسيخ القواعد.',
        'حلول نموذجية مشروحة بخطوات تفصيلية دقيقة.'
      ]
    }
  ];

  const filteredSections = activeFilter === 'all' 
    ? platformSections 
    : platformSections.filter(section => section.category === activeFilter);

  const filters = [
    { id: 'all', label: 'الكل', count: platformSections.length, icon: <HiOutlineGlobe className="w-4 h-4" /> },
    { id: 'courses', label: 'المناهج والكورسات', count: platformSections.filter(s => s.category === 'courses').length, icon: <HiOutlineAcademicCap className="w-4 h-4" /> },
    { id: 'live', label: 'البث المباشر', count: platformSections.filter(s => s.category === 'live').length, icon: <HiOutlineVideoCamera className="w-4 h-4" /> },
    { id: 'ai', label: 'الذكاء الاصطناعي', count: platformSections.filter(s => s.category === 'ai').length, icon: <HiOutlineChip className="w-4 h-4" /> },
    { id: 'community', label: 'المجتمع والدعم', count: platformSections.filter(s => s.category === 'community').length, icon: <HiOutlineUserGroup className="w-4 h-4" /> },
    { id: 'advanced', label: 'المعامل والمسارات المتقدمة', count: platformSections.filter(s => s.category === 'advanced').length, icon: <HiOutlineCode className="w-4 h-4" /> },
  ];

  return (
    <div 
      style={{
        backgroundColor: isDark ? '#020617' : '#f8fafc',
        color: isDark ? '#f1f5f9' : '#0f172a'
      }}
      className="min-h-screen py-12 sm:py-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden transition-colors duration-500" 
      dir="rtl"
    >
      {/* خلفيات جمالية فخمة ومتطورة */}
      <div className="absolute top-0 right-1/4 w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12 sm:space-y-16">
        
        {/* ترويسة المنصة الاحترافية */}
        <div className="text-center space-y-5">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              backgroundColor: isDark ? 'rgba(59, 130, 246, 0.12)' : 'rgba(59, 130, 246, 0.08)',
              borderColor: isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)',
              color: isDark ? '#38bdf8' : '#0284c7'
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-black shadow-xl backdrop-blur-xl"
          >
            <HiOutlineSparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>منصة Z E D التعليمية • المستقبل الرقمي للتعلم الذكي</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
            className="text-3xl sm:text-6xl font-black tracking-tight leading-tight"
          >
            تجربة <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">تعليمية استثنائية</span> متكاملة
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ color: isDark ? '#94a3b8' : '#475569' }}
            className="text-sm sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed"
          >
            اكتشف كافة أقسام ومميزات منصة Z E D المصممة خصيصاً لتمنحك تفوقاً أكاديمياً غير مسبوق عبر تقنيات العصر الحديث.
          </motion.p>
        </div>

        {/* تصميم الفلتر الاحترافي المتحرك (Floating Glassmorphism Pill Filter) */}
        <div className="sticky top-6 z-40 flex justify-center px-4">
          <div 
            style={{
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.85)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(203, 213, 225, 0.6)'
            }}
            className="p-1.5 sm:p-2 rounded-full border shadow-2xl backdrop-blur-2xl flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full scrollbar-none"
          >
            {filters.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id as any)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs font-black transition-all duration-300 relative whitespace-nowrap ${
                    isActive 
                      ? 'text-white shadow-lg shadow-blue-600/30' 
                      : isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className={isActive ? 'text-cyan-200' : 'text-blue-500'}>
                    {filter.icon}
                  </span>
                  <span>{filter.label}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                    isActive ? 'bg-white/20 text-white' : isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {filter.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* شبكة الكروت الاحترافية الجديدة بتصميم فاخر (Bento-Grid / Glass Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredSections.map((section, idx) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                style={{
                  backgroundColor: isDark ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.95)',
                  borderColor: isDark ? 'rgba(59, 130, 246, 0.25)' : 'rgba(203, 213, 225, 0.8)'
                }}
                className="border-2 rounded-[36px] p-7 sm:p-9 backdrop-blur-2xl shadow-2xl flex flex-col justify-between space-y-7 relative overflow-hidden group hover:border-blue-500 hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-1.5"
              >
                {/* تأثير إضاءة خلفية نيون متطورة تفاعلية عند مرور الماوس */}
                <div className="absolute -top-20 -right-20 w-56 h-56 bg-gradient-to-br from-blue-600/15 to-cyan-500/15 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

                <div className="space-y-5 relative z-10">
                  {/* رأس الكارت: الأيقونة مع تأثير الوهج + البادج الفاخر */}
                  <div className="flex items-center justify-between">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${section.gradient} text-white flex items-center justify-center shadow-xl shadow-blue-500/25 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                      {section.icon}
                    </div>
                    <span 
                      style={{
                        backgroundColor: isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.08)',
                        borderColor: isDark ? 'rgba(59, 130, 246, 0.35)' : 'rgba(59, 130, 246, 0.2)',
                        color: isDark ? '#38bdf8' : '#0284c7'
                      }}
                      className="px-4 py-2 rounded-full border text-xs font-black shadow-sm tracking-wide"
                    >
                      {section.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug group-hover:text-blue-400 transition-colors" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                    {section.title}
                  </h3>

                  <p className="text-xs sm:text-sm leading-relaxed font-medium" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
                    {section.desc}
                  </p>
                </div>

                {/* المميزات بداخل حاويات فرعية منسقة وفخمة */}
                <div className="space-y-3 pt-5 border-t border-slate-700/20 relative z-10">
                  {section.features.map((feature, fIdx) => (
                    <div 
                      key={fIdx}
                      style={{
                        backgroundColor: isDark ? 'rgba(2, 6, 23, 0.65)' : '#f8fafc',
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : '#e2e8f0',
                        color: isDark ? '#e2e8f0' : '#334155'
                      }}
                      className="flex items-center gap-3.5 p-4 rounded-2xl border text-xs sm:text-sm font-semibold shadow-sm hover:border-blue-500/50 transition-colors"
                    >
                      <HiOutlineCheckCircle className="w-5 h-5 text-cyan-400 shrink-0" />
                      <span className="leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* قسم الدعوة للانضمام السفلي الفاخر */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            backgroundColor: isDark ? 'rgba(30, 58, 138, 0.25)' : 'rgba(224, 242, 254, 0.9)',
            borderColor: isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(186, 230, 253, 1)'
          }}
          className="border-2 rounded-[36px] p-8 sm:p-10 backdrop-blur-2xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="flex items-center gap-5 relative z-10 text-center sm:text-right">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-500/30 text-cyan-400 flex items-center justify-center shrink-0 shadow-md">
              <HiOutlineLightningBolt className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-black text-cyan-400 block mb-1">ابدأ رحلتك اليوم</span>
              <h3 className="text-lg sm:text-xl font-black" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                جاهز لتطوير مستواك الدراسي وتحقيق أهدافك الأكاديمية؟
              </h3>
              <p className="text-xs sm:text-sm mt-1" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
                انضم الآن إلى آلاف الطلاب المتميزين واستمتع بتجربة تعليمية فريدة مع منصة Z E D.
              </p>
            </div>
          </div>
          
          <a 
            href="/auth"
            style={{
              backgroundColor: '#2563eb',
              borderColor: '#3b82f6',
            }}
            className="w-full sm:w-auto px-8 py-4 text-white text-xs sm:text-sm font-black rounded-2xl shadow-xl shadow-blue-600/40 hover:opacity-95 transition-all whitespace-nowrap flex items-center justify-center gap-2 relative z-10"
          >
            <HiOutlineRefresh className="w-4 h-4 animate-spin" />
            أنشئ حسابك المجاني الآن
          </a>
        </motion.div>

     
      </div>
    </div>
  );
}