"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "PA Vinea",              href: "/members/pa-vinea" },
  { label: "Sttupa Estate",         href: "/members/sttupa-estate" },
  { label: "Winemaker",             href: "/members/winemaker" },
  { label: "Vineyard",              href: "/members/vineyard" },
  { label: "Construction",          href: "/members/construction" },
  { label: "Pairing / Recipes",     href: "/members/pairing" },
  { label: "Tasting Notes",         href: "/members/tasting-notes" },
  { label: "Gatherings",            href: "/members/gatherings" },
  { label: "Cellar Picks",          href: "/members/cellar-picks" },
  { label: "Meet the Team",         href: "/members/meet-the-team" },
  { label: "Live with the Winemaker", href: "/members/monthly-conversation" },
  { label: "About the Vault",       href: "/members/welcome" },
];

export function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-primary/10 transition-colors"
      >
        {open
          ? <X className="w-5 h-5 text-primary" />
          : <Menu className="w-6 h-6 text-primary" />
        }
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="absolute right-0 top-full mt-2 z-50 rounded-xl overflow-hidden shadow-2xl"
          style={{
            width: "220px",
            background: "#1B3448",
            border: "1px solid rgba(139,103,38,0.35)",
          }}
        >
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-5 py-3 font-serif text-base tracking-wide text-[#EDEAE2] hover:text-[#8B6726] hover:bg-white/5 transition-colors"
              style={i > 0 ? { borderTop: "1px solid rgba(255,255,255,0.06)" } : {}}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
