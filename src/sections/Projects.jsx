import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { PROJECTS, PERSONAL } from "../data";
import ProjectModal from "../components/ProjectModal";

const PROJECT_FILTERS = ["All", "AI", "Mobile", "Web"];

function ProjectCard({ project, index, onOpen }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group border-t border-[var(--color-border-soft)]"
    >
      <div className="grid gap-4 py-6 md:grid-cols-[48px_1fr_1.25fr_120px] md:items-start md:gap-8">
        <span className="pt-1 font-mono text-xs text-slate-500">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="group/title flex items-start gap-2 text-left font-display text-2xl leading-tight text-white transition-colors hover:text-[var(--color-accent)]"
          >
            {project.title}
            <ArrowUpRight
              size={16}
              className="mt-1 shrink-0 text-[var(--color-accent)] opacity-0 transition-opacity group-hover/title:opacity-100"
            />
          </button>
          <p className="mt-2 text-xs text-slate-500">{project.year}</p>
        </div>
        <div>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-400">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5">
            {project.tech.map((technology) => (
              <span key={technology} className="text-xs text-slate-500">
                {technology}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 md:flex-col md:items-start md:pt-1">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-white"
          >
            <Github size={13} />
            Source
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-white"
            >
              <ExternalLink size={13} /> Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeProject, setActiveProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const visibleProjects = PROJECTS.filter(
    (project) =>
      activeFilter === "All" || project.categories.includes(activeFilter),
  );

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="section-container">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[var(--color-accent)] font-mono text-xs">
              03
            </span>
            <span className="text-slate-500 text-xs uppercase">
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

        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
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

        <div className="border-b border-[var(--color-border-soft)]">
          {visibleProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={setActiveProject}
            />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href={PERSONAL.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-electric-400 text-sm font-medium transition-colors group"
          >
            <Github size={16} />
            See more on GitHub
            <ExternalLink
              size={13}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </a>
        </motion.div>
      </div>

      {/* Project detail modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
