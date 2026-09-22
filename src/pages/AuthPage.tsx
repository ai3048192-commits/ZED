import { useCallback, useEffect, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  HiAcademicCap,
  HiArrowRight,
  HiCheckCircle,
  HiKey,
  HiLockClosed,
  HiMail,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineX,
  HiPhone,
  HiShieldCheck,
  HiSparkles,
  HiUser,
  HiUserGroup,
} from "react-icons/hi";
import { supabase } from "../lib/supabaseClient";

type Role = "student" | "teacher";
type Mode = "login" | "signup" | "forgot";
type NoticeType = "success" | "error" | "info";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: Mode;
  isDark?: boolean;
}

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

export default function AuthModal({ isOpen, onClose, initialMode = "login", isDark = false }: AuthModalProps) {
  const [mode, setMode] = useState<Mode>(initialMode);
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
    setMode(initialMode);
  }, [initialMode]);

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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto" dir="rtl">
          {/* الخلفية المعتمة والزجاجية مع تأثير انزلاق تدريجي */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
          />

          {/* نافذة المودال المنسدلة (Slide Down Dropdown Modal) */}
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={cx(
              "relative z-10 w-full max-w-xl overflow-hidden rounded-[2.5rem] border shadow-2xl backdrop-blur-2xl my-8",
              isDark
                ? "border-slate-800/80 bg-slate-950/95 shadow-indigo-950/40 text-white"
                : "border-slate-200/80 bg-white/95 shadow-indigo-500/10 text-slate-900"
            )}
          >
            {/* زر الإغلاق العلوي الأنيق */}
            <button
              type="button"
              onClick={onClose}
              className={cx(
                "absolute left-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-2xl border transition-all duration-300",
                isDark
                  ? "border-slate-800 bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800"
                  : "border-slate-200 bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200"
              )}
            >
              <HiOutlineX className="text-lg" />
            </button>

            <div className="max-h-[85vh] overflow-y-auto p-6 sm:p-8">
              <div className="mb-6 pr-2">
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
                <div className={cx("mb-6 grid grid-cols-2 rounded-2xl border p-1 shadow-inner", isDark ? "border-slate-800 bg-slate-900/50" : "border-slate-200 bg-slate-100")}>
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
                    "mb-5 rounded-2xl border px-4 py-3 text-xs font-bold leading-relaxed shadow-sm",
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

              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignup && (
                  <>
                    <div>
                      <span className={labelClass}>حدد نوع الحساب</span>
                      <div role="radiogroup" aria-label="نوع الحساب" className="grid grid-cols-2 gap-3">
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
                              "flex items-center justify-center gap-2 rounded-2xl border px-4 py-3.5 text-xs font-bold transition-all duration-300",
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
                          "w-full rounded-2xl border py-3.5 pr-12 pl-4 text-center text-sm font-bold tracking-[0.4em] transition-all focus:border-indigo-500 focus:outline-none shadow-sm",
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
                  <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
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
                          "w-full rounded-xl border py-3 pl-3 pr-11 text-xs font-bold focus:outline-none shadow-sm",
                          isDark ? "border-amber-500/40 bg-slate-900 text-white" : "border-amber-500/40 bg-white text-slate-900"
                        )}
                      />
                    </div>
                  </div>
                )}

                {/* زر الإرسال مع أيقونة مناسبة */}
                <motion.button
                  whileHover={{ scale: loading ? 1 : 1.01 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 py-4 text-xs font-black tracking-wide text-white shadow-xl shadow-indigo-600/30 transition-all hover:from-indigo-500 hover:to-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
