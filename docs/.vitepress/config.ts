import { defineConfig } from "vitepress";

export default defineConfig({
  title: "🐼『 ht的博客 』",
  description: "Blog、 个人博客、 学习文档",
  titleTemplate: "⚡️⚡️",
  lastUpdated: true,
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    [
      "meta",
      {
        name: "keywords",
        content: "HTML, CSS, JavaScript, vue, vitepress, vuepress, 博客, blog",
      },
    ],
  ],
  themeConfig: {
    outlineTitle: "🔴🟠🟢",
    lastUpdatedText: "上次更新于",
    // 搜索查询
    search: {
      provider: "local",
    },
    nav: [
      {
        text: "📖 笔记",
        items: [
          { text: "🟠 JavaScript", link: "/JavaScript/README.html" },
          { text: "🟡 HTML", link: "/HTML/README.html" },
          { text: "🟢 CSS", link: "/CSS/README.html" },
          { text: "🔵 TypeScript", link: "/TypeScript/README.html" },
        ],
      },
      {
        text: "💻 框架",
        items: [
          { text: "🟩 Vue", link: "/frame/base_vue3.html" },
          { text: "🟦 Electron", link: "/electron/README.html" },
        ],
      },
      {
        text: "🪲 BUG",
        link: "/about/about.html",
      },
      {
        text: "🛠️ 工具",
        link: "/tools/git.html",
      },
      {
        text: "⭐ 关于我",
        link: "/about/about.html",
      },
    ],

    sidebar: {
      "/JavaScript/": [
        {
          text: "📁 JavaScript",
          collapsed: false,
          items: [
            { text: "📄 JS 方法（数组/对象）", link: "/JavaScript/function" },
            { text: "📄 JS Map/Set", link: "/JavaScript/map_set" },
            {
              text: "📄 JS call/apply/bind",
              link: "/JavaScript/call_apply_bind",
            },
            { text: "📄 JS new操作符", link: "/JavaScript/new" },
            { text: "📄 JS 闭包", link: "/JavaScript/closure" },
            { text: "📄 JS Promise", link: "/JavaScript/promise" },
            { text: "📄 JS 深拷贝与浅拷贝", link: "/JavaScript/clone" },
            { text: "📄 JS 防抖与节流", link: "/JavaScript/debounce_throttle" },
            { text: "📄 JS 优化代码分支", link: "/JavaScript/condition" },
            {
              text: "📄 JS 并发任务控制",
              link: "/JavaScript/concurrencyRequest",
            },
          ],
        },
      ],
      "/CSS/": [
        {
          text: "📁 CSS",
          collapsed: false,
          items: [
            { text: "📄 CSS 自定义属性", link: "/CSS/variable" },
            { text: "📄 CSS 文本溢出", link: "/CSS/overflow" },
          ],
        },
      ],
      "/HTML/": [],
      "/TypeScript/": [
        {
          text: "📁 TypeScript",
          collapsed: false,
          items: [
            {
              text: "📄 TS interface 与 type 的区别",
              link: "/TypeScript/interface_type",
            },
            { text: "📄 TS 泛型", link: "/TypeScript/genericity" },
            {
              text: "📄 TS 使用泛型和keyof约束参数",
              link: "/TypeScript/demo1",
            },
          ],
        },
      ],
      "/tools/": [
        {
          text: "🛠️ 工具",
          collapsed: false,
          items: [
            { text: "󠁇🍉 Git", link: "/tools/git" },
            { text: "󠁇🍉 Git 绑定多个远程库", link: "/tools/more_remote" },
            { text: "󠁇🍉 nvm", link: "/tools/nvm" },
            {
              text: "󠁇🍉 vscode prettier 自动格式",
              link: "/tools/prettier_vscode",
            },
            {
              text: "󠁇🍉 vite.config.ts 文件配置",
              link: "/tools/vite_config",
            },
          ],
        },
      ],
      "/frame/": [
        {
          text: "🟩 Vue3",
          collapsed: false,
          items: [
            { text: "󠁇🔸 响应式数据", link: "/frame/base_vue3" },
            { text: "󠁇🔸 computed watch", link: "/frame/computed_watch" },
            { text: "󠁇🔸 Router", link: "/frame/router" },
            {
              text: "󠁇🔸 单页面首屏加载优化",
              link: "/frame/performance_optimization",
            },
            {
              text: "󠁇🔸 computed 劫持 v-model",
              link: "/frame/useVModel",
            },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2019-present Ht",
    },
  },
});
