import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, SunMoon, FileDown, Download, Menu, X } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { PERSONAL, NAV_LINKS } from "../data";
import { scrollBehavior } from "../scrollBehavior";
import "./Navbar.css";

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

export default function Navbar() {
  const { mode, nextMode, cycleTheme } = useTheme();
  const ThemeIcon = mode === "auto" ? SunMoon : mode === "dark" ? Moon : Sun;
  const themeLabel = mode.charAt(0).toUpperCase() + mode.slice(1);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useScrollSpy(SECTION_IDS, 120);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const dismiss = (event) => {
      if (event.type === "keydown" && event.key === "Escape") setMobileOpen(false);
      if (event.type === "pointerdown" && !event.target.closest(".reference-navbar, .reference-mobile-menu")) setMobileOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 640px)");
    const closeOnDesktop = () => { if (desktop.matches) setMobileOpen(false); };
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", dismiss);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", dismiss);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [mobileOpen]);

  const handleNav = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: scrollBehavior() });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`reference-navbar${scrolled ? " is-scrolled" : ""}`}
        aria-label="Main navigation"
      >
        <div className="reference-navbar-shell">
          <svg className="reference-navbar-curve" viewBox="0 0 128 100" preserveAspectRatio="none" aria-hidden="true">
            <defs><linearGradient id="nav-curve-gradient" x1="0" y1="1" x2="1" y2="0"><stop stopColor="var(--color-accent)" /><stop offset="1" stopColor="#b194e2" /></linearGradient></defs>
            <path d="M0 100C72 100 40 0 108 0H128C60 0 92 100 20 100Z" fill="url(#nav-curve-gradient)" />
          </svg>
          <div className="reference-navbar-row">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: scrollBehavior() })}
              className="reference-navbar-brand"
              aria-label="Back to top"
            >
              <span className="reference-brand-mark" aria-hidden="true">{PERSONAL.initials}</span>
              <span className="reference-brand-copy"><span>{PERSONAL.name}</span><small>Software engineering</small></span>
            </button>

            <div className="reference-navlinks">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNav(link.href)}
                    aria-current={isActive ? "location" : undefined}
                    className={`reference-navlink${isActive ? " is-active" : ""}`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            <div className="reference-navbar-actions">
              <button
                type="button"
                onClick={cycleTheme}
                className="nav-theme-toggle flex min-w-11 items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                aria-label={`Theme: ${themeLabel}${mode === "auto" ? " (follows system)" : ""}. Switch to ${nextMode} mode`}
                title={`Theme: ${themeLabel}. Click for ${nextMode} mode`}
              >
                <span className="nav-theme-icon" aria-hidden="true">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span key={mode} initial={{ opacity: 0, rotate: -75, scale: 0.6 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 75, scale: 0.6 }} transition={{ duration: 0.18 }}>
                      <ThemeIcon size={18} />
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="nav-theme-label hidden text-xs sm:inline">{themeLabel}</span>
              </button>

              <a
                href={PERSONAL.resumeUrl}
                download="Vichara_Tharkana_CV.pdf"
                className="nav-resume-link hidden items-center gap-2 sm:inline-flex"
                aria-label="Download resume as PDF"
              >
                <span className="nav-resume-icon"><FileDown size={17} strokeWidth={1.6} aria-hidden="true" /></span>
                <span>Resume</span>
                <Download className="nav-resume-arrow" size={14} aria-hidden="true" />
              </a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                type="button"
                className="reference-menu-toggle"
                aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            id="mobile-navigation"
            className="reference-mobile-menu"
          >
            <div className="flex flex-col p-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="border-b border-[var(--color-border-soft)] py-3 text-left text-sm text-slate-400 transition-colors hover:text-white"
                >
                  {link.label}
                </button>
              ))}
              <a
                href={PERSONAL.resumeUrl}
                download="Vichara_Tharkana_CV.pdf"
                onClick={() => setMobileOpen(false)}
                className="nav-resume-link mt-4 inline-flex items-center gap-2 self-start"
                aria-label="Download resume as PDF"
              >
                <span className="nav-resume-icon"><FileDown size={17} strokeWidth={1.6} aria-hidden="true" /></span>
                <span>Download resume</span>
                <Download className="nav-resume-arrow" size={14} aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
