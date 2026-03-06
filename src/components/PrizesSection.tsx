import { motion } from "framer-motion";
import { Car, Gift, Star } from "lucide-react";

const prizes = [
  {
    icon: Car,
    tier: "Fődíj",
    title: "Suzuki élményvezetés",
    description: "Egy felejthetetlen nap a Suzuki tesztpályán, profi instruktor mellett.",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/20",
  },
  {
    icon: Gift,
    tier: "2. szint",
    title: "Értékes utalványok",
    description: "Üzemanyag- és szervizutalványok 10 000 – 50 000 Ft értékben.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    icon: Star,
    tier: "3. szint",
    title: "Suzuki ajándékok",
    description: "Exkluzív Suzuki merch: hátizsák, sapka, kulcstartó és más kiegészítők.",
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
          {prizes.map((prize, i) => (
            <motion.div
              key={prize.tier}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`rounded-2xl border ${prize.border} ${prize.bg} p-6 text-center`}
            >
              <div className={`w-14 h-14 rounded-xl ${prize.bg} flex items-center justify-center mx-auto mb-4`}>
                <prize.icon className={`w-7 h-7 ${prize.color}`} />
              </div>
              <span className={`text-xs font-semibold uppercase tracking-wider ${prize.color}`}>
                {prize.tier}
              </span>
              <h3 className="text-xl font-bold mt-2 mb-2">{prize.title}</h3>
              <p className="text-muted-foreground text-sm">{prize.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrizesSection;
