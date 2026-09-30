import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PERSONAL } from "../data";

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 md:py-32">
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
            <span className="font-mono text-xs text-[var(--color-accent)]">
              04
            </span>
            <span className="text-xs uppercase text-slate-500">Next step</span>
            <div className="h-px flex-1 bg-[var(--color-border-soft)]" />
          </div>
          <h2 className="section-title text-white">
            Ready for my first industry role
          </h2>
        </motion.div>

        <div className="grid gap-8 border-t border-[var(--color-border-soft)] pt-6 md:grid-cols-[1fr_2fr] md:gap-16">
          <div>
            <p className="text-sm text-slate-500">Current availability</p>
            <p className="mt-2 font-medium text-[var(--color-accent-2)]">
              {PERSONAL.availability}
            </p>
          </div>
          <div className="max-w-2xl">
            <p className="leading-relaxed text-slate-400">
              I am at the beginning of my software engineering career. So far,
              my practical experience comes from university and independent
              projects, including Android applications, web systems and
              machine-learning coursework.
            </p>
            <a
              href={`mailto:${PERSONAL.email}`}
              className="mt-6 inline-flex items-center gap-2 border-b border-[var(--color-accent)] pb-1 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-white"
            >
              Get in touch <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
