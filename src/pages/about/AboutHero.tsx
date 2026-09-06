import React, { useState, useEffect } from "react";
import {
  HiOutlineRocketLaunch,
  HiOutlineFire,
  HiOutlineArrowLongLeft,
  HiOutlineSparkles,
  HiOutlineShieldCheck
} from "react-icons/hi2";
import { supabase } from "../../lib/supabaseClient.js";

export default function AboutHero({ isDark }: { isDark?: boolean }) {
  const [tracksList, setTracksList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchTracks() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("about_hero_tracks")
          .select("*")
          .order("id", { ascending: true });

        if (data && !error) {
          setTracksList(data);
        }
      } catch (err) {
        console.error("Error fetching tracks list:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTracks();
  }, []);

  const handleAuthNavigation = (trackId?: any) => {
    window.location.href = "/auth";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16 py-16" dir="rtl">
      <div className="text-center max-w-4xl mx-auto space-y-5">
        <div 
          style={{
            backgroundColor: isDark ? 'rgba(6, 182, 212, 0.1)' : 'rgba(6, 182, 212, 0.08)',
            borderColor: isDark ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.3)',
            color: isDark ? '#22d3ee' : '#0891b2'
          }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-md"
        >
          <HiOutlineFire className="w-4 h-4 animate-pulse" />
          <span>المسارات التعليمية الاستثنائية والاحترافية</span>
        </div>
        
        <h1 
          style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.2]"
        >
          اختر مسارك الاحترافي وانطلق نحو القمة{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-500">
            بأقوى محتوى تعليمي
          </span>
        </h1>
        
        <p 
          style={{ color: isDark ? '#94a3b8' : '#475569' }}
          className="text-sm sm:text-base font-medium max-w-2xl mx-auto"
        >
          مصممة خصيصاً لتغطي كافة الاحتياجات التقنية والمهنية بأسلوب تفاعلي متقدم يضمن تفوقك.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {[1, 2].map((n) => (
            <div 
              key={n} 
              style={{
                backgroundColor: isDark ? 'rgba(15, 23, 42, 0.4)' : '#ffffff',
                borderColor: isDark ? 'rgba(30, 41, 59, 0.5)' : '#e2e8f0'
              }}
              className="min-h-[600px] rounded-[36px] border animate-pulse p-10 shadow-sm" 
            />
          ))}
        </div>
      ) : tracksList.length === 0 ? (
        <div 
          style={{
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.4)' : '#ffffff',
            borderColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#e2e8f0',
            color: isDark ? '#94a3b8' : '#64748b'
          }}
          className="text-center py-24 rounded-[36px] border shadow-sm"
        >
          <p className="text-sm font-medium">لا توجد مسارات مضافة حالياً.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {tracksList.name ? null : tracksList.map((track, trackIndex) => {
            let feats = [];
            try {
              feats = Array.isArray(track.features)
                ? track.features
                : JSON.parse(track.features || "[]");
            } catch {
              feats = [];
            }

            const iconSrc = track.icon_url || track.iconPreview;

            return (
              <div
                key={track.id}
                style={{
                  backgroundColor: isDark ? '#0f172a' : '#ffffff',
                  borderColor: isDark ? '#1e293b' : '#cbd5e1',
                }}
                className="group relative p-8 sm:p-12 rounded-[36px] border hover:border-cyan-500/60 backdrop-blur-3xl flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-cyan-500/10 via-teal-500/5 to-transparent rounded-full blur-[110px] group-hover:from-cyan-500/20 transition-all duration-700 pointer-events-none" />

                <div className="relative z-10 space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* حاوية الأيقونة مع تطبيق الفلتر لتعمل بوضوح في الثيمين */}
                      <div 
                        style={{
                          backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
                          borderColor: isDark ? 'rgba(6, 182, 212, 0.3)' : '#cbd5e1'
                        }}
                        className="w-16 h-16 rounded-2xl border flex items-center justify-center p-3.5 shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0 overflow-hidden"
                      >
                        {iconSrc ? (
                          <img 
                            src={iconSrc} 
                            alt="Track Icon" 
                            style={{
                              filter: isDark ? 'brightness(0) invert(1)' : 'brightness(0)'
                            }}
                            className="w-full h-full object-contain transition-all duration-300" 
                          />
                        ) : (
                          <HiOutlineRocketLaunch className="w-8 h-8 text-cyan-500" />
                        )}
                      </div>

                      <div>
                        <span 
                          style={{
                            backgroundColor: isDark ? 'rgba(6, 182, 212, 0.1)' : 'rgba(6, 182, 212, 0.08)',
                            borderColor: isDark ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.3)',
                            color: isDark ? '#22d3ee' : '#0891b2'
                          }}
                          className="text-[10px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full border shadow-xs"
                        >
                          المسار رقم {trackIndex + 1}
                        </span>
                      </div>
                    </div>

                    {(track.trackName || track.track_name) && (
                      <span 
                        style={{
                          backgroundColor: isDark ? 'rgba(6, 182, 212, 0.1)' : 'rgba(6, 182, 212, 0.08)',
                          borderColor: isDark ? 'rgba(6, 182, 212, 0.25)' : 'rgba(6, 182, 212, 0.3)',
                          color: isDark ? '#67e8f9' : '#0284c7'
                        }}
                        className="px-4 py-2 rounded-2xl text-xs font-black tracking-wide border shadow-sm flex items-center gap-2"
                      >
                        <HiOutlineSparkles className="w-4 h-4 text-cyan-500" />
                        {track.trackName || track.track_name}
                      </span>
                    )}
                  </div>

                  <div className="space-y-4">
                    {track.title && (
                      <h3 
                        style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                        className="text-2xl sm:text-3xl font-black leading-tight group-hover:text-cyan-500 transition-colors"
                      >
                        {track.title}
                      </h3>
                    )}
                    {track.description && (
                      <p 
                        style={{ color: isDark ? '#94a3b8' : '#475569' }}
                        className="text-sm sm:text-base leading-relaxed font-normal"
                      >
                        {track.description}
                      </p>
                    )}
                  </div>
                </div>

                <div 
                  style={{ borderColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#e2e8f0' }}
                  className="relative z-10 pt-8 mt-8 border-t space-y-6 flex-grow flex flex-col justify-between"
                >
                  {feats.length > 0 ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span 
                          style={{ color: isDark ? '#cbd5e1' : '#334155' }}
                          className="text-xs font-black flex items-center gap-2"
                        >
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                          مميزات ومكتسبات المسار:
                        </span>
                        <span 
                          style={{
                            backgroundColor: isDark ? 'rgba(6, 182, 212, 0.12)' : 'rgba(6, 182, 212, 0.08)',
                            borderColor: isDark ? 'rgba(6, 182, 212, 0.3)' : 'rgba(6, 182, 212, 0.3)',
                            color: isDark ? '#67e8f9' : '#0891b2'
                          }}
                          className="text-[11px] px-3 py-1 rounded-xl border font-black"
                        >
                          {feats.length} عناصر أساسية
                        </span>
                      </div>
                      
                      <div className="space-y-2.5">
                        {feats.map((feat: string, idx: number) => (
                          <div 
                            key={idx} 
                            style={{
                              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.4)' : '#f8fafc',
                              borderColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#e2e8f0'
                            }}
                            className="group/item flex items-center justify-between p-3.5 rounded-2xl border hover:border-cyan-500/40 transition-all duration-300"
                          >
                            <div className="flex items-center gap-3.5">
                              <div className="w-7 h-7 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 group-hover/item:bg-cyan-500 group-hover/item:text-slate-950 transition-all">
                                <span className="text-xs font-black text-cyan-500 group-hover/item:text-white">
                                  {idx + 1}
                                </span>
                              </div>
                              <span 
                                style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
                                className="text-xs sm:text-sm font-medium leading-snug"
                              >
                                {feat}
                              </span>
                            </div>
                            <HiOutlineShieldCheck className="w-4 h-4 text-cyan-500/60 group-hover/item:text-cyan-500 transition-colors shrink-0" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div />
                  )}

                  <div 
                    style={{
                      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.5)' : '#f8fafc',
                      borderColor: isDark ? 'rgba(6, 182, 212, 0.2)' : '#cbd5e1'
                    }}
                    className="pt-6 mt-4 border flex items-center justify-between p-4 rounded-2xl transition-all duration-300 shadow-sm"
                  >
                    <span 
                      style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                      className="text-xs sm:text-sm font-extrabold tracking-wide group-hover:text-cyan-500 transition-colors"
                    >
                      ابدأ الآن واستكشف تفاصيل هذا المسار
                    </span>
                    
                    <button
                      onClick={() => handleAuthNavigation(track.id)}
                      className="flex items-center gap-2 bg-cyan-500/10 hover:bg-cyan-500 text-cyan-500 hover:text-white px-4 py-2.5 rounded-xl border border-cyan-500/30 transition-all duration-300 shadow-sm cursor-pointer"
                    >
                      <span className="text-xs font-bold">دخول</span>
                      <HiOutlineArrowLongLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}