import { motion } from "framer-motion";
import { Car, Gift, Star } from "lucide-react";
import { prizesData } from "@/data/quizData";

const tiers = [
  {
    icon: Car,
    tier: "Főnyeremény",
    items: prizesData.grand,
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/20",
  },
  {
    icon: Gift,
    tier: "Középkategória",
    items: prizesData.mid,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    icon: Star,
    tier: "Kisebb nyeremények",
    items: prizesData.small,
    color: "text-safe",
    bg: "bg-safe/10",
    border: "border-safe/20",
  },
];

const PrizesSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Nyeremények</h2>
          <p className="text-muted-foreground">Játssz és nyerj értékes díjakat!</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.tier}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`rounded-2xl border ${tier.border} ${tier.bg} p-6`}
            >
              <div className={`w-14 h-14 rounded-xl ${tier.bg} flex items-center justify-center mx-auto mb-4`}>
                <tier.icon className={`w-7 h-7 ${tier.color}`} />
              </div>
              <h3 className={`text-center text-xs font-semibold uppercase tracking-wider ${tier.color} mb-3`}>
                {tier.tier}
              </h3>
              <ul className="space-y-2">
                {tier.items.map((item, j) => (
                  <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${tier.color === "text-accent" ? "bg-accent" : tier.color === "text-primary" ? "bg-primary" : "bg-safe"}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrizesSection;
