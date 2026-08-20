import React, { useState } from 'react';
import { 
  HiOutlineSparkles, 
  HiOutlineCpuChip, 
  HiOutlineShieldCheck, 
  HiOutlineRocketLaunch,
  HiOutlineArrowLeft,
  HiOutlineUserGroup,
  HiOutlineAcademicCap,
  HiOutlineGlobeAlt,
  HiOutlineChevronDown,
  HiOutlineCheckCircle,
  HiOutlineLightBulb,
  HiOutlineChartBar,
  HiOutlineCurrencyDollar,
  HiOutlineVideoCamera,
  HiOutlineFingerPrint,
  HiOutlineLockClosed,
  HiOutlineStar
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

export default function AboutUs() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'all' | 'students' | 'instructors'>('all');

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "ما هي منصة ZED وكيف تم ابتكارها لتكون الأقوى عربياً؟",
      a: "منصة ZED هي بيئة تعليمية سحابية متكاملة تم تطويرها خصيصاً لسد الفجوة بين التعليم النظري واحتياجات سوق العمل التقني في الشرق الأوسط. نجمع بين أحدث تقنيات بث الفيديو عالي الدقة (4K)، ونظُم إدارة التعلم الذكية (LMS)، وآليات حماية الملكية الفكرية المتقدمة."
    },
    {
      q: "ما الذي تقدمه منصة ZED خصيصاً للطلاب والباحثين عن الاحتراف؟",
      a: "نقدم مكتبة ضخمة تضم أكثر من 500 كورس احترافي في مجالات البرمجة، الذكاء الاصطناعي، أمن المعلومات، والتصميم الرقمي، مع إمكانية التحميل للمشاهدة بدون إنترنت، واختبارات عملية فورية، وشهادات إتمام موثقة برقم تحقق فريد."
    },
    {
      q: "كيف يستفيد المحاضرون والخبراء من الانضمام إلى ZED؟",
      a: "يحصل الخبير على لوحة تحكم متكاملة تتيح له رفع الكورسات بلا حدود، إدارة وحدات المنهج، هندسة الاختبارات التفاعلية، وتتبع المبيعات والأرباح بدقة متناهية مع نسبة عوائد هي الأعلى في السوق العربي وحماية كاملة ضد القرصنة."
    },
    {
      q: "كيف تعمل التجربة المجانية لمدة 5 أيام؟",
      a: "بمجرد اختيارك لمسار (طالب أو مدرس) والضغط على بدء التجربة، يتم تفعيل صلاحيات الـ VIP لك بالكامل لمدة 120 ساعة متواصلة لتستكشف كل مميزات المنصة الاحترافية ودون الحاجة لأي بطاقات ائتمانية مسبقة."
    },
    {
      q: "ما هي إجراءات حماية المحتوى الفكري للمحاضرين؟",
      a: "نستخدم تقنيات التشفير المتقدمة (DRM) وأنظمة الحماية الديناميكية التي تمنع تماماً تسجيل الشاشات أو تحميل الفيديوهات بطرق غير مشروعة، لضمان حفاظ المدرس على حقوقه الفكرية والمادية بنسبة 100%."
    },
    {
      q: "هل الشهادات الصادرة من ZED معتمدة في سوق العمل؟",
      a: "نعم، كل شهادة تصدر عن المنصة تحمل خوارزمية تحقق رقمية خاصة بالخريج، مما يتيح لأي شركة أو جهة توظيف التحقق من صحتها فوراً وإضافتها المباشرة لملف الـ LinkedIn."
    }
  ];

  return (
    <div className="w-full bg-[#020617] text-white m-0 p-0 overflow-x-hidden  selection:bg-cyan-500 selection:text-slate-950" dir="rtl">
      
      {/* القسم الرئيسي الفاخر */}
      <div className="w-full py-24 px-4 sm:px-6 lg:px-16 relative">
        
        {/* خلفيات إضاءة نيون عميقة بدون أي حدود */}
        <div className="absolute top-12 right-1/4 w-[700px] h-[700px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/3 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-28">
          
          {/* العنوان والترحيب الأسطوري */}
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-slate-950/80 backdrop-blur-2xl border border-slate-800/80 text-cyan-400 text-xs font-black tracking-widest uppercase shadow-2xl">
              <HiOutlineSparkles className="w-4 h-4 text-cyan-400 animate-spin" />
              <span>الموسوعة الهندسية • قصة نجاح ورؤية ZED الرقمية</span>
            </div>

            <h1 className="text-4xl sm:text-7xl font-black tracking-tight leading-[1.15]">
              نعيد تعريف مستقبل <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
                التعليم التقني والمهني في المنطقة
              </span>
            </h1>

            <p className="text-slate-400 text-sm sm:text-base font-medium max-w-3xl mx-auto leading-relaxed">
              تأسست منصة <strong className="text-white">ZED</strong> لتكون المظلة الأضخم التي تجمع الطاقات الشبابية الشغوفة مع أعظم العقول التدريبية، عبر بيئة رقمية فائقة الذكاء، مؤمنة تماماً، ومصممة لتحقيق نتائج حقيقية وملموسة.
            </p>

            {/* أزرار التبديل السريعة للمحتوى */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'all' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25' : 'bg-slate-900/80 text-slate-400 hover:text-white'}`}
              >
                نظرة شاملة
              </button>
              <button 
                onClick={() => setActiveTab('students')}
                className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'students' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25' : 'bg-slate-900/80 text-slate-400 hover:text-white'}`}
              >
                مسار الطلاب والمهنيين
              </button>
              <button 
                onClick={() => setActiveTab('instructors')}
                className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'instructors' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25' : 'bg-slate-900/80 text-slate-400 hover:text-white'}`}
              >
                مسار المدرسين والخبراء
              </button>
            </div>
          </div>

          {/* نظام الـ Bento Grid الفاخر المكثف (بدون خطوط أو حدود تقليدية) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* البطاقة الأولى: الرؤية والرسالة */}
            {(activeTab === 'all' || activeTab === 'students') && (
              <div className="bg-gradient-to-br from-slate-900/80 via-slate-950/90 to-slate-900/80 p-8 sm:p-10 rounded-[3rem] backdrop-blur-2xl flex flex-col justify-between space-y-8 shadow-2xl hover:scale-[1.01] transition-all duration-300 group">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                  <HiOutlineRocketLaunch className="w-8 h-8" />
                </div>
                <div className="space-y-4">
                  <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">
                    الهدف الأساسي
                  </div>
                  <h3 className="text-2xl font-black text-white">تمكين بلا حدود للجميع</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
                    نستهدف كسر كافة الحواجز الجغرافية والمادية أمام كل باحث عن العلم الاحترافي، عبر كورسات تركز 80% منها على التطبيق العملي وبناء مشاريع حقيقية تضاف مباشرة لمعرض أعمالك.
                  </p>
                </div>
                <div className="space-y-2 pt-4 border-t border-slate-800/50">
                  <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                    <HiOutlineCheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>مشاريع عملية في كل كورس</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                    <HiOutlineCheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>متابعة مستمرة من الموجهين</span>
                  </div>
                </div>
              </div>
            )}

            {/* البطاقة الثانية: البنية التحتية والتقنية */}
            {(activeTab === 'all' || activeTab === 'instructors') && (
              <div className="bg-gradient-to-br from-slate-900/80 via-slate-950/90 to-slate-900/80 p-8 sm:p-10 rounded-[3rem] backdrop-blur-2xl flex flex-col justify-between space-y-8 shadow-2xl hover:scale-[1.01] transition-all duration-300 group">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                  <HiOutlineCpuChip className="w-8 h-8" />
                </div>
                <div className="space-y-4">
                  <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[11px] font-bold">
                    التكنولوجيا والسيرفرات
                  </div>
                  <h3 className="text-2xl font-black text-white">هندسة سحابية فائقة الأداء</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
                    نعتمد على خوادم سحابية عالمية تضمن بث الفيديوهات بجودة 4K دون أي تقطيع، مع لوحات تحكم متطورة للمدرسين لإدارة الفيديوهات، الاختبارات، وتنظيم الوحدات التدريبية بكل سهولة.
                  </p>
                </div>
                <div className="space-y-2 pt-4 border-t border-slate-800/50">
                  <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                    <HiOutlineCheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>استقرار بنسبة 99.9%</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                    <HiOutlineCheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>تحليلات أداء فورية دقيقة</span>
                  </div>
                </div>
              </div>
            )}

            {/* البطاقة الثالثة: الحماية والأمان */}
            {activeTab === 'all' && (
              <div className="bg-gradient-to-br from-slate-900/80 via-slate-950/90 to-slate-900/80 p-8 sm:p-10 rounded-[3rem] backdrop-blur-2xl flex flex-col justify-between space-y-8 shadow-2xl hover:scale-[1.01] transition-all duration-300 group">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                  <HiOutlineShieldCheck className="w-8 h-8" />
                </div>
                <div className="space-y-4">
                  <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[11px] font-bold">
                    الأمان وحقوق الملكية
                  </div>
                  <h3 className="text-2xl font-black text-white">حماية قصوى ضد القرصنة</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
                    نظام أمني متكامل ومشفّر يمنع تسجيل الشاشات أو القرصنة، ليضمن للمحاضرين الحفاظ الكامل على حقوق ملكيتهم الفكرية، ويمنح الطلاب بيئة تصفح آمنة وموثوقة تماماً.
                  </p>
                </div>
                <div className="space-y-2 pt-4 border-t border-slate-800/50">
                  <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                    <HiOutlineCheckCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>تشفير فيديو ديناميكي DRM</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                    <HiOutlineCheckCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>حماية بيانات المستخدمين بالكامل</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* لوحة إحصائيات الأرقام العملاقة */}
          <div className="bg-gradient-to-r from-slate-900/90 via-slate-950 to-slate-900/90 rounded-[3rem] p-10 sm:p-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-center backdrop-blur-3xl shadow-2xl">
            <div className="space-y-2">
              <span className="block text-4xl sm:text-6xl font-black text-cyan-400">+500</span>
              <span className="block text-xs sm:text-sm text-slate-400 font-bold">كورس احترافي معتمد</span>
            </div>
            <div className="space-y-2">
              <span className="block text-4xl sm:text-6xl font-black text-blue-400">+120K</span>
              <span className="block text-xs sm:text-sm text-slate-400 font-bold">طالب وطالبة نشط</span>
            </div>
            <div className="space-y-2">
              <span className="block text-4xl sm:text-6xl font-black text-indigo-400">+350</span>
              <span className="block text-xs sm:text-sm text-slate-400 font-bold">خبير ومحاضر عالمي</span>
            </div>
            <div className="space-y-2">
              <span className="block text-4xl sm:text-6xl font-black text-emerald-400">99%</span>
              <span className="block text-xs sm:text-sm text-slate-400 font-bold">معدل رضا الخريجين</span>
            </div>
          </div>

          {/* قسم البيانات التفصيلية المكثفة (لماذا تختار ZED؟) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold">
                <HiOutlineLightBulb className="w-4 h-4" />
                <span>المزايا الحصرية المتقدمة</span>
              </div>
              
              <h2 className="text-3xl sm:text-5xl font-black leading-tight">
                منظومة متكاملة صُممت لترتقي <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  بمسيرتك الأكاديمية والمهنية
                </span>
              </h2>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-medium">
                لا تقتصر تجربة ZED على سرد المعلومات، بل نقدم حزمة متكاملة من الأدوات التفاعلية، الاختبارات الذكية، والدعم المستمر لضمان وصولك لهدفك بأسرع وقت وأعلى كفاءة ممكنة.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-900/60 p-4 rounded-2xl flex items-center gap-3 backdrop-blur-xl">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                    <HiOutlineChartBar className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-200">تحليلات الأداء المتقدمة</span>
                </div>

                <div className="bg-slate-900/60 p-4 rounded-2xl flex items-center gap-3 backdrop-blur-xl">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <HiOutlineCurrencyDollar className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-200">أرباح فورية للمحاضرين</span>
                </div>

                <div className="bg-slate-900/60 p-4 rounded-2xl flex items-center gap-3 backdrop-blur-xl">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                    <HiOutlineUserGroup className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-200">مجتمع طلابي تفاعلي</span>
                </div>

                <div className="bg-slate-900/60 p-4 rounded-2xl flex items-center gap-3 backdrop-blur-xl">
                 
                  <span className="text-xs font-bold text-slate-200">دعم فني على مدار الساعة</span>
                </div>
              </div>
            </div>

            {/* بطاقة العمل الجماعي والمشاركة */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 sm:p-12 rounded-[3rem] shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-3">
                <span className="text-cyan-400 text-xs font-black uppercase tracking-widest">تجربة الـ 5 أيام المجانية</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">ابدأ رحلتك كـ VIP الآن دون أي التزامات</h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
                امنح نفسك حق الوصول الكامل لجميع كورسات المنصة ومميزات لوحة التحكم للمدرسين لمدة 120 ساعة متواصلة. بدون بطاقات ائتمان، وبدون رسوم مخفية.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate('/free-trial')}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-xl shadow-cyan-500/25 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>فعّل التجربة المجانية الآن</span>
                  <HiOutlineArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* قسم الأسئلة الشائعة (FAQ) الشامل والمفصل */}
          <div className="space-y-12 pt-10">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold">
                <HiOutlineSparkles className="w-4 h-4" />
                <span>الأسئلة الشائعة والاستفسارات</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white">
                كل ما ترغب في معرفته عن منصة ZED
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                إجابات تفصيلية ودقيقة عن كافة الأسئلة التي يطرحها طلابنا ومحاضرينا المستقبليون.
              </p>
            </div>

            {/* قائمة الأسئلة */}
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div 
                    key={idx}
                    className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-6 text-right flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/90 transition-colors"
                    >
                      <span className="text-sm sm:text-base font-black text-white">{faq.q}</span>
                      <div className={`w-8 h-8 rounded-xl bg-slate-800 text-cyan-400 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-cyan-500 text-slate-950' : ''}`}>
                        <HiOutlineChevronDown className="w-5 h-5" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-0 text-xs sm:text-sm text-slate-400 leading-relaxed font-medium border-t border-slate-800/40 pt-4">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* دعوة نهائية للانضمام */}
          <div className="text-center space-y-6 pt-12">
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              جاهز لنقل مستقبلك التقني والمهني للمستوى التالي؟
            </h2>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => navigate('/courses')}
                className="px-8 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-xl shadow-cyan-500/25 cursor-pointer inline-flex items-center gap-2"
              >
                <span>استكشف كافة الكورسات المتاحة</span>
                <HiOutlineArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}