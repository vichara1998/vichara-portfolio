import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Send,
  Github,
  Linkedin,
  Mail,
  MapPin,
  CheckCircle,
  AlertCircle,
  Loader,
  Facebook,
} from "lucide-react";
import { PERSONAL } from "../data";

const SOCIAL_LINKS = [
  {
    icon: Github,
    label: "GitHub",
    href: PERSONAL.socials.github,
    color: "hover:text-white",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: PERSONAL.socials.linkedin,
    color: "hover:text-blue-400",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: PERSONAL.socials.facebook,
    color: "hover:text-sky-400",
  },
  {
    icon: Mail,
    label: "Email",
    href: `mailto:${PERSONAL.email}`,
    color: "hover:text-electric-400",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("https://formspree.io/f/mvzlvrrd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-500/2 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

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
              06
            </span>
            <span className="text-xs uppercase text-slate-500">Contact</span>
            <div className="h-px flex-1 bg-[var(--color-border-soft)]" />
          </div>
          <h2 className="section-title text-white">
            Let's <span className="gradient-text">connect</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl">
            For internship opportunities or questions about a project, send me a
            note.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-7 md:col-span-2"
          >
            <div className="border-t border-[var(--color-border-soft)] pt-5">
              <p className="text-sm font-medium text-[var(--color-accent-2)]">
                {PERSONAL.availability}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Based in {PERSONAL.location}.
              </p>
            </div>

            <div className="space-y-4 border-t border-[var(--color-border-soft)] pt-5">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Mail size={16} className="text-electric-400" />
                <a
                  href={`mailto:${PERSONAL.email}`}
                  className="transition-colors hover:text-white"
                >
                  {PERSONAL.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <MapPin size={16} className="text-electric-400" />
                <span>{PERSONAL.location}</span>
              </div>
            </div>

            <div className="border-t border-[var(--color-border-soft)] pt-5">
              <p className="mb-4 text-xs uppercase text-slate-500">Profiles</p>
              <div className="flex flex-wrap gap-x-5 gap-y-3">
                {SOCIAL_LINKS.map(({ icon: Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-xs text-slate-500 transition-colors ${color}`}
                  >
                    <Icon size={15} /> {label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border-t border-[var(--color-border-soft)] pt-6 md:col-span-3 md:border-l md:border-t-0 md:pl-8 md:pt-0"
          >
            <div className="h-full">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name + Email row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      name: "name",
                      label: "Your Name",
                      placeholder: "Enter Your Name",
                      type: "text",
                    },
                    {
                      name: "email",
                      label: "Email Address",
                      placeholder: "Enter Your Email ",
                      type: "email",
                    },
                  ].map(({ name, label, placeholder, type }) => (
                    <div key={name}>
                      <label
                        htmlFor={`contact-${name}`}
                        className="mb-2 block text-xs font-medium text-slate-400"
                      >
                        {label}
                      </label>
                      <input
                        id={`contact-${name}`}
                        type={type}
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        required
                        className="w-full bg-white/5 border border-white/10 focus:border-electric-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-200 focus:bg-electric-500/5"
                      />
                    </div>
                  ))}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-xs font-medium text-slate-400"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about the opportunity or project..."
                    required
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 focus:border-electric-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-200 focus:bg-electric-500/5 resize-none"
                  />
                </div>

                {/* Status message */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-teal-400 bg-teal-500/10 border border-teal-500/20 rounded-xl px-4 py-3"
                  >
                    <CheckCircle size={16} />
                    Message sent! I'll get back to you soon.
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
                  >
                    <AlertCircle size={16} />
                    Something went wrong. Try emailing me directly.
                  </motion.div>
                )}

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={
                    status !== "loading" ? { scale: 1.02, y: -1 } : {}
                  }
                  whileTap={status !== "loading" ? { scale: 0.98 } : {}}
                  className="flex min-h-12 w-full items-center justify-center gap-2 bg-[var(--color-accent)] px-5 py-3 text-white font-medium transition-colors hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader size={17} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={17} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
