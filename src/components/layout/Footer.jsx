import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-[#F4F2EE] border-t border-[#1A1A1A]">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-16 md:py-20">
        <div className="flex items-center gap-4 pb-8 border-b border-[#F4F2EE]/15"><span className="font-mono text-[10px] tracking-[0.3em] text-[#F4F2EE]/50">TITLE BLOCK</span><span className="h-px flex-1 bg-[#F4F2EE]/15" /><span className="font-mono text-[10px] tracking-[0.2em] text-[#F4F2EE]/50">SHEET 05/05</span></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 py-10 border-b border-[#F4F2EE]/15">
          <div className="col-span-2 md:col-span-1"><div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#F4F2EE]/40 mb-3">Consultant</div><div className="font-heading text-2xl font-light">Tsega Tadesse</div><div className="font-mono text-[11px] text-[#F4F2EE]/60 mt-1">Civil Engineer & Consultant</div></div>
          <div><div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#F4F2EE]/40 mb-3">Practice</div><div className="text-sm text-[#F4F2EE]/80 leading-relaxed">East Africa<br />Independent consultancy<br />By appointment</div></div>
          <div><div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#F4F2EE]/40 mb-3">Contact</div><div className="text-sm text-[#F4F2EE]/80 leading-relaxed">Use the project requisition form<br />for the fastest response.</div></div>
          <div><div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#F4F2EE]/40 mb-3">Index</div><div className="text-sm text-[#F4F2EE]/80 leading-relaxed space-y-1"><a href="#projects" className="block hover:text-accent transition-colors">02 Dossiers</a><a href="#services" className="block hover:text-accent transition-colors">03 Matrix</a><a href="#about" className="block hover:text-accent transition-colors">04 Profile</a><a href="#contact" className="block hover:text-accent transition-colors">05 Requisition</a></div></div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-[10px] tracking-[0.2em] text-[#F4F2EE]/40"><div>© {new Date().getFullYear()} TSEGA TADESSE · ALL RIGHTS RESERVED</div><div className="flex items-center gap-6"><span>DATUM: WGS84</span><span>REV. A</span></div></div>
      </div>
    </footer>
  );
}
