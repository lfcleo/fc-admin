import { defineStore } from 'pinia'
import { SelfStorage } from '../securels'

export const useMenuStore = defineStore('menu', {
    state: () => {
        return {
            permissions: [] as string[],                //权限
            list: [] as Menu.MenuOptions[],             //菜单列表
            breadcrumbList: [] as Menu.MenuOptions[],   //面包屑导航
        }
    },
    persist: {
        key: 'MENU',
        storage: SelfStorage,
    },
})
