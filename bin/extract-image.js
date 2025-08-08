#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const glob = require("glob");
const minimist = require("minimist");

const argv = minimist(process.argv.slice(2), {
  alias: { o: "output", f: "format", e: "exclude", only: "only" },
});

function parseExts(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.flatMap(v => v.split(",").map(ext => ext.trim().toLowerCase()).filter(Boolean));
  if (typeof value === "string") return value.split(",").map(ext => ext.trim().toLowerCase()).filter(Boolean);
  return [];
}

const targetDir = argv._[0] || process.cwd();
const format = argv.format || "text";
const outputPath = argv.output ? path.resolve(argv.output) : null;

const excludeExts = parseExts(argv.exclude);
const onlyExts = parseExts(argv.only);

let imageExtensions = [
  "png", "jpg", "jpeg", "gif", "webp",
  "bmp", "tiff", "svg", "ico", "avif", "heic"
];

if (onlyExts.length > 0) {
  imageExtensions = onlyExts;
} else if (excludeExts.length > 0) {
  imageExtensions = imageExtensions.filter(ext => !excludeExts.includes(ext));
}

if (imageExtensions.length === 0) {
  console.error("❌ No image extensions to scan.");
  process.exit(1);
}

const files = glob.sync(`${targetDir}/**/*.{${imageExtensions.join(",")}}`, {
  absolute: true,
  ignore: ["**/node_modules/**", "**/dist/**", "**/build/**"]
});

const results = files.map(filePath => ({
  file: path.relative(process.cwd(), filePath),
  size: (fs.statSync(filePath).size / 1024).toFixed(2) + "Kb"
}));

function saveOrPrint(text) {
  if (outputPath) {
    fs.writeFileSync(outputPath, text + "\n", "utf-8");
    console.log(`✅ Output saved to: ${outputPath}`);
  } else {
    console.log(text);
  }
}

if (results.length === 0) {
  saveOrPrint("⚠️ No image files detected");
} else if (format === "json") {
  saveOrPrint(JSON.stringify(results, null, 2));
} else {
  saveOrPrint(results.map(r => `${r.file} (${r.size})`).join("\n"));
}
