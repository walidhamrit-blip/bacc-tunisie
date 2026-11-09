/**
 * Architecture de navigation unique de l'application.
 *
 * Principe : peu de liens visibles en permanence (les 4 gestes d'étude),
 * et toutes les rubriques rangées dans 3 groupes clairs, accessibles depuis
 * le menu principal, la page d'accueil et le pied de page.
 * Ce fichier est la source de vérité : toute nouvelle rubrique s'ajoute ici.
 */

export type NavItem = {
  href: string;
  label: string;
  /** Courte précision en langage clair (utile pour les intitulés techniques). */
  hint?: string;
};

export type NavGroup = {
  id: string;
  label: string;
  /** Chemin SVG (viewBox 24x24, stroke). */
  icon: string;
  items: NavItem[];
};

/** Les seuls liens affichés en permanence dans l'en-tête (bureau). */
export const PRIMARY_NAV: NavItem[] = [
  { href: "/cours", label: "Cours" },
  { href: "/exercices", label: "Exercices" },
  { href: "/examens", label: "Examens" },
  { href: "/quiz", label: "Quiz" },
];

export const NAV_GROUPS: NavGroup[] = [
  {
    id: "apprendre",
    label: "Apprendre",
    icon: "M12 6.5C10 5 7 4.5 4 5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V5c-3-.5-6 0-8 1.5Zm0 0v13",
    items: [
      { href: "/matieres", label: "Matières", hint: "Toutes les matières de ta section" },
      { href: "/cours", label: "Fiches de cours", hint: "Notions, formules et méthodes" },
      { href: "/programme", label: "Programme officiel", hint: "Chapitres par trimestre" },
      { href: "/flashcards", label: "Flashcards", hint: "Révision recto / verso" },
      { href: "/carnet-erreurs", label: "Carnet d'erreurs", hint: "Révision espacée" },
      { href: "/communaute", label: "Communauté", hint: "Fiches partagées par les élèves" },
    ],
  },
  {
    id: "entrainer",
    label: "S'entraîner",
    icon: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm0 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z",
    items: [
      { href: "/exercices", label: "Exercices corrigés", hint: "Corrigés étape par étape" },
      { href: "/examens", label: "Examens & séries", hint: "Sujets type bac" },
      { href: "/quiz", label: "Quiz", hint: "Vérifier sa compréhension" },
      { href: "/bac-blanc", label: "Bac blanc", hint: "Épreuve chronométrée" },
      { href: "/correction", label: "Corriger un PDF", hint: "Guide de correction guidé" },
    ],
  },
  {
    id: "suivre",
    label: "Suivre mes progrès",
    icon: "M4 20v-9m5 9V5m5 15v-7m5 7V9",
    items: [
      { href: "/evaluation", label: "Mon niveau", hint: "Progression et mention visée" },
      { href: "/calculateur", label: "Calculateur FG", hint: "Moyenne et score d'orientation" },
      { href: "/organisation", label: "Organisation", hint: "Pomodoro et compte à rebours" },
      { href: "/mon-compte", label: "Mon compte", hint: "Section et appareils" },
    ],
  },
];

/** Liste plate de toutes les rubriques (utile pour le pied de page, tests, etc.). */
export const ALL_NAV_ITEMS: NavItem[] = NAV_GROUPS.flatMap((group) => group.items);

/** Raccourcis du pied de page : volontairement courts, le menu fait office de plan complet. */
export const FOOTER_LINKS: NavItem[] = [
  { href: "/matieres", label: "Matières" },
  { href: "/cours", label: "Cours" },
  { href: "/exercices", label: "Exercices" },
  { href: "/quiz", label: "Quiz" },
  { href: "/evaluation", label: "Mon niveau" },
  { href: "/mon-compte", label: "Mon compte" },
];

export function isNavActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
