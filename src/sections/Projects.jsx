import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Github,
} from "lucide-react";
import { PROJECTS, PERSONAL } from "../data";
import ProjectModal from "../components/ProjectModal";

const PROJECT_FILTERS = ["All", "AI", "Mobile", "Web"];

function ProjectCard({ project, index, active, onOpen }) {
  const coverImage = project.images?.[0];

  return (
    <motion.article
      aria-label={`${project.title}${active ? ", selected project" : ""}`}
      aria-current={active ? "true" : undefined}
      animate={{ scale: active ? 1 : 0.94, opacity: active ? 1 : 0.68 }}
      transition={{ duration: 0.25 }}
      className="w-[min(82vw,390px)] shrink-0 snap-center"
    >
      <div
        className="group h-full overflow-hidden border border-[var(--color-border-soft)] shadow-xl transition-colors duration-300 hover:border-[var(--color-accent)]"
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--color-surface) 76%, transparent)",
        }}
      >
        <button
          type="button"
          onClick={() => onOpen(project)}
          aria-label={`Open ${project.title} project details`}
          className="relative block h-56 w-full overflow-hidden bg-black/15 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
        >
          {coverImage ? (
            <>
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(145deg, ${project.color}35, rgba(0, 0, 0, 0.36))`,
                }}
              />
              <img
                src={coverImage}
                alt={`${project.title} preview`}
                loading={active ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </>
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center overflow-hidden"
              style={{
                background: `radial-gradient(circle at 75% 25%, ${project.color}55, transparent 38%), linear-gradient(145deg, color-mix(in srgb, var(--color-surface-2) 76%, transparent), color-mix(in srgb, var(--color-bg) 92%, transparent))`,
              }}
            >
              <span
                aria-hidden="true"
                className="relative text-7xl drop-shadow-2xl transition-transform duration-300 group-hover:scale-110"
              >
                {project.emoji}
              </span>
            </div>
          )}
          <span className="absolute left-4 top-4 font-mono text-xs text-white drop-shadow">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="absolute right-4 top-4 border border-white/25 bg-black/45 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white">
            {project.categories[0]}
          </span>
        </button>

        <div className="flex min-h-56 flex-col p-5 sm:p-6">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-xl leading-snug text-white sm:text-2xl">
                {project.title}
              </h3>
              {project.year && (
                <p className="mt-1 font-mono text-xs text-slate-500">
                  {project.year}
                </p>
              )}
            </div>
            <ArrowUpRight
              size={18}
              aria-hidden="true"
              className="mt-1 shrink-0 text-[var(--color-accent)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </div>

          <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-slate-400">
            {project.description}
          </p>

          <div className="mt-auto flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((technology) => (
              <span
                key={technology}
                className="border border-[var(--color-border-soft)] bg-white/5 px-2 py-1 text-[10px] text-slate-400"
              >
                {technology}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="px-1 py-1 text-[10px] text-slate-500">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-[var(--color-border-soft)] pt-4">
            <button
              type="button"
              onClick={() => onOpen(project)}
              className="text-xs font-medium text-[var(--color-accent)] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            >
              Explore project
            </button>
            <div className="flex items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} source code`}
                  onClick={(event) => event.stopPropagation()}
                  className="text-slate-500 transition-colors hover:text-white"
                >
                  <Github size={16} />
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live demo`}
                  onClick={(event) => event.stopPropagation()}
                  className="text-slate-500 transition-colors hover:text-white"
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const carouselRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeProject, setActiveProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleProjects = PROJECTS.filter(
    (project) =>
      activeFilter === "All" || project.categories.includes(activeFilter),
  );

  useEffect(() => {
    setActiveIndex(0);
    carouselRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, [activeFilter]);

  function updateActiveCard() {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const center = carousel.getBoundingClientRect().left + carousel.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    Array.from(carousel.children).forEach((card, index) => {
      const cardCenter = card.getBoundingClientRect().left + card.clientWidth / 2;
      const distance = Math.abs(center - cardCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex((currentIndex) =>
      currentIndex === closestIndex ? currentIndex : closestIndex,
    );
  }

  function moveCarousel(direction) {
    const nextIndex = Math.max(
      0,
      Math.min(visibleProjects.length - 1, activeIndex + direction),
    );
    carouselRef.current?.children[nextIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
    setActiveIndex(nextIndex);
  }

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="mb-4 flex items-center gap-4">
            <span className="font-mono text-xs text-[var(--color-accent)]">
              03
            </span>
            <span className="text-xs uppercase text-slate-500">
              Selected work
            </span>
            <div className="h-px flex-1 bg-[var(--color-border-soft)]" />
          </div>
          <h2 className="section-title text-white">Projects and experiments</h2>
          <p className="mt-4 max-w-xl text-slate-400">
            A few pieces of work from coursework and independent learning,
            across mobile, web and applied machine learning.
          </p>
        </motion.div>

        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            {String(visibleProjects.length).padStart(2, "0")} projects
          </p>
          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-1"
          >
            {PROJECT_FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
                className={`border-b px-3 py-2 text-xs transition-colors ${activeFilter === filter ? "border-[var(--color-accent)] text-[var(--color-accent)]" : "border-transparent text-slate-500 hover:text-white"}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <div
            ref={carouselRef}
            onScroll={updateActiveCard}
            className="flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto overflow-y-hidden px-[max(1.5rem,calc((100%-min(82vw,390px))/2))] py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="region"
            aria-label="Project cards"
          >
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                active={index === activeIndex}
                onOpen={setActiveProject}
              />
            ))}
          </div>

          <div className="mt-5 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => moveCarousel(-1)}
              disabled={activeIndex === 0}
              aria-label="Previous project"
              className="flex h-10 w-10 items-center justify-center border border-[var(--color-border-soft)] text-slate-400 transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowLeft size={17} />
            </button>
            <div className="flex items-center gap-2" aria-label="Project position">
              {visibleProjects.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => moveCarousel(index - activeIndex)}
                  aria-label={`Go to project ${index + 1}: ${project.title}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className={`h-1.5 transition-all ${
                    index === activeIndex
                      ? "w-7 bg-[var(--color-accent)]"
                      : "w-1.5 bg-[var(--color-border)] hover:bg-[var(--color-accent)]"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => moveCarousel(1)}
              disabled={activeIndex === visibleProjects.length - 1}
              aria-label="Next project"
              className="flex h-10 w-10 items-center justify-center border border-[var(--color-border-soft)] text-slate-400 transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowRight size={17} />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href={PERSONAL.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-electric-400"
          >
            <Github size={16} />
            See more on GitHub
            <ExternalLink
              size={13}
              className="opacity-0 transition-opacity group-hover:opacity-100"
            />
          </a>
        </motion.div>
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
