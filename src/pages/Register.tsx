import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineSparkles, 
  HiOutlineUser, 
  HiOutlineAcademicCap, 
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineLightningBolt,
  HiOutlineShieldCheck,
  HiOutlineChartBar,
  HiOutlineBookOpen,
  HiOutlineVideoCamera,
  HiOutlineBadgeCheck,
  HiOutlineCurrencyDollar,
  HiOutlineUserGroup,
  HiOutlineArrowLeft
} from 'react-icons/hi';

export default function UltimateFreeTrial() {
  const [activeStep, setActiveStep] = useState<'landing' | 'ready'>('landing');
  const [selectedRole, setSelectedRole] = useState<'student' | 'instructor'>('student');
  const navigate = useNavigate();

  const handleSelectRole = (role: 'student' | 'instructor') => {
    setSelectedRole(role);
    setActiveStep('ready');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToDashboard = () => {
    if (selectedRole === 'student') {
      navigate('/student-dashboard');
    } else {
      navigate('/instructor-dashboard');
    }
  };

  return (
    <div className="w-full bg-[#030712] text-white m-0 p-0 overflow-x-hidden " dir="rtl">
      
      {/* الشاشة الرئيسية: العرض والبيانات الضخمة */}
      {activeStep === 'landing' && (
        <div className="w-full py-20 px-4 sm:px-6 lg:px-12 relative">
          
          {/* تأثيرات الإضاءة الخلفية */}
          <div className="absolute top-10 right-1/3 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-10 left-1/3 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10 space-y-16">
            
            {/* الترويسة الرئيسية */}
            <div className="text-center max-w-4xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black tracking-widest uppercase shadow-inner">
                <HiOutlineSparkles className="w-4 h-4 animate-spin text-cyan-400" />
                <span>منصة ZED التعليمية • جواز السفر الرقمي لـ 5 أيام مجانية</span>
              </div>

              <h2 className="text-4xl sm:text-7xl font-black tracking-tight leading-[1.1]">
                أطلق العنان لقدراتك مع <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400">
                  التجربة الشاملة بلا حدود
                </span>
              </h2>

              <p className="text-slate-400 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
                سواء كنت طالباً تبحث عن مهارات المستقبل أو مدرساً ترغب في بناء إمبراطوريتك التدريبية، امنح نفسك حق الوصول الكامل لجميع مميزات المنصة لمدة 120 ساعة متواصلة.
              </p>
            </div>

            {/* شبكة الباقات التفصيلية (طالب vs مدرس) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* بطاقة الطالب المفصلة */}
              <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-cyan-500/30 hover:border-cyan-500/60 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-6">
                  
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                      <HiOutlineUser className="w-8 h-8" />
                    </div>
                    <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-black tracking-wider uppercase border border-cyan-500/20">
                      مسار الطالب الأكاديمي
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-white mb-2">بطاقة التجربة الماسية (للطلاب)</h3>
                    <p className="text-xs text-cyan-300 font-bold">كل ما تحتاجه لتصبح محترفاً في مجالك خلال 5 أيام</p>
                  </div>

                  {/* تفاصيل البيانات المكثفة للطالب */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-start gap-3 bg-slate-900/80 border border-slate-800/80 p-3.5 rounded-2xl">
                      <HiOutlineBookOpen className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-xs font-bold text-white">فتح +500 كورس احترافي</span>
                        <span className="block text-[11px] text-slate-400">تغطية كاملة للبرمجة، الذكاء الاصطناعي، التصميم، واللغات.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-slate-900/80 border border-slate-800/80 p-3.5 rounded-2xl">
                      <HiOutlineVideoCamera className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-xs font-bold text-white">مشاهدة عالية الدقة 4K مع التحميل</span>
                        <span className="block text-[11px] text-slate-400">إمكانية تحميل الملفات، الأكواد البرمجية، وملخصات الدروس.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-slate-900/80 border border-slate-800/80 p-3.5 rounded-2xl">
                      <HiOutlineBadgeCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-xs font-bold text-white">شهادات إتمام معتمدة فورية</span>
                        <span className="block text-[11px] text-slate-400">احصل على شهادات قابلة للتوثيق والإضافة لملفك المهني.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-slate-900/80 border border-slate-800/80 p-3.5 rounded-2xl">
                      <HiOutlineUserGroup className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-xs font-bold text-white">مجتمع الطلاب الاستشاري</span>
                        <span className="block text-[11px] text-slate-400">اطرح أسئلتك واحصل على إجابات مباشرة من الخبراء.</span>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="pt-8">
                  <button
                    onClick={() => handleSelectRole('student')}
                    className="w-full py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm transition-all shadow-xl shadow-cyan-500/20 cursor-pointer flex items-center justify-center gap-2 group-hover:shadow-cyan-500/40"
                  >
                    <HiOutlineSparkles className="w-5 h-5" />
                    <span>ابدأ تجربة الطالب المجانية فوراً</span>
                    <HiOutlineArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* بطاقة المدرس المفصلة */}
              <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-emerald-500/30 hover:border-emerald-500/60 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-6">
                  
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                      <HiOutlineAcademicCap className="w-8 h-8" />
                    </div>
                    <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-black tracking-wider uppercase border border-emerald-500/20">
                      مسار المحاضرين والخبراء
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-white mb-2">بطاقة الشراكة الاحترافية (للمدرسين)</h3>
                    <p className="text-xs text-emerald-300 font-bold">أنشئ دوراتك وادعُ الطلاب وابدأ بتحقيق الأرباح</p>
                  </div>

                  {/* تفاصيل البيانات المكثفة للمدرس */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-start gap-3 bg-slate-900/80 border border-slate-800/80 p-3.5 rounded-2xl">
                      <HiOutlineChartBar className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-xs font-bold text-white">لوحة تحكم المحاضر المتكاملة</span>
                        <span className="block text-[11px] text-slate-400">إدارة الكورسات، تنظيم الوحدات، ورفع الفيديوهات بلا حدود.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-slate-900/80 border border-slate-800/80 p-3.5 rounded-2xl">
                      <HiOutlineLightningBolt className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-xs font-bold text-white">أدوات هندسة الاختبارات والواجبات</span>
                        <span className="block text-[11px] text-slate-400">أنشئ اختبارات تفاعلية، أسئلة اختياري، ومهام عملية لطلابك.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-slate-900/80 border border-slate-800/80 p-3.5 rounded-2xl">
                      <HiOutlineCurrencyDollar className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-xs font-bold text-white">نظام مبيعات وأرباح متطور</span>
                        <span className="block text-[11px] text-slate-400">تتبع إحصائيات التسجيل، أداء الطلاب، والعوائد المالية بدقة.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-slate-900/80 border border-slate-800/80 p-3.5 rounded-2xl">
                      <HiOutlineShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-xs font-bold text-white">حماية قصوى للمحتوى الفكري</span>
                        <span className="block text-[11px] text-slate-400">تشفير كامل للفيديوهات وحماية ضد التسجيل أو القرصنة.</span>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="pt-8">
                  <button
                    onClick={() => handleSelectRole('instructor')}
                    className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all shadow-xl shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2 group-hover:shadow-emerald-500/40"
                  >
                    <HiOutlineLightningBolt className="w-5 h-5" />
                    <span>ابدأ تجربة المدرس المجانية فوراً</span>
                    <HiOutlineArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* شريط الإحصائيات والأمان السفلي */}
            <div className="bg-slate-900/70 border border-slate-800/80 rounded-3xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs sm:text-sm text-slate-300 font-semibold backdrop-blur-xl">
              <div className="flex items-center justify-center gap-3">
                <HiOutlineClock className="w-6 h-6 text-cyan-400 shrink-0" />
                <span>5 أيام كاملة الصلاحية (120 ساعة متواصلة من المزايا الحصرية)</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <HiOutlineShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
                <span>بدون أي بطاقات ائتمان أو خصومات تلقائية نهائياً</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <HiOutlineChartBar className="w-6 h-6 text-indigo-400 shrink-0" />
                <span>حرية الترقية أو الإلغاء بضغطة زر واحدة بكل سهولة</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* الشاشة الثانية: شاشة "ابدأ الآن" والانتقال المباشر للـ Dashboard */}
      {activeStep === 'ready' && (
        <div className="w-full min-h-[80vh] flex items-center justify-center px-4 py-20 relative">
          <div className="max-w-lg w-full bg-slate-900/90 border border-cyan-500/30 p-8 sm:p-10 rounded-[2.5xl] backdrop-blur-2xl text-center space-y-6 shadow-[0_0_60px_rgba(6,182,212,0.15)]">
            
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-cyan-500 to-emerald-500 text-slate-950 flex items-center justify-center mx-auto shadow-2xl">
              {selectedRole === 'student' ? <HiOutlineUser className="w-10 h-10" /> : <HiOutlineAcademicCap className="w-10 h-10" />}
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {selectedRole === 'student' ? 'أنت جاهز تماماً لتجربة الطلاب!' : 'أنت جاهز تماماً لتجربة المدرسين!'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                تم بنجاح تفعيل صلاحيات الـ VIP المجانية لمدة 5 أيام على حسابك. اضغط على الزر أدناه لتنتقل مباشرة إلى لوحة التحكم وتستكشف كل الأداوت.
              </p>
            </div>

            {/* تفاصيل سريعة للمؤكد */}
            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl text-right space-y-2 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <HiOutlineCheckCircle className="w-4 h-4 shrink-0" />
                <span>تم إعداد حساب الـ {selectedRole === 'student' ? 'طالب' : 'مدرس'} بنجاح</span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineClock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>العداد يبدأ من هذه اللحظة (صالح لـ 120 ساعة)</span>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <button
                onClick={handleGoToDashboard}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>ابدأ الآن (دخول لوحة التحكم)</span>
                <HiOutlineLightningBolt className="w-5 h-5" />
              </button>

              <button
                onClick={() => setActiveStep('landing')}
                className="w-full py-3 rounded-xl bg-slate-800/40 hover:bg-slate-800 text-slate-400 hover:text-white font-bold text-xs transition-all cursor-pointer"
              >
                العودة للخلف لتغيير المسار
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}