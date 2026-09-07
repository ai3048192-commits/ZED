import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUser,
  HiOutlineSparkles,
  HiAcademicCap,
  HiUserGroup,
  HiOutlineShieldCheck,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlinePhone,
  HiArrowRight,
} from "react-icons/hi";
import { supabase } from "../lib/supabaseClient";

export default function AuthPage({ isDark }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [stepForgot, setStepForgot] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [platformName, setPlatformName] = useState("منصة ZED");
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("site_name, logo_url")
          .order("id", { ascending: false })
          .limit(1);

        if (data && data.length > 0 && !error) {
          if (data[0].site_name) setPlatformName(data[0].site_name);
          if (data[0].logo_url) setLogoUrl(data[0].logo_url);
        }
      } catch (err) {
        console.error("خطأ في جلب إعدادات الهوية:", err);
      }
    }
    fetchSettings();
  }, []);

  const TEACHER_SECRET_CODE = "ZED_TEACHER_2026";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    otpCode: "",
    teacherCode: "",
    role: "student",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isForgotPassword) {
      if (stepForgot === 1) {
        const { error } = await supabase.auth.signInWithOtp({
          email: formData.email,
          options: { shouldCreateUser: false },
        });
        setLoading(false);
        if (error) {
          alert("خطأ في إرسال الكود: " + error.message);
          return;
        }
        alert(`تم إرسال كود التحقق إلى البريد: ${formData.email}`);
        setStepForgot(2);
      } else {
        if (formData.password !== formData.confirmPassword) {
          alert("كلمتا المرور غير متطابقتين!");
          setLoading(false);
          return;
        }
        const { error: verifyError } = await supabase.auth.verifyOtp({
          email: formData.email,
          token: formData.otpCode,
          type: "email",
        });
        if (verifyError) {
          alert("كود التحقق غير صحيح: " + verifyError.message);
          setLoading(false);
          return;
        }
        const { error: updateError } = await supabase.auth.updateUser({
          password: formData.password,
        });
        setLoading(false);
        if (updateError) {
          alert("فشل تحديث كلمة المرور: " + updateError.message);
          return;
        }
        alert("تم تغيير كلمة المرور بنجاح!");
        setIsForgotPassword(false);
        setStepForgot(1);
        setIsLogin(true);
        setFormData({
          ...formData,
          password: "",
          confirmPassword: "",
          otpCode: "",
        });
      }
    } else if (isLogin) {
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

      if (authError || !authData.user) {
        setLoading(false);
        alert("خطأ في تسجيل الدخول: تأكد من صحة البيانات.");
        return;
      }

      const userId = authData.user.id;

      // جلب بيانات البروفایل المرتبطة حصرياً بهذا المستخدم
      let { data: profileData } = await supabase
        .from("profiles")
        .select("role, full_name")
        .eq("id", userId)
        .maybeSingle();

      setLoading(false);

      // التوجيه للرابط المخصص حسب نوع الحساب الفعلي للمستخدم
      if (profileData?.role === "teacher") {
        window.location.href = `https://zed-academy-admin.vercel.app/?userId=${userId}`;
      } else {
        window.location.href = `https://student-admin-dashboard-nine.vercel.app/?userId=${userId}`;
      }
    } else {
      if (
        formData.role === "teacher" &&
        formData.teacherCode !== TEACHER_SECRET_CODE
      ) {
        alert("عذراً، كود تفعيل المدرس غير صحيح!");
        setLoading(false);
        return;
      }

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            phone: formData.phone,
            role: formData.role,
          },
        },
      });

      if (authError) {
        alert("خطأ في إنشاء الحساب: " + authError.message);
        setLoading(false);
        return;
      }
      if (!authData.user) {
        alert("فشل إنشاء المستخدم.");
        setLoading(false);
        return;
      }

      const userId = authData.user.id;

      // حفظ أو تحديث صف البيانات المرتبط بـ ID المستخدم حصراً
      const { error: profileError } = await supabase.from("profiles").upsert(
        [
          {
            id: userId,
            full_name: formData.name,
            role: formData.role,
            email: formData.email,
            phone: formData.phone,
            updated_at: new Date().toISOString(),
          },
        ],
        { onConflict: "id" },
      );

      setLoading(false);
      if (profileError) {
        alert("خطأ في حفظ البيانات: " + profileError.message);
        return;
      }

      // التوجيه للرابط المناسب حسب نوع الحساب الجديد
      if (formData.role === "teacher") {
        window.location.href = `http://zed-academy-admin.vercel.app//?userId=${userId}`;
      } else {
        window.location.href = `https://student-admin-dashboard-nine.vercel.app/?userId=${userId}`;
      }
    }
  };

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center p-4 lg:p-8 relative overflow-hidden transition-colors duration-700 ${isDark ? "bg-[#02040A] text-white" : "bg-[#F1F5F9] text-slate-900"}`}
      dir="rtl"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-indigo-600/20 to-blue-600/15 rounded-full blur-[160px] animate-pulse"></div>
        <div
          className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-violet-600/20 to-cyan-500/15 rounded-full blur-[160px] animate-pulse"
          style={{ animationDuration: "6s" }}
        ></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`max-w-4xl w-full backdrop-blur-3xl border rounded-[3rem] p-8 lg:p-12 relative z-10 shadow-[0_40px_140px_rgba(0,0,0,0.25)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-500 ${
          isDark
            ? "bg-slate-950/70 border-slate-800/80 shadow-indigo-950/40"
            : "bg-white/90 border-white shadow-slate-300/60"
        }`}
      >
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:border-l lg:border-slate-800/40 lg:pl-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl overflow-hidden bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                ) : platformName ? (
                  platformName.charAt(0)
                ) : (
                  "Z"
                )}
              </div>
              <div>
                <span
                  className={`text-sm font-black tracking-wider block ${isDark ? "text-white" : "text-slate-900"}`}
                >
                  {platformName}
                </span>
                <span className="text-xs text-blue-500 font-bold flex items-center gap-1">
                  تعلم . تطور . زد تفوقك
                </span>
              </div>
            </div>

            <h1
              className={`text-2xl lg:text-3xl font-black tracking-tight leading-snug ${isDark ? "text-white" : "text-slate-900"}`}
            >
              تجربة تعليمية استثنائية مصممة خصيصاً لتتفوق.
            </h1>
            <p
              className={`text-xs mt-3 leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              انتقل بمستواك الدراسي إلى أفق جديدة كلياً مع أدوات تفاعلية،
              اختبارات ذكية، ومتابعة لحظية لا تقبل الهزيمة.
            </p>
          </div>

          <div
            className={`p-4 rounded-2xl border ${isDark ? "bg-slate-900/50 border-slate-800/80" : "bg-slate-50 border-slate-200"}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-xs">
                99%
              </div>
              <div>
                <span
                  className={`block text-xs font-bold ${isDark ? "text-slate-200" : "text-slate-800"}`}
                >
                  نسبة نجاح الطلاب
                </span>
                <span className="text-[10px] text-slate-400">
                  تقييمات معتمدة من آلاف المشتركين
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2
                className={`text-xl lg:text-2xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}
              >
                {isForgotPassword
                  ? "استعادة كلمة المرور"
                  : isLogin
                    ? "تسجيل الدخول 👋"
                    : "حساب جديد 🚀"}
              </h2>
              <p
                className={`text-[11px] mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}
              >
                {isForgotPassword
                  ? "أدخل بريدك الإلكتروني أدناه"
                  : isLogin
                    ? "أدخل بيانات حسابك للمتابعة"
                    : "أدخل تفاصيلك للانضمام الفوري"}
              </p>
            </div>

            <div
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1.5 ${isDark ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-slate-100 border-slate-200 text-slate-600"}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              متاحة الآن
            </div>
          </div>

          {!isForgotPassword && (
            <div
              className={`grid grid-cols-2 p-1.5 rounded-2xl mb-6 border ${isDark ? "bg-slate-900/80 border-slate-800" : "bg-slate-100 border-slate-200"}`}
            >
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`py-2.5 text-xs font-bold rounded-xl transition-all duration-300 ${isLogin ? "bg-blue-600 text-white shadow-md shadow-blue-600/25" : isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}
              >
                تسجيل الدخول
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`py-2.5 text-xs font-bold rounded-xl transition-all duration-300 ${!isLogin ? "bg-blue-600 text-white shadow-md shadow-blue-600/25" : isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}
              >
                حساب جديد
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {!isForgotPassword && !isLogin && (
              <div>
                <label
                  className={`block text-[11px] font-bold mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}
                >
                  نوع الحساب
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, role: "student" })
                    }
                    className={`py-3 px-4 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${formData.role === "student" ? "border-blue-500 bg-blue-500/10 text-blue-500" : isDark ? "border-slate-800 text-slate-400 bg-slate-900/40" : "border-slate-200 text-slate-600 bg-slate-50"}`}
                  >
                    <HiAcademicCap className="w-4 h-4" /> طالب
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, role: "teacher" })
                    }
                    className={`py-3 px-4 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${formData.role === "teacher" ? "border-blue-500 bg-blue-500/10 text-blue-500" : isDark ? "border-slate-800 text-slate-400 bg-slate-900/40" : "border-slate-200 text-slate-600 bg-slate-50"}`}
                  >
                    <HiUserGroup className="w-4 h-4" /> مدرس
                  </button>
                </div>
              </div>
            )}

            {!isForgotPassword && !isLogin && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    className={`block text-[11px] font-bold mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}
                  >
                    الاسم الكامل
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                      <HiOutlineUser className="h-4 w-4" />
                    </span>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="اسمك الكامل"
                      className={`w-full pr-10 pl-3 py-3 border rounded-2xl text-xs font-semibold focus:outline-none focus:border-blue-500 transition-all ${isDark ? "bg-slate-900/50 border-slate-800 text-white placeholder-slate-600" : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"}`}
                    />
                  </div>
                </div>
                <div>
                  <label
                    className={`block text-[11px] font-bold mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}
                  >
                    رقم الهاتف
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                      <HiOutlinePhone className="h-4 w-4" />
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="01012345678"
                      className={`w-full pr-10 pl-3 py-3 border rounded-2xl text-xs font-semibold focus:outline-none focus:border-blue-500 transition-all ${isDark ? "bg-slate-900/50 border-slate-800 text-white placeholder-slate-600" : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"}`}
                    />
                  </div>
                </div>
              </div>
            )}

            {(!isForgotPassword || stepForgot === 1) && (
              <div>
                <label
                  className={`block text-[11px] font-bold mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}
                >
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                    <HiOutlineMail className="h-4 w-4" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className={`w-full pr-10 pl-3 py-3 border rounded-2xl text-xs font-semibold focus:outline-none focus:border-blue-500 transition-all ${isDark ? "bg-slate-900/50 border-slate-800 text-white placeholder-slate-600" : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"}`}
                  />
                </div>
              </div>
            )}

            {isForgotPassword && stepForgot === 2 && (
              <div>
                <label
                  className={`block text-[11px] font-bold mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}
                >
                  كود التحقق
                </label>
                <input
                  type="text"
                  name="otpCode"
                  required
                  value={formData.otpCode}
                  onChange={handleChange}
                  placeholder="••••••"
                  className={`w-full px-3 py-3 border rounded-2xl text-sm font-bold text-center tracking-[0.4em] focus:outline-none focus:border-blue-500 transition-all ${isDark ? "bg-slate-900/50 border-slate-800 text-white" : "bg-slate-50 border-slate-200 text-slate-900"}`}
                />
              </div>
            )}

            {(!isForgotPassword || stepForgot === 2) && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    className={`block text-[11px] font-bold ${isDark ? "text-slate-300" : "text-slate-700"}`}
                  >
                    كلمة المرور
                  </label>
                  {isLogin && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotPassword(true);
                        setStepForgot(1);
                      }}
                      className="text-[11px] font-bold text-blue-500 hover:text-blue-400"
                    >
                      نسيت كلمة المرور؟
                    </button>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                    <HiOutlineLockClosed className="h-4 w-4" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full pr-10 pl-10 py-3 border rounded-2xl text-xs font-semibold focus:outline-none focus:border-blue-500 transition-all ${isDark ? "bg-slate-900/50 border-slate-800 text-white placeholder-slate-600" : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 hover:text-blue-500"
                  >
                    {showPassword ? (
                      <HiOutlineEyeOff className="h-4 w-4" />
                    ) : (
                      <HiOutlineEye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {isForgotPassword && stepForgot === 2 && (
              <div>
                <label
                  className={`block text-[11px] font-bold mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}
                >
                  تأكيد كلمة المرور
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                    <HiOutlineLockClosed className="h-4 w-4" />
                  </span>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full pr-10 pl-3 py-3 border rounded-2xl text-xs font-semibold focus:outline-none focus:border-blue-500 transition-all ${isDark ? "bg-slate-900/50 border-slate-800 text-white placeholder-slate-600" : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"}`}
                  />
                </div>
              </div>
            )}

            {!isForgotPassword && !isLogin && formData.role === "teacher" && (
              <div className="bg-amber-500/10 p-3.5 rounded-2xl border border-amber-500/30">
                <label className="block text-[11px] font-bold text-amber-500 mb-1.5 flex items-center gap-1.5">
                  <HiOutlineShieldCheck className="w-4 h-4 text-amber-500" />{" "}
                  كود تفعيل حساب المعلم
                </label>
                <input
                  type="text"
                  name="teacherCode"
                  required
                  value={formData.teacherCode}
                  onChange={handleChange}
                  placeholder="أدخل كود المعلمين السري"
                  className={`w-full px-3 py-2.5 border rounded-xl text-xs font-semibold focus:outline-none ${isDark ? "bg-slate-900 border-amber-500/40 text-white" : "bg-white border-amber-500/40 text-slate-900"}`}
                />
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-black rounded-2xl shadow-xl shadow-blue-600/25 transition-all flex items-center justify-center gap-2 text-xs cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <HiOutlineSparkles className="h-4 w-4 text-cyan-200 animate-pulse" />
                  {isForgotPassword
                    ? stepForgot === 1
                      ? "إرسال كود التحقق"
                      : "تغيير كلمة المرور"
                    : isLogin
                      ? "تسجيل الدخول"
                      : "إنشاء الحساب"}
                </>
              )}
            </motion.button>

            {isForgotPassword && (
              <button
                type="button"
                onClick={() => {
                  setIsForgotPassword(false);
                  setStepForgot(1);
                }}
                className={`w-full mt-2 py-2 text-xs font-bold flex items-center justify-center gap-1.5 ${isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}
              >
                <HiArrowRight className="w-4 h-4" /> العودة لتسجيل الدخول
              </button>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
}
