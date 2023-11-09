<script setup>
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";
import dayjs from "dayjs";

const { Layout } = DefaultTheme;

/*这里的frontmatter就是各个md文件中自己写在最上面的东西*/
const { frontmatter } = useData();
</script>

<template>
  <Layout>
    <template #doc-before>
      <h1 class="doc-tip">{{ frontmatter.tip ?? "" }}</h1>
      <div class="doc-top-layout">
        <p class="page-info">
          <span class="page-info-item"> 👨‍💻 </span>
          {{ frontmatter.author ?? "ht" }}
        </p>
        <p class="page-info">
          <span class="page-info-item"> 🕐 </span>
          <span>
            {{
              frontmatter.date ??
              dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
            }}
          </span>
        </p>
        <p class="page-info">
          <span class="page-info-item"> 🏷️ </span>
          <span
            class="page-info"
            v-for="item in frontmatter.tags"
            :key="item"
            >{{ item }}</span
          >
        </p>
      </div>
    </template>
  </Layout>
</template>

<style>
.doc-tip {
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 42px;
}

.doc-top-layout {
  display: flex;
}

.page-info {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #7f7f7f;
  margin-right: 10px;
}

.page-info .page-info-item {
  margin-right: 2px;
}
</style>
