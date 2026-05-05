import { motion } from "framer-motion";

interface Props {
  questionId: number;
  value: number;
  min: number;
  max: number;
  correctValue: number;
  unit: string;
}

/**
 * Animated SVG scene that reacts to the slider value.
 * Each scene uses a per-question pixels-per-meter scale so the visualised
 * distance grows linearly and proportionally with the actual value.
 */
const QuizScene = ({ questionId, value, min, max, correctValue }: Props) => {
  const W = 400;
  const H = 170;

  const safeColor = "hsl(142,70%,45%)";
  const dangerColor = "hsl(0,72%,51%)";
  const isSafe = value >= correctValue;
  const accent = isSafe ? safeColor : dangerColor;

  // Reusable building blocks ------------------------------------------------
  const Road = ({ dark = false }: { dark?: boolean }) => (
    <>
      <rect x={0} y={0} width={W} height={H} fill={dark ? "#0a1428" : "#1a2942"} />
      <rect x={0} y={H / 2 - 38} width={W} height={76} fill={dark ? "#0f1d36" : "#2a3a52"} />
      {[...Array(10)].map((_, i) => (
        <rect
          key={i}
          x={i * 44 + 6}
          y={H / 2 - 1.5}
          width={22}
          height={3}
          fill="#fbbf24"
          opacity={dark ? 0.35 : 0.55}
        />
      ))}
    </>
  );

  // Side-view car
  const CarSide = ({ x, y, color = "#2E74B5", flip = false, brake = false }: any) => (
    <g transform={`translate(${x},${y}) ${flip ? "scale(-1,1)" : ""}`}>
      {/* body */}
      <path d="M -26 4 L -22 -6 L -8 -12 L 10 -12 L 22 -4 L 26 4 Z" fill={color} />
      {/* windows */}
      <path d="M -18 -5 L -8 -10 L 8 -10 L 18 -4 Z" fill="#9ECEFF" opacity={0.85} />
      {/* wheels */}
      <circle cx={-14} cy={6} r={5} fill="#1a1a1a" />
      <circle cx={14} cy={6} r={5} fill="#1a1a1a" />
      <circle cx={-14} cy={6} r={2} fill="#666" />
      <circle cx={14} cy={6} r={2} fill="#666" />
      {/* brake light */}
      {brake && (
        <motion.circle
          cx={-26}
          cy={-1}
          r={3}
          fill="#ff3b3b"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </g>
  );

  // Top-down car
  const CarTop = ({ x, y, color = "#2E74B5" }: any) => (
    <g transform={`translate(${x},${y})`}>
      <rect x={-22} y={-12} width={44} height={24} rx={5} fill={color} />
      <rect x={-14} y={-9} width={12} height={18} rx={2} fill="#9ECEFF" opacity={0.85} />
      <rect x={4} y={-9} width={10} height={18} rx={2} fill="#9ECEFF" opacity={0.6} />
      <circle cx={-14} cy={-13} r={2.5} fill="#1a1a1a" />
      <circle cx={14} cy={-13} r={2.5} fill="#1a1a1a" />
      <circle cx={-14} cy={13} r={2.5} fill="#1a1a1a" />
      <circle cx={14} cy={13} r={2.5} fill="#1a1a1a" />
    </g>
  );

  const Cyclist = ({ x, y, scale = 1 }: any) => (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <circle cx={0} cy={-14} r={5} fill="#ffd1a8" />
      <rect x={-1} y={-9} width={2} height={4} fill="#ffd1a8" />
      <path d="M -2 -5 L 0 4 L 2 -5 Z" fill="#fbbf24" />
      <circle cx={-7} cy={6} r={6} fill="none" stroke="#fff" strokeWidth={1.5} />
      <circle cx={7} cy={6} r={6} fill="none" stroke="#fff" strokeWidth={1.5} />
    </g>
  );

  const Pedestrian = ({ x, y, color = "#ef4444" }: any) => (
    <g transform={`translate(${x},${y})`}>
      <circle cx={0} cy={-12} r={5} fill="#ffd1a8" />
      <rect x={-3} y={-6} width={6} height={12} fill={color} />
      <rect x={-3} y={6} width={2} height={6} fill="#1a2942" />
      <rect x={1} y={6} width={2} height={6} fill="#1a2942" />
    </g>
  );

  // Distance ruler with arrows
  const Ruler = ({ x1, x2, y, label, color = accent }: any) => {
    const cx = (x1 + x2) / 2;
    return (
      <g>
        <line x1={x1} y1={y} x2={x2} y2={y} stroke={color} strokeWidth={2} />
        <polygon points={`${x1},${y} ${x1 + 6},${y - 4} ${x1 + 6},${y + 4}`} fill={color} />
        <polygon points={`${x2},${y} ${x2 - 6},${y - 4} ${x2 - 6},${y + 4}`} fill={color} />
        <rect x={cx - 28} y={y - 22} width={56} height={18} rx={9} fill={color} />
        <text x={cx} y={y - 9} textAnchor="middle" fontSize={11} fontWeight={700} fill="#fff">
          {label}
        </text>
      </g>
    );
  };

  // -----------------------------------------------------------------------
  // Per-question scenes. Each defines a px-per-meter scale so the visual
  // distance scales linearly with the slider value.
  // -----------------------------------------------------------------------

  // Q1 — Parked car door zone (top-down). Door opens to fixed posture; the
  // distance between door tip and cyclist track shrinks/grows with value.
  if (questionId === 1) {
    const pxPerM = 70; // 1m ≈ 70px (max 3m ≈ 210px)
    const carCenterY = 50;
    const doorTipY = carCenterY + 14 + 22; // door pivots down ~22px when fully open
    const cyclistY = doorTipY + value * pxPerM;
    const carX = 80;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <Road />
        {/* parked car (top-down) */}
        <g transform={`translate(${carX},${carCenterY})`}>
          <rect x={-30} y={-18} width={60} height={36} rx={6} fill="#c0392b" />
          <rect x={-22} y={-14} width={18} height={28} rx={2} fill="#9ECEFF" opacity={0.8} />
          <rect x={4} y={-14} width={18} height={28} rx={2} fill="#9ECEFF" opacity={0.6} />
          {/* opened door (fully open posture) */}
          <motion.g
            initial={{ rotate: 0 }}
            animate={{ rotate: 75 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ transformOrigin: "-22px 14px" }}
          >
            <rect x={-22} y={14} width={22} height={4} fill="#c0392b" stroke="#7a1f12" />
            <circle cx={0} cy={16} r={2} fill="#fff" />
          </motion.g>
        </g>
        {/* cyclist track */}
        <motion.g
          animate={{ y: cyclistY }}
          transition={{ type: "spring", stiffness: 90, damping: 16 }}
          transform={`translate(${carX},0)`}
        >
          <Cyclist x={0} y={0} scale={0.85} />
        </motion.g>
        {/* ruler from door tip to cyclist */}
        <motion.g
          animate={{ opacity: 1 }}
        >
          <line
            x1={carX + 30}
            y1={doorTipY}
            x2={carX + 30}
            y2={cyclistY - 14}
            stroke={accent}
            strokeWidth={2}
            strokeDasharray="3 3"
          />
        </motion.g>
        <g transform={`translate(${carX + 50}, ${(doorTipY + cyclistY) / 2})`}>
          <rect x={-28} y={-10} width={56} height={20} rx={10} fill={accent} />
          <text x={0} y={4} textAnchor="middle" fontSize={11} fontWeight={700} fill="#fff">
            {value.toFixed(1)} m
          </text>
        </g>
      </svg>
    );
  }

  // Q2 — Phone distraction. "Blind" trail length scales with metres traveled.
  if (questionId === 2) {
    const pxPerM = 11; // max 30m ≈ 330px
    const startX = 30;
    const trailLen = value * pxPerM;
    const carX = startX + trailLen;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <Road />
        {/* dashed "blind" trail */}
        <motion.line
          x1={startX}
          y1={H / 2}
          x2={carX}
          y2={H / 2}
          stroke={accent}
          strokeWidth={10}
          strokeOpacity={0.35}
          strokeDasharray="6 4"
          animate={{ x2: carX }}
          transition={{ type: "spring", stiffness: 80, damping: 16 }}
        />
        {/* phone icon at start */}
        <g transform={`translate(${startX - 8}, ${H / 2 - 28})`}>
          <rect x={-7} y={-11} width={14} height={22} rx={2} fill="#fff" />
          <rect x={-5} y={-9} width={10} height={16} fill="#3b82f6" />
          <circle cx={0} cy={9} r={1.2} fill="#1a2942" />
        </g>
        {/* car at end of blind trail */}
        <motion.g animate={{ x: carX }} transition={{ type: "spring", stiffness: 80, damping: 16 }}>
          <CarSide x={0} y={H / 2} />
        </motion.g>
        <Ruler x1={startX} x2={Math.max(startX + 40, carX - 26)} y={H - 22} label={`${value} m`} />
      </svg>
    );
  }

  // Q3 — Cyclist overtake side gap (top-down). Lateral gap scales with value.
  if (questionId === 3) {
    const pxPerM = 32; // max 3m ≈ 96px
    const cyclistY = H - 28;
    const carY = cyclistY - 18 - value * pxPerM; // car shifts farther left of cyclist
    const carX = 220;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <Road />
        {/* cyclist */}
        <Cyclist x={carX} y={cyclistY} />
        {/* car overtaking */}
        <motion.g
          animate={{ y: carY }}
          transition={{ type: "spring", stiffness: 80, damping: 16 }}
        >
          <CarTop x={carX} y={0} />
        </motion.g>
        {/* lateral ruler */}
        <line
          x1={carX + 36}
          y1={cyclistY - 18}
          x2={carX + 36}
          y2={carY + 12}
          stroke={accent}
          strokeWidth={2}
          strokeDasharray="3 3"
        />
        <g transform={`translate(${carX + 70}, ${(cyclistY + carY) / 2})`}>
          <rect x={-28} y={-10} width={56} height={20} rx={10} fill={accent} />
          <text x={0} y={4} textAnchor="middle" fontSize={11} fontWeight={700} fill="#fff">
            {value.toFixed(1)} m
          </text>
        </g>
      </svg>
    );
  }

  // Q4 — Wet braking distance. Skid length proportional to metres.
  if (questionId === 4) {
    const pxPerM = 1.7; // max 200m ≈ 340px
    const startX = 24;
    const skid = value * pxPerM;
    const carX = startX + skid;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <Road />
        {/* rain droplets */}
        {[...Array(20)].map((_, i) => (
          <motion.line
            key={i}
            x1={(i * 23) % W}
            y1={-10}
            x2={(i * 23) % W - 4}
            y2={4}
            stroke="#9ECEFF"
            strokeWidth={1}
            opacity={0.5}
            animate={{ y1: [-10, H + 10], y2: [4, H + 24] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: (i % 7) * 0.1 }}
          />
        ))}
        {/* wet sheen */}
        <rect x={0} y={H / 2 - 38} width={W} height={76} fill="#9ECEFF" opacity={0.05} />
        {/* skid marks */}
        <motion.rect
          x={startX}
          y={H / 2 - 7}
          height={3}
          fill="#000"
          opacity={0.7}
          animate={{ width: skid }}
          transition={{ type: "spring", stiffness: 60, damping: 16 }}
        />
        <motion.rect
          x={startX}
          y={H / 2 + 4}
          height={3}
          fill="#000"
          opacity={0.7}
          animate={{ width: skid }}
          transition={{ type: "spring", stiffness: 60, damping: 16 }}
        />
        {/* triggering hazard at start */}
        <g transform={`translate(${startX}, ${H / 2 - 28})`}>
          <polygon points="0,0 -8,14 8,14" fill="#fbbf24" />
          <text x={0} y={12} textAnchor="middle" fontSize={10} fontWeight={800} fill="#1a2942">!</text>
        </g>
        {/* car at end of skid */}
        <motion.g
          animate={{ x: carX }}
          transition={{ type: "spring", stiffness: 60, damping: 16 }}
        >
          <CarSide x={0} y={H / 2} color="#c0392b" brake />
        </motion.g>
        <Ruler x1={startX} x2={Math.max(startX + 40, carX - 26)} y={H - 22} label={`${value} m`} />
      </svg>
    );
  }

  // Q5 — School zone. Distance from car to crossing child scales with value.
  if (questionId === 5) {
    const pxPerM = 4.4; // max 80m ≈ 352px
    const childX = W - 50;
    const carX = childX - value * pxPerM - 30;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <Road />
        {/* school */}
        <g transform={`translate(${W - 30}, ${H / 2 - 50})`}>
          <rect x={-22} y={0} width={44} height={36} fill="#fbbf24" />
          <polygon points="-26,0 0,-18 26,0" fill="#dc2626" />
          <rect x={-6} y={18} width={12} height={18} fill="#7a3a12" />
          <text x={0} y={-22} textAnchor="middle" fontSize={9} fontWeight={800} fill="#fbbf24">
            ISKOLA
          </text>
        </g>
        {/* zebra crossing */}
        {[...Array(5)].map((_, i) => (
          <rect key={i} x={childX - 14} y={H / 2 - 30 + i * 14} width={28} height={6} fill="#fff" opacity={0.85} />
        ))}
        {/* child crossing */}
        <motion.g
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          <Pedestrian x={childX} y={H / 2} />
        </motion.g>
        {/* car approaching with brake light */}
        <motion.g
          animate={{ x: carX }}
          transition={{ type: "spring", stiffness: 70, damping: 16 }}
        >
          <CarSide x={0} y={H / 2} brake />
        </motion.g>
        <Ruler x1={Math.max(20, carX + 26)} x2={childX - 16} y={H - 18} label={`${value} m`} />
      </svg>
    );
  }

  // Q6 — Following a scooter. Gap scales with value.
  if (questionId === 6) {
    const pxPerM = 11; // max 30m ≈ 330px
    const scooterX = W - 40;
    const carX = scooterX - 18 - value * pxPerM - 26;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <Road />
        {/* scooter (side) */}
        <g transform={`translate(${scooterX}, ${H / 2})`}>
          <circle cx={-8} cy={6} r={5} fill="none" stroke="#fff" strokeWidth={1.5} />
          <circle cx={8} cy={6} r={5} fill="none" stroke="#fff" strokeWidth={1.5} />
          <rect x={-10} y={2} width={20} height={3} fill="#fbbf24" />
          <line x1={6} y1={2} x2={10} y2={-12} stroke="#fbbf24" strokeWidth={2} />
          <rect x={8} y={-14} width={6} height={3} fill="#fbbf24" />
          {/* rider */}
          <rect x={-3} y={-8} width={6} height={10} fill="#3b82f6" />
          <circle cx={0} cy={-13} r={4} fill="#ffd1a8" />
        </g>
        {/* car following */}
        <motion.g
          animate={{ x: carX }}
          transition={{ type: "spring", stiffness: 70, damping: 16 }}
        >
          <CarSide x={0} y={H / 2} />
        </motion.g>
        <Ruler x1={carX + 26} x2={scooterX - 18} y={H - 22} label={`${value} m`} />
      </svg>
    );
  }

  // Q7 — Traffic jam. Bumper-to-bumper gap scales with value.
  if (questionId === 7) {
    const pxPerM = 24; // max 8m ≈ 192px
    const frontX = W - 50;
    const carX = frontX - 26 - value * pxPerM - 26;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <Road />
        {/* leading car */}
        <CarSide x={frontX} y={H / 2} color="#c0392b" brake />
        {/* trailing car */}
        <motion.g
          animate={{ x: carX }}
          transition={{ type: "spring", stiffness: 90, damping: 16 }}
        >
          <CarSide x={0} y={H / 2} />
        </motion.g>
        {/* exhaust puffs */}
        {[...Array(3)].map((_, i) => (
          <motion.circle
            key={i}
            cx={frontX + 28 + i * 6}
            cy={H / 2 + 4}
            r={3 + i}
            fill="#fff"
            opacity={0.15}
            animate={{ opacity: [0.25, 0, 0.25], cx: [frontX + 28, frontX + 50] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
        <Ruler x1={carX + 26} x2={frontX - 26} y={H - 22} label={`${value.toFixed(1)} m`} />
      </svg>
    );
  }

  // Q8 — Night visibility. Headlight cone reach scales with value.
  if (questionId === 8) {
    const pxPerM = 4.4; // max 80m ≈ 352px
    const carX = 40;
    const reach = value * pxPerM;
    const pedX = carX + 20 + reach;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <Road dark />
        {/* moon */}
        <circle cx={W - 30} cy={20} r={10} fill="#f8fafc" opacity={0.85} />
        <circle cx={W - 26} cy={18} r={9} fill="#0a1428" />
        <defs>
          <linearGradient id="cone" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#fff8b8" stopOpacity={0.75} />
            <stop offset="100%" stopColor="#fff8b8" stopOpacity={0} />
          </linearGradient>
        </defs>
        {/* headlight cone */}
        <motion.polygon
          fill="url(#cone)"
          animate={{
            points: `${carX + 18},${H / 2 - 6} ${carX + 18},${H / 2 + 6} ${carX + 20 + reach},${H / 2 + 38} ${carX + 20 + reach},${H / 2 - 38}`,
          }}
          transition={{ type: "spring", stiffness: 60, damping: 16 }}
        />
        <CarSide x={carX} y={H / 2} />
        {/* pedestrian appearing at edge of light */}
        <motion.g
          animate={{ x: pedX }}
          transition={{ type: "spring", stiffness: 60, damping: 16 }}
        >
          <Pedestrian x={0} y={H / 2} color={accent} />
        </motion.g>
        <Ruler x1={carX + 18} x2={pedX} y={H - 18} label={`${value} m`} />
      </svg>
    );
  }

  return null;
};

export default QuizScene;
