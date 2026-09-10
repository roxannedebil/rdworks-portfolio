"use client";

import ScrollProgress from "../../components/scroll-progress";
import MagneticButton from "../../components/magnetic-button";
import ShowcaseImage from "../../components/showcase-image";
import ProjectNav from "../../components/project-nav";
import useReveal from "../../components/use-reveal";

const features = [
  {
    title: "Accounts",
    copy: "Track balances across banks and e-wallets in one place.",
  },
  {
    title: "Transactions",
    copy: "Log income, expenses, and transfers with clear categories.",
  },
  {
    title: "Budgets",
    copy: "Set spending limits and follow progress throughout the month.",
  },
  {
    title: "Reports",
    copy: "See where money goes with breakdowns and summaries.",
  },
];

const screens = [
  {
    label: "01",
    title: "Accounts",
    copy: "A clear view of every account, with balances and recent activity in one workspace.",
    src: "/projects/finance-tracker/accounts.png",
    alt: "Finance Tracker Accounts view",
    width: 1901,
    height: 872,
    tall: false,
  },
  {
    label: "02",
    title: "Transactions",
    copy: "Add, import, filter, and review transactions without losing context.",
    src: "/projects/finance-tracker/transactions.png",
    alt: "Finance Tracker Transactions view",
    width: 1647,
    height: 1986,
    tall: true,
  },
  {
    label: "03",
    title: "Budgets",
    copy: "Monthly budgets with progress that makes overspending easy to spot.",
    src: "/projects/finance-tracker/budget.png",
    alt: "Finance Tracker Budget view",
    width: 1645,
    height: 2108,
    tall: true,
  },
  {
    label: "04",
    title: "Reports",
    copy: "Spending insights and summaries that help explain cash flow at a glance.",
    src: "/projects/finance-tracker/reports.png",
    alt: "Finance Tracker Reports view",
    width: 1645,
    height: 3160,
    tall: true,
  },
];

export default function FinanceTracker() {
  useReveal();

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <ScrollProgress />
      <ProjectNav indexLabel="01 / 02" />

      <section className="mx-auto max-w-6xl px-6 pt-28 pb-10 md:px-8 md:pt-36">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium tracking-widest text-zinc-500 uppercase">
              Web Application · 2026
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
              <span className="hero-word-wrap">
                <span className="hero-word">Finance</span>
              </span>
              <span className="hero-word-wrap">
                <span className="hero-word" style={{ animationDelay: "90ms" }}>
                  Tracker
                </span>
              </span>
            </h1>
            <p
              className="hero-fade mt-6 max-w-xl text-lg leading-8 text-zinc-600"
              style={{ animationDelay: "220ms" }}
            >
              A personal finance app designed to make it easier to track accounts, 
              income, expenses, budgets, and financial reports in one place.
            </p>
          </div>

          <div
            className="hero-fade flex shrink-0 flex-wrap gap-3"
            style={{ animationDelay: "340ms" }}
          >
            <MagneticButton
              href="https://roxannedebil.github.io/budget-tracker/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700"
            >
              Live site ↗
            </MagneticButton>
            <MagneticButton
              href="https://github.com/roxannedebil/budget-tracker"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium hover:border-zinc-900"
            >
              GitHub ↗
            </MagneticButton>
          </div>
        </div>

        <div
          className="hero-fade mt-8 flex flex-nowrap gap-2 overflow-x-auto pb-1"
          style={{ animationDelay: "420ms" }}
        >
          {["React", "Next.js", "TypeScript", "Tailwind", "Supabase"].map(
            (tech) => (
              <span
                key={tech}
                className="shrink-0 rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600"
              >
                {tech}
              </span>
            ),
          )}
        </div>
      </section>

      <section data-reveal className="reveal mx-auto max-w-6xl px-6 md:px-8">
        <ShowcaseImage
          src="/projects/finance-tracker/dashboard.png"
          alt="Finance Tracker Dashboard"
          width={1902}
          height={1078}
          priority
          frameClassName="device-shot device-shot--wide"
          imageClassName="max-h-[min(520px,58vh)] object-cover object-top"
        />
      </section>

      <section
        data-reveal
        className="reveal mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-24"
      >
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">
              Overview
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
              Built to keep everyday money decisions simple.
            </h2>
            <p className="mt-5 max-w-md leading-7 text-zinc-600">
            I started this project because I wanted a simple way to track my finances without 
            relying on paid budgeting apps. I wanted something I could use for my own day-to-day 
            expenses while still being flexible enough to handle multiple accounts, categorized 
            transactions, budgets, and financial reports.

            </p>
            <p className="mt-5 max-w-md leading-7 text-zinc-600">One of the main features I wanted was bulk transaction importing through XLSX files, 
            so I could add multiple records at once instead of manually entering every transaction 
            one by one. I also designed the application to be fully responsive so I could easily
            manage my finances from my phone as well as my desktop.
            </p>
          </div>

          <div className="grid gap-x-8 gap-y-0 sm:grid-cols-2">
            {features.map((feature, index) => (
              <div key={feature.title} className="border-t border-zinc-200 py-6">
                <p className="font-mono text-xs text-zinc-400">0{index + 1}</p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {feature.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-100">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-24">
          <div data-reveal className="reveal mb-12 max-w-2xl md:mb-16">
            <p className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">
              Interface
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
              Key screens
            </h2>
          </div>

          <div className="space-y-16 md:space-y-24">
            {screens.map((screen) => (
              <article
                key={screen.title}
                data-reveal
                className="reveal grid items-start gap-6 md:gap-8 lg:grid-cols-[220px_minmax(0,1fr)]"
              >
                <div className="lg:sticky lg:top-28 lg:pt-1">
                  <p className="font-mono text-xs tracking-wider text-zinc-400">
                    {screen.label}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight md:text-2xl">
                    {screen.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-zinc-600 md:text-base md:leading-7">
                    {screen.copy}
                  </p>
                </div>

                <div>
                  {screen.tall ? (
                    <>
                      <div className="longform-frame">
                        <ShowcaseImage
                          src={screen.src}
                          alt={screen.alt}
                          width={screen.width}
                          height={screen.height}
                          frameClassName=""
                          imageClassName="block h-auto w-full"
                        />
                      </div>
                      <p className="mt-3 text-xs text-zinc-400">
                        Scroll inside the frame to see the full screen.
                      </p>
                    </>
                  ) : (
                    <ShowcaseImage
                      src={screen.src}
                      alt={screen.alt}
                      width={screen.width}
                      height={screen.height}
                      frameClassName="device-shot device-shot--wide"
                      imageClassName=""
                    />
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section data-reveal className="reveal border-t border-zinc-100">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">
              Responsive
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
              One system across devices
            </h2>
            <p className="mt-4 leading-7 text-zinc-600">
              From desktop down to tablet and mobile, the same system stays clear
              and easy to scan.
            </p>
          </div>

          <div className="device-bento mt-12">
            <figure className="device-bento-desktop">
              <ShowcaseImage
                src="/projects/finance-tracker/dashboard.png"
                alt="Finance Tracker desktop view"
                width={1902}
                height={1078}
                frameClassName="device-shot"
                imageClassName="max-h-[280px]"
              />
              <figcaption className="mt-3 text-sm text-zinc-500">
                Desktop
              </figcaption>
            </figure>

            <div className="device-bento-devices">
              <figure className="device-bento-landscape">
                <ShowcaseImage
                  src="/projects/finance-tracker/ipad1.png"
                  alt="Finance Tracker on tablet landscape"
                  width={854}
                  height={640}
                  frameClassName="device-shot"
                  imageClassName="max-h-[340px]"
                />
                <figcaption className="mt-3 text-sm text-zinc-500">
                  Tablet · Landscape
                </figcaption>
              </figure>

              <figure className="device-bento-portrait">
                <ShowcaseImage
                  src="/projects/finance-tracker/ipad2.png"
                  alt="Finance Tracker on tablet portrait"
                  width={564}
                  height={752}
                  frameClassName="device-shot"
                  imageClassName="max-h-[340px]"
                />
                <figcaption className="mt-3 text-sm text-zinc-500">
                  Tablet · Portrait
                </figcaption>
              </figure>

              <figure className="device-bento-mobile">
                <ShowcaseImage
                  src="/projects/finance-tracker/mobile.png"
                  alt="Finance Tracker on mobile"
                  width={440}
                  height={956}
                  frameClassName="device-shot"
                  imageClassName="max-h-[340px]"
                />
                <figcaption className="mt-3 text-sm text-zinc-500">
                  Mobile
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section
        data-reveal
        className="reveal mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20"
      >
        <a
          href="/projects/uiux"
          className="next-project flex items-center justify-between rounded-2xl border border-zinc-200 px-5 py-5"
        >
          <div>
            <p className="text-xs tracking-widest text-zinc-500 uppercase">
              Next project
            </p>
            <p className="mt-1 text-lg font-semibold">UI/UX Designs</p>
          </div>
          <span className="next-project-arrow">→</span>
        </a>
      </section>
    </main>
  );
}
