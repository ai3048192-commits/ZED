import { useCallback, useEffect, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { motion } from "framer-motion";
import {
  HiAcademicCap,
  HiArrowRight,
  HiKey,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineLockClosed,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineUser,
  HiUserGroup,
} from "react-icons/hi";
import { supabase } from "../lib/supabaseClient";

/* ================================================================== */
/*  Types & constants                                                 */
/* ================================================================== */

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

// أقل طول لكلمة المرور. 6 هو الحد الأدنى اللي Supabase بيقبله افتراضياً،
// فمفيش أي شروط تانية (حروف كبيرة، أرقام، رموز) عشان التسجيل يبقى سهل.
const MIN_PASSWORD = 6;

const TEACHER_HOME = import.meta.env.VITE_TEACHER_HOME ?? "/teacher";
const STUDENT_HOME = import.meta.env.VITE_STUDENT_HOME ?? "/student";

/* ================================================================== */
/*  Helpers                                                           */
/* ================================================================== */

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

/* ================================================================== */
/*  Page                                                              */
/* ================================================================== */

export default function AuthPage({ isDark = false }: { isDark?: boolean }) {
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
      setNotice({ type: "error", text: `كلمة المرور لازم تكون ${MIN_PASSWORD} أحرف على الأقل.` });
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
        text: `تم إنشاء الحساب. أرسلنا رسالة تفعيل إلى ${form.email.trim()}، افتحها ثم سجّل الدخول.`,
      });
      switchMode("login");
      return;
    }

    const role = await resolveRole(data.user.id);
    if (form.role === "teacher" && role !== "teacher") {
      setNotice({
        type: "error",
        text: "كود تفعيل المعلم غير صحيح أو منتهي، وتم إنشاء الحساب كطالب. راجع الإدارة لترقية حسابك.",
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
      setNotice({ type: "error", text: `كلمة المرور لازم تكون ${MIN_PASSWORD} أحرف على الأقل.` });
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

  const labelClass = cx("mb-1.5 block text-[11px] font-bold", isDark ? "text-slate-300" : "text-slate-700");
  const inputClass = cx(
    "w-full rounded-2xl border py-3 pl-3 pr-10 text-xs font-semibold transition-all focus:border-blue-500 focus:outline-none",
    isDark
      ? "border-slate-800 bg-slate-900/50 text-white placeholder-slate-600"
      : "border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400"
  );

  const IconField = ({ icon, children }: { icon: ReactNode; children: ReactNode }) => (
    <div className="relative">
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
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
        "relative flex min-h-screen w-full items-start justify-center overflow-hidden px-4 pt-16 pb-12 transition-colors duration-700 lg:pt-24 lg:pb-16",
        isDark ? "bg-[#02040A] text-white" : "bg-[#F1F5F9] text-slate-900"
      )}
      dir="rtl"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 top-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-indigo-600/20 to-blue-600/15 blur-[160px]" />
        <div className="absolute -left-20 bottom-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-violet-600/20 to-cyan-500/15 blur-[160px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cx(
          "relative z-10 grid w-full max-w-4xl grid-cols-1 items-center gap-8 rounded-[3rem] border p-8 shadow-[0_40px_140px_rgba(0,0,0,0.25)] backdrop-blur-3xl transition-all duration-500 lg:grid-cols-12 lg:p-12",
          isDark
            ? "border-slate-800/80 bg-slate-950/70 shadow-indigo-950/40"
            : "border-white bg-white/90 shadow-slate-300/60"
        )}
      >
        {/* ------------------------- العمود التعريفي ------------------------- */}
        <div className="flex flex-col justify-between space-y-6 lg:col-span-5 lg:border-l lg:border-slate-800/40 lg:pl-8">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 text-2xl font-black text-white shadow-xl">
                {logoUrl ? (
                  <img src={logoUrl} alt={platformName} className="h-full w-full object-cover" />
                ) : (
                  platformName.charAt(0) || "Z"
                )}
              </div>
              <div>
                <span
                  className={cx("block text-sm font-black tracking-wider", isDark ? "text-white" : "text-slate-900")}
                >
                  {platformName}
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-blue-500">تعلم . تطور . زد تفوقك</span>
              </div>
            </div>

            <h1
              className={cx(
                "text-2xl font-black leading-snug tracking-tight lg:text-3xl",
                isDark ? "text-white" : "text-slate-900"
              )}
            >
              تجربة تعليمية استثنائية مصممة خصيصاً لتتفوق.
            </h1>
            <p className={cx("mt-3 text-xs leading-relaxed", isDark ? "text-slate-400" : "text-slate-500")}>
              انتقل بمستواك الدراسي إلى أفق جديدة كلياً مع أدوات تفاعلية، اختبارات ذكية، ومتابعة لحظية لا تقبل الهزيمة.
            </p>
          </div>

          <div
            className={cx(
              "rounded-2xl border p-4",
              isDark ? "border-slate-800/80 bg-slate-900/50" : "border-slate-200 bg-slate-50"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-xs font-bold text-emerald-500">
                99%
              </div>
              <div>
                <span className={cx("block text-xs font-bold", isDark ? "text-slate-200" : "text-slate-800")}>
                  نسبة نجاح الطلاب
                </span>
                <span className="text-[10px] text-slate-400">تقييمات معتمدة من آلاف المشتركين</span>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------- النموذج ------------------------- */}
        <div className="lg:col-span-7">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h2
                className={cx(
                  "text-xl font-black tracking-tight lg:text-2xl",
                  isDark ? "text-white" : "text-slate-900"
                )}
              >
                {isForgot ? "استعادة كلمة المرور" : isLogin ? "تسجيل الدخول 👋" : "حساب جديد 🚀"}
              </h2>
              <p className={cx("mt-1 text-[11px]", isDark ? "text-slate-400" : "text-slate-500")}>
                {isForgot
                  ? "أدخل بريدك الإلكتروني أدناه"
                  : isLogin
                    ? "أدخل بيانات حسابك للمتابعة"
                    : "أدخل تفاصيلك للانضمام الفوري"}
              </p>
            </div>
            <div
              className={cx(
                "flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold",
                isDark ? "border-slate-800 bg-slate-900 text-slate-300" : "border-slate-200 bg-slate-100 text-slate-600"
              )}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              متاحة الآن
            </div>
          </div>

          {!isForgot && (
            <div
              className={cx(
                "mb-6 grid grid-cols-2 rounded-2xl border p-1.5",
                isDark ? "border-slate-800 bg-slate-900/80" : "border-slate-200 bg-slate-100"
              )}
            >
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
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
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
            <div
              role={notice.type === "error" ? "alert" : "status"}
              className={cx(
                "mb-4 rounded-2xl border px-3.5 py-3 text-[11px] font-bold leading-relaxed",
                notice.type === "success"
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
                  : notice.type === "info"
                    ? "border-blue-500/30 bg-blue-500/10 text-blue-500"
                    : "border-rose-500/30 bg-rose-500/10 text-rose-500"
              )}
            >
              {notice.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {isSignup && (
              <>
                <div>
                  <span className={labelClass}>نوع الحساب</span>
                  <div role="radiogroup" aria-label="نوع الحساب" className="grid grid-cols-2 gap-3">
                    {(
                      [
                        ["student", "طالب", HiAcademicCap],
                        ["teacher", "مدرس", HiUserGroup],
                      ] as const
                    ).map(([value, label, Icon]) => (
                      <button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={form.role === value}
                        onClick={() => setForm((prev) => ({ ...prev, role: value }))}
                        className={cx(
                          "flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-xs font-bold transition-all",
                          form.role === value
                            ? "border-blue-500 bg-blue-500/10 text-blue-500"
                            : isDark
                              ? "border-slate-800 bg-slate-900/40 text-slate-400"
                              : "border-slate-200 bg-slate-50 text-slate-600"
                        )}
                      >
                        <Icon className="h-4 w-4" /> {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="auth-name" className={labelClass}>
                      الاسم الكامل
                    </label>
                    <IconField icon={<HiOutlineUser className="h-4 w-4" />}>
                      <input
                        id="auth-name"
                        type="text"
                        name="name"
                        required
                        autoComplete="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="اسمك الكامل"
                        className={inputClass}
                      />
                    </IconField>
                  </div>
                  <div>
                    <label htmlFor="auth-phone" className={labelClass}>
                      رقم الهاتف
                    </label>
                    <IconField icon={<HiOutlinePhone className="h-4 w-4" />}>
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
                <label htmlFor="auth-email" className={labelClass}>
                  البريد الإلكتروني
                </label>
                <IconField icon={<HiOutlineMail className="h-4 w-4" />}>
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
                <label htmlFor="auth-otp" className={labelClass}>
                  كود التحقق
                </label>
                <IconField icon={<HiKey className="h-4 w-4" />}>
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
                      "w-full rounded-2xl border py-3 pl-3 pr-10 text-center text-sm font-bold tracking-[0.4em] transition-all focus:border-blue-500 focus:outline-none",
                      isDark ? "border-slate-800 bg-slate-900/50 text-white" : "border-slate-200 bg-slate-50 text-slate-900"
                    )}
                  />
                </IconField>
              </div>
            )}

            {(!isForgot || stepForgot === 2) && (
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label
                    htmlFor="auth-password"
                    className={cx("block text-[11px] font-bold", isDark ? "text-slate-300" : "text-slate-700")}
                  >
                    كلمة المرور
                  </label>
                  {isLogin && (
                    <button
                      type="button"
                      onClick={() => switchMode("forgot")}
                      className="text-[11px] font-bold text-blue-500 hover:text-blue-400"
                    >
                      نسيت كلمة المرور؟
                    </button>
                  )}
                </div>
                <IconField icon={<HiOutlineLockClosed className="h-4 w-4" />}>
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
                    className={cx(inputClass, "pl-10")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                    className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 hover:text-blue-500"
                  >
                    {showPassword ? <HiOutlineEyeOff className="h-4 w-4" /> : <HiOutlineEye className="h-4 w-4" />}
                  </button>
                </IconField>
                {!isLogin && (
                  <p className={cx("mt-1.5 text-[10px]", isDark ? "text-slate-500" : "text-slate-400")}>
                    {MIN_PASSWORD} أحرف على الأقل، أي حروف أو أرقام.
                  </p>
                )}
              </div>
            )}

            {(isSignup || (isForgot && stepForgot === 2)) && (
              <div>
                <label htmlFor="auth-confirm" className={labelClass}>
                  تأكيد كلمة المرور
                </label>
                <IconField icon={<HiOutlineLockClosed className="h-4 w-4" />}>
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
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5">
                <label
                  htmlFor="auth-code"
                  className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold text-amber-500"
                >
                  <HiOutlineShieldCheck className="h-4 w-4" /> كود تفعيل حساب المعلم
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-amber-500/70">
                    <HiOutlineShieldCheck className="h-4 w-4" />
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
                      "w-full rounded-xl border py-2.5 pl-3 pr-10 text-xs font-semibold focus:outline-none",
                      isDark ? "border-amber-500/40 bg-slate-900 text-white" : "border-amber-500/40 bg-white text-slate-900"
                    )}
                  />
                </div>
              </div>
            )}

            <motion.button
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 py-3.5 text-xs font-black text-white shadow-xl shadow-blue-600/25 transition-all hover:from-blue-500 hover:to-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <HiOutlineSparkles className="h-4 w-4 text-cyan-200" />
                  {submitLabel}
                </>
              )}
            </motion.button>

            {isForgot && (
              <button
                type="button"
                onClick={() => switchMode("login")}
                className={cx(
                  "mt-2 flex w-full items-center justify-center gap-1.5 py-2 text-xs font-bold",
                  isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                )}
              >
                <HiArrowRight className="h-4 w-4" /> العودة لتسجيل الدخول
              </button>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
}
