import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Check, ArrowRight } from "lucide-react";
import { submitInquiry } from "@/lib/inquiry";

const projectTypes = ["Bridge", "Highway", "Building", "Water Infrastructure", "Site Development", "Other"];
const budgets = ["Under $50K", "$50K - $250K", "$250K - $1M", "$1M - $5M", "$5M+", "To be determined"];
const timelines = ["Immediate (0-3 months)", "Short (3-6 months)", "Mid (6-12 months)", "Long (12+ months)", "Flexible"];
const emptyForm = { client_name: "", email: "", phone: "", organization: "", project_type: "", location: "", budget_range: "", timeline: "", scope_description: "" };

function Field({ id, label, children }) {
  return <div><label htmlFor={id} className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2 block">{label}</label>{children}</div>;
}

const inputCls = "w-full bg-transparent border-0 border-b-2 border-foreground/20 px-0 py-3 text-lg text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:ring-0 focus:outline-none transition-colors";

export default function Contact() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    const selected = sessionStorage.getItem("selectedProject");
    if (selected) {
      setForm((current) => ({ ...current, scope_description: `I would like to discuss the ${selected} project and a related feasibility or engineering requirement.` }));
      sessionStorage.removeItem("selectedProject");
    }
  }, []);

  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const canNext1 = Boolean(form.client_name.trim() && /\S+@\S+\.\S+/.test(form.email));
  const canNext2 = Boolean(form.project_type && form.scope_description.trim());

  const submit = async () => {
    setSubmitting(true);
    try {
      await submitInquiry(form);
      setDone(true);
      toast.success("Requisition received. We will respond as soon as possible.");
    } catch (error) {
      console.error(error);
      toast.error("The inquiry service is not connected yet. Please configure the backend and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative bg-grid bg-background border-t border-foreground/15">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-24 md:py-32">
        <div className="flex items-center gap-4 mb-6"><span className="section-label">05 / Brief Intake</span><span className="h-px w-16 bg-foreground/20" /></div>
        <h2 className="display-heading text-4xl md:text-6xl lg:text-7xl max-w-3xl mb-4">Project Requisition Form</h2>
        <p className="text-foreground/70 max-w-xl mb-16">Share the parameters of your project. A clear brief creates a better first consultation.</p>

        {done ? (
          <div className="border border-foreground/20 bg-secondary/40 p-10 md:p-16 max-w-2xl">
            <div className="h-12 w-12 border-2 border-accent flex items-center justify-center mb-6"><Check className="h-6 w-6 text-accent" /></div>
            <h3 className="font-heading text-3xl font-light mb-3">Feasibility initiated.</h3>
            <p className="text-foreground/70">Your requisition has been received. We will review the parameters and contact you to schedule the next step.</p>
            <button type="button" onClick={() => { setDone(false); setStep(1); setForm(emptyForm); }} className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-accent hover:underline">Submit another brief →</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="space-y-6">{[{ n: 1, l: "Client Particulars" }, { n: 2, l: "Project Parameters" }, { n: 3, l: "Scope & Schedule" }].map((s) => <div key={s.n} className="flex items-center gap-4"><span className={`h-8 w-8 border flex items-center justify-center font-mono text-[11px] ${step >= s.n ? "border-accent text-accent" : "border-foreground/25 text-muted-foreground"}`}>{step > s.n ? <Check className="h-3.5 w-3.5" /> : s.n}</span><span className={`font-mono text-[11px] uppercase tracking-[0.2em] ${step >= s.n ? "text-foreground" : "text-muted-foreground"}`}>{s.l}</span></div>)}</div>
              <div className="mt-12 pt-6 border-t border-foreground/15 font-mono text-[11px] leading-relaxed text-muted-foreground"><div>FORM. PRJ-REQ / v3.0</div><div className="mt-1">Secure inquiry submission</div></div>
            </div>

            <div className="lg:col-span-8">
              {step === 1 && <div className="space-y-10 animate-fade-up"><div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Field id="client-name" label="Client Name *"><input id="client-name" required autoComplete="name" className={inputCls} value={form.client_name} onChange={(e) => set("client_name", e.target.value)} placeholder="Full name" /></Field>
                <Field id="email" label="Email *"><input id="email" required type="email" autoComplete="email" className={inputCls} value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@organization.com" /></Field>
                <Field id="phone" label="Phone"><input id="phone" type="tel" autoComplete="tel" className={inputCls} value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="Phone number" /></Field>
                <Field id="organization" label="Organization"><input id="organization" autoComplete="organization" className={inputCls} value={form.organization} onChange={(e) => set("organization", e.target.value)} placeholder="Company / agency" /></Field>
              </div><div className="flex justify-end"><button type="button" disabled={!canNext1} onClick={() => setStep(2)} className="inline-flex items-center gap-3 bg-foreground px-8 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-background disabled:opacity-30 hover:bg-accent transition-colors">Continue <ArrowRight className="h-4 w-4" /></button></div></div>}

              {step === 2 && <div className="space-y-10 animate-fade-up"><fieldset><legend className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Project Type *</legend><div className="flex flex-wrap gap-2">{projectTypes.map((t) => <button type="button" key={t} onClick={() => set("project_type", t)} className={`px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] border transition-colors ${form.project_type === t ? "bg-foreground text-background border-foreground" : "border-foreground/25 text-foreground/70 hover:border-foreground"}`}>{t}</button>)}</div></fieldset>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8"><Field id="location" label="Project Location"><input id="location" className={inputCls} value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="District / region" /></Field><Field id="budget" label="Budget Range"><select id="budget" className={inputCls} value={form.budget_range} onChange={(e) => set("budget_range", e.target.value)}><option value="">Select range</option>{budgets.map((b) => <option key={b} value={b}>{b}</option>)}</select></Field></div>
                <div className="flex justify-between"><button type="button" onClick={() => setStep(1)} className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground">← Back</button><button type="button" disabled={!canNext2} onClick={() => setStep(3)} className="inline-flex items-center gap-3 bg-foreground px-8 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-background disabled:opacity-30 hover:bg-accent transition-colors">Continue <ArrowRight className="h-4 w-4" /></button></div></div>}

              {step === 3 && <div className="space-y-10 animate-fade-up"><fieldset><legend className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Timeline</legend><div className="flex flex-wrap gap-2">{timelines.map((t) => <button type="button" key={t} onClick={() => set("timeline", t)} className={`px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] border transition-colors ${form.timeline === t ? "bg-foreground text-background border-foreground" : "border-foreground/25 text-foreground/70 hover:border-foreground"}`}>{t}</button>)}</div></fieldset>
                <Field id="scope" label="Scope Description *"><textarea id="scope" required rows={5} className={inputCls + " resize-none"} value={form.scope_description} onChange={(e) => set("scope_description", e.target.value)} placeholder="Describe the project scope, structural requirements, and key constraints..." /></Field>
                <div className="flex justify-between items-center"><button type="button" onClick={() => setStep(2)} className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground">← Back</button><button type="button" disabled={submitting || !form.scope_description.trim()} onClick={submit} className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-accent px-10 py-5 font-mono text-[12px] uppercase tracking-[0.25em] text-background hover:bg-foreground transition-colors disabled:opacity-50">{submitting ? "Submitting..." : "Initiate Feasibility Study"}{!submitting && <ArrowRight className="h-4 w-4" />}</button></div></div>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
