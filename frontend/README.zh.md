# llm-factory

一个现代化的React应用，用于构建和管理基于LLM的工具和工作流程，专注于开发者体验和性能优化。

## 功能特点

- 使用React 18和TypeScript构建的快速响应式UI
- 基于功能的模块化组织模式
- 带身份验证支持和请求/响应拦截器的健壮API客户端
- 带自适应断点的响应式布局系统
- 预配置现代开发工具和最佳实践
- 使用TanStack Router的类型安全路由
- 基于Tailwind CSS构建的自定义组件库
- 全面的错误处理和加载状态管理

## 技术栈

- **前端框架**: React 18, TypeScript 5.2+, Vite 5
- **UI组件**: 基于Tailwind CSS的自定义组件库
- **路由管理**: TanStack Router (React Location)
- **API通信**: 带拦截器的Axios客户端
- **构建工具**: Vite，用于快速开发和优化生产构建
- **代码检查**: ESLint，带TypeScript支持和自定义规则
- **代码格式化**: Prettier，带自动格式化功能
- **包管理器**: pnpm，用于高效依赖管理

## 快速开始

### 前置要求

- Node.js 18.x或更高版本
- pnpm包管理器（推荐，以获得最佳性能）

### 安装步骤

```bash
# 安装依赖
pnpm install

# 启动开发服务器（带热模块替换）
pnpm dev

# 可选：以调试模式启动开发服务器
pnpm dev:debug
```

### 生产环境构建

```bash
# 构建生产版本（优化构建包）
pnpm build

# 预览生产构建
pnpm preview

# 分析构建包大小
pnpm analyze
```

## 项目结构

项目遵循基于功能的组织模式，以促进模块化和可维护性：

```
src/
├── @api/                 - API客户端和服务定义
│   ├── auth/             - 身份验证API端点
│   └── client/           - 基础API客户端设置
├── @layout/              - 布局组件
│   └── base-layout.tsx   - 主应用布局包装器
├── assets/               - 静态资源（图片、字体等）
├── components/           - 可复用UI组件
│   └── ui/               - 基础UI组件（按钮、输入框等）
├── features/             - 特定功能组件和逻辑
│   ├── about/            - 关于页面功能
│   └── home/             - 首页功能
├── lib/                  - 工具函数和共享逻辑
├── routes/               - 应用路由（TanStack Router）
│   ├── __root.tsx        - 根路由定义
│   ├── about.tsx         - 关于页面路由
│   └── home.tsx          - 首页路由
├── index.css             - 全局样式
├── main.tsx              - 应用入口点
└── routeTree.gen.ts      - 生成的路由类型（TanStack Router）
```

## 开发指南

### 代码检查

```bash
# 运行ESLint检查代码问题
pnpm lint

# 自动修复可修复的代码问题
pnpm lint:fix
```

### 代码格式化

```bash
# 使用Prettier格式化代码
pnpm format

# 检查格式化问题而不修复
pnpm format:check
```

### 类型检查

```bash
# 运行TypeScript编译器检查
pnpm type-check
```

## 架构概述

### 应用架构

应用遵循分层架构模式：

1. **表现层** - React组件和页面
2. **功能层** - 特定功能组件和逻辑
3. **服务层** - API客户端和数据获取
4. **核心层** - 工具函数和共享逻辑

### TanStack Router路由

应用使用TanStack Router实现类型安全路由，具有以下特性：

- 基于文件系统的路由生成
- 自动代码分割和懒加载
- 类型安全的路由参数和查询参数
- 嵌套布局和路由组
- 用于数据获取的路由加载器和操作

### API客户端

API客户端基于Axios构建，包含：

- 请求/响应拦截器用于身份验证和错误处理
- 类型安全的请求和响应类型
- 失败请求的重试逻辑
- 请求取消支持
- 文件上传/下载进度跟踪

## 贡献指南

1. Fork本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开Pull Request

## 许可证

MIT