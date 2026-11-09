import type { LessonSeed } from "@/db/content/lessons-sciences";

/**
 * Mémentos de révision : la fiche « Révision générale : fiches, formules et
 * notions clés » du programme, une par matière.
 *
 * Chaque mémento condense l'essentiel à relire la veille de l'épreuve :
 * formules, définitions, méthodes et réflexes de vérification. Il est partagé
 * par toutes les filières qui suivent la matière.
 */
export const mementoLessons: LessonSeed[] = [
  {
    slug: "memento-informatique",
    subjectSlug: "informatique",
    title: "Mémento d'informatique : algorithmique, BDD et TIC",
    chapter: "Révision générale",
    summary:
      "Tout ce qu'il faut relire avant l'épreuve d'informatique : structures de données, tris, récursivité, SQL de base et notions réseau, en une page.",
    level: "Bac · 4e Sciences de l'informatique (REV)",
    durationMin: 25,
    orderIndex: 200,
    objectives: [
      "Réviser les structures de données et leurs opérations",
      "Retenir les complexités des algorithmes de tri",
      "Rappeler la syntaxe SQL indispensable",
      "Vérifier les notions TIC souvent demandées",
    ],
    blocks: [
      {
        type: "table",
        title: "Complexités à connaître",
        head: ["Algorithme", "Cas moyen", "Cas défavorable"],
        rows: [
          ["Recherche séquentielle", "n", "n"],
          ["Recherche dichotomique", "log n", "log n"],
          ["Tri à bulles / insertion", "n²", "n²"],
          ["Tri par sélection", "n²", "n²"],
          ["Tri rapide (quicksort)", "n log n", "n²"],
          ["Tri fusion", "n log n", "n log n"],
        ],
      },
      {
        type: "list",
        title: "Réflexes de programmation",
        items: [
          "Toute récursivité a besoin d'une condition d'arrêt : la vérifier en premier.",
          "Un parcours de tableau va de 1 à n ; un parcours de recherche s'arrête dès que la valeur est trouvée.",
          "Avant d'écrire une boucle, écrire l'invariant : ce qui est vrai avant et après chaque tour.",
          "Pour un tri, distinguer clairement la comparaison et l'échange.",
          "Un sous-programme qui modifie un paramètre doit le recevoir en variable, pas en valeur.",
        ],
      },
      {
        type: "table",
        title: "SQL : la syntaxe qui rapporte des points",
        head: ["Besoin", "Instruction"],
        rows: [
          ["Lire", "SELECT colonnes FROM table WHERE condition;"],
          ["Trier", "ORDER BY colonne ASC|DESC"],
          ["Regrouper", "GROUP BY colonne HAVING condition"],
          ["Agréger", "COUNT(*), SUM(), AVG(), MIN(), MAX()"],
          ["Joindre", "FROM a JOIN b ON a.cle = b.cle"],
          ["Écrire", "INSERT INTO t (c1, c2) VALUES (v1, v2);"],
          ["Modifier", "UPDATE t SET c = v WHERE condition;"],
          ["Supprimer", "DELETE FROM t WHERE condition;"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Les 10 notions TIC à citer correctement",
        text: "Modèle relationnel (clé primaire / étrangère), MCD, algèbre relationnelle, client/serveur, protocole, adresse IP et masque, DHCP, DNS, système d'exploitation, sécurité (mot de passe, chiffrement, sauvegarde).",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Erreurs qui coûtent le plus de points",
        text: "Oublier la condition d'arrêt d'une fonction récursive, confondre clé primaire et clé étrangère, écrire WHERE au lieu de HAVING après GROUP BY, et oublier de fermer un fichier (Close) en Pascal.",
      },
    ],
    keyPoints: [
      "Dichotomie : log n, mais tableau trié obligatoire.",
      "Récursivité = cas de base + appel récursif qui progresse.",
      "SQL : WHERE filtre les lignes, HAVING filtre les groupes.",
      "Clé primaire = identifiant unique ; clé étrangère = référence.",
    ],
    pitfalls: [
      "Écrire un tri sans échange réel des valeurs.",
      "Confondre moyenne pondérée et moyenne simple dans les statistiques de notes.",
      "Utiliser SELECT * dans une jointure sans condition.",
    ],
    flashcards: [
      {
        question: "Quelle est la complexité de la recherche dichotomique ?",
        answer: "O(log n), à condition que le tableau soit trié.",
      },
      {
        question: "Que filtre HAVING ?",
        answer: "Les groupes obtenus après GROUP BY, alors que WHERE filtre les lignes avant regroupement.",
      },
      {
        question: "Quelles sont les deux parties d'un algorithme récursif ?",
        answer: "Le cas de base (condition d'arrêt) et l'appel récursif sur un problème plus petit.",
      },
    ],
    tags: ["informatique", "mémento", "révision", "SQL", "algorithmique"],
  },
  {
    slug: "memento-mathematiques",
    subjectSlug: "mathematiques",
    title: "Mémento de mathématiques : formules et réflexes du bac",
    chapter: "Révision générale",
    summary:
      "Les formules d'analyse, d'algèbre, de probabilités et de géométrie à connaître par cœur, avec les réflexes de vérification qui sauvent une copie.",
    level: "Bac · Toutes sections scientifiques (REV)",
    durationMin: 30,
    orderIndex: 201,
    objectives: [
      "Réciter les dérivées et primitives usuelles",
      "Retrouver les formules de probabilités et de statistiques",
      "Utiliser les formules de géométrie de l'espace",
      "Adopter les réflexes de vérification",
    ],
    blocks: [
      {
        type: "table",
        title: "Dérivées et primitives usuelles",
        head: ["Fonction", "Dérivée", "Primitive"],
        rows: [
          ["xⁿ", "n·xⁿ⁻¹", "xⁿ⁺¹/(n+1)"],
          ["1/x", "−1/x²", "ln|x|"],
          ["√x", "1/(2√x)", "(2/3)x√x"],
          ["eˣ", "eˣ", "eˣ"],
          ["ln x", "1/x", "x ln x − x"],
          ["sin x", "cos x", "−cos x"],
          ["cos x", "−sin x", "sin x"],
          ["tan x", "1 + tan²x", "−ln|cos x|"],
        ],
      },
      {
        type: "table",
        title: "Analyse : les théorèmes du programme",
        head: ["Théorème", "Hypothèses", "Conclusion"],
        rows: [
          ["Valeurs intermédiaires", "f continue sur [a,b], k entre f(a) et f(b)", "∃ c : f(c) = k"],
          ["Rolle", "f continue, dérivable, f(a)=f(b)", "∃ c : f′(c)=0"],
          ["Accroissements finis", "f continue sur [a,b], dérivable sur ]a,b[", "∃ c : f′(c) = (f(b)−f(a))/(b−a)"],
          ["Bijection", "f continue et strictement monotone", "f réalise une bijection de I sur f(I)"],
        ],
      },
      {
        type: "table",
        title: "Probabilités et statistiques",
        head: ["Notion", "Formule"],
        rows: [
          ["Probabilité conditionnelle", "P(A|B) = P(A∩B)/P(B)"],
          ["Indépendance", "P(A∩B) = P(A)·P(B)"],
          ["Probabilités totales", "P(B) = Σ P(Aᵢ)·P(B|Aᵢ)"],
          ["Espérance", "E(X) = Σ xᵢ·P(X = xᵢ)"],
          ["Variance", "V(X) = E(X²) − (E(X))²"],
          ["Loi binomiale", "P(X=k) = C(n,k)·pᵏ·(1−p)ⁿ⁻ᵏ ; E(X)=np"],
          ["Corrélation", "r = cov(x,y)/(σx·σy)"],
        ],
      },
      {
        type: "table",
        title: "Géométrie de l'espace",
        head: ["Objet", "Formule"],
        rows: [
          ["Produit scalaire", "u·v = xx′ + yy′ + zz′"],
          ["Norme", "‖u‖ = √(x² + y² + z²)"],
          ["Produit vectoriel", "u ∧ v orthogonal à u et v, ‖u∧v‖ = ‖u‖‖v‖sin θ"],
          ["Distance point-plan", "|ax₀+by₀+cz₀+d| / √(a²+b²+c²)"],
          ["Sphère", "(x−a)² + (y−b)² + (z−c)² = R²"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Réflexes de vérification",
        text: "Une dérivée se vérifie en dérivant à nouveau ; une primitive en dérivant le résultat ; une solution d'équation en la reportant ; une limite en testant une valeur ; une probabilité en vérifiant que la somme des P(X = xᵢ) vaut 1.",
      },
    ],
    keyPoints: [
      "TVI : continuité + encadrement de k ⇒ existence d'une solution.",
      "TAF relie la pente de la corde et la dérivée en un point.",
      "P(A|B) ≠ P(B|A) : ne jamais inverser.",
      "La somme des probabilités d'une loi vaut 1 : contrôle immédiat.",
    ],
    pitfalls: [
      "Oublier l'hypothèse de continuité avant d'appliquer le TVI.",
      "Confondre variance et écart-type (l'écart-type est la racine).",
      "Utiliser la formule de distance sans valeur absolue.",
    ],
    flashcards: [
      {
        question: "Quelles hypothèses pour le théorème des valeurs intermédiaires ?",
        answer: "Continuité sur [a,b] et k compris entre f(a) et f(b).",
      },
      {
        question: "Formule de l'espérance d'une loi binomiale ?",
        answer: "E(X) = n·p et V(X) = n·p·(1−p).",
      },
      {
        question: "Comment vérifier une primitive ?",
        answer: "En la dérivant : on doit retrouver la fonction de départ.",
      },
    ],
    tags: ["maths", "mémento", "révision", "formules", "bac"],
  },
  {
    slug: "memento-physique",
    subjectSlug: "physique",
    title: "Mémento de physique : lois, unités et montages",
    chapter: "Révision générale",
    summary:
      "Les lois d'électricité, de mécanique, d'ondes et de physique nucléaire, les unités du système international et les montages à reconnaître en un coup d'œil.",
    level: "Bac · Sections scientifiques (REV)",
    durationMin: 28,
    orderIndex: 202,
    objectives: [
      "Restituer les lois fondamentales du programme",
      "Utiliser les bonnes unités SI",
      "Reconnaître un montage et son équation différentielle",
      "Éviter les erreurs de conversion",
    ],
    blocks: [
      {
        type: "table",
        title: "Électricité : les lois du programme",
        head: ["Grandeur", "Relation", "Unité"],
        rows: [
          ["Condensateur", "q = C·u ; i = C·du/dt", "F, V, A"],
          ["Bobine", "u = L·di/dt + r·i", "H"],
          ["Constante de temps RC", "τ = RC", "s"],
          ["Constante de temps RL", "τ = L/R", "s"],
          ["Période propre LC", "T₀ = 2π√(LC)", "s"],
          ["Puissance sinusoïdale", "P = U·I·cos φ", "W"],
          ["Valeur efficace", "U = Umax/√2", "V"],
        ],
      },
      {
        type: "table",
        title: "Mécanique et ondes",
        head: ["Loi", "Énoncé", "À vérifier"],
        rows: [
          ["Deuxième loi de Newton", "Σ F = m·a", "bilan des forces complet"],
          ["Énergie mécanique", "Em = Ec + Ep ; ΔEm = W(f)", "forces non conservatives"],
          ["Ondes : célérité", "v = λ/T = λ·f", "λ en m, f en Hz"],
          ["Ondes : retard", "τ = d/v", "d en m"],
          ["Diffraction", "θ ≈ λ/a", "a largeur de fente"],
        ],
      },
      {
        type: "table",
        title: "Physique nucléaire",
        head: ["Notion", "Relation", "Remarque"],
        rows: [
          ["Loi de décroissance", "N(t) = N₀·e^(−λt)", "λ en s⁻¹"],
          ["Demi-vie", "t½ = ln2/λ", "indépendante de N₀"],
          ["Activité", "A = λ·N", "en becquerel (Bq)"],
          ["Énergie de masse", "E = m·c²", "1 u = 931,5 MeV/c²"],
          ["Défaut de masse", "Δm = Z·mₚ + (A−Z)·mₙ − m(noyau)", "Δm > 0 pour un noyau stable"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Conversions qui font perdre des points",
        text: "1 nm = 10⁻⁹ m ; 1 µF = 10⁻⁶ F ; 1 mH = 10⁻³ H ; 1 eV = 1,6·10⁻¹⁹ J ; 1 MeV = 10⁶ eV. Écris toujours la conversion avant le calcul, jamais après.",
      },
    ],
    keyPoints: [
      "τ = RC pour le condensateur, τ = L/R pour la bobine.",
      "T₀ = 2π√(LC) pour l'oscillateur LC libre.",
      "A = λ·N relie activité et nombre de noyaux.",
      "ΔEm = W(f) : l'énergie mécanique diminue sous l'effet des frottements.",
    ],
    pitfalls: [
      "Mélanger les unités (mH et H, µF et F).",
      "Oublier le facteur √2 pour la valeur efficace.",
      "Confondre demi-vie et constante de temps.",
    ],
    flashcards: [
      {
        question: "Quelle est la période propre d'un circuit LC ?",
        answer: "T₀ = 2π√(LC).",
      },
      {
        question: "Quelle relation lie activité, constante radioactive et nombre de noyaux ?",
        answer: "A = λ·N, avec A en becquerel.",
      },
      {
        question: "Que vaut le rapport Umax/Uefficace ?",
        answer: "√2 : Umax = Ueff·√2.",
      },
    ],
    tags: ["physique", "mémento", "révision", "lois", "unités"],
  },
  {
    slug: "memento-philosophie",
    subjectSlug: "philosophie",
    title: "Mémento de philosophie : notions, repères et auteurs",
    chapter: "Révision générale",
    summary:
      "Une carte des notions du programme, des distinctions conceptuelles à ne pas confondre et des auteurs à citer à bon escient.",
    level: "Bac · Toutes sections (REV)",
    durationMin: 26,
    orderIndex: 203,
    objectives: [
      "Associer chaque notion à ses problèmes essentiels",
      "Distinguer les couples conceptuels du programme",
      "Citer correctement quelques auteurs majeurs",
      "Éviter le catalogue d'auteurs hors sujet",
    ],
    blocks: [
      {
        type: "table",
        title: "Couples conceptuels à distinguer",
        head: ["Couple", "Distinction à énoncer"],
        rows: [
          ["Ipséité / altérité", "le soi comme identité vécue vs l'autre comme condition de cette identité"],
          ["Conscient / inconscient", "savoir immédiat de soi vs déterminations non accessibles à la conscience"],
          ["Singulier / universel", "ce qui vaut pour un cas vs ce qui vaut pour tous"],
          ["Modèle / réel", "construction simplifiée vs phénomène tel qu'il se produit"],
          ["Légal / légitime", "conforme à la loi vs conforme à la justice"],
          ["Expliquer / comprendre", "établir des causes vs saisir un sens"],
        ],
      },
      {
        type: "table",
        title: "Auteurs à mobiliser (avec la thèse juste)",
        head: ["Auteur", "Thèse utilisable", "Notion"],
        rows: [
          ["Descartes", "le cogito : la conscience comme certitude première", "conscience"],
          ["Freud", "l'hypothèse de l'inconscient psychique", "inconscient"],
          ["Sartre", "l'existence précède l'essence ; autrui constitue le soi", "ipséité"],
          ["Levinas", "autrui comme visage, irréductible à un objet", "altérité"],
          ["Bachelard", "la science se construit contre les obstacles épistémologiques", "science"],
          ["Popper", "falsifiabilité : une théorie scientifique doit être réfutable", "science"],
          ["Kant", "la connaissance est conditionnée par les formes a priori", "connaissance"],
          ["Ricoeur", "identité narrative : le soi se raconte", "histoire / soi"],
        ],
      },
      {
        type: "list",
        title: "Structure d'une réponse philosophique",
        items: [
          "Analyser les termes du sujet : définir chaque notion avant d'argumenter.",
          "Formuler une problématique qui montre la tension, pas une question vague.",
          "Annoncer un plan progressif : thèse, objection, dépassement.",
          "Illustrer chaque argument par un exemple concret ou un auteur précis.",
          "Conclure en répondant explicitement au problème posé.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Le piège du nom propre",
        text: "Citer un auteur sans sa thèse ne rapporte rien et peut coûter : « comme le dit Kant » sans contenu est creux. Une citation doit être expliquée et reliée à l'argument en cours.",
      },
    ],
    keyPoints: [
      "Chaque notion se travaille par ses tensions, pas par sa définition seule.",
      "Les repères (légal/légitime, expliquer/comprendre) servent à problématiser.",
      "Un auteur = une thèse précise, pas un nom décoratif.",
      "La conclusion doit répondre à la problématique.",
    ],
    pitfalls: [
      "Réciter un cours sans lien avec le sujet.",
      "Confondre opinion et argumentation.",
      "Accumuler les exemples sans les analyser.",
    ],
    flashcards: [
      {
        question: "Que signifie « l'existence précède l'essence » chez Sartre ?",
        answer: "Que l'homme n'est pas défini d'avance : il se construit par ses choix et ses actes.",
      },
      {
        question: "Quel critère Popper retient-il pour démarquer science et non-science ?",
        answer: "La falsifiabilité : une théorie scientifique doit pouvoir être réfutée par l'expérience.",
      },
      {
        question: "Différence entre expliquer et comprendre ?",
        answer: "Expliquer, c'est établir des relations causales ; comprendre, c'est saisir un sens et une intention.",
      },
    ],
    tags: ["philosophie", "mémento", "révision", "notions", "auteurs"],
  },
  {
    slug: "memento-arabe",
    subjectSlug: "arabe",
    title: "خلاصة مراجعة العربية: مصطلحات، بلاغة وقواعد",
    chapter: "المراجعة العامة",
    summary:
      "أهم المصطلحات الأدبية والبلاغية والقواعد النحوية في صفحة واحدة، مع عبارات جاهزة للتحليل وبناء المقال.",
    level: "باك · جميع الشعب (REV)",
    durationMin: 24,
    orderIndex: 204,
    objectives: [
      "استحضار المصطلحات الأدبية والنقدية الأساسية",
      "التمييز بين الصور البلاغية وأثرها",
      "مراجعة القواعد النحوية الأكثر تكراراً في الامتحان",
      "الاستعداد لسؤال الإنشاء والتحليل",
    ],
    blocks: [
      {
        type: "table",
        title: "الصور البلاغية وأثرها",
        head: ["الصورة", "التعريف", "الأثر الغالب"],
        rows: [
          ["التشبيه", "مقارنة بين طرفين بأداة", "توضيح المعنى وتقريبه"],
          ["الاستعارة", "تشبيه حذف أحد طرفيه", "تقوية الدلالة وفتح التأويل"],
          ["الكناية", "لفظ يراد به لازم معناه", "التهذيب والاحتشام أو التمليح"],
          ["الطباق", "الجمع بين المتضادين", "إبراز التضاد وتقويته"],
          ["الجناس", "تشابه لفظين واختلاف معناهما", "إيقاع موسيقي ولفت الانتباه"],
          ["التكرار", "إعادة لفظ أو تركيب", "التوكيد وإثارة الانفعال"],
        ],
      },
      {
        type: "table",
        title: "مصطلحات نقدية لا تخلط بينها",
        head: ["المصطلح", "المعنى"],
        rows: [
          ["الرؤية السردية", "موقع الراوي من أحداث القصة"],
          ["الوحدة الدلالية", "مقطع من النص يقوم بفكرة واحدة"],
          ["الإيقاع", "الوزن والقافية والتكرار وما ينتج عنها من موسيقى"],
          ["الرمز", "عنصر يحمل دلالة تتجاوز معناه الحرفي"],
          ["الحجاج", "بناء النص على الحجج لإقناع المتلقي"],
        ],
      },
      {
        type: "table",
        title: "نحو: المنصوبات والمرفوعات",
        head: ["النوع", "الأمثلة", "العلامة"],
        rows: [
          ["مرفوعات", "المبتدأ، الخبر، الفاعل، نائب الفاعل", "الضمة (أو ما ينوب عنها)"],
          ["منصوبات", "المفعول به، المفعول المطلق، الحال، التمييز، خبر كان", "الفتحة (أو ما ينوب عنها)"],
          ["مجرورات", "المضاف إليه، الاسم بعد حرف جر", "الكسرة"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "عبارات جاهزة للتحليل",
        text: "«وظّف الشاعر…»، «يتجلى ذلك في قوله…»، «مما يدل على…»، «وقد أسهم ذلك في…»، «ومما يعزز هذا المعنى…». استعملها لتضمن الترابط وترفع من قيمة الإجابة.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "أخطاء متكررة في الامتحان",
        text: "إهمال الشاهد النصي، خلط الحال بالتمييز، الاكتفاء بتسمية الصورة دون بيان أثرها، وإغفال الفكرة العامة في المقدمة.",
      },
    ],
    keyPoints: [
      "لكل صورة بلاغية وظيفة يجب أن تذكرها.",
      "الحال هيئة، والتمييز رفع للإبهام.",
      "الرؤية السردية تحدد معرفة القارئ بالأحداث.",
      "كل حكم في التحليل يحتاج شاهداً.",
    ],
    pitfalls: [
      "ذكر الأدوات البلاغية دون تفسير.",
      "إهمال الإيقاع في النص الشعري.",
      "الخلط بين الاستعارة والكناية.",
    ],
    flashcards: [
      {
        question: "ما الفرق بين الاستعارة والكناية؟",
        answer: "الاستعارة تشبيه حُذف أحد طرفيه، والكناية لفظ يُراد به لازم معناه لا المعنى الحرفي.",
      },
      {
        question: "ما علامة إعراب جمع المذكر السالم في حالة النصب؟",
        answer: "الياء نيابة عن الفتحة.",
      },
      {
        question: "ما وظيفة الطباق؟",
        answer: "إبراز التضاد وتقوية المعنى وتوضيحه.",
      },
    ],
    tags: ["عربية", "خلاصة", "مراجعة", "بلاغة", "نحو"],
  },
  {
    slug: "memento-francais",
    subjectSlug: "francais",
    title: "Mémento de français : méthode, procédés et langue",
    chapter: "Révision générale",
    summary:
      "La boîte à outils du jour de l'épreuve : plan de dissertation et de commentaire, figures de style avec leur effet, et points de langue à contrôler.",
    level: "Bac · Toutes sections (REV)",
    durationMin: 26,
    orderIndex: 205,
    objectives: [
      "Retenir la structure des trois types d'exercices",
      "Identifier une figure et dire son effet",
      "Contrôler la langue en relecture",
      "Gérer le temps de composition",
    ],
    blocks: [
      {
        type: "table",
        title: "Trois exercices, trois plans",
        head: ["Exercice", "Plan", "Piège principal"],
        rows: [
          ["Commentaire composé", "2–3 axes thématiques + projet de lecture", "paraphraser ou suivre le texte ligne à ligne"],
          ["Dissertation", "thèse / antithèse / dépassement", "réciter des cours sans répondre au sujet"],
          ["Essai", "position claire + arguments + exemples", "absence de problématique"],
        ],
      },
      {
        type: "table",
        title: "Figures de style et effets",
        head: ["Figure", "Définition rapide", "Effet"],
        rows: [
          ["Comparaison", "rapprochement avec outil (comme, tel)", "clarifie, image concrète"],
          ["Métaphore", "comparaison sans outil", "condense une vision du monde"],
          ["Anaphore", "répétition en début de phrase", "insistance, rythme"],
          ["Hyperbole", "exagération", "intensifie l'émotion"],
          ["Antithèse", "opposition de deux idées", "met en valeur un contraste"],
          ["Personnification", "attribuer des traits humains", "anime le réel, crée l'empathie"],
          ["Ironie", "dire le contraire de ce qu'on pense", "dénonce en amusant"],
        ],
      },
      {
        type: "list",
        title: "Relecture en cinq contrôles",
        items: [
          "Accords sujet-verbe et participe passé.",
          "Homophones : a/à, ou/où, ce/se, leur/leurs.",
          "Ponctuation des subordonnées et des citations.",
          "Cohérence des temps dans un même paragraphe.",
          "Présence d'une phrase de réponse dans la conclusion.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Gestion du temps (3 h)",
        text: "20 min de lecture et notes, 20 min de plan, 1 h 30 de rédaction, 30 min de relecture et d'amélioration. Ne jamais rédiger sans plan : c'est la première cause de hors-sujet.",
      },
    ],
    keyPoints: [
      "Chaque exercice a son plan type : le confondre coûte cher.",
      "Une figure se nomme puis s'interprète.",
      "La conclusion répond, elle ne résume pas seulement.",
      "La relecture ciblée par catégories est plus efficace.",
    ],
    pitfalls: [
      "Oublier de citer entre guillemets.",
      "Mélanger récit au passé simple et présent dans une même phrase.",
      "Confondre auteur, narrateur et personnage.",
    ],
    flashcards: [
      {
        question: "Quel est le plan type de la dissertation ?",
        answer: "Thèse, antithèse, dépassement — chacun appuyé sur des exemples littéraires précis.",
      },
      {
        question: "Que doit-on faire après avoir nommé une figure ?",
        answer: "Expliquer son effet sur le sens et sur le lecteur.",
      },
      {
        question: "Quelle est la différence entre métaphore et comparaison ?",
        answer: "La comparaison utilise un outil de comparaison, la métaphore s'en passe.",
      },
    ],
    tags: ["français", "mémento", "révision", "méthode", "figures"],
  },
  {
    slug: "memento-anglais",
    subjectSlug: "anglais",
    title: "English memento: tenses, linkers and exam routine",
    chapter: "Revision",
    summary:
      "Tout l'essentiel de l'épreuve d'anglais en une fiche : temps, connecteurs, formules d'écrit et routine de vérification.",
    level: "Bac · Toutes sections (REV)",
    durationMin: 22,
    orderIndex: 206,
    objectives: [
      "Choisir le bon temps en contexte",
      "Employer les connecteurs logiques",
      "Réutiliser les formules d'introduction et de conclusion",
      "Relire efficacement en cinq contrôles",
    ],
    blocks: [
      {
        type: "table",
        title: "Time markers and tenses",
        head: ["Marker", "Tense", "Example"],
        rows: [
          ["every day, usually", "present simple", "She studies every day."],
          ["now, at the moment", "present continuous", "They are revising now."],
          ["yesterday, in 2010, ago", "past simple", "He passed the exam in 2010."],
          ["since, for, ever, never", "present perfect", "I have lived here since 2019."],
          ["before, after (past reference)", "past perfect", "She had left before I arrived."],
          ["tomorrow, next week", "future (will / be going to)", "We will start tomorrow."],
        ],
      },
      {
        type: "table",
        title: "Linkers that earn marks",
        head: ["Function", "Linkers"],
        rows: [
          ["Addition", "moreover, in addition, furthermore"],
          ["Contrast", "however, on the other hand, although, whereas"],
          ["Cause", "because, since, due to"],
          ["Consequence", "therefore, as a result, consequently"],
          ["Example", "for instance, such as, namely"],
          ["Conclusion", "to sum up, in conclusion, all in all"],
        ],
      },
      {
        type: "list",
        title: "Formulas to reuse",
        items: [
          "Introduction: « Nowadays, it is often argued that… » / « In my opinion, … »",
          "Body: « First of all, … For instance, … » / « Moreover, … »",
          "Nuance: « Admittedly, … However, … »",
          "Conclusion: « To sum up, … It is therefore essential to … »",
          "Formal email: « I am writing to apply for… / I look forward to hearing from you. »",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Five-minute check before handing in",
        text: "1) third person -s ; 2) irregular past forms ; 3) articles before singular nouns ; 4) preposition after the verb (depend on, listen to) ; 5) word count close to the required length.",
      },
    ],
    keyPoints: [
      "The time marker decides the tense.",
      "Present perfect with since / for, never with a finished date.",
      "Linkers make coherence visible to the examiner.",
      "Reformulate instead of copying the text.",
    ],
    pitfalls: [
      "Using the past simple with 'since'.",
      "Forgetting the -s in the third person.",
      "Writing informal emails when a formal register is required.",
    ],
    flashcards: [
      {
        question: "Which tense goes with 'since 2019'?",
        answer: "The present perfect: I have lived here since 2019.",
      },
      {
        question: "Give three linkers of contrast.",
        answer: "However, on the other hand, whereas.",
      },
      {
        question: "How do you end a formal email you started with 'Dear Sir or Madam'?",
        answer: "With 'Yours faithfully'.",
      },
    ],
    tags: ["anglais", "memento", "revision", "tenses", "linkers"],
  },
];
