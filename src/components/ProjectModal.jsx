import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, CheckCircle2 } from "lucide-react";

/**
 * Full-screen modal showing detailed project info:
 * description, tech stack, highlights, and screenshots.
 */
export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

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
          className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-none bg-navy-900 border border-white/10 shadow-2xl"
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

            {project.images?.length > 0 && (
              <div className="mb-8">
                <h3 className="mb-3 text-sm font-medium text-white">
                  Screenshots
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {project.images.map((img, i) => (
                    <div
                      key={i}
                      className="rounded-xl overflow-hidden border border-white/10 bg-navy-800"
                    >
                      <img
                        src={img}
                        alt={`${project.title} screenshot ${i + 1}`}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
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
