import MyLayout from './Layout.vue';
import DefaultTheme from 'vitepress/theme';
import './styles/index.css';

export default {
    ...DefaultTheme,
    Layout: MyLayout,
}
