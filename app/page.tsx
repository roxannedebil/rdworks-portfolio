"use client";

import { useEffect, useState, type PointerEvent } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./components/theme-toggle";
import CursorGlow from "./components/cursor-glow";
import ScrollProgress from "./components/scroll-progress";
import MagneticButton from "./components/magnetic-button";
import ProjectPreviewCarousel from "./components/project-preview-carousel";

const heroLineOne = ["Designing", "websites"];
const heroLineTwo = ["that", "work", "beautifully."];

const financePreviewSlides = [
  {
    src: "/projects/finance-tracker/dashboard.png",
    alt: "Finance Tracker dashboard",
    width: 1902,
    height: 1078,
  },
  { src: "/projects/finance-tracker/accounts.png", alt: "Finance Tracker accounts" },
  { src: "/projects/finance-tracker/transactions.png", alt: "Finance Tracker transactions" },
  { src: "/projects/finance-tracker/budget.png", alt: "Finance Tracker budgets" },
  { src: "/projects/finance-tracker/reports.png", alt: "Finance Tracker reports" },
];

const uiuxPreviewSlides = [
  {
    src: "/projects/uiux/nga1.png",
    alt: "NGA Helpdesk design",
    width: 1920,
    height: 1080,
  },
  { src: "/projects/uiux/pth.png", alt: "Pinoy Town Hall design" },
  { src: "/projects/uiux/imedia.png", alt: "iMedia website design" },
  { src: "/projects/uiux/vybesound.png", alt: "VybeSound website design" },
];

export default function Home() {
  const email = "roxannedebil14@gmail.com";
  const [copied, setCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);

      const sections = ["work", "about", "skills", "contact"];
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 120) current = id;
      }
      setActiveSection(current);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function handleProjectPointerMove(event: PointerEvent<HTMLDivElement>): void {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    event.currentTarget.style.setProperty("--pointer-x", `${x * 6}deg`);
    event.currentTarget.style.setProperty("--pointer-y", `${y * -6}deg`);
    event.currentTarget.style.setProperty(
      "--spotlight-x",
      `${((event.clientX - bounds.left) / bounds.width) * 100}%`,
    );
    event.currentTarget.style.setProperty(
      "--spotlight-y",
      `${((event.clientY - bounds.top) / bounds.height) * 100}%`,
    );
  }

  function resetProjectPointer(event: PointerEvent<HTMLDivElement>): void {
    event.currentTarget.style.setProperty("--pointer-x", "0deg");
    event.currentTarget.style.setProperty("--pointer-y", "0deg");
  }

  async function handleCopyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  }

  const navLinkClass = (id: string) =>
    `text-sm transition-colors ${activeSection === id
      ? "text-zinc-900"
      : "text-zinc-500 hover:text-zinc-900"
    }`;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white text-zinc-900">
      <ScrollProgress />
      <CursorGlow />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="orb orb-one" />
        <div className="orb orb-two" />
      </div>

      <nav
        className={`fixed top-0 right-0 left-0 z-40 transition-all duration-300 ${scrolled
            ? "border-b border-zinc-200/70 bg-white/80 backdrop-blur-xl"
            : "nav-clear bg-transparent"
          }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="#" className="text-lg font-semibold tracking-[-0.03em]">
            Roxanne<span className="text-zinc-400">.</span>
          </a>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-8 text-sm md:flex">
              <a href="#work" className={navLinkClass("work")}>
                Work
              </a>
              <a href="#about" className={navLinkClass("about")}>
                About
              </a>
              <a href="#skills" className={navLinkClass("skills")}>
                Skills
              </a>
              <MagneticButton
                href="#contact"
                className="rounded-full bg-zinc-900 px-5 py-2.5 text-white transition-colors hover:bg-zinc-700"
              >
                Contact
              </MagneticButton>
            </div>

            <ThemeToggle />

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu fixed inset-0 z-30 bg-white px-6 pt-24 md:hidden">
          <div className="flex flex-col gap-6 text-2xl font-semibold">
            {[
              ["Work", "#work"],
              ["About", "#about"],
              ["Skills", "#skills"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="mobile-link"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}

      <section className="relative mx-auto flex min-h-[88vh] max-w-6xl items-center px-4 pt-28 pb-16 sm:px-6 sm:pb-20">
        <div className="w-full">
          <div className="max-w-5xl">
            <div className="availability-badge mb-6">
              <span className="pulse-dot" />
              Available for work
            </div>

            <p className="mb-6 text-sm font-medium tracking-[0.2em] text-zinc-500 uppercase">
              Web Designer · UI/UX Designer
            </p>

            <h1 className="text-4xl font-semibold leading-[1.14] tracking-[-0.03em] sm:text-5xl md:text-7xl lg:text-8xl">
              <span className="block">
                {heroLineOne.map((word, index) => (
                  <span key={word} className="hero-word-wrap">
                    <span
                      className="hero-word"
                      style={{ animationDelay: `${index * 90}ms` }}
                    >
                      {word}
                    </span>
                  </span>
                ))}
              </span>
              <span className="mt-1 block text-zinc-400 sm:mt-2">
                {heroLineTwo.map((word, index) => (
                  <span key={word} className="hero-word-wrap">
                    <span
                      className="hero-word"
                      style={{ animationDelay: `${(index + heroLineOne.length) * 90}ms` }}
                    >
                      {word}
                    </span>
                  </span>
                ))}
              </span>
            </h1>

            <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <p
                className="hero-fade max-w-xl text-base leading-7 text-zinc-600 md:text-lg"
                style={{ animationDelay: "520ms" }}
              >
                I design and build clean, responsive web experiences with a focus
                on usability, visual clarity, and thoughtful details.
              </p>

              <div
                className="hero-fade flex flex-wrap gap-3"
                style={{ animationDelay: "640ms" }}
              >
                <MagneticButton
                  href="#work"
                  className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
                >
                  View my work
                </MagneticButton>

                <MagneticButton
                  href="#contact"
                  className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium transition-colors hover:border-zinc-900"
                >
                  Contact me
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="work" data-reveal className="reveal relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium tracking-[0.2em] text-zinc-500 uppercase">
              Selected work
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl md:text-5xl">
              Things I&apos;ve worked on.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-zinc-500">
            A selection of web applications, interfaces, and digital experiences.
          </p>
        </div>

        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          <article data-reveal className="reveal group">
            <div
              className="project-preview relative overflow-hidden rounded-2xl bg-zinc-200"
              onPointerMove={handleProjectPointerMove}
              onPointerLeave={resetProjectPointer}
            >
              <ProjectPreviewCarousel
                href="/projects/finance-tracker"
                slides={financePreviewSlides}
              />
            </div>

            <div className="mt-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-zinc-500">Web Application · 2026</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                    Finance Tracker
                  </h3>
                </div>
                <span className="text-sm text-zinc-400">01</span>
              </div>

              <p className="mt-3 max-w-lg leading-7 text-zinc-600">
                A responsive personal finance application designed to help users
                manage accounts, track income and expenses, create budgets, and
                view financial reports.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {["Next.js", "TypeScript", "Tailwind CSS", "Supabase"].map((tag) => (
                  <span key={tag} className="skill-chip rounded-full bg-zinc-100 px-3 py-1.5 text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex gap-5 text-sm font-medium">
              <a
                  href="/projects/finance-tracker"
                  className="link-underline"
                >
                  View Project ↗
                </a>
                <a
                  href="https://roxannedebil.github.io/budget-tracker/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  Live site ↗
                </a>
                <a
                  href="https://github.com/roxannedebil/budget-tracker"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </article>

          <article data-reveal className="reveal group">
            <div
              className="project-preview relative overflow-hidden rounded-2xl bg-zinc-200"
              onPointerMove={handleProjectPointerMove}
              onPointerLeave={resetProjectPointer}
            >
              <ProjectPreviewCarousel
                href="/projects/uiux"
                slides={uiuxPreviewSlides}
              />
            </div>

            <div className="mt-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-zinc-500">UI/UX Design · 2025</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                    UI/UX Design Projects
                  </h3>
                </div>
                <span className="text-sm text-zinc-400">02</span>
              </div>

              <p className="mt-3 max-w-lg leading-7 text-zinc-600">
                Website interfaces, layouts, and prototypes created in Figma for
                client and business requirements.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {["Figma", "UI/UX", "Prototyping", "Responsive Design"].map((tag) => (
                  <span key={tag} className="skill-chip rounded-full bg-zinc-100 px-3 py-1.5 text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex gap-5 text-sm font-medium">
                <a href="/projects/uiux" className="link-underline">
                  View project ↗
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="about" data-reveal className="reveal border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-medium tracking-[0.2em] text-zinc-500 uppercase">
                About me
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl md:text-5xl">
                A designer with a technical background.
              </h2>
            </div>

            <div>
              <div className="space-y-6 text-base leading-8 text-zinc-600 md:text-lg">
                <p>
                  I&apos;m an Information Technology graduate with experience across
                  web design, UI/UX, quality assurance, and systems analysis.
                </p>
                <p>
                  My experience in UI/UX design introduced me to creating
                  interfaces and prototypes in Figma, while my development
                  experience allows me to turn designs into responsive,
                  functional websites.
                </p>
                <p>
                  I also have experience working with clients and project teams,
                  gathering requirements, documenting solutions, and testing
                  websites and applications. This helps me understand both the
                  design and technical side of a project.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-6 border-t border-zinc-200 pt-8 sm:grid-cols-3 sm:gap-8">
                {[
                  ["UI/UX", "Design & Prototyping"],
                  ["Web", "Design & Development"],
                  ["QA", "Testing & Quality"],
                ].map(([title, subtitle]) => (
                  <div key={title} className="stat-card">
                    <p className="text-2xl font-semibold">{title}</p>
                    <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" data-reveal className="reveal border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="mb-14">
            <p className="text-sm font-medium tracking-[0.2em] text-zinc-500 uppercase">
              Skills & tools
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl md:text-5xl">
              Design, build, and refine.
            </h2>
          </div>

          <div className="skill-marquee mb-10" aria-hidden="true">
            <div className="skill-marquee-track">
              {[
                "Figma",
                "UI/UX Design",
                "Wireframing",
                "Prototyping",
                "Responsive Design",
                "Visual Design",
                "React",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "HTML",
                "CSS",
                "Tailwind CSS",
                "Git",
                "GitHub",
                "Manual Testing",
                "Quality Assurance",
                "Selenium",
                "Postman",
                "Requirements Analysis",
                "Documentation",
                "Agile",
              ].map((item, index) => (
                <span key={`${item}-${index}`} className="skill-marquee-item">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Design",
                index: "01",
                skills: [
                  "Figma",
                  "UI/UX Design",
                  "Responsive Design",
                  "Wireframing",
                  "Prototyping",
                  "Visual Design",
                ],
              },
              {
                title: "Web Development",
                index: "02",
                skills: [
                  "HTML",
                  "CSS",
                  "JavaScript",
                  "TypeScript",
                  "React",
                  "Next.js",
                  "Tailwind CSS",
                ],
              },
              {
                title: "Quality & Testing",
                index: "03",
                skills: [
                  "Manual Testing",
                  "Functional Testing",
                  "Regression Testing",
                  "UAT",
                  "Selenium",
                  "Pytest",
                  "Postman",
                ],
              },
              {
                title: "Workflow",
                index: "04",
                skills: [
                  "Git",
                  "GitHub",
                  "Requirements Analysis",
                  "Documentation",
                  "Client Communication",
                  "Agile",
                ],
              },
            ].map((group) => (
              <div
                key={group.title}
                className="skill-card rounded-2xl border border-zinc-200 p-6 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{group.title}</h3>
                  <span className="text-sm text-zinc-400">{group.index}</span>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-chip rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" data-reveal className="reveal border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-3xl">
            <p className="text-sm font-medium tracking-[0.2em] text-zinc-500 uppercase">
              Get in touch
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl md:text-7xl">
              Have a project
              <br />
              <span className="text-zinc-400">in mind?</span>
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-600">
              I&apos;m open to web design, UI/UX, and website development
              opportunities. Feel free to reach out.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3">
              <MagneticButton
                href={`mailto:${email}`}
                className="group inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
              >
                <span>Send me an email</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </MagneticButton>

              <span className="text-sm text-zinc-400">or</span>

              <MagneticButton
                onClick={handleCopyEmail}
                ariaLabel={copied ? "Email copied" : "Copy email address"}
                className="rounded-full border border-zinc-300 px-5 py-3.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-900 hover:text-zinc-900"
              >
                {copied ? "Email copied" : "Copy email"}
              </MagneticButton>
            </div>
          </div>

          <div className="mt-20 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-zinc-200 pt-8 text-sm">
            <a
              href="https://github.com/roxannedebil"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-zinc-600"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/roxanne-alyssandra-debil-a07ab9344"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-zinc-600"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 Roxanne Alyssandra Debil</p>
          <p>Web Designer · UI/UX Designer · Systems Analyst · QA Tester</p>
        </div>
      </footer>
    </main>
  );
}
