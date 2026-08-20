import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineMail, 
  HiOutlineLockClosed, 
  HiOutlineUser, 
  HiOutlineSparkles,
  HiAcademicCap,
  HiUserGroup,
  HiArrowRight,
  HiOutlineKey,
  HiOutlineShieldCheck,
  HiOutlineEye,
  HiOutlineEyeOff
} from 'react-icons/hi';
import { supabase } from '../lib/supabaseClient';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [stepForgot, setStepForgot] = useState(1);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const TEACHER_SECRET_CODE = "ZED_TEACHER_2026";

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    otpCode: '',
    teacherCode: '',
    role: 'student'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isForgotPassword) {
      if (stepForgot === 1) {
        // إرسال كود التحقق (OTP) الفعلي عبر Supabase
        const { error } = await supabase.auth.signInWithOtp({
          email: formData.email,
          options: {
            shouldCreateUser: false, // لضمان عدم إنشاء حساب بالخطأ لو الإيميل مش موجود
          }
        });
        
        if (error) {
          alert("خطأ في إرسال الكود: " + error.message);
          return;
        }
        
        alert(`تم إرسال كود التحقق الخاص بـ "منصة Z E D" إلى البريد: ${formData.email}\n(تأكد من تفقد مجلد Spam)`);
        setStepForgot(2); // الانتقال للخطوة التالية (إدخال الكود والباسورد الجديد)
      } else {
        if (formData.password !== formData.confirmPassword) {
          alert("كلمتا المرور غير متطابقتين!");
          return;
        }

        // 1. التحقق من الكود (OTP) الذي أدخله المستخدم
        const { error: verifyError } = await supabase.auth.verifyOtp({
          email: formData.email,
          token: formData.otpCode,
          type: 'email'
        });

        if (verifyError) {
          alert("كود التحقق غير صحيح أو انتهت صلاحيته: " + verifyError.message);
          return;
        }

        // 2. تحديث كلمة المرور بعد نجاح التحقق من الكود
        const { error: updateError } = await supabase.auth.updateUser({
          password: formData.password
        });

        if (updateError) {
          alert("فشل تحديث كلمة المرور: " + updateError.message);
          return;
        }

        alert("تم تغيير كلمة المرور بنجاح بواسطة منصة Z E D! يمكنك تسجيل الدخول الآن.");
        setIsForgotPassword(false);
        setStepForgot(1);
        setIsLogin(true);
        setFormData({ ...formData, password: '', confirmPassword: '', otpCode: '' });
      }
    } else if (isLogin) {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        alert("خطأ في تسجيل الدخول: تأكد من صحة البريد أو كلمة المرور.");
        return;
      }

      if (!authData.user) return;

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single();

      if (profileError) {
        alert("فشلنا في جلب بيانات الحساب: " + profileError.message);
        return;
      }

      if (profileData?.role === 'teacher') {
        alert("أهلاً بك يا استاذ! جاري تحويلك لمنصة المدرسين...");
        window.location.href = "http://localhost:5173/";
      } else {
        alert("أهلاً بك يا بطل! جاري تحويلك لمنصة الطلاب...");
        window.location.href = "http://localhost:5174/";
      }

    } else {
      // --- التحقق من كود المدرس ---
      if (formData.role === 'teacher' && formData.teacherCode !== TEACHER_SECRET_CODE) {
        alert("عذراً، كود تفعيل المدرس غير صحيح!");
        return;
      }

      // --- إنشاء حساب جديد ---
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { full_name: formData.name, role: formData.role }
        }
      });

      if (authError) {
        if (authError.message.includes("User already registered")) {
          const goToLogin = window.confirm("هذا البريد الإلكتروني مسجل بالفعل! هل تريد الانتقال إلى صفحة تسجيل الدخول مباشرة؟");
          if (goToLogin) {
            setIsLogin(true);
          }
          return;
        }
        alert("خطأ في إنشاء الحساب: " + authError.message);
        return;
      }

      if (!authData.user || !authData.user.identities || authData.user.identities.length === 0) {
        alert("هذا البريد الإلكتروني مسجل مسبقاً بالفعل!");
        setIsLogin(true);
        return;
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .upsert([{ id: authData.user.id, full_name: formData.name, role: formData.role }]);

      if (profileError) {
        alert("حدث خطأ أثناء حفظ الملف الشخصي: " + profileError.message);
        return;
      }

      alert(`تم إنشاء حساب ${formData.role === 'teacher' ? 'مدرس' : 'طالب'} بنجاح!`);
      window.location.href = formData.role === 'teacher' ? "http://localhost:5173/" : "http://localhost:5174/";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 flex items-center justify-center px-4 py-12" dir="rtl">
      <div className="max-w-md w-full">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/95 backdrop-blur-2xl border border-blue-100/80 rounded-3xl shadow-2xl p-8 relative"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#002aff] rounded-2xl text-white font-black text-3xl shadow-lg shadow-blue-600/30 mb-3 relative">
              Z
              <span className="absolute -top-1 -right-1 text-[#00bfff] font-black text-sm bg-white rounded-full px-1">+</span>
            </div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              {isForgotPassword ? (stepForgot === 1 ? "استعادة كلمة المرور" : "تعيين كلمة جديدة") : isLogin ? "مرحباً بك مجدداً" : "انضم إلى ZED"}
            </h2>
            <p className="text-xs text-gray-500 font-semibold mt-1">
              {isForgotPassword ? "أدخل بريدك الإلكتروني ليصلك كود التحقق من منصة Z E D" : isLogin ? "سجل دخولك بحسابك الشخصي" : "اختر نوع حسابك وأدخل بياناتك"}
            </p>
          </div>

          {!isForgotPassword && (
            <div className="grid grid-cols-2 bg-blue-50/60 p-1.5 rounded-2xl mb-6 border border-blue-100/50">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`py-2.5 text-xs font-bold rounded-xl transition-all ${isLogin ? 'bg-[#002aff] text-white shadow-md' : 'text-gray-600 hover:text-[#002aff]'}`}
              >
                تسجيل الدخول
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`py-2.5 text-xs font-bold rounded-xl transition-all ${!isLogin ? 'bg-[#002aff] text-white shadow-md' : 'text-gray-600 hover:text-[#002aff]'}`}
              >
                حساب جديد
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {!isForgotPassword && !isLogin && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">أنت تسجل كـ:</label>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'student' })}
                    className={`py-2.5 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      formData.role === 'student' ? 'border-[#002aff] bg-blue-50/60 text-[#002aff]' : 'border-gray-200 text-gray-600 bg-gray-50/30'
                    }`}
                  >
                    <HiAcademicCap className="w-5 h-5" />
                    <span>طالب</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'teacher' })}
                    className={`py-2.5 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      formData.role === 'teacher' ? 'border-[#002aff] bg-blue-50/60 text-[#002aff]' : 'border-gray-200 text-gray-600 bg-gray-50/30'
                    }`}
                  >
                    <HiUserGroup className="w-5 h-5" />
                    <span>مدرس</span>
                  </button>
                </div>
              </div>
            )}

            {!isForgotPassword && !isLogin && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">الاسم الكامل</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-400">
                    <HiOutlineUser className="h-5 w-5" />
                  </span>
                  <input 
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="أدخل اسمك الكامل"
                    className="w-full pr-11 pl-4 py-3 bg-gray-50/50 border border-blue-100 rounded-2xl text-sm font-semibold text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#002aff]/20 focus:border-[#002aff]"
                  />
                </div>
              </div>
            )}

            {(!isForgotPassword || stepForgot === 1) && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">البريد الإلكتروني</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-400">
                    <HiOutlineMail className="h-5 w-5" />
                  </span>
                  <input 
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full pr-11 pl-4 py-3 bg-gray-50/50 border border-blue-100 rounded-2xl text-sm font-semibold text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#002aff]/20 focus:border-[#002aff]"
                  />
                </div>
              </div>
            )}

            {isForgotPassword && stepForgot === 2 && (
              <>
                <div className="bg-blue-50 p-3 rounded-2xl text-center">
                  <p className="text-xs text-blue-800 font-bold">تم إرسال كود التحقق (OTP) من منصة Z E D إلى بريدك</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">كود التحقق</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-400">
                      <HiOutlineKey className="h-5 w-5" />
                    </span>
                    <input 
                      type="text"
                      name="otpCode"
                      required
                      value={formData.otpCode}
                      onChange={handleChange}
                      placeholder="أدخل الكود المكون من أرقام"
                      className="w-full pr-11 pl-4 py-3 bg-gray-50/50 border border-blue-100 rounded-2xl text-sm font-semibold text-gray-800 tracking-widest text-center"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">كلمة المرور الجديدة</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-400">
                      <HiOutlineLockClosed className="h-5 w-5" />
                    </span>
                    <input 
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pr-11 pl-12 py-3 bg-gray-50/50 border border-blue-100 rounded-2xl text-sm font-semibold text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#002aff]/20 focus:border-[#002aff]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                      {showPassword ? <HiOutlineEyeOff className="h-5 w-5" /> : <HiOutlineEye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">تأكيد كلمة المرور الجديدة</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-400">
                      <HiOutlineLockClosed className="h-5 w-5" />
                    </span>
                    <input 
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pr-11 pl-12 py-3 bg-gray-50/50 border border-blue-100 rounded-2xl text-sm font-semibold text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#002aff]/20 focus:border-[#002aff]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                      {showConfirmPassword ? <HiOutlineEyeOff className="h-5 w-5" /> : <HiOutlineEye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {!isForgotPassword && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">كلمة المرور</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-400">
                    <HiOutlineLockClosed className="h-5 w-5" />
                  </span>
                  <input 
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pr-11 pl-12 py-3 bg-gray-50/50 border border-blue-100 rounded-2xl text-sm font-semibold text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#002aff]/20 focus:border-[#002aff]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? <HiOutlineEyeOff className="h-5 w-5" /> : <HiOutlineEye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            )}

            {!isForgotPassword && !isLogin && formData.role === 'teacher' && (
              <div className="bg-amber-50/60 p-3 rounded-2xl border border-amber-200">
                <label className="block text-xs font-bold text-amber-800 mb-1.5 flex items-center gap-1">
                  <HiOutlineShieldCheck className="w-4 h-4 text-amber-600" />
                  كود تفعيل حساب المعلم (مطلوب)
                </label>
                <input 
                  type="text"
                  name="teacherCode"
                  required
                  value={formData.teacherCode}
                  onChange={handleChange}
                  placeholder="أدخل كود المعلمين السري"
                  className="w-full px-4 py-2.5 bg-white border border-amber-300 rounded-xl text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            )}

            {isLogin && !isForgotPassword && (
              <div className="flex items-center justify-between text-xs font-semibold">
                <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                  <input type="checkbox" className="rounded border-blue-200 text-[#002aff] focus:ring-[#002aff]" />
                  تذكرني
                </label>
                <button 
                  type="button" 
                  onClick={() => { setIsForgotPassword(true); setStepForgot(1); }}
                  className="text-[#002aff] hover:underline bg-transparent border-none cursor-pointer p-0 font-semibold"
                >
                  نسيت كلمة المرور؟
                </button>
              </div>
            )}

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full mt-2 py-3.5 bg-[#002aff] hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <HiOutlineSparkles className="h-5 w-5 text-[#00bfff]" />
              {isForgotPassword ? (stepForgot === 1 ? "إرسال كود التحقق" : "تأكيد الكود وتغيير الباسورد") : isLogin ? "تسجيل الدخول" : "إنشاء الحساب الجديد"}
            </motion.button>
          </form>

          <div className="mt-6 text-center border-t border-gray-100 pt-4">
            {isForgotPassword ? (
              <button 
                type="button"
                onClick={() => { setIsForgotPassword(false); setStepForgot(1); }}
                className="inline-flex items-center gap-1.5 text-xs text-[#002aff] font-bold hover:underline"
              >
                <HiArrowRight className="w-4 h-4" />
                العودة لتسجيل الدخول
              </button>
            ) : (
              <p className="text-xs text-gray-500 font-semibold">
                {isLogin ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟"}{' '}
                <button 
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[#002aff] font-bold hover:underline"
                >
                  {isLogin ? "انشئ حساباً الآن" : "سجل الدخول"}
                </button>
              </p>
            )}
          </div>

        </motion.div>
      </div>
    </div>
  );
}