import { Cable, Server, Bluetooth, Radio } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Project {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
  excerpt: string;
  content: string; // HTML
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
    excerpt:
      "USB CDC ECM (Ethernet Control Model) host driver for Zephyr RTOS, enabling Ethernet-over-USB for embedded hosts.",
    content: `
      <p>This contribution introduces the <strong>USB CDC ECM (Ethernet Control Model)</strong> class support to the Zephyr USB host subsystem. ECM is a standard USB class that allows a USB device to expose a network interface to the host, enabling full Ethernet-over-USB communication.</p>

      <h2>Motivation</h2>
      <p>Zephyr's USB host stack previously had no support for CDC ECM, meaning embedded hosts could not communicate with USB-to-Ethernet adapters or devices that expose an ECM network interface. This PR closes that gap.</p>

      <h2>What Was Added</h2>
      <p>The implementation covers the full ECM host class driver lifecycle: device enumeration and interface binding, control transfer setup (SET_ETHERNET_MULTICAST_FILTERS, SET_ETHERNET_PACKET_FILTER), bulk endpoint management for data transfers, and netdev integration so the ECM interface is exposed as a standard network device to the Zephyr net stack.</p>

      <h2>Technical Details</h2>
      <p>The driver follows Zephyr's USB host class driver API, registering with the host stack via <code>USB_HOST_CLASS_DRIVER_DEFINE</code>. Data transfer is handled through bulk IN/OUT endpoints with double-buffering for throughput. The control path adheres to the CDC ECM specification (USB ECM subclass, class code 0x02).</p>

      <h2>Pull Request</h2>
      <p>The full diff, review comments, and CI status are available on the Zephyr GitHub repository linked above.</p>
    `,
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
    excerpt:
      "Full-featured MCAN driver for TI MSPM0 G-Series MCUs in Zephyr RTOS, supporting both classic CAN and CAN FD.",
    content: `
      <p>This PR introduces a Zephyr driver for the <strong>MCAN (Message-based Controller Area Network)</strong> module present on TI's MSPM0 G-Series microcontrollers. The driver supports both <strong>classic CAN</strong> (ISO 11898-1) and <strong>CAN FD</strong> (ISO 11898-2) operation modes.</p>

      <h2>Motivation</h2>
      <p>The MSPM0 G-Series is TI's low-power Arm Cortex-M0+ MCU family. Prior to this PR, no Zephyr CAN driver existed for this SoC series, making it unavailable for CAN-based industrial or automotive applications running Zephyr.</p>

      <h2>Features</h2>
      <p>The driver implements the full Zephyr CAN controller API including: frame transmission (classic and FD modes), frame reception with hardware message filtering, error state reporting (error passive, bus-off detection and recovery), loopback mode for testing, and runtime bitrate configuration.</p>

      <h2>Devicetree Bindings</h2>
      <p>New DTS bindings are included for the MSPM0 MCAN peripheral, allowing board-level configuration of the CAN controller, its clock source, interrupt routing, and GPIO pin assignments via standard Zephyr devicetree mechanisms.</p>

      <h2>Testing</h2>
      <p>The driver was validated against Zephyr's CAN conformance test suite on real MSPM0G hardware with a PEAK USB-CAN adapter as the test peer.</p>
    `,
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
    excerpt:
      "SPI master driver for TI MSPM0 series in Zephyr, with configurable frame size, CPOL/CPHA, and bit order.",
    content: `
      <p>This contribution adds a <strong>SPI master mode driver</strong> for TI's MSPM0 microcontroller series to Zephyr RTOS. The MSPM0 SPI peripheral is based on a standard SSI (Synchronous Serial Interface) controller with a number of configurable parameters.</p>

      <h2>Supported Configuration</h2>
      <p>The driver supports the full Zephyr SPI API configuration surface: frame sizes from 4 to 16 bits, all four SPI modes (CPOL 0/1 × CPHA 0/1), MSB-first and LSB-first bit ordering, software chip-select control via GPIO, and half-duplex operation for 3-wire SPI buses.</p>

      <h2>Implementation Notes</h2>
      <p>Transfers are interrupt-driven with configurable FIFO thresholds to balance latency and CPU overhead. The driver registers as a standard Zephyr SPI controller device, making it immediately usable with any existing Zephyr SPI peripheral driver (sensors, displays, flash, etc.) without changes to those drivers.</p>

      <h2>Devicetree Integration</h2>
      <p>New DTS bindings define the MSPM0 SPI node properties including peripheral base address, clock source, baud rate divisor, and pinctrl entries. Example board overlays are included in the PR for reference.</p>

      <h2>Validation</h2>
      <p>Validated using Zephyr's SPI loopback test and with a real SPI flash device (Winbond W25Q) on MSPM0 LaunchPad hardware.</p>
    `,
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
    excerpt:
      "8/12-bit DAC driver for TI MSPM0 G-Series in Zephyr, with configurable voltage reference and Kconfig integration.",
    content: `
      <p>This PR adds a Zephyr driver for the <strong>DAC (Digital-to-Analog Converter)</strong> module on TI MSPM0 G-Series MCUs. The MSPM0 DAC supports both 8-bit and 12-bit output resolution and can source its reference from the internal bandgap or an external VREF pin.</p>

      <h2>API Coverage</h2>
      <p>The driver implements the Zephyr DAC API: <code>dac_channel_setup()</code> for resolution and reference configuration, <code>dac_write_value()</code> for output updates, and output enable/disable lifecycle management. Multiple channels are supported where the hardware exposes them.</p>

      <h2>Voltage Reference</h2>
      <p>By default the driver uses the internal 2.5 V bandgap reference. Applications that require a specific reference voltage can select an external VREF by enabling <code>CONFIG_DAC_MSPM0_EXTERNAL_VREF</code> in Kconfig; the driver will then configure the VREF input pin and route the external reference to the DAC core.</p>

      <h2>Resolution Control</h2>
      <p>Resolution (8-bit vs 12-bit) is set per-channel at setup time. The driver validates the requested resolution against hardware capability and returns <code>-ENOTSUP</code> for unsupported combinations, following Zephyr error-reporting conventions.</p>

      <h2>Testing</h2>
      <p>Output verified with a logic analyzer and multimeter on MSPM0G LaunchPad hardware across both resolutions and both reference sources.</p>
    `,
    ProjectIcon: Bluetooth,
    links: {
      github: "https://github.com/zephyrproject-rtos/zephyr/pull/94725",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRecentProjects(count: number = 4): Project[] {
  return projects.slice(0, count);
}

export const allProjectTags = Array.from(
  new Set(projects.flatMap((p) => p.tags))
).sort();
