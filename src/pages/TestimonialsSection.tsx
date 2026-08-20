import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Sparkles, CheckCircle2, Send, MessageSquarePlus, AlertCircle } from 'lucide-react';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([
    {
      name: 'أحمد إبراهيم',
      role: 'طالب في المرحلة الثانوية',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
      content: 'منصة ZED غيرت تماماً طريقتي في المذاكرة. الشرح ممتاز والاختبارات الفورية ساعدتني أجيب مجموع عالي!',
      rating: 5,
      badge: 'طالب متميز',
    },
    {
      name: 'د. سارة محمود',
      role: 'مدرسة مادة الرياضيات',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop',
      content: 'كمدرسة، وجدت في منصة ZED الأدوات المثالية للتواصل مع الطلاب ومتابعة تقدمهم بدقة شديدة.',
      rating: 5,
      badge: 'مدرس معتمد',
    },
    {
      name: 'عمر خالد',
      role: 'طالب جامعي - تخصص حاسب',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
      content: 'الدورات البرمجية والمناهج المتقدمة احترافية جداً ومرتبة بطريقة تخليك تفهم من أول مرة.',
      rating: 5,
      badge: 'خريج الدورات',
    },
  ]);

  const [name, setName] = useState('');
  const [role, setRole] = useState('طالب في المنصة');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [feedbackMessage, setFeedbackMessage] = useState({ text: '', type: '' });

  const validateAndSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !content.trim()) {
      setFeedbackMessage({ text: 'برجاء ملء جميع الحقول المطلوبة.', type: 'error' });
      return;
    }

    if (content.length < 10 || content.length > 300) {
      setFeedbackMessage({ text: 'التعليق يجب أن يكون بين 10 و 300 حرف.', type: 'error' });
      return;
    }

    const blockedWords = ['كلمة_سيئة', 'spam', 'hack'];
    if (blockedWords.some(word => content.toLowerCase().includes(word))) {
      setFeedbackMessage({ text: 'عذراً، يحتوي التعليق على مصطلحات غير مسموح بها.', type: 'error' });
      return;
    }

    const newTestimonial = {
      name,
      role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop',
      content,
      rating,
      badge: role.includes('مدرس') ? 'مدرس معتمد' : 'طالب جديد',
    };

    setTestimonials([newTestimonial, ...testimonials]);
    setFeedbackMessage({ text: 'شكراً لك! تم إرسال تقييمك بنجاح وعرضه مباشرة.', type: 'success' });

    setName('');
    setContent('');
    setRating(5);

    setTimeout(() => {
      setFeedbackMessage({ text: '', type: '' });
    }, 4000);
  };

  return (
    <section className="relative w-full py-28 px-6 bg-[#070b19] overflow-hidden border-t border-white/5" dir="rtl">
      
      {/* خلفية جمالية خفيفة */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#002aff]/15 to-[#00bfff]/15 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* رأس القسم */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-[#38bdf8] text-xs font-bold mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>قصص نجاح حقيقية</span>
          </motion.div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6">
            ماذا يقول عنا <span className="bg-gradient-to-r from-[#00bfff] via-[#38bdf8] to-[#002aff] bg-clip-text text-transparent">طلابنا ومدرسونا؟</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-medium">
            اطلع على آراء المستخدمين، أو شاركنا تجربتك بكل سهولة.
          </p>
        </div>

        {/* التخطيط المتناسق (شبكة مقسمة: اليمين النموذج، اليسار التقييمات) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* 1. نموذج كتابة التقييم (يأخذ 5 أعمدة) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl relative"
          >
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-[#002aff]/20 via-[#00bfff]/20 to-[#002aff]/20 opacity-40 pointer-events-none" />

            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#002aff]/20 border border-[#00bfff]/30 flex items-center justify-center text-[#38bdf8]">
                <MessageSquarePlus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">أضف تقييمك الآن</h3>
                <p className="text-slate-400 text-xs">رأيك يساهم في تطوير المنصة</p>
              </div>
            </div>

            {feedbackMessage.text && (
              <div className={`p-3.5 rounded-xl mb-5 text-xs font-bold flex items-center gap-2.5 relative z-10 ${
                feedbackMessage.type === 'error' 
                  ? 'bg-red-500/15 text-red-400 border border-red-500/30' 
                  : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              }`}>
                {feedbackMessage.type === 'error' ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
                <span>{feedbackMessage.text}</span>
              </div>
            )}

            <form onSubmit={validateAndSubmit} className="space-y-4 relative z-10">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">الاسم الكريم</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: خالد عبدالله"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-[#00bfff] transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">صفتك في المنصة</label>
                <select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#070b19] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#00bfff] transition-all"
                >
                  <option value="طالب في المنصة">طالب في المنصة</option>
                  <option value="مدرس معتمد">مدرس معتمد</option>
                  <option value="طالب جامعي">طالب جامعي</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">التقييم بالنجوم</label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="focus:outline-none transition-transform hover:scale-110 p-0.5"
                    >
                      <Star className={`w-5 h-5 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">تعليقك أو تجربتك</label>
                <textarea 
                  value={content} 
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="اكتب تجربتك باختصار..."
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-[#00bfff] transition-all resize-none"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-[#002aff] to-[#00bfff] hover:opacity-90 text-white font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 text-xs sm:text-sm shadow-[0_10px_20px_rgba(0,42,255,0.3)] cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>إرسال التقييم ونشره</span>
              </button>
            </form>
          </motion.div>


          {/* 2. شبكة عرض التقييمات (يأخذ 7 أعمدة) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <AnimatePresence>
              {testimonials.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="relative group bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-[#00bfff]/40 rounded-3xl p-6 backdrop-blur-2xl transition-all duration-500 shadow-xl flex flex-col justify-between"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#002aff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between mb-4 relative z-10">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#38bdf8]">
                        <Quote className="w-5 h-5 opacity-75" />
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>

                    <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed mb-6 relative z-10">
                      "{item.content}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3.5 pt-4 border-t border-white/5 relative z-10">
                    <img 
                      src={item.avatar} 
                      alt={item.name} 
                      className="w-10 h-10 rounded-xl object-cover border border-white/10 shadow-md" 
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-white text-xs sm:text-sm">
                          {item.name}
                        </h4>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00bfff]" />
                      </div>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                        {item.role}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-bold text-[#38bdf8]">
                      {item.badge}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;