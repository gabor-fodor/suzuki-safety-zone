import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import PrizesSection from "@/components/PrizesSection";
import WinnersSection from "@/components/WinnersSection";
import Footer from "@/components/Footer";
import QuizFlow from "@/components/QuizFlow";

const Index = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onStartQuiz={() => setShowQuiz(true)} />
      <PrizesSection />
      <WinnersSection />
      <Footer />

      <AnimatePresence>
        {showQuiz && <QuizFlow onClose={() => setShowQuiz(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default Index;
