---
title: "原生与h5的通信机制"
date: 2025-10-15
category: "技术札记"
tags:
  - "Hybrid开发"
  - "FE"
sourceDoc: "https://bytedance.larkoffice.com/docx/O7FNdEYtOopJPvxb5dOcrk1qnfe"
slug: native-h5-communication
---
# 原生与h5的通信机制

**来源：**Notion　**原发布时间：**发布日期: 2025-10-15; 创建时间: 2025-10-15 10:56:09.700Z; 最后编辑时间: 2025-10-16 02:22:15.469Z　**标签：**Hybrid开发、FE

**原文：**[https://almond-oxygen-ceb.notion.site/h5-28d8b1cc19aa8046b9c9d2288677c43e?pvs=25](https://almond-oxygen-ceb.notion.site/h5-28d8b1cc19aa8046b9c9d2288677c43e?pvs=25)

---

我们先来了解一下H5和原生应用之间通信的几种常见方法：

1. **URLScheme**：通过自定义URL协议触发原生功能
2. **URL参数传递**：通过URL查询字符串传递数据
3. **JSBridge**：通过JavaScript接口实现双向通信
4. **第三方Hybrid框架**：如Cordova、ReactNative等提供的通信机制

- **对内用“JSBridge”**，进行深度、复杂的双向沟通。
- **对外用“URLScheme”**，作为公开的入口，负责“唤端”（唤起客户端）。

![image.png](/article-media/native-h5-communication/image-1.png)

## JSBridge

### 概念和作用

**通信桥梁：** JSBridge 充当了 Web应用和原生应用之间的通信桥梁。通过 JSBridge，我们可以在 web和原生代码之间进行**双向通信**，使这两者能够**互相调用和传递数据**。

**原生功能调用：** 使用 JSBridge，我们可以在 JavaScript中调用原生应用中的功能。我们可以通过 **web来触发原生应用中的特定操作**，如打开相机、发送通知、调用硬件设备等。

在Hybrid模式下，**H5会需要使用Native**的功能，比如打开二维码扫描、调用原生页面、获取用户信息等，同时**Native也需要向Web端**发送推送、更新状态等。

而JavaScript是运行在单独的 **JS Context**中（Webview容器）与原生有**运行环境的隔离**，所以需要有一种机制实现Native端和Web端的**双向通信** ，这就是JSBridge：

**以JavaScript引擎或Webview容器作为媒介，通过协定协议进行通信**，实现Native端和Web端双向通信的一种机制。

通过JSBridge，Web端可以调用**Native端的Java接口**，同样Native端也可以通过JSBridge调用**Web端的JavaScript接口**，实现彼此的双向调用。

---

#### 核心工作原理

JSBridge的核心原理是**JavaScript接口注入。**

即**原生应用**将**接口**注入到**WebView的JavaScript环境中**，使得**H5页面能够直接调用**这些接口。

这一过程主要依赖于**各平台WebView提供的接口注入**能力：

- Android通过`addJavascriptInterface`方法注入
- iOS通过`JavaScriptCore`框架或`WKUserContentController`注入

---

#### Native -> Web

Android 和 ios各提供了接口方法，来将JS放进解释器中，然后通过**解释器**来执行这段JS代码。

Android 提供了 evaluateJavascript来执行JS代码，并且可以获取返回值执行回调。

IOS的 WKWebView 也使用 evaluateJavaScript。

#### Web -> Native

1. URL Scheme 拦截 (URL Scheme Interception)

工作原理 :

1. **注册 (Registration):**原生App会向操作系统注册一个自己独有的“协议名”，比如`myapp://`。这就像在网上注册一个域名一样，`http://`是大家熟知的协议，而 `myapp://`则是这个App的专属协议.
2. **触发 (Trigger):**H5页面想要调用原生功能时，并不会真的去调用一个函数，而是尝试发起一个特殊的网络请求，比如改变`iframe`的`src`或者直接`window.location.href`到一个用这个特殊协议构造的URL。例如：`myapp://camera/takePhoto?quality=80`
3. **拦截 (Interception):**运行H5的`WebView`（原生应用里的一个浏览器组件）并不会真的把这个URL当成网页来打开。原生开发者会重写`WebView`的某个方法（比如安卓的`shouldOverrideUrlLoading`），这个方法会“捕获”所有H5发出的URL请求.
4. **解析与执行 (Parse & Execute):**当原生代码捕获到这个请求后，它会检查URL的协议是不是约定好的`myapp://`。如果是，它就不会让WebView继续加载，而是自己解析这个URL，比如`/camera/takePhoto`就对应到相机的拍照功能，`?quality=80`就是参数。然后原生代码去执行相应的功能。

#### 优缺点:

- **优点:**兼容性好，实现简单直接，是一种非常成熟的方案.
- **缺点:**
- **单向通信:**主要是H5向原生发送指令，原生很难将执行结果方便地返回给H5。
- **有长度限制:**URL本身的长度是有限的，不适合传递复杂或大量的数据.
- **性能较差:**创建URL请求再到原生拦截解析，整个链路比直接函数调用要慢.

---

1. JS Bridge 注入JS对象 (JavaScript Injection / JS Bridge)
2. **注入 (Injection):**
3. 当原生App初始化`WebView`并加载H5页面时，原生代码会直接向`WebView`的JavaScript环境中“注入”一个**全局的JS对象**。比如，注入一个名为`myAppBridge`的对象到`window`下。
4. 原生app中，会创建一个“联络员”对象`myAppBridge`，里面定义了可以给h5调用的各种方法
5. 在创建`WebView`并加载h5页面之前，原生APP会调用一个系统函数如`myWebView.addJavascriptInterface(new WebAppInterface(), "myAppBridge");`将`myAppBridge`注入到即将创建的h5中
6. h5一创建好就有联络员`myAppBridge`了，可以用这个对象直接调用里面的各种方法了，其实就是调用原生APP的方法了。
7. **H5调用 (H5 Call):**H5页面加载后，就可以像调用任何其他本地JS对象一样，直接调用这个被注入的对象上的方法。例如：

```
window.myAppBridge.takePhoto(
    { quality: 80 },
    (result) => { /* 这是回调函数，处理返回结果 */ }
);
```

1. **原生处理 (Native Handling):**这个`myAppBridge`对象上的每个方法都与一段原生代码绑定。当H5调用`takePhoto`时，实际上是触发了与之绑定的原生代码去执行。
2. **双向通信与回调 (Bidirectional & Callback):**原生代码执行完任务（比如拍完照），可以再调用H5传递过来的回调函数，将结果（比如图片路径）作为参数传回去。这就轻松地实现了双向通信.

#### 优缺点:

- **优点:**
- **双向通信:**H5和原生可以方便地互相调用，传递数据。
- **性能更好:**接近于原生的函数调用，比URL拦截快。
- **功能强大:**支持传递复杂的JS对象和回调函数，没有数据长度限制。
- **缺点:**
- 注入时机不确定，H5在调用前需要检查Bridge对象是否已经注入成功.

---

#### 前者是不是后者的降级？

在不同的场景下，关系有所不同：

1. **在App内部:**对于需要H5和原生进行**频繁或复杂交互**的场景，**URLScheme可以被看作是JSBridge的一种降级或非常基础的实现方式**。实际上，有些早期的JSBridge实现，其底层就是通过URL Scheme来传递命令的. 但现代的JSBridge通常有更高效的实现。
2. **从App外部:**当H5页面运行在**外部浏览器**（比如Safari或Chrome）中时，此时**没有注入的JSBridge对象**。在这种情况下，**URLScheme就成了从外部网页唤起App的唯一手段**。例如，一个营销网页上的“在App中打开”按钮，点击后就会尝试跳转到一个`myapp://...`的链接，来尝试拉起已经安装在手机上的App.如果App没有安装，这个跳转通常会失败，开发者可以设置一个超时逻辑，然后跳转到应用商店.

**总结:**

| | | | | | | | | | | | | |

因此，说前者是后者的降级是有道理的，尤其是在App内部需要功能丰富的通信时。但从外部唤起App的场景看，URLScheme又扮演着不可或缺的角色。

## URL Scheme

外部浏览器与APP的交互。也可以作hybrid交互，比JS低级一点，因为是单向的。

一般来说客户端通信，端内首选JSBridge，如果判定为端外，就降级为urlscheme.

#### 工作原理 (How it Works):

1. **注册 (Registration):**原生App会向操作系统注册一个自己独有的“协议名”，比如`myapp://`。这就像在网上注册一个域名一样，`http://`是大家熟知的协议，而 `myapp://`则是这个App的专属协议.
2. **触发 (Trigger):**H5页面想要调用原生功能时，并不会真的去调用一个函数，而是尝试发起一个特殊的网络请求，比如改变`iframe`的`src`或者直接`window.location.href`到一个用这个特殊协议构造的URL。例如：`myapp://camera/takePhoto?quality=80`
3. **拦截 (Interception):**运行H5的`WebView`（原生应用里的一个浏览器组件）并不会真的把这个URL当成网页来打开。原生开发者会重写`WebView`的某个方法（比如安卓的`shouldOverrideUrlLoading`），这个方法会“捕获”所有H5发出的URL请求.
4. **解析与执行 (Parse & Execute):**当原生代码捕获到这个请求后，它会检查URL的协议是不是约定好的`myapp://`。如果是，它就不会让WebView继续加载，而是自己解析这个URL，比如`/camera/takePhoto`就对应到相机的拍照功能，`?quality=80`就是参数。然后原生代码去执行相应的功能。

#### 优缺点:

- **优点:**兼容性好，实现简单直接，是一种非常成熟的方案.
- **缺点:**
- **单向通信:**主要是H5向原生发送指令，原生很难将执行结果方便地返回给H5。
- **有长度限制:**URL本身的长度是有限的，不适合传递复杂或大量的数据.
- **性能较差:**创建URL请求再到原生拦截解析，整个链路比直接函数调用要慢.
