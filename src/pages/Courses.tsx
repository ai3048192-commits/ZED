import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // استيراد موجه التنقل
import { 
  HiOutlineBookOpen, 
  HiOutlineSearch, 
  HiOutlineStar, 
  HiOutlineClock, 
  HiOutlineUser, 
  HiOutlineSparkles,
  HiOutlineArrowLeft
} from 'react-icons/hi';

interface Course {
  id: number;
  title: string;
  category: string;
  instructor: string;
  rating: number;
  reviewsCount: number;
  duration: string;
  lessonsCount: number;
  price: string;
  level: string;
  imageBg: string;
}

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const navigate = useNavigate(); // تفعيل دالة التنقل

  // بيانات تجريبية للكورسات
  const coursesData: Course[] = [
    {
      id: 1,
      title: 'مبادئ البرمجة بلغة جافاسكريبت وتطوير الويب الحديث',
      category: 'البرمجة والتقنية',
      instructor: 'أحمد محمود',
      rating: 4.9,
      reviewsCount: 120,
      duration: '15 ساعة',
      lessonsCount: 42,
      price: 'مجاني',
      level: 'مبتدئ',
      imageBg: 'from-blue-600 to-[#00bfff]'
    },
    {
      id: 2,
      title: 'الرياضيات المتقدمة وحساب التفاضل والتكامل للثانوية',
      category: 'الرياضيات والمنطق',
      instructor: 'د. خالد إبراهيم',
      rating: 4.8,
      reviewsCount: 95,
      duration: '20 ساعة',
      lessonsCount: 56,
      price: '299 ج.م',
      level: 'متقدم',
      imageBg: 'from-purple-600 to-indigo-600'
    },
    {
      id: 3,
      title: 'أساسيات الذكاء الاصطناعي وتعلم الآلة للمبتدئين',
      category: 'الذكاء الاصطناعي',
      instructor: 'سارة عبد الله',
      rating: 5.0,
      reviewsCount: 210,
      duration: '12 ساعة',
      lessonsCount: 30,
      price: '499 ج.م',
      level: 'متوسط',
      imageBg: 'from-[#002aff] to-cyan-500'
    },
    {
      id: 4,
      title: 'الفيزياء الحديثة: الميكانيكا والكهرباء ببساطة',
      category: 'العلوم والفيزياء',
      instructor: 'محمد رجب',
      rating: 4.7,
      reviewsCount: 80,
      duration: '18 ساعة',
      lessonsCount: 45,
      price: 'مجاني',
      level: 'مبتدئ',
      imageBg: 'from-emerald-600 to-teal-500'
    },
    {
      id: 5,
      title: 'اللغة الإنجليزية الاحترافية للأعمال ومقابلات العمل',
      category: 'اللغات والآداب',
      instructor: 'نوران حسن',
      rating: 4.9,
      reviewsCount: 150,
      duration: '10 ساعات',
      lessonsCount: 25,
      price: '199 ج.م',
      level: 'متوسط',
      imageBg: 'from-amber-500 to-rose-500'
    },
    {
      id: 6,
      title: 'تصميم واجهات المستخدم UI/UX باستخدام Figma',
      category: 'البرمجة والتقنية',
      instructor: 'عمر فاروق',
      rating: 4.8,
      reviewsCount: 180,
      duration: '14 ساعة',
      lessonsCount: 38,
      price: '349 ج.م',
      level: 'مبتدئ',
      imageBg: 'from-blue-700 to-violet-600'
    },
  ];

  const categories = ['الكل', 'البرمجة والتقنية', 'الرياضيات والمنطق', 'الذكاء الاصطناعي', 'العلوم والفيزياء', 'اللغات والآداب'];

  // تصفية الكورسات حسب البحث والفئة
  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050814] text-slate-900 dark:text-slate-100 transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      
      {/* خلفية جمالية متوهجة */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-blue-200/40 dark:from-[#002aff]/15 via-[#00bfff]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* رأس الصفحة */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-white/[0.05] border border-blue-200 dark:border-white/10 text-[#002aff] dark:text-[#38bdf8] text-xs font-bold mb-4 shadow-xs">
            <HiOutlineSparkles className="w-4 h-4 animate-pulse" />
            <span>اكتشف شغفك التعليمي</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            تصفح أحدث <span className="bg-gradient-to-r from-[#002aff] to-[#00bfff] bg-clip-text text-transparent">الدورات والكورسات</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium leading-relaxed">
            مناهج دراسية وتدريبية مصممة خصيصاً لتطوير مهاراتك الأكاديمية والمهنية بإشراف نخبة من أفضل الخبراء والمدرسين.
          </p>
        </div>

        {/* شريط البحث والفلترة */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* حقل البحث */}
          <div className="relative w-full md:w-96">
            <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
              <HiOutlineSearch className="w-5 h-5" />
            </span>
            <input 
              type="text" 
              placeholder="ابحث عن كورس أو مدرس..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-11 pl-4 py-3.5 bg-white dark:bg-white/[0.04] border border-blue-200 dark:border-white/10 rounded-2xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#002aff] dark:focus:border-[#00bfff] shadow-sm transition-all"
            />
          </div>

          {/* فئات التصنيف (Categories) */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat 
                    ? 'bg-[#002aff] text-white dark:bg-white dark:text-[#002aff] shadow-md shadow-blue-600/20' 
                    : 'bg-white dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border border-blue-200 dark:border-white/10 hover:border-[#002aff]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* شبكة الكورسات */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-white/[0.02] border border-blue-100 dark:border-white/10 rounded-3xl overflow-hidden shadow-xl dark:shadow-2xl flex flex-col justify-between group relative transition-all"
              >
                {/* رأس الكارد */}
                <div className={`h-48 bg-gradient-to-br ${course.imageBg} p-6 relative flex flex-col justify-between overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10 backdrop-opacity-10" />
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-md text-white text-[11px] font-bold">
                      {course.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-[#050814]/90 text-slate-900 dark:text-white text-xs font-black shadow-sm">
                      {course.price}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <span className="text-white/80 text-xs font-bold block mb-1">المستوى: {course.level}</span>
                    <h3 className="text-white font-black text-lg line-clamp-1 leading-snug">
                      {course.title}
                    </h3>
                  </div>
                </div>

                {/* تفاصيل الكورس */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-xs font-semibold mb-4">
                      <HiOutlineUser className="w-4 h-4 text-[#002aff] dark:text-[#38bdf8]" />
                      <span>المحاضر: {course.instructor}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-slate-100 dark:border-white/5 mb-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <div className="flex items-center gap-1.5">
                        <HiOutlineClock className="w-4 h-4 text-[#002aff] dark:text-[#38bdf8]" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <HiOutlineBookOpen className="w-4 h-4 text-[#002aff] dark:text-[#38bdf8]" />
                        <span>{course.lessonsCount} درس تعليمي</span>
                      </div>
                    </div>
                  </div>

                  {/* التقييم وزر التفاصيل (تم استبدال علامة a بـ button يستخدم navigate) */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1.5">
                      <HiOutlineStar className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{course.rating}</span>
                      <span className="text-xs text-slate-400">({course.reviewsCount})</span>
                    </div>
<button 
  onClick={() => navigate('/course-details')} // ضع هنا اسم المسار أو الملف الذي قمت بتوجيهه في الراوتر
  className="px-4 py-2 bg-blue-50 dark:bg-white/[0.06] hover:bg-[#002aff] hover:text-white dark:hover:bg-[#00bfff] dark:hover:text-[#050814] text-[#002aff] dark:text-[#38bdf8] text-xs font-extrabold rounded-xl transition-all flex items-center gap-1.5 group/btn cursor-pointer"
>
  <span>تفاصيل الكورس</span>
  <HiOutlineArrowLeft className="w-3.5 h-3.5 group-hover/btn:-translate-x-1 transition-transform" />
</button>
                  </div>

                </div>

              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-white/[0.02] border border-blue-100 dark:border-white/10 rounded-3xl shadow-lg">
            <HiOutlineBookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4 animate-bounce" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">عذراً، لم نجد نتائج مطابقة لبحثك</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs">جرب البحث بكلمات مفتاحية أخرى أو اختر فئة مختلفة.</p>
          </div>
        )}

      </div>
    </div>
  );
}