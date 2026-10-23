import Navbar from "./components/Navbar";
import ThemeCursor from "./components/ThemeCursor";
import ScrollProgress from "./components/ScrollProgress";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Contact from "./sections/Contact";

/**
 * Root App component — assembles all portfolio sections
 */
export default function App() {
  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-[var(--color-bg)] text-[var(--color-text)]">
      <ThemeCursor />
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
