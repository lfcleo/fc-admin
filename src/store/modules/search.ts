import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
    state: () => {
        return {
            list: [] as Menu.MenuOptions[],
        }
    },
    persist: {
        key: 'SEARCH',
    },
})
