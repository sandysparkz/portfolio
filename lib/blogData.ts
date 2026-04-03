export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  readTime: string;
  content: string; // HTML or markdown
}

export const blogPosts: BlogPost[] = [
  {
    slug: "getting-started-zephyr-usb",
    title: "[Blog Title — Getting Started with Zephyr's USB Subsystem]",
    date: "2024-01-15",
    author: "[Your Name]",
    excerpt:
      "[Excerpt Placeholder — A deep dive into configuring and using the USB subsystem in Zephyr RTOS...]",
    tags: ["Zephyr", "USB", "Tutorial"],
    readTime: "8 min read",
    content: `
      <p>[Article Content Placeholder — Start with an introduction about why USB is important in embedded systems and how Zephyr's USB stack simplifies implementation.]</p>

      <h2>Prerequisites</h2>
      <p>[Describe the prerequisites: Zephyr SDK installed, compatible hardware (e.g., nRF52840-DK), basic C knowledge.]</p>

      <h2>Setting Up the USB Descriptor</h2>
      <p>[Explain USB descriptors and how Zephyr handles them through Kconfig and devicetree.]</p>

      <pre><code class="language-c">/* Example: USB CDC ACM Configuration */
#include &lt;zephyr/usb/usb_device.h&gt;
#include &lt;zephyr/usb/usbd.h&gt;

static const struct device *usb_dev;

int main(void)
{
    usb_dev = DEVICE_DT_GET_ONE(zephyr_cdc_acm_uart);

    if (!device_is_ready(usb_dev)) {
        LOG_ERR("USB device not ready");
        return -ENODEV;
    }

    int ret = usb_enable(NULL);
    if (ret != 0) {
        LOG_ERR("Failed to enable USB: %d", ret);
        return ret;
    }

    LOG_INF("USB CDC ACM initialized successfully");
    return 0;
}</code></pre>

      <h2>Building and Flashing</h2>
      <p>[Walk through the build process using west and flashing to the target board.]</p>

      <pre><code class="language-bash">$ west build -b nrf52840dk_nrf52840 samples/subsys/usb/cdc_acm
$ west flash</code></pre>

      <h2>Testing</h2>
      <p>[Describe how to test the USB device on a host PC, verify enumeration, and send/receive data.]</p>

      <h2>Conclusion</h2>
      <p>[Wrap up with next steps: custom USB classes, bulk transfers, HID devices, etc.]</p>
    `,
  },
  {
    slug: "yocto-custom-layer-guide",
    title: "[Blog Title — Building Custom Yocto Layers for ARM Boards]",
    date: "2024-01-08",
    author: "[Your Name]",
    excerpt:
      "[Excerpt Placeholder — Step-by-step guide to creating custom Yocto meta-layers...]",
    tags: ["Yocto", "Linux", "ARM"],
    readTime: "12 min read",
    content: `
      <p>[Article Content Placeholder — Introduce Yocto Project and why custom layers are essential for embedded Linux products.]</p>

      <h2>What is a Yocto Layer?</h2>
      <p>[Explain the layer concept, meta-layers, and how BitBake processes recipes.]</p>

      <h2>Creating Your First Layer</h2>
      <pre><code class="language-bash">$ cd poky
$ bitbake-layers create-layer ../meta-custom
$ bitbake-layers add-layer ../meta-custom</code></pre>

      <p>[Continue with recipe creation, image customization, and machine configuration.]</p>

      <h2>Conclusion</h2>
      <p>[Summarize key takeaways and link to further Yocto resources.]</p>
    `,
  },
  {
    slug: "ble-mesh-zephyr-deep-dive",
    title: "[Blog Title — BLE Mesh Networking with Zephyr: A Practical Guide]",
    date: "2023-12-20",
    author: "[Your Name]",
    excerpt:
      "[Excerpt Placeholder — Exploring BLE Mesh networking using Zephyr RTOS...]",
    tags: ["BLE", "Zephyr", "IoT"],
    readTime: "10 min read",
    content: `
      <p>[Article Content Placeholder — Overview of BLE Mesh technology, its advantages for IoT, and Zephyr's implementation.]</p>

      <h2>BLE Mesh Architecture</h2>
      <p>[Describe the mesh architecture: nodes, elements, models, and the publish-subscribe paradigm.]</p>

      <h2>Provisioning</h2>
      <p>[Explain the provisioning process and how to set it up in Zephyr.]</p>

      <h2>Implementing a Sensor Server Model</h2>
      <pre><code class="language-c">/* BLE Mesh Sensor Server */
static struct bt_mesh_sensor_srv sensor_srv = BT_MESH_SENSOR_SRV_INIT(
    sensor_columns, ARRAY_SIZE(sensor_columns));

static struct bt_mesh_model models[] = {
    BT_MESH_MODEL_SENSOR_SRV(&sensor_srv),
};</code></pre>

      <h2>Conclusion</h2>
      <p>[Wrap up with testing methodology and real-world deployment tips.]</p>
    `,
  },
  {
    slug: "understanding-i2c-protocol",
    title: "[Blog Title — Understanding the I2C Protocol for Embedded Devs]",
    date: "2023-11-15",
    author: "[Your Name]",
    excerpt:
      "[Excerpt Placeholder — A comprehensive guide to the I2C bus protocol from an embedded developer's perspective...]",
    tags: ["I2C", "Hardware", "Protocols"],
    readTime: "7 min read",
    content: `
      <p>[Article Content Placeholder — Introduction to the I2C protocol, history, and use cases.]</p>
      <h2>How I2C Works</h2>
      <p>[Explain SDA/SCL lines, addressing, clock stretching, etc.]</p>
      <h2>Conclusion</h2>
      <p>[Summary and best practices.]</p>
    `,
  },
  {
    slug: "linux-kernel-module-basics",
    title: "[Blog Title — Writing Your First Linux Kernel Module]",
    date: "2023-10-28",
    author: "[Your Name]",
    excerpt:
      "[Excerpt Placeholder — Introduction to Linux kernel module development for embedded systems...]",
    tags: ["Linux", "Driver Dev", "C"],
    readTime: "15 min read",
    content: `
      <p>[Article Content Placeholder — Getting started with Linux kernel module development.]</p>
      <h2>Hello, Kernel!</h2>
      <pre><code class="language-c">#include &lt;linux/module.h&gt;
#include &lt;linux/kernel.h&gt;

static int __init hello_init(void) {
    printk(KERN_INFO "Hello, Embedded Linux!\\n");
    return 0;
}

static void __exit hello_exit(void) {
    printk(KERN_INFO "Goodbye, Embedded Linux!\\n");
}

module_init(hello_init);
module_exit(hello_exit);

MODULE_LICENSE("GPL");
MODULE_AUTHOR("[Your Name]");
MODULE_DESCRIPTION("A simple kernel module");</code></pre>
      <h2>Conclusion</h2>
      <p>[Next steps: character devices, platform drivers, device tree bindings.]</p>
    `,
  },
];

export const allTags = Array.from(
  new Set(blogPosts.flatMap((post) => post.tags))
).sort();

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((post) => post.tags.includes(tag));
}
