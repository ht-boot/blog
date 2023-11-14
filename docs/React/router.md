---
title: React Router
outline: deep
author: ht
date: 2023-1
tags: ["router", "react"]
---

## 路由

> 在 React 项目中路由也是较为重要的部分，我们可以用它来管理 URL，实现页面组件切换

### 安装

我们可以去安装 `react-router-dom`，它专门在 react 项目中实现一个 SPA 应用.

```shell
npm i react-router-dom
```

### router 基本使用

React 的路由的实现有两种：一种是 browser history —— `<BrowserRouter>`，一种是 hash history ——`<HashRouter>`。

> 路由功能 React-Router V6 版本常用路由组件和 hooks，其他不常用的大家可以看下官网的介绍 [https://reactrouter.com/en/main](https://reactrouter.com/en/main)。
> |组件名 | 作用| 说明|
> |---|---|---|
> |Routers|路由容器|路由组件的容器，用于包裹其他路由组件, 替代原有的 Switch|
> |Router|路由组件|路由组件，用于配置路由规则|
> |Link|链接组件|用于定义 a 标签，实现路由跳转|
> |Outlet|自适应渲染组件|根据实际路由 url 自动选择组件

> | hooks 名        | 作用                                      | 说明             |
> | --------------- | ----------------------------------------- | ---------------- |
> | useParams       | 返回当前参数                              | 根据路径读取参数 |
> | useNavigate     | 返回当前路由                              |
> | useOutlet       | 返回根据路由生成的 element                |
> | useLocation     | 返回当前的 location 对象                  |
> | useRoutes       | 同 Routers 组件一样，只不过是在 js 中使用 |
> | useSearchParams | 用来匹配 URL 中?后面的搜索参数            |

#### 基础使用示例

从 react-router-dom 导入 `BrowserRouter` 组件，用来包裹 App 组件。

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

在 App 组件中，我们使用 `<Routes>` 组件来定义路由，使用 `<Link>` 组件来定义路由

```jsx
import { Link, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import My from "./pages/my";

function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/my">my</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/my" element={<My />}></Route>
        <Route path="/" element={<Navigate to="/home" />}></Route>
      </Routes>
    </div>
  );
}
export default App;
```

#### 路由嵌套

示例：

```jsx
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="home/:id" element={<Home />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}
```

如果需要内部组件修改，也可以采用`<Outlet/>`来直接实现，
`<Outlet/>` 用于子路由在父级路由页面的展示位置。

如下所示：

```js
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="home/:id" element={<Home />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}
function Layout() {
  return (
    <div>
      <h1>hello world</h1>
      <Outlet />
    </div>
  );
}
```
