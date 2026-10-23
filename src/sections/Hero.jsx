import { motion, useInView, MotionConfig } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SignatureVector from "../components/signature/SignatureVector";
import {
  ArrowDown,
  Github,
  Linkedin,
  Facebook,
  Download,
  ArrowUpRight,
  MapPin,
} from "lucide-react";
import { PERSONAL, PROJECTS } from "../data";
import { scrollBehavior } from "../scrollBehavior";
import "./Hero.css";

function AnimatedNameLine({ text, className, delay, play }) {
  return (
    <span className={`hero-name-line ${className}`} aria-hidden="true">
      {Array.from(text).map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          className="hero-name-character"
          initial={{ opacity: 0, y: "-105%" }}
          animate={{ opacity: play ? 1 : 0, y: play ? 0 : "-105%" }}
          transition={{ duration: 0.7, delay: play ? delay + index * 0.065 : 0, ease: [0.22, 1, 0.36, 1] }}
        >
          {letter === " " ? "\u00a0" : letter}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const backdropRef = useRef(null);
  const [portraitsReady, setPortraitsReady] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const hasEnteredView = useInView(heroRef, { once: true, amount: 0.15 });
  const playIntro = introReady && hasEnteredView;

  useEffect(() => {
    let cancelled = false;
    const fallback = window.setTimeout(() => setIntroReady(true), 2000);
    const portraits = Array.from(backdropRef.current.querySelectorAll("img"));
    Promise.all(portraits.map((portrait) => portrait.decode()))
      .then(() => { if (!cancelled) setPortraitsReady(true); })
      .catch(() => { /* Keep the original portrait if the next image cannot load. */ })
      .finally(() => {
        if (!cancelled) {
          window.clearTimeout(fallback);
          setIntroReady(true);
        }
      });
    return () => { cancelled = true; window.clearTimeout(fallback); };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className={`relative flex items-center overflow-hidden${hasEnteredView && portraitsReady ? " hero-transition-started" : ""}`}
    >
      <div ref={backdropRef} className="hero-backdrop" aria-hidden="true">
        <img
          src={`${import.meta.env.BASE_URL}bg1.jpg`}
          alt=""
          decoding="async"
          className="hero-background-image hero-background-image-down"
        />
        <img
          src={`${import.meta.env.BASE_URL}bg2.jpg`}
          alt=""
          decoding="async"
          className="hero-background-image hero-background-image-up"
        />
        <div className="hero-backdrop-overlay" />
      </div>
      <div className="section-container hero-content relative z-10 w-full">
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="hero-introduction"
          >
            <MotionConfig reducedMotion="never">
            <motion.p className="hero-greeting" initial={{ opacity: 0, y: -18 }} animate={{ opacity: playIntro ? 1 : 0, y: playIntro ? 0 : -18 }} transition={{ duration: 0.55, delay: playIntro ? 0.15 : 0 }}>Hi, I’m</motion.p>
            <h1 className="hero-name" aria-label={PERSONAL.name}>
              <AnimatedNameLine text={PERSONAL.name.split(" ")[0]} className="hero-name-first" delay={0.65} play={playIntro} />
              <AnimatedNameLine text={PERSONAL.name.split(" ").slice(1).join(" ")} className="hero-name-last" delay={1.4} play={playIntro} />
            </h1>
            <motion.p className="hero-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: playIntro ? 1 : 0 }} transition={{ duration: 0.5, delay: playIntro ? 2.3 : 0 }}>Software engineering undergraduate</motion.p>
            </MotionConfig>
            <p className="hero-location"><MapPin size={14} aria-hidden="true" />Sri Lanka<span aria-hidden="true">/</span>Open to internships</p>
            <p className="hero-lead">
              I build practical software, with a focus on Java, Android and
              backend development.
            </p>
            <p className="hero-description">
              Currently studying at The Open University of Sri Lanka and looking
              for an internship where I can contribute to a thoughtful
              engineering team.
            </p>

            <div className="hero-actions">
              <a
                href="#projects"
                onClick={(event) => {
                  event.preventDefault();
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: scrollBehavior() });
                }}
                className="hero-primary-link"
              >
                View projects <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a
                href={PERSONAL.resumeUrl}
                download="Vichara_Tharkana_CV.pdf"
                className="hero-secondary-link"
              >
                <Download size={16} aria-hidden="true" /> Download resume
              </a>
              <SignatureVector className="hero-signature" />
            </div>

            <div className="hero-socials">
              <span className="text-xs text-slate-500">Find me on</span>
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
