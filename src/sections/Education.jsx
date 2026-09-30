import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen } from "lucide-react";
import { EDUCATION } from "../data";

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-24 md:py-32">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs text-[var(--color-accent)]">
              05
            </span>
            <span className="text-xs uppercase text-slate-500">Education</span>
            <div className="h-px flex-1 bg-[var(--color-border-soft)]" />
          </div>
          <h2 className="section-title text-white">Education and learning</h2>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-[1.5fr_0.7fr] md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="border-t border-[var(--color-border-soft)] pt-6"
          >
            <div>
              <h3 className="font-display text-2xl text-white">
                {EDUCATION.school}
              </h3>
              <p className="mt-2 text-slate-400">{EDUCATION.degree}</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-500">
                <span>{EDUCATION.graduation}</span>
                <span>GPA {EDUCATION.gpa}</span>
              </div>

              <div className="mt-8 border-t border-[var(--color-border-soft)] pt-5">
                <div className="mb-4 flex items-center gap-2 text-sm font-medium text-white">
                  <BookOpen size={15} className="text-[var(--color-accent)]" />
                  Relevant coursework
                </div>
                <ul className="grid gap-x-8 sm:grid-cols-2">
                  {EDUCATION.relevant.map((course) => (
                    <li
                      key={course}
                      className="border-t border-[var(--color-border-soft)] py-2.5 text-sm text-slate-400"
                    >
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col border-t border-[var(--color-border-soft)] pt-6"
          >
            <h3 className="text-sm font-medium text-white">
              Additional details
            </h3>
            <ul className="mt-4">
              {EDUCATION.activities.map((item) => (
                <li
                  key={item}
                  className="border-t border-[var(--color-border-soft)] py-3 text-sm leading-relaxed text-slate-400"
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-[var(--color-border-soft)] pt-5">
              <p className="text-sm font-medium text-white">
                Secondary education
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {EDUCATION.secondarySchool}
                <br />
                {EDUCATION.secondaryQual} · {EDUCATION.secondaryYear}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
