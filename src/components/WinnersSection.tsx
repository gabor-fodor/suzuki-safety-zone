import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { winnersData } from "@/data/quizData";

const WinnersSection = () => {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Nyertesek</h2>
          <p className="text-muted-foreground">Korábbi játékosaink, akik nyertek</p>
        </motion.div>

        <div className="space-y-3">
          {winnersData.map((winner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-4 bg-card rounded-xl p-4 border border-border"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{winner.name}</p>
                <p className="text-sm text-muted-foreground truncate">{winner.prize}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WinnersSection;
