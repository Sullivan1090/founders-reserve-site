"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Winemaker",             href: "/members/winemaker" },
  { label: "Vineyard",              href: "/members/vineyard" },
  { label: "Construction",          href: "/members/construction" },
  { label: "Pairing / Recipes",     href: "/members/pairing" },
  { label: "Tasting Notes",         href: "/members/tasting-notes" },
  { label: "Gatherings",            href: "/members/gatherings" },
  { label: "Cellar Picks",          href: "/members/cellar-picks" },
  { label: "Meet the Team",         href: "/members/meet-the-team" },
  { label: "Monthly Conversation",  href: "/members/monthly-conversation" },
];

export function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-primary/10 transition-colors"
      >
        <Menu className="w-6 h-6 text-primary" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ backgroundColor: "rgba(27,52,72,0.97)", backdropFilter: "blur(8px)" }}
        >
          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="absolute top-6 right-7 flex items-center justify-center w-10 h-10 rounded-md hover:bg-white/10 transition-colors"
          >
            <X className="w-7 h-7 text-[#EDEAE2]" />
          </button>

          {/* Links */}
          <nav className="flex flex-col items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-serif text-3xl md:text-4xl tracking-wide text-[#EDEAE2] hover:text-[#8B6726] transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
