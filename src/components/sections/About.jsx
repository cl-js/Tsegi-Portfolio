import React from "react";
import { Image } from "@/components/ui/image";

const credentials = [
  { k: "Registration", v: "Engineers Registration Board of Uganda" },
  { k: "Membership", v: "Uganda Institution of Professional Engineers" },
  { k: "Codes", v: "UBC, BS EN 1990-1999, IS Code Compliance" },
  { k: "Software", v: "STAAD.Pro, ETABS, AutoCAD, Revit Structure" },
];

export default function About() {
  return (
    <section id="about" className="relative bg-background border-t border-foreground/15">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-24 md:py-32">
        <div className="flex items-center gap-4 mb-6">
          <span className="section-label">04 / Profile</span>
          <span className="h-px w-16 bg-foreground/20" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary border border-foreground/10">
              <Image
                src="https://media.base44.com/images/public/6a88ec3250645159181f0dc0/9b3a82fc4_generated_d90af091.png"
                alt="Structural column and beam junction"
                className="h-full w-full object-cover"
                fittingType="fill"
              />
              <div className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.15em] text-background/80">
                DET.002 · COLUMN JOINT
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
              <span>SCALE 1:40</span>
              <span>FIG. B</span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl mb-8 max-w-xl">
            Fifteen years engineering what Africa stands on.
            </h2>
            <div className="space-y-5 text-foreground/80 text-lg leading-relaxed max-w-2xl">
              <p>
                Tsega Tadesse is a civil engineer and independent consultant based in Kampala, working
                across bridges, highways, buildings, and water infrastructure throughout Uganda and
                across East Africa. His practice now extends continent-wide, adapting rigorous
                structural analysis to the realities of equatorial construction — expansive soils,
                seismic considerations, and material supply chains.
              </p>
              <p>
                The work is consultative by design: feasibility before commitment, optimization before
                excavation, oversight before handover. The result is infrastructure that performs to
                specification for the full duration of its service life.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 border-t border-foreground/15">
              {credentials.map((c, i) => (
                <div
                  key={c.k}
                  className={`py-5 px-1 ${i % 2 !== 0 ? "sm:border-l border-foreground/15" : ""} ${i >= 2 ? "border-t border-foreground/15 sm:border-t" : ""}`}
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                    {c.k}
                  </div>
                  <div className="text-sm text-foreground/85">{c.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}