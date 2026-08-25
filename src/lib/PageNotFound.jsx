import { useLocation, Link } from "react-router-dom";

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname.replace(/^\//, "") || "requested page";

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-grid bg-background">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2"><h1 className="display-heading text-7xl text-accent">404</h1><div className="h-px w-16 bg-foreground/20 mx-auto" /></div>
        <div className="space-y-3"><h2 className="font-heading text-2xl font-light">Page Not Found</h2><p className="text-foreground/60 leading-relaxed">The page <span className="font-mono text-foreground">"{pageName}"</span> could not be found.</p></div>
        <Link to="/" className="inline-flex items-center px-5 py-3 text-xs font-mono uppercase tracking-[0.2em] text-background bg-foreground hover:bg-accent transition-colors">Return Home</Link>
      </div>
    </div>
  );
}
