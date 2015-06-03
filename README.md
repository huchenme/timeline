# 个人简历

## 项目介绍

[每个人都应该有一份「人生简历」](http://zhuanlan.zhihu.com/12in12/20015683)

## 教程

- [第一周：LeanCloud Web hosting & Webpack & PostCSS & SUIT CSS](https://github.com/huchenme/timeline/blob/master/tutorials/week-1.md)， [源码](https://github.com/huchenme/timeline/tree/week1)
- 第二周：React.js & Flux
- 第三周：连接 LeanCloud 后端
- 第四周：部署

## 本地运行

1. 安装 node.js
2. `npm install -g webpack avoscloud-code`
3. 注册 LeanCloud 并新建应用
4. `cp leancloud/config/global.json.sample leancloud/config/global.json` 并替换 key
5. `npm intall` 安装 dependencies
6. `npm run watch` 自动编译
7. `npm run start` 开始本地服务器
8. 打开浏览器 `http://localhost:4567` 测试
9. 部署请参考 [第一周：LeanCloud Web hosting & Webpack & PostCSS & SUIT CSS](https://github.com/huchenme/timeline/blob/master/tutorials/week-1.md)

本 Repo 是结合 LeanCloud 的 Web Hosting，不过不需要的话，可以考虑参考另一个自带 live reload 的 Repo https://github.com/huchenme/react-hot-postcss-boilerplate

## 任务表

- [x] @mentions, #refs, [links](), **formatting**, and <del>tags</del> supported
- [x] list syntax required (any unordered or ordered list supported)
- [x] this is a complete item
- [ ] this is an incomplete item

## Bug

请开新的 issue，或者提交 pull request
