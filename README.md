# 阜宁县实验初级中学九年级25班官网

这是一个纯 HTML、CSS、JavaScript 制作的一页式班级网站，不需要安装依赖，也不需要后端服务。

## 如何打开

直接双击 `index.html`，浏览器即可打开网站。

如果希望使用本地服务器预览，也可以在本文件夹中运行任意静态服务器，但这不是必需的。

## 文件结构

```text
class-25-website/
├── index.html                 页面结构与全部文案
├── style.css                 视觉样式与三端适配
├── script.js                导航、动画与奋斗天数计算
├── README.md                使用和修改说明
└── assets/
    └── images/
        ├── hero-bg.svg       原创校园插画背景
        └── README.txt        待添加照片的文件名清单
```

教师照片和表白墙照片已经加入，图片均集中保存在 `assets/images/` 中，后续仍可直接替换。

## 替换首页背景图

默认背景为 `assets/images/hero-bg.svg`。

若需要换成 JPG 图片：

1. 将图片放入 `assets/images/`，例如命名为 `hero-bg.jpg`。
2. 打开 `style.css`。
3. 搜索下面这行：

```css
background-image: url("assets/images/hero-bg.svg");
```

4. 将文件名改为 `hero-bg.jpg`。

建议图片比例为 16:9，推荐尺寸 1920 × 1080；图片左侧或中间偏左最好留有文字空间。

## 添加教师照片

当前为前两位老师预留了照片位。建议准备：

- `assets/images/teacher-zhang-dongxiang.png`
- `assets/images/teacher-zhang-xiuming.png`

打开 `index.html`，搜索 `teacher-photo-slot`。以张冬祥老师为例，将照片位中的三行占位元素：

```html
<span class="photo-corner" aria-hidden="true"></span>
<span class="empty-photo-mark">PHOTO</span>
<small>照片待添加</small>
```

替换为：

```html
<img src="assets/images/teacher-zhang-dongxiang.png" alt="张冬祥老师">
```

并给外层 `div` 增加 `has-image` 类：

```html
<div class="teacher-photo-slot has-image">
```

张秀明老师的操作相同，只需使用对应文件名和姓名。

## 添加青春表白墙照片

建议准备：

- `assets/images/wall-photo-1.jpg`
- `assets/images/wall-photo-2.jpg`

打开 `index.html`，分别搜索 `wall-photo-1.jpg` 和 `wall-photo-2.jpg`。每个照片位上方都有替换注释。

第一张照片示例：把 `wall-photo-slot` 中的占位内容替换为：

```html
<img src="assets/images/wall-photo-1.jpg" alt="班级青春瞬间一">
```

照片建议使用 4:3 横图；竖图也能显示，但会按照照片位比例居中裁切。

## 修改老师信息

打开 `index.html`，搜索老师姓名。每位老师都在独立的 `<article class="teacher-card">` 中，姓名、称号、学科与介绍可以直接修改。

## 修改班级荣誉

打开 `index.html`，搜索 `honor-card` 或对应荣誉标题。三张荣誉卡片均集中写在“班级荣誉”区域，可以直接修改标题和正文。

## 修改班级人数和奋斗起始日

- 班级人数：在 `index.html` 中搜索 `data-counter="52"`，同时修改该数值与页面中的无障碍说明。
- 奋斗起始日：在 `script.js` 中搜索 `Date.UTC(2024, 8, 1)`。JavaScript 的月份从 0 开始，因此数字 `8` 代表 9 月。

## 浏览器兼容性

推荐使用最新版 Chrome、Edge、Firefox 或 Safari。网站支持电脑、平板和手机，并会自动尊重系统的“减少动态效果”设置。

网站部署于 GitHub Pages。
