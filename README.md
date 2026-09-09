# Device Room

纯静态多设备网页预览器，使用 **React + TypeScript + Tailwind CSS + Vite**。没有服务端、浏览器引擎、API 或代理服务。

## 本地开发

```sh
npm ci
npm run dev
```

```sh
npm run build    # 类型检查并生成 dist/
npm run preview  # 本地查看生产构建
```

## 功能

- 输入 URL，同时在 iPhone SE、iPhone 17 Pro、Pixel、iPad、MacBook 和桌面视口中预览。
- 设备显隐、自定义视口、横竖屏切换、预览缩放及全部刷新。
- 安全区域参考线、灵动岛与摄像头外观参考；不修改目标网站。
- 中文 / English 切换，首次访问默认中文。语言偏好保存在本机浏览器，刷新后保留；禁用存储也可正常使用。
- 随语言切换的交互式 Focal 示例。示例表单不会发送或保存邮箱。

设备预设的 DPR 仅作为参考值显示，不进行 DPR 模拟。视口宽高以 CSS 像素为单位。

## 静态版限制

外部网页使用 iframe 直接加载，受浏览器同源策略以及目标站点的 CSP / X-Frame-Options 限制。目标网站禁止嵌入时，预览可能为空白；可使用外部打开链接。不能可靠地通过 iframe 的 load 事件判断网站是否允许嵌入，因此界面不会宣称目标网页已加载成功。

**已移除**：跨站滚动 / 点击 / 输入 / 路由同步、真实 DPR 模拟、网络限速、强制深色模式和网页截图 Diff。每台设备可以独立交互。安全区域只是叠加参考线，不模拟 CSS `env(safe-area-inset-*)` 或 iOS WebKit。

GitHub Pages 使用 HTTPS，因此静态版会拒绝 HTTP 目标地址，避免混合内容被浏览器拦截。HTTP 本地开发环境可预览 HTTP 地址。部分登录、弹窗或跳出 iframe 的流程会受沙箱限制。

## GitHub Pages 自动部署

工作流：`.github/workflows/deploy.yml`。

1. 仓库管理员在 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
2. 推送代码到 `main` 分支，自动触发构建与部署；也可在 Actions 页面手动运行。
3. 工作流使用 Node.js 22 执行 `npm ci`、`npm run build`，上传 `dist/` 并通过官方 Pages Action 发布。
4. 成功后在 Actions 的 `github-pages` 环境查看实际站点地址。此仓库默认地址为 `https://typeofnan.github.io/device-room/`（以 GitHub 返回的地址为准）。

Vite 使用 `base: './'`，构建资源采用相对路径，适用于 GitHub Pages 的 `/device-room/` 子目录，也可以放在自定义域名根目录。无需配置 API 密钥、第三方部署 Token 或额外服务端。

工作流对源码只读，仅部署任务获得 `pages: write` 和 `id-token: write` 权限。若仓库不具备 Pages 权限或尚未启用 Pages，先完成仓库设置，再重新运行工作流。

[GitHub 官方 Pages 工作流文档](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

## 目录

- `src/App.tsx`：静态预览工作台。
- `src/i18n.ts`：中英文界面词典及默认语言。
- `src/Demo.tsx`：双语交互示例。
- `src/devices.ts`：设备视口预设。
- `.github/workflows/deploy.yml`：main 分支自动发布。

---

A fully static responsive preview workspace. Run `npm ci` and `npm run dev` locally, or publish `dist/` to GitHub Pages. Chinese is the default language; English is available in the header. Previewed sites must allow iframe embedding. No server, browser engine, screenshot service, or cross-origin synchronization is included.
