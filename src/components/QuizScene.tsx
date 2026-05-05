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
 * Each question shows a top-down / side schematic with a gap or distance
 * that grows/shrinks as the user drags the slider.
 */
const QuizScene = ({ questionId, value, min, max, correctValue }: Props) => {
  const ratio = Math.min(1, Math.max(0, (value - min) / (max - min)));
  const safeRatio = (correctValue - min) / (max - min);
  const isSafe = value >= correctValue;
  const safeColor = "hsl(142,70%,45%)";
  const dangerColor = "hsl(0,72%,51%)";
  const accent = isSafe ? safeColor : dangerColor;

  // Common SVG viewbox
  const W = 400;
  const H = 160;

  // Helper: a small stylised car (top-down)
  const Car = ({ x, y, color = "#2E74B5", scale = 1, flip = false }: any) => (
    <g transform={`translate(${x},${y}) scale(${scale}) ${flip ? "scale(-1,1)" : ""}`}>
      <rect x={-22} y={-12} width={44} height={24} rx={5} fill={color} />
      <rect x={-14} y={-9} width={12} height={18} rx={2} fill="#9ECEFF" opacity={0.8} />
      <rect x={4} y={-9} width={10} height={18} rx={2} fill="#9ECEFF" opacity={0.6} />
      <circle cx={-14} cy={-13} r={3} fill="#1a1a1a" />
      <circle cx={14} cy={-13} r={3} fill="#1a1a1a" />
      <circle cx={-14} cy={13} r={3} fill="#1a1a1a" />
      <circle cx={14} cy={13} r={3} fill="#1a1a1a" />
    </g>
  );

  const Road = () => (
    <>
      <rect x={0} y={0} width={W} height={H} fill="#1a2942" />
      <rect x={0} y={H / 2 - 40} width={W} height={80} fill="#2a3a52" />
      {/* dashed centerline */}
      {[...Array(8)].map((_, i) => (
        <rect key={i} x={i * 55 + 10} y={H / 2 - 1.5} width={28} height={3} fill="#fbbf24" opacity={0.6} />
      ))}
    </>
  );

  const DistanceLabel = ({ x, y, text }: any) => (
    <g>
      <rect x={x - 26} y={y - 10} width={52} height={20} rx={10} fill={accent} />
      <text x={x} y={y + 4} textAnchor="middle" fontSize={11} fontWeight={700} fill="#fff">
        {text}
      </text>
    </g>
  );

  // Scene 1: Parking — door opens as ratio grows
  if (questionId === 1) {
    const doorAngle = 10 + ratio * 70; // 10° to 80°
    const cyclistX = 150 + ratio * 150;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <Road />
        {/* parked car */}
        <g transform={`translate(80, 60)`}>
          <rect x={-30} y={-18} width={60} height={36} rx={6} fill="#c0392b" />
          <rect x={-20} y={-14} width={16} height={28} rx={2} fill="#9ECEFF" opacity={0.8} />
          <rect x={6} y={-14} width={16} height={28} rx={2} fill="#9ECEFF" opacity={0.6} />
          {/* opening door */}
          <motion.g
            style={{ transformOrigin: "-20px 14px" }}
            animate={{ rotate: doorAngle }}
            transition={{ type: "spring", stiffness: 80, damping: 12 }}
          >
            <rect x={-20} y={14} width={20} height={4} fill="#c0392b" stroke="#7a1f12" />
            <circle cx={0} cy={16} r={2} fill="#fff" />
          </motion.g>
        </g>
        {/* cyclist passing */}
        <motion.g
          animate={{ x: cyclistX }}
          transition={{ type: "spring", stiffness: 60, damping: 14 }}
        >
          <circle cx={0} cy={120} r={6} fill="#fbbf24" />
          <rect x={-2} y={124} width={4} height={12} fill="#fbbf24" />
          <circle cx={-6} cy={140} r={5} fill="none" stroke="#fff" strokeWidth={1.5} />
          <circle cx={6} cy={140} r={5} fill="none" stroke="#fff" strokeWidth={1.5} />
        </motion.g>
        <DistanceLabel x={W / 2} y={H - 18} text={`${value.toFixed(1)} m`} />
      </svg>
    );
  }

  // Scene 2: Phone — car moves, "blind" trail length = ratio
  if (questionId === 2) {
    const trailLen = 30 + ratio * 280;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <Road />
        {/* blind trail */}
        <motion.rect
          x={40}
          y={H / 2 - 6}
          height={12}
          fill={accent}
          opacity={0.4}
          animate={{ width: trailLen }}
          transition={{ type: "spring", stiffness: 70, damping: 15 }}
        />
        <motion.g
          animate={{ x: 40 + trailLen }}
          transition={{ type: "spring", stiffness: 70, damping: 15 }}
        >
          <Car x={0} y={H / 2} />
        </motion.g>
        {/* phone icon */}
        <g transform={`translate(60, ${H / 2})`}>
          <rect x={-6} y={-10} width={12} height={20} rx={2} fill="#fff" />
          <rect x={-4} y={-8} width={8} height={14} fill="#3b82f6" />
        </g>
        <DistanceLabel x={W / 2} y={H - 14} text={`${value} m vakon`} />
      </svg>
    );
  }

  // Scene 3: Cyclist overtake — side gap
  if (questionId === 3) {
    const gap = 20 + ratio * 60; // px gap
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <Road />
        {/* cyclist on right */}
        <g transform={`translate(${W - 60}, 110)`}>
          <circle cx={0} cy={-10} r={6} fill="#fbbf24" />
          <rect x={-2} y={-4} width={4} height={12} fill="#fbbf24" />
          <circle cx={-6} cy={12} r={6} fill="none" stroke="#fff" strokeWidth={1.5} />
          <circle cx={6} cy={12} r={6} fill="none" stroke="#fff" strokeWidth={1.5} />
        </g>
        {/* car overtaking, animated forward */}
        <motion.g
          initial={{ x: -80 }}
          animate={{ x: W - 60 - gap - 30 }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
        >
          <Car x={0} y={110} color="#2E74B5" />
        </motion.g>
        {/* gap indicator */}
        <line x1={W - 60 - gap} y1={70} x2={W - 60} y2={70} stroke={accent} strokeWidth={2} />
        <line x1={W - 60 - gap} y1={65} x2={W - 60 - gap} y2={75} stroke={accent} strokeWidth={2} />
        <line x1={W - 60} y1={65} x2={W - 60} y2={75} stroke={accent} strokeWidth={2} />
        <DistanceLabel x={W - 60 - gap / 2} y={50} text={`${value.toFixed(1)} m`} />
      </svg>
    );
  }

  // Scene 4: Braking on wet road
  if (questionId === 4) {
    const brakeDist = 40 + ratio * 280;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <Road />
        {/* wet droplets */}
        {[...Array(6)].map((_, i) => (
          <motion.circle
            key={i}
            cx={30 + i * 60}
            cy={H / 2 + 25}
            r={2}
            fill="#9ECEFF"
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
        {/* skid marks */}
        <motion.rect
          x={20}
          y={H / 2 - 10}
          height={4}
          fill="#000"
          opacity={0.6}
          animate={{ width: brakeDist }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
        />
        <motion.rect
          x={20}
          y={H / 2 + 6}
          height={4}
          fill="#000"
          opacity={0.6}
          animate={{ width: brakeDist }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
        />
        {/* car at end of skid */}
        <motion.g
          animate={{ x: 20 + brakeDist }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
        >
          <Car x={0} y={H / 2} color="#c0392b" />
          {/* brake light glow */}
          <motion.circle
            cx={-22}
            cy={H / 2}
            r={6}
            fill="#ff3b3b"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        </motion.g>
        <DistanceLabel x={W / 2} y={H - 14} text={`${value} m féktáv`} />
      </svg>
    );
  }

  // Scene 5: School — distance to school sign
  if (questionId === 5) {
    const dist = 30 + ratio * 280;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <Road />
        {/* School building on right */}
        <g transform={`translate(${W - 40}, 70)`}>
          <rect x={-25} y={-30} width={50} height={50} fill="#fbbf24" />
          <polygon points="-28,-30 0,-50 28,-30" fill="#dc2626" />
          <text x={0} y={0} textAnchor="middle" fontSize={14} fontWeight={800} fill="#1a2942">
            ISKOLA
          </text>
        </g>
        {/* child crossing */}
        <motion.g
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          transform={`translate(${W - 80}, 110)`}
        >
          <circle cx={0} cy={-8} r={5} fill="#ffd1a8" />
          <rect x={-3} y={-2} width={6} height={10} fill="#ef4444" />
        </motion.g>
        {/* car approaching */}
        <motion.g
          animate={{ x: W - 90 - dist }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
        >
          <Car x={0} y={H / 2} color="#2E74B5" />
        </motion.g>
        <DistanceLabel x={(W - 90 - dist + W - 90) / 2} y={H - 14} text={`${value} m`} />
      </svg>
    );
  }

  // Scene 6: Scooter follow distance
  if (questionId === 6) {
    const gap = 30 + ratio * 220;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <Road />
        {/* scooter ahead */}
        <g transform={`translate(${W - 50}, ${H / 2})`}>
          <rect x={-3} y={-10} width={6} height={4} fill="#fbbf24" />
          <line x1={0} y1={-6} x2={0} y2={6} stroke="#fbbf24" strokeWidth={2} />
          <circle cx={0} cy={8} r={5} fill="none" stroke="#fff" strokeWidth={1.5} />
          <circle cx={0} cy={-12} r={4} fill="#ffd1a8" />
        </g>
        <motion.g
          animate={{ x: W - 50 - gap - 22 }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
        >
          <Car x={0} y={H / 2} />
        </motion.g>
        <DistanceLabel x={W - 50 - gap / 2} y={H - 14} text={`${value} m`} />
      </svg>
    );
  }

  // Scene 7: Traffic jam — car gap
  if (questionId === 7) {
    const gap = 10 + ratio * 100;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <Road />
        <Car x={W - 60} y={H / 2} color="#c0392b" />
        <motion.g
          animate={{ x: W - 60 - gap - 44 }}
          transition={{ type: "spring", stiffness: 80, damping: 14 }}
        >
          <Car x={0} y={H / 2} color="#2E74B5" />
        </motion.g>
        {/* small forward creep */}
        <motion.text
          x={20}
          y={30}
          fontSize={11}
          fill="#9ECEFF"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          araszolás...
        </motion.text>
        <DistanceLabel x={W - 60 - gap / 2 - 20} y={H - 14} text={`${value.toFixed(1)} m`} />
      </svg>
    );
  }

  // Scene 8: Night — headlight cone reach
  if (questionId === 8) {
    const reach = 40 + ratio * 240;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect x={0} y={0} width={W} height={H} fill="#0a1428" />
        <rect x={0} y={H / 2 - 40} width={W} height={80} fill="#0f1d36" />
        {[...Array(8)].map((_, i) => (
          <rect key={i} x={i * 55 + 10} y={H / 2 - 1.5} width={28} height={3} fill="#fbbf24" opacity={0.4} />
        ))}
        {/* headlight cone */}
        <defs>
          <linearGradient id="cone" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#fff8b8" stopOpacity={0.7} />
            <stop offset="100%" stopColor="#fff8b8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <motion.polygon
          fill="url(#cone)"
          animate={{
            points: `60,${H / 2 - 8} 60,${H / 2 + 8} ${60 + reach},${H / 2 + 40} ${60 + reach},${H / 2 - 40}`,
          }}
          transition={{ type: "spring", stiffness: 60, damping: 14 }}
        />
        <Car x={40} y={H / 2} color="#2E74B5" />
        {/* pedestrian at edge of light */}
        <motion.g
          animate={{ x: 60 + reach + 10 }}
          transition={{ type: "spring", stiffness: 60, damping: 14 }}
        >
          <circle cx={0} cy={H / 2 - 10} r={5} fill="#ffd1a8" />
          <rect x={-3} y={H / 2 - 4} width={6} height={14} fill={accent} />
        </motion.g>
        <DistanceLabel x={W / 2} y={H - 14} text={`${value} m`} />
      </svg>
    );
  }

  return null;
};

export default QuizScene;
