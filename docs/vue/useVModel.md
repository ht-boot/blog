---
title: computed 劫持 v-model
outline: deep
author: ht
date: 2023-5
tags: ["Vue", "JavaScript"]
---

## 背景

在开发中，我们经常会遇到子组件对父组件内容进行修改，但又因为单向数据流，使得写法过于麻烦。今天就记录一个快捷优雅的方式。 因为我们使用的功能是多次切重复的，所有我们封装一个 hooks。

#### 实现 hooks

```ts
import { computed } from "vue";

const cacheMap = new WeakMap();

export const useVModel = <T extends object, K extends keyof T>(
  props: T,
  propName: K,
  emit: any
) => {
  return computed({
    get() {
      if (cacheMap.has(props[propName] as object)) {
        return cacheMap.get(props[propName] as object);
      }
      const proxy = new Proxy(props[propName] as object, {
        get(target, key) {
          return Reflect.get(target, key);
        },
        set(target, key, value) {
          emit(`update:${propName as string}`, { ...target, [key]: value });
          return true;
        },
      });
      cacheMap.set(props[propName] as object, proxy);
      return proxy;
    },
    set(newValue) {
      emit(`update:${propName as string}`, newValue);
    },
  });
};
```

#### 使用

```vue
<!-- ------------------------父组件------------------------ -->
<template>
  <component_form v-model:userInfo="formData" />
</template>
<script setup lang="ts">
import { ref } from "vue";
import component_form from "./components/component_form.vue";

const formData = ref({
  name: "ming",
  sex: "男",
  age: 18,
  phone: "13888888888",
  email: "123@qq.com",
});
</script>
<!-- -----------------------------子组件---------------------------- -->
<template>
  <div>
    <el-form :model="formData_userInfo" label-width="120px">
      <el-form-item label="Activity name">
        <el-input v-model="formData_userInfo.name" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup name="component_form">
import { useVModel } from "../hooks/useVModel";
interface IUserInfo {
  name: string;
  sex: string;
  age: number;
  phone: string;
  email: string;
}

import { PropType } from "vue";
const props = defineProps({
  // 表单数据
  userInfo: {
    type: Object as PropType<IUserInfo>,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:userInfo"]);

const formData_userInfo = useVModel(props, "userInfo", emit);
</script>
```
