import { BarChart3, Cpu, Layers, Brain, Terminal } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Certification {
  slug: string;
  title: string;
  issuer: string;
  date: string;
  tags: string[];
  description: string;
  excerpt: string;
  /** Path under /public for the badge image. Keep these small, square-ish. */
  badge: string;
  CertIcon: LucideIcon;
  /** HTML body rendered on the full view page. */
  content: string;
  links: {
    credly?: string;
    credential?: string;
    project?: { label: string; href: string };
  };
}

/**
 * Home page shows the first 4 entries (see getRecentCerts).
 * Full listing at /certifications shows everything.
 * To hide a cert from the home teaser, move it past the 4th slot.
 */
export const certifications: Certification[] = [
  {
    slug: "google-data-analytics",
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google (Coursera)",
    date: "2024",
    tags: ["DATA ANALYTICS", "TABLEAU", "SQL", "R"],
    description:
      "Eight-course professional certificate covering the full data analytics workflow: ask, prepare, process, analyze, share and act. Includes hands-on work with spreadsheets, SQL, R, and Tableau.",
    excerpt:
      "Google's 8-course data analytics program covering SQL, R, Tableau and the full analyst workflow.",
    badge: "/certs/google-data-analytics.png",
    CertIcon: BarChart3,
    content: `
      <p>Google's <strong>Data Analytics Professional Certificate</strong> is an eight-course program delivered via Coursera. It covers the full analyst workflow: asking the right questions, preparing and cleaning data, performing analysis, and communicating findings through visualisation.</p>

      <h2>What Was Covered</h2>
      <p>The program walks through spreadsheets, SQL for querying relational data, statistical thinking, R for data cleaning and analysis, and Tableau for visual storytelling. Each course ends with a hands-on assignment grounded in realistic business scenarios.</p>

      <h2>Capstone Project: CO2 Emissions Per Capita</h2>
      <p>As part of the certification I built a Tableau visualisation exploring <strong>CO2 emissions per capita from 2000 to 2010</strong>, with values expressed in metric tons. The goal was to surface regional disparities in emissions and put the figures into context.</p>

      <p>One finding that stood out: India remained one of the lower per-capita emitters over that decade despite its population size and a rapidly growing economy. The visualisation is a refined version of an earlier draft, with cleaner encoding and clearer annotations to let the data speak.</p>

      <h2>Takeaway</h2>
      <p>Beyond the toolchain, the program reinforced a clear framework for turning raw data into decisions: scope the question, pick the right cut of the data, pick the right chart, and keep the narrative honest. That framework carries over directly into any role that touches data, including firmware telemetry and test-log analysis on the embedded side.</p>
    `,
    links: {
      credly: "#",
      project: {
        label: "View on Tableau Public",
        href: "https://public.tableau.com/app/profile/santhosh.c.c/viz/CO2EMISSIONPERCAPITA_17119095130390/Sheet1",
      },
    },
  },
  {
    slug: "zephyr-technical-contributor",
    title: "Zephyr Technical Contributor",
    issuer: "Zephyr Project / Linux Foundation",
    date: "2024",
    tags: ["ZEPHYR", "RTOS", "OPEN SOURCE"],
    description:
      "Recognition from the Zephyr Project for accepted technical contributions to the upstream Zephyr RTOS codebase, including driver support and subsystem work.",
    excerpt:
      "Recognition from the Zephyr Project for upstream contributions to Zephyr RTOS.",
    badge: "/certs/zephyr-technical-contributor.png",
    CertIcon: Layers,
    content: `
      <p>The <strong>Zephyr Technical Contributor</strong> badge is awarded by the Zephyr Project for accepted technical contributions to the upstream Zephyr RTOS codebase.</p>

      <h2>Contributions Behind The Badge</h2>
      <p>The contributions covered by this recognition include driver additions for TI MSPM0 peripherals (SPI, DAC, MCAN), and work on the USB host subsystem to add CDC ECM class support. Each contribution went through Zephyr's standard review process, including devicetree bindings, Kconfig integration, documentation and test validation.</p>

      <h2>Why Upstream?</h2>
      <p>Landing work upstream rather than keeping it as out-of-tree patches means the code benefits from the project's CI, static analysis, and broad community review, and it keeps future rebases cheap. It is also the most honest test of a driver: if it holds up to review from the Zephyr maintainers, it is probably solid.</p>

      <h2>Links</h2>
      <p>Individual pull requests are listed on the <a href="/projects">Projects</a> page. The badge itself is available via the Credly link below.</p>
    `,
    links: {
      credly: "#",
    },
  },
  {
    slug: "lfd103-linux-kernel",
    title: "LFD103: A Beginner's Guide to Linux Kernel Development",
    issuer: "The Linux Foundation",
    date: "2026",
    tags: ["LINUX KERNEL", "LINUX FOUNDATION", "C"],
    description:
      "Linux Foundation course introducing the fundamentals of Linux kernel development: kernel source layout, build system, patch workflow, coding style, and the upstream contribution process.",
    excerpt:
      "Linux Foundation LFD103 course on the basics of Linux kernel development and upstream contribution.",
    badge: "/certs/lfd103-linux-kernel.png",
    CertIcon: Terminal,
    content: `
      <p><strong>LFD103: A Beginner's Guide to Linux Kernel Development</strong> is a Linux Foundation course that introduces the fundamentals of getting started with the Linux kernel, from cloning the tree to sending a first patch upstream.</p>

      <h2>Topics Covered</h2>
      <p>The course walks through the kernel source layout, the kbuild and Kconfig build systems, the patch workflow using git send-email, the kernel coding style and checkpatch tooling, and the social conventions of the LKML and subsystem maintainer trees. It also covers the basics of configuring and building a kernel for a local machine or emulator and testing changes there.</p>

      <h2>Why It Matters</h2>
      <p>Most embedded Linux work eventually touches the kernel, whether that is writing a new device driver, fixing a bug in an existing subsystem, or simply making sense of what a board vendor's BSP actually does. Knowing how the upstream process works, even for small patches, makes the out-of-tree vs in-tree tradeoff a real decision rather than a default.</p>

      <h2>Outcome</h2>
      <p>Completion earned the Linux Foundation LFD103 certificate. The credential is available via the link below.</p>
    `,
    links: {
      credly: "#",
      credential: "#",
    },
  },
  {
    slug: "lfd110-riscv",
    title: "LFD110: Introduction to RISC-V",
    issuer: "The Linux Foundation",
    date: "2024",
    tags: ["RISC-V", "ISA", "LINUX FOUNDATION"],
    description:
      "Linux Foundation course covering the RISC-V instruction set architecture: base integer ISA, standard extensions, privilege levels, memory model, and the open ecosystem around RISC-V.",
    excerpt:
      "Linux Foundation LFD110 course on the RISC-V ISA, extensions, privilege model and ecosystem.",
    badge: "/certs/lfd110-riscv.png",
    CertIcon: Cpu,
    content: `
      <p><strong>LFD110: Introduction to RISC-V</strong> is a Linux Foundation course that covers the RISC-V instruction set architecture end to end. RISC-V is a free and open ISA that has been picking up serious traction across embedded, automotive and HPC.</p>

      <h2>Topics Covered</h2>
      <p>The course walks through the base integer ISA (RV32I / RV64I), standard extensions (M, A, F, D, C, V), privilege levels (M, S, U), the memory and atomics model, and the overall ecosystem of cores, toolchains and organisations around RISC-V.</p>

      <h2>Why It Matters For Embedded Work</h2>
      <p>RISC-V is increasingly showing up in microcontroller silicon, and getting the fundamentals right at the ISA level makes it much easier to reason about what a Zephyr or bare-metal port is actually doing under the hood. Understanding the privilege model and trap handling in particular is directly useful when wiring up exception vectors and context-switch code.</p>

      <h2>Outcome</h2>
      <p>Completion earned the Linux Foundation LFD110 certificate. The credential itself is available via the Credly link below.</p>
    `,
    links: {
      credly: "#",
      credential: "#",
    },
  },
  {
    slug: "edge-ai-course",
    title: "Edge AI Course",
    issuer: "[Issuer placeholder]",
    date: "2024",
    tags: ["EDGE AI", "ML", "EMBEDDED"],
    description:
      "Course covering the fundamentals of deploying machine learning models on resource-constrained edge devices: model optimisation, quantisation, and on-device inference.",
    excerpt:
      "Course on deploying ML models at the edge: optimisation, quantisation and on-device inference.",
    badge: "/certs/edge-ai.png",
    CertIcon: Brain,
    content: `
      <p>Course covering <strong>Edge AI</strong>: the set of techniques and tradeoffs involved in running machine learning models on resource constrained devices rather than in the cloud.</p>

      <h2>Topics Covered</h2>
      <p>The syllabus covered model selection for embedded targets, quantisation (int8 and lower), pruning, operator fusion, memory and latency budgeting, and the practical side of running inference on MCUs and small SoCs. It also touched on the tooling landscape (TensorFlow Lite for Microcontrollers, ONNX Runtime, vendor specific accelerator SDKs).</p>

      <h2>Embedded Relevance</h2>
      <p>The interesting engineering problem in edge AI is almost never the model itself, it is the integration: fitting weights into flash, keeping activations inside SRAM, and scheduling inference alongside real-time tasks without blowing deadlines. The course framed those constraints clearly.</p>

      <h2>Credential</h2>
      <p>The certificate is available via the link below.</p>
    `,
    links: {
      credential: "#",
    },
  },
];

export function getCertBySlug(slug: string): Certification | undefined {
  return certifications.find((c) => c.slug === slug);
}

export function getRecentCerts(count: number = 4): Certification[] {
  return certifications.slice(0, count);
}

export const allCertTags = Array.from(
  new Set(certifications.flatMap((c) => c.tags))
).sort();
