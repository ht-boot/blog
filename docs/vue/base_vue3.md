---
title: Vue3 ref 创建响应式数据
outline: deep
author: ht
date: 2021-5
tags: ["Vue", "JavaScript"]
---

### 🟩 Vue Ref、reactive、toRefs、toRef 创建响应式数据

>

#### Ref

一般用于定义基本类型响应式(也可引用数据类型), 返回 Ref 对象

```js
import { ref } from 'vue';
setup(){
  const a = ref(0);
  function add(){
    a.value ++;   // js 中操作数据: xxx.value，模板中则不需要
  }
  return{
    a,
    add
  }
}
```

#### reactive

用于创建引用类型响应式

```js
import { reactive, toRefs } from 'vue';
setup(){
  const obj = ref({name: "jk", age: 17});
  return {
    ...toRefs(obj)
  }
}
```

#### toRefs

将 reactive 对象转成 ref 对象，可用于解构

```js
import { reactive, toRefs } from 'vue';
setup(){
  const obj = ref({name: "jk", age: 17});
  return {
    ...toRefs(obj)
  }
}
```

#### toRef

将响应式对象的某个属性单独提供给外部使用

```js
import { ref, toRef } from 'vue';
setup(){
  const obj = ref({name: "jk", age: 17});
  const name = toRef(obj, 'name')
  return {
    name
  }
}
```

#### vue3 响应式原理

```js
const person = {
  name: "xxx",
  age: 13,
};

/**
 * @param target 目标对象 person
 * @param key 对象key值
 * @param value 修改对象属性的值
 */
const p = new Proxy(person, {
  // 读取某个属性时调用
  get(target, key) {
    console.log(`有人读取了person身上的${key}属性`);
    //return target[p]
    return Reflect.get(target, key);
  },
  // 修改某个属性时调用
  set(target, key, value) {
    console.log(`有人修改了person身上的${key}，我要去更新界面了`);
    //target[p] = value
    Reflect.set(target, key, value);
  },
  // 删除个属性时调用
  deleteProperty(target, key) {
    console.log(`有人删除了person身上的${key}，我要去更新界面了`);
    //delete target[p]
    return Reflect.deleteProperty(target, key);
  },
});
```
