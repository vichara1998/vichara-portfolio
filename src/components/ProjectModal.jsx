import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Github,
  ExternalLink,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/**
 * Full-screen modal showing detailed project info:
 * description, tech stack, highlights, and screenshots.
 */
export default function ProjectModal({ project, onClose }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (!project) return undefined;

    setActiveImageIndex(0);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
      if (!project.images?.length) return;

      if (event.key === "ArrowLeft") {
        setActiveImageIndex((index) =>
          (index - 1 + project.images.length) % project.images.length,
        );
      } else if (event.key === "ArrowRight") {
        setActiveImageIndex((index) => (index + 1) % project.images.length);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;
  const images = project.images || [];
  const activeImage = images[activeImageIndex];

  function showPreviousImage() {
    setActiveImageIndex(
      (activeImageIndex - 1 + images.length) % images.length,
    );
  }

  function showNextImage() {
    setActiveImageIndex((activeImageIndex + 1) % images.length);
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" />

        {/* Modal card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-title"
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-none bg-navy-900 border border-white/10 shadow-2xl"
        >
          <div className="relative flex min-h-36 items-end justify-between gap-6 border-b border-white/10 px-6 py-7 md:px-8">
            <div>
              <p className="mb-3 font-mono text-xs text-[var(--color-accent)]">
                Project {project.year ? `· ${project.year}` : ""}
              </p>
              <h2
                id="project-title"
                className="max-w-2xl font-display text-3xl leading-tight text-white md:text-4xl"
              >
                {project.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/10 text-slate-400 transition-colors hover:text-white"
              aria-label="Close project details"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-6 flex flex-wrap gap-x-4 gap-y-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="border-b border-white/10 pb-1 text-xs text-slate-500"
                >
                  {t}
                </span>
              ))}
            </div>

            <p className="text-slate-400 leading-relaxed mb-6">
              {project.longDescription || project.description}
            </p>

            {project.highlights && project.highlights.length > 0 && (
              <div className="mb-8">
                <h3 className="mb-3 text-sm font-medium text-white">
                  Highlights
                </h3>
                <ul className="space-y-2.5">
                  {project.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-slate-400"
                    >
                      <CheckCircle2
                        size={16}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: project.color }}
                      />
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {images.length > 0 && (
              <section
                className="mb-8"
                aria-label={`${project.title} screenshots`}
              >
                <div className="mb-3 flex items-center justify-between gap-4">
                  <h3 className="text-sm font-medium text-white">
                    App screenshots
                  </h3>
                  <p
                    className="font-mono text-xs text-slate-500"
                    aria-live="polite"
                  >
                    {String(activeImageIndex + 1).padStart(2, "0")} /{" "}
                    {String(images.length).padStart(2, "0")}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_104px]">
                  <div className="relative flex h-[52vh] min-h-72 max-h-[680px] items-center justify-center overflow-hidden border border-white/10 bg-black/20 p-3 sm:h-[62vh] sm:p-5">
                    <motion.img
                      key={activeImage}
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      src={activeImage}
                      alt={`${project.title} app screen ${activeImageIndex + 1}`}
                      className="h-full w-full object-contain"
                    />
                    {images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={showPreviousImage}
                          aria-label="Show previous screenshot"
                          className="absolute left-3 flex h-10 w-10 items-center justify-center border border-white/15 bg-black/60 text-white transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          type="button"
                          onClick={showNextImage}
                          aria-label="Show next screenshot"
                          className="absolute right-3 flex h-10 w-10 items-center justify-center border border-white/15 bg-black/60 text-white transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}
                  </div>

                  {images.length > 1 && (
                    <div
                      className="flex gap-2 overflow-x-auto pb-1 sm:max-h-[62vh] sm:flex-col sm:overflow-y-auto sm:overflow-x-hidden sm:pb-0"
                      role="group"
                      aria-label="Choose a screenshot"
                    >
                      {images.map((image, index) => (
                        <button
                          key={image}
                          type="button"
                          onClick={() => setActiveImageIndex(index)}
                          aria-label={`Show screenshot ${index + 1}`}
                          aria-pressed={activeImageIndex === index}
                          className={`relative w-20 shrink-0 overflow-hidden border bg-black/20 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] sm:w-full ${
                            activeImageIndex === index
                              ? "border-[var(--color-accent)]"
                              : "border-white/10 opacity-65 hover:border-white/40 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={image}
                            alt=""
                            loading="lazy"
                            className="aspect-[3/4] w-full object-contain"
                          />
                          <span className="absolute bottom-1 right-1 bg-black/70 px-1.5 py-0.5 font-mono text-[10px] text-white">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Select a preview or use ← / → to browse
                </p>
              </section>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-2 border border-white/10 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/25"
              >
                <Github size={16} />
                View Source Code
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-2 border border-[var(--color-accent)] px-4 py-2.5 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-white"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
