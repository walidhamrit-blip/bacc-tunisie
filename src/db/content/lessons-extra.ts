import type { LessonSeed } from "@/db/content/lessons-sciences";
import { informatiqueAlgoLessons } from "@/db/content/lessons-informatique";
import { informatiqueBddLessons } from "@/db/content/lessons-informatique-bdd";
import { mathsLessons } from "@/db/content/lessons-maths";
import { physiqueLessons } from "@/db/content/lessons-physique";
import { philosophieLessons } from "@/db/content/lessons-philosophie";
import { arabeLessons } from "@/db/content/lessons-arabe";
import { francaisAnglaisLessons } from "@/db/content/lessons-francais-anglais";
import { troncCommunLessons } from "@/db/content/lessons-tronc-commun";
import { mementoLessons } from "@/db/content/lessons-memento";

/**
 * Fiches complémentaires, organisées filière par filière pour couvrir
 * l'intégralité du programme officiel de 4ème année secondaire.
 *
 * L'ordre de ce tableau détermine l'ordre d'affichage des fiches dans la
 * matière : on commence par la filière Informatique, puis les maths et les
 * sciences, et enfin les matières littéraires.
 */
export const extraLessons: LessonSeed[] = [
  ...informatiqueAlgoLessons,
  ...informatiqueBddLessons,
  ...mathsLessons,
  ...physiqueLessons,
  ...philosophieLessons,
  ...arabeLessons,
  ...francaisAnglaisLessons,
  ...troncCommunLessons,
  ...mementoLessons,
];
