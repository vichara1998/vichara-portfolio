import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { scrollBehavior } from "../scrollBehavior";
import "./ProjectModal.css";
import {
  X,
  Github,
  ExternalLink,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Maximize2,
  Layers,
  ArrowUpRight,
} from "lucide-react";

/**
 * Full-screen modal showing detailed project info:
 * description, tech stack, highlights, and screenshots.
 */
export default function ProjectModal({ project, onClose }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const dialogRef = useRef(null);
  const thumbnailRailRef = useRef(null);

  useEffect(() => {
    if (!project) return undefined;

    setActiveImageIndex(0);
    const previousFocus = document.activeElement;
    const dialog = dialogRef.current;
    dialog?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab" && dialog) {
        const focusable = Array.from(dialog.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex="0"]',
        ));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first) {
          event.preventDefault();
          dialog.focus();
        } else if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement) || document.activeElement === dialog)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement) || document.activeElement === dialog)) {
          event.preventDefault();
          first.focus();
        }
      }
      if (!project.images?.length) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveImageIndex((index) =>
          (index - 1 + project.images.length) % project.images.length,
        );
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveImageIndex((index) => (index + 1) % project.images.length);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus({ preventScroll: true });
    };
  }, [project, onClose]);

  useEffect(() => {
    const rail = thumbnailRailRef.current;
    const thumbnail = rail?.children[activeImageIndex];
    if (thumbnail) rail.scrollTo({
      left: thumbnail.offsetLeft - (rail.clientWidth - thumbnail.offsetWidth) / 2,
      behavior: scrollBehavior(),
    });
  }, [activeImageIndex, project]);

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

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="project-detail-overlay"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          ref={dialogRef}
          tabIndex={-1}
          aria-modal="true"
          aria-labelledby="project-title"
          className="project-detail-modal"
          style={{ "--project-color": project.color }}
        >
          <header className="project-detail-header">
            <div className="min-w-0">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                {(project.categories || []).map((category) => (
                  <span key={category} className="project-detail-category">{category}</span>
                ))}
                {project.year && <span className="ml-1 text-xs text-slate-500">{project.year}</span>}
              </div>
              <h2 id="project-title" className="project-detail-title">{project.title}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400">{project.description}</p>
            </div>
            <button type="button" onClick={onClose} className="project-detail-icon-button shrink-0" aria-label="Close project details">
              <X size={20} aria-hidden="true" />
            </button>
          </header>

          <div className="project-detail-scroll">
            {images.length > 0 && (
              <section aria-label={`${project.title} screenshots`} className="project-detail-gallery">
                <div className="project-gallery-toolbar">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <ImageIcon size={17} className="text-[var(--color-accent)]" aria-hidden="true" />
                    Project gallery
                  </div>
                  <a href={activeImage} target="_blank" rel="noopener noreferrer" className="project-gallery-fullsize" aria-label={`Open screenshot ${activeImageIndex + 1} at full size in a new tab`}>
                    <Maximize2 size={15} aria-hidden="true" />
                    <span className="hidden sm:inline">Full size</span>
                  </a>
                </div>
                <div className={`project-gallery-stage${project.categories?.includes("Mobile") ? " is-mobile-project" : ""}`}>
                  <motion.img
                    key={activeImage}
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    src={activeImage}
                    alt={`${project.title}, screenshot ${activeImageIndex + 1} of ${images.length}`}
                    className="project-gallery-image"
                  />
                </div>
                <div className="project-gallery-navigation">
                  <p className="text-xs text-slate-500" role="status" aria-atomic="true">
                    <span className="font-medium text-[var(--color-text)]">{String(activeImageIndex + 1).padStart(2, "0")}</span>
                    <span className="mx-2">/</span>{String(images.length).padStart(2, "0")}
                  </p>
                  {images.length > 1 && (
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={showPreviousImage} className="project-detail-icon-button" aria-label="Previous screenshot"><ChevronLeft size={19} aria-hidden="true" /></button>
                      <button type="button" onClick={showNextImage} className="project-detail-icon-button" aria-label="Next screenshot"><ChevronRight size={19} aria-hidden="true" /></button>
                    </div>
                  )}
                </div>
                {images.length > 1 && (
                  <div ref={thumbnailRailRef} className="project-gallery-thumbnails" role="group" aria-label="Choose a screenshot">
                    {images.map((image, index) => (
                      <button
                        key={image}
                        type="button"
                        onClick={() => setActiveImageIndex(index)}
                        aria-label={`Show screenshot ${index + 1}`}
                        aria-pressed={activeImageIndex === index}
                        className={`project-gallery-thumbnail${activeImageIndex === index ? " is-selected" : ""}${project.categories?.includes("Mobile") ? " is-mobile-project" : ""}`}
                      >
                        <img src={image} alt="" loading="lazy" draggable={false} />
                        <span>{String(index + 1).padStart(2, "0")}</span>
                      </button>
                    ))}
                  </div>
                )}
              </section>
            )}

            <div className="project-detail-info">
              <section aria-labelledby="project-overview-title">
                <h3 id="project-overview-title" className="project-detail-heading">About the project</h3>
                <p className="text-sm leading-[1.85] text-slate-400">{project.longDescription || project.description}</p>
                <h3 className="project-detail-heading mt-7"><Layers size={17} aria-hidden="true" />Built with</h3>
                <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
                  {project.tech.map((technology) => <li key={technology} className="project-detail-tech">{technology.trim()}</li>)}
                </ul>
              </section>
              {project.highlights?.length > 0 && (
                <section className="project-detail-highlights" aria-labelledby="project-highlights-title">
                  <h3 id="project-highlights-title" className="project-detail-heading">Key features</h3>
                  <ul className="space-y-4">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm leading-relaxed text-slate-400">
                        <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>

          {(project.github || project.demo) && (
            <footer className="project-detail-footer">
              <p className="hidden text-xs text-slate-500 sm:block">Explore the implementation</p>
              <div className="flex flex-wrap items-center gap-3">
                {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-detail-action"><Github size={17} aria-hidden="true" />Source code<ArrowUpRight size={15} aria-hidden="true" /></a>}
                {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-detail-action is-primary"><ExternalLink size={17} aria-hidden="true" />Live demo</a>}
              </div>
            </footer>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
