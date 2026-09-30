import { ArrowUp } from "lucide-react";
import { PERSONAL } from "../data";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-soft)] py-7">
      <div className="section-container">
        <div className="flex flex-col items-start justify-between gap-4 text-xs text-slate-500 sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {PERSONAL.name}
          </span>
          <a
            href="#hero"
            className="inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            Back to top <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
