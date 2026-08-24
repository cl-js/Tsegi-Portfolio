import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const services = [
  {
    code: "S.01",
    title: "Feasibility",
    subtitle: "Site & Structural Viability",
    summary:
      "Geotechnical investigation, load-path analysis, and risk modelling to determine whether a project can — and should — be built.",
    methodology: [
      "01 · Desk study & site reconnaissance",
      "02 · Geotechnical borings & lab testing",
      "03 · Load & span feasibility calculations",
      "04 · Cost-vs-risk viability report",
    ],
  },
  {
    code: "S.02",
    title: "Design Optimization",
    subtitle: "Structural Engineering Design",
    summary:
      "Iterative structural design that reduces material waste while exceeding code — balancing economy with the mathematics of load.",
    methodology: [
      "01 · Conceptual structural scheme",
      "02 · Finite element analysis & modelling",
      "03 · Member sizing & detailing to UBC/BS EN",
      "04 · Value engineering & material take-off",
    ],
  },
  {
    code: "S.03",
    title: "Project Oversight",
    subtitle: "Construction Supervision",
    summary:
      "On-site supervision and quality assurance ensuring what is built matches what is drawn — to the millimetre.",
    methodology: [
      "01 · Shop drawing review & approvals",
      "02 · Material testing & batch inspection",
      "03 · Setting-out verification & tolerances",
      "04 · Structural certification & handover",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative bg-grid-fine bg-background border-t border-foreground/15">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-24 md:py-32">
        <div className="flex items-center gap-4 mb-6">
          <span className="section-label">03 / Consultancy Matrix</span>
          <span className="h-px w-16 bg-foreground/20" />
        </div>
        <h2 className="display-heading text-4xl md:text-6xl lg:text-7xl max-w-3xl mb-16 md:mb-24">
          A consultant's value is measured in what never fails.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-foreground/15">
          {services.map((s, i) => (
            <div
              key={s.code}
              className={`px-6 md:px-8 py-10 md:py-12 border-foreground/15 ${
                i !== 0 ? "md:border-l border-t" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-[10px] tracking-[0.25em] text-accent">{s.code}</span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")} / 03
                </span>
              </div>
              <h3 className="font-heading text-3xl md:text-4xl font-light mb-2">{s.title}</h3>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-6">
                {s.subtitle}
              </div>
              <p className="text-foreground/75 text-base leading-relaxed mb-8">{s.summary}</p>

              <Accordion type="single" collapsible>
                <AccordionItem value={`m-${i}`} className="border-0">
                  <AccordionTrigger className="font-mono text-[11px] uppercase tracking-[0.2em] hover:no-underline py-3 border-t border-foreground/15">
                    Methodology
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <ul className="font-mono text-[12px] leading-relaxed text-foreground/70 space-y-2 pt-2">
                      {s.methodology.map((m) => (
                        <li key={m} className="flex gap-2">
                          <span className="text-accent/70">›</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}