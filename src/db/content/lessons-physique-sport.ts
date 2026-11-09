import type { LessonSeed } from "@/db/content/lessons-sciences";

/**
 * Chimie en section Sport (coefficient 1) : oxydoréduction, piles et
 * équilibres acido-basiques appliqués à l'effort et à la santé du sportif.
 */
export const physiqueSportLessons: LessonSeed[] = [
  {
    slug: "phys-oxydoreduction-piles",
    subjectSlug: "physique",
    title: "Oxydoréduction et piles",
    chapter: "Chimie · Oxydoréduction",
    summary:
      "Couples rédox, transferts d'électrons, fonctionnement d'une pile et applications au métabolisme énergétique.",
    level: "Bac · 4e Sport (T2)",
    durationMin: 27,
    orderIndex: 15,
    objectives: [
      "Identifier un couple oxydant/réducteur",
      "Écrire et équilibrer une demi-équation",
      "Décrire le fonctionnement d'une pile",
      "Calculer une quantité de matière à l'électrode",
    ],
    blocks: [
      {
        type: "table",
        title: "Définitions",
        head: ["Terme", "Définition", "Exemple"],
        rows: [
          ["Oxydant", "espèce qui capte des électrons", "Cu²⁺, Fe³⁺, O₂"],
          ["Réducteur", "espèce qui cède des électrons", "Cu, Fe²⁺, Zn"],
          ["Couple rédox", "oxydant/réducteur conjugués", "Cu²⁺/Cu"],
          ["Oxydation", "perte d'électrons (à l'anode)", "Zn → Zn²⁺ + 2e⁻"],
          ["Réduction", "gain d'électrons (à la cathode)", "Cu²⁺ + 2e⁻ → Cu"],
        ],
      },
      {
        type: "steps",
        title: "Équilibrer une demi-équation en milieu acide",
        items: [
          "Écrire les espèces de part et d'autre.",
          "Équilibrer les éléments autres que O et H.",
          "Équilibrer les oxygènes en ajoutant H₂O.",
          "Équilibrer les hydrogènes en ajoutant H⁺.",
          "Équilibrer les charges en ajoutant des électrons e⁻.",
        ],
      },
      {
        type: "paragraph",
        title: "La pile Daniell",
        text: "Une pile est un dispositif qui convertit de l'énergie chimique en énergie électrique grâce à deux demi-piles reliées par un pont salin. Dans la pile Daniell (Zn/Zn²⁺ et Cu²⁺/Cu), le zinc s'oxyde à l'anode (pôle négatif) et les ions cuivre se réduisent à la cathode (pôle positif). Les électrons circulent dans le circuit extérieur de l'anode vers la cathode ; le pont salin assure la continuité ionique. La force électromotrice vaut E = E°(cathode) − E°(anode).",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Lien avec le métabolisme",
        text: "Les transferts d'électrons ne sont pas réservés à la chimie : la chaîne respiratoire mitochondriale est une succession de réactions d'oxydoréduction qui transfèrent les électrons du NADH à l'oxygène. C'est le même modèle, appliqué au vivant.",
      },
    ],
    keyPoints: [
      "Oxydant = capte des électrons ; réducteur = cède des électrons.",
      "Anode : oxydation ; cathode : réduction.",
      "E = E°(cathode) − E°(anode).",
      "Le pont salin assure la neutralité électrique.",
    ],
    pitfalls: [
      "Inverser anode et cathode.",
      "Oublier d'équilibrer les charges avec des électrons.",
      "Confondre sens des électrons et sens du courant.",
    ],
    flashcards: [
      {
        question: "Que se passe-t-il à l'anode d'une pile ?",
        answer: "Une oxydation : le réducteur cède des électrons.",
      },
      {
        question: "Demi-équation du couple Cu²⁺/Cu ?",
        answer: "Cu²⁺ + 2e⁻ → Cu (réduction).",
      },
      {
        question: "Comment calcule-t-on la fem d'une pile ?",
        answer: "E = E°(cathode) − E°(anode), à partir des potentiels standards.",
      },
    ],
    tags: ["physique", "chimie", "oxydoréduction", "pile", "électrons"],
  },
  {
    slug: "phys-acides-bases",
    subjectSlug: "physique",
    title: "Acides et bases",
    chapter: "Chimie · Acido-basique",
    summary:
      "pH, couples acide/base, réactions de neutralisation et rôle des tampons physiologiques à l'effort.",
    level: "Bac · 4e Sport (T3)",
    durationMin: 27,
    orderIndex: 16,
    objectives: [
      "Définir un acide et une base",
      "Calculer un pH et une concentration",
      "Écrire une réaction de neutralisation",
      "Expliquer le rôle des tampons sanguins",
    ],
    blocks: [
      {
        type: "table",
        title: "Notions essentielles",
        head: ["Notion", "Définition", "Formule / exemple"],
        rows: [
          ["Acide (Brønsted)", "espèce capable de céder H⁺", "CH₃COOH → CH₃COO⁻ + H⁺"],
          ["Base (Brønsted)", "espèce capable de capter H⁺", "NH₃ + H⁺ → NH₄⁺"],
          ["pH", "mesure de l'acidité", "pH = −log[H₃O⁺]"],
          ["Acide fort", "dissociation totale", "[H₃O⁺] = C"],
          ["Acide faible", "dissociation partielle", "[H₃O⁺] < C"],
          ["Neutralisation", "acide + base → sel + eau", "HCl + NaOH → NaCl + H₂O"],
        ],
      },
      {
        type: "steps",
        title: "Calculs de base",
        items: [
          "pH = −log[H₃O⁺] et [H₃O⁺] = 10^(−pH).",
          "Produit ionique de l'eau à 25 °C : Ke = [H₃O⁺][OH⁻] = 10⁻¹⁴.",
          "Solution neutre : pH = 7 à 25 °C.",
          "Dilution d'un acide fort : pH augmente de 1 par décade de dilution.",
          "À l'équivalence acido-basique : n(acide) = n(base).",
        ],
      },
      {
        type: "paragraph",
        title: "Le pH sanguin et l'effort",
        text: "Le sang est maintenu entre pH 7,35 et 7,45 par des systèmes tampons, notamment le couple H₂CO₃/HCO₃⁻ et les protéines. Un effort intense produit de l'acide lactique : la baisse du pH musculaire limite l'activité enzymatique et provoque la sensation de brûlure. L'hyperventilation à l'effort est une réponse physiologique qui élimine du CO₂ et participe à la régulation du pH.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Erreur classique",
        text: "Écrire « pH = −log C » pour un acide faible : c'est faux, il faut tenir compte de la dissociation partielle. Cette confusion est l'une des plus fréquentes dans les copies.",
      },
    ],
    keyPoints: [
      "Acide = cède H⁺ ; base = capte H⁺.",
      "pH = −log[H₃O⁺], Ke = 10⁻¹⁴.",
      "Neutralisation : acide + base → sel + eau.",
      "Les tampons maintiennent le pH sanguin malgré l'effort.",
    ],
    pitfalls: [
      "Appliquer [H₃O⁺] = C à un acide faible.",
      "Confondre pH acide et concentration forte.",
      "Oublier l'équivalence n(acide) = n(base).",
    ],
    flashcards: [
      {
        question: "Comment calcule-t-on le pH d'une solution ?",
        answer: "pH = −log[H₃O⁺], avec [H₃O⁺] en mol/L.",
      },
      {
        question: "Que vaut le produit ionique de l'eau à 25 °C ?",
        answer: "Ke = [H₃O⁺][OH⁻] = 10⁻¹⁴.",
      },
      {
        question: "Quels sont les principaux tampons du sang ?",
        answer: "Le couple H₂CO₃/HCO₃⁻ et les protéines sanguines.",
      },
    ],
    tags: ["physique", "chimie", "acides", "bases", "pH", "sport"],
  },
];
