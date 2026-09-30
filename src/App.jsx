import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Contact from "./sections/Contact";

const AMBIENT_LIGHTS = [
  {
    left: "7%",
    top: "103%",
    delay: "-2.5s",
    duration: "38s",
    size: "5px",
  },
  {
    left: "17%",
    top: "103%",
    delay: "-6s",
    duration: "44s",
    size: "7px",
    secondary: true,
  },
  {
    left: "29%",
    top: "103%",
    delay: "-4s",
    duration: "36s",
    size: "4px",
  },
  {
    left: "41%",
    top: "103%",
    delay: "-7.2s",
    duration: "42s",
    size: "6px",
    secondary: true,
  },
  {
    left: "53%",
    top: "103%",
    delay: "-3.5s",
    duration: "40s",
    size: "5px",
  },
  {
    left: "64%",
    top: "103%",
    delay: "-8.5s",
    duration: "46s",
    size: "7px",
    secondary: true,
  },
  {
    left: "76%",
    top: "103%",
    delay: "-5.5s",
    duration: "35s",
    size: "4px",
  },
  {
    left: "88%",
    top: "103%",
    delay: "-9.4s",
    duration: "43s",
    size: "6px",
    secondary: true,
  },
  {
    left: "95%",
    top: "103%",
    delay: "-6.8s",
    duration: "39s",
    size: "5px",
  },
];

const AMBIENT_STREAKS = [
  { left: "11%", top: "0%", height: "148px", delay: "-2s", duration: "6s" },
  {
    left: "24%",
    top: "12%",
    height: "104px",
    delay: "-4s",
    duration: "7.5s",
    secondary: true,
  },
  { left: "38%", top: "0%", height: "210px", delay: "-5s", duration: "8s" },
  {
    left: "57%",
    top: "8%",
    height: "132px",
    delay: "-1s",
    duration: "6.5s",
    secondary: true,
  },
  { left: "72%", top: "0%", height: "188px", delay: "-6s", duration: "8.5s" },
  {
    left: "91%",
    top: "5%",
    height: "116px",
    delay: "-3s",
    duration: "7s",
    secondary: true,
  },
];

function AmbientBackground() {
  return (
    <div className="ambient-light-layer" aria-hidden="true">
      {AMBIENT_LIGHTS.map((streak, index) => (
        <span
          key={`bottom-${index}`}
          className={`ambient-streak ambient-streak-bottom${streak.secondary ? " ambient-streak-secondary" : ""}`}
          style={{
            left: streak.left,
            bottom: "0%",
            height: `${120 + (index % 3) * 32}px`,
            "--streak-delay": streak.delay,
            "--streak-duration": streak.duration,
          }}
        />
      ))}
      {AMBIENT_STREAKS.map((streak) => (
        <span
          key={streak.left}
          className={`ambient-streak${streak.secondary ? " ambient-streak-secondary" : ""}`}
          style={{
            left: streak.left,
            top: streak.top,
            height: streak.height,
            "--streak-delay": streak.delay,
            "--streak-duration": streak.duration,
          }}
        />
      ))}
      {AMBIENT_LIGHTS.map((light, index) => (
        <span
          key={`bubble-${index}`}
          className={`ambient-light${light.secondary ? " ambient-light-secondary" : ""}`}
          style={{
            left: light.left,
            top: "103%",
            width: "2px",
            height: "54px",
            "--bubble-size": light.size,
            "--float-delay": light.delay,
            "--float-duration": light.duration,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Root App component — assembles all portfolio sections
 */
export default function App() {
  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-[var(--color-bg)] text-[var(--color-text)]">
      <AmbientBackground />
      <div className="relative z-10">
        {/* Scroll progress indicator */}
        <ScrollProgress />

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
