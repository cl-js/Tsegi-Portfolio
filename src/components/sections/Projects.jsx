import React, { useRef } from "react";
import { Image } from "@/components/ui/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

const projects = [
  {
    num: "D.01",
    name: "Nile Span Crossing",
    location: "Jinja, Eastern Region",
    type: "Bridge",
    highlight: "Span: 45m",
    detail: "Pre-stressed concrete girder bridge over the Victoria Nile, designed for seismic resilience and a 100-year service life.",
    image: "https://media.base44.com/images/public/6a88ec3250645159181f0dc0/fab70b942_generated_a1d20da8.png",
  },
  {
    num: "D.02",
    name: "Northern Bypass Interchange",
    location: "Kampala, Central Region",
    type: "Highway",
    highlight: "Radius: 320m",
    detail: "Grade-separated interchange optimizing traffic flow for 40,000 daily vehicles with reinforced soil embankments.",
    image: "https://media.base44.com/images/public/6a88ec3250645159181f0dc0/f50723092_generated_090393fc.png",
  },
  {
    num: "D.03",
    name: "Equatorial Tower",
    location: "Kampala, Central Region",
    type: "Building",
    highlight: "Floors: 22",
    detail: "Composite steel-concrete high-rise with a tuned mass damper for wind response control at elevation.",
    image: "https://media.base44.com/images/public/6a88ec3250645159181f0dc0/a9df0ac08_generated_06e20b82.png",
  },
  {
    num: "D.04",
    name: "Lake Basin Site Development",
    location: "Entebbe, Central Region",
    type: "Site Development",
    highlight: "Area: 14 ha",
    detail: "Master-planned earthworks and drainage for a mixed-use development on expansive clay soils.",
    image: "https://media.base44.com/images/public/6a88ec3250645159181f0dc0/ad2ad4f1c_generated_ed193f7a.png",
  },
];

export default function Projects() {
  const scroller = useRef(null);

  const scrollBy = (delta) => {
    scroller.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section id="projects" className="relative bg-background border-t border-foreground/15">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-24 md:pt-32 pb-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="section-label">02 / Project Dossiers</span>
              <span className="h-px w-16 bg-foreground/20" />
            </div>
            <h2 className="display-heading text-4xl md:text-6xl lg:text-7xl max-w-2xl">
              Built works across Uganda, East Africa, and beyond.
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollBy(-520)}
              className="h-12 w-12 border border-foreground/25 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
              aria-label="Scroll left"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollBy(520)}
              className="h-12 w-12 border border-foreground/25 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
              aria-label="Scroll right"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scroller}
        className="no-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 md:px-10 pb-24 md:pb-32"
      >
        {projects.map((p) => (
          <article
            key={p.num}
            className="group relative snap-start shrink-0 w-[85vw] sm:w-[60vw] md:w-[44vw] lg:w-[34vw] xl:w-[30vw] cursor-view"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary border border-foreground/10">
              <Image
                src={p.image}
                alt={p.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                fittingType="fill"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/0 to-foreground/0" />
              <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.2em] text-background/90">
                {p.num}
              </div>
              <div className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.2em] text-background/90 border border-background/40 px-2 py-1">
                {p.type}
              </div>
              <div className="absolute bottom-5 left-5 right-5">
                <div className="font-mono text-[10px] tracking-[0.2em] text-background/70 mb-2">
                  {p.highlight}
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-light text-background">
                  {p.name}
                </h3>
              </div>
              {/* view specs cursor label */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-mono text-[10px] tracking-[0.3em] text-background border border-background/60 px-3 py-2 bg-foreground/20 backdrop-blur-sm">
                  VIEW SPECS
                </span>
              </div>
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {p.location}
                </div>
                <p className="mt-2 text-sm text-foreground/70 max-w-sm">{p.detail}</p>
              </div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-accent shrink-0 mt-1">
                {p.highlight}
              </span>
            </div>
          </article>
        ))}
        <div className="shrink-0 w-6 md:w-10" />
      </div>
    </section>
  );
}