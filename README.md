# Vue 3 + TypeScript + Pinia + Vite2 + antDesign 管理系统

### 前言 📖

XiaoWuAdmin，基于 Vue3.2、TypeScript、Vite2、Pinia、antDesigns 开源的一套后台管理模板，目前利用空余时间开发。项目中很多样式都是借鉴其它的管理系统，但是代码都是自己敲的，整个项目还有很多地方不完善，后期会持续更新，希望大家能多提意见。

### ？为什么开发这个管理系统 🤷‍♂️

- 主要是学习下 Vue3 + TypeScript
- 目前看了很多 Vue3 的开源后台管理系统，感觉都非常庞大，很多功能基本上也用不到，所以自己就尝试写了一下这个管理系统

### 一、在线预览 👀

- Link：http://121.4.119.52

- 另外推荐一个我的小项目，也是平时写着练习的
- Link：http://121.4.119.52:81

### 二、Git 仓库地址 (欢迎 Star⭐)

- GitHub：https://github.com/1421788142/XiaoWuAdmin

### 三、🔨🔨🔨 项目功能

- 🚀 使用 Vue3 开发，单文件组件 `＜script setup＞`
- 🚀 采用 Vite2 作为项目开发、打包工具（配置了TSX 语法）
- 🚀 整个项目集成了 TypeScript （完全是为了想学习）
- 🚀 使用 Pinia🍍 替代 Vuex，轻量、简单、易用）
- 🚀 使用 TypeScript 对 Axios 整个二次封装 （全局错误拦截、常用请求封装、取消重复请求……）
- 🚀 对表格的所有操作基本都封装成了 Hooks （表格数据搜索、重置、查询、分页、多选、单条数据操作、文件上传、下载、格式化单元格内容……）
- 🚀 基于 antDesign 二次封装 [use-Table 组件] ，表格页面全部传成配置项 Columns
- 🚀 支持 antDesign 组件大小切换、暗黑模式、i18n 国际化（i18n 暂时没配置所有文件，根据项目自行配置）
- 🚀 使用 vue-router 进行路由权限拦截（403 页面，404 页面）、页面按钮权限配置、路由懒加载
- 🚀 使用 keep-alive 对整个页面进行缓存，支持多级嵌套页面（缓存路由里可配置、页面切换带动画）
- 🚀 常用自定义指令开发（复制、节流、防抖、长按……）

### 四、安装使用

- **Clone:**

```
# GitHub
git clone https://github.com/1421788142/XiaoWuAdmin.git
```

- **Install**

```
yarn install
# yarn install 安装失败，请nodejs 版本控制在 14.15.4
```

- **Run**
```
yarn dev
```

- **Build**
```
yarn build
```

### 五、项目后台接口
> 项目后台接口完全采用Mock 数据，感谢下面Mock平台支持

- FastMock： https://www.fastmock.site/
