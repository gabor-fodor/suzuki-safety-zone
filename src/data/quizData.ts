export interface QuizQuestion {
  id: number;
  title: string;
  description: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  correctValue: number;
  feedbackSafe: string;
  feedbackDanger: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    title: "Parkoló autó ajtózónája",
    description: "Városban egy parkoló autó mellett haladsz el kerékpárral. Mekkora távolságot tartasz az ajtótól, hogy biztonságban legyél?",
    unit: "m",
    min: 0.3,
    max: 3,
    step: 0.1,
    defaultValue: 0.5,
    correctValue: 1.2,
    feedbackSafe: "Helyes! Legalább 1,2 méterre érdemes elhaladni a parkoló autóktól.",
    feedbackDanger: "A biztonságos távolság legalább 1,2 méter – ennyi kell, hogy elkerüld a hirtelen kinyíló ajtókat.",
  },
  {
    id: 2,
    title: "Vakrepülés telefonnal",
    description: "50 km/h-val haladsz és 1 másodpercre a telefonodra nézel. Mekkora utat teszel meg vakon?",
    unit: "m",
    min: 2,
    max: 30,
    step: 1,
    defaultValue: 5,
    correctValue: 14,
    feedbackSafe: "Így van! Már 1 másodperc alatt közel 14 métert teszel meg vakon.",
    feedbackDanger: "50 km/h-nál 1 másodperc = ~14 méter vakrepülés. Tedd le a telefont!",
  },
  {
    id: 3,
    title: "Kerékpáros előzése",
    description: "Egy kerékpárost előzöl a városban. Mekkora oldaltávolságot tartasz?",
    unit: "m",
    min: 0.3,
    max: 3,
    step: 0.1,
    defaultValue: 0.5,
    correctValue: 1.5,
    feedbackSafe: "Szuper! A KRESZ szerint legalább 1,5 méter oldaltávolságot kell tartani.",
    feedbackDanger: "A biztonságos előzési távolság legalább 1,5 méter – a kerékpáros biztonsága a te felelősséged is.",
  },
  {
    id: 4,
    title: "Féktávolság nedves úton",
    description: "90 km/h-val haladsz nedves úton. Mekkora a féktávolságod?",
    unit: "m",
    min: 20,
    max: 200,
    step: 5,
    defaultValue: 40,
    correctValue: 100,
    feedbackSafe: "Pontos! Nedves úton 90 km/h-nál akár 100 méter is lehet a féktávolság.",
    feedbackDanger: "Nedves úton a féktávolság akár 100 méterre is nőhet 90 km/h-nál. Tarts nagyobb követési távolságot!",
  },
  {
    id: 5,
    title: "Lassítás iskolánál",
    description: "50 km/h-val közelíted meg az iskolazónát. Hány méterrel az iskola előtt kezdesz el lassítani?",
    unit: "m",
    min: 5,
    max: 80,
    step: 1,
    defaultValue: 10,
    correctValue: 30,
    feedbackSafe: "Remek! Legalább 30 méterrel korábban érdemes lassítani az iskolazóna előtt.",
    feedbackDanger: "Az iskolazóna előtt legalább 30 méterrel kezdj el lassítani – a gyerekek kiszámíthatatlanok!",
  },
  {
    id: 6,
    title: "Követési távolság roller mögött",
    description: "35 km/h-val haladsz egy roller mögött a belvárosban. Mekkora követési távolságot tartasz?",
    unit: "m",
    min: 2,
    max: 30,
    step: 1,
    defaultValue: 5,
    correctValue: 15,
    feedbackSafe: "Igen! Roller mögött is legalább 15 méter követési távolság az ideális.",
    feedbackDanger: "A roller hirtelen fékez – legalább 15 méter követési távolságot tarts 35 km/h-nál!",
  },
  {
    id: 7,
    title: "Araszolás a dugóban",
    description: "Lépésben haladsz a dugóban. Mekkora távolságot tartasz az előtted álló autótól?",
    unit: "m",
    min: 0.5,
    max: 8,
    step: 0.5,
    defaultValue: 1,
    correctValue: 3,
    feedbackSafe: "Ügyes! Még araszoláskor is legalább 3 méter kell, hogy reagálni tudj.",
    feedbackDanger: "Dugóban is tarts legalább 3 métert – így van helyed reagálni, ha az előtted lévő hirtelen fékez.",
  },
  {
    id: 8,
    title: "Éjszakai reakciótávolság",
    description: "Éjszaka 50 km/h-val haladsz, és hirtelen akadályt látsz. Mekkora a reakciótávolságod, mire reagálsz?",
    unit: "m",
    min: 5,
    max: 80,
    step: 1,
    defaultValue: 15,
    correctValue: 40,
    feedbackSafe: "Helyes! Éjszaka a reakciótávolság akár 40 méter is lehet 50 km/h-nál.",
    feedbackDanger: "Éjszaka a reakcióidő megnő – 50 km/h-nál ez ~40 méter reakciótávolságot jelent!",
  },
];

export const winnersData = [
  { name: "Kovács Anna", prize: "Suzuki élményvezetés" },
  { name: "Nagy Péter", prize: "50 000 Ft-os üzemanyag utalvány" },
  { name: "Szabó Eszter", prize: "Suzuki sport hátizsák" },
  { name: "Tóth Gábor", prize: "30 000 Ft-os szerviz utalvány" },
  { name: "Kiss Réka", prize: "Suzuki kulcstartó szett" },
  { name: "Horváth Márk", prize: "Suzuki baseball sapka" },
];
