# Cloudflare Pages 配置指南

## ⚠️ 必须配置构建设置

当前部署日志显示：`No build command specified. Skipping build step.`

这意味着 **构建步骤被跳过**，源代码被直接部署，导致浏览器无法加载 JSX 文件。

## 🔧 解决步骤

### 1. 进入 Cloudflare Pages Dashboard

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 **Pages** → 选择你的项目 `tw-comehome`
3. 点击 **Settings** 标签

### 2. 配置构建设置

在 **Builds & deployments** 部分，找到 **Build configuration**：

#### 必需配置：

```
Framework preset: None
Build command: npm run build
Build output directory: dist
Root directory: (留空或填写 /)
Environment variables: (无需配置)
```

#### Node.js 版本：

在 **Environment variables** 部分（或构建配置下方）：
- **Node.js version**: `18` 或 `20`（推荐 18）

### 3. 保存并重新部署

1. 点击页面底部的 **Save** 按钮
2. 切换到 **Deployments** 标签
3. 点击最新部署右侧的 **Retry deployment** 按钮
4. 等待构建完成（通常需要 1-3 分钟）

### 4. 验证构建成功

构建日志应该显示：

```
✓ npm install 执行成功
✓ npm run build 执行
✓ vite v5.x.x building for production...
✓ built in xxx ms
✓ dist/index.html 已生成
✓ dist/assets/index-[hash].js 已生成
```

如果看到这些输出，说明构建成功！

## ✅ 预期结果

构建成功后，浏览器应该：
- ✅ 不再报 MIME type 错误
- ✅ 成功加载 `/assets/index-[hash].js`（而不是 `/src/main.jsx`）
- ✅ 应用正常显示和运行

## 🔍 如果问题仍然存在

如果配置后仍有问题，请检查：

1. **构建日志**：查看是否有错误信息
2. **构建输出**：确认 `dist` 目录是否被创建
3. **浏览器缓存**：清除缓存（Ctrl+Shift+R）后重试

## 📝 注意事项

- ⚠️ **不要**选择 Framework preset 中的其他选项（如 React、Vite），选择 `None`
- ⚠️ **Build output directory** 必须是 `dist`（与 `vite.config.js` 中的 `outDir` 一致）
- ⚠️ 确保 Node.js 版本是 18 或 20（不要使用 Node.js 16 或更低版本）

