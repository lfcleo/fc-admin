<template>
    <div class="adminui-topbar">
        <div class="left-panel">
            <el-breadcrumb separator-icon="ArrowRight" class="hidden-sm-and-down">
                <transition-group name="breadcrumb">
                    <template v-for="item in menuStore.breadcrumbList" :key="item.name">
                        <el-breadcrumb-item v-if="item.path != '/'" :key="item.meta.title">
                            <el-icon class="icon" v-if="item.meta.icon">
                                <component :is="item.meta.icon" />
                            </el-icon>{{ item.meta.title }}
                        </el-breadcrumb-item>
                    </template>
                </transition-group>
            </el-breadcrumb>
        </div>
        <div class="center-panel"></div>
        <div class="right-panel">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMenuStore } from "@/store/modules/menu";

const menuStore = useMenuStore();

</script>

<style scoped>
.el-breadcrumb {
    margin-left: 15px;
}

.el-breadcrumb .el-breadcrumb__inner .icon {
    font-size: 16px;
    margin-right: 5px;
    float: left;
}

.breadcrumb-enter-active {
    transition: all 0.3s;
}

.breadcrumb-enter-from {
    opacity: 0;
    transform: translateX(20px);
}

.breadcrumb-leave-active {
    position: absolute;
}
</style>
