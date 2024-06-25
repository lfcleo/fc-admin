import { defineStore } from "pinia";
import { SelfStorage } from '../securels'

interface SysGlobalModel {
    sysIsMobile: boolean,
    sysLayout: string,
    sysLang: string,
    sysColor: string,
    sysDark: boolean,
    sysMenuIsCollapse: boolean,
    sysmenuUniqueOpened: boolean,
    sysLayoutTags: boolean,
    sysAutoExit: number,
    [key: string]: any
}

export const useSysGlobalStore = defineStore('sysGlobal', {
    state(): SysGlobalModel {
        return {
            //移动端布局
            sysIsMobile: false,
            //布局 默认：default | 通栏：header | 经典：menu | 功能坞：dock（将关闭标签和面包屑栏）
            sysLayout: 'default',
            //语言，默认中文zh-cn,英文en
            sysLang: 'zh-cn',
            //主题颜色
            sysColor: '#409EFF',
            //暗黑模式
            sysDark: false,
            //菜单是否折叠 toggle
            sysMenuIsCollapse: false,
            //菜单是否只保持一个子菜单的展开
            sysmenuUniqueOpened: false,
            //多标签栏
            sysLayoutTags: true,
            //自动登出时间
            sysAutoExit: 0,
        }
    },
    actions: {
        setValueByKey<T extends keyof SysGlobalModel>(key: T, value: SysGlobalModel[T]) {
            Object.assign(this.$state, {
                [key]: value
            })
        }
    },
    persist: {
        key: 'SYS_GLOBAL',
        storage: SelfStorage,
        paths: [
            'sysLayout', 'sysLang', 'sysColor', 'sysDark', 'sysMenuIsCollapse', 'sysmenuUniqueOpened', 'sysLayoutTags', 'sysAutoExit'
        ],
    }
})