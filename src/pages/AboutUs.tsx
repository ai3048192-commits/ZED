import React, { useState } from "react";
import AboutHero from "./about/AboutHero";
import AboutBentoGrid from "./about/AboutBentoGrid";
import AboutStats from "./about/AboutStats";
import AboutFaq from "./about/AboutFaq";

interface AboutUsProps {
  isDark: boolean;
}

export default function AboutUs({ isDark }: AboutUsProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<
    "all" | "students" | "instructors"
  >("all");

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div
      style={{
        backgroundColor: isDark ? '#020617' : '#f8fafc',
        color: isDark ? '#ffffff' : '#0f172a'
      }}
      className="w-full m-0 p-0 overflow-x-hidden selection:bg-cyan-500
       selection:text-slate-950 transition-colors duration-300"
      dir="rtl"
    >
      <div className="w-full py-24 px-4 sm:px-6 lg:px-16 relative">
        <div className="absolute top-12 right-1/4 w-[700px] h-[700px] 
        bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 w-[700px] h-[700px]
         bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/3 w-[600px] h-[600px] 
        bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-28">
          <AboutHero activeTab={activeTab} setActiveTab={setActiveTab} isDark={isDark} />

          <AboutBentoGrid activeTab={activeTab} isDark={isDark} />

          <AboutStats isDark={isDark} />

          <AboutFaq openFaq={openFaq} toggleFaq={toggleFaq} isDark={isDark} />
        </div>
      </div>
    </div>
  );
}