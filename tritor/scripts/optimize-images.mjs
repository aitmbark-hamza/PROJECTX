import sharp from 'sharp';
import { readdirSync, unlinkSync, existsSync, statSync, renameSync } from 'fs';
import { join, parse } from 'path';

const IMG_DIR = join(process.cwd(), 'public', 'images');
const QUALITY = 80;

function addThumbs(genSet, name) {
  const thumbPath = join(IMG_DIR, `${name}-thumb.webp`);
  if (existsSync(thumbPath)) genSet.add(thumbPath);
}

async function optimize() {
  const files = readdirSync(IMG_DIR);
  const generatedWebP = new Set();

  for (const file of files) {
    const ext = parse(file).ext.toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const name = parse(file).name;
    const srcPath = join(IMG_DIR, file);
    const webpPath = join(IMG_DIR, `${name}.webp`);

    // If WebP is already newer than source, just track it and related thumbs
    if (existsSync(webpPath) && statSync(webpPath).mtimeMs > statSync(srcPath).mtimeMs) {
      generatedWebP.add(webpPath);
      if (file.startsWith('gallery-') || file.startsWith('hero-')) addThumbs(generatedWebP, name);
      if (file === 'LOGO.png') {
        const favPath = join(IMG_DIR, 'favicon.webp');
        if (!existsSync(favPath)) {
          await sharp(srcPath).resize(48, 48, { fit: 'cover' }).webp({ quality: 70, effort: 6 }).toFile(favPath);
        }
        generatedWebP.add(favPath);
      }
      continue;
    }

    console.log(`  Converting: ${file} → ${name}.webp`);

    if (file === 'LOGO.png') {
      await sharp(srcPath)
        .resize({ width: 120, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 6 })
        .toFile(webpPath);

      const favPath = join(IMG_DIR, 'favicon.webp');
      await sharp(srcPath)
        .resize(48, 48, { fit: 'cover' })
        .webp({ quality: 70, effort: 6 })
        .toFile(favPath);
      generatedWebP.add(favPath);
    } else {
      await sharp(srcPath).webp({ quality: QUALITY, effort: 6 }).toFile(webpPath);

      if (file.startsWith('gallery-')) {
        const thumbPath = join(IMG_DIR, `${name}-thumb.webp`);
        await sharp(srcPath)
          .resize({ width: 500, withoutEnlargement: true })
          .webp({ quality: 75, effort: 6 })
          .toFile(thumbPath);
        generatedWebP.add(thumbPath);
      }

      if (file.startsWith('hero-')) {
        const thumbPath = join(IMG_DIR, `${name}-thumb.webp`);
        await sharp(srcPath)
          .resize({ width: 960, withoutEnlargement: true })
          .webp({ quality: 75, effort: 6 })
          .toFile(thumbPath);
        generatedWebP.add(thumbPath);
      }
    }

    generatedWebP.add(webpPath);
  }

  // Remove stale .webp files (orphaned from deleted originals)
  const allFiles = readdirSync(IMG_DIR);
  for (const file of allFiles) {
    if (!file.endsWith('.webp') || file === 'favicon.webp') continue;
    const path = join(IMG_DIR, file);
    if (!generatedWebP.has(path)) {
      console.log(`  Removing stale: ${file}`);
      unlinkSync(path);
    }
  }

  // Rename contact .mp4 (with space)
  const oldContact = join(IMG_DIR, 'contact .mp4');
  const newContact = join(IMG_DIR, 'contact.mp4');
  if (existsSync(oldContact) && !existsSync(newContact)) {
    console.log('  Renaming: contact .mp4 → contact.mp4');
    renameSync(oldContact, newContact);
  }

  console.log('\n✓ Image optimization complete');
}

optimize().catch(console.error);
