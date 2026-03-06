import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quizQuestions } from "@/data/quizData";
import { X, ArrowRight, CheckCircle2, XCircle, RotateCcw } from "lucide-react";

import quizImg1 from "@/assets/quiz-1-parking.jpg";
import quizImg2 from "@/assets/quiz-2-phone.jpg";
import quizImg3 from "@/assets/quiz-3-cyclist.jpg";
import quizImg4 from "@/assets/quiz-4-wet-road.jpg";
import quizImg5 from "@/assets/quiz-5-school.jpg";
import quizImg6 from "@/assets/quiz-6-scooter.jpg";
import quizImg7 from "@/assets/quiz-7-traffic.jpg";
import quizImg8 from "@/assets/quiz-8-night.jpg";

const quizImages = [quizImg1, quizImg2, quizImg3, quizImg4, quizImg5, quizImg6, quizImg7, quizImg8];

interface QuizFlowProps {
  onClose: () => void;
}

type Phase = "intro" | "question" | "feedback" | "results" | "registration" | "thankyou";

const QuizFlow = ({ onClose }: QuizFlowProps) => {
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [sliderValue, setSliderValue] = useState(quizQuestions[0].defaultValue);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", gdpr: false });

  const question = quizQuestions[currentQ];
  const isSafe = phase === "feedback" && answers[currentQ] >= question?.correctValue;

  const getSliderGradient = (q: typeof question, val: number) => {
    const ratio = (val - q.min) / (q.max - q.min);
    // Green near correct value, red as we deviate dangerously (below safe threshold)
    const safeRatio = (q.correctValue - q.min) / (q.max - q.min);
    const pct = Math.round(ratio * 100);
    // Track gradient: green on left (safe side), red on right
    return `linear-gradient(to right, hsl(142,70%,45%) 0%, hsl(45,100%,55%) ${Math.round(safeRatio * 100)}%, hsl(0,72%,51%) 100%)`;
  };

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = sliderValue;
    setAnswers(newAnswers);
    setPhase("feedback");
  };

  const handleContinue = () => {
    if (currentQ < quizQuestions.length - 1) {
      const next = currentQ + 1;
      setCurrentQ(next);
      setSliderValue(quizQuestions[next].defaultValue);
      setPhase("question");
    } else {
      setPhase("results");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPhase("thankyou");
    setTimeout(onClose, 3000);
  };

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background flex flex-col overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-muted-foreground">
          {phase === "intro" ? "Játék" : phase === "results" ? "Eredmények" : phase === "registration" ? "Regisztráció" : phase === "thankyou" ? "Köszönjük!" : `${currentQ + 1} / ${quizQuestions.length}`}
        </span>
        {(phase === "question" || phase === "feedback") && (
          <div className="flex-1 mx-4 h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={false}
              animate={{ width: `${((currentQ + (phase === "feedback" ? 1 : 0)) / quizQuestions.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        )}
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <motion.div key="intro" {...pageVariants} className="max-w-md w-full text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <RotateCcw className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Üdvözlünk a játékban!</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                8 közlekedési szituáció vár rád. Minden kérdésnél egy csúszkával kell beállítanod, 
                szerinted mekkora a biztonságos távolság. Teszteld a tudásod!
              </p>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setPhase("question")}
                className="bg-accent text-accent-foreground font-bold px-8 py-3 rounded-xl"
              >
                Kezdjük!
              </motion.button>
            </motion.div>
          )}

          {phase === "question" && question && (
            <motion.div key={`q-${currentQ}`} {...pageVariants} className="max-w-lg w-full">
              <div className="bg-card border border-border rounded-2xl p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 block">
                  {currentQ + 1}. kérdés
                </span>
                <h3 className="text-xl font-bold mb-2">{question.title}</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{question.description}</p>

                <img
                  src={quizImages[currentQ]}
                  alt={question.title}
                  className="w-full h-40 object-cover rounded-xl mb-6"
                />

                {/* Slider */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>{question.min} {question.unit}</span>
                    <span className="font-bold text-foreground text-lg">{sliderValue} {question.unit}</span>
                    <span>{question.max} {question.unit}</span>
                  </div>

                  {/* Slider with badge */}
                  <div className="relative">
                    <input
                      type="range"
                      className="quiz-slider w-full"
                      min={question.min}
                      max={question.max}
                      step={question.step}
                      value={sliderValue}
                      onChange={(e) => setSliderValue(parseFloat(e.target.value))}
                      style={{ background: getSliderGradient(question, sliderValue) }}
                    />

                    {/* Tick markers */}
                    <div className="relative w-full h-4 mt-1">
                      {(() => {
                        const safeRatio = (question.correctValue - question.min) / (question.max - question.min);
                        const safePct = safeRatio * 100;
                        // Generate 4-5 tick marks spread across the range
                        const ticks = [];
                        const numTicks = 5;
                        for (let i = 0; i <= numTicks; i++) {
                          const pct = (i / numTicks) * 100;
                          ticks.push(
                            <div
                              key={i}
                              className="absolute top-0 w-px h-2.5 bg-muted-foreground/30"
                              style={{ left: `${pct}%` }}
                            />
                          );
                        }
                        // Special tick at the correct value
                        ticks.push(
                          <div
                            key="safe-tick"
                            className="absolute top-0 w-0.5 h-3.5 bg-safe rounded-full"
                            style={{ left: `${safePct}%` }}
                          />
                        );
                        return ticks;
                      })()}
                    </div>

                    {/* Safe/Danger badge floating near thumb */}
                    {(() => {
                      const ratio = (sliderValue - question.min) / (question.max - question.min);
                      const pct = ratio * 100;
                      const isCurrentSafe = sliderValue >= question.correctValue;
                      return (
                        <div
                          className="absolute -top-8 transition-all duration-150 pointer-events-none"
                          style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}
                        >
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              isCurrentSafe
                                ? "bg-safe/20 text-safe"
                                : "bg-danger/20 text-danger"
                            }`}
                          >
                            {isCurrentSafe ? "Safe" : "Danger"}
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleNext}
                  className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  Tovább <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {phase === "feedback" && question && (
            <motion.div key={`fb-${currentQ}`} {...pageVariants} className="max-w-md w-full text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isSafe ? "bg-safe/20" : "bg-danger/20"}`}>
                {isSafe ? (
                  <CheckCircle2 className="w-8 h-8 text-safe" />
                ) : (
                  <XCircle className="w-8 h-8 text-danger" />
                )}
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {isSafe ? "Biztonságos!" : "Nem elég biztonságos!"}
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {isSafe ? question.feedbackSafe : question.feedbackDanger}
              </p>
              <div className="bg-card border border-border rounded-xl p-4 mb-6 inline-flex gap-6">
                <div>
                  <p className="text-xs text-muted-foreground">Te válaszod</p>
                  <p className="text-lg font-bold">{answers[currentQ]} {question.unit}</p>
                </div>
                <div className="w-px bg-border" />
                <div>
                  <p className="text-xs text-muted-foreground">Helyes érték</p>
                  <p className="text-lg font-bold text-safe">{question.correctValue} {question.unit}</p>
                </div>
              </div>
              <br />
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleContinue}
                className="bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-xl"
              >
                {currentQ < quizQuestions.length - 1 ? "Következő kérdés" : "Eredmények"}
              </motion.button>
            </motion.div>
          )}

          {phase === "results" && (
            <motion.div key="results" {...pageVariants} className="max-w-lg w-full">
              <h2 className="text-2xl font-bold mb-6 text-center">Eredmények</h2>
              <div className="space-y-3 mb-8">
                {quizQuestions.map((q, i) => {
                  const userVal = answers[i] ?? 0;
                  const safe = userVal >= q.correctValue;
                  return (
                    <div key={q.id} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${safe ? "bg-safe/20" : "bg-danger/20"}`}>
                        {safe ? <CheckCircle2 className="w-4 h-4 text-safe" /> : <XCircle className="w-4 h-4 text-danger" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{q.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {userVal} {q.unit} / {q.correctValue} {q.unit}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setPhase("registration")}
                className="w-full bg-accent text-accent-foreground font-bold py-3 rounded-xl"
              >
                Regisztrálok a nyereményekért!
              </motion.button>
            </motion.div>
          )}

          {phase === "registration" && (
            <motion.div key="reg" {...pageVariants} className="max-w-md w-full">
              <h2 className="text-2xl font-bold mb-6 text-center">Regisztráció</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Név</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">E-mail</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Telefonszám</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.gdpr}
                    onChange={(e) => setFormData({ ...formData, gdpr: e.target.checked })}
                    className="mt-1 w-5 h-5 rounded border-border accent-primary"
                  />
                  <span className="text-sm text-muted-foreground">
                    Elfogadom az adatvédelmi tájékoztatót és hozzájárulok adataim kezeléséhez.
                  </span>
                </label>
                <button
                  type="submit"
                  className="w-full bg-accent text-accent-foreground font-bold py-3 rounded-xl"
                >
                  Regisztrálok
                </button>
              </form>
            </motion.div>
          )}

          {phase === "thankyou" && (
            <motion.div key="thanks" {...pageVariants} className="max-w-md w-full text-center">
              <CheckCircle2 className="w-16 h-16 text-safe mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Köszönjük!</h2>
              <p className="text-muted-foreground">
                Sikeres regisztráció! Hamarosan visszairányítunk a főoldalra.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default QuizFlow;
