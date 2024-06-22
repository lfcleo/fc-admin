<template>
    <el-alert title="以下配置可实时预览，使用Pinia控制，开发者可在 store/system/global.ts 中配置默认值，非常不建议在生产环境下开放布局设置" type="error"
        :closable="false"></el-alert>
    <el-divider class="divider" content-position="center">
        <el-icon>
            <Notification />
        </el-icon>
        布局样式
    </el-divider>
    <div class="layout-box">
        <div style="text-align: center;">
            <div :class="['layout-item layout-columns', { 'is-active': sysGlobalStore.sysLayout == 'default' }]"
                @click="sysGlobalStore.sysLayout = 'default'">
                <div class="layout-dark"></div>
                <div class="layout-light"></div>
                <div class="layout-content"></div>
                <el-icon v-if="sysGlobalStore.sysLayout == 'default'">
                    <CircleCheckFilled />
                </el-icon>
            </div>
            <div>默认</div>
        </div>
        <div style="text-align: center;">
            <div :class="['layout-item layout-vertical', { 'is-active': sysGlobalStore.sysLayout == 'menu' }]"
                @click="sysGlobalStore.sysLayout = 'menu'">
                <div class="layout-dark"></div>
                <div class="layout-container">
                    <div class="layout-light"></div>
                    <div class="layout-content"></div>
                </div>
                <el-icon v-if="sysGlobalStore.sysLayout == 'menu'">
                    <CircleCheckFilled />
                </el-icon>
            </div>
            <div>经典</div>
        </div>
        <div style="margin-top: 5px;text-align: center;">
            <div :class="['layout-item layout-classic', { 'is-active': sysGlobalStore.sysLayout == 'header' }]"
                @click="sysGlobalStore.sysLayout = 'header'">
                <div class="layout-dark"></div>
                <div class="layout-container">
                    <div class="layout-light"></div>
                    <div class="layout-content"></div>
                </div>
                <el-icon v-if="sysGlobalStore.sysLayout == 'header'">
                    <CircleCheckFilled />
                </el-icon>
            </div>
            <div>通栏</div>
        </div>
        <div style="margin-top: 5px;text-align: center;">
            <div :class="['layout-item layout-transverse', { 'is-active': sysGlobalStore.sysLayout == 'dock' }]"
                @click="sysGlobalStore.sysLayout = 'dock'">
                <div class="layout-dark"></div>
                <div class="layout-content"></div>
                <el-icon v-if="sysGlobalStore.sysLayout == 'dock'">
                    <CircleCheckFilled />
                </el-icon>
            </div>
            <div>功能坞</div>
        </div>
    </div>
    <el-divider class="divider" content-position="center">
        <el-icon>
            <ColdDrink />
        </el-icon>
        全局主题
    </el-divider>
    <div class="theme-item">
        <span>主题颜色</span>
        <el-color-picker v-model="color" :predefine="colorList" @change="colorPickerChange"></el-color-picker>
    </div>
    <div class="theme-item">
        <span>{{ $t('user.nightmode') }}</span>
        <el-switch v-model="sysGlobalStore.sysDark"></el-switch>
    </div>
    <div class="theme-item">
        <span>{{ $t('user.language') }}</span>
        <el-select v-model="sysGlobalStore.sysLang" style="width: 150px;">
            <el-option label="简体中文" value="zh-cn"></el-option>
            <el-option label="English" value="en"></el-option>
        </el-select>
    </div>
    <div class="theme-item">
        <span>折叠菜单</span>
        <el-switch v-model="sysGlobalStore.sysMenuIsCollapse"></el-switch>
    </div>
    <div class="theme-item">
        <span>标签栏</span>
        <el-switch v-model="sysGlobalStore.sysLayoutTags"></el-switch>
    </div>
    <div class="theme-item">
        <span>手风琴效果</span>
        <el-switch v-model="sysGlobalStore.sysmenuUniqueOpened"></el-switch>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSysGlobalStore } from "@/store/system/global.js";

const sysGlobalStore = useSysGlobalStore()
const color = ref(sysGlobalStore.sysColor)
const colorList = ref(['#409EFF', '#009688', '#536dfe', '#ff5c93', '#c62f2f', '#fd726d']);

const colorPickerChange = (value: string) => {
    if (value) {
        sysGlobalStore.sysColor = value
    } else {
        color.value = sysGlobalStore.sysColor = '#409EFF'
    }
}
</script>

<style scoped lang="scss">
.divider {
    margin-top: 15px;

    .el-icon {
        position: relative;
        top: 2px;
        right: 5px;
        font-size: 15px;
    }
}

.theme-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px;
    margin: 14px 0;

    span {
        display: flex;
        align-items: center;
        font-size: 14px;

        .el-icon {
            margin-left: 3px;
            font-size: 15px;
            color: var(--el-text-color-regular);
            cursor: pointer;
        }
    }
}

.layout-box {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 15px 7px 0;

    .layout-item {
        position: relative;
        box-sizing: border-box;
        width: 100px;
        height: 70px;
        padding: 6px;
        cursor: pointer;
        border-radius: 5px;
        box-shadow: 0 0 5px 1px var(--el-border-color-dark);
        transition: all 0.2s;

        .layout-dark {
            background-color: var(--el-color-primary);
            border-radius: 3px;
        }

        .layout-light {
            background-color: var(--el-color-primary-light-5);
            border-radius: 3px;
        }

        .layout-content {
            background-color: var(--el-color-primary-light-8);
            border: 1px dashed var(--el-color-primary);
            border-radius: 3px;
        }

        .el-icon {
            position: absolute;
            right: 10px;
            bottom: 10px;
            color: var(--el-color-primary);
            transition: all 0.2s;
        }

        &:hover {
            box-shadow: 0 0 5px 1px var(--el-text-color-secondary);
        }
    }

    .is-active {
        box-shadow: 0 0 0 2px var(--el-color-primary) !important;
    }

    .layout-vertical {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;

        .layout-dark {
            width: 20%;
        }

        .layout-container {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 72%;

            .layout-light {
                height: 20%;
            }

            .layout-content {
                height: 67%;
            }
        }
    }

    .layout-classic {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 20px;

        .layout-dark {
            height: 22%;
        }

        .layout-container {
            display: flex;
            justify-content: space-between;
            height: 70%;

            .layout-light {
                width: 20%;
            }

            .layout-content {
                width: 70%;
            }
        }
    }

    .layout-transverse {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 15px;

        .layout-dark {
            height: 20%;
        }

        .layout-content {
            height: 67%;
        }
    }

    .layout-columns {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;

        .layout-dark {
            width: 14%;
        }

        .layout-light {
            width: 17%;
        }

        .layout-content {
            width: 55%;
        }
    }
}
</style>