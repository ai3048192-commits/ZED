import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  MapPin, 
  ArrowLeft, 
  Globe2, 
  ShieldAlert,
  Mail,
  Phone,
  ShieldCheck,
  BookOpen,
  Lock,
  FileText
} from 'lucide-react';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube, 
  FaLinkedin, 
  FaWhatsapp,
  FaGlobe 
} from 'react-icons/fa';
import { supabase } from "../lib/supabaseClient";

const Footer = ({ isDark }) => {
  const [settings, setSettings] = useState({
    platformName: "ZED",
    logoUrl: "",
    address: "جمهورية مصر العربية، القاهرة",
    email: "support@zed-platform.com",
    phone: "",
    social: {
      facebook: "",
      twitter: "",
      instagram: "",
      whatsapp: "",
      youtube: "",
      linkedin: "",
    }
  });

  useEffect(() => {
    async function fetchFooterSettings() {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("*")
          .order("id", { ascending: false })
          .limit(1);

        if (data && data.length > 0 && !error) {
          const item = data[0];
          setSettings({
            platformName: item.site_name || "ZED",
            logoUrl: item.logo_url || "",
            address: item.address || "جمهورية مصر العربية، القاهرة",
            email: item.email || "support@zed-platform.com",
            phone: item.phone || "",
            social: {
              facebook: item.facebook || "",
              twitter: item.twitter || "",
              instagram: item.instagram || "",
              whatsapp: item.whatsapp || "",
              youtube: item.youtube || "",
              linkedin: item.linkedin || "",
            }
          });
        }
      } catch (err) {
        console.error("خطأ في جلب بيانات الفوتر:", err);
      }
    }

    fetchFooterSettings();
  }, []);

  const getSocialIcon = (url) => {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('facebook.com')) return FaFacebook;
    if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) return FaTwitter;
    if (lowerUrl.includes('instagram.com')) return FaInstagram;
    if (lowerUrl.includes('whatsapp.com') || lowerUrl.includes('wa.me')) return FaWhatsapp;
    if (lowerUrl.includes('youtube.com')) return FaYoutube;
    if (lowerUrl.includes('linkedin.com')) return FaLinkedin;
    return FaGlobe; 
  };

  const activeSocialLinks = Object.entries(settings.social)
    .filter(([_, url]) => url && url.trim() !== "")
    .map(([key, url]) => ({
      key,
      url,
      icon: getSocialIcon(url)
    }));

  return (
    <footer 
      style={{
        backgroundColor: isDark ? '#020617' : '#f8fafc',
        color: isDark ? 'rgba(191, 219, 254, 0.8)' : '#334155',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1'
      }}
      className="relative w-full pt-28 pb-14 px-6 overflow-hidden border-t transition-colors duration-300"
      dir="rtl"
    >
      
      {/* تأثيرات إضاءة الخلفية */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute -bottom-10 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* القسم العلوي: الكارت الرئيسي ومعلومات المنصة + كارت الإحصائيات البديل */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* الكارد الأول: تفاصيل المنصة ومعلومات التواصل */}
          <div 
            style={{
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#ffffff',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1'
            }}
            className="lg:col-span-7 border rounded-[32px] p-8 sm:p-10 backdrop-blur-2xl flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-blue-400/50 transition-all duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent" />
            
            <div>
              <div className="flex items-start gap-4 mb-6">
                {settings.logoUrl ? (
                  <img src={settings.logoUrl} alt="Logo" className="w-14 h-14 rounded-2xl object-cover border border-blue-500/30 shadow-lg shrink-0" />
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 p-0.5 shadow-lg shadow-blue-600/30 flex items-center justify-center shrink-0">
                    <div 
                      style={{ backgroundColor: isDark ? '#020617' : '#f8fafc', color: isDark ? '#ffffff' : '#0f172a' }}
                      className="w-full h-full rounded-[14px] flex items-center justify-center font-black text-2xl"
                    >
                      {settings.platformName.charAt(0)}
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col">
                  <span 
                    style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                    className="text-3xl font-black leading-none mb-2"
                  >
                    {settings.platformName}
                  </span>
                  <span className="text-xs text-cyan-500 font-bold tracking-wider uppercase">
                    تعلم . تطور . زد تفوقك
                  </span>
                </div>
              </div>

              <p 
                style={{ color: isDark ? 'rgba(224, 242, 254, 0.7)' : '#475569' }}
                className="text-sm font-medium leading-relaxed mb-8 max-w-xl"
              >
                منصة تعليمية متكاملة تهدف إلى تمكين الطلاب والمدرسين بأحدث وسائل التكنولوجيا، والمناهج المتطورة، والملازم الحصرية لتحقيق أعلى معدلات التفوق الأكاديمي.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-xs font-medium">
                {settings.address && (
                  <div 
                    style={{
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : '#f8fafc',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#e2e8f0',
                      color: isDark ? 'rgba(191, 219, 254, 0.8)' : '#334155'
                    }}
                    className="flex items-center gap-3 p-3 rounded-2xl border shadow-sm"
                  >
                    <MapPin className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span className="truncate">{settings.address}</span>
                  </div>
                )}
                {settings.email && (
                  <div 
                    style={{
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : '#f8fafc',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#e2e8f0',
                      color: isDark ? 'rgba(191, 219, 254, 0.8)' : '#334155'
                    }}
                    className="flex items-center gap-3 p-3 rounded-2xl border shadow-sm"
                  >
                    <Mail className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span className="truncate">{settings.email}</span>
                  </div>
                )}
                {settings.phone && (
                  <div 
                    style={{
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : '#f8fafc',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#e2e8f0',
                      color: isDark ? 'rgba(191, 219, 254, 0.8)' : '#334155'
                    }}
                    className="flex items-center gap-3 p-3 rounded-2xl border sm:col-span-2 shadow-sm"
                  >
                    <Phone className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span>{settings.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* أيقونات السوشيال ميديا */}
            <div 
              style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1' }}
              className="flex items-center gap-3 pt-6 border-t flex-wrap"
            >
              <span className="text-xs font-bold ml-2" style={{ color: isDark ? '#93c5fd' : '#475569' }}>تابعنا عبر:</span>
              {activeSocialLinks.length > 0 ? (
                activeSocialLinks.map((item, idx) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={idx}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.key}
                      style={{
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#f8fafc',
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1',
                        color: isDark ? '#bfdbfe' : '#334155'
                      }}
                      className="w-11 h-11 rounded-2xl border flex items-center justify-center hover:text-white hover:bg-blue-600 hover:border-blue-400 hover:scale-110 transition-all duration-300 shadow-sm"
                    >
                      <IconComponent className="w-4 h-4" />
                    </a>
                  );
                })
              ) : (
                <span className="text-xs text-slate-400">لا توجد وسائل تواصل مضافة حالياً</span>
              )}
            </div>
          </div>

          {/* الكارد الثاني: مزايا الأمان والبيئة التعليمية */}
          <div 
            style={{
              backgroundColor: isDark ? undefined : '#ffffff',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1'
            }}
            className={`lg:col-span-5 ${isDark ? 'bg-gradient-to-br from-blue-950/40 via-slate-900/60 to-slate-950' : 'bg-white'} border rounded-[32px] p-8 sm:p-10 backdrop-blur-2xl flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-blue-400/50 transition-all duration-300`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 text-xs font-bold mb-6">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>بيئة تعليمية موثوقة</span>
              </div>
              <h3 className="text-2xl font-black tracking-tight mb-4 leading-snug" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                لماذا يختار الطلاب والمعلمون منصة <span className="text-cyan-500"> {settings.platformName}</span> ؟   
              </h3>
              <p 
                style={{ color: isDark ? 'rgba(224, 242, 254, 0.7)' : '#475569' }}
                className="text-xs sm:text-sm font-medium leading-relaxed mb-8"
              >
                نحن نمكنك من إدارة وتلقي المحتوى التعليمي بأعلى أداء تقني، مع حماية تامة للخصوصية وسرعة فائقة في التصفح.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div 
                style={{
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#f8fafc',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0'
                }}
                className="border p-4 rounded-2xl flex flex-col gap-1 shadow-sm"
              >
                <div className="flex items-center gap-2 text-cyan-500 mb-1">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-xs font-bold">محتوى حصري</span>
                </div>
                <span className="text-[11px]" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>ملازم وفيديوهات بجودة عالية</span>
              </div>
              <div 
                style={{
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#f8fafc',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0'
                }}
                className="border p-4 rounded-2xl flex flex-col gap-1 shadow-sm"
              >
                <div className="flex items-center gap-2 text-blue-500 mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-bold">حماية كاملة</span>
                </div>
                <span className="text-[11px]" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>تأمين شامل لبيانات الحساب</span>
              </div>
            </div>

          </div>

        </div>

        {/* روابط سريعة والسياسات القانونية */}
        <div 
          style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10 border-t border-b mb-10"
        >
          
          {/* روابط سريعة */}
          <div 
            style={{
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : '#ffffff',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#cbd5e1'
            }}
            className="space-y-4 border p-6 rounded-3xl shadow-sm"
          >
            <h4 className="font-bold text-base tracking-wide flex items-center gap-2.5" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
              <Globe2 className="w-4 h-4 text-cyan-500" />
              <span>روابط سريعة للمنصة</span>
            </h4>
            <ul className="grid grid-cols-2 gap-2.5 text-sm font-medium">
              {[
                { name: 'الرئيسية', href: '/' },
                { name: 'الكورسات', href: '/courses' },
                { name: 'عن المنصة', href: '/about' },
                { name: 'تواصل معنا', href: '/contact' },
                { name: 'تسجيل الدخول', href: '/auth' }
              ].map((item, idx) => (
                <li key={idx}>
                  <a 
                    href={item.href} 
                    style={{ color: isDark ? 'rgba(191, 219, 254, 0.7)' : '#475569' }}
                    className="transition-colors flex items-center gap-2 group p-1.5 rounded-xl hover:bg-blue-500/10 hover:text-cyan-500"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-cyan-500/50 group-hover:text-cyan-500 group-hover:-translate-x-1 transition-all" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* الدعم والسياسات القانونية */}
          <div 
            style={{
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : '#ffffff',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#cbd5e1'
            }}
            className="space-y-4 border p-6 rounded-3xl shadow-sm"
          >
            <h4 className="font-bold text-base tracking-wide flex items-center gap-2.5" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
              <ShieldAlert className="w-4 h-4 text-cyan-500" />
              <span>الدعم والسياسات القانونية</span>
            </h4>
            <ul className="grid grid-cols-1 gap-2.5 text-sm font-medium">
              {[
                { name: 'سياسة الخصوصية وحماية البيانات', href: '/privacy-policy', icon: Lock },
                { name: 'شروط الاستخدام والأحكام القانونية', href: '/terms-and-conditions', icon: FileText },
                { name: 'مركز الدعم الفني والمساعدة', href: '/contact', icon: Phone }
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <li key={idx}>
                    <a 
                      href={item.href} 
                      style={{
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : '#f8fafc',
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#e2e8f0',
                        color: isDark ? 'rgba(191, 219, 254, 0.7)' : '#475569'
                      }}
                      className="transition-colors flex items-center justify-between group p-2.5 rounded-xl border hover:bg-blue-500/10 hover:text-cyan-500"
                    >
                      <div className="flex items-center gap-2.5">
                        <IconComponent className="w-4 h-4 text-cyan-500" />
                        <span>{item.name}</span>
                      </div>
                      <ArrowLeft className="w-3.5 h-3.5 text-cyan-500/50 group-hover:text-cyan-500 group-hover:-translate-x-1 transition-all" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>

        {/* شريط حقوق النشر السفلي */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium" style={{ color: isDark ? 'rgba(191, 219, 254, 0.6)' : '#64748b' }}>
          <p>© {new Date().getFullYear()} منصة {settings.platformName}. كافة الحقوق محفوظة.</p>
          <div className="flex items-center gap-6">
            <span 
              style={{
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#ffffff',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1',
                color: isDark ? '#ffffff' : '#0f172a'
              }}
              className="flex items-center gap-1.5 border px-4 py-2 rounded-xl shadow-sm"
            >
              <MapPin className="w-3.5 h-3.5 text-cyan-500" />
              <span>{settings.address}</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;