<!-- <script setup>
import { useData } from 'vitepress';
const { frontmatter } = useData();
</script> -->

<template>
    <div class="home-wrapper">
        <div v-for="item in 10" :key="item" class="home-item">{{ item }}</div>
    </div>
</template>
<style>
.home-wrapper {
    text-align: center;
}

.home-item {
    vertical-align: middle;
    margin: 4px 4px 10px;
    padding: 4px 8px;
    font-weight: bolder;
    display: inline-block;
    cursor: pointer;
    border-radius: 2px;
    line-height: 13px;
    font-size: 13px;
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.5s;
}
</style>