"use client";

import { useEffect, useState } from "react";
import ScrollProgress from "../../components/scroll-progress";
import ImageCarousel from "../../components/image-carousel";
import ShowcaseImage from "../../components/showcase-image";
import ProjectNav from "../../components/project-nav";
import useReveal from "../../components/use-reveal";

const sections = [
  { id: "helpdesk", label: "NGA Helpdesk" },
  { id: "pth", label: "Pinoy Town Hall" },
  { id: "imedia", label: "iMedia" },
  { id: "vybesound", label: "VybeSound" },
];

const vybesoundUrl = "https://vybesound.com/";

const helpdeskSlides = [
  {
    src: "/projects/uiux/nga2.png",
    alt: "Helpdesk tickets screen",
    label: "Login Page",
    width: 1920,
    height: 1080,

  },
  {
   
    src: "/projects/uiux/nga1.png",
    alt: "Helpdesk landing page",
    label: "Landing Page",
    width: 1920,
    height: 1080,
  },
  {
    src: "/projects/uiux/nga3.png",
    alt: "Helpdesk details screen",
    label: "Knowledge Base",
    width: 1920,
    height: 1080,
  },
  {
    src: "/projects/uiux/nga4.png",
    alt: "Helpdesk workflow screen",
    label: "Frequently Asked Questions",
    width: 1920,
    height: 1080,
  },
  {
    src: "/projects/uiux/nga5.png",
    alt: "Helpdesk status screen",
    label: "Tickets",
    width: 1920,
    height: 1080,
  },
  {
    src: "/projects/uiux/nga6.png",
    alt: "Helpdesk layout screen",
    label: "Ticket Details",
    width: 1920,
    height: 1080,
  },
];

const imediaPages = [
  {
    id: "home",
    label: "Home",
    src: "/projects/uiux/imedia.png",
    alt: "iMedia home page design",
    width: 1920,
    height: 6120,
  },
  {
    id: "about",
    label: "About",
    src: "/projects/uiux/imedia-about.png",
    alt: "iMedia about us page design",
    width: 1920,
    height: 6120,
  },
];

export default function UIUXProjects() {
  const [activeSection, setActiveSection] = useState("helpdesk");
  const [imediaPage, setImediaPage] = useState(imediaPages[0].id);
  useReveal();

  const activeImedia =
    imediaPages.find((page) => page.id === imediaPage) ?? imediaPages[0];

  useEffect(() => {
    function onScroll() {
      let current = "helpdesk";
      for (const item of sections) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 140) current = item.id;
      }
      setActiveSection(current);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white text-zinc-900">
      <ScrollProgress />
      <ProjectNav
        indexLabel="02 / 02"
        links={sections.map((item) => ({
          href: `#${item.id}`,
          label: item.label,
          active: activeSection === item.id,
        }))}
      />

      <section className="mx-auto max-w-6xl px-6 pt-28 pb-20 md:px-8 md:pt-36">
        <p className="text-sm font-medium tracking-widest text-zinc-500 uppercase">
          UI/UX Design
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
          <span className="hero-word-wrap">
            <span className="hero-word">UI/UX</span>
          </span>
          <span className="hero-word-wrap">
            <span className="hero-word" style={{ animationDelay: "90ms" }}>
              Designs
            </span>
          </span>
        </h1>

        <p
          className="hero-fade mt-6 max-w-2xl text-lg leading-8 text-zinc-600"
          style={{ animationDelay: "220ms" }}
        >
          Website and interface designs created in Figma, including layouts, 
          prototypes, and responsive design concepts.
        </p>
      </section>

      <section id="helpdesk" className="border-t border-zinc-100">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
          <div className="mb-10 grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-sm font-medium tracking-widest text-zinc-500 uppercase">
                01
              </p>
              <h2 className="mt-3 text-2xl font-semibold">NGA Helpdesk</h2>
            </div>
            <div className="md:col-span-2">
              <p className="max-w-2xl leading-7 text-zinc-600">
                Designed UI/UX screens for a helpdesk system, focusing on clear
                navigation, ticket management, and a simple user experience.
              </p>
            </div>
          </div>

          <div data-reveal className="reveal">
            <ImageCarousel slides={helpdeskSlides} variant="landscape" />
          </div>
        </div>
      </section>

      <section id="pth" className="border-t border-zinc-100">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
          <div data-reveal className="reveal grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-sm font-medium tracking-widest text-zinc-500 uppercase">
                02
              </p>
              <h2 className="mt-3 text-2xl font-semibold">Pinoy Town Hall</h2>
            </div>

            <div className="md:col-span-2">
              <p className="max-w-2xl leading-7 text-zinc-600">
              Designed the hero section for Pinoy Town Hall, focusing on creating a welcoming 
              first impression for Filipinos abroad. Incorporated banderitas, jeepney-inspired details, 
              and vibrant Filipino visual elements to establish a warm, distinctly Pinoy visual identity.

              </p>
              <div className="mt-10">
                <ShowcaseImage
                  src="/projects/uiux/pth.png"
                  alt="PTH UI/UX design"
                  width={1920}
                  height={1019}
                  frameClassName="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50"
                  imageClassName="h-auto max-h-[70vh] w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="imedia" className="border-t border-zinc-100">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
          <div data-reveal className="reveal grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-sm font-medium tracking-widest text-zinc-500 uppercase">
                03
              </p>
              <h2 className="mt-3 text-2xl font-semibold">iMedia</h2>
            </div>

            <div className="md:col-span-2">
              <p className="max-w-2xl leading-7 text-zinc-600">
              Designed long-form Home and About pages for iMedia, focusing on strong visual hierarchy, 
              thoughtful content organization, and a cohesive modern layout. Structured the pages to create 
              a smooth visual flow, guiding visitors through the company’s key information, services, 
              and brand messaging while keeping the overall experience clean, engaging, and easy to navigate.

              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {imediaPages.map((page) => (
                  <button
                    key={page.id}
                    type="button"
                    onClick={() => setImediaPage(page.id)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      imediaPage === page.id
                        ? "bg-zinc-900 text-white"
                        : "border border-zinc-200 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900"
                    }`}
                  >
                    {page.label}
                  </button>
                ))}
              </div>

              <p className="mt-4 text-sm text-zinc-400">
                Scroll inside the frame to explore the full page.
              </p>

              <div className="longform-frame mt-6" key={activeImedia.id}>
                <ShowcaseImage
                  src={activeImedia.src}
                  alt={activeImedia.alt}
                  width={activeImedia.width}
                  height={activeImedia.height}
                  frameClassName=""
                  imageClassName="block h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="vybesound" className="border-t border-zinc-100">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
          <div data-reveal className="reveal grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-sm font-medium tracking-widest text-zinc-500 uppercase">
                04
              </p>
              <h2 className="mt-3 text-2xl font-semibold">VybeSound</h2>
              <a
                href={vybesoundUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-4 inline-flex items-center gap-2 text-sm font-medium text-zinc-900"
              >
                Open live site
                <span aria-hidden="true">↗</span>
              </a>
              <p className="mt-4 max-w-xs text-sm leading-6 text-zinc-400">
                <span className="font-medium text-zinc-500">Note:</span> This is
                an embedded preview for portfolio viewing. Some features
                (cart, checkout, popups) may not work the same as on the live
                site — use Open live site above for the full experience.
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="max-w-2xl leading-7 text-zinc-600">
                Improved the responsive design of the VybeSound Shopify storefront
                through custom CSS, focusing on mobile layout, spacing, and
                positioning. Fixed iOS Safari compatibility issues to provide a
                more consistent experience across devices.
              </p>

              <p className="mt-4 text-sm text-zinc-400">
                Scroll, click, and browse pages inside the desktop preview.
              </p>

              <div className="live-desktop-frame mt-6">
                <iframe
                  title="VybeSound live website"
                  src="/embed/vybesound"
                  loading="lazy"
                  className="live-desktop-iframe"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-100">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-8">
          <a
            href="/projects/finance-tracker"
            className="next-project flex items-center justify-between rounded-2xl border border-zinc-200 px-5 py-4"
          >
            <div>
              <p className="text-xs tracking-widest text-zinc-500 uppercase">
                Previous project
              </p>
              <p className="mt-1 text-lg font-semibold">Finance Tracker</p>
            </div>
            <span className="next-project-arrow rotate-180">→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
