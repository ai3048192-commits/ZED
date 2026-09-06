import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import {
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiClock,
  HiChatAlt2,
  HiCheckCircle,
  HiArrowRight,
  HiShieldCheck,
  HiUserGroup,
  HiSparkles,
  HiLightningBolt,
  HiAcademicCap,
  HiBookOpen,
} from "react-icons/hi";
import {
  FaWhatsapp,
} from "react-icons/fa";

interface ContactPageProps {
  isDark: boolean;
}

export default function ContactPage({ isDark }: ContactPageProps) {
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // حالة لتخزين بيانات التواصل المسترجعة من قاعدة البيانات
  const [siteSettings, setSiteSettings] = useState({
    email: "support@zed-academy.com",
    phone: "+20 100 123 4567",
    whatsapp: "",
    address: "شارع التسعين، التجمع الخامس، القاهرة، مصر",
    workHours: "الأحد - الخميس: 9 ص - 10 م"
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "استفسار عن الدورات البرمجية",
    message: "",
  });

  // جلب البيانات من جدول site_settings عند تحميل الصفحة
  useEffect(() => {
    async function fetchSiteSettings() {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("*")
          .order("id", { ascending: false })
          .limit(1);

        if (data && data.length > 0 && !error) {
          const item = data[0];
          setSiteSettings({
            email: item.email || "support@zed-academy.com",
            phone: item.phone || "+20 100 123 4567",
            whatsapp: item.whatsapp || item.phone || "",
            address: item.address || "شارع التسعين، التجمع الخامس، القاهرة، مصر",
            workHours: item.work_hours || "الأحد - الخميس: 9 ص - 10 م"
          });
        }
      } catch (err) {
        console.error("خطأ في جلب بيانات التواصل:", err);
      }
    }

    fetchSiteSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("contact_messages").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        },
      ]);

      if (error) throw error;

      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: "", email: "", phone: "", subject: "استفسار عن الدورات البرمجية", message: "" });
      }, 4000);
    } catch (err) {
      console.error("Error sending message:", err);
      alert("حدث خطأ أثناء إرسال الرسالة، يرجى المحاولة لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  const supportCategories = [
    { id: "courses", label: "استفسار عن الدورات", icon: HiBookOpen },
    { id: "tech", label: "الدعم الفني للمنصة", icon: HiLightningBolt },
    { id: "teachers", label: "انضمام كمعلم زاد", icon: HiAcademicCap },
  ];

  return (
    <div 
      style={{
        backgroundColor: isDark ? '#030712' : '#f8fafc',
        color: isDark ? '#f1f5f9' : '#0f172a'
      }}
      className="min-h-screen flex flex-col items-center overflow-x-hidden selection:bg-cyan-500 selection:text-black transition-colors duration-300" 
      dir="rtl"
    >
      
      {/* الخلفية الإشعاعية التفاعلية */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* قسم العنوان العلوي */}
      <section className="relative w-full pt-36 pb-16 px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <div 
            style={{
              backgroundColor: isDark ? 'rgba(6, 182, 212, 0.1)' : 'rgba(6, 182, 212, 0.08)',
              borderColor: isDark ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.25)',
              color: isDark ? '#22d3ee' : '#0891b2'
            }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full backdrop-blur-md text-xs font-semibold mb-6 shadow-inner border"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>فريق أكاديمية ZED التعليمية في خدمتك دائماً</span>
          </div>

          <h1 
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
            className="text-4xl sm:text-6xl font-black tracking-tight mb-6 leading-tight"
          >
            نحن هنا لنرشد خطوتك الأولى نحو{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600 bg-clip-text text-transparent">
              الاحتراف البرمجي
            </span>
          </h1>
          
          <p 
            style={{ color: isDark ? '#94a3b8' : '#475569' }}
            className="text-base sm:text-lg font-normal max-w-xl mx-auto leading-relaxed"
          >
            استفسر عن المسارات التعليمية، تواصل مع المرشدين الأكاديميين، أو احصل على دعم تقني فوري لمتابعة دروسك بلا توقف.
          </p>
        </motion.div>
      </section>

      {/* المحتوى الرئيسي */}
      <section className="relative w-full max-w-7xl mx-auto px-6 pb-32 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* نموذج التواصل (8 أعمدة) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.4)' : 'rgba(255, 255, 255, 0.8)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0'
            }}
            className="lg:col-span-8 backdrop-blur-2xl p-8 sm:p-10 rounded-[2.5rem] border shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/10 transition-all duration-700" />

            <div className="mb-8">
              <h3 
                style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                className="text-2xl font-bold mb-2 flex items-center gap-3"
              >
                <HiSparkles className="text-cyan-500 w-6 h-6" />
                راسل المرشد الأكاديمي مباشرة
              </h3>
              <p 
                style={{ color: isDark ? '#94a3b8' : '#64748b' }}
                className="text-sm"
              >
                اختر التصنيف المناسب لطلبك وسيقوم المستشار المختص بالرد عليك خلال دقائق.
              </p>
            </div>

            {/* تصنيفات الدعم التعليمي */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {supportCategories.map((cat) => {
                const IconComponent = cat.icon;
                const isSelected = formData.subject === cat.label;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, subject: cat.label })}
                    style={{
                      backgroundColor: isSelected 
                        ? (isDark ? 'rgba(6, 182, 212, 0.15)' : 'rgba(6, 182, 212, 0.1)') 
                        : (isDark ? 'rgba(255, 255, 255, 0.02)' : '#f8fafc'),
                      borderColor: isSelected 
                        ? 'rgba(6, 182, 212, 0.5)' 
                        : (isDark ? 'rgba(255, 255, 255, 0.05)' : '#e2e8f0'),
                      color: isSelected 
                        ? (isDark ? '#67e8f9' : '#0891b2') 
                        : (isDark ? '#94a3b8' : '#475569')
                    }}
                    className="flex items-center gap-3 p-3.5 rounded-2xl border text-xs font-semibold transition-all cursor-pointer"
                  >
                    <div className={`p-2 rounded-xl ${isSelected ? "bg-cyan-500/20 text-cyan-500" : (isDark ? "bg-white/5 text-slate-400" : "bg-slate-200 text-slate-600")}`}>
                      <IconComponent className="w-4 h-4 shrink-0" />
                    </div>
                    <span className="text-right">{cat.label}</span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-10 text-center my-6"
                >
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                    <HiCheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">تم إرسال استفسارك الأكاديمي بنجاح!</h4>
                  <p className="text-slate-300 text-sm max-w-sm mx-auto">
                    شكراً لانضمامك إلى عائلة ZED. تم توجيه رسالتك للمرشد المختص وسيتم التواصل معك قريباً.
                  </p>
                </motion.div>
              ) : (
                <motion.form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label 
                        style={{ color: isDark ? '#cbd5e1' : '#334155' }}
                        className="block text-xs font-semibold mb-2"
                      >
                        الاسم بالكامل
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="مثال: عمر خالد"
                        style={{
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#ffffff',
                          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1',
                          color: isDark ? '#ffffff' : '#0f172a'
                        }}
                        className="w-full border rounded-2xl px-4 py-3.5 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
                      />
                    </div>
                    <div>
                      <label 
                        style={{ color: isDark ? '#cbd5e1' : '#334155' }}
                        className="block text-xs font-semibold mb-2"
                      >
                        البريد الإلكتروني للأكاديمية
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="student@zed.edu"
                        style={{
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#ffffff',
                          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1',
                          color: isDark ? '#ffffff' : '#0f172a'
                        }}
                        className="w-full border rounded-2xl px-4 py-3.5 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label 
                      style={{ color: isDark ? '#cbd5e1' : '#334155' }}
                      className="block text-xs font-semibold mb-2"
                    >
                      رقم الهاتف / واتساب المتابعة (اختياري)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+20 109 876 5432"
                      style={{
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#ffffff',
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1',
                        color: isDark ? '#ffffff' : '#0f172a'
                      }}
                      className="w-full border rounded-2xl px-4 py-3.5 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
                    />
                  </div>

                  <div>
                    <label 
                      style={{ color: isDark ? '#cbd5e1' : '#334155' }}
                      className="block text-xs font-semibold mb-2"
                    >
                      تفاصيل الاستفسار أو المشكلة التعليمية
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="اكتب استفسارك حول الكورس، منصة الإمتحانات، أو واجهة البرمجة..."
                      style={{
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#ffffff',
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1',
                        color: isDark ? '#ffffff' : '#0f172a'
                      }}
                      className="w-full border rounded-2xl px-4 py-3.5 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-2xl shadow-[0_10px_25px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50"
                  >
                    <span>{loading ? "جاري الإرسال..." : "إرسال الاستفسار الأكاديمي"}</span>
                    <HiArrowRight className="w-4 h-4 rotate-180" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            <div 
              style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#e2e8f0' }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t text-xs"
            >
              <div className="flex items-center gap-2" style={{ color: isDark ? '#94a3b8' : '#475569' }}>
                <HiShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>حماية كاملة للبيانات وحسابات الطلاب</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: isDark ? '#94a3b8' : '#475569' }}>
                <HiUserGroup className="w-4 h-4 text-cyan-500 shrink-0" />
                <span>إشراف مباشر من كبار مهندسي البرمجيات</span>
              </div>
            </div>
          </motion.div>

          {/* قنوات التواصل المباشر */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 space-y-6"
          >
            <div 
              style={{
                backgroundColor: isDark ? 'rgba(15, 23, 42, 0.4)' : 'rgba(255, 255, 255, 0.8)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0'
              }}
              className="backdrop-blur-2xl p-8 rounded-[2.5rem] border shadow-xl space-y-6"
            >
              <div 
                style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#e2e8f0' }}
                className="border-b pb-4"
              >
                <h4 
                  style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                  className="text-lg font-bold mb-1"
                >
                  قنوات التواصل المباشر
                </h4>
                <p 
                  style={{ color: isDark ? '#94a3b8' : '#64748b' }}
                  className="text-xs"
                >
                  تواصل فوري مع طاقم الأكاديمية والمجتمعات التقنية
                </p>
              </div>

              {/* قناة الواتساب */}
              <a 
                href={`https://wa.me/${siteSettings.whatsapp || siteSettings.phone}`} 
                target="_blank" 
                rel="noreferrer"
                style={{
                  backgroundColor: isDark ? 'rgba(16, 185, 129, 0.05)' : '#f0fdf4',
                  borderColor: isDark ? 'rgba(16, 185, 129, 0.2)' : '#bbf7d0'
                }}
                className="flex items-center justify-between p-3.5 rounded-2xl border transition-all group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 bg-emerald-500/20 text-emerald-500 rounded-xl flex items-center justify-center shrink-0 border border-emerald-500/30 group-hover:scale-110 transition-transform">
                    <FaWhatsapp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium">خط الدعم والواتساب</div>
                    <div className="font-bold text-xs" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>{siteSettings.phone}</div>
                  </div>
                </div>
                <HiArrowRight className="w-4 h-4 text-emerald-500 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              {/* المقر الرئيسي */}
              <div 
                style={{
                  backgroundColor: isDark ? 'rgba(6, 182, 212, 0.05)' : '#f0fdfa',
                  borderColor: isDark ? 'rgba(6, 182, 212, 0.2)' : '#ccfbf1'
                }}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl border"
              >
                <div className="w-12 h-12 bg-amber-500/20 text-amber-500 rounded-2xl flex items-center justify-center shrink-0 border border-amber-500/30">
                  <HiLocationMarker className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">المقر الرئيسي</div>
                  <div className="font-bold text-sm" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>{siteSettings.address}</div>
                </div>
              </div>

              {/* البريد الأكاديمي */}
              <div 
                style={{
                  backgroundColor: isDark ? 'rgba(6, 182, 212, 0.05)' : '#f0fdfa',
                  borderColor: isDark ? 'rgba(6, 182, 212, 0.2)' : '#ccfbf1'
                }}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl border"
              >
                <div className="w-11 h-11 bg-cyan-500/20 text-cyan-500 rounded-xl flex items-center justify-center shrink-0 border border-cyan-500/30">
                  <HiMail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 font-medium">البريد الأكاديمي الرسمي</div>
                  <a href={`mailto:${siteSettings.email}`} className="font-bold text-xs hover:text-cyan-500 transition-colors" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                    {siteSettings.email}
                  </a>
                </div>
              </div>

              {/* أوقات العمل */}
              <div 
                style={{
                  backgroundColor: isDark ? 'rgba(168, 85, 247, 0.05)' : '#faf5ff',
                  borderColor: isDark ? 'rgba(168, 85, 247, 0.2)' : '#f3e8ff'
                }}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl border"
              >
                <div className="w-11 h-11 bg-purple-500/20 text-purple-500 rounded-xl flex items-center justify-center shrink-0 border border-purple-500/30">
                  <HiClock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 font-medium">ساعات التواجد الأكاديمي</div>
                  <div className="font-bold text-xs" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>{siteSettings.workHours}</div>
                </div>
              </div>

            </div>

        
          </motion.div>

        </div>
      </section>
    </div>
  );
}