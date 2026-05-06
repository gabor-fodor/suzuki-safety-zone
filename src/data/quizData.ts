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
    id: 3,
    title: "Kerékpáros előzése",
    description: "Mekkora oldaltávolság biztonságos bringás előzésnél?",
    unit: "m",
    min: 0.3,
    max: 3,
    step: 0.1,
    defaultValue: 0.5,
    correctValue: 1.5,
    feedbackSafe: "Szuper! 1–1,5 méter között van a biztonságos távolság, különösen nagyobb sebességnél az 1,5 méter az ideális.",
    feedbackDanger: "A biztonságos előzési távolság 1–1,5 méter. Nagyobb sebességnél mindenképp az 1,5 méter a javasolt!",
  },
  {
    id: 1,
    title: "Parkoló autó ajtózónája",
    description: "Belvárosban parkoló autók mellett haladsz. Mekkora oldaltávolság szükséges, hogy egy hirtelen kinyíló ajtó ne okozzon balesetet?",
    unit: "m",
    min: 0.3,
    max: 3,
    step: 0.1,
    defaultValue: 0.5,
    correctValue: 1.2,
    feedbackSafe: "Helyes! Minimum 1 méter kell, de ideális esetben 1,2–1,5 méter. Egy hirtelen kinyíló ajtó akár 80–100 cm-re is benyúlhat az úttestre!",
    feedbackDanger: "Egy hirtelen kinyíló ajtó akár 80–100 cm-re is benyúlhat az úttestre. Minimum 1,2 méter oldaltávolság szükséges!",
  },
  {
    id: 2,
    title: "Vakrepülés telefonnal",
    description: "Hány métert teszel meg vakon, ha 1 másodpercre lenézel a telefonodra 50 km/h-nál?",
    unit: "m",
    min: 2,
    max: 30,
    step: 1,
    defaultValue: 5,
    correctValue: 14,
    feedbackSafe: "Így van! 1 másodperc = 14 méter vakon megtett út. Ez nagyjából 3–4 autóhossz!",
    feedbackDanger: "1 másodperc = 14 méter vakon megtett út 50 km/h-nál. Ez 3–4 autóhossz – tedd le a telefont!",
  },
  {
    title: "Féktávolság nedves úton",
    description: "Mennyi féktávval kell számolni nedves aszfalton 90 km/h-nál?",
    unit: "m",
    min: 20,
    max: 200,
    step: 5,
    defaultValue: 40,
    correctValue: 100,
    feedbackSafe: "Pontos! Nedves úton 90 km/h-nál 100–120 méter között van a féktávolság. (90 km/h = kb. 25 m/s)",
    feedbackDanger: "Nedves úton a féktávolság 100–120 méter 90 km/h-nál! Ez jóval több, mint száraz úton – tarts nagyobb követési távolságot!",
  },
  {
    id: 5,
    title: "Lassítás iskolánál",
    description: "Egy iskolához közeledsz reggel. Mekkora távolságból kell már lassítanod, hogy egy hirtelen lelépő gyerek előtt biztonságosan meg tudj állni?",
    unit: "m",
    min: 5,
    max: 80,
    step: 1,
    defaultValue: 10,
    correctValue: 30,
    feedbackSafe: "Remek! Városi 50 km/h-nál a teljes megállási távolság kb. 30–40 méter. Gyerekeknél mindig rövidebb reakcióidővel kell számolni!",
    feedbackDanger: "Városi 50 km/h-nál a teljes megállási távolság 30–40 méter. Gyerekeknél mindig korábban kezdj el lassítani!",
  },
  {
    id: 6,
    title: "Követési távolság roller mögött",
    description: "Rolleres halad előtted a kerékpársávban. Mekkora követési távolság számít biztonságosnak városi tempónál (30–40 km/h)?",
    unit: "m",
    min: 2,
    max: 30,
    step: 1,
    defaultValue: 5,
    correctValue: 15,
    feedbackSafe: "Igen! 30–40 km/h tempónál minimum 2 másodperc követési idő kell, ami kb. 15–20 méter. A rolleres instabilabb és hirtelen irányváltásra képes!",
    feedbackDanger: "A rolleres instabilabb, hirtelen irányváltásra képes – 15–20 méter követési távolság kell 30–40 km/h-nál!",
  },
  {
    id: 7,
    title: "Araszolás a dugóban",
    description: "Forgalomban araszolsz. Mekkora ráhagyást érdemes hagyni az előtted haladó autó mögött, hogy egy hirtelen fékezésnél ne csússz rá?",
    unit: "m",
    min: 0.5,
    max: 8,
    step: 0.5,
    defaultValue: 1,
    correctValue: 3,
    feedbackSafe: "Ügyes! Legalább 1 autóhossz, azaz kb. 3–4 méter kell hirtelen fékezésnél, hogy elkerüld a koccanásos baleseteket.",
    feedbackDanger: "Legalább 1 autóhossz (3–4 méter) ráhagyás kell – ez elég helyet ad hirtelen fékezésnél!",
  },
  {
    id: 8,
    title: "Éjszakai reakciótávolság",
    description: "Sötétben, rossz látási viszonyok között vezetsz 50 km/h-val. Mekkora az a távolság, ahonnan még biztonságosan tudsz reagálni, ha valaki lelép eléd?",
    unit: "m",
    min: 5,
    max: 80,
    step: 1,
    defaultValue: 15,
    correctValue: 40,
    feedbackSafe: "Helyes! Lakott területen 50 km/h-nál minimum 40–50 méteres észlelési távolság szükséges. Ha ennél később veszed észre, fizikailag nem biztos, hogy meg tudsz állni!",
    feedbackDanger: "Lakott területen 50 km/h-nál minimum 40–50 méter észlelési távolság kell. Ha ennél később veszed észre, nem biztos, hogy meg tudsz állni!",
  },
];

export const prizesData = {
  grand: [
    "1 éves Suzuki használat",
    "Hosszú hétvégés élményautózás egy új Suzuki modellel",
    "Teljes körű biztonsági csomag (gyerekülés + tetőbox + téli gumi)",
    "Vezetéstechnikai prémium tréning instruktorral",
    "Suzuki élményvezetés tesztpályán",
  ],
  mid: [
    "Tankolási utalvány",
    "Autókozmetikai prémium csomag",
    "Gumiabroncs vásárlási utalvány",
    "Suzuki szervízkupon",
    "Ingyenes átvizsgálás + biztonsági csomag",
  ],
  small: [
    "Suzuki merch ajándékcsomag",
    "Autós kiegészítők: telefontartó, dashcam",
  ],
};

export const winnersData = [
  { name: "Kovács Anna", prize: "Suzuki élményvezetés tesztpályán" },
  { name: "Nagy Péter", prize: "Tankolási utalvány" },
  { name: "Szabó Eszter", prize: "Suzuki merch ajándékcsomag" },
  { name: "Tóth Gábor", prize: "Suzuki szervízkupon" },
  { name: "Kiss Réka", prize: "Autós kiegészítők: telefontartó" },
  { name: "Horváth Márk", prize: "Autókozmetikai prémium csomag" },
];
