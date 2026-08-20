import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import FloatingChat from "./pages/FloatingChat";

function App() {
  return (
    <Router>
      {/* إزالة bg-gray-50 العشوائية والتأكد من تلاصق العناصر */}
      <div
        dir="rtl"
        className="flex flex-col min-h-screen bg-slate-950 text-white overflow-x-hidden"
      >
        {/* الهيدر ثابت */}
        <Header />

        {/* المحتوى */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/course-details" element={<CourseDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/chat" element={<FloatingChat />} />
          </Routes>
        </main>

        {/* الفوتر */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
