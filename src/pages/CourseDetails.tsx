import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineBookOpen, 
  HiOutlineClock, 
  HiOutlineUser, 
  HiOutlineStar, 
  HiOutlineCheckCircle, 
  HiOutlinePlay, 
  HiOutlineLockClosed, 
  HiOutlineShare, 
  HiOutlineHeart, 
  HiOutlineSparkles,
  HiOutlineChevronDown,
  HiOutlineCheck,
  HiOutlineAcademicCap,
  HiOutlineBadgeCheck,
  HiOutlineGlobe,
  HiOutlineChatAlt2
} from 'react-icons/hi';

export default function CourseDetails() {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'instructor' | 'reviews' | 'faq'>('overview');
  const [openSection, setOpenSection] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const navigate = useNavigate(); // لتوجيه المستخدم لصفحة الـ Auth عند التسجيل

  // بيانات الكورس الشاملة والمكثفة
  const course = {
    id: 1,
    title: 'مبادئ البرمجة بلغة جافاسكريبت وتطوير الويب الحديث من الصفر',
    category: 'البرمجة وتطوير الويب',
    description: 'رحلة تفاعلية متكاملة تأخذك من الصفر المطلق حتى احتراف لغة JavaScript وبناء تطبيقات ويب حقيقية وقوية. يتضمن الكورس مشاريع عملية، تحديات برمجية، وإرشاداً مباشراً لدخول سوق العمل التقني بثقة تامة.',
    instructor: {
      name: 'مهندس. أحمد محمود',
      title: 'خبير تطوير الواجهات الأمامية والذكاء الاصطناعي',
      rating: 4.95,
      studentsCount: '3,450 طالب متدرب',
      coursesCount: 12,
      // صورة تعبيرية احترافية للمدرس
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: 'قمت بتدريب آلاف الطلاب ومساعدة المبتدئين في بناء مسيرتهم البرمجية بنجاح والانضمام لكبرى الشركات التقنية العالمية والمحلية.'
    },
    // صورة مجموعة من الطلاب كمثال للمجتمع التفاعلي
    groupImageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 340,
    duration: '24 ساعة تدريبية مكثفة',
    lessonsCount: 68,
    studentsEnrolled: 2450,
    price: 'مجاني بالكامل',
    level: 'متوسط إلى مبتدئ',
    language: 'العربية (شرح مبسط ومفصل)',
    lastUpdated: 'أغسطس 2026',
    imageBg: 'from-indigo-900 via-blue-900 to-slate-900',
    features: [
      'فيديوهات مرئية بجودة عالية (4K) مدتها 24 ساعة',
      '5 مشاريع عملية حقيقية تُضاف لمعرض أعمالك',
      'شهادة إتمام معتمدة وقابلة للتحقق والمشاركة',
      'إمكانية الوصول للمحتوى والتحديثات مدى الحياة',
      'مجتمع خاص بالطلاب للإجابة على الأسئلة والمناقشة',
      'ملفات برمجية وأكواد جاهزة لكل درس'
    ],
    curriculum: [
      {
        sectionTitle: 'القسم الأول: التأسيس البرمجي وفهم بيئة العمل',
        lessons: [
          { title: 'مقدمة ترحيبية وكيفية تحقيق أقصى استفادة من الكورس', duration: '08 دقيقة', free: true },
          { title: 'أساسيات الإنترنت وكيف تعمل صفحات الويب', duration: '15 دقيقة', free: true },
          { title: 'تثبيت وتجهيز محرر الأكواد VS Code والإضافات الأساسية', duration: '22 دقيقة', free: true },
          { title: 'مفهوم الخوارزميات والتفكير المنطقي للمبرمجين', duration: '30 دقيقة', free: false },
        ]
      },
      {
        sectionTitle: 'القسم الثاني: الغوص في أعماق لغة JavaScript الحديثة (ES6+)',
        lessons: [
          { title: 'المتغيرات وأنواع البيانات وطرق تخزينها', duration: '25 دقيقة', free: false },
          { title: 'الدوال البرمجية وكيفية كتابة كود منظم وقابل لإعادة الاستخدام', duration: '40 دقيقة', free: false },
          { title: 'التحكم في تدفق البيانات (If Statements & Switch)', duration: '35 دقيقة', free: false },
          { title: 'الحلقات التكرارية وتطبيقها العملي (For / While Loops)', duration: '45 دقيقة', free: false },
        ]
      },
      {
        sectionTitle: 'القسم الثالث: التعامل الحي مع الويب والتفاعل (DOM & Events)',
        lessons: [
          { title: 'فهم شجرة الـ DOM وكيفية استدعاء العناصر برمجياً', duration: '35 دقيقة', free: false },
          { title: 'الاستجابة لأحداث المستخدم (Click, Hover, Keyboard Events)', duration: '50 دقيقة', free: false },
          { title: 'مشروع عملي 1: بناء تطبيق المهام اليومية المتطور To-Do List', duration: '1 ساعة 15 دقيقة', free: false },
        ]
      }
    ],
    reviewsList: [
      { name: 'محمد عبد الله', rating: 5, date: 'قبل يومين', comment: 'أفضل شرح للـ JavaScript رأيته في حياتي! الشرح سلس والأمثلة عملية جداً.' },
      { name: 'ريم أحمد', rating: 5, date: 'قبل أسبوع', comment: 'الكورس المجاني هذا يتفوق على كورسات مدفوعة كثيرة. شكراً للمهندس أحمد.' },
      { name: 'يوسف إبراهيم', rating: 5, date: 'قبل شهر', comment: 'المشاريع العملية في نهاية الأقسام صنعت فارقاً كبيراً معي في فهم البرمجة.' },
    ],
    faqs: [
      { q: 'هل يحتاج الكورس إلى خبرة برمجية مسبقة؟', a: 'لا، الكورس مصمم خصيصاً ليناسب المبتدئين تماماً ويبدأ معك من الصفر.' },
      { q: 'هل الكورس مجاني حقاً؟', a: 'نعم، الكورس مجاني بالكامل ويمكنك البدء في دراسته فور التسجيل.' },
      { q: 'كيف أستلم الشهادة بعد الانتهاء؟', a: 'بمجرد إتمام كافة الدروس والمشاريع، ستظهر لك شهادة معتمدة جاهزة للتحميل والمشاركة على لينكد إن.' }
    ]
  };

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 transition-colors duration-300 pb-24" dir="rtl">
      
      {/* رأس الصفحة العصري والفاخر */}
      <div className="relative bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 pt-20 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-indigo-500/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_50%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* تفاصيل الكورس الرئيسية */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold tracking-wide">
                  {course.category}
                </span>
                <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  المستوى: {course.level}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
                {course.title}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
                {course.description}
              </p>

              {/* بطاقة صورة المحاضر أو مجموعة الطلاب */}
              <div className="flex flex-wrap items-center gap-6 pt-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-3">
                  <img 
                    src={course.instructor.avatarUrl} 
                    alt={course.instructor.name} 
                    className="w-12 h-12 rounded-xl object-cover border-2 border-indigo-500 shadow-md"
                  />
                  <div>
                    <span className="text-[10px] text-slate-400 block">المحاضر المشرف</span>
                    <span className="text-sm font-bold text-white">{course.instructor.name}</span>
                  </div>
                </div>

                <div className="h-8 w-[1px] bg-slate-800 hidden sm:block" />

                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2 overflow-hidden">
                    <img className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" alt="طالب" />
                    <img className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="طالبة" />
                    <img className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80" alt="طالب" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">{course.studentsEnrolled} طالب مسجل</span>
                    <span className="text-[10px] text-indigo-400 font-medium">انضم للمجتمع التعليمي الآن</span>
                  </div>
                </div>
              </div>

              {/* إحصائيات سريعة */}
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm font-semibold text-slate-300">
                <div className="flex items-center gap-1.5">
                  <HiOutlineStar className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="text-white font-bold">{course.rating}</span>
                  <span className="text-slate-400">({course.reviewsCount} تقييم)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HiOutlineClock className="w-5 h-5 text-indigo-400" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HiOutlineBookOpen className="w-5 h-5 text-indigo-400" />
                  <span>{course.lessonsCount} درس تفصيلي</span>
                </div>
              </div>

            </div>

            {/* بطاقة التسجيل العائمة الجانبية (تصميم مختلف وجذاب) */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* معاينة مرئية أو صورة مجموعة الطلاب */}
                <div className="h-52 rounded-2xl relative mb-6 overflow-hidden group shadow-inner">
                  <img 
                    src={course.groupImageUrl} 
                    alt="مجموعة الطلاب" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-xl backdrop-blur-md cursor-pointer hover:bg-indigo-500 transition-colors">
                      <HiOutlinePlay className="w-6 h-6 fill-white pr-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-indigo-900/80 backdrop-blur-md text-white text-xs font-bold border border-indigo-500/30">
                    معاينة محتوى الكورس
                  </span>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs text-slate-400 block">سعر الكورس</span>
                    <span className="text-3xl font-black text-emerald-400">{course.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all ${
                        isFavorite 
                          ? 'bg-rose-500/10 border-rose-500/30 text-rose-500' 
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-indigo-500'
                      }`}
                    >
                      <HiOutlineHeart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500' : ''}`} />
                    </button>
                    <button className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:border-indigo-500 flex items-center justify-center">
                      <HiOutlineShare className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* زر التسجيل المجاني (يوجه مباشرة إلى صفحة الـ auth) */}
                <button 
                  onClick={() => navigate('/auth')}
                  className="w-full py-4 rounded-2xl font-bold text-base transition-all shadow-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <HiOutlineSparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>سجل في الكورس الآن مجاناً</span>
                </button>

                <p className="text-[11px] text-center text-slate-400 mt-3">
                  تسجيل سريع وآمن • لا توجد رسوم خفية • ابدأ فوراً
                </p>

                {/* مميزات الكورس المختصرة */}
                <div className="mt-6 pt-6 border-t border-slate-800 space-y-3 text-xs font-medium text-slate-300">
                  {course.features.slice(0, 4).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <HiOutlineCheckCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* محتوى الصفحة والتنقل بين التبويبات */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        
        {/* أزرار التبويبات (Tabs) */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2 rounded-2xl shadow-xl overflow-x-auto mb-10 no-scrollbar">
          {[
            { id: 'overview', label: 'نظرة عامة' },
            { id: 'curriculum', label: 'محتوى المنهج الكامل' },
            { id: 'instructor', label: 'عن المحاضر' },
            { id: 'reviews', label: `التقييمات (${course.reviewsCount})` },
            { id: 'faq', label: 'الأسئلة الشائعة' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* محتوى التبويبات */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-8">
            
            {/* تبويب: نظرة عامة */}
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-xl">
                  <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                    <HiOutlineAcademicCap className="w-6 h-6 text-indigo-400" />
                    <span>ماذا ستتعلم في هذا الكورس الشامل؟</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-300 font-medium">
                    {course.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-800/80">
                        <div className="p-1 bg-indigo-500/10 text-indigo-400 rounded-lg mt-0.5">
                          <HiOutlineCheckCircle className="w-4 h-4" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-xl space-y-4">
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    <HiOutlineGlobe className="w-6 h-6 text-indigo-400" />
                    <span>وصف تفصيلي للكورس والهدف التعليمي</span>
                  </h3>
                  <p className="text-slate-300 text-sm font-medium leading-relaxed">
                    {course.description}
                  </p>
                  <p className="text-slate-300 text-sm font-medium leading-relaxed">
                    تم إعداد هذا البرنامج الأكاديمي والعملي بعناية فائقة وفقاً لأحدث معايير التدريب التقني العالمي، لضمان انتقال الطالب من مرحلة التردد إلى مرحلة الثقة الكاملة في كتابة البرمجيات وحل المشكلات البرمجية المعقدة.
                  </p>
                </div>
              </motion.div>
            )}

            {/* تبويب: محتوى الكورس (المنهج) */}
            {activeTab === 'curriculum' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-black text-white">أقسام ومحاور المنهج التدريبي</h3>
                  <span className="text-xs text-indigo-400 font-bold bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                    {course.lessonsCount} درس • {course.duration}
                  </span>
                </div>

                {course.curriculum.map((section, idx) => (
                  <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-md">
                    <button 
                      onClick={() => toggleSection(idx)}
                      className="w-full flex items-center justify-between p-5 bg-slate-800/40 text-right font-bold text-sm text-white cursor-pointer hover:bg-slate-800/70 transition-colors"
                    >
                      <span>{section.sectionTitle}</span>
                      <HiOutlineChevronDown className={`w-5 h-5 text-indigo-400 transition-transform ${openSection === idx ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {openSection === idx && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="divide-y divide-slate-800/60"
                        >
                          {section.lessons.map((lesson, lessonIdx) => (
                            <div key={lessonIdx} className="flex items-center justify-between px-6 py-4 text-xs sm:text-sm font-medium text-slate-300 hover:bg-slate-800/30 transition-colors">
                              <div className="flex items-center gap-3">
                                {lesson.free ? (
                                  <HiOutlinePlay className="w-4 h-4 text-indigo-400" />
                                ) : (
                                  <HiOutlineLockClosed className="w-4 h-4 text-slate-500" />
                                )}
                                <span>{lesson.title}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                {lesson.free && (
                                  <span className="px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30">مجاني</span>
                                )}
                                <span className="text-slate-400 text-xs">{lesson.duration}</span>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            )}

            {/* تبويب: عن المحاضر */}
            {activeTab === 'instructor' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-right">
                  <img 
                    src={course.instructor.avatarUrl} 
                    alt={course.instructor.name} 
                    className="w-24 h-24 rounded-2xl object-cover border-2 border-indigo-500 shadow-xl"
                  />
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black text-white">{course.instructor.name}</h3>
                    <p className="text-xs text-indigo-400 font-bold">{course.instructor.title}</p>
                    <div className="flex items-center justify-center sm:justify-start gap-2 pt-2 text-xs text-slate-400">
                      <HiOutlineBadgeCheck className="w-4 h-4 text-emerald-400" />
                      <span>محاضر معتمد ومنسق دورات برمجية</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-slate-800 text-center text-xs font-bold text-slate-300">
                  <div>
                    <span className="block text-xl font-black text-white mb-1">{course.instructor.rating}</span>
                    <span className="text-slate-400">تقييم المحاضر</span>
                  </div>
                  <div>
                    <span className="block text-xl font-black text-white mb-1">{course.instructor.studentsCount}</span>
                    <span className="text-slate-400">إجمالي المتدربين</span>
                  </div>
                  <div>
                    <span className="block text-xl font-black text-white mb-1">{course.instructor.coursesCount}</span>
                    <span className="text-slate-400">دورات منشورة</span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm font-medium leading-relaxed">
                  {course.instructor.bio}
                </p>
              </motion.div>
            )}

            {/* تبويب: التقييمات */}
            {activeTab === 'reviews' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-xl flex flex-col sm:flex-row items-center gap-8">
                  <div className="text-center sm:text-right">
                    <span className="text-5xl font-black text-white block mb-1">{course.rating}</span>
                    <div className="flex items-center justify-center sm:justify-start gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <HiOutlineStar key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400 font-semibold">بناءً على {course.reviewsCount} تقييم حقيقي</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {course.reviewsList.map((rev, idx) => (
                    <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-md space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm border border-indigo-500/30">
                            {rev.name.charAt(0)}
                          </div>
                          <div>
                            <span className="text-sm font-bold text-white block">{rev.name}</span>
                            <span className="text-[10px] text-slate-400">{rev.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(rev.rating)].map((_, i) => (
                            <HiOutlineStar key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* تبويب: الأسئلة الشائعة */}
            {activeTab === 'faq' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <h3 className="text-lg font-black text-white mb-2">الأسئلة الشائعة حول الكورس</h3>
                {course.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-md">
                    <button 
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between p-5 bg-slate-800/40 text-right font-bold text-sm text-white cursor-pointer hover:bg-slate-800/70 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <HiOutlineChatAlt2 className="w-4 h-4 text-indigo-400" />
                        {faq.q}
                      </span>
                      <HiOutlineChevronDown className={`w-5 h-5 text-indigo-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === idx && (
                      <div className="p-5 text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/40 border-t border-slate-800">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            )}

          </div>

          {/* العمود الجانبي الإضافي */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <h4 className="font-bold text-white text-base">الملخص الأكاديمي</h4>
              <div className="space-y-3 text-xs sm:text-sm font-medium text-slate-300 divide-y divide-slate-800/60">
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-400">المستوى</span>
                  <span className="font-bold text-white">{course.level}</span>
                </div>
                <div className="flex items-center justify-between pt-3">
                  <span className="text-slate-400">المدة الإجمالية</span>
                  <span className="font-bold text-white">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between pt-3">
                  <span className="text-slate-400">عدد الدروس</span>
                  <span className="font-bold text-white">{course.lessonsCount} درس</span>
                </div>
                <div className="flex items-center justify-between pt-3">
                  <span className="text-slate-400">لغة الشرح</span>
                  <span className="font-bold text-white">{course.language}</span>
                </div>
                <div className="flex items-center justify-between pt-3">
                  <span className="text-slate-400">الشهادة النهائية</span>
                  <span className="font-bold text-emerald-400">معتمدة ومجانية</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}