import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineBookOpen, 
  HiOutlineSearch, 
  HiOutlineStar, 
  HiOutlineClock, 
  HiOutlineSparkles,
  HiOutlineArrowLeft,
  HiOutlinePlay,
  HiOutlineFolder,
  HiOutlineFilter,
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineAcademicCap,
  HiOutlineShieldCheck
} from 'react-icons/hi';
import { supabase } from '../lib/supabaseClient';

interface Course {
  id: number;
  title: string;
  category: string;
  rating: number;
  reviewsCount: number;
  duration: string;
  lessonsCount: number;
  price: string;
  level: string;
  imageBg: string;
  videosList: any[];
  filesList: any[];
}

interface CoursesProps {
  isDark?: boolean;
}

export default function Courses({ isDark = true }: CoursesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [coursesData, setCoursesData] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>(['الكل']);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const checkAuthAndRedirect = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        alert('يجب تسجيل الدخول أولاً لعرض الفيديوهات أو تحميل الملفات!');
        navigate('/auth');
        return false;
      }
      return true;
    } catch (err) {
      alert('يجب تسجيل الدخول أولاً لعرض الفيديوهات أو تحميل الملفات!');
      navigate('/auth');
      return false;
    }
  };

  const fetchCoursesFromSupabase = async () => {
    try {
      setLoading(true);
      
      const { data: coursesData, error: coursesError } = await supabase.from("courses").select("*").order("id", { ascending: false });
      const { data: filesData, error: filesError } = await supabase.from("course_files").select("*");
      
      if (coursesError) throw coursesError;

      if (coursesData) {
        const bgColors = [
          'from-blue-600 via-indigo-600 to-[#00bfff]',
          'from-purple-700 via-violet-600 to-indigo-600',
          'from-[#002aff] via-blue-600 to-cyan-400',
          'from-emerald-600 via-teal-600 to-cyan-500',
          'from-amber-500 via-orange-500 to-rose-500',
          'from-blue-800 via-indigo-900 to-slate-900'
        ];

        const formattedCourses: Course[] = coursesData.map((item: any, index: number) => {
          const matchedFiles = filesData ? filesData.filter((file: any) => file.course_name === item.course_name) : [];
          const videos = item.videos_list || [];
          const lessonsCount = item.video_count || videos.length;

          let calculatedDuration = item.duration;
          if (!calculatedDuration || calculatedDuration === '16 ساعة تدريبية') {
            const totalMinutes = lessonsCount * 30; 
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            if (hours > 0) {
              calculatedDuration = minutes > 0 ? `${hours} ساعة و ${minutes} دقيقة` : `${hours} ساعات تدريبية`;
            } else {
              calculatedDuration = `${totalMinutes} دقيقة تدريبية`;
            }
            if (lessonsCount === 0) calculatedDuration = 'مفتوح دائماً';
          }

          let displayPrice = 'مجاني بالكامل';
          if (!item.is_free) {
            displayPrice = item.price ? `${item.price} ج.م` : 'مدفوع';
          }

          return {
            id: item.id,
            title: item.course_name || 'كورس بدون عنوان',
            category: item.course_specialty || 'عام',
            rating: item.rating || 4.9,
            reviewsCount: item.reviews_count || 88,
            duration: calculatedDuration,
            lessonsCount: lessonsCount,
            price: displayPrice,
            level: item.level || 'مستوى احترافي',
            imageBg: bgColors[index % bgColors.length],
            videosList: videos,
            filesList: matchedFiles
          };
        });

        setCoursesData(formattedCourses);

        const uniqueCategories = ['الكل', ...Array.from(new Set(coursesData.map((item: any) => item.course_specialty).filter(Boolean)))] as string[];
        setCategories(uniqueCategories);
      }
    } catch (err: any) {
      console.error('خطأ في جلب الكورسات:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoursesFromSupabase();

    const channel = supabase
      .channel('public:courses_and_files_main_v6')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'courses' },
        () => { fetchCoursesFromSupabase(); }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'course_files' },
        () => { fetchCoursesFromSupabase(); }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const visibleCategories = categories.slice(0, 5);
  const hasMoreCategories = categories.length > 5;

  return (
    <div 
      style={{
        backgroundColor: isDark ? '#020617' : '#f8fafc',
        color: isDark ? '#f1f5f9' : '#0f172a'
      }}
      className="min-h-screen transition-colors duration-500 py-32 px-4 sm:px-6 lg:px-10 relative overflow-hidden" 
      dir="rtl"
    >
       <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto pt-8 mb-16 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-500 text-xs font-black shadow-lg backdrop-blur-md"
          >
            <HiOutlineSparkles className="w-4 h-4 text-cyan-500 animate-spin" />
            <span>منصة Z E D التعليمية الاحترافية</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-relaxed pt-2"
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          >
            استكشف أقوى <span className="text-cyan-500 drop-shadow-md">الدورات والمحتوى</span> التعليمي
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed"
            style={{ color: isDark ? '#cbd5e1' : '#475569' }}
          >
            تصفح المحاضرات، الفيديوهات، والملفات والملازم المرفقة مباشرة لكل كورس.
          </motion.p>
        </div>

        {/* شريط البحث والتصنيفات */}
        <div className="mb-16 space-y-6">
          <div 
            style={{
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1'
            }}
            className="p-4 sm:p-6 rounded-[32px] backdrop-blur-2xl shadow-2xl relative overflow-hidden border"
          >
            <div className="absolute -left-20 -top-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative w-full mb-6">
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-cyan-500">
                <HiOutlineSearch className="w-5 h-5" />
              </span>
              <input 
                type="text" 
                placeholder="ابحث عن اسم الكورس أو التخصص المطلوب..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  backgroundColor: isDark ? 'rgba(2, 6, 23, 0.8)' : '#ffffff',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1',
                  color: isDark ? '#ffffff' : '#0f172a'
                }}
                className="w-full pr-12 pl-10 py-4 border rounded-2xl text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 shadow-inner transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 hover:text-white cursor-pointer"
                >
                  <HiOutlineX className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t" style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0' }}>
              <span className="text-xs font-black text-slate-400 pl-2">التصنيفات:</span>

              {visibleCategories.map((cat, idx) => {
                const isSelected = selectedCategory === cat;
                return (
                  <motion.button
                    key={idx}
                    onClick={() => setSelectedCategory(cat)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      backgroundColor: isSelected 
                        ? undefined 
                        : (isDark ? 'rgba(2, 6, 23, 0.6)' : '#f1f5f9'),
                      borderColor: isSelected ? 'rgba(6, 182, 212, 0.3)' : (isDark ? 'rgba(255, 255, 255, 0.05)' : '#cbd5e1'),
                      color: isSelected ? '#ffffff' : (isDark ? '#cbd5e1' : '#334155')
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all duration-300 flex items-center gap-2 cursor-pointer border ${
                      isSelected 
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-cyan-500/25' 
                        : 'hover:opacity-80'
                    }`}
                  >
                    {isSelected && <HiOutlineCheck className="w-3.5 h-3.5 text-white" />}
                    <span>{cat}</span>
                  </motion.button>
                );
              })}

              {hasMoreCategories && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl text-xs font-black bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-500 border border-cyan-500/30 flex items-center gap-2 transition-all cursor-pointer shadow-lg"
                >
                  <HiOutlineFilter className="w-4 h-4 text-cyan-500" />
                  <span>المزيد من التخصصات ({categories.length})</span>
                </button>
              )}
            </div>
          </div>

          <div 
            style={{
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : '#ffffff',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#e2e8f0'
            }}
            className="flex items-center justify-between px-6 py-2.5 border rounded-2xl text-xs font-bold shadow-sm"
          >
            <span style={{ color: isDark ? '#94a3b8' : '#64748b' }}>التصنيف الحالي: <strong className="text-cyan-500">{selectedCategory}</strong></span>
            <span style={{ color: isDark ? '#94a3b8' : '#64748b' }}>عدد النتائج: <strong className="text-cyan-500">{filteredCourses.length}</strong> كورس</span>
          </div>
        </div>

        {/* نافذة عرض كل التصنيفات */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                style={{
                  backgroundColor: isDark ? '#0f172a' : '#ffffff',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1'
                }}
                className="border w-full max-w-xl rounded-[32px] p-6 shadow-2xl relative overflow-hidden"
              >
                <div className="flex items-center justify-between pb-4 border-b mb-6" style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0' }}>
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-500">
                      <HiOutlineFilter className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-black" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>اختر التخصص المطلوب</h3>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-xl bg-slate-500/10 hover:bg-slate-500/20 text-slate-400 hover:text-white transition-all cursor-pointer"
                  >
                    <HiOutlineX className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto no-scrollbar py-1">
                  {categories.map((cat, idx) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setIsModalOpen(false);
                        }}
                        style={{
                          backgroundColor: isSelected 
                            ? undefined 
                            : (isDark ? 'rgba(2, 6, 23, 0.6)' : '#f1f5f9'),
                          borderColor: isSelected ? 'rgba(6, 182, 212, 0.3)' : (isDark ? 'rgba(255, 255, 255, 0.05)' : '#cbd5e1'),
                          color: isSelected ? '#ffffff' : (isDark ? '#cbd5e1' : '#334155')
                        }}
                        className={`p-4 rounded-2xl text-xs font-black transition-all flex items-center justify-between text-right cursor-pointer border ${
                          isSelected
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-cyan-500/25'
                            : 'hover:opacity-80'
                        }`}
                      >
                        <span>{cat}</span>
                        {isSelected && <HiOutlineCheck className="w-4 h-4 text-white" />}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 pt-4 border-t flex justify-end" style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0' }}>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 bg-slate-500/10 hover:bg-slate-500/20 text-cyan-500 rounded-xl text-xs font-black transition-all cursor-pointer"
                  >
                    إغلاق
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="text-center py-32 text-cyan-500 font-bold text-base animate-pulse">
            جاري تحميل الكورسات والفيديوهات والملفات...
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => {
              const totalFilesCount = course.filesList.reduce((acc, fg) => acc + (fg.files_info?.length || 0), 0);

              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : '#ffffff',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1'
                  }}
                  className="border rounded-[32px] overflow-hidden shadow-2xl backdrop-blur-2xl flex flex-col justify-between group relative transition-all hover:border-cyan-500/40 hover:shadow-cyan-500/10"
                >
                  {/* قسم الهيدر الداخلي للكرت */}
                  <div className={`h-52 bg-gradient-to-br ${course.imageBg} p-6 relative flex flex-col justify-between overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                    <div className="absolute -right-12 -top-12 w-44 h-44 bg-white/15 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                    
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="px-3.5 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-xl text-cyan-300 text-[11px] font-black border border-white/15 shadow-lg flex items-center gap-1.5">
                        <HiOutlineAcademicCap className="w-3.5 h-3.5 text-cyan-400" />
                        {course.category}
                      </span>
                      <span className="px-4 py-1.5 rounded-2xl bg-white/95 text-slate-950 text-xs font-black shadow-2xl tracking-wide">
                        {course.price}
                      </span>
                    </div>

                    <div className="relative z-10 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          <HiOutlineShieldCheck className="w-3 h-3" />
                          {course.level}
                        </span>
                      </div>
                      <h3 className="text-white font-black text-xl line-clamp-2 leading-snug drop-shadow-md group-hover:text-cyan-200 transition-colors">
                        {course.title}
                      </h3>
                    </div>
                  </div>

                  {/* تفاصيل المحتوى داخل الكرت */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div 
                        style={{
                          backgroundColor: isDark ? 'rgba(2, 6, 23, 0.6)' : '#f8fafc',
                          borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#e2e8f0',
                          color: isDark ? '#cbd5e1' : '#334155'
                        }}
                        className="grid grid-cols-2 gap-3 py-3 px-3.5 rounded-2xl border text-xs font-bold"
                      >
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-xl bg-cyan-500/10 text-cyan-500">
                            <HiOutlineClock className="w-4 h-4" />
                          </div>
                          <span className="truncate">{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 border-r pr-3" style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1' }}>
                          <div className="p-1.5 rounded-xl bg-blue-500/10 text-blue-500">
                            <HiOutlineBookOpen className="w-4 h-4" />
                          </div>
                          <span>{course.lessonsCount} درس</span>
                        </div>
                      </div>

                      <div className="space-y-2.5">
                        <button
                          onClick={checkAuthAndRedirect}
                          className="w-full py-3 px-4 bg-blue-500/10 hover:bg-blue-500/20 text-cyan-500 rounded-2xl text-xs font-black transition-all flex items-center justify-between border border-blue-500/20 hover:border-blue-500/40 cursor-pointer group/vid"
                        >
                          <span className="flex items-center gap-2.5">
                            <div className="p-1.5 rounded-lg bg-blue-500/20 text-cyan-500 group-hover/vid:scale-110 transition-transform">
                              <HiOutlinePlay className="w-3.5 h-3.5" />
                            </div>
                            <span>فيديوهات المحاضرات</span>
                          </span>
                          <span className="px-2.5 py-1 bg-blue-500/20 rounded-xl text-cyan-500 text-[11px]">
                            {course.videosList.length} فيديو
                          </span>
                        </button>

                        <button
                          onClick={checkAuthAndRedirect}
                          className="w-full py-3 px-4 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 rounded-2xl text-xs font-black transition-all flex items-center justify-between border border-emerald-500/20 hover:border-emerald-500/40 cursor-pointer group/file"
                        >
                          <span className="flex items-center gap-2.5">
                            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-500 group-hover/file:scale-110 transition-transform">
                              <HiOutlineFolder className="w-3.5 h-3.5" />
                            </div>
                            <span>ملفات وملازم الكورس</span>
                          </span>
                          <span className="px-2.5 py-1 bg-emerald-500/20 rounded-xl text-emerald-500 text-[11px]">
                            {totalFilesCount} ملف
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0' }}>
                      <div className="flex items-center gap-1.5 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
                        <HiOutlineStar className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-black" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>{course.rating}</span>
                        <span className="text-[10px] text-slate-400">({course.reviewsCount})</span>
                      </div>

                      <button 
                        onClick={async (e) => {
                          e.preventDefault();
                          const isAuthed = await checkAuthAndRedirect(e);
                          if (isAuthed) {
                            navigate(`/auth?courseId=${course.id}`);
                          }
                        }} 
                        className="px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-black rounded-2xl transition-all duration-300 flex items-center gap-2 shadow-lg shadow-cyan-500/25 group/btn cursor-pointer"
                      >
                        <span>تفاصيل الكورس</span>
                        <HiOutlineArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div 
            style={{
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.4)' : '#ffffff',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1'
            }}
            className="text-center py-28 border rounded-[32px] shadow-2xl backdrop-blur-xl"
          >
            <HiOutlineBookOpen className="w-16 h-16 text-cyan-500 mx-auto mb-4 animate-bounce" />
            <h3 className="text-xl font-black mb-2" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>عذراً، لم نجد كورسات مطابقة لبحثك</h3>
            <p className="text-slate-400 text-xs font-medium">حاول البحث بكلمات أخرى أو تغيير تصنيف التصفية.</p>
          </div>
        )}
      </div>
    </div>
  );
}