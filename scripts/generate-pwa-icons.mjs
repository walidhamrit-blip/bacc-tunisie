import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const iconsDir = path.join(rootDir, "public", "icons");

async function generateIcons() {
  const iconSvg = await fs.readFile(path.join(iconsDir, "icon.svg"));
  const maskableSvg = await fs.readFile(path.join(iconsDir, "icon-maskable.svg"));

  await Promise.all([
    sharp(iconSvg).resize(192, 192).png().toFile(path.join(iconsDir, "icon-192x192.png")),
    sharp(iconSvg).resize(512, 512).png().toFile(path.join(iconsDir, "icon-512x512.png")),
    sharp(iconSvg).resize(180, 180).png().toFile(path.join(iconsDir, "apple-touch-icon.png")),
    sharp(maskableSvg).resize(512, 512).png().toFile(path.join(iconsDir, "icon-maskable-512x512.png")),
  ]);

  console.log("Icônes PWA générées dans public/icons/");
}

generateIcons().catch((error) => {
  console.error("Erreur lors de la génération des icônes PWA :", error);
  process.exit(1);
});
