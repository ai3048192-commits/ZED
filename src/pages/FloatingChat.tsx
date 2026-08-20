import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiPaperAirplane,
  HiArrowRight,
  HiUser,
  HiPhone,
  HiAcademicCap,
  HiTag,
  HiChatAlt2,
  HiShieldCheck,
  HiSparkles,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function ChatPage() {
  const navigate = useNavigate();

  // حالات تخزين البيانات الغنية قبل دخول الشات
  const [isRegistered, setIsRegistered] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    role: "طالب",
    specialty: "تطوير الويب وفول ستوك",
    inquiryType: "استفسار عن الكورسات والاشتراكات",
  });

  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isRegistered) {
      scrollToBottom();
    }
  }, [messages, isRegistered]);

  // عند إرسال البيانات المتقدمة وبدء الشات
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!userData.name.trim() || !userData.phone.trim()) return;

    setIsRegistered(true);

    // رسالة ترحيب مخصصة وغنية بناءً على بياناته
    setMessages([
      {
        id: 1,
        sender: "support",
        text: `أهلاً بك أ/ ${userData.name}! 👋 (بصففتك: ${userData.role} - في تخصص ${userData.specialty}). تم ربطك بنجاح مع فريق الدعم الفني المختص بـ "${userData.inquiryType}" في منصة ZED. كيف يمكننا خدمتك اليوم؟`,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  // إرسال رسالة داخل الشات
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "user",
      text: inputMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");

    // محاكاة رد ذكي من فريق الدعم
    setTimeout(() => {
      const replyMessage = {
        id: Date.now() + 1,
        sender: "support",
        text: "تم استلام تفاصيل رسالتك بنجاح. المشرف المسؤول عن قسمك يقوم بمراجعتها الآن وسيرد عليك فوراً.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, replyMessage]);
    }, 1200);
  };

  return (
    <div
      className="min-h-screen bg-[#070b19] text-white flex flex-col relative overflow-hidden"
      dir="rtl"
    >
      {/* خلفية جمالية مضيئة */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-[#002aff]/20 to-[#00bfff]/20 rounded-full blur-[150px] pointer-events-none" />

      {/* الهيدر العلوي */}
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between shadow-2xl z-20">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 transition-all cursor-pointer text-white flex items-center gap-2 text-xs font-bold border border-white/10"
          >
            <HiArrowRight className="w-4 h-4" />
            <span>العودة للموقع</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#002aff] to-[#00bfff] flex items-center justify-center font-black text-xl text-white shadow-[0_0_20px_rgba(0,42,255,0.4)]">
              Z
            </div>
            <div>
              <h2 className="font-extrabold text-sm sm:text-base">
                نظام المحادثات والدعم الفني - ZED
              </h2>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                جميع الخبراء والمشرفين متواجدون الآن
              </p>
            </div>
          </div>
        </div>

        {isRegistered && (
          <div className="hidden md:flex items-center gap-3 bg-white/[0.04] border border-white/10 px-4 py-2 rounded-2xl text-xs text-slate-300 backdrop-blur-md">
            <span className="flex items-center gap-1.5 font-bold text-white">
              <HiUser className="w-3.5 h-3.5 text-[#00bfff]" /> {userData.name}
            </span>
            <span className="text-slate-500">|</span>
            <span className="bg-[#002aff]/20 text-[#38bdf8] px-2 py-0.5 rounded-lg text-[10px] font-semibold">
              {userData.role}
            </span>
          </div>
        )}
      </header>

      {/* المحتوى الرئيسي */}
      {!isRegistered ? (
        /* شاشة إدخال البيانات المتقدمة بتصميم فخم */
        <div className="flex-1 flex items-center justify-center px-4 py-12 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-900/90 backdrop-blur-3xl border border-white/15 p-8 sm:p-10 rounded-[2.5rem] shadow-[0_25px_70px_rgba(0,0,0,0.9)] max-w-xl w-full relative overflow-hidden"
          >
            {/* تأثير إضاءة داخل الكارد */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#002aff]/30 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center mb-8 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-tr from-[#002aff]/20 to-[#00bfff]/30 text-[#00bfff] rounded-3xl flex items-center justify-center mx-auto mb-4 border border-[#00bfff]/30 shadow-inner">
                <HiSparkles className="w-8 h-8 animate-pulse" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">
                أهلاً بك في البوابة الذكية لـ ZED
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                فضلاً، أكمل بياناتك السريعة لكي نوجهك مباشرة للمختص المناسب
                فوراً.
              </p>
            </div>

            <form
              onSubmit={handleRegisterSubmit}
              className="space-y-4 relative z-10"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    الاسم الكامل *
                  </label>
                  <div className="relative">
                    <span className="absolute right-3.5 top-3.5 text-slate-500">
                      <HiUser className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      required
                      value={userData.name}
                      onChange={(e) =>
                        setUserData({ ...userData, name: e.target.value })
                      }
                      placeholder="مثال: محمد أحمد"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pr-10 pl-4 py-3 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#00bfff] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    رقم الهاتف (واتساب) *
                  </label>
                  <div className="relative">
                    <span className="absolute right-3.5 top-3.5 text-slate-500">
                      <HiPhone className="w-4 h-4" />
                    </span>
                    <input
                      type="tel"
                      required
                      value={userData.phone}
                      onChange={(e) =>
                        setUserData({ ...userData, phone: e.target.value })
                      }
                      placeholder="010xxxxxxxx"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pr-10 pl-4 py-3 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#00bfff] transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    أنت تسجل بصفتك:
                  </label>
                  <div className="relative">
                    <span className="absolute right-3.5 top-3.5 text-slate-500">
                      <HiAcademicCap className="w-4 h-4" />
                    </span>
                    <select
                      value={userData.role}
                      onChange={(e) =>
                        setUserData({ ...userData, role: e.target.value })
                      }
                      className="w-full bg-[#070b19] border border-white/10 rounded-2xl pr-10 pl-4 py-3 text-white text-xs focus:outline-none focus:border-[#00bfff] transition-all"
                    >
                      <option value="طالب">طالب (أتعلم وأبحث عن دورات)</option>
                      <option value="مدرس">مدرس / محاضر أكاديمي</option>
                      <option value="ولي أمر">ولي أمر متابع</option>
                      <option value="شريك أعمال">شريك أعمال أو مؤسسة</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    التخصص أو المجال:
                  </label>
                  <div className="relative">
                    <span className="absolute right-3.5 top-3.5 text-slate-500">
                      <HiTag className="w-4 h-4" />
                    </span>
                    <select
                      value={userData.specialty}
                      onChange={(e) =>
                        setUserData({ ...userData, specialty: e.target.value })
                      }
                      className="w-full bg-[#070b19] border border-white/10 rounded-2xl pr-10 pl-4 py-3 text-white text-xs focus:outline-none focus:border-[#00bfff] transition-all"
                    >
                      <option value="تطوير الويب وفول ستوك">
                        تطوير الويب (Full Stack)
                      </option>
                      <option value="الذكاء الاصطناعي وعلوم البيانات">
                        الذكاء الاصطناعي وعلوم البيانات
                      </option>
                      <option value="تطبيقات الجوال">
                        تطبيقات الجوال (Mobile Apps)
                      </option>
                      <option value="برمجة الأطفال والألعاب">
                        برمجة الأطفال والألعاب
                      </option>
                      <option value="دورات أكاديمية عامة">
                        دورات أكاديمية عامة
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  السبب الرئيسي للمحادثة:
                </label>
                <select
                  value={userData.inquiryType}
                  onChange={(e) =>
                    setUserData({ ...userData, inquiryType: e.target.value })
                  }
                  className="w-full bg-[#070b19] border border-white/10 rounded-2xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#00bfff] transition-all"
                >
                  <option value="استفسار عن الكورسات والاشتراكات">
                    استفسار عن الكورسات وأسعار الاشتراكات
                  </option>
                  <option value="مشكلة تقنية داخل المنصة">
                    مشكلة تقنية (فيديوهات لا تعمل، حساب مغلق)
                  </option>
                  <option value="طلب شهادة إتمام الدورة">
                    استفسار عن شهادات الإتمام الاعتمادية
                  </option>
                  <option value="الانضمام لهيئة التدريس">
                    رغبة في الانضمام كمدرس أو محاضر
                  </option>
                  <option value="مساعدة عامة">مساعدة عامة واقتراحات</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#002aff] to-[#00bfff] hover:opacity-90 text-white font-black rounded-2xl shadow-[0_15px_30px_rgba(0,42,255,0.4)] transition-all text-sm cursor-pointer mt-4 flex items-center justify-center gap-2"
              >
                <span>دخول غرفة المحادثة المباشرة</span>
                <HiArrowRight className="w-4 h-4 rotate-180" />
              </button>
            </form>

            <div className="flex items-center justify-center gap-2 mt-6 pt-6 border-t border-white/10 text-[11px] text-slate-400">
              <HiShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>بياناتك محمية بالكامل وتخضع لسياسة خصوصية منصة ZED</span>
            </div>
          </motion.div>
        </div>
      ) : (
        /* واجهة الشات الحقيقية والواسعة بعد التسجيل بتصميم فوق العادة */
        <div className="flex-1 flex flex-col max-w-5xl w-full mx-auto p-4 sm:p-6 overflow-hidden z-10">
          {/* صندوق الرسائل */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 pl-2 mb-4 scrollbar-thin scrollbar-thumb-slate-700">
            {messages.map((msg) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-start" : "items-end"}`}
              >
                <div
                  className={`p-4 rounded-2xl text-sm max-w-[85%] sm:max-w-[70%] leading-relaxed shadow-lg ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-[#002aff] to-blue-600 text-white rounded-tr-none"
                      : "bg-slate-900/90 text-slate-200 border border-white/10 rounded-tl-none backdrop-blur-md"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 px-1">
                  {msg.time}
                </span>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* شريط الكتابة العصري */}
          <form
            onSubmit={handleSendMessage}
            className="bg-slate-900/90 backdrop-blur-2xl border border-white/15 p-3 sm:p-4 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center gap-3 shrink-0"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="اكتب استفسارك بالتفصيل هنا..."
              className="flex-1 bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#00bfff] transition-all"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-gradient-to-r from-[#002aff] to-[#00bfff] hover:opacity-90 text-white font-extrabold rounded-2xl text-sm flex items-center gap-2 transition-all cursor-pointer shadow-[0_5px_20px_rgba(0,42,255,0.4)] shrink-0"
            >
              <span>إرسال</span>
              <HiPaperAirplane className="w-4 h-4 rotate-180" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
