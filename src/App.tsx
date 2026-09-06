import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import Courses from "./pages/Courses";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";

function App() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <Router>
      <div
        dir="rtl"
        className="flex flex-col min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white overflow-x-hidden transition-colors duration-300"
      >
        <Header isDark={isDark} setIsDark={setIsDark} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home isDark={isDark} />} />
            <Route path="/auth" element={<AuthPage isDark={isDark} />} />
            <Route path="/courses" element={<Courses isDark={isDark} />} />
            <Route path="/about" element={<AboutUs isDark={isDark} />} />
            <Route path="/contact" element={<Contact isDark={isDark} />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy isDark={isDark} />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions isDark={isDark} />} />
          </Routes>
        </main>

        <Footer isDark={isDark} />
      </div>
    </Router>
  );
}

export default App;