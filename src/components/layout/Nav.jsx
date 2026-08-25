import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || open ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"}`}>
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex items-center justify-between h-16">
          <a href="#top" onClick={closeMenu} className="group flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">TT/CE</span>
            <span className="h-3 w-px bg-foreground/30" />
            <span className="font-heading text-sm font-medium tracking-tight">Tsega Tadesse</span>
          </a>

          <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
            {links.map((l) => (
              <a key={l.num} href={l.href} className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">
                <span className="text-accent/70 group-hover:text-accent">{l.num}</span>
                <span>{l.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a href="#contact" className="hidden md:inline-flex items-center gap-2 border border-foreground/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors">
              Initiate Brief
            </a>
            <button type="button" onClick={() => setOpen((v) => !v)} className="md:hidden inline-flex h-10 w-10 items-center justify-center border border-foreground/20" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open}>
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="hidden md:flex items-end h-3 gap-[3px] border-t border-border/60 pt-px" aria-hidden="true">
          <span className="h-2 w-full bg-[repeating-linear-gradient(90deg,theme(colors.foreground/.2)_0,theme(colors.foreground/.2)_1px,transparent_1px,transparent_12.5%)]" />
        </div>

        {open && (
          <nav className="md:hidden border-t border-foreground/10 py-5" aria-label="Mobile navigation">
            <div className="grid gap-1">
              {links.map((l) => (
                <a key={l.num} href={l.href} onClick={closeMenu} className="flex items-center gap-4 px-3 py-4 font-mono text-xs uppercase tracking-[0.2em] hover:bg-secondary transition-colors">
                  <span className="text-accent">{l.num}</span>
                  <span>{l.label}</span>
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
