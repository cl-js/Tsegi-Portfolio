import React, { useState, useEffect } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { num: "01", label: "Index", href: "#top" },
  { num: "02", label: "Dossiers", href: "#projects" },
  { num: "03", label: "Matrix", href: "#services" },
  { num: "04", label: "Profile", href: "#about" },
  { num: "05", label: "Requisition", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex items-center justify-between h-16">
          <a href="#top" className="group flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">TT/CE</span>
            <span className="h-3 w-px bg-foreground/30" />
            <span className="font-heading text-sm font-medium tracking-tight">Tsega Tadesse</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.num}
                href={l.href}
                className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="text-accent/70 group-hover:text-accent">{l.num}</span>
                <span>{l.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 border border-foreground/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
            >
              Initiate Brief
            </a>
            <a
              href="#contact"
              className="md:hidden font-mono text-[11px] uppercase tracking-[0.2em] text-foreground"
            >
              05 / Req
            </a>
          </div>
        </div>
        {/* ruler ticks */}
        <div className="hidden md:flex items-end h-3 gap-[3px] border-t border-border/60 pt-px">
          {Array.from({ length: 80 }).map((_, i) => (
            <span
              key={i}
              className={`bg-foreground/20 ${i % 10 === 0 ? "h-3" : i % 5 === 0 ? "h-2" : "h-1"}`}
              style={{ width: 1, flex: "1 0 auto" }}
            />
          ))}
        </div>
      </div>
    </header>
  );
}