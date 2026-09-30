import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Download, Menu, X } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { PERSONAL, NAV_LINKS } from "../data";

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

export default function Navbar() {
  const { isDark, toggle } = useTheme();
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
    if (el) el.scrollIntoView({ behavior: "smooth" });
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
          <div className="flex h-[68px] items-center justify-between">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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
                onClick={toggle}
                className="flex h-9 w-9 items-center justify-center text-slate-500 transition-colors hover:text-white"
                aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
              >
                {isDark ? <Sun size={17} /> : <Moon size={17} />}
              </button>

              <a
                href={PERSONAL.resumeUrl}
                download
                className="hidden items-center gap-2 border-b border-[var(--color-accent)] py-2 text-xs font-medium text-[var(--color-accent)] transition-colors hover:text-white sm:flex"
              >
                <Download size={14} />
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
            className="fixed inset-x-0 top-[68px] z-40 border-b border-[var(--color-border-soft)] bg-[var(--color-bg)] md:hidden"
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
                download
                className="mt-3 flex items-center gap-2 py-3 text-sm font-medium text-[var(--color-accent)]"
              >
                <Download size={16} />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
