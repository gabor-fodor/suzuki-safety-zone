import { motion } from "framer-motion";
import { Shield } from "lucide-react";

interface HeroSectionProps {
  onStartQuiz: () => void;
}

const HeroSection = ({ onStartQuiz }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center px-4 py-10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-background to-background" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-2xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-6 w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center"
        >
          <Shield className="w-10 h-10 text-primary" />
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight">
          A te{" "}
          <span className="text-primary">biztonsági</span>
          <br />
          zónád
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-md mx-auto leading-relaxed">
          Tudod, mekkora távolságot kell tartanod az úton? Teszteld a tudásod és nyerj értékes díjakat!
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStartQuiz}
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-bold text-lg px-8 py-4 rounded-xl shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-shadow"
        >
          Indítsd el a játékot!
        </motion.button>

        <p className="text-muted-foreground/60 text-sm mt-4">
          Suzuki közúti biztonsági kampány
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
