import type { LessonSeed } from "@/db/content/lessons-sciences";

/**
 * Français et anglais — fiches complémentaires du programme de 4ème année
 * secondaire (roman, narrateur, commentaire composé, essai ; reading
 * comprehension, vocabulary, writing, grammar).
 */
export const francaisAnglaisLessons: LessonSeed[] = [
  {
    slug: "francais-roman-personnage",
    subjectSlug: "francais",
    title: "Le roman et la construction du personnage",
    chapter: "Littérature · Le roman",
    summary:
      "Comment un roman fabrique un personnage et un point de vue : portrait, statut du narrateur, focalisation et effets sur le lecteur.",
    level: "Bac · Toutes sections (T1)",
    durationMin: 26,
    orderIndex: 2,
    objectives: [
      "Distinguer auteur, narrateur et personnage",
      "Identifier le type de narrateur et la focalisation",
      "Analyser un portrait et ses procédés",
      "Relier le personnage aux valeurs de son époque",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Trois instances à ne pas confondre",
        text: "L'auteur est la personne qui écrit ; le narrateur est celui qui raconte dans le texte ; le personnage est celui qui agit dans l'histoire. Un roman ne parle jamais avec la voix de son auteur : toute affirmation passe par une instance narrative, et c'est cette médiation qui fait l'objet de l'analyse.",
      },
      {
        type: "table",
        title: "Narrateur et focalisation",
        head: ["Type", "Définition", "Effet"],
        rows: [
          ["Narrateur interne", "Raconte à la première personne, participe à l'histoire", "Intimité, information limitée à ce qu'il sait"],
          ["Narrateur externe", "Raconte à la troisième personne, n'est pas personnage", "Distance, autorité du récit"],
          ["Focalisation interne", "Le récit passe par la conscience d'un personnage", "Adhésion du lecteur, subjectivité assumée"],
          ["Focalisation externe", "Le récit décrit sans entrer dans les pensées", "Mystère, effet d'objectivité"],
          ["Focalisation zéro", "Le narrateur sait tout", "Vue d'ensemble, ironie possible"],
        ],
      },
      {
        type: "steps",
        title: "Méthode — analyser un portrait",
        items: [
          "Repérer les informations données : état civil, physique, moral, social.",
          "Identifier le point de vue : qui voit ? qui parle ? le portrait est-il valorisant ou dévalorisant ?",
          "Relever les procédés : comparaisons, métaphores, champs lexicaux, rythme des phrases.",
          "Interpréter : que révèle ce portrait du rôle du personnage dans l'œuvre et des valeurs de l'époque ?",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Erreur fatale en commentaire",
        text: "Écrire « l'auteur veut nous dire que… » sans passer par le narrateur ni par les procédés du texte. Toute interprétation doit s'appuyer sur une citation et un procédé nommé.",
      },
    ],
    keyPoints: [
      "Auteur, narrateur et personnage sont trois instances distinctes.",
      "Le type de narrateur conditionne l'information du lecteur.",
      "Un portrait est toujours orienté : repérer le point de vue.",
      "Les procédés doivent être nommés et interprétés.",
    ],
    pitfalls: [
      "Confondre narrateur et auteur.",
      "Décrire le texte sans nommer les procédés.",
      "Oublier d'interpréter après le relevé.",
    ],
    flashcards: [
      {
        question: "Quelle différence entre focalisation interne et externe ?",
        answer:
          "La focalisation interne passe par la conscience d'un personnage, la focalisation externe décrit les faits sans accéder aux pensées.",
      },
      {
        question: "Que produit un narrateur interne ?",
        answer: "Un effet d'intimité et une information limitée à ce qu'il sait ou croit savoir.",
      },
      {
        question: "Que doit contenir une analyse de portrait ?",
        answer: "Un relevé d'informations, un repérage du point de vue, des procédés nommés et une interprétation.",
      },
    ],
    tags: ["français", "roman", "narrateur", "personnage", "focalisation"],
  },
  {
    slug: "francais-commentaire-compose",
    subjectSlug: "francais",
    title: "Le commentaire composé : axes de lecture et rédaction",
    chapter: "Méthodologie · Commentaire",
    summary:
      "Construire un commentaire composé : repérer les centres d'intérêt, formuler deux ou trois axes, choisir les citations et rédiger sans paraphrase.",
    level: "Bac · Toutes sections (T2)",
    durationMin: 30,
    orderIndex: 3,
    objectives: [
      "Passer du relevé de procédés aux axes de lecture",
      "Formuler des axes qui répondent à un projet de lecture",
      "Intégrer les citations dans une phrase rédigée",
      "Éviter la paraphrase et le catalogue de procédés",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Du repérage à l'interprétation",
        text: "Le commentaire composé n'est pas un commentaire linéaire : il regroupe les observations en deux ou trois axes qui éclairent un même projet de lecture. Autrement dit, on ne suit pas l'ordre du texte, on suit l'ordre des idées que l'on construit sur le texte.",
      },
      {
        type: "table",
        title: "Les trois temps du travail",
        head: ["Étape", "Durée", "Ce que tu produis"],
        rows: [
          ["Lecture et repérage", "20 min", "Tableau de procédés classés par thème (expression de la souffrance, images de la nature…)"],
          ["Élaboration du plan", "15 min", "Deux ou trois axes formulés en phrases, chacun avec citations"],
          ["Rédaction", "1 h 15", "Introduction, développement en paragraphes, conclusion"],
        ],
      },
      {
        type: "steps",
        title: "Méthode — formuler un axe",
        items: [
          "Réunir les procédés qui vont dans le même sens (champ lexical de la tristesse, phrases courtes, images de la nuit).",
          "Formuler une phrase qui énonce l'effet produit : « La description crée une atmosphère oppressante ».",
          "Vérifier que l'axe ne se contente pas de nommer un procédé : il doit dire ce que cela produit sur le lecteur.",
          "Hiérarchiser les axes : du plus évident au plus profond.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Formule de paragraphe à réutiliser",
        text: "« [Idée]. Comme le montre [citation], l'emploi de [procédé] produit [effet]. Ce choix permet à l'auteur de [interprétation]. » Trois phrases, un paragraphe solide.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Les deux écueils",
        text: "La paraphrase (redire le texte avec d'autres mots) et le catalogue (une liste de figures sans lien). Le commentaire composé suppose un projet de lecture, c'est-à-dire une idée directrice qui unit les axes.",
      },
    ],
    keyPoints: [
      "Un axe est une idée sur le texte, pas un nom de procédé.",
      "Chaque citation doit être introduite et exploitée.",
      "Le commentaire composé est thématique, pas linéaire.",
      "Le projet de lecture unifie les axes.",
    ],
    pitfalls: [
      "Raconter le texte au lieu de l'analyser.",
      "Empiler des figures de style sans interprétation.",
      "Introduction sans projet de lecture ni annonce du plan.",
    ],
    flashcards: [
      {
        question: "Quelle différence entre commentaire linéaire et composé ?",
        answer:
          "Le linéaire suit l'ordre du texte ; le composé regroupe les remarques en axes thématiques qui servent un projet de lecture.",
      },
      {
        question: "Comment vérifier qu'un axe est correct ?",
        answer: "S'il énonce un effet produit sur le lecteur et peut être soutenu par au moins trois citations.",
      },
      {
        question: "Quelle est la structure d'un paragraphe de commentaire ?",
        answer: "Idée, citation, procédé nommé, effet produit, interprétation.",
      },
    ],
    tags: ["français", "commentaire composé", "méthode", "citation", "analyse"],
  },
  {
    slug: "francais-essai-argumentatif",
    subjectSlug: "francais",
    title: "L'essai argumentatif : thèse, arguments et exemples",
    chapter: "Méthodologie · L'essai",
    summary:
      "Construire un essai en temps limité : analyser le sujet, formuler une thèse, choisir des arguments variés et rédiger en respectant les exigences de la langue.",
    level: "Bac · Toutes sections (T3)",
    durationMin: 28,
    orderIndex: 4,
    objectives: [
      "Analyser un sujet et dégager sa problématique",
      "Bâtir un plan argumentatif progressif",
      "Illustrer chaque argument par un exemple précis",
      "Rédiger une introduction et une conclusion efficaces",
    ],
    blocks: [
      {
        type: "steps",
        title: "Méthode en quatre temps",
        items: [
          "Analyser le sujet : reformuler, repérer le mot-clé et la thèse implicite de la citation.",
          "Formuler la problématique : la tension entre deux réponses possibles au sujet.",
          "Bâtir le plan : deux ou trois arguments par partie, chacun avec un exemple tiré de tes lectures ou de ton expérience culturelle.",
          "Rédiger : introduction (accroche, problématique, annonce), développement avec connecteurs logiques, conclusion qui répond.",
        ],
      },
      {
        type: "table",
        title: "Connecteurs à utiliser (et à ne pas confondre)",
        head: ["Fonction", "Connecteurs", "Piège"],
        rows: [
          ["Ajouter", "De plus, par ailleurs, en outre", "Ne pas empiler sans hiérarchie"],
          ["Opposer", "En revanche, toutefois, néanmoins", "Ne pas opposer des idées identiques"],
          ["Expliquer la cause", "Parce que, car, en raison de", "« Car » ne commence pas un paragraphe formel"],
          ["Conclure", "Ainsi, donc, en définitive", "Ne pas introduire une idée neuve"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Le meilleur exemple",
        text: "Un exemple littéraire précis (titre + auteur + situation) vaut mieux que trois allusions vagues. Une seule référence bien exploitée convainc davantage.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Ce qui coûte le plus de points",
        text: "Les fautes de langue répétées, l'absence de problématique, les paragraphes sans exemple et la conclusion qui ne répond pas au sujet. La langue compte autant que les idées.",
      },
    ],
    keyPoints: [
      "Une problématique est une tension, pas une question vague.",
      "Chaque argument s'appuie sur un exemple précis.",
      "Les connecteurs logiques assurent la cohérence.",
      "La conclusion répond explicitement au sujet.",
    ],
    pitfalls: [
      "Recopier le sujet sans le reformuler.",
      "Donner des exemples hors sujet.",
      "Négliger l'orthographe et la ponctuation.",
    ],
    flashcards: [
      {
        question: "Qu'est-ce qu'une problématique ?",
        answer:
          "La formulation d'un problème : la tension entre deux réponses possibles au sujet, qui justifie le plan.",
      },
      {
        question: "Combien d'exemples par argument ?",
        answer: "Un seul, mais précis, développé et relié à l'argument.",
      },
      {
        question: "Que doit faire la conclusion ?",
        answer: "Répondre clairement au problème posé, résumer le parcours, sans ouvrir un nouveau débat.",
      },
    ],
    tags: ["français", "essai", "argumentation", "plan", "méthode"],
  },
  {
    slug: "english-reading-comprehension",
    subjectSlug: "anglais",
    title: "Reading comprehension: strategies for the bac paper",
    chapter: "Language · Reading",
    summary:
      "Lire un texte rapidement, repérer l'idée principale et les détails demandés, et répondre aux questions sans recopier le texte.",
    level: "Bac · Toutes sections (T1)",
    durationMin: 24,
    orderIndex: 2,
    objectives: [
      "Skim a text to find the main idea",
      "Scan for specific information (dates, names, figures)",
      "Answer comprehension questions in your own words",
      "Identify the writer's purpose and tone",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Two reading speeds, two goals",
        text: "Skimming means reading fast to catch the general meaning: title, first and last sentence of each paragraph. Scanning means looking for precise information without reading every word. At the bac, you use both: skim first to understand what the text is about, then scan to locate the answers.",
      },
      {
        type: "table",
        title: "Question types and how to answer",
        head: ["Question type", "What is asked", "Answer strategy"],
        rows: [
          ["General comprehension", "The main idea of the text or a paragraph", "Answer in one sentence, without copying"],
          ["Detailed comprehension", "A fact, a figure, a date", "Quote the exact words, then reformulate"],
          ["Reference question", "What does 'it' or 'this' refer to?", "Look at the previous sentence, name the antecedent"],
          ["Purpose / tone question", "Why did the writer write this?", "Use verbs: to inform, to warn, to criticise, to persuade"],
        ],
      },
      {
        type: "steps",
        title: "Method — answer without copying",
        items: [
          "Read the question and underline the key words.",
          "Locate the paragraph where the answer is (scan for synonyms, not only exact words).",
          "Read the whole sentence to grasp the meaning.",
          "Close the text, then write the answer in your own words.",
          "Check the grammar: subject + verb, correct tense, no missing auxiliary.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "The penalty you can avoid",
        text: "Copying a whole sentence from the text is usually marked wrong: the examiner checks that you understood, not that you can transcribe. Reformulate with synonyms and your own structure.",
      },
    ],
    keyPoints: [
      "Skim for the general meaning, scan for precise information.",
      "Reformulate instead of copying sentences.",
      "Reference questions need the exact antecedent.",
      "Purpose questions expect verbs such as to inform, to warn, to persuade.",
    ],
    pitfalls: [
      "Answering yes/no without justification.",
      "Copying long extracts from the text.",
      "Confusing the writer's opinion with the reader's reaction.",
    ],
    flashcards: [
      {
        question: "What is the difference between skimming and scanning?",
        answer: "Skimming is fast reading for the main idea; scanning is looking for specific details without reading every word.",
      },
      {
        question: "How should you answer a reference question?",
        answer: "Identify the exact word or idea the pronoun refers to, in the previous sentence or clause.",
      },
      {
        question: "Which verbs describe a writer's purpose?",
        answer: "To inform, to explain, to warn, to persuade, to criticise, to entertain.",
      },
    ],
    tags: ["anglais", "reading", "comprehension", "bac", "method"],
  },
  {
    slug: "english-writing-essay",
    subjectSlug: "anglais",
    title: "Writing: argumentative essay, formal email and linking words",
    chapter: "Language · Writing",
    summary:
      "Structurer un essai argumentatif en 120 mots, écrire un courriel formel, et utiliser les connecteurs qui font gagner des points de cohérence.",
    level: "Bac · Toutes sections (T2)",
    durationMin: 26,
    orderIndex: 3,
    objectives: [
      "Write a clear introduction, body and conclusion",
      "Use linkers for addition, contrast, cause and consequence",
      "Write a formal email with the right register",
      "Check the grammar points most often penalised",
    ],
    blocks: [
      {
        type: "table",
        title: "The essay structure that scores",
        head: ["Part", "Content", "Useful phrases"],
        rows: [
          ["Introduction", "Introduce the topic, state your position", "Nowadays, many people believe that… ; In my opinion…"],
          ["Body paragraph 1", "First argument + example", "First of all, … for instance, …"],
          ["Body paragraph 2", "Second argument or counter-argument", "Moreover, … ; On the other hand, …"],
          ["Conclusion", "Restate and open up", "To sum up, … ; It is therefore essential to…"],
        ],
      },
      {
        type: "table",
        title: "Formal email checklist",
        head: ["Element", "Formal version", "Avoid"],
        rows: [
          ["Greeting", "Dear Mr Ben Ali, / Dear Sir or Madam,", "Hi, Hey"],
          ["Opening", "I am writing to apply for… / to enquire about…", "I want to say that…"],
          ["Closing", "I look forward to hearing from you.", "Reply fast."],
          ["Sign-off", "Yours sincerely, / Yours faithfully,", "Bye, See you"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Grammar points that are always checked",
        text: "Third person -s, irregular past forms, present perfect with since/for, comparative and superlative forms, and the position of adverbs. Revise these five points and you avoid most lost marks.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Length matters",
        text: "The instruction usually asks for about 120 words. A text that is far too short lacks development; far too long contains more errors. Count roughly: 12 lines of 10 words.",
      },
    ],
    keyPoints: [
      "Three parts: introduction, two body paragraphs, conclusion.",
      "Linkers create coherence and are explicitly rewarded.",
      "Formal email = polite formulas and no contractions.",
      "Aim for the required length: about 120 words.",
    ],
    pitfalls: [
      "Writing one long paragraph without structure.",
      "Mixing formal and informal register.",
      "Forgetting the subject in the third person.",
    ],
    flashcards: [
      {
        question: "Which linkers express contrast?",
        answer: "However, on the other hand, although, whereas, in spite of.",
      },
      {
        question: "How do you close a formal email?",
        answer: "With 'I look forward to hearing from you' and 'Yours sincerely' (or 'Yours faithfully' if the name is unknown).",
      },
      {
        question: "How long should the bac essay be?",
        answer: "About 120 words, generally 10 to 14 lines.",
      },
    ],
    tags: ["anglais", "writing", "essay", "email", "linkers"],
  },
];
