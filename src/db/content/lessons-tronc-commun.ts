import type { LessonSeed } from "@/db/content/lessons-sciences";

/**
 * Fiches de tronc commun communes à toutes les filières : langue arabe
 * (الشعر الحديث), français (le roman et sa langue), anglais (vocabulaire et
 * grammaire) ainsi que les compléments TIC du programme d'informatique
 * (système d'exploitation, réseaux, fichiers).
 */
export const troncCommunLessons: LessonSeed[] = [
  {
    slug: "info-systemes-exploitation",
    subjectSlug: "informatique",
    title: "Systèmes d'exploitation et architecture matérielle",
    chapter: "TIC · Système et machine",
    summary:
      "Comprendre comment un ordinateur exécute un programme : rôle du processeur, de la mémoire, des périphériques et du système d'exploitation qui coordonne le tout.",
    level: "Bac · 4e Sciences de l'informatique (T1)",
    durationMin: 24,
    orderIndex: 100,
    objectives: [
      "Décrire l'architecture de von Neumann (UC, mémoire, entrées/sorties)",
      "Distinguer mémoire vive, mémoire morte et stockage",
      "Énoncer les fonctions d'un système d'exploitation",
      "Expliquer la notion de processus et d'ordonnancement",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Le modèle de von Neumann",
        text: "Un ordinateur est organisé autour de la mémoire centrale, où sont rangés à la fois les programmes et les données. L'unité centrale (processeur) lit les instructions, les décode et les exécute ; les périphériques assurent les entrées et les sorties. Ce choix — programme et données dans la même mémoire — est ce qui rend l'ordinateur programmable.",
      },
      {
        type: "table",
        title: "Les composants et leur rôle",
        head: ["Composant", "Rôle", "Caractéristique clé"],
        rows: [
          ["Processeur (UC)", "exécute les instructions", "fréquence en GHz, nombre de cœurs"],
          ["Mémoire vive (RAM)", "stocke programme et données en cours", "volatile, rapide"],
          ["Mémoire morte (ROM)", "contient le programme d'amorçage", "non volatile, en lecture seule"],
          ["Disque / SSD", "stockage permanent", "capacité, temps d'accès plus lent"],
          ["Bus", "transport des données", "largeur en bits"],
          ["Périphériques", "entrées et sorties", "pilotés par des pilotes"],
        ],
      },
      {
        type: "list",
        title: "Les fonctions d'un système d'exploitation",
        items: [
          "Gérer les processus : lancer, suspendre, ordonnancer, terminer.",
          "Gérer la mémoire : allouer et libérer l'espace aux programmes.",
          "Gérer les fichiers et les répertoires (arborescence, droits).",
          "Gérer les périphériques par des pilotes.",
          "Offrir une interface : ligne de commande ou interface graphique.",
          "Assurer la sécurité : comptes, mots de passe, permissions.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Vocabulaire à réutiliser en devoir",
        text: "Processus = programme en cours d'exécution. Ordonnanceur = composant qui choisit quel processus utilise le processeur. Temps partagé = les processus se succèdent si vite qu'ils semblent simultanés (à distinguer du parallélisme réel sur plusieurs cœurs).",
      },
    ],
    keyPoints: [
      "Programme et données partagent la même mémoire (von Neumann).",
      "La RAM est volatile, le disque est permanent.",
      "Le système d'exploitation est un gestionnaire de ressources.",
      "Un processus est un programme en exécution.",
    ],
    pitfalls: [
      "Confondre mémoire vive et espace de stockage.",
      "Décrire le processeur comme exécutant les opérations arithmétiques seules.",
      "Oublier le rôle des pilotes de périphériques.",
    ],
    flashcards: [
      {
        question: "Quelle est la différence entre RAM et ROM ?",
        answer: "La RAM est volatile et modifiable (programmes en cours), la ROM est non volatile et en lecture seule (amorçage).",
      },
      {
        question: "Cite trois fonctions du système d'exploitation.",
        answer: "Gestion des processus, gestion de la mémoire, gestion des fichiers et des périphériques.",
      },
      {
        question: "Qu'est-ce qu'un processus ?",
        answer: "Un programme en cours d'exécution, avec son propre espace mémoire et son état.",
      },
    ],
    tags: ["informatique", "système d'exploitation", "architecture", "processus", "TIC"],
  },
  {
    slug: "info-reseaux",
    subjectSlug: "informatique",
    title: "Réseaux informatiques : topologies, adressage et services",
    chapter: "TIC · Réseaux",
    summary:
      "Comprendre comment des machines communiquent : topologies, modèle client/serveur, adressage IP et services d'un réseau local.",
    level: "Bac · 4e Sciences de l'informatique (T2)",
    durationMin: 26,
    orderIndex: 101,
    objectives: [
      "Distinguer les topologies en bus, en étoile et en anneau",
      "Expliquer le modèle client/serveur",
      "Lire une adresse IP et un masque de sous-réseau",
      "Identifier les services d'un réseau (partage, web, messagerie)",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Un réseau, c'est un accord de communication",
        text: "Deux machines ne communiquent que si elles partagent un support physique et des règles logicielles : les protocoles. Le modèle en couches sépare le support (câble, Wi-Fi), l'adressage (IP) et les applications (web, messagerie). Cette séparation explique pourquoi un navigateur fonctionne indifféremment en Wi-Fi ou en câble.",
      },
      {
        type: "table",
        title: "Topologies comparées",
        head: ["Topologie", "Avantage", "Inconvénient"],
        rows: [
          ["Bus", "câblage simple et économique", "une coupure du bus paralyse tout"],
          ["Étoile", "panne d'une machine sans effet sur les autres", "dépendance au commutateur central"],
          ["Anneau", "circulation régulière des données", "une rupture casse la boucle"],
          ["Maillée", "grande fiabilité par chemins multiples", "coût de câblage élevé"],
        ],
      },
      {
        type: "table",
        title: "Adressage IPv4 : ce qu'il faut lire",
        head: ["Notion", "Exemple", "Signification"],
        rows: [
          ["Adresse IP", "192.168.1.10", "identifiant d'une machine sur le réseau"],
          ["Masque", "255.255.255.0", "taille du réseau (ici /24)"],
          ["Adresse réseau", "192.168.1.0", "identifie le réseau lui-même"],
          ["Passerelle", "192.168.1.1", "routeur vers l'extérieur"],
          ["DHCP", "—", "attribue automatiquement les adresses"],
          ["DNS", "—", "traduit un nom de domaine en adresse IP"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Deux confusions fréquentes",
        text: "Le nombre d'adresses d'un réseau /24 est 254 utilisables (256 moins l'adresse réseau et la diffusion). Et le serveur ne « crée » pas la ressource : il la met à disposition des clients qui en font la demande.",
      },
    ],
    keyPoints: [
      "Un protocole est un ensemble de règles de communication.",
      "La topologie en étoile est la plus répandue aujourd'hui.",
      "Le masque détermine la taille du réseau.",
      "DNS traduit les noms, DHCP attribue les adresses.",
    ],
    pitfalls: [
      "Confondre adresse IP et adresse MAC.",
      "Oublier que l'adresse réseau et la diffusion ne sont pas attribuables.",
      "Décrire le modèle pair-à-pair comme un modèle client/serveur.",
    ],
    flashcards: [
      {
        question: "Quel service attribue automatiquement les adresses IP ?",
        answer: "Le service DHCP.",
      },
      {
        question: "À quoi sert le DNS ?",
        answer: "À traduire un nom de domaine lisible par l'humain en adresse IP.",
      },
      {
        question: "Quel est le principal avantage de la topologie en étoile ?",
        answer: "La panne d'un poste n'affecte pas les autres, isolant facilement l'incident.",
      },
    ],
    tags: ["informatique", "réseaux", "IP", "topologie", "TIC"],
  },
  {
    slug: "info-fichiers-typed",
    subjectSlug: "informatique",
    title: "Fichiers texte, fichiers typés et mise à jour",
    chapter: "Algorithmique · Fichiers",
    summary:
      "Créer, lire, mettre à jour et trier un fichier en Pascal : différence entre fichier texte et fichier typé, modes d'ouverture et gestion de fin de fichier.",
    level: "Bac · 4e Sciences de l'informatique (T1)",
    durationMin: 26,
    orderIndex: 102,
    objectives: [
      "Choisir entre fichier texte et fichier typé",
      "Ouvrir un fichier dans le bon mode (reset, rewrite, append)",
      "Parcourir un fichier jusqu'à la fin avec EOF",
      "Mettre à jour un enregistrement dans un fichier typé",
    ],
    blocks: [
      {
        type: "table",
        title: "Deux familles de fichiers",
        head: ["Type", "Contenu", "Accès", "Usage"],
        rows: [
          ["Fichier texte", "caractères lisibles (lignes)", "séquentiel", "échanges, journaux, CSV"],
          ["Fichier typé", "enregistrements binaires", "direct possible (seek)", "bases simples, mises à jour"],
        ],
      },
      {
        type: "steps",
        title: "Le cycle de vie d'un fichier",
        items: [
          "Associer : Assign(f, nom) — déclarer la variable fichier.",
          "Créer/écraser : Rewrite(f) ; ou ouvrir en lecture : Reset(f) ; ou ajouter : Append(f) pour un fichier texte.",
          "Traiter : lire (Read/ReadLn ou Read(f, enreg)) ou écrire (Write/WriteLn).",
          "Fermer : Close(f) — indispensable pour vider le tampon et enregistrer les modifications.",
        ],
      },
      {
        type: "list",
        title: "Squelette à retenir (Pascal)",
        items: [
          "Assign(f, 'eleves.dat') ; Reset(f) ;",
          "while not Eof(f) do  →  Read(f, e) pour lire l'enregistrement courant.",
          "Pour modifier l'enregistrement : Seek(f, FilePos(f) - 1) puis Write(f, e).",
          "Toujours terminer par Close(f) pour valider les écritures.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Les deux erreurs qui coûtent le plus",
        text: "Oublier Close(f) : les dernières écritures peuvent être perdues. Et oublier de revenir en arrière avec Seek après une lecture quand on veut réécrire l'enregistrement courant.",
      },
    ],
    keyPoints: [
      "Fichier texte = séquentiel et lisible ; fichier typé = enregistrements et accès direct.",
      "Rewrite crée, Reset ouvre en lecture, Append ajoute en fin de fichier.",
      "Eof(f) teste la fin de fichier.",
      "Close(f) est obligatoire pour valider les écritures.",
    ],
    pitfalls: [
      "Utiliser Rewrite sur un fichier qu'on voulait conserver.",
      "Oublier Close en fin de traitement.",
      "Écrire dans un fichier ouvert en lecture.",
    ],
    flashcards: [
      {
        question: "Quelle procédure crée ou écrase un fichier ?",
        answer: "Rewrite(f).",
      },
      {
        question: "Comment tester la fin d'un fichier ?",
        answer: "Avec la fonction Eof(f), qui renvoie vrai quand le pointeur a atteint la fin.",
      },
      {
        question: "Quel est l'intérêt d'un fichier typé ?",
        answer: "Il permet un accès direct aux enregistrements (FilePos, Seek), donc une mise à jour ciblée.",
      },
    ],
    tags: ["informatique", "fichiers", "Pascal", "enregistrements", "Eof"],
  },
  {
    slug: "arabe-tajdid",
    subjectSlug: "arabe",
    title: "الشعر العربي الحديث بين التجديد والكلاسيكية",
    chapter: "الشعر · حركات التجديد",
    summary:
      "التعرف على مظاهر التجديد في الشعر العربي الحديث (الرومانسية، الشعر الحر، قصيدة النثر) وعلاقتها بالكلاسيكية، مع منهجية تحليل نص شعري حديث.",
    level: "باك · جميع الشعب (T1)",
    durationMin: 30,
    orderIndex: 7,
    objectives: [
      "التمييز بين الكلاسيكية والرومانسية والحساسية الجديدة",
      "تحديد مظاهر التجديد في الشكل والمضمون",
      "تحليل نص شعري حديث وفق منهجية منظمة",
      "ربط النص بسياقه التاريخي والاجتماعي",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "لماذا التجديد؟",
        text: "خرج الشعر العربي في القرن العشرين من دائرة المدح والرثاء إلى التعبير عن الذات والمجتمع. لكن التجديد لم يكن قطيعة كاملة: الشعر الحديث ورث عمود الشعر العربي (الوزن والقافية واللغة الفصيحة) وأضاف إليه الشكل الحر، والصور المتحركة، والموضوعات الاجتماعية والنفسية. لذلك نتحدث عن «تجديد» لا عن «انقطاع».",
      },
      {
        type: "table",
        title: "المقارنة بين الاتجاهين",
        head: ["المعيار", "الكلاسيكية", "الرومانسية / التجديد"],
        rows: [
          ["الشكل", "العمودي بوحدة الوزن والقافية", "تنويع في الوزن، شعر حر، أسطر شعرية"],
          ["المعجم", "جزل، فخم، معجم التراث", "لغة سهلة، مفردات الحياة اليومية"],
          ["الموضوع", "المدح، الرثاء، الفخر، الحكمة", "الذات، الحب، الطبيعة، المجتمع، الاغتراب"],
          ["الصورة", "تشبيه محكم واضح", "صورة مركبة، رمز، أسطورة"],
          ["العلاقة بالقارئ", "الإمتاع والإقناع", "المشاركة الوجدانية والتأويل"],
        ],
      },
      {
        type: "steps",
        title: "منهجية تحليل قصيدة حديثة",
        items: [
          "تحديد الموضوع والاتجاه الشعري (رومانسي، واقعي، حر).",
          "تقسيم القصيدة إلى وحدات دلالية وشرح كل وحدة بالاعتماد على الشواهد.",
          "تحليل الصور: تشبيه، استعارة، رمز، وبيان أثرها الوجداني.",
          "دراسة الإيقاع: الوزن، القافية، التكرار، توازي التراكيب.",
          "استخلاص دلالة القصيدة وربطها بموقف الشاعر وقضايا عصره.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "مفتاح الإجابة الجيدة",
        text: "لا تسأل «ما نوع الصورة؟» فقط، بل «لماذا اختار الشاعر هذه الصورة؟» كل عنصر جمالي له وظيفة: التعبير عن الحيرة، عن الثورة، عن الأمل... ابحث عن الوظيفة دائماً.",
      },
    ],
    keyPoints: [
      "التجديد جاء في الشكل والموضوع والصورة معاً.",
      "الرومانسية أرست قيم الذات والطبيعة والوجدان.",
      "الشعر الحر حرّر القصيدة من وحدة البيت والقافية.",
      "التحليل يحتاج شاهداً ووظيفة لكل صورة.",
    ],
    pitfalls: [
      "إصدار حكم قيمي دون تحليل.",
      "الاكتفاء بتلخيص مضمون القصيدة.",
      "الخلط بين شعر التفعيلة وقصيدة النثر.",
    ],
    flashcards: [
      {
        question: "ما أهم مظاهر التجديد في الشعر الحديث؟",
        answer: "تحرير الشكل من وحدة البيت والقافية، تجديد الموضوعات، واستعمال الصورة والرمز",
      },
      {
        question: "ما الفرق بين الشعر الحر وقصيدة النثر؟",
        answer: "الشعر الحر يحافظ على التفعيلة ويحرر القافية، أما قصيدة النثر فتلغي الوزن وتعتمد على الإيقاع الداخلي.",
      },
      {
        question: "ما وظيفة الرمز في القصيدة الحديثة؟",
        answer: "تكثيف الدلالة وفتح النص على التأويل، وتحميل الصورة أبعاداً وجدانية وفكرية.",
      },
    ],
    tags: ["عربية", "شعر حديث", "رومانسية", "تجديد", "تحليل"],
  },
  {
    slug: "francais-roman-theme-oeuvre",
    subjectSlug: "francais",
    title: "Thèmes, contexte et portée d'une œuvre romanesque",
    chapter: "Littérature · L'œuvre intégrale",
    summary:
      "Étudier une œuvre romanesque dans son ensemble : dégager les thèmes, situer le contexte historique et social, et mesurer la portée de l'œuvre.",
    level: "Bac · Toutes sections (T2)",
    durationMin: 26,
    orderIndex: 5,
    objectives: [
      "Dégager les thèmes majeurs d'une œuvre romanesque",
      "Situer l'œuvre dans son contexte historique et social",
      "Relier les personnages aux valeurs de l'époque",
      "Formuler la portée de l'œuvre",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "De l'anecdote à la portée",
        text: "Une œuvre romanesque n'est jamais une simple histoire : elle porte une vision du monde. Passer du résumé à l'analyse, c'est identifier les thèmes (amour, guerre, injustice, ascension sociale...) puis montrer comment l'œuvre les traite et ce qu'elle en dit. Le contexte n'est pas un décor : il explique les conflits des personnages.",
      },
      {
        type: "table",
        title: "Grille d'étude d'une œuvre",
        head: ["Entrée", "Questions à se poser", "Ce que tu produis"],
        rows: [
          ["Thèmes", "De quoi parle l'œuvre ? quels motifs reviennent ?", "3 à 4 thèmes avec exemples précis"],
          ["Contexte", "Quand et où ? quels événements éclairent le récit ?", "une fiche chronologique courte"],
          ["Personnages", "quels types ? quels rapports de force ?", "portraits croisés et fonctions"],
          ["Narration", "qui raconte ? quel point de vue ?", "effet produit sur le lecteur"],
          ["Portée", "que dit l'œuvre du monde ?", "une thèse en une phrase"],
        ],
      },
      {
        type: "steps",
        title: "Méthode — préparer une question d'ensemble",
        items: [
          "Choisir une scène ou un personnage comme point d'appui.",
          "Le relier à un thème de l'œuvre.",
          "Mettre ce thème en relation avec le contexte historique ou social.",
          "Conclure sur ce que l'œuvre affirme à travers ce thème.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Piège de l'oral et de l'écrit",
        text: "Réciter le résumé sans analyser coûte des points. On attend une lecture personnelle appuyée sur des références précises (chapitre, scène, réplique), pas une fiche de lecture apprise par cœur.",
      },
    ],
    keyPoints: [
      "Les thèmes doivent être illustrés par des exemples précis.",
      "Le contexte éclaire les conflits du récit.",
      "La portée est une thèse, pas un résumé.",
      "Toujours partir du texte pour aller vers l'interprétation.",
    ],
    pitfalls: [
      "Confondre thème et résumé.",
      "Oublier de relier l'œuvre à son contexte.",
      "Citer sans indiquer où la citation apparaît.",
    ],
    flashcards: [
      {
        question: "Quelle différence entre thème et portée ?",
        answer: "Le thème est le sujet traité (la guerre), la portée est ce que l'œuvre en dit (la guerre détruit aussi les vainqueurs).",
      },
      {
        question: "Comment utiliser le contexte dans une analyse ?",
        answer: "En montrant comment les événements historiques ou sociaux expliquent les conflits et les choix des personnages.",
      },
      {
        question: "Que doit éviter une fiche de lecture ?",
        answer: "Le résumé sans analyse et les citations sans localisation précise.",
      },
    ],
    tags: ["français", "roman", "thèmes", "contexte", "portée"],
  },
  {
    slug: "francais-langue-normes",
    subjectSlug: "francais",
    title: "Grammaire, conjugaison et lexique au service du sens",
    chapter: "Langue · Normes et usage",
    summary:
      "Maîtriser les accords, les temps du récit et les procédés lexicaux : le moyen le plus sûr de gagner des points dans toutes les épreuves de français.",
    level: "Bac · Toutes sections (T2)",
    durationMin: 24,
    orderIndex: 6,
    objectives: [
      "Appliquer les règles d'accord (sujet-verbe, participe passé)",
      "Choisir les temps du récit et du discours",
      "Analyser un champ lexical et un niveau de langue",
      "Corriger les fautes les plus fréquentes en devoir",
    ],
    blocks: [
      {
        type: "table",
        title: "Les temps du récit et du discours",
        head: ["Temps", "Emploi", "Repère"],
        rows: [
          ["Passé simple", "actions de premier plan, récit écrit", "il marcha, il vit"],
          ["Imparfait", "description, décor, habitude", "il marchait, il voyait"],
          ["Plus-que-parfait", "action antérieure à une autre action", "il avait vu"],
          ["Présent de narration", "rendre une scène vivante", "il marche et voit"],
          ["Passé composé", "récit oral ou discours", "il a vu"],
        ],
      },
      {
        type: "list",
        title: "Les cinq fautes les plus coûteuses",
        items: [
          "Accord du participe passé avec être (elle est partie) et avec avoir + COD placé avant (les fleurs qu'il a cueillies).",
          "Accord sujet-verbe quand le sujet est inversé ou éloigné (les élèves, fatigués, rentrent).",
          "Confusion a/à, ou/où, ce/se, leur/leurs.",
          "Mélange des temps dans une même phrase.",
          "Oubli de la ponctuation des subordonnées (virgule avant « qui » relative explicative).",
        ],
      },
      {
        type: "steps",
        title: "Méthode — analyser le lexique dans un texte",
        items: [
          "Repérer un champ lexical dominant : relève trois ou quatre mots du même domaine.",
          "Vérifier le niveau de langue : soutenu, courant, familier.",
          "Observer les procédés : synonymie, antonymie,hyperbole, suffixes péjoratifs.",
          "Interpréter : quel effet produit ce choix lexical sur le sens et le ton du texte ?",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Truc de relecture",
        text: "Relis ton devoir en cherchant uniquement les verbes : tu repéreras presque tous les accords fautifs. Une seconde relecture dédiée aux homophones (a/à, ce/se) complète le travail.",
      },
    ],
    keyPoints: [
      "Passé simple = premier plan, imparfait = décor.",
      "Le participe passé s'accorde selon l'auxiliaire et la place du COD.",
      "Un champ lexical se relève puis s'interprète.",
      "Relire par catégories (verbes, homophones) est plus efficace.",
    ],
    pitfalls: [
      "Accorder le participe passé avec avoir quand le COD suit.",
      "Changer de temps au milieu d'une phrase.",
      "Analyser le lexique sans interprétation.",
    ],
    flashcards: [
      {
        question: "Quand le participe passé avec avoir s'accorde-t-il ?",
        answer: "Quand le COD est placé avant l'auxiliaire : « les lettres qu'il a écrites ».",
      },
      {
        question: "Quel temps pour décrire le décor ?",
        answer: "L'imparfait.",
      },
      {
        question: "Comment interpréter un champ lexical ?",
        answer: "En montrant l'effet produit : ambiance, thème dominant, jugement de l'auteur.",
      },
    ],
    tags: ["français", "grammaire", "conjugaison", "lexique", "langue"],
  },
  {
    slug: "english-vocabulary-building",
    subjectSlug: "anglais",
    title: "Vocabulary building: education, science and society",
    chapter: "Language · Vocabulary",
    summary:
      "Constituer un vocabulaire thématique solide (education, science, environment, society) et l'employer dans des phrases justes au bac.",
    level: "Bac · Toutes sections (T2)",
    durationMin: 22,
    orderIndex: 4,
    objectives: [
      "Mémoriser les mots-clés des thèmes du programme",
      "Former des familles de mots (nom, verbe, adjectif)",
      "Employer les collocations correctes",
      "Éviter les faux amis les plus fréquents",
    ],
    blocks: [
      {
        type: "table",
        title: "Thematic word banks",
        head: ["Theme", "Key nouns", "Key verbs"],
        rows: [
          ["Education", "curriculum, tuition, scholarship, literacy", "to enrol, to graduate, to drop out"],
          ["Science", "research, experiment, breakthrough, data", "to carry out, to prove, to test"],
          ["Environment", "pollution, waste, drought, renewable energy", "to reduce, to recycle, to preserve"],
          ["Society", "inequality, poverty, employment, community", "to tackle, to support, to raise awareness"],
        ],
      },
      {
        type: "table",
        title: "False friends and collocations",
        head: ["Wrong", "Right", "Why"],
        rows: [
          ["I am agree", "I agree", "agree is a verb, not an adjective"],
          ["make a mistake / do a mistake", "make a mistake", "collocation with make"],
          ["informations", "information", "uncountable noun"],
          ["actually (= currently)", "currently / at the moment", "actually means 'in fact'"],
          ["to assist at", "to attend", "assist means to help"],
        ],
      },
      {
        type: "steps",
        title: "How to learn vocabulary that stays",
        items: [
          "Learn words in families: employ → employment → employer → employee.",
          "Learn the word inside a sentence you could actually write in an essay.",
          "Review with spaced repetition: day 1, day 3, day 7.",
          "Reuse each new word at least once in a written paragraph.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Vocabulary without grammar loses marks",
        text: "A rich word used in a wrong structure (a singular verb with a plural subject, a missing article) is still an error. Learn the word with its grammar: countable or not, which preposition follows it.",
      },
    ],
    keyPoints: [
      "Learn words in families, not in isolation.",
      "Collocations matter as much as single words.",
      "Watch out for uncountable nouns (information, advice, research).",
      "Reuse vocabulary in writing to fix it.",
    ],
    pitfalls: [
      "Translating word for word from Arabic or French.",
      "Using 'actually' for 'currently'.",
      "Forgetting the article before a singular countable noun.",
    ],
    flashcards: [
      {
        question: "Which preposition follows 'depend'?",
        answer: "On: it depends on the weather.",
      },
      {
        question: "Is 'research' countable?",
        answer: "Usually uncountable: 'some research', 'a piece of research'.",
      },
      {
        question: "Give the family of 'employ'.",
        answer: "employ, employment, employer, employee, unemployed, unemployment.",
      },
    ],
    tags: ["anglais", "vocabulary", "education", "science", "society"],
  },
  {
    slug: "english-grammar-context",
    subjectSlug: "anglais",
    title: "Grammar in context: tenses, modals, conditionals and reported speech",
    chapter: "Language · Grammar",
    summary:
      "Réviser les quatre points de grammaire les plus testés au bac : temps, modaux, conditionnels et discours rapporté, avec des phrases modèles.",
    level: "Bac · Toutes sections (T3)",
    durationMin: 26,
    orderIndex: 5,
    objectives: [
      "Choisir le temps correct selon le contexte",
      "Employer les modaux selon le degré de certitude ou d'obligation",
      "Construire les trois conditionnels",
      "Passer du discours direct au discours indirect",
    ],
    blocks: [
      {
        type: "table",
        title: "Modals and what they express",
        head: ["Modal", "Meaning", "Example"],
        rows: [
          ["must", "strong obligation / logical certainty", "You must wear a helmet. He must be tired."],
          ["should", "advice", "You should revise every day."],
          ["may / might", "possibility", "It may rain tomorrow."],
          ["can / could", "ability / permission / polite request", "Could you help me?"],
          ["needn't", "absence of obligation", "You needn't come early."],
          ["mustn't", "prohibition", "You mustn't smoke here."],
        ],
      },
      {
        type: "table",
        title: "The three conditionals",
        head: ["Type", "Form", "Example"],
        rows: [
          ["First", "if + present, will + verb", "If you study, you will pass."],
          ["Second", "if + past, would + verb", "If I had time, I would travel."],
          ["Third", "if + had + V-ed, would have + V-ed", "If he had revised, he would have passed."],
        ],
      },
      {
        type: "steps",
        title: "Reported speech in three shifts",
        items: [
          "Shift the tense back one step: present → past, past → past perfect, will → would.",
          "Change the pronouns and time markers: today → that day, tomorrow → the next day, here → there.",
          "Adapt the reporting verb: say (no object), tell + person, ask for questions, advise / warn / remind.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Sentence pattern that works in writing",
        text: "« If governments invested more in education, young people would have better opportunities. » One conditional + one modal is enough to show control, and it fits almost any bac topic.",
      },
    ],
    keyPoints: [
      "Choose the tense from the time marker, not from the translation.",
      "must = obligation, mustn't = prohibition, needn't = no obligation.",
      "Third conditional describes an unreal past.",
      "Reported speech shifts tense, pronouns and time markers.",
    ],
    pitfalls: [
      "Using 'will' after 'if' in the first conditional clause.",
      "Confusing mustn't and needn't.",
      "Forgetting the tense shift in reported speech.",
    ],
    flashcards: [
      {
        question: "What is the difference between mustn't and needn't?",
        answer: "mustn't = it is forbidden; needn't = it is not necessary.",
      },
      {
        question: "Give the third conditional form.",
        answer: "If + had + past participle, would have + past participle.",
      },
      {
        question: "How does 'tomorrow' change in reported speech?",
        answer: "It becomes 'the next day' (or 'the following day').",
      },
    ],
    tags: ["anglais", "grammar", "modals", "conditionals", "reported speech"],
  },
];
