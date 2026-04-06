(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,71689,e=>{"use strict";let t=(0,e.i(75254).default)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);e.s(["ArrowLeft",0,t],71689)},87316,e=>{"use strict";let t=(0,e.i(75254).default)("calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);e.s(["Calendar",0,t],87316)},63059,e=>{"use strict";let t=(0,e.i(75254).default)("chevron-right",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);e.s(["ChevronRight",0,t],63059)},27925,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(22016),s=e.i(87316),i=e.i(75254);let l=(0,i.default)("book-open",[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]]);var o=e.i(63059);let n=(0,i.default)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]),c=(0,i.default)("tag",[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]]);var d=e.i(71689);let h=[{slug:"getting-started-zephyr-usb",title:"[Blog Title — Getting Started with Zephyr's USB Subsystem]",date:"2024-01-15",author:"[Your Name]",excerpt:"[Excerpt Placeholder — A deep dive into configuring and using the USB subsystem in Zephyr RTOS...]",tags:["Zephyr","USB","Tutorial"],readTime:"8 min read",content:`
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
    `},{slug:"yocto-custom-layer-guide",title:"[Blog Title — Building Custom Yocto Layers for ARM Boards]",date:"2024-01-08",author:"[Your Name]",excerpt:"[Excerpt Placeholder — Step-by-step guide to creating custom Yocto meta-layers...]",tags:["Yocto","Linux","ARM"],readTime:"12 min read",content:`
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
    `},{slug:"ble-mesh-zephyr-deep-dive",title:"[Blog Title — BLE Mesh Networking with Zephyr: A Practical Guide]",date:"2023-12-20",author:"[Your Name]",excerpt:"[Excerpt Placeholder — Exploring BLE Mesh networking using Zephyr RTOS...]",tags:["BLE","Zephyr","IoT"],readTime:"10 min read",content:`
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
    `},{slug:"understanding-i2c-protocol",title:"[Blog Title — Understanding the I2C Protocol for Embedded Devs]",date:"2023-11-15",author:"[Your Name]",excerpt:"[Excerpt Placeholder — A comprehensive guide to the I2C bus protocol from an embedded developer's perspective...]",tags:["I2C","Hardware","Protocols"],readTime:"7 min read",content:`
      <p>[Article Content Placeholder — Introduction to the I2C protocol, history, and use cases.]</p>
      <h2>How I2C Works</h2>
      <p>[Explain SDA/SCL lines, addressing, clock stretching, etc.]</p>
      <h2>Conclusion</h2>
      <p>[Summary and best practices.]</p>
    `},{slug:"linux-kernel-module-basics",title:"[Blog Title — Writing Your First Linux Kernel Module]",date:"2023-10-28",author:"[Your Name]",excerpt:"[Excerpt Placeholder — Introduction to Linux kernel module development for embedded systems...]",tags:["Linux","Driver Dev","C"],readTime:"15 min read",content:`
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
    `}],p=Array.from(new Set(h.flatMap(e=>e.tags))).sort();e.s(["default",0,function(){let[e,i]=(0,r.useState)(""),[u,m]=(0,r.useState)(null),x=h.filter(t=>{let r=t.title.toLowerCase().includes(e.toLowerCase())||t.excerpt.toLowerCase().includes(e.toLowerCase()),a=!u||t.tags.includes(u);return r&&a});return(0,t.jsx)("div",{className:"min-h-screen pt-24 pb-16",children:(0,t.jsxs)("div",{className:"max-w-4xl mx-auto px-4 sm:px-6",children:[(0,t.jsxs)(a.default,{href:"/",className:"inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 mb-8 transition-colors",children:[(0,t.jsx)(d.ArrowLeft,{className:"w-4 h-4"}),"Back to Portfolio"]}),(0,t.jsxs)("div",{className:"mb-12",children:[(0,t.jsx)("h1",{className:"text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4",children:"Blog"}),(0,t.jsx)("p",{className:"text-lg text-gray-500 dark:text-gray-400",children:"Deep dives into embedded systems, firmware development, and low-level engineering — straight from the terminal."})]}),(0,t.jsxs)("div",{className:"mb-10 space-y-4",children:[(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)(n,{className:"absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"}),(0,t.jsx)("input",{type:"text",placeholder:"Search articles...",className:"input-field pl-12 text-base",value:e,onChange:e=>i(e.target.value)})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2 flex-wrap",children:[(0,t.jsx)(c,{className:"w-4 h-4 text-gray-400"}),(0,t.jsx)("button",{onClick:()=>m(null),className:`px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${null===u?"bg-accent-600 text-white":"bg-gray-100 dark:bg-surface-dark-card border border-gray-200 dark:border-surface-dark-border text-gray-600 dark:text-gray-400 hover:border-accent-300 dark:hover:border-accent-700"}`,children:"All"}),p.map(e=>(0,t.jsx)("button",{onClick:()=>m(e===u?null:e),className:`px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${u===e?"bg-accent-600 text-white":"bg-gray-100 dark:bg-surface-dark-card border border-gray-200 dark:border-surface-dark-border text-gray-600 dark:text-gray-400 hover:border-accent-300 dark:hover:border-accent-700"}`,children:e},e))]})]}),(0,t.jsxs)("p",{className:"font-mono text-sm text-gray-400 mb-6",children:[x.length," article",1!==x.length?"s":""," ","found"]}),(0,t.jsxs)("div",{className:"space-y-4",children:[x.map(e=>(0,t.jsx)(a.default,{href:`/blog/${e.slug}`,className:"card-interactive group block",children:(0,t.jsxs)("div",{className:"flex flex-col sm:flex-row sm:items-start gap-4",children:[(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3 mb-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-1.5 text-gray-400",children:[(0,t.jsx)(s.Calendar,{className:"w-3.5 h-3.5"}),(0,t.jsx)("span",{className:"font-mono text-xs",children:e.date})]}),(0,t.jsx)("span",{className:"text-gray-300 dark:text-gray-600",children:"•"}),(0,t.jsxs)("div",{className:"flex items-center gap-1.5 text-gray-400",children:[(0,t.jsx)(l,{className:"w-3.5 h-3.5"}),(0,t.jsx)("span",{className:"font-mono text-xs",children:e.readTime})]})]}),(0,t.jsx)("h2",{className:"text-lg font-semibold text-gray-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors mb-2",children:e.title}),(0,t.jsx)("p",{className:"text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3",children:e.excerpt}),(0,t.jsx)("div",{className:"flex flex-wrap gap-2",children:e.tags.map(e=>(0,t.jsx)("span",{className:"tech-tag text-xs",children:e},e))})]}),(0,t.jsx)("div",{className:"hidden sm:flex items-center text-accent-500 opacity-0 group-hover:opacity-100 transition-opacity",children:(0,t.jsx)(o.ChevronRight,{className:"w-5 h-5"})})]})},e.slug)),0===x.length&&(0,t.jsxs)("div",{className:"text-center py-16",children:[(0,t.jsxs)("p",{className:"font-mono text-gray-400 mb-2",children:['$ grep -r "',e||u,'" ./blog/']}),(0,t.jsx)("p",{className:"text-gray-500 dark:text-gray-400",children:"No articles found. Try a different search or filter."})]})]})]})})}],27925)}]);