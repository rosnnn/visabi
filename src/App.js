import React, { useState, useCallback } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import IntroScreen from "./components/IntroScreen";
import Home from "./pages/Home";
import About from "./pages/About";
import TradingSolution from "./pages/TradingSolution";
import SecuritySolution from "./pages/SecuritySolution";
import SuccessStories from "./pages/SuccessStories";
import SuccessStoryCaseStudy from "./pages/SuccessStoryCaseStudy";
import Contact from "./pages/Contact";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";
import { Toaster } from "./components/ui/sonner";

function App() {
  const [appReady, setAppReady] = useState(false);
  const handleIntroDone = useCallback(() => setAppReady(true), []);

  return (
    <div className="App">
      {!appReady && <IntroScreen onDone={handleIntroDone} />}
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/solutions/trading" element={<TradingSolution />} />
          <Route path="/solutions/security" element={<SecuritySolution />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/success-stories/:slug" element={<SuccessStoryCaseStudy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<ComingSoon title="Privacy Policy" />} />
          <Route path="/terms-of-service" element={<ComingSoon title="Terms of Service" />} />
          <Route path="/cookie-policy" element={<ComingSoon title="Cookie Policy" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
