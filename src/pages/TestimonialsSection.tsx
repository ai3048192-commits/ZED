import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Sparkles, CheckCircle2, Send, MessageSquarePlus, AlertCircle, Clock, Phone, User } from 'lucide-react';
import { supabase } from "../lib/supabaseClient";

const TestimonialsSection = ({ isDark }: { isDark?: boolean }) => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('طالب في المنصة');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [feedbackMessage, setFeedbackMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('user_feedback')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) {
        const formatted = data.map((item, index) => {
          const randomImageId = (item.id || index + 1) * 10;
          const avatarUrl = `https://images.unsplash.com/photo-${1500000000000 + randomImageId % 900000}?auto=format&fit=crop&w=200&h=200&q=80`;
          
          return {
            id: item.id,
            name: item.name,
            role: item.role,
            avatar: avatarUrl,
            content: item.message,
            rating: item.rating || 5,
            badge: item.role && item.role.includes('مدرس') ? 'مدرس معتمد' : 'طالب متميز',
            span: index % 3 === 0 ? 'sm:col-span-2 lg:col-span-1' : 'sm:col-span-1',
          };
        });
        setTestimonials(formatted);
      }
    } catch (err) {
      console.error('Error fetching testimonials:', err);
    }
  };

  const validateAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !content.trim()) {
      setFeedbackMessage({ text: 'برجاء ملء جميع الحقول المطلوبة بما فيها رقم الهاتف.', type: 'error' });
      return;
    }

    if (content.length < 3 || content.length > 500) {
      setFeedbackMessage({ text: 'التعليق يجب ألا يقل عن 3 أحرف وألا يتجاوز 500 حرف.', type: 'error' });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from('user_feedback').insert([
        {
          name: name,
          phone: phone,
          role: role,
          feedback_type: 'comment',
          message: content,
          rating: rating,
          status: 'pending',
        },
      ]);

      if (error) throw error;

      setFeedbackMessage({ 
        text: 'شكراً لك! تم إرسال تقييمك بنجاح، وسيتم مراجعته ونشره قريباً من قبل إدارة المنصة.', 
        type: 'success' 
      });
      setName('');
      setPhone('');
      setContent('');
      setRating(5);

      setTimeout(() => {
        setFeedbackMessage({ text: '', type: '' });
      }, 6000);
    } catch (err) {
      console.error('Error inserting feedback:', err);
      setFeedbackMessage({ text: 'حدث خطأ أثناء الإرسال، تأكد من إعدادات الجدول.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      style={{
        backgroundColor: isDark ? '#020617' : '#f8fafc',
        color: isDark ? '#f1f5f9' : '#0f172a'
      }}
      className="relative w-full py-32 px-6 overflow-hidden transition-colors duration-300" 
      dir="rtl"
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.08)',
              borderColor: isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.3)',
              color: isDark ? '#60a5fa' : '#2563eb'
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold mb-6 backdrop-blur-md shadow-lg"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>قصص نجاح من مجتمعنا</span>
          </motion.div>
          
          <h2 
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
            className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-6"
          >
            آراء <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">طلابنا وأساتذتنا</span>
          </h2>
          
          <p 
            style={{ color: isDark ? '#94a3b8' : '#475569' }}
            className="text-base sm:text-lg font-medium leading-relaxed"
          >
            اطلع على تجارب المستخدمين الحقيقية، أو شاركنا رأيك بكل سهولة.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.9)',
              borderColor: isDark ? '#1e293b' : '#cbd5e1'
            }}
            className="lg:col-span-5 border rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative sticky top-28"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                <MessageSquarePlus className="w-7 h-7" />
              </div>
              <div>
                <h3 
                  style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                  className="text-xl font-black tracking-tight"
                >
                  أضف تقييمك الآن
                </h3>
                <p 
                  style={{ color: isDark ? '#94a3b8' : '#64748b' }}
                  className="text-xs mt-1"
                >
                  رأيك يساهم في تطوير وتجويد المنصة
                </p>
              </div>
            </div>

            {feedbackMessage.text && (
              <div className={`p-4 rounded-2xl mb-6 text-xs font-bold flex items-start gap-3 ${
                feedbackMessage.type === 'error' 
                  ? 'bg-red-950/60 text-red-300 border border-red-800/80' 
                  : 'bg-blue-950/60 text-blue-200 border border-blue-800/80'
              }`}>
                {feedbackMessage.type === 'error' ? (
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                ) : (
                  <Clock className="w-4 h-4 shrink-0 mt-0.5 text-blue-300" />
                )}
                <span className="leading-relaxed">{feedbackMessage.text}</span>
              </div>
            )}

            <form onSubmit={validateAndSubmit} className="space-y-4">
              <div>
                <label 
                  style={{ color: isDark ? '#cbd5e1' : '#334155' }}
                  className="block text-xs font-bold mb-1.5"
                >
                  الاسم الكريم
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: خالد عبدالله"
                    style={{
                      backgroundColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#f8fafc',
                      borderColor: isDark ? '#334155' : '#cbd5e1',
                      color: isDark ? '#ffffff' : '#0f172a'
                    }}
                    className="w-full pl-4 pr-10 py-3 rounded-xl border placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition-all"
                    required
                  />
                  <User className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label 
                  style={{ color: isDark ? '#cbd5e1' : '#334155' }}
                  className="block text-xs font-bold mb-1.5"
                >
                  رقم الهاتف (للتواصل)
                </label>
                <div className="relative">
                  <input 
                    type="tel" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01012345678"
                    style={{
                      backgroundColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#f8fafc',
                      borderColor: isDark ? '#334155' : '#cbd5e1',
                      color: isDark ? '#ffffff' : '#0f172a'
                    }}
                    className="w-full pl-4 pr-10 py-3 rounded-xl border placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition-all text-left"
                    dir="ltr"
                    required
                  />
                  <Phone className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label 
                  style={{ color: isDark ? '#cbd5e1' : '#334155' }}
                  className="block text-xs font-bold mb-1.5"
                >
                  صفتك في المنصة
                </label>
                <select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  style={{
                    backgroundColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#f8fafc',
                    borderColor: isDark ? '#334155' : '#cbd5e1',
                    color: isDark ? '#ffffff' : '#0f172a'
                  }}
                  className="w-full px-4 py-3 rounded-xl border text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition-all"
                >
                  <option value="طالب في المنصة">طالب في المنصة</option>
                  <option value="مدرس معتمد">مدرس معتمد</option>
                  <option value="طالب جامعي">طالب جامعي</option>
                </select>
              </div>

              <div>
                <label 
                  style={{ color: isDark ? '#cbd5e1' : '#334155' }}
                  className="block text-xs font-bold mb-1.5"
                >
                  التقييم بالنجوم
                </label>
                <div 
                  style={{
                    backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : '#f1f5f9',
                    borderColor: isDark ? 'rgba(51, 65, 85, 0.6)' : '#cbd5e1'
                  }}
                  className="flex items-center gap-1.5 p-2.5 rounded-xl border w-fit"
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="focus:outline-none transition-transform hover:scale-110 p-0.5 cursor-pointer"
                    >
                      <Star className={`w-5 h-5 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-400'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label 
                  style={{ color: isDark ? '#cbd5e1' : '#334155' }}
                  className="block text-xs font-bold mb-1.5"
                >
                  تعليقك أو تجربتك
                </label>
                <textarea 
                  value={content} 
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="اكتب تجربتك باختصار..."
                  rows={3}
                  style={{
                    backgroundColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#f8fafc',
                    borderColor: isDark ? '#334155' : '#cbd5e1',
                    color: isDark ? '#ffffff' : '#0f172a'
                  }}
                  className="w-full px-4 py-3 rounded-xl border placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition-all resize-none"
                  required
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 text-xs sm:text-sm shadow-lg shadow-blue-600/30 border border-blue-400/30 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-white" />
                <span>{loading ? 'جاري الإرسال...' : 'إرسال التقييم للمراجعة'}</span>
              </button>
            </form>
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <AnimatePresence>
              {testimonials.length === 0 ? (
                <div 
                  style={{
                    backgroundColor: isDark ? 'rgba(15, 23, 42, 0.4)' : '#ffffff',
                    borderColor: isDark ? '#1e293b' : '#cbd5e1',
                    color: isDark ? '#94a3b8' : '#64748b'
                  }}
                  className="sm:col-span-2 text-center py-16 border rounded-3xl text-sm"
                >
                  لا توجد تعليقات معتمدة حتى الآن. كن أول من يشارك!
                </div>
              ) : (
                testimonials.map((item, idx) => (
                  <motion.div
                    key={item.id || idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    style={{
                      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.4)' : '#ffffff',
                      borderColor: isDark ? '#1e293b' : '#cbd5e1'
                    }}
                    className="relative group hover:border-blue-500/50 rounded-3xl p-6 backdrop-blur-xl transition-all duration-500 shadow-xl flex flex-col justify-between border"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

                    <div>
                      <div className="flex items-center justify-between mb-4 relative z-10">
                        <div 
                          style={{
                            backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
                            borderColor: isDark ? '#334155' : '#cbd5e1'
                          }}
                          className="w-10 h-10 rounded-xl border flex items-center justify-center text-blue-500"
                        >
                          <Quote className="w-5 h-5 opacity-75" />
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(item.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>

                      <p 
                        style={{ color: isDark ? '#cbd5e1' : '#334155' }}
                        className="text-xs sm:text-sm font-medium leading-relaxed mb-6 relative z-10"
                      >
                        "{item.content}"
                      </p>
                    </div>

                    <div 
                      style={{ borderColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#e2e8f0' }}
                      className="flex items-center gap-3.5 pt-4 border-t relative z-10"
                    >
                      <img 
                        src={item.avatar} 
                        alt={item.name} 
                        className="w-10 h-10 rounded-xl object-cover bg-slate-800 border border-slate-700 shadow-md" 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 
                            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                            className="font-bold text-xs sm:text-sm truncate"
                          >
                            {item.name}
                          </h4>
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        </div>
                        <p 
                          style={{ color: isDark ? '#94a3b8' : '#64748b' }}
                          className="text-[11px] font-medium mt-0.5 truncate"
                        >
                          {item.role}
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-500 shrink-0">
                        {item.badge}
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;