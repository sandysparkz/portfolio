(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,87316,e=>{"use strict";let t=(0,e.i(75254).default)("calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);e.s(["Calendar",0,t],87316)},55436,e=>{"use strict";let t=(0,e.i(75254).default)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]);e.s(["Search",0,t],55436)},71689,e=>{"use strict";let t=(0,e.i(75254).default)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);e.s(["ArrowLeft",0,t],71689)},10980,e=>{"use strict";let t=(0,e.i(75254).default)("book-open",[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]]);e.s(["BookOpen",0,t],10980)},63059,e=>{"use strict";let t=(0,e.i(75254).default)("chevron-right",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);e.s(["ChevronRight",0,t],63059)},27925,e=>{"use strict";var t=e.i(43476),s=e.i(71645),r=e.i(22016),a=e.i(87316),l=e.i(10980),i=e.i(63059),n=e.i(55436),o=e.i(37727),c=e.i(71689);let d=(0,e.i(75254).default)("tag",[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]]),h=[{slug:"getting-started-zephyr-usb",title:"[Blog Title — Getting Started with Zephyr's USB Subsystem]",date:"2024-01-15",author:"[Your Name]",excerpt:"[Excerpt Placeholder — A deep dive into configuring and using the USB subsystem in Zephyr RTOS...]",tags:["Zephyr","USB","Tutorial"],readTime:"8 min read",content:`
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
    `}],p=Array.from(new Set(h.flatMap(e=>e.tags))).sort();e.s(["default",0,function(){let[e,u]=(0,s.useState)(""),[m,g]=(0,s.useState)(null),x=(0,s.useRef)(null);(0,s.useEffect)(()=>{let e=e=>{"Escape"===e.key&&document.activeElement===x.current&&(u(""),x.current?.blur())};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[]);let b=h.filter(t=>{let s=t.title.toLowerCase().includes(e.toLowerCase())||t.excerpt.toLowerCase().includes(e.toLowerCase())||t.tags.some(t=>t.toLowerCase().includes(e.toLowerCase())),r=!m||t.tags.includes(m);return s&&r});return(0,t.jsx)("div",{className:"min-h-screen pt-28 sm:pt-36 pb-20 sm:pb-28",children:(0,t.jsxs)("div",{className:"max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",children:[(0,t.jsxs)(r.default,{href:"/#blog-teaser",className:"inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-400 transition-colors duration-200 mb-10",children:[(0,t.jsx)(c.ArrowLeft,{className:"w-4 h-4"}),"Back to home"]}),(0,t.jsxs)("div",{className:"mb-12 sm:mb-14",children:[(0,t.jsxs)("div",{className:"section-label",children:[(0,t.jsx)("div",{className:"section-label-line"}),(0,t.jsx)("span",{className:"section-label-text",children:"Blog"})]}),(0,t.jsx)("h1",{className:"section-title uppercase",children:"All Posts"}),(0,t.jsx)("p",{className:"section-subtitle",children:"Deep dives into embedded systems, firmware development, and low-level engineering."})]}),(0,t.jsxs)("div",{className:"relative mb-6",children:[(0,t.jsx)(n.Search,{className:"absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"}),(0,t.jsx)("input",{ref:x,type:"text",placeholder:"Search articles...",value:e,onChange:e=>u(e.target.value),className:"input-field w-full pl-12 pr-10 py-2.5 text-sm"}),e&&(0,t.jsx)("button",{onClick:()=>{u(""),x.current?.focus()},className:"absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded text-gray-500 hover:text-gray-200 transition-colors","aria-label":"Clear search",children:(0,t.jsx)(o.X,{className:"w-3.5 h-3.5"})})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2 flex-wrap mb-10",children:[(0,t.jsx)(d,{className:"w-4 h-4 text-gray-600"}),(0,t.jsx)("button",{onClick:()=>g(null),className:"px-3 py-1.5 rounded-lg text-xs uppercase tracking-wide font-mono transition-all duration-200",style:{background:null===m?"rgba(255,255,255,0.95)":"rgba(255,255,255,0.04)",color:null===m?"#0e0e0e":"#6b7280",border:null===m?"1px solid rgba(255,255,255,0.2)":"1px solid rgba(255,255,255,0.08)"},children:"All"}),p.map(e=>(0,t.jsx)("button",{onClick:()=>g(e===m?null:e),className:"px-3 py-1.5 rounded-lg text-xs uppercase tracking-wide font-mono transition-all duration-200",style:{background:e===m?"rgba(255,255,255,0.95)":"rgba(255,255,255,0.04)",color:e===m?"#0e0e0e":"#6b7280",border:e===m?"1px solid rgba(255,255,255,0.2)":"1px solid rgba(255,255,255,0.08)"},children:e.toUpperCase()},e))]}),(0,t.jsxs)("p",{className:"font-terminal text-xs text-gray-600 mb-6",children:[b.length," article",1!==b.length?"s":""," found"]}),(0,t.jsxs)("div",{className:"space-y-4",children:[b.map(e=>(0,t.jsx)(r.default,{href:`/blog/${e.slug}`,className:"card-interactive group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",children:(0,t.jsxs)("div",{className:"flex flex-col sm:flex-row sm:items-start gap-4",children:[(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3 mb-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-1.5 text-gray-600",children:[(0,t.jsx)(a.Calendar,{className:"w-3.5 h-3.5"}),(0,t.jsx)("span",{className:"font-mono text-xs",children:e.date})]}),(0,t.jsx)("span",{className:"text-gray-700",children:"·"}),(0,t.jsxs)("div",{className:"flex items-center gap-1.5 text-gray-600",children:[(0,t.jsx)(l.BookOpen,{className:"w-3.5 h-3.5"}),(0,t.jsx)("span",{className:"font-mono text-xs",children:e.readTime})]})]}),(0,t.jsx)("h2",{className:"text-base font-semibold text-gray-300 group-hover:text-blue-300 transition-colors duration-200 mb-2 uppercase tracking-wide",children:e.title}),(0,t.jsx)("p",{className:"text-sm text-gray-600 line-clamp-2 mb-3",children:e.excerpt}),(0,t.jsx)("div",{className:"flex flex-wrap gap-2",children:e.tags.map(e=>(0,t.jsx)("span",{className:"tech-tag uppercase",children:e.toUpperCase()},e))})]}),(0,t.jsx)("div",{className:"hidden sm:flex items-center text-gray-600 group-hover:text-blue-400 transition-colors duration-200",children:(0,t.jsx)(i.ChevronRight,{className:"w-5 h-5"})})]})},e.slug)),0===b.length&&(0,t.jsxs)("div",{className:"text-center py-16",children:[(0,t.jsxs)("p",{className:"font-terminal text-gray-500 text-sm mb-2",children:['$ grep -r "',e||m,'" ./blog/']}),(0,t.jsx)("p",{className:"text-gray-600 text-xs",children:"No articles found. Try a different search or filter."})]})]})]})})}],27925)}]);