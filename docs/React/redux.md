---
title: Redux
outline: deep
author: ht
date: 2023-1
tags: ["redux", "react"]
---

## Redux

```
Redux 是一个使用叫做 “action” 的事件来管理和更新应用状态的模式和工具库 它以集中式
Store（centralized store）的方式对整个应用中使用的状态进行集中管理，其规则确保状
态只能以可预测的方式更新。
```

> 参考 [Redux](https://cn.redux.js.org/tutorials/essentials/part-1-overview-concepts#redux-%E6%98%AF%E4%BB%80%E4%B9%88)

## 快速开始

安装 `Redux Toolkit` 和 `React-Redux`

```bash
npm install @reduxjs/toolkit react-redux
```

### 创建 Redux Store

创建 `src/store/index.ts` 文件。从 `Redux Toolkit` 引入 `configureStore API`。我们从创建一个空的 Redux store 开始，并且导出它:

```ts
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {},
});

export default store;
```

### 为 React 提供 Redux Store

创建 store 后，便可以在 React 组件中使用它。 在 src/main.tsx 中引入我们刚刚创建的 store , 通过 React-Redux 的 `<Provider>`将 `<App>` 包裹起来,并将 store 作为 prop 传入。

```tsx
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { store } from "@/store/index";
import { Provider } from "react-redux";
import "./index.less";

const rootElement = document.getElementById("root")!;

const app = ReactDOM.createRoot(rootElement);

app.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

### 创建 Redux State Slice

创建 `src/store/storeSlice/counterSlice.ts` 文件。在该文件中从 `Redux Toolkit` 引入 `createSlice API`。

```ts
import { createSlice } from "@reduxjs/toolkit";

interface TCounterState {
  value: number;
}

const initialState: TCounterState = {
  value: 10,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit 允许我们在 reducers 写 "可变" 逻辑。它
      // 并不是真正的改变状态值，因为它使用了 Immer 库
      // 可以检测到“草稿状态“ 的变化并且基于这些变化生产全新的
      // 不可变的状态
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { increment, decrement } = counterSlice.actions;

// 超出 reducer
export default counterSlice.reducer;
```

### 将 Slice Reducers 添加到 Store 中

下一步，我们需要从计数切片中引入 reducer 函数，并将它添加到我们的 store 中。通过在 reducer 参数中定义一个字段，我们告诉 store 使用这个 slice reducer 函数来处理对该状态的所有更新。

```ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./storeSlice/counterSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// 从 store 本身推断出 `RootState` 类型
export type RootState = ReturnType<typeof store.getState>;

export default store;
```

### 在 React 组件中使用 Redux 状态和操作

我们可以使用 `useSelector` 从 store 中读取数据，使用 `useDispatch` dispatch actions。

```tsx
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "@/store/storeSlice/counterSlice";
import { RootState } from "@/store";

const Home = () => {
  const count = useSelector((state: RootState) => state.counter.value);

  const dispatch = useDispatch();

  return (
    <div>
      <p>count: {count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
};
```

现在，每当你点击”递增“和“递减”按钮。

## 总结

1. 使用 `configureStore` 创建 Redux store。
   - `configureStore` 接受 `reducer` 函数作为命名参数。
   - 导出 store 对象。
2. 为 React 应用程序组件提供 Redux store。。
   - 使用 `React-Redux <Provider>` 组件包裹你的 `<App />`。
   - 传递 Redux store 如 `<Provider store={store}>`。
3. 使用 `createSlice` 创建 Redux "slice" reducer。
   - 使用字符串名称、初始状态和命名的 reducer 函数调用“createSlice”。
   - Reducer 函数可以使用 Immer 来“改变”状态。
   - 导出生成的 slice reducer 和 action creators。
4. 在 React 组件中使用 React-Redux useSelector/useDispatch 钩子。
   - 使用 `useSelector` 钩子从 store 中读取数据。
   - 使用 `useDispatch` 钩子获取 `dispatch` 函数，并根据需要 dispatch actions。

## redux 如何传参与接收参数？

直接向 reducer 函数传递参数，reducer 函数内部使用 `state` 参数保存状态，使用 `action` 参数保存 action 对象。
示例如下：

```tsx
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "@/store/storeSlice/counterSlice";
import { RootState } from "@/store";

const Home = () => {
  const count = useSelector((state: RootState) => state.counter.value);

  const dispatch = useDispatch();

  return (
    <div>
      <p>count: {count}</p>
      <button
        onClick={() => dispatch(increment({ id: "1001", value: "I-0012/G" }))}
      >
        +
      </button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
};
```

获取参数 , `reducer` 函数接收两个参数， `state` 和 `action，` `action` 存在`type`, `payload` 两个属性，传递过来的参数都在 `payload` 里面。

```tsx
import { createSlice } from "@reduxjs/toolkit";

interface TCounterState {
  value: number;
}

const initialState: TCounterState = {
  value: 10,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      // Redux Toolkit 允许我们在 reducers 写 "可变" 逻辑。它
      // 并不是真正的改变状态值，因为它使用了 Immer 库
      // 可以检测到“草稿状态“ 的变化并且基于这些变化生产全新的
      // 不可变的状态
      state.value += 1;
      // action 里面有参数 type, payload 两个属性，传递过来的参数都在 payload 里面。
      console.log(action.payload); // { id: "1001", value: "I-0012/G" }
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { increment, decrement } = counterSlice.actions;

// 超出 reducer
export default counterSlice.reducer;
```

## 如何实现异步请求？

> 使用 `createAsyncThunk` 搭配 `createSlice` 中的 `extraReducers` 选项，实现异步请求处理。
> 示例如下：

```ts
// /store/storeSlice/counterSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface TCounterState {
  value: number;
  userList: [];
}

const initialState: TCounterState = {
  value: 10,
  userList: [],
};

// 模拟请求
const getUserList = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          user_id: 1,
          name: "张三",
          age: 25,
          gender: "男",
          occupation: "学生",
          income: 5000,
        },
        {
          user_id: 2,
          name: "李四",
          age: 30,
          gender: "男",
          occupation: "工程师",
          income: 10000,
        },
      ]);
    }, 3000);
  });
};

// 异步执行
// thunk函数允许执行异步逻辑, 通常用于发出异步请求。
// createAsyncThunk 创建一个异步action，方法触发的时候会有三种状态：
// pending（进行中）、fulfilled（成功）、rejected（失败）
export const getUserListThunk = createAsyncThunk(
  "counter/getUserList",
  async () => {
    const res = await getUserList();
    return res;
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.value += 1;
      console.log(action);
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getUserListThunk.fulfilled, (state, action) => {
        state.userList = action.payload;
      })
      .addCase(getUserListThunk.rejected, (state, err) => {
        console.log(err);
      });
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
```

> 组件中使用

```tsx
import { useSelector, useDispatch } from "react-redux";
import { getUserListThunk } from "@/store/storeSlice/counterSlice";
import { RootState } from "@/store";

const Home = () => {
  // 获取异步请求的返回数据
  const userList = useSelector((state: RootState) => state.counter.userList);

  const dispatch = useDispatch();

  return (
    <div className="home_page">
      {/* 异步执行 */}
      <button onClick={() => dispatch(getUserListThunk())}>异步执行</button>
      {/* 返回结果展示 */}
      <p>userList: {JSON.stringify(userList)}</p>
    </div>
  );
};

export default Home;
```

## 如何实现数据持久化？

这里我们使用的 `redux-persist` 插件，具体实现如下：

```bash
# 安装插件
npm i redux-persist
```

在文件 `src/store/index.ts` 中，引入插件

```ts
import { configureStore } from "@reduxjs/toolkit";
// 仓库碎片（模块）
import counterReducer from "./storeSlice/counterSlice";
// 合并碎片（模块）
import { combineReducers } from "redux";

// 数据持久化
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage";

/**
 * @description 缓存数据配置
 * @param key  标识存储在本地存储中的数据
 * @param storage 持久化存储引擎，默认是localStorage
 * @param blacklist  黑名单，不持久化指定reducer的状态
 * @param whitelist // 白名单，只持久化指定reducer的状态
 * @param transforms: [myTransform], // 转换器，可以自定义转换函数来改变持久化存储的数据格式
 */
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["modalInfo"], // 写在这块的数据不会存在storage
  // whitelist: ["counterReducer"],
  // transforms: [],
};

// 仓库碎片合并
const reducers = combineReducers({
  counterReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      //关闭序列化状态检测中间件
      serializableCheck: false,
    }),
});

// 数据持久化存储
export const persist = persistStore(store);

// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
```

### 组件中使用

导入数据持久化存储对象 `persist`, 与组件 `PersistGate`, 并将 `persist` 作为 `prop` 传入 `persistor`。

```tsx
// src/main.tsx

import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { store, persist } from "@/store/index";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./index.less";

const rootElement = document.getElementById("root")!;

const app = ReactDOM.createRoot(rootElement);

app.render(
  <BrowserRouter>
    {/* 仓库 */}
    <Provider store={store}>
      {/* 持久化 */}
      <PersistGate persistor={persist}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
```
