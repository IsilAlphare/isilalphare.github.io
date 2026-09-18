---
title: "混合应用开发 (Hybrid App)"
date: 2025-10-15
category: "技术札记"
tags:
  - "Hybrid开发"
  - "FE"
sourceDoc: "https://bytedance.larkoffice.com/docx/HLrAdFAZHoIo9MxmlYScpwU8ndb"
slug: hybrid-app
---
# 混合应用开发 (Hybrid App)

**来源：**Notion　**原发布时间：**发布日期: 2025-10-15; 创建时间: 2025-10-15 10:50:45.717Z; 最后编辑时间: 2025-10-15 11:05:55.691Z　**标签：**Hybrid开发、FE

**原文：**[https://almond-oxygen-ceb.notion.site/Hybrid-App-28d8b1cc19aa80dfb4dfc93cafb410a3?pvs=25](https://almond-oxygen-ceb.notion.site/Hybrid-App-28d8b1cc19aa80dfb4dfc93cafb410a3?pvs=25)

---

![image.png](/article-media/hybrid-app/image-1.png)

\*\*混合开发（Hybrid）\*\*是一种开发模式，指使用多种开发模型开发App，通常会涉及到两大类技术：

原生 **Native**、**Web H5**

- 原生技术主要指iOS、Android，原生开发效率较低，开发完成需要重新打包整个App，发布依赖用户的更新，性能较高功能覆盖率更高
- WebH5可以更好的实现发布更新，跨平台也更加优秀，但性能较低，特性也受限

混合开发的意义就在于吸取两者的优点，而且随着手机硬件的升级迭代、系统（Android5.0+、ISO 9.0+）对于Web特性的较好支持，H5的劣势被逐渐缩小

这个分类下主要包含：

- **Webview 核心技术**:
- Webview的原理、生命周期。
- H5页面在Webview中的加载、渲染流程。
- Webview的性能瓶颈与优化策略（比如资源离线化、白屏问题处理）。
- **原生与H5通信协议 (Native/H5 CommunicationProtocols)**:
- **JS Bridge (核心)**:原理、设计、实现（JS端与原生端的双向调用）。
- **URL Scheme 拦截**:原理、应用场景、局限性。
- **客户端工程化**:
- 如何在Webview环境中进行调试（例如使用ChromeDevTools调试安卓Webview）。
- H5资源在客户端内的打包、更新与缓存机制。
