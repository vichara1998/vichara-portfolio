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
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-md border-b shadow-xl transition-colors duration-300 bg-[#FAF6E9]/80 text-amber-950 border-[#D7A65A]/40 dark:bg-[#3B200B]/90 dark:text-[#FFF8E8] dark:border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-electric-400 to-violet-500 flex items-center justify-center shadow-lg shadow-electric-500/30 group-hover:shadow-electric-500/50 transition-shadow">
                <span className="font-display font-bold text-white text-sm">
                  {PERSONAL.initials}
                </span>
              </div>
              <span className="font-display font-semibold text-amber-950 dark:text-white hidden sm:block">
                {PERSONAL.name.split(" ")[0]}
                <span className="text-electric-400">.</span>
              </span>
            </motion.button>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNav(link.href)}
                    className={`relative px-4 py-2 text-sm font-body font-medium rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "text-electric-400 dark:text-electric-400"
                        : "text-slate-800 hover:text-amber-950 dark:text-slate-300 dark:hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-electric-500/10 rounded-lg border border-electric-500/30 dark:border-electric-500/20"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.4,
                        }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggle}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-800 hover:text-amber-950 hover:bg-[#FAF6E9]/80 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10 transition-all duration-200"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isDark ? "moon" : "sun"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDark ? <Sun size={17} /> : <Moon size={17} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              {/* Resume Button */}
              <motion.a
                href={PERSONAL.resumeUrl}
                download
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-electric-500/10 hover:bg-electric-500/20 border border-electric-500/30 hover:border-electric-500/60 text-electric-400 text-sm font-medium transition-all duration-200"
              >
                <Download size={14} />
                Resume
              </motion.a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-800 hover:text-amber-950 hover:bg-[#FAF6E9]/80 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10 transition-all"
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
            className="fixed top-16 inset-x-0 z-40 backdrop-blur-md bg-[#FAF6E9]/90 border-b border-[#D7A65A]/30 dark:bg-[#3B200B]/95 dark:border-white/10 md:hidden"
          >
            <div className="section-container py-6 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left px-4 py-3 rounded-xl text-slate-800 hover:text-electric-400 hover:bg-electric-500/10 dark:text-slate-300 dark:hover:text-electric-400 font-medium transition-all"
                >
                  {link.label}
                </button>
              ))}
              <a
                href={PERSONAL.resumeUrl}
                download
                className="mt-2 flex items-center gap-2 px-4 py-3 rounded-xl bg-electric-500/15 border border-electric-500/30 text-electric-400 font-medium"
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
