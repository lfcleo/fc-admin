import { defineStore } from "pinia";
import { SelfStorage } from '../securels'

export const useSysViewTagsStore = defineStore('sysViewTags', {
    state: () => {
        return {
            list: [] as Menu.MenuOptions[]
        }
    },
    actions: {
        closeTabsOnSide(path: string, type: "left" | "right") {
            const currentIndex = this.list.findIndex(item => item.path === path);
            if (currentIndex !== -1) {
                const range = type === "left" ? [0, currentIndex] : [currentIndex + 1, this.list.length];
                this.list = this.list.filter((item, index) => {
                    return index < range[0] || index >= range[1] || item.meta.isAffix;
                });
            }
        },
        closeTabs(path?: string) {
            this.list = this.list.filter(item => {
                return item.path === path || item.meta.isAffix;
            });
        }
    },
    persist: {
        key: 'ViewTags',
        storage: SelfStorage,
    },
})
