<template>
    <div class="fc-search">
        <el-input ref="searchInputRef" v-model="searchStr" placeholder="搜索菜单" size="large" clearable
            prefix-icon="Search" :trigger-on-focus="false" @input="inputChange" />
        <div class="fc-search-result" v-if="searchStore.list.length > 0 && !searchStr">
            <div class="fc-search-history-label">搜索历史</div>
            <ul>
                <el-scrollbar max-height="366px" always>
                    <li v-for="(item, index) in searchStore.list" :key="item.path" @click="selectMenu(item)">
                        <el-icon>
                            <component :is="item.meta.icon || 'Memo'" />
                        </el-icon>
                        <span class="title">{{ item.meta.title }}</span>
                        <span style="flex:1"></span>
                        <el-icon class="close-icon" @click.stop="historyClose(index)">
                            <Close />
                        </el-icon>
                    </li>
                </el-scrollbar>
            </ul>
        </div>
        <div class="fc-search-result" v-else>
            <div class="fc-search-no-result" v-if="result.length <= 0">暂无搜索结果</div>
            <ul v-else>
                <el-scrollbar max-height="366px" always>
                    <li v-for="item in result" :key="item.path" @click="selectMenu(item)">
                        <el-icon>
                            <component :is="item.meta.icon || 'Memo'" />
                        </el-icon>
                        <span class="title">{{ item.meta.title }}</span>
                    </li>
                </el-scrollbar>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import type { ElInput } from "element-plus";
import { useMenuStore } from "@/store/modules/menu";
import { useSearchStore } from "@/store/modules/search";
import { useAuthStore } from "@/store/modules/auth";
import menuTool from "@/utils/menuRoute"
import router from '@/router'
import { staticRoutes } from '@/router';

const emit = defineEmits(['selectMenu'])

const menuStore = useMenuStore()
const searchStore = useSearchStore()
const authStore = useAuthStore()
const searchStr = ref('')
const menuList = ref<Menu.MenuOptions[]>([])
const result = ref<Menu.MenuOptions[]>([])
const searchInputRef = ref<InstanceType<typeof ElInput>>();

onMounted(() => {
    filterMenu()
    nextTick(() => {
        searchInputRef.value!.focus()
    })
})

const filterMenu = () => {
    let staticMenu: Menu.MenuOptions[] = []
    staticRoutes.forEach(item => {
        if (item.meta?.isHide || item.meta?.type == 'BUTTON') return false
        if (item.meta?.role && !item.meta.role.some(role => authStore.userInfo.roles?.includes(role))) return false;
        const menuOptions: Menu.MenuOptions | null = {
            path: item.path,
            name: item.name as string,
            meta: {
                ...item.meta,
            } as Menu.MetaProps,
        };
        staticMenu.push(menuOptions)
    })
    let apiMenu = menuTool.getFlatMenuList(menuStore.list)
    menuList.value = [...staticMenu, ...apiMenu]
}

const inputChange = (value: string) => {
    if (value) {
        result.value = findRoutesByTitleKeyword(value)
    } else {
        result.value = []
    }
}

function findRoutesByTitleKeyword(keyword: string): Menu.MenuOptions[] {
    return menuList.value.filter((route) => route.meta.title.includes(keyword));
}

const selectMenu = (item: Menu.MenuOptions) => {
    if (!searchStore.list.some(historyItem => historyItem.name === item.name)) {
        searchStore.list.push(item)
    }
    if (item.meta.type == 'LINK') {
        setTimeout(() => {
            let a = document.createElement("a") as HTMLAnchorElement;
            a.style.display = "none"
            a.target = "_blank"
            a.href = item.path
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
        }, 10);
        return
    }
    router.push({ path: item.path })
    emit('selectMenu')
}

const historyClose = (index: number) => {
    searchStore.list.splice(index, 1);
}
</script>

<style scoped>
.fc-search-no-result {
    text-align: center;
    margin: 40px 0;
    color: #999;
}

.fc-search-result {
    margin-top: 15px;
}

.fc-search-history-label {
    margin: 15px 0;
}

.fc-search-result li {
    height: 56px;
    padding: 0 15px;
    background: var(--el-bg-color-overlay);
    border: 1px solid var(--el-border-color-light);
    list-style: none;
    border-radius: 4px;
    margin-bottom: 5px;
    font-size: 14px;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.fc-search-result li i {
    font-size: 20px;
    margin-right: 15px;
}

.fc-search-result li:hover {
    background: var(--el-color-primary);
    color: #fff;
    border-color: var(--el-color-primary);
}

.fc-search-result .close-icon {
    font-size: 15px;
}

.fc-search-footer {
    display: flex;
    list-style: none;
    box-sizing: border-box;
    margin-top: 10px;
}

.fc-search-footer li {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: .8em;
    color: #909399;
}

.fc-search-footer .fc-commands-key {
    align-items: center;
    background: rgba(125, 125, 125, .1);
    border-radius: 2px;
    box-shadow: inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff, 0 1px 2px 1px rgba(30, 35, 90, .4);
    display: flex;
    height: 18px;
    justify-content: center;
    margin-right: .4em;
    padding: 0 0 1px;

    border: 0;
    width: 20px;
}

.fc-search-footer .fc-commands-label {
    font-size: 13px;
    line-height: 1.6em;
}
</style>
