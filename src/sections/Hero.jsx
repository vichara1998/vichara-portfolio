import { motion } from "framer-motion";
import {
  ArrowDown,
  Github,
  Linkedin,
  Facebook,
  Download,
  ArrowUpRight,
} from "lucide-react";
import { PERSONAL, PROJECTS } from "../data";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[88vh] flex items-center overflow-hidden"
    >
      <div className="section-container relative z-10 w-full pt-28 pb-20 md:pt-36 md:pb-24">
        <div className="grid md:grid-cols-[1.2fr_0.8fr] items-center gap-12 md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <p className="mb-5 text-sm font-medium text-[var(--color-accent-2)]">
              Software engineering undergraduate · Sri Lanka
            </p>
            <h1 className="font-display text-6xl leading-[0.95] md:text-8xl text-white">
              {PERSONAL.name.split(" ").map((part) => (
                <span key={part} className="block">
                  {part}
                </span>
              ))}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-400 md:text-xl">
              I build practical software, with a focus on Java, Android and
              backend development.
            </p>
            <p className="mt-3 max-w-lg leading-relaxed text-slate-500">
              Currently studying at The Open University of Sri Lanka and looking
              for an internship where I can contribute to a thoughtful
              engineering team.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href="#projects"
                onClick={(event) => {
                  event.preventDefault();
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex min-h-11 items-center gap-2 border-b border-[var(--color-accent)] pb-1 font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-text)]"
              >
                Explore selected work <ArrowUpRight size={16} />
              </a>
              <a
                href={PERSONAL.resumeUrl}
                download
                className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
              >
                <Download size={15} /> Resume
              </a>
            </div>

            <div className="mt-10 flex items-center gap-5 border-t border-white/10 pt-5">
              <span className="text-sm text-slate-500">Elsewhere</span>
              {[
                {
                  icon: Github,
                  href: PERSONAL.socials.github,
                  label: "GitHub",
                },
                {
                  icon: Linkedin,
                  href: PERSONAL.socials.linkedin,
                  label: "LinkedIn",
                },
                {
                  icon: Facebook,
                  href: PERSONAL.socials.facebook,
                  label: "Facebook",
                },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-slate-500 transition-colors hover:text-[var(--color-accent)]"
                >
                  <Icon size={17} strokeWidth={1.7} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-[300px] md:ml-auto"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-2">
              <div className="h-full w-full overflow-hidden rounded-sm bg-[var(--color-surface-2)]">
                {PERSONAL.photo ? (
                  <img
                    src={PERSONAL.photo}
                    alt={PERSONAL.name}
                    className="h-full w-full object-cover object-center"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center font-display text-8xl text-[var(--color-accent)]">
                    {PERSONAL.initials}
                  </div>
                )}
              </div>
            </div>
            <figcaption className="mt-3 flex items-center justify-between border-t border-[var(--color-border)] pt-3 text-xs text-slate-500">
              <span>{PERSONAL.location}</span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-2)]" />
                Open to internship opportunities
              </span>
            </figcaption>
          </motion.figure>
        </div>

        <div className="mt-12 grid grid-cols-2 border-y border-[var(--color-border-soft)] md:grid-cols-4">
          {[
            {
              label: "Selected projects",
              value: String(PROJECTS.length).padStart(2, "0"),
            },
            { label: "Primary language", value: "Java" },
            { label: "Degree", value: "BSE (Hons)" },
            { label: "Current goal", value: "Software internship" },
          ].map(({ label, value }, index) => (
            <div
              key={label}
              className={`border-b border-[var(--color-border-soft)] py-4 ${index % 2 === 0 ? "border-r pr-4" : "pl-4"} ${index > 1 ? "border-b-0" : ""} md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0`}
            >
              <p className="text-[10px] uppercase text-slate-500">{label}</p>
              <p className="mt-1 text-sm font-medium text-white">{value}</p>
            </div>
          ))}
        </div>

        <a
          href="#about"
          className="mt-12 flex w-fit items-center gap-2 text-xs text-slate-500 hover:text-white md:mt-16"
        >
          <ArrowDown size={14} /> Continue
        </a>
      </div>
    </section>
  );
}
