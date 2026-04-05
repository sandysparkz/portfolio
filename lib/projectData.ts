import { Cable, Server, Bluetooth, Radio } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Project {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
  ProjectIcon: LucideIcon;
  links: {
    github?: string;
  };
}

export const projects: Project[] = [
  {
    slug: "usb-cdc-ecm-host",
    title: "USB CDC ECM Host Support",
    date: "2026",
    tags: ["zephyr", "usb", "ecm", "c"],
    description:
      "Introduces USB CDC ECM (Ethernet Control Model) class support to the Zephyr USB host subsystem, enabling Ethernet functionality for USB hosts.",
    ProjectIcon: Cable,
    links: {
      github: "https://github.com/zephyrproject-rtos/zephyr/pull/99097",
    },
  },
  {
    slug: "mcan-driver-mspm0",
    title: "MCAN Driver for MSPM0 G-Series",
    date: "2026",
    tags: ["zephyr", "can", "c"],
    description:
      "Introduces driver support for the MCAN (CAN FD and classic CAN) module on TI MSPM0 G-Series microcontrollers. Supports both classic CAN and CAN FD protocols, enabling flexible CAN communication.",
    ProjectIcon: Radio,
    links: {
      github: "https://github.com/zephyrproject-rtos/zephyr/pull/97092",
    },
  },
  {
    slug: "spi-driver-mspm0",
    title: "SPI Driver for MSPM0 Series",
    date: "2026",
    tags: ["zephyr", "spi", "c"],
    description:
      "Adds SPI driver support for TI MSPM0 microcontrollers. Implements SPI master mode with configurable frame size (4-16 bits), clock polarity, phase, and bit order. Integrates with Zephyr's SPI subsystem with standard API compliance.",
    ProjectIcon: Server,
    links: {
      github: "https://github.com/zephyrproject-rtos/zephyr/pull/94726",
    },
  },
  {
    slug: "dac-driver-mspm0",
    title: "DAC Driver for MSPM0 G-Series",
    date: "2026",
    tags: ["zephyr", "dac", "c"],
    description:
      "Adds support for the DAC module on TI MSPM0 G-Series MCUs. Supports 8-bit and 12-bit resolution configurable via driver APIs. Supports selecting the voltage reference source; external reference selectable via Kconfig.",
    ProjectIcon: Bluetooth,
    links: {
      github: "https://github.com/zephyrproject-rtos/zephyr/pull/94725",
    },
  },
];

export function getRecentProjects(count: number = 4): Project[] {
  return projects.slice(0, count);
}

export const allProjectTags = Array.from(
  new Set(projects.flatMap((p) => p.tags))
).sort();
