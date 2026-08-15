import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { Toaster } from "@/components/ui/sonner";
import Home from "@/pages/Home";
import OurKulfi from "@/pages/OurKulfi";
import Franchise from "@/pages/Franchise";
import LocateUs from "@/pages/LocateUs";
import About from "@/pages/About";
import Contact from "@/pages/Contact";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#FFFDF7] flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kulfi" element={<OurKulfi />} />
            <Route path="/franchise" element={<Franchise />} />
            <Route path="/locate" element={<LocateUs />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppFab />
        <Toaster position="top-center" richColors closeButton />
      </div>
    </BrowserRouter>
  );
}

export default App;
