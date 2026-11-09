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
import { svtLessons } from "@/db/content/lessons-svt";
import { physiqueChimieLessons } from "@/db/content/lessons-physique-ondes";
import { chimieLessons } from "@/db/content/lessons-chimie";
import { informatiqueCommunLessons } from "@/db/content/lessons-informatique-commun";
import { svtExperimentalLessons } from "@/db/content/lessons-svt-experimental";
import { technologieLessons } from "@/db/content/lessons-technologie";
import { economieLessons } from "@/db/content/lessons-economie";
import { gestionLessons } from "@/db/content/lessons-gestion";
import { histoireGeoLessons } from "@/db/content/lessons-histoire-geo";
import { histoireGeoLettresLessons } from "@/db/content/lessons-histoire-geo-lettres";
import { arabeLettresLessons } from "@/db/content/lessons-arabe-lettres";
import { philosophieLettresLessons } from "@/db/content/lessons-philosophie-lettres";
import { lettresComplementsLessons } from "@/db/content/lessons-lettres-complements";

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
  ...physiqueChimieLessons,
  ...chimieLessons,
  ...svtLessons,
  ...svtExperimentalLessons,
  ...technologieLessons,
  ...economieLessons,
  ...gestionLessons,
  ...histoireGeoLessons,
  ...histoireGeoLettresLessons,
  ...arabeLettresLessons,
  ...philosophieLettresLessons,
  ...lettresComplementsLessons,
  ...informatiqueCommunLessons,
  ...mementoLessons,
];
