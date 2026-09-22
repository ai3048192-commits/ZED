import { useCallback, useEffect, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { motion } from "framer-motion";
import {
  HiAcademicCap,
  HiArrowRight,
  HiCheckCircle,
  HiHome,
  HiKey,
  HiLockClosed,
  HiMail,
  HiMoon,
  HiOutlineBookOpen,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineInformationCircle,
  HiOutlineMail,
  HiPhone,
  HiShieldCheck,
  HiSparkles,
  HiSun,
  HiUser,
  HiUserGroup,
} from "react-icons/hi";
import { supabase } from "../lib/supabaseClient";

type Role = "student" | "teacher";
type Mode = "login" | "signup" | "forgot";
type NoticeType = "success" | "error" | "info";

interface FormState {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  otpCode: string;
  teacherCode: string;
  role: Role;
}

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  otpCode: "",
  teacherCode: "",
  role: "student",
};

const MIN_PASSWORD = 6;
const TEACHER_HOME = import.meta.env.VITE_TEACHER_HOME ?? "/teacher";
const STUDENT_HOME = import.meta.env.VITE_STUDENT_HOME ?? "/student";

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

const errorMessage = (err: unknown): string => {
  if (err instanceof Error) return err.message;
  if (err && typeof err === "object" && "message" in err) {
    return String((err as { message: unknown }).message);
  }
  return String(err);
};

const authErrorMessage = (err: unknown): string => {
  const code = err && typeof err === "object" && "code" in err ? String((err as { code: unknown }).code) : "";
  if (code === "invalid_credentials") return "البريد الإلكتروني أو كلمة المرور غير صحيحة.";
  if (code === "email_not_confirmed") return "لم يُفعَّل بريدك بعد. افتح رسالة التفعيل في بريدك أولاً.";
  if (code === "user_already_exists") return "هذا البريد مسجّل بالفعل. جرّب تسجيل الدخول.";
  if (code === "weak_password") return `كلمة المرور قصيرة. استخدم ${MIN_PASSWORD} أحرف على الأقل.`;
  if (code === "over_email_send_rate_limit") return "تم إرسال رسائل كثيرة. انتظر دقيقة وحاول مرة أخرى.";
  return errorMessage(err);
};

async function resolveRole(userId: string): Promise<Role> {
  const { data, error } = await supabase.from("profiles").select("role").eq("id", userId).maybeSingle();
  if (!error && data?.role) return data.role === "teacher" ? "teacher" : "student";

  const { data: authData } = await supabase.auth.getUser();
  return authData.user?.user_metadata?.role === "teacher" ? "teacher" : "student";
}

function goToDashboard(role: Role) {
  window.location.replace(role === "teacher" ? TEACHER_HOME : STUDENT_HOME);
}

export default function AuthPage({ isDark = false, onToggleTheme }: { isDark?: boolean; onToggleTheme?: () => void }) {
  const [mode, setMode] = useState<Mode>("login");
  const [stepForgot, setStepForgot] = useState<1 | 2>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<{ type: NoticeType; text: string } | null>(null);

  const [platformName, setPlatformName] = useState("منصة ZED");
  const [logoUrl, setLogoUrl] = useState("");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  const isLogin = mode === "login";
  const isSignup = mode === "signup";
  const isForgot = mode === "forgot";

  useEffect(() => {
    let active = true;
    supabase
      .from("site_settings")
      .select("site_name, logo_url")
      .order("id", { ascending: false })
      .limit(1)
      .then(({ data, error }) => {
        if (!active || error || !data?.length) return;
        if (data[0].site_name) setPlatformName(data[0].site_name);
        if (data[0].logo_url) setLogoUrl(data[0].logo_url);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(async ({ data }) => {
      if (!active || !data.session) return;
      goToDashboard(await resolveRole(data.session.user.id));
    });
    return () => {
      active = false;
    };
  }, []);

  const switchMode = useCallback((next: Mode) => {
    setMode(next);
    setStepForgot(1);
    setNotice(null);
    setForm((prev) => ({ ...prev, password: "", confirmPassword: "", otpCode: "" }));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email.trim(),
      password: form.password,
    });
    if (error || !data.user) {
      setNotice({ type: "error", text: "خطأ في تسجيل الدخول: " + authErrorMessage(error) });
      return;
    }
    goToDashboard(await resolveRole(data.user.id));
  };

  const handleSignup = async () => {
    if (form.password !== form.confirmPassword) {
      setNotice({ type: "error", text: "كلمتا المرور غير متطابقتين!" });
      return;
    }
    if (form.password.length < MIN_PASSWORD) {
      setNotice({ type: "error", text: `كلمة المرور يجب أن تكون ${MIN_PASSWORD} أحرف على الأقل.` });
      return;
    }
    if (form.role === "teacher" && !form.teacherCode.trim()) {
      setNotice({ type: "error", text: "الرجاء إدخال كود تفعيل حساب المعلم." });
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.password,
      options: {
        data: {
          full_name: form.name.trim(),
          phone: form.phone.trim(),
          role: form.role,
          teacher_code: form.role === "teacher" ? form.teacherCode.trim() : null,
        },
      },
    });

    if (error || !data.user) {
      setNotice({ type: "error", text: "خطأ في إنشاء الحساب: " + authErrorMessage(error) });
      return;
    }

    if (!data.session) {
      setNotice({
        type: "info",
        text: `تم إنشاء الحساب بنجاح. أرسلنا رسالة تفعيل إلى ${form.email.trim()}، يرجى فتحها ثم تسجيل الدخول.`,
      });
      switchMode("login");
      return;
    }

    const role = await resolveRole(data.user.id);
    if (form.role === "teacher" && role !== "teacher") {
      setNotice({
        type: "error",
        text: "كود تفعيل المعلم غير صحيح أو منتهي، وتم إنشاء الحساب كطالب. يرجى مراجعة الإدارة.",
      });
      return;
    }
    goToDashboard(role);
  };

  const handleForgot = async () => {
    if (stepForgot === 1) {
      const { error } = await supabase.auth.signInWithOtp({
        email: form.email.trim(),
        options: { shouldCreateUser: false },
      });
      if (error) {
        setNotice({ type: "error", text: "خطأ في إرسال الكود: " + authErrorMessage(error) });
        return;
      }
      setNotice({ type: "success", text: `تم إرسال كود التحقق إلى البريد: ${form.email.trim()}` });
      setStepForgot(2);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setNotice({ type: "error", text: "كلمتا المرور غير متطابقتين!" });
      return;
    }
    if (form.password.length < MIN_PASSWORD) {
      setNotice({ type: "error", text: `كلمة المرور يجب أن تكون ${MIN_PASSWORD} أحرف على الأقل.` });
      return;
    }

    const { error: verifyError } = await supabase.auth.verifyOtp({
      email: form.email.trim(),
      token: form.otpCode.trim(),
      type: "email",
    });
    if (verifyError) {
      setNotice({ type: "error", text: "كود التحقق غير صحيح: " + authErrorMessage(verifyError) });
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({ password: form.password });
    if (updateError) {
      setNotice({ type: "error", text: "فشل تحديث كلمة المرور: " + authErrorMessage(updateError) });
      return;
    }
    setNotice({ type: "success", text: "تم تغيير كلمة المرور بنجاح!" });
    switchMode("login");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setNotice(null);
    try {
      if (isForgot) await handleForgot();
      else if (isLogin) await handleLogin();
      else await handleSignup();
    } catch (err) {
      setNotice({ type: "error", text: "حدث خطأ غير متوقع: " + errorMessage(err) });
    } finally {
      setLoading(false);
    }
  };

  const labelClass = cx("mb-1.5 block text-xs font-bold tracking-wide", isDark ? "text-slate-300" : "text-slate-700");
  
  const inputClass = cx(
    "w-full rounded-2xl border py-3 sm:py-3.5 pr-12 pl-4 text-xs font-semibold transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 focus:outline-none shadow-sm",
    isDark
      ? "border-slate-800 bg-slate-900/90 text-white placeholder-slate-500 hover:border-slate-700"
      : "border-slate-200 bg-white text-slate-900 placeholder-slate-400 hover:border-slate-300"
  );

  const IconField = ({ icon, children }: { icon: ReactNode; children: ReactNode }) => (
    <div className="relative">
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-500 text-base">
        {icon}
      </span>
      {children}
    </div>
  );

  const submitLabel = isForgot
    ? stepForgot === 1
      ? "إرسال كود التحقق"
      : "تغيير كلمة المرور"
    : isLogin
      ? "تسجيل الدخول"
      : "إنشاء الحساب";

  return (
    <div
      className={cx(
        "relative min-h-screen w-full transition-colors duration-700 overflow-x-hidden",
        isDark ? "bg-[#050811] text-white" : "bg-[#F8FAFC] text-slate-900"
      )}
      dir="rtl"
    >
      {/* ------------------------- الهيدر الفاجر والثابت (Sticky Header) ------------------------- */}
      <header className="fixed top-4 inset-x-4 z-50 mx-auto max-w-6xl">
        <div className={cx(
          "flex items-center justify-between rounded-2xl border px-5 py-3 shadow-xl backdrop-blur-xl transition-all",
          isDark 
            ? "border-slate-800/80 bg-slate-950/80 text-white shadow-indigo-950/30" 
            : "border-slate-200/80 bg-white/90 text-slate-900 shadow-slate-200/50"
        )}>
          {/* الشعار واسم المنصة */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.href = "/"}>
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-lg font-black text-white shadow-md shadow-indigo-500/30">
              {logoUrl ? <img src={logoUrl} alt={platformName} className="h-full w-full object-cover" /> : platformName.charAt(0) || "Z"}
            </div>
            <div>
              <span className="block text-sm font-black tracking-wider">{platformName}</span>
              <span className="text-[10px] font-bold text-indigo-500">منصة التميز الأكاديمي</span>
            </div>
          </div>

          {/* روابط التنقل السريعة (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold">
            <a href="/" className="flex items-center gap-1.5 hover:text-indigo-500 transition-colors">
              <HiHome className="text-base" /> الرئيسية
            </a>
            <a href="/courses" className="flex items-center gap-1.5 hover:text-indigo-500 transition-colors">
              <HiOutlineBookOpen className="text-base" /> الكورسات
            </a>
            <a href="/about" className="flex items-center gap-1.5 hover:text-indigo-500 transition-colors">
              <HiOutlineInformationCircle className="text-base" /> عن المنصة
            </a>
            <a href="/contact" className="flex items-center gap-1.5 hover:text-indigo-500 transition-colors">
              <HiOutlineMail className="text-base" /> تواصل معنا
            </a>
          </nav>

          {/* أزرار التحكم والهيدر (ثيم وتغيير الوضع) */}
          <div className="flex items-center gap-2.5">
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label="تبديل الثيم"
                className={cx(
                  "flex h-9 w-9 items-center justify-center rounded-xl border transition-colors",
                  isDark ? "border-slate-800 bg-slate-900 text-amber-400 hover:bg-slate-800" : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
                )}
              >
                {isDark ? <HiSun className="text-base" /> : <HiMoon className="text-base" />}
              </button>
            )}

            <button
              type="button"
              onClick={() => switchMode(isLogin ? "signup" : "login")}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-xs font-black text-white shadow-lg shadow-indigo-600/25 transition-all hover:scale-105"
            >
              <HiSparkles className="text-sm text-cyan-200" />
              {isLogin ? "حساب جديد" : "تسجيل الدخول"}
            </button>
          </div>
        </div>
      </header>

      {/* خلفية ديناميكية متطورة */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -right-40 h-[400px] w-[400px] sm:h-[500px] sm:w-[500px] rounded-full bg-gradient-to-br from-indigo-600/15 to-blue-600/10 blur-[140px]" />
        <div className="absolute top-1/2 -left-40 h-[400px] w-[400px] sm:h-[500px] sm:w-[500px] rounded-full bg-gradient-to-tr from-violet-600/15 to-pink-600/10 blur-[140px]" />
      </div>

      {/* ------------------------- المحتوى الرئيسي (تحت الهيدر بمسافة آمنة ومدروسة) ------------------------- */}
      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 pt-28 pb-12 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cx(
            "grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border shadow-2xl backdrop-blur-2xl lg:grid-cols-12",
            isDark
              ? "border-slate-800/80 bg-slate-950/85 shadow-indigo-950/20"
              : "border-slate-200/80 bg-white/95 shadow-slate-200/60"
          )}
        >
          {/* ------------------------- الجانب الأيمن: نموذج الدخول (Form) ------------------------- */}
          <div className="flex flex-col justify-center p-5 sm:p-8 lg:col-span-7 lg:p-12">
            <div className="mb-5 sm:mb-6">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-[11px] font-bold text-indigo-500 mb-2.5">
                <HiSparkles className="h-3.5 w-3.5" /> بوابة الأمان والاعتماد
              </div>
              <h2 className={cx("text-xl sm:text-2xl font-black tracking-tight", isDark ? "text-white" : "text-slate-900")}>
                {isForgot ? "استعادة كلمة المرور" : isLogin ? "مرحباً بك مجدداً!" : "إنشاء حساب جديد"}
              </h2>
              <p className={cx("mt-1 text-xs font-medium", isDark ? "text-slate-400" : "text-slate-500")}>
                {isForgot ? "أدخل بريدك لاستلام كود التحقق السريع" : isLogin ? "أدخل بياناتك للانتقال إلى لوحة التحكم" : "سجل الآن وابدأ رحلة التفوق الدراسي"}
              </p>
            </div>

            {!isForgot && (
              <div className={cx("mb-5 sm:mb-6 grid grid-cols-2 rounded-2xl border p-1 shadow-inner", isDark ? "border-slate-800 bg-slate-900/50" : "border-slate-200 bg-slate-100")}>
                {(
                  [
                    ["login", "تسجيل الدخول"],
                    ["signup", "حساب جديد"],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => switchMode(value)}
                    className={cx(
                      "rounded-xl py-2.5 text-xs font-bold transition-all duration-300",
                      mode === value
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-[1.02]"
                        : isDark
                          ? "text-slate-400 hover:text-white"
                          : "text-slate-600 hover:text-slate-900"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}

            {notice && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                role={notice.type === "error" ? "alert" : "status"}
                className={cx(
                  "mb-4 sm:mb-5 rounded-2xl border px-4 py-3 text-xs font-bold leading-relaxed shadow-sm",
                  notice.type === "success"
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
                    : notice.type === "info"
                      ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-500"
                      : "border-rose-500/30 bg-rose-500/10 text-rose-500"
                )}
              >
                {notice.text}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              {isSignup && (
                <>
                  <div>
                    <span className={labelClass}>حدد نوع الحساب</span>
                    <div role="radiogroup" aria-label="نوع الحساب" className="grid grid-cols-2 gap-2.5 sm:gap-3">
                      {(
                        [
                          ["student", "طالب", HiAcademicCap],
                          ["teacher", "معلم", HiUserGroup],
                        ] as const
                      ).map(([value, label, Icon]) => (
                        <button
                          key={value}
                          type="button"
                          role="radio"
                          aria-checked={form.role === value}
                          onClick={() => setForm((prev) => ({ ...prev, role: value }))}
                          className={cx(
                            "flex items-center justify-center gap-2 rounded-2xl border px-3 sm:px-4 py-3 sm:py-3.5 text-xs font-bold transition-all duration-300",
                            form.role === value
                              ? "border-indigo-500 bg-indigo-500/10 text-indigo-500 shadow-sm shadow-indigo-500/10"
                              : isDark
                                ? "border-slate-800 bg-slate-900/40 text-slate-400 hover:bg-slate-900"
                                : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                          )}
                        >
                          <Icon className="text-base" /> {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="auth-name" className={labelClass}>الاسم الكامل</label>
                      <IconField icon={<HiUser />}>
                        <input
                          id="auth-name"
                          type="text"
                          name="name"
                          required
                          autoComplete="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="اسمك الكريم"
                          className={inputClass}
                        />
                      </IconField>
                    </div>
                    <div>
                      <label htmlFor="auth-phone" className={labelClass}>رقم الهاتف</label>
                      <IconField icon={<HiPhone />}>
                        <input
                          id="auth-phone"
                          type="tel"
                          name="phone"
                          required
                          dir="ltr"
                          inputMode="tel"
                          autoComplete="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="01012345678"
                          className={cx(inputClass, "text-right")}
                        />
                      </IconField>
                    </div>
                  </div>
                </>
              )}

              {(!isForgot || stepForgot === 1) && (
                <div>
                  <label htmlFor="auth-email" className={labelClass}>البريد الإلكتروني</label>
                  <IconField icon={<HiMail />}>
                    <input
                      id="auth-email"
                      type="email"
                      name="email"
                      required
                      dir="ltr"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className={cx(inputClass, "text-right")}
                    />
                  </IconField>
                </div>
              )}

              {isForgot && stepForgot === 2 && (
                <div>
                  <label htmlFor="auth-otp" className={labelClass}>كود التحقق المرسل</label>
                  <IconField icon={<HiKey />}>
                    <input
                      id="auth-otp"
                      type="text"
                      name="otpCode"
                      required
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      value={form.otpCode}
                      onChange={handleChange}
                      placeholder="••••••"
                      className={cx(
                        "w-full rounded-2xl border py-3 sm:py-3.5 pr-12 pl-4 text-center text-sm font-bold tracking-[0.4em] transition-all focus:border-indigo-500 focus:outline-none shadow-sm",
                        isDark ? "border-slate-800 bg-slate-900/90 text-white" : "border-slate-200 bg-white text-slate-900"
                      )}
                    />
                  </IconField>
                </div>
              )}

              {(!isForgot || stepForgot === 2) && (
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label htmlFor="auth-password" className={labelClass}>كلمة المرور</label>
                    {isLogin && (
                      <button
                        type="button"
                        onClick={() => switchMode("forgot")}
                        className="text-xs font-bold text-indigo-500 hover:text-indigo-400 transition-colors"
                      >
                        نسيت كلمة المرور؟
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-500 text-base">
                      <HiLockClosed />
                    </span>
                    <input
                      id="auth-password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      minLength={isLogin ? undefined : MIN_PASSWORD}
                      autoComplete={isLogin ? "current-password" : "new-password"}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={cx(inputClass, "pl-12")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                      className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 hover:text-indigo-500 transition-colors"
                    >
                      {showPassword ? <HiOutlineEyeOff className="text-base" /> : <HiOutlineEye className="text-base" />}
                    </button>
                  </div>
                  {!isLogin && (
                    <p className={cx("mt-1.5 text-[11px] font-medium", isDark ? "text-slate-500" : "text-slate-400")}>
                      الحد الأدنى {MIN_PASSWORD} أحرف.
                    </p>
                  )}
                </div>
              )}

              {(isSignup || (isForgot && stepForgot === 2)) && (
                <div>
                  <label htmlFor="auth-confirm" className={labelClass}>تأكيد كلمة المرور</label>
                  <IconField icon={<HiLockClosed />}>
                    <input
                      id="auth-confirm"
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      required
                      autoComplete="new-password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={inputClass}
                    />
                  </IconField>
                </div>
              )}

              {isSignup && form.role === "teacher" && (
                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5 sm:p-4">
                  <label htmlFor="auth-code" className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-amber-500">
                    <HiShieldCheck className="text-base" /> كود تفعيل حساب المعلم
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-amber-500 text-base">
                      <HiShieldCheck />
                    </span>
                    <input
                      id="auth-code"
                      type="text"
                      name="teacherCode"
                      required
                      value={form.teacherCode}
                      onChange={handleChange}
                      placeholder="أدخل كود المعلمين السري"
                      className={cx(
                        "w-full rounded-xl border py-2.5 sm:py-3 pl-3 pr-11 text-xs font-bold focus:outline-none shadow-sm",
                        isDark ? "border-amber-500/40 bg-slate-900 text-white" : "border-amber-500/40 bg-white text-slate-900"
                      )}
                    />
                  </div>
                </div>
              )}

              {/* زر الإرسال مع أيقونة مناسبة للحدث */}
              <motion.button
                whileHover={{ scale: loading ? 1 : 1.01 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                type="submit"
                disabled={loading}
                className="mt-4 sm:mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 py-3.5 sm:py-4 text-xs font-black tracking-wide text-white shadow-xl shadow-indigo-600/30 transition-all hover:from-indigo-500 hover:to-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <HiCheckCircle className="text-base text-cyan-200" />
                    {submitLabel}
                  </>
                )}
              </motion.button>

              {isForgot && (
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className={cx(
                    "mt-3 flex w-full items-center justify-center gap-1.5 py-2 text-xs font-bold transition-colors",
                    isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  <HiArrowRight className="text-base" /> العودة لتسجيل الدخول
                </button>
              )}
            </form>
          </div>

          {/* ------------------------- الجانب الأيسر: اللوحة التعريفية البصرية (Branding Panel) ------------------------- */}
          <div className={cx(
            "relative flex flex-col justify-between overflow-hidden p-5 sm:p-8 lg:col-span-5 lg:p-12",
            isDark ? "bg-slate-900/60 border-t lg:border-t-0 lg:border-r border-slate-800" : "bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-950 text-white border-t lg:border-t-0"
          )}>
            {/* تأثيرات خلفية بصرية داخل اللوحة */}
            <div aria-hidden className="absolute -bottom-20 -left-20 h-40 w-40 sm:h-60 sm:w-60 rounded-full bg-indigo-500/20 blur-3xl" />
            
            <div className="relative z-10">
              <div className="mb-6 sm:mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-500 text-xl sm:text-2xl font-black text-white shadow-xl shadow-indigo-500/30">
                  {logoUrl ? (
                    <img src={logoUrl} alt={platformName} className="h-full w-full object-cover" />
                  ) : (
                    platformName.charAt(0) || "Z"
                  )}
                </div>
                <div>
                  <span className="block text-sm sm:text-base font-black tracking-wider text-white">
                    {platformName}
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold text-indigo-400">منصتك الأولى للتميز الأكاديمي</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black leading-snug tracking-tight text-white">
                ابدأ رحلة تفوقك التعليمي بأدوات ذكية ومبتكرة 🚀
              </h1>
              <p className="mt-3 sm:mt-4 text-xs font-medium leading-relaxed text-slate-300">
                انضم إلى آلاف الطلاب والمعلمين الذين يستمتعون بتجربة تعليمية سلسة، اختبارات تفاعلية، وتقارير أداء متقدمة لحظة بلحظة.
              </p>
            </div>

            <div className="relative z-10 mt-6 sm:mt-8">
              <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-emerald-500/20 text-xs font-black text-emerald-400">
                    99%
                  </div>
                  <div>
                    <span className="block text-xs font-black text-white">
                      معدل رضا المتميزين
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-medium text-slate-300">معايير تعليمية متطورة تلبي طموحاتك</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
