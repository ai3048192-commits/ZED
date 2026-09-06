import React from 'react';
import { 
  FileText, 
  ShieldCheck, 
  Scale, 
  AlertCircle, 
  Lock, 
  UserCheck, 
  BookOpenCheck, 
  Mail, 
  CheckCircle2,
  Gavel,
  Zap
} from 'lucide-react';

interface TermsAndConditionsProps {
  isDark?: boolean;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ isDark = true }) => {
  // تفاصيل البنود مع إبراز المميزات والخصائص الفريدة لكل بند
  const termsCards = [
    {
      id: 1,
      title: "1. القبول والالتزام بالاتفاقية",
      icon: FileText,
      badge: "البداية القانونية",
      gradient: "from-blue-500/25 via-cyan-500/10 to-transparent",
      borderColor: "group-hover:border-blue-400/50",
      iconBg: "bg-blue-500/15 text-blue-500 border-blue-500/30",
      description: "عقد قانوني ملزم يحكم العلاقة بينك وبين المنصة بمجرد التصفح أو إنشاء الحساب لضمان بيئة آمنة.",
      highlights: [
        "اشتراط بلوغ 18 عاماً أو التسجيل بإشراف ولي الأمر.",
        "التحديث المستمر والموافقة التلقائية على التعديلات.",
        "الشفافية الكاملة في بنود الاتفاق المبرم."
      ]
    },
    {
      id: 2,
      title: "2. حقوق الملكية الفكرية",
      icon: ShieldCheck,
      badge: "حماية حصرية",
      gradient: "from-cyan-500/25 via-blue-600/10 to-transparent",
      borderColor: "group-hover:border-cyan-400/50",
      iconBg: "bg-cyan-500/15 text-cyan-500 border-cyan-500/30",
      description: "جميع الملازم، الكتب الرقمية، الفيديوهات والشرح محمية بالكامل قانونياً وضمن حقوق نشر حصرية.",
      highlights: [
        "منع تام لإعادة النشر، البيع، أو التوزيع العشوائي.",
        "الاستخدام مخصص للأغراض الأكاديمية الشخصية فقط.",
        "عقوبات رادعة ومساءلة فورية لحالات القرصنة."
      ]
    },
    {
      id: 3,
      title: "3. أمان الحسابات والخصوصية",
      icon: Lock,
      badge: "سرية التام",
      gradient: "from-indigo-500/25 via-blue-500/10 to-transparent",
      borderColor: "group-hover:border-indigo-400/50",
      iconBg: "bg-indigo-500/15 text-indigo-500 border-indigo-500/30",
      description: "نحمي بياناتك الشخصية والأكاديمية بأعلى معايير التشفير والأمان مع اشتراط عدم مشاركة الحساب.",
      highlights: [
        "حظر تام لمشاركة بيانات الدخول مع أطراف ثالثة.",
        "تقييد أجهزة التشغيل لمنع الاستخدام المزدوج.",
        "مراقبة ذكية لأنشطة الحسابات المشبوهة."
      ]
    },
    {
      id: 4,
      title: "4. سياسة الاستخدام المقبول",
      icon: UserCheck,
      badge: "سلوك أكاديمي",
      gradient: "from-emerald-500/25 via-cyan-500/10 to-transparent",
      borderColor: "group-hover:border-emerald-400/50",
      iconBg: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
      description: "نلتزم بمجتمع تعليمي مثالي وخالٍ من الإساءات، يعتمد على الاحترام المتبادل والأخلاق الأكاديمية.",
      highlights: [
        "حظر التعليقات المسيئة أو السلوكيات التنمّرية.",
        "منع أي محاولات لاختراق الخوادم أو الأنظمة.",
        "بيئة تفاعلية آمنة ومراقبة باستمرار."
      ]
    },
    {
      id: 5,
      title: "5. الاشتراكات والمدفوعات",
      icon: BookOpenCheck,
      badge: "سياسة مالية",
      gradient: "from-amber-500/25 via-orange-500/10 to-transparent",
      borderColor: "group-hover:border-amber-400/50",
      iconBg: "bg-amber-500/15 text-amber-500 border-amber-500/30",
      description: "بوابات دفع إلكترونية مشفرة ومؤمنة بالكامل مع وضوح تام في أسعار الكورسات والملازم.",
      highlights: [
        "شفافية مطلقة في تسعير المحتوى التعليمي.",
        "بوابات دفع إلكترونية معتمدة وآمنة بنسبة 100%.",
        "سياسات استرداد عادلة ومحددة الشروط."
      ]
    },
    {
      id: 6,
      title: "6. حدود المسؤولية القانونية",
      icon: AlertCircle,
      badge: "إخلاء مسؤولية",
      gradient: "from-purple-500/25 via-pink-500/10 to-transparent",
      borderColor: "group-hover:border-purple-400/50",
      iconBg: "bg-purple-500/15 text-purple-500 border-purple-500/30",
      description: "نضمن أعلى نسبة تشغيل واستقرار للمنصة مع توضيح نطاق المسؤولية عن الظروف التقنية الخارجة.",
      highlights: [
        "ضمان استمرارية الخدمة بنسبة تشغيل عالية.",
        "إخلاء المسؤولية عن أعطال الإنترنت الشخصية.",
        "النجاح الأكاديمي مرهون بجهد ومثابرة الطالب."
      ]
    }
  ];

  return (
    <div 
      style={{
        backgroundColor: isDark ? '#020617' : '#f8fafc',
        color: isDark ? 'rgba(191, 219, 254, 0.8)' : '#334155'
      }}
      className="min-h-screen pt-28 pb-20 px-6 relative overflow-hidden transition-colors duration-300" 
      dir="rtl"
    >
      
      {/* خلفية جمالية مضيئة ومتطورة */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* رأس الصفحة الفاجر */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div 
            style={{
              backgroundColor: isDark ? 'rgba(6, 182, 212, 0.1)' : 'rgba(6, 182, 212, 0.08)',
              borderColor: isDark ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.3)'
            }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-cyan-500 text-xs font-bold mb-6 backdrop-blur-md shadow-lg shadow-cyan-500/10 border"
          >
            <Scale className="w-4 h-4 animate-pulse" />
            <span>التوثيق القانوني والاتفاقيات الرسمية</span>
          </div>
          <h1 
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
            className="text-4xl sm:text-6xl font-black tracking-tight mb-6 leading-tight"
          >
            شروط الاستخدام <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">والأحكام القانونية</span>
          </h1>
          <p 
            style={{ color: isDark ? 'rgba(219, 234, 254, 0.7)' : '#475569' }}
            className="text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium"
          >
            نحرص على بناء علاقة شفافة وموثوقة معك. إليك البنود المنظمة لاستخدامك المنصة والتي تضمن حقوقك الأكاديمية والتقنية بالكامل.
          </p>
        </div>

        {/* شبكة الكروت الاحترافية بتصميم متطور */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {termsCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div 
                key={card.id}
                style={{
                  backgroundColor: isDark ? 'rgba(15, 23, 42, 0.4)' : 'rgba(255, 255, 255, 0.9)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0'
                }}
                className={`group relative rounded-[36px] p-8 backdrop-blur-2xl flex flex-col justify-between shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2.5 hover:shadow-cyan-500/10 border ${card.borderColor}`}
              >
                {/* تدرج لوني خلفي ديناميكي داخل الكارت عند الهوفر */}
                <div className={`absolute inset-0 bg-gradient-to-b ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                
                {/* خط إضاءة علوي متوهج */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* رأس الكارت: الأيقونة والبادج المميز */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ${card.iconBg}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span 
                      style={{
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                        color: isDark ? '#67e8f9' : '#0284c7'
                      }}
                      className="text-[11px] font-black px-3.5 py-1.5 rounded-full border tracking-wide backdrop-blur-md"
                    >
                      {card.badge}
                    </span>
                  </div>

                  <h3 
                    style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                    className="text-xl font-black mb-3 group-hover:text-cyan-400 transition-colors tracking-tight"
                  >
                    {card.title}
                  </h3>

                  <p 
                    style={{ color: isDark ? 'rgba(219, 234, 254, 0.7)' : '#475569' }}
                    className="text-xs sm:text-sm leading-relaxed mb-8 font-medium"
                  >
                    {card.description}
                  </p>
                </div>

                {/* قسم المميزات بداخل الكارت */}
                <div 
                  style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0' }}
                  className="relative z-10 pt-6 border-t space-y-3"
                >
                  <div className="text-[11px] font-bold text-cyan-500 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <Zap className="w-3.5 h-3.5 text-cyan-500 animate-bounce" />
                    <span>أبرز النقاط والخصائص:</span>
                  </div>
                  {card.highlights.map((highlight, idx) => (
                    <div 
                      key={idx} 
                      style={{
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                        color: isDark ? 'rgba(239, 246, 255, 0.9)' : '#334155'
                      }}
                      className="flex items-start gap-2.5 text-xs font-medium border p-2.5 rounded-2xl group-hover:bg-white/[0.05] transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                      <span className="leading-tight">{highlight}</span>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

        {/* قسم الدعم القانوني والاستفسارات */}
        <div 
          style={{
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.95)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : '#cbd5e1'
          }}
          className="relative border rounded-[36px] p-8 sm:p-12 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-3 text-center md:text-right relative z-10">
            <div 
              style={{
                backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.08)',
                borderColor: isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.3)'
              }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-blue-500 text-xs font-bold border"
            >
              <Gavel className="w-4 h-4 text-cyan-500" />
              <span>هل تحتاج إلى استفسار قانوني إضافي؟</span>
            </div>
            <h3 
              style={{ color: isDark ? '#ffffff' : '#0f172a' }}
              className="text-2xl sm:text-3xl font-black tracking-tight"
            >
              فريقنا القانوني والدعم الفني في خدمتك دائماً
            </h3>
            <p 
              style={{ color: isDark ? 'rgba(219, 234, 254, 0.7)' : '#475569' }}
              className="text-xs sm:text-sm max-w-xl leading-relaxed"
            >
              إذا كانت لديك أي استفسارات تتعلق بتفسير هذه الشروط، أو واجهتك أي عقبة تقنية أو نظامية، يسعدنا تواصلك معنا لتقديم المساعدة الفورية.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0 relative z-10">
            <a 
              href="/contact" 
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_auto] text-white font-bold text-sm shadow-xl shadow-cyan-500/25 hover:scale-105 hover:bg-[position:right_center] transition-all duration-500 text-center flex items-center justify-center gap-2.5"
            >
              <Mail className="w-4 h-4" />
              <span>تواصل مع الدعم القانوني</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TermsAndConditions;