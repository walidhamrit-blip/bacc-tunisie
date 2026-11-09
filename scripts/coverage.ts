/**
 * Couverture du programme : nombre de chapitres qui ont une fiche de cours,
 * filière par filière et matière par matière.
 *
 * Usage : npx tsx scripts/coverage.ts   (ou node --experimental-strip-types)
 */
import { examsSeed } from "../src/db/content/exams";
import { lessonsSeed } from "../src/db/content/lessons-humanities";
import { PROGRAM } from "../src/db/content/program";

const examSlugs = new Set(examsSeed.map((exam) => exam.slug));

const lessonSlugs = new Set(lessonsSeed.map((lesson) => lesson.slug));
const dangling: string[] = [];

let globalTotal = 0;
let globalCovered = 0;

for (const section of PROGRAM) {
  let total = 0;
  let covered = 0;
  console.log(`\n=== ${section.section} ===`);

  for (const subject of section.subjects) {
    const chapters = subject.themes.flatMap((theme) => theme.chapters);
    // Un chapitre est couvert s'il pointe vers une fiche ou vers un sujet corrigé.
    const isCovered = (chapter: { lessonSlug?: string; examSlug?: string }) =>
      Boolean(chapter.lessonSlug || chapter.examSlug);
    const withLesson = chapters.filter(isCovered);
    const missing = chapters.filter((chapter) => !isCovered(chapter));

    for (const chapter of withLesson) {
      if (chapter.lessonSlug && !lessonSlugs.has(chapter.lessonSlug)) {
        dangling.push(`${section.section}/${subject.slug}/${chapter.slug} → fiche ${chapter.lessonSlug}`);
      }
      if (chapter.examSlug && !examSlugs.has(chapter.examSlug)) {
        dangling.push(`${section.section}/${subject.slug}/${chapter.slug} → examen ${chapter.examSlug}`);
      }
    }

    total += chapters.length;
    covered += withLesson.length;

    const pct = chapters.length ? Math.round((withLesson.length / chapters.length) * 100) : 100;
    const flag = pct === 100 ? "✅" : "⚠️ ";
    console.log(
      `${flag} ${subject.slug.padEnd(16)} ${String(withLesson.length).padStart(3)}/${String(
        chapters.length,
      ).padStart(3)}  ${String(pct).padStart(3)}%`,
    );
    if (missing.length && process.argv.includes("--detail")) {
      for (const chapter of missing) console.log(`      · ${chapter.period} ${chapter.title}`);
    }
  }

  const pct = total ? Math.round((covered / total) * 100) : 100;
  console.log(`   TOTAL ${covered}/${total} = ${pct}%`);
  globalTotal += total;
  globalCovered += covered;
}

console.log(
  `\nGLOBAL ${globalCovered}/${globalTotal} = ${Math.round((globalCovered / globalTotal) * 100)}%`,
);
if (dangling.length) {
  console.log(`\n⚠️  ${dangling.length} leçon(s) référencée(s) mais absente(s) du seed :`);
  for (const item of dangling) console.log(`   - ${item}`);
  process.exitCode = 1;
} else {
  console.log("Aucun lien mort. ✅");
}
