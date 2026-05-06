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
    <div className="h-[100dvh] w-screen overflow-hidden bg-background flex flex-col">
      <main className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain">
        <HeroSection onStartQuiz={() => setShowQuiz(true)} />
        <PrizesSection />
        <WinnersSection />
        <Footer />
      </main>

      <AnimatePresence>
        {showQuiz && <QuizFlow onClose={() => setShowQuiz(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default Index;
