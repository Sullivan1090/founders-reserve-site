import { readFileSync } from "fs";
import { join } from "path";
import { Metadata } from "next";
import { ArchiveClient } from "./archive-client";

export const metadata: Metadata = {
  title: "Estate Archive — Sullivan Rutherford Estate",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export interface TocEntry {
  id: string;
  level: number;
  text: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function buildToc(markdown: string): TocEntry[] {
  const toc: TocEntry[] = [];
  const lines = markdown.split("\n");
  for (const line of lines) {
    const m = line.match(/^(#{1,3})\s+(.+)$/);
    if (m) {
      const text = m[2].trim();
      toc.push({ id: slugify(text), level: m[1].length, text });
    }
  }
  return toc;
}

export default function EstateArchivePage() {
  const filePath = join(process.cwd(), "content", "sullivan-knowledge", "index.md");
  const markdown = readFileSync(filePath, "utf-8");
  const toc = buildToc(markdown);

  return <ArchiveClient markdown={markdown} toc={toc} />;
}
