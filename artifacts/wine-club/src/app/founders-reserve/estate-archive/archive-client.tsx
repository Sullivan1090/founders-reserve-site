"use client";

import { useMemo, useState } from "react";
import { marked } from "marked";
import { TocEntry } from "./page";
import { ChevronDown, ChevronUp, Search, X } from "lucide-react";

interface Props {
  markdown: string;
  toc: TocEntry[];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// Split markdown into sections by H2 for searchable chunks
interface Section {
  heading: string;
  id: string;
  level: number;
  html: string;
}

function buildSections(markdown: string): Section[] {
  // Configure marked with custom heading renderer for anchor IDs
  const renderer = new marked.Renderer();
  renderer.heading = ({ text, depth }: { text: string; depth: number }) => {
    const id = slugify(text);
    const tag = `h${depth}`;
    const sizeClass =
      depth === 1
        ? "text-4xl md:text-5xl font-serif text-[#C49A35] mt-10 mb-6 leading-tight"
        : depth === 2
        ? "text-2xl md:text-3xl font-serif text-[#C49A35] mt-10 mb-4 border-b border-[#C49A35]/20 pb-3"
        : depth === 3
        ? "text-xl font-serif text-[#EDEAE2] mt-8 mb-3"
        : "text-base font-serif text-[#EDEAE2]/80 mt-6 mb-2";
    return `<${tag} id="${id}" class="${sizeClass} scroll-mt-24 group">
      <a href="#${id}" class="anchor-link">${text}</a>
    </${tag}>`;
  };

  marked.use({ renderer });

  // Split into sections at ## boundaries
  const parts = markdown.split(/(?=^## )/m);
  const sections: Section[] = [];

  for (const part of parts) {
    const firstLine = part.split("\n")[0];
    const m = firstLine.match(/^(#{1,3})\s+(.+)$/);
    if (m) {
      sections.push({
        heading: m[2].trim(),
        id: slugify(m[2].trim()),
        level: m[1].length,
        html: marked(part) as string,
      });
    } else {
      // Preamble / intro content before first heading
      sections.push({
        heading: "",
        id: "__intro",
        level: 0,
        html: marked(part) as string,
      });
    }
  }

  return sections;
}

export function ArchiveClient({ markdown, toc }: Props) {
  const [query, setQuery] = useState("");
  const [tocOpen, setTocOpen] = useState(false);

  const sections = useMemo(() => buildSections(markdown), [markdown]);

  const filteredSections = useMemo(() => {
    if (!query.trim()) return sections;
    const q = query.toLowerCase();
    return sections.filter(
      (s) =>
        s.heading.toLowerCase().includes(q) ||
        s.html.toLowerCase().includes(q)
    );
  }, [sections, query]);

  const h2Toc = toc.filter((t) => t.level === 2);

  return (
    <div
      className="min-h-screen"
      style={{ background: "#0d1f2d", color: "#EDEAE2", fontFamily: "var(--font-serif, Georgia, serif)" }}
    >
      {/* Page header */}
      <div
        className="border-b"
        style={{ borderColor: "rgba(196,154,53,0.2)", background: "rgba(27,52,72,0.6)" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-10">
          <p className="text-sm tracking-[0.2em] uppercase mb-3" style={{ color: "#C49A35" }}>
            Sullivan Rutherford Estate
          </p>
          <h1
            className="font-serif text-4xl md:text-5xl mb-4"
            style={{ color: "#EDEAE2" }}
          >
            Estate Archive
          </h1>
          <p className="text-base max-w-2xl leading-relaxed" style={{ color: "rgba(237,234,226,0.65)" }}>
            An internal knowledge record covering estate history, land, team, vineyards, architecture, winemaking, wines, vintages, and frequently asked questions.
          </p>

          {/* Search */}
          <div className="mt-6 relative max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: "#C49A35" }}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the archive…"
              className="w-full pl-10 pr-10 py-2.5 rounded text-sm outline-none border focus:border-[#C49A35] transition-colors"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(196,154,53,0.3)",
                color: "#EDEAE2",
              }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: "rgba(237,234,226,0.4)" }}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {query && (
            <p className="mt-2 text-xs" style={{ color: "rgba(237,234,226,0.45)" }}>
              {filteredSections.filter((s) => s.heading).length} section
              {filteredSections.filter((s) => s.heading).length !== 1 ? "s" : ""} match
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 flex gap-10">
        {/* Desktop sticky ToC */}
        {!query && (
          <aside className="hidden lg:block w-64 shrink-0">
            <div
              className="sticky top-8 rounded-lg p-5 border"
              style={{
                background: "rgba(27,52,72,0.5)",
                borderColor: "rgba(196,154,53,0.15)",
                maxHeight: "calc(100vh - 4rem)",
                overflowY: "auto",
              }}
            >
              <p
                className="text-xs tracking-[0.18em] uppercase mb-4 font-medium"
                style={{ color: "#C49A35" }}
              >
                Contents
              </p>
              <nav className="space-y-1">
                {h2Toc.map((entry) => (
                  <a
                    key={entry.id}
                    href={`#${entry.id}`}
                    className="block text-sm leading-snug py-1 px-2 rounded transition-colors hover:text-[#C49A35]"
                    style={{ color: "rgba(237,234,226,0.65)" }}
                  >
                    {entry.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Mobile collapsible ToC */}
          {!query && (
            <div className="lg:hidden mb-8">
              <button
                onClick={() => setTocOpen((v) => !v)}
                className="flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded border w-full"
                style={{
                  background: "rgba(27,52,72,0.5)",
                  borderColor: "rgba(196,154,53,0.25)",
                  color: "#C49A35",
                }}
              >
                <span className="flex-1 text-left tracking-wide uppercase text-xs">
                  Table of Contents
                </span>
                {tocOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {tocOpen && (
                <nav
                  className="mt-1 rounded border p-4 space-y-1"
                  style={{
                    background: "rgba(27,52,72,0.5)",
                    borderColor: "rgba(196,154,53,0.15)",
                  }}
                >
                  {h2Toc.map((entry) => (
                    <a
                      key={entry.id}
                      href={`#${entry.id}`}
                      onClick={() => setTocOpen(false)}
                      className="block text-sm py-1 transition-colors hover:text-[#C49A35]"
                      style={{ color: "rgba(237,234,226,0.65)" }}
                    >
                      {entry.text}
                    </a>
                  ))}
                </nav>
              )}
            </div>
          )}

          {/* Archive content */}
          <div className="archive-body prose-custom">
            {filteredSections.length === 0 ? (
              <p className="text-center py-20 text-sm" style={{ color: "rgba(237,234,226,0.4)" }}>
                No sections match your search.
              </p>
            ) : (
              filteredSections.map((section) => (
                <div
                  key={section.id}
                  dangerouslySetInnerHTML={{ __html: section.html }}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <style>{`
        .archive-body p {
          line-height: 1.8;
          margin-bottom: 1.1em;
          color: rgba(237,234,226,0.82);
          font-size: 0.975rem;
        }
        .archive-body ul, .archive-body ol {
          padding-left: 1.5em;
          margin-bottom: 1.1em;
          color: rgba(237,234,226,0.78);
          font-size: 0.95rem;
          line-height: 1.75;
        }
        .archive-body li { margin-bottom: 0.3em; }
        .archive-body strong { color: #EDEAE2; font-weight: 600; }
        .archive-body em { color: rgba(237,234,226,0.8); font-style: italic; }
        .archive-body blockquote {
          border-left: 3px solid #C49A35;
          margin: 1.5em 0;
          padding: 0.8em 1.2em;
          background: rgba(196,154,53,0.06);
          border-radius: 0 6px 6px 0;
          font-style: italic;
          color: rgba(237,234,226,0.8);
        }
        .archive-body code {
          background: rgba(255,255,255,0.08);
          padding: 0.15em 0.4em;
          border-radius: 3px;
          font-size: 0.85em;
          color: #C49A35;
        }
        .archive-body hr {
          border: none;
          border-top: 1px solid rgba(196,154,53,0.18);
          margin: 2.5em 0;
        }
        .archive-body table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1.5em;
          font-size: 0.9rem;
        }
        .archive-body th {
          text-align: left;
          padding: 0.6em 0.8em;
          border-bottom: 1px solid rgba(196,154,53,0.3);
          color: #C49A35;
          font-weight: 600;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .archive-body td {
          padding: 0.6em 0.8em;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          color: rgba(237,234,226,0.75);
          vertical-align: top;
        }
        .archive-body a.anchor-link {
          color: inherit;
          text-decoration: none;
        }
        .archive-body a.anchor-link:hover {
          color: #C49A35;
        }
        .archive-body a:not(.anchor-link) {
          color: #C49A35;
          text-decoration: underline;
          text-decoration-color: rgba(196,154,53,0.4);
        }
        .archive-body a:not(.anchor-link):hover {
          text-decoration-color: #C49A35;
        }
      `}</style>
    </div>
  );
}
