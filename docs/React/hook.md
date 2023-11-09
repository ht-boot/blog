---
title: React Hooks
outline: deep
author: ht
date: 2023-4
tags: ["JavaScript", "React"]
---

## 常用 Hook 集合

### 什么是 Hook

> Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

### Hook 的优势

> Hook 使你在无需改变组件结构的情况下复用状态逻辑（自定义 Hook）
> Hook 将组件中互相关联的部分拆分成更小的函数（比如设置订阅或请求数据）
> Hook 使你在非 class 的情况下可以使用更多的 React 特性

### Hook 使用规则

#### useState

`useState` 用在函数组件中给组件添加一些内部状态 state，
`useState` 唯一的参数就是初始 state，会返回当前状态和一个状态更新函数。

```js
const [state, setState] = useState(initialState);
```

代码示例：

```js
import React, { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count - 1)}>-</button>
      <input
        type="text"
        value={count}
        onChange={(e) => setCount(e.target.value)}
      />
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

##### 函数式更新

如果新的 state 需要通过使用先前的 state 计算得出，可以往 setState 传递函数，该函数将接收先前的 state，并返回一个更新后的值。

```js
import React, { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  const lazyAdd = () => {
    setTimeout(() => {
      // 每次执行都会最新的state，而不是使用事件触发时的state
      setCount((count) => count + 1);
    }, 3000);
  };

  return (
    <div>
      <p>the count now is {count}</p>
      <button onClick={() => setCount(count + 1)}>add</button>
      <button onClick={lazyAdd}>lazyAdd</button>
    </div>
  );
}
```

##### 惰性初始 state

如果初始 state 需要通过复杂计算获得，则可以传入到一个函数，在函数中计算并返回初始的 state，此函数只会在初始渲染时被调用

```jsx
import React, { useState } from "react";

export default function Counter(props) {
  // 函数只在初始渲染时执行一次，组件重新渲染时该函数不会重新执行
  const initCounter = () => {
    console.log("initCounter");
    return { number: props.number };
  };
  const [counter, setCounter] = useState(initCounter);

  return (
    <div>
      <button onClick={() => setCounter({ number: counter.number - 1 })}>
        -
      </button>
      <input
        type="text"
        value={counter.number}
        onChange={(e) => setCounter({ number: e.target.value })}
      />
      <button onClick={() => setCounter({ number: counter.number + 1 })}>
        +
      </button>
    </div>
  );
}
```

#### useEffect

在函数组件主体内（React 渲染阶段）改变 DOM、添加订阅、设置定时器、记录日志以及执行其他包含副作用的操作都是不被允许的，因为这可能会产生莫名其妙的 bug 并破坏 UI 的一致性。

`useEffect Hook` 的使用则是用于完成此类副作用操作。`useEffect` 接收一个包含命令式、且可能有副作用代码的函数。

`useEffect` 函数会在浏览器完成布局和绘制之后，下一次重新渲染之前执行，保证不会阻塞浏览器对屏幕的更新。

```jsx
useEffect(didUpdate);
```

```jsx
import React, { useState, useEffect } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  // useEffect 内的回调函数会在初次渲染后和更新完成后执行
  // 相当于 componentDidMount 和 componentDidUpdate
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, []);

  return (
    <div>
      <p>count now is {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

##### 清除 effect

通常情况下，组件卸载时需要清除 effect 创建的副作用操作，useEffect Hook 函数可以返回一个清除函数，清除函数会在组件卸载前执行。组件在多次渲染中都会在执行下一个 effect 之前，执行该函数进行清除上一个 effect。

```jsx
import React, { useState, useEffect } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("start an interval timer");
    const timer = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
    // 返回一个清除函数清除副作用，在组件卸载前和下一个effect执行前执行
    return () => {
      console.log("destroy effect");
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <p>count now is {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

##### 优化 effect 执行

默认情况下，effect 会在每一次组件渲染完成后执行。 `useEffect` 可以接收第二个参数, 它是 effect 所依赖的数组, 这样就只有当数组值发生变化才会重新创建订阅。

传递一个空数组作为第二个参数可以使 effect 只会在初始渲染完成后执行一次

```jsx
import React, { useState, useEffect } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(count, "组件渲染了， 无依赖项");
  }); // 首次渲染时执行， 且有数据变化时也会执行

  useEffect(() => {
    console.log(count, "组件渲染了， 依赖项为空数组");
  }, []); // 只在首次渲染时执行

  useEffect(() => {
    console.log(count, "组件渲染了， 有具体依赖项");
  }, [count]); // 首次渲染时执行， 且在 count 更改时也执行

  return (
    <div>
      <p>count now is {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

#### useContext

Context 提供了一个无需为每层组件手动添加 props ，就能在组件树间进行数据传递的方法，`useContext` 用于函数组件中订阅上层 context 的变更，可以获取上层 context 传递的 value prop 值。

`useContext` 接收一个 context 对象（React.createContext 的返回值）并返回 context 的当前值，当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定的。

```jsx
// 父组件 parent.jsx
import React, { useContext, useState } from "react";
import Child from "./child";

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};

// 为当前 theme 创建一个 context
export const ThemeContext = React.createContext();

export default function Parent(props) {
  const [theme, setTheme] = useState(themes.dark);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === themes.dark ? themes.light : themes.dark
    );
  };

  return (
    // 使用 Provider 将当前 props.value 传递给内部组件
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Child />
    </ThemeContext.Provider>
  );
}
```

```jsx
// 子组件 child.jsx
import { useContext } from "react";
import { ThemeContext } from "./parent";
function Child() {
  // 通过 useContext 获取当前 context 值
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      style={{ background: theme.background, color: theme.foreground }}
      onClick={toggleTheme}
    >
      Change the button's theme
    </button>
  );
}
```

#### useReducer

`useReducer` 作为 `useState` 的代替方案，在某些场景下使用更加适合，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等。

```jsx
import React, { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
}
```

#### useRef

useRef 用于返回一个可变的 ref 对象, 其 .current 属性被初始化为传入的参数（initialValue）。

useRef 创建的 ref 对象就是一个普通的 JavaScript 对象，而 useRef() 和自建一个 {current: ...} 对象的唯一区别是，useRef 会在每次渲染时返回同一个 ref 对象。

##### 绑定 DOM 元素

使用 useRef 创建的 ref 对象可以作为访问 DOM 的方式，将 ref 对象以 <div ref={myRef} /> 形式传入组件，React 会在组件创建完成后会将 ref 对象的 .current 属性设置为相应的 DOM 节点。

```jsx
import React, { useRef } from "react";

export default function FocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    inputEl.current.focus();
  };

  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

#### 性能优化（useCallback & useMemo）

`useCallback` 和 `useMemo` 结合 `React.Memo` 方法的使用是常见的性能优化方式，可以避免由于父组件状态变更导致不必要的子组件进行重新渲染。

##### useCallback

useCallback 用于创建返回一个回调函数, 该回调函数只会在某个依赖项发生改变时才会更新, 在 props 属性相同情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。

```jsx
import React, { useState, useCallback } from "react";

function SubmitButton(props) {
  const { onButtonClick, children } = props;
  console.log(`${children} updated`);

  return <button onClick={onButtonClick}>{children}</button>;
}
// 使用 React.memo 检查 props 变更，复用最近一次渲染结果
SubmitButton = React.memo(submitButton);

export default function CallbackForm() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const handleAdd1 = () => {
    setCount1(count1 + 1);
  };

  // 调用 useCallback 返回一个 memoized 回调，该回调在依赖项更新时才会更新
  const handleAdd2 = useCallback(() => {
    setCount2(count2 + 1);
  }, [count2]);

  return (
    <>
      <div>
        <p>count1: {count1}</p>
        <SubmitButton onButtonClick={handleAdd1}>button1</SubmitButton>
      </div>
      <div>
        <p>count2: {count2}</p>
        <SubmitButton onButtonClick={handleAdd2}>button2</SubmitButton>
      </div>
    </>
  );
}
```

##### useMemo

把“创建”函数和依赖项数组作为参数传入 `useMemo`，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

使用注意：

- 传入 useMemo 的函数会在渲染期间执行，不要在这个函数内部执行与渲染无关的操作
- 如果没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值

```jsx
import React, { useState, useMemo } from "react";

function counterText({ countInfo }) {
  console.log(`${countInfo.name} updated`);

  return (
    <p>
      {countInfo.name}: {countInfo.number}
    </p>
  );
}
// // 使用 React.memo 检查 props 变更，复用最近一次渲染结果
const CounterText = React.memo(counterText);

export default function Counter() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const countInfo1 = {
    name: "count1",
    number: count1,
  };
  // 使用 useMemo 缓存最近一次计算结果，会在依赖项改变时才重新计算
  const countInfo2 = useMemo(
    () => ({
      name: "count2",
      number: count2,
    }),
    [count2]
  );

  return (
    <>
      <div>
        <CounterText countInfo={countInfo1} />
        <button onClick={() => setCount1(count1 + 1)}>Add count1</button>
      </div>
      <div>
        <CounterText countInfo={countInfo2} />
        <button onClick={() => setCount2(count2 + 1)}>Add count2</button>
      </div>
    </>
  );
}
```

##### 区别

- `useCallback` 优化针对于组件渲染相关
- `useMemo` 优化针对于函数的高开销计算
