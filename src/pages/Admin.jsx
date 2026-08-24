import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";

const STATUSES = ["new", "reviewed", "consulted", "archived"];

export default function Admin() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  const load = async () => {
    try {
      const data = await base44.entities.Inquiry.list("-created_date", 100);
      setInquiries(data);
    } catch (e) {
      toast.error("Could not load inquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const setStatus = async (id, status) => {
    try {
      await base44.entities.Inquiry.update(id, { status });
      setInquiries((arr) => arr.map((i) => (i.id === id ? { ...i, status } : i)));
      toast.success("Status updated.");
    } catch (e) {
      toast.error("Update failed.");
    }
  };

  const statusColor = (s) => ({
    new: "border-accent text-accent",
    reviewed: "border-foreground/40 text-foreground",
    consulted: "border-foreground text-background bg-foreground",
    archived: "border-foreground/20 text-muted-foreground",
  }[s]);

  return (
    <div className="min-h-screen bg-grid bg-background">
      <header className="border-b border-foreground/15 sticky top-0 bg-background/90 backdrop-blur z-10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground inline-flex items-center gap-2">
              <ArrowLeft className="h-3.5 w-3.5" /> Home
            </Link>
            <span className="h-px w-8 bg-foreground/20" />
            <span className="section-label">Admin Console / Requisition Ledger</span>
          </div>
          <div className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
            {inquiries.length} records
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-6 md:px-10 py-10">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : inquiries.length === 0 ? (
          <div className="border border-foreground/15 p-16 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            No requisitions submitted yet.
          </div>
        ) : (
          <div className="border-t border-foreground/15">
            {inquiries.map((inq, idx) => (
              <div key={inq.id} className="border-b border-foreground/15">
                <div
                  className="grid grid-cols-12 gap-4 py-5 px-2 cursor-pointer hover:bg-secondary/40 transition-colors"
                  onClick={() => setExpanded(expanded === inq.id ? null : inq.id)}
                >
                  <div className="col-span-1 font-mono text-[11px] text-muted-foreground">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div className="col-span-3 font-heading text-lg font-light">
                    {inq.client_name}
                    {inq.organization && <span className="block font-mono text-[10px] text-muted-foreground">{inq.organization}</span>}
                  </div>
                  <div className="col-span-2 font-mono text-[11px] text-foreground/80 truncate">{inq.project_type}</div>
                  <div className="col-span-2 font-mono text-[11px] text-muted-foreground truncate">{inq.location || "—"}</div>
                  <div className="col-span-2 font-mono text-[10px] tracking-[0.15em] text-muted-foreground">
                    {inq.created_date ? new Date(inq.created_date).toLocaleDateString() : "—"}
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <span className={`px-3 py-1 border font-mono text-[10px] uppercase tracking-[0.2em] ${statusColor(inq.status)}`}>
                      {inq.status}
                    </span>
                  </div>
                </div>

                {expanded === inq.id && (
                  <div className="px-2 pb-8 animate-fade-up">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-l-2 border-accent/40 pl-6">
                      <div className="space-y-3">
                        <Row label="Email" value={inq.email} />
                        <Row label="Phone" value={inq.phone || "—"} />
                        <Row label="Budget" value={inq.budget_range || "—"} />
                        <Row label="Timeline" value={inq.timeline || "—"} />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Scope</div>
                        <p className="text-sm text-foreground/80 leading-relaxed">{inq.scope_description}</p>
                      </div>
                    </div>

                    <div className="mt-6 pl-6 flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mr-2">Set status:</span>
                      {STATUSES.map((s) => (
                        <button
                          key={s}
                          onClick={() => setStatus(inq.id, s)}
                          className={`px-3 py-1.5 border font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                            inq.status === s ? statusColor(s) : "border-foreground/20 text-muted-foreground hover:border-foreground hover:text-foreground"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                      <a
                        href={`mailto:${inq.email}?subject=Re: Your project inquiry — Tsega Tadesse`}
                        className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-accent hover:underline"
                      >
                        Reply →
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</div>
      <div className="text-sm text-foreground/85">{value}</div>
    </div>
  );
}