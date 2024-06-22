/// <reference types="vite/client" />
declare module '*.vue' {
    import { ComponentOptions } from '@/vue'
    const componentOptions: ComponentOptions
    export default componentOptions
}

declare module '@wangeditor/editor-for-vue';