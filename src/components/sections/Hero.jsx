import React, { useRef, useState } from "react";
import { Image } from "@/components/ui/image";

export default function Hero() {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [coords, setCoords] = useState({ x: "0000", y: "0000" });

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPos({ x, y });
    setCoords({
      x: Math.max(0, Math.round(x)).toString().padStart(4, "0"),
      y: Math.max(0, Math.round(y)).toString().padStart(4, "0"),
    });
  };

  return (
    <section id="top" ref={ref} onMouseMove={onMove} onMouseLeave={() => setPos({ x: -100, y: -100 })} className="relative min-h-screen w-full overflow-hidden bg-grid bg-background pt-16">
      <div className="pointer-events-none absolute inset-0 z-30 font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
        <span className="absolute top-24 left-6 md:left-10">DATUM WGS84 · EAST AFRICA</span>
        <span className="hidden sm:block absolute top-24 right-6 md:right-10">STRUCTURAL CONSULTANCY</span>
        <span className="absolute bottom-6 left-6 md:left-10">REV. A</span>
        <span className="absolute bottom-6 right-6 md:right-10">SHEET 01/05</span>
      </div>

      <div className="pointer-events-none absolute z-20 transition-opacity duration-200" style={{ left: pos.x, top: pos.y, opacity: pos.x < 0 ? 0 : 1 }} aria-hidden="true">
        <div className="absolute h-px w-screen -translate-x-1/2 -translate-y-1/2 bg-accent/40" />
        <div className="absolute w-px h-screen -translate-x-1/2 -translate-y-1/2 bg-accent/40" />
        <div className="absolute -translate-x-1/2 -translate-y-1/2 h-3 w-3 border border-accent" />
        <div className="absolute left-3 top-3 whitespace-nowrap font-mono text-[10px] tracking-[0.15em] text-accent">X{coords.x} · Y{coords.y}</div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10 pt-12 md:pt-20">
        <div className="flex items-center gap-4 mb-10 md:mb-16">
          <span className="section-label">01 / The Master Plan</span>
          <span className="h-px flex-1 bg-foreground/15" />
          <span className="hidden sm:block font-mono text-[10px] tracking-[0.2em] text-muted-foreground">Civil Engineering · Consultancy</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          <div className="lg:col-span-7">
            <h1 className="display-heading text-[18vw] sm:text-[14vw] lg:text-[10rem] xl:text-[12rem] leading-[0.85] text-foreground">
              Tsega<br /><span className="text-accent">Tadesse</span>
            </h1>
            <div className="mt-8 max-w-md">
              <p className="text-lg text-foreground/80 text-balance">Civil engineer and consultant engineering infrastructure across East Africa — from feasibility to the final load-bearing detail.</p>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#projects" className="inline-flex items-center gap-3 bg-foreground px-6 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-background hover:bg-accent transition-colors">View Dossiers <span>→</span></a>
              <a href="#contact" className="inline-flex items-center gap-3 border border-foreground/30 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.25em] hover:border-accent hover:text-accent transition-colors">Initiate Feasibility</a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-secondary border border-foreground/10">
              <Image src="/images/engineering-hero.svg" alt="Technical structural engineering drawing" className="h-full w-full object-cover" fittingType="fill" />
              <div className="absolute inset-0 ring-1 ring-inset ring-foreground/10" />
              <div className="absolute top-3 left-3 h-4 w-4 border-t border-l border-background/70" />
              <div className="absolute top-3 right-3 h-4 w-4 border-t border-r border-background/70" />
              <div className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-background/70" />
              <div className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-background/70" />
              <div className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.15em] text-background/80">DET.001 · STRUCTURAL STUDY</div>
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-muted-foreground"><span>SCALE 1:50</span><span>FIG. A</span></div>
          </div>
        </div>

        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 border-t border-foreground/15">
          {[
            { v: "15+", l: "Years in Practice" },
            { v: "60+", l: "Projects Delivered" },
            { v: "12", l: "Countries Served" },
            { v: "100%", l: "Code Compliance" },
          ].map((s, i) => (
            <div key={i} className={`py-6 md:py-8 px-4 md:px-6 ${i % 2 !== 0 ? "border-l border-foreground/15" : ""} ${i >= 2 ? "border-t md:border-t-0 border-foreground/15" : ""}`}>
              <div className="font-heading text-3xl md:text-4xl font-light">{s.v}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
