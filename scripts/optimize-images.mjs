/**
 * Converts the large images the site references into right-sized WebP files
 * and points the code at them.
 *
 *   node scripts/optimize-images.mjs
 *
 * Next.js image optimization is switched off (next.config.ts) to stay within
 * the Vercel free plan, so every image is served exactly as stored. Run this
 * after adding new photos: any referenced PNG/JPG over 60 KB gets a WebP copy
 * (max 1024px on the long edge, quality 80) and the code is updated to use it.
 * Originals are left in place.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const MIN_KB = 60;
const MAX_EDGE = 1024;
// Images shown much smaller than 1024px get a tighter cap.
const MAX_WIDTH_OVERRIDES = { "/images/logo/dss_logo.png": 520 };

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)],
  );
const codeFiles = ["app", "components", "lib", "hooks"]
  .flatMap((d) => walk(path.join(root, d)))
  .filter((f) => /\.(tsx?|css)$/.test(f));

const refs = new Set();
for (const f of codeFiles) {
  for (const m of fs.readFileSync(f, "utf8").matchAll(/\/images\/[^"'`)\s$]+\.(?:png|jpe?g)/gi)) refs.add(m[0]);
}

const renames = [];
for (const ref of refs) {
  const src = path.join(root, "public", ref);
  if (!fs.existsSync(src) || fs.statSync(src).size < MIN_KB * 1024) continue;
  const outRef = ref.replace(/\.(png|jpe?g)$/i, ".webp");
  const out = path.join(root, "public", outRef);
  const maxWidth = MAX_WIDTH_OVERRIDES[ref];
  await sharp(src)
    .resize(maxWidth ? { width: maxWidth, withoutEnlargement: true } : { width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(out);
  const before = Math.round(fs.statSync(src).size / 1024);
  const after = Math.round(fs.statSync(out).size / 1024);
  console.log(`${String(before).padStart(5)} KB -> ${String(after).padStart(4)} KB  ${outRef}`);
  renames.push([ref, outRef, before, after]);
}

for (const f of codeFiles) {
  let text = fs.readFileSync(f, "utf8");
  let changed = false;
  for (const [from, to] of renames) {
    if (text.includes(from)) {
      text = text.split(from).join(to);
      changed = true;
    }
  }
  if (changed) fs.writeFileSync(f, text);
}

const sum = (i) => renames.reduce((s, r) => s + r[i], 0);
console.log(`\n${renames.length} images: ${sum(2)} KB -> ${sum(3)} KB`);
