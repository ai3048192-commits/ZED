import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Send, 
  MapPin, 
  ArrowLeft, 
  Globe2, 
  HelpCircle,
  Code2,
  Share2,
  PlayCircle,
  GitBranch,
  PhoneCall,
  Mail
} from 'lucide-react';

const Footer = () => {
  // روابط وسائل التواصل الاجتماعي مع أيقونات متوافقة ونظيفة
  const socialLinks = [
    { 
      name: 'منصة المشاركة', 
      icon: Share2, 
      href: 'https://twitter.com', 
      color: 'hover:bg-[#002aff] hover:border-[#00bfff]' 
    },
    { 
      name: 'الشبكة المهنية', 
      icon: GitBranch, 
      href: 'https://linkedin.com', 
      color: 'hover:bg-[#0A66C2] hover:border-[#0A66C2]' 
    },
    { 
      name: 'قناة الفيديوهات', 
      icon: PlayCircle, 
      href: 'https://youtube.com', 
      color: 'hover:bg-[#FF0000] hover:border-[#FF0000]' 
    },
    { 
      name: 'مستودع الكود', 
      icon: Code2, 
      href: 'https://github.com', 
      color: 'hover:bg-[#24292e] hover:border-[#24292e]' 
    },
  ];

  return (
    <footer className="relative w-full bg-[#050814] text-slate-300 pt-28 pb-14 px-6 overflow-hidden border-t border-white/10" dir="rtl">
      
      {/* خلفية ضوئية جمالية */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-b from-[#002aff]/15 via-[#00bfff]/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* شبكة البنتو الفخمة للفوتر */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* الكارد الأول: البراند والنبذة ووسائل التواصل (يأخذ 6 أعمدة) */}
          <div className="lg:col-span-6 bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-2xl flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-[#002aff]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#002aff] to-[#00bfff] p-0.5 shadow-lg flex items-center justify-center">
                  <div className="w-full h-full bg-[#050814] rounded-[14px] flex items-center justify-center text-white font-black text-xl">
                    Z
                  </div>
                </div>
                <span className="text-3xl font-black bg-gradient-to-r from-white via-slate-200 to-[#38bdf8] bg-clip-text text-transparent">
                  ZED<span className="text-[#00bfff]">.</span>
                </span>
              </div>

              <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6">
                منصة تعليمية متكاملة تهدف إلى تمكين الطلاب والمدرسين بأحدث وسائل التكنولوجيا والمناهج المتطورة لتحقيق التفوق الأكاديمي والمهني.
              </p>

              <div className="space-y-2.5 mb-8 text-xs text-slate-400 font-medium">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#38bdf8] shrink-0" />
                  <span>جمهورية مصر العربية، القاهرة</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#38bdf8] shrink-0" />
                  <span>support@zed-platform.com</span>
                </div>
              </div>
            </div>

            {/* أيقونات وسائل التواصل الاجتماعي */}
            <div className="flex items-center gap-3 pt-6 border-t border-white/5">
              {socialLinks.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className={`w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 shadow-md ${item.color}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>


          {/* الكارد الثاني: القائمة البريدية والتفاعل (يأخذ 6 أعمدة) */}
          <div className="lg:col-span-6 bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-2xl flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-l from-[#00bfff]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[#38bdf8] text-xs font-bold mb-4">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>النشرة البريدية</span>
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight mb-3">
                كن أولاضمن <span className="bg-gradient-to-r from-[#00bfff] to-[#002aff] bg-clip-text text-transparent">المستفيدين والمتابعين</span>
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm font-medium leading-relaxed mb-6">
                احصل على التنبيهات حول الدورات الجديدة والمناهج والمقالات التعليمية مباشرة في بريدك.
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="أدخل بريدك الإلكتروني..." 
                className="flex-1 px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00bfff] transition-all"
                required
              />
              <button 
                type="submit"
                className="px-6 py-3.5 bg-gradient-to-r from-[#002aff] to-[#00bfff] hover:opacity-90 text-white font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-[0_10px_25px_rgba(0,42,255,0.4)] cursor-pointer shrink-0"
              >
                <span>اشتراك</span>
                <Send className="w-4 h-4 rotate-180" />
              </button>
            </form>
          </div>

        </div>


        {/* صف الروابط السريعة المنظم */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-12 border-t border-b border-white/5 mb-10">
          
          {/* عمود الروابط السريعة */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-[#38bdf8]" />
              <span>روابط سريعة</span>
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              {['الرئيسية', 'المميزات الرئيسية', 'التخصصات الدراسية', 'كيف تعمل المنصة', 'آراء المستخدمين'].map((item, idx) => (
                <li key={idx}>
                  <a href="#link" className="text-slate-400 hover:text-[#38bdf8] transition-colors flex items-center gap-2 group">
                    <ArrowLeft className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#38bdf8] group-hover:-translate-x-1 transition-all" />
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* عمود التصنيفات */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#38bdf8]" />
              <span>التصنيفات الدراسية</span>
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              {['البرمجة والتقنية', 'الرياضيات والمنطق', 'العلوم والفيزياء', 'اللغات والآداب', 'الذكاء الاصطناعي'].map((item, idx) => (
                <li key={idx}>
                  <a href="#link" className="text-slate-400 hover:text-[#38bdf8] transition-colors flex items-center gap-2 group">
                    <ArrowLeft className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#38bdf8] group-hover:-translate-x-1 transition-all" />
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* عمود الدعم والمعلومات */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#38bdf8]" />
              <span>الدعم والمساعدة</span>
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              {['مركز المساعدة', 'الأسئلة الشائعة', 'سياسة الخصوصية', 'شروط الاستخدام', 'تواصل معنا'].map((item, idx) => (
                <li key={idx}>
                  <a href="#link" className="text-slate-400 hover:text-[#38bdf8] transition-colors flex items-center gap-2 group">
                    <ArrowLeft className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#38bdf8] group-hover:-translate-x-1 transition-all" />
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>


        {/* حقوق النشر والبيانات السفلية */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <p>© {new Date().getFullYear()} منصة ZED التعليمية. كافة الحقوق محفوظة.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>القاهرة، مصر</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;