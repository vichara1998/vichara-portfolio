import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { PERSONAL } from "../data";

const FOCUS_AREAS = [
  {
    number: "01",
    title: "Mobile applications",
    detail: "Java, Android and SQLite",
  },
  {
    number: "02",
    title: "Web development",
    detail: "JavaScript, PHP and MySQL",
  },
  {
    number: "03",
    title: "Applied projects",
    detail: "IoT prototypes and machine learning",
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Section label */}
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs text-[var(--color-accent)]">
              01
            </span>
            <span className="text-xs uppercase text-slate-500">Profile</span>
            <div className="h-px flex-1 bg-[var(--color-border-soft)]" />
          </div>

          <h2 className="section-title mb-12 text-white">
            A little about my work
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left- Bio text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-5"
          >
            <p className="text-slate-300 text-lg leading-relaxed">
              I'm{" "}
              <span className="font-semibold text-white">{PERSONAL.name}</span>,
              a software engineering undergraduate at The Open University of Sri
              Lanka. I work mainly in Java and have built Android applications,
              database-backed web projects and small IoT systems.
            </p>
            <p className="text-slate-400 leading-relaxed">
              My recent work includes mobile navigation, service-booking
              workflows, and a knowledge-grounded customer support chatbot. I
              enjoy working through the practical details: data, application
              behavior and the interface people use.
            </p>
            <p className="text-slate-400 leading-relaxed">
              I am currently looking for a software engineering internship where
              I can learn from an experienced team and contribute to production
              work.
            </p>

            <div className="flex flex-col gap-3 border-t border-[var(--color-border-soft)] pt-5 sm:flex-row sm:flex-wrap sm:gap-x-6">
              {[
                { icon: MapPin, text: PERSONAL.location },
                {
                  icon: Mail,
                  text: PERSONAL.email,
                  href: `mailto:${PERSONAL.email}`,
                },
                {
                  icon: Phone,
                  text: PERSONAL.phone,
                  href: `tel:${PERSONAL.phone.replaceAll(" ", "")}`,
                },
              ].map(({ icon: Icon, text, href }) => {
                const Element = href ? "a" : "span";
                return (
                  <Element
                    key={text}
                    href={href}
                    className="flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-white"
                  >
                    <Icon size={14} className="text-[var(--color-accent)]" />
                    {text}
                  </Element>
                );
              })}
            </div>
          </motion.div>

          {/* Right- Fun stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="border-t border-[var(--color-border-soft)]"
          >
            {FOCUS_AREAS.map(({ number, title, detail }, i) => (
              <motion.div
                key={number}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                className="grid grid-cols-[40px_1fr] gap-4 border-b border-[var(--color-border-soft)] py-6"
              >
                <span className="font-mono text-xs text-[var(--color-accent)]">
                  {number}
                </span>
                <div>
                  <h3 className="font-medium text-white">{title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{detail}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
