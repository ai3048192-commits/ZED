import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // 1. استيراد أداة التنقل
import {
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiClock,
  HiSupport,
  HiChatAlt2,
  HiCheckCircle,
  HiArrowRight,
  HiShieldCheck,
  HiUserGroup,
} from "react-icons/hi";
import {
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

export default function ContactPage() {
  const navigate = useNavigate(); // 2. تفعيل دالة التنقل
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "استفسار عام",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", subject: "استفسار عام", message: "" });
    }, 4000);
  };

  return (
    <div
      className="min-h-screen bg-[#070b19] text-white flex flex-col items-center overflow-x-hidden selection:bg-[#002aff] selection:text-white"
      dir="rtl"
    >
      <section className="relative w-full pt-32 pb-20 overflow-hidden flex flex-col items-center text-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d15_1px,transparent_1px),linear-gradient(to_bottom,#1f293d15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-[#002aff]/30 to-[#00bfff]/30 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-xl text-[#38bdf8] font-semibold text-xs md:text-sm mb-6 shadow-xl">
              <HiSupport className="w-4 h-4 text-[#00bfff]" />
              <span>نحن هنا لدعمك على مدار الساعة - منصة ZED التعليمية</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6">
              تواصل مع فريق{" "}
              <span className="bg-gradient-to-r from-[#00bfff] via-[#38bdf8] to-[#002aff] bg-clip-text text-transparent">
                ZED
              </span>
            </h1>
            <p className="text-slate-400 text-base sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              سواء كان لديك استفسار حول الدورات البرمجية والأكاديمية، تواجه
              مشكلة تقنية، أو ترغب بالشراكة معنا، فريقنا مستعد للإجابة عليك
              فوراً.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative w-full max-w-7xl mx-auto px-6 pb-28 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-8 bg-slate-900/60 backdrop-blur-2xl p-8 sm:p-12 rounded-3xl border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative"
          >
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              أرسل لنا رسالة مباشرة
            </h3>
            <p className="text-slate-400 text-sm sm:text-base mb-8">
              املأ النموذج أدناه وسيقوم فريق الدعم الفني بالرد عليك خلال أقل من
              ساعتين.
            </p>

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center my-10"
              >
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/40">
                  <HiCheckCircle className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">
                  تم إرسال رسالتك بنجاح!
                </h4>
                <p className="text-slate-300 text-sm">
                  شكراً لتواصلك معنا. لقد تلقينا رسالتك وسنرد عليك عبر البريد
                  الإلكتروني قريباً.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      الاسم الكامل
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="مثال: أحمد محمد"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#00bfff] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="name@example.com"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#00bfff] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">
                    نوع الاستفسار
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full bg-[#070b19] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#00bfff] transition-all"
                  >
                    <option value="استفسار عام">استفسار عام عن المنصة</option>
                    <option value="دعم فني">مشكلة تقنية / دعم فني</option>
                    <option value="اشتراكات ودفع">
                      الاشتراكات وباقات الدفع
                    </option>
                    <option value="انضمام كمدرس">
                      الرغبة في الانضمام لهيئة التدريس
                    </option>
                    <option value="شراكة أعمال">شراكات أعمال ومؤسسات</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">
                    نص الرسالة
                  </label>
                  <textarea
                    rows="5"
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="اكتب تفاصيل استفسارك هنا..."
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#00bfff] transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#002aff] hover:bg-blue-600 text-white font-extrabold rounded-xl shadow-[0_15px_30px_rgba(0,42,255,0.4)] transition-all flex items-center justify-center gap-3 text-base cursor-pointer hover:-translate-y-0.5"
                >
                  <span>إرسال الرسالة الآن</span>
                  <HiArrowRight className="w-5 h-5 rotate-180" />
                </button>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10 text-slate-400 text-xs">
              <div className="flex items-center gap-2">
                <HiShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>حماية كاملة للبيانات والخصوصية حسب معايير ZED</span>
              </div>
              <div className="flex items-center gap-2">
                <HiUserGroup className="w-5 h-5 text-sky-400 shrink-0" />
                <span>أكثر من 15,000 طالب ومستفيد يتم دعمهم شهرياً</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="bg-slate-900/60 backdrop-blur-2xl p-8 rounded-3xl border border-white/10 shadow-xl space-y-6">
              <h4 className="text-xl font-extrabold text-white">
                معلومات الاتصال
              </h4>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#002aff]/20 text-[#00bfff] rounded-2xl flex items-center justify-center shrink-0 border border-[#002aff]/30">
                  <HiMail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">
                    البريد الإلكتروني الرسمي
                  </div>
                  <a
                    href="mailto:support@zed-platform.com"
                    className="text-white font-bold text-sm hover:text-[#00bfff] transition-colors"
                  >
                    support@zed-platform.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <HiPhone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">
                    خط الدعم السريع (واتساب)
                  </div>
                  <a
                    href="https://wa.me/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white font-bold text-sm hover:text-emerald-400 transition-colors"
                  >
                    +20 100 123 4567
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center shrink-0 border border-amber-500/30">
                  <HiLocationMarker className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">
                    المقر الرئيسي
                  </div>
                  <div className="text-white font-bold text-sm">
                    شارع التسعين، التجمع الخامس، القاهرة، مصر
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center shrink-0 border border-purple-500/30">
                  <HiClock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">
                    ساعات العمل الرسمية
                  </div>
                  <div className="text-white font-bold text-sm">
                    الأحد - الخميس: 9:00 ص - 8:00 م
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-2xl p-8 rounded-3xl border border-white/10 shadow-xl">
              <h4 className="text-lg font-extrabold text-white mb-4">
                تابعنا على المنصات
              </h4>
              <p className="text-xs text-slate-400 mb-6">
                ابق على اطلاع بأحدث الدورات والمقالات التعليمية والمستجدات.
              </p>

              <div className="flex items-center gap-3">
                <a
                  href="#twitter"
                  className="w-11 h-11 bg-white/[0.05] hover:bg-[#00bfff]/20 text-white hover:text-[#00bfff] border border-white/10 rounded-xl flex items-center justify-center transition-all"
                >
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a
                  href="#linkedin"
                  className="w-11 h-11 bg-white/[0.05] hover:bg-[#002aff]/20 text-white hover:text-blue-400 border border-white/10 rounded-xl flex items-center justify-center transition-all"
                >
                  <FaLinkedinIn className="w-5 h-5" />
                </a>
                <a
                  href="#youtube"
                  className="w-11 h-11 bg-white/[0.05] hover:bg-red-500/20 text-white hover:text-red-400 border border-white/10 rounded-xl flex items-center justify-center transition-all"
                >
                  <FaYoutube className="w-5 h-5" />
                </a>
                <a
                  href="#instagram"
                  className="w-11 h-11 bg-white/[0.05] hover:bg-pink-500/20 text-white hover:text-pink-400 border border-white/10 rounded-xl flex items-center justify-center transition-all"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a
                  href="#whatsapp"
                  className="w-11 h-11 bg-white/[0.05] hover:bg-emerald-500/20 text-white hover:text-emerald-400 border border-white/10 rounded-xl flex items-center justify-center transition-all"
                >
                  <FaWhatsapp className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* 3. زر الانتقال المباشر لصفحة الشات (/chat) */}
            <div className="bg-gradient-to-br from-[#002aff]/20 to-[#00bfff]/20 backdrop-blur-2xl p-6 rounded-3xl border border-[#00bfff]/30 shadow-xl text-center">
              <HiChatAlt2 className="w-10 h-10 text-[#00bfff] mx-auto mb-3 animate-pulse" />
              <h5 className="font-bold text-white text-base mb-1">
                هل تحتاج مساعدة عاجلة؟
              </h5>
              <p className="text-xs text-slate-300 mb-4">
                يتوفر خبير دعم فني للدردشة المباشرة مع الطلاب والمدرسين الآن.
              </p>
              <button
                onClick={() => navigate("/chat")}
                className="w-full py-3 bg-white text-[#070b19] font-bold rounded-xl text-xs hover:bg-slate-200 transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>ابدأ المحادثة الفورية</span>
                <HiArrowRight className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
