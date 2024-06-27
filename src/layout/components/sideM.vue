<template>
    <div ref="" class="mobile-nav-button" @click="showMobileNav($event)">
        <el-icon>
            <Menu />
        </el-icon>
    </div>

    <el-drawer ref="mobileNavBoxRef" title="移动端菜单" :size="240" v-model="nav" direction="ltr" :with-header="false"
        destroy-on-close>
        <el-container class="mobile-nav">
            <el-header>
                <div class="logo-bar"><img class="logo" src="/img/logo.png"><span>{{ appTitle }}</span>
                </div>
            </el-header>
            <el-main>
                <el-scrollbar>
                    <el-menu :default-active="route.path" @select="select" router background-color="#212d3d"
                        text-color="#fff" active-text-color="#409EFF">
                        <navMenu :navMenus="menu"></navMenu>
                    </el-menu>
                </el-scrollbar>
            </el-main>
        </el-container>
    </el-drawer>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import navMenu from './navMenu.vue';
import { ElDrawer } from 'element-plus';
import { useRoute } from 'vue-router';


defineProps<{ menu: Menu.MenuOptions[] }>();
const route = useRoute();
const appTitle = import.meta.env.VITE_VUE_TITLE
const nav = ref(false);
const mobileNavBoxRef = ref<InstanceType<typeof ElDrawer> | null>(null);

const showMobileNav = (_e: MouseEvent) => {
    //     const isDrag = (e.currentTarget as HTMLElement).getAttribute('drag-flag');
    //     if (isDrag === 'true') {
    //         return;
    //     }
    nav.value = true;
};

const select = () => {
    if (mobileNavBoxRef.value && typeof mobileNavBoxRef.value.handleClose === 'function') {
        mobileNavBoxRef.value.handleClose(); // 调用 handleClose 方法  
    }
};
</script>

<style scoped>
.mobile-nav-button {
    position: fixed;
    bottom: 10px;
    left: 10px;
    z-index: 10;
    width: 50px;
    height: 50px;
    background: #409EFF;
    box-shadow: 0 2px 12px 0 rgba(64, 158, 255, 1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.mobile-nav-button i {
    color: #fff;
    font-size: 20px;
}

.mobile-nav {
    background: #212d3d;
}

.mobile-nav .el-header {
    background: transparent;
    border: 0;
}

.mobile-nav .el-main {
    padding: 0;
}

.mobile-nav .logo-bar {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 20px;
    color: #fff;
}

.mobile-nav .logo-bar img {
    width: 30px;
    margin-right: 10px;
}

.mobile-nav .el-submenu__title:hover {
    background: #fff !important;
}
</style>