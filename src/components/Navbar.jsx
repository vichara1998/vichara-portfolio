import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, SunMoon, FileDown, Menu, X } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { PERSONAL, NAV_LINKS } from "../data";
import { scrollBehavior } from "../scrollBehavior";

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
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        className="fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200"
        style={{
          backgroundColor: scrolled
            ? "color-mix(in srgb, var(--color-bg) 94%, transparent)"
            : "transparent",
          borderColor: scrolled ? "var(--color-border-soft)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <div className="section-container">
          <div className="flex h-[4.25rem] items-center justify-between">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: scrollBehavior() })}
              className="text-sm font-semibold tracking-normal text-white"
              aria-label="Back to top"
            >
              {PERSONAL.name}
            </button>

            <div className="hidden items-center gap-6 md:flex">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNav(link.href)}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative py-2 text-xs transition-colors duration-200 ${isActive ? "text-white" : "text-slate-500 hover:text-white"}`}
                  >
                    {link.label}
                    <span
                      className={`absolute inset-x-0 bottom-0 h-px bg-[var(--color-accent)] transition-transform ${isActive ? "scale-x-100" : "scale-x-0"}`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={cycleTheme}
                className="nav-theme-toggle flex h-11 min-w-11 items-center justify-center gap-2 px-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                aria-label={`Theme: ${themeLabel}${mode === "auto" ? " (follows system)" : ""}. Switch to ${nextMode} mode`}
                title={`Theme: ${themeLabel}. Click for ${nextMode} mode`}
              >
                <ThemeIcon size={19} aria-hidden="true" />
                <span className="hidden text-xs sm:inline">{themeLabel}</span>
              </button>

              <a
                href={PERSONAL.resumeUrl}
                download="Vichara_Tharkana_CV.pdf"
                className="nav-resume-link hidden items-center gap-2 sm:inline-flex"
                aria-label="Download resume as PDF"
              >
                <FileDown size={17} strokeWidth={1.6} aria-hidden="true" />
                Resume
              </a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex h-9 w-9 items-center justify-center text-slate-400 transition-colors hover:text-white md:hidden"
                aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={mobileOpen}
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
            className="fixed inset-x-0 top-[4.25rem] z-40 border-b border-[var(--color-border-soft)] bg-[var(--color-bg)] md:hidden"
          >
            <div className="section-container flex flex-col py-4">
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
                <FileDown size={17} strokeWidth={1.6} aria-hidden="true" />
                Download resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
