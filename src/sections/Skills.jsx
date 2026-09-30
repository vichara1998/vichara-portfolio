import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SKILLS } from "../data";

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs text-[var(--color-accent)]">
              02
            </span>
            <span className="text-xs uppercase text-slate-500">
              Technical toolkit
            </span>
            <div className="h-px flex-1 bg-[var(--color-border-soft)]" />
          </div>

          <h2 className="section-title text-white">Tools I work with</h2>
          <p className="mt-4 max-w-xl text-slate-400">
            Technologies used in my coursework and projects, grouped by where I
            tend to use them.
          </p>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-3 md:gap-12">
          {SKILLS.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: categoryIndex * 0.1 }}
              className="border-t border-[var(--color-border-soft)] pt-5"
            >
              <h3 className="font-medium text-white">{category.category}</h3>
              <ul className="mt-4 divide-y divide-[var(--color-border-soft)]">
                {category.items.map((skill) => (
                  <li
                    key={skill.name}
                    className="py-2.5 text-sm text-slate-400"
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
