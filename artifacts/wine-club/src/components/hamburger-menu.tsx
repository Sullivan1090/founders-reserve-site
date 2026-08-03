"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

type SubItem = { label: string; href: string };
type NavGroup =
  | { kind: "group"; label: string; items: SubItem[] }
  | { kind: "link";  label: string; href: string };

const NAV: NavGroup[] = [
  {
    kind: "group",
    label: "The Wines",
    items: [
      { label: "Tasting Notes",    href: "/members/tasting-notes" },
      { label: "Cellar Picks",     href: "/members/cellar-picks" },
      { label: "Pairing / Recipes", href: "/members/pairing" },
    ],
  },
  {
    kind: "group",
    label: "The Estate",
    items: [
      { label: "Vineyard",      href: "/members/vineyard" },
      { label: "Winemaker",     href: "/members/winemaker" },
      { label: "Meet the Team", href: "/members/meet-the-team" },
      { label: "Construction",  href: "/members/construction" },
    ],
  },
  {
    kind: "group",
    label: "Beyond the Vineyard",
    items: [
      { label: "PA Vinea",       href: "/members/pa-vinea" },
      { label: "Sttupa Estate",  href: "/members/sttupa-estate" },
    ],
  },
  {
    kind: "group",
    label: "Connect",
    items: [
      { label: "Live with the Winemaker", href: "/members/monthly-conversation" },
      { label: "Gatherings",              href: "/members/gatherings" },
    ],
  },
  {
    kind: "link",
    label: "About Founder's Vault",
    href: "/members/welcome",
  },
];

export function HamburgerMenu() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [expanded, setExpanded]   = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  function closeAll() {
    setMenuOpen(false);
    setExpanded(null);
  }

  function toggleGroup(label: string) {
    setExpanded((prev) => (prev === label ? null : label));
  }

  return (
    <div className="relative" ref={ref}>
      {/* Toggle button */}
      <button
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-primary/10 transition-colors"
      >
        {menuOpen
          ? <X    className="w-5 h-5 text-primary" />
          : <Menu className="w-6 h-6 text-primary" />
        }
      </button>

      {/* Dropdown panel */}
      {menuOpen && (
        <div
          className="absolute right-0 top-full mt-2 z-50 rounded-xl overflow-hidden shadow-2xl"
          style={{
            width: "260px",
            background: "#1B3448",
            border: "1px solid rgba(139,103,38,0.35)",
          }}
        >
          {NAV.map((entry, i) => {
            const divider = i > 0
              ? { borderTop: "1px solid rgba(255,255,255,0.06)" }
              : {};

            // Direct link (no sub-items)
            if (entry.kind === "link") {
              return (
                <Link
                  key={entry.href}
                  href={entry.href}
                  onClick={closeAll}
                  className="flex items-center px-5 py-3.5 font-serif text-sm tracking-wide text-[#EDEAE2] hover:text-[#C49A35] hover:bg-white/5 transition-colors"
                  style={divider}
                >
                  {entry.label}
                </Link>
              );
            }

            // Accordion group
            const isOpen = expanded === entry.label;
            return (
              <div key={entry.label} style={divider}>
                <button
                  onClick={() => toggleGroup(entry.label)}
                  className="w-full flex items-center justify-between px-5 py-3.5 font-serif text-sm tracking-wide transition-colors hover:bg-white/5"
                  style={{ color: isOpen ? "#C49A35" : "#EDEAE2" }}
                >
                  <span>{entry.label}</span>
                  <ChevronDown
                    className="w-3.5 h-3.5 transition-transform duration-200"
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      color: "#C49A35",
                      opacity: isOpen ? 1 : 0.5,
                    }}
                  />
                </button>

                {isOpen && (
                  <div
                    style={{
                      background: "rgba(0,0,0,0.18)",
                      borderTop: "1px solid rgba(196,154,53,0.12)",
                    }}
                  >
                    {entry.items.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={closeAll}
                        className="flex items-center gap-2 pl-8 pr-5 py-2.5 font-serif text-sm tracking-wide transition-colors hover:text-[#C49A35] hover:bg-white/5"
                        style={{ color: "rgba(237,234,226,0.72)" }}
                      >
                        <span
                          className="w-1 h-1 rounded-full shrink-0"
                          style={{ background: "rgba(196,154,53,0.55)" }}
                        />
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
