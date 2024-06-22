import { defineStore } from "pinia";

export const useSysKeepAliveStore = defineStore('sysKeepAlive', {
    state: () => {
        return {
            list: [] as string[],
        }
    },
    actions: {
        addKeepAliveName(component: string) {
            if (!this.list.includes(component)) {
                this.list.push(component)
            }
        },
        removeKeepAliveName(component: string) {
            this.list = this.list.filter(item => item !== component);
        },
        removeKeepAliveNames(tags: Menu.MenuOptions[]) {
            const tagNames = new Set(tags.map(item => item.name));
            this.list = this.list.filter(item => tagNames.has(item));
        }
    }
})
