<div align="center">

<img src="https://mock.fcadmin.fun/web/img/logo.png" width="120px" height="120px"/>

<p align="center" style="margin-top:20px">
	<a href="https://v3.vuejs.org/" target="_blank">
		<img src="https://img.shields.io/badge/vite-5.x-blue" alt="Vite">
	</a>
	<a href="https://v3.vuejs.org/" target="_blank">
		<img src="https://img.shields.io/badge/Vue.js-3.x-green" alt="Vue">
	</a>
	<a href="https://element-plus.org/#/zh-CN/component/changelog" target="_blank">
		<img src="https://img.shields.io/badge/element--plus-latest-blue" alt="element plus">
	</a>
</p>

<h1>FC-Admin</h1>

</div>

## V1.0.2更新日志（Upload Logs）

> 重要提醒！！！v1.0.2版本是根据[FC-Admin-Server](https://github.com/lfcleo/fc-admin-server)服务器版本实践开发，优化了部分组件内容。如果想开发与服务器交互的版本，可参考[FC-Admin-Server](https://github.com/lfcleo/fc-admin-server)

**项目架构(注意！！！不兼容老版本)**
* 删除--动态菜单路由`meta.isLink`属性，改为下方的`type`
* 新增--动态菜单路由`meta.type`属性，对应的值为`MENU == 菜单`，`BUTTON == 按钮`，`LINK == 外链`
* 优化--pinia中的`auth.role` 改为 `auth.roles`

**404页面**
* 新增--返回登录页面按钮

**字符验证码组件**
* 优化-去除易混淆的数字和字母

**图标选择器组件**
* 优化-无图标数据的默认值

**表格组件**
表格组建新增/修改内容较多，请查看项目中的演示
* 新增-列配置`selectable`属性
* 新增-底部视图,`showbottomView`是否显示底部试图
* 新增-底部视图按钮组-列配置按钮，`showColumnBtn`是否显示刷新按钮
* 新增-底部视图按钮组-表格刷新按钮，`showRefreshBtn`是否显示列设置按钮
* 新增-自定义底部视图`toolButtons`
* 新增-表格加载状态`loading`

**树形组件(注意！！！不兼容老版本)**
* 删除-`label`属性，用法改变，使用下方`treeProps`属性
* 新增-`treeProps`属性，原`label`属性添加到该属性内，同`el-tree`的`props`属性一致,可参考官方文档拓展多属性。
* 优化-单选模式的`emit`方法改为`selectClick`
* 优化-导出`checkStrictly`和`loading`属性


[更新日志](https://doc.fcadmin.fun/version)

## 介绍（Introduce）
FC-Admin 基于VUE3+Vite+ElementPlus+Pinia实现的一款后台管理框架。使用最新的前端技术栈。
提供一些常用组件、动态路由、权限控制等。加快开发速度。

FC-Admin is a backend management framework built with VUE3, Vite, ElementPlus, and Pinia, leveraging the latest front-end technology stack.
It offers a range of commonly used components, dynamic routing, and permission control, among others, to expedite the development process.

![logo](https://mock.fcadmin.fun/web/img/fc-1.png)

## 演示和文档（Preview and Document）

| 类型 | 链接 |
| -------- | -------- |
| 演示地址 （Preview） | https://www.fcadmin.fun |
| 中文文档 | https://doc.fcadmin.fun |
| English document | https://doc.fcadmin.fun/en |

## 服务器版本

有小伙伴想要能实际运行与服务器的权限管理版本，基于此提议我们提供了与服务器交互版本，后端使用Go语言开发，如果想开源其它后端语言项目，可联系作者。

Some users want a version that can actually run and manage permissions on the server. Based on this suggestion, we have provided a version that interacts with the server. The backend is developed in Go language. If you want to open-source other backend language projects, you can contact the author.

前端项目代码(Web Code)：[FC-Admin-Server](https://github.com/lfcleo/fc-admin-server)

后端项目代码(Server Code)：FC-Admin-Server-Go (暂未开源)

## 精简版本

如果有自己的一套后端框架，只想使用fc-admin框架，我们提供了精简版 [FC-Admin-Thin](https://github.com/lfcleo/fc-admin-thin)，可以直接做开发使用，与您的后端服务进行交互。

Provides a simplified version of [FC-Admin-Thin](https://github.com/lfcleo/fc-admin-thin) It can be directly used for development

| 类型 | 链接 |
| -------- | -------- |
| GitHub | https://github.com/lfcleo/fc-admin-thin |
| Gitee | https://gitee.com/lfcleo/fc-admin-thin |

## 部分截图（Partial Screenshot）

![logo](https://mock.fcadmin.fun/web/img/fc-2.png)

## 安装教程（Install）

``` sh
# 克隆项目
git clone https://github.com/lfcleo/fc-admin.git

# 进入项目目录
cd fc-admin

# 安装依赖
npm i

# 启动项目(开发模式)
npm run dev
```
启动完成后浏览器访问 http://localhost:2800