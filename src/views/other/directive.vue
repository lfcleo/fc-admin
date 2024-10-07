<template>
    <el-main>
        <el-card shadow="never" header="通用指令">
            <el-button v-copy="'我是从FC-Admin复制指令Copy的值'" type="primary">复制指令</el-button>
            <el-button v-debounce="debounceClick" type="primary"> 防抖按钮 (连续点击只执行最后一次。0.5秒后执行) </el-button>
            <el-button v-throttle="throttleClick" type="primary"> 节流按钮 (1S秒内多次点击只会执行1次) </el-button>
            <el-button v-longpress="longpress" type="primary"> 长按指令（长按2秒触发事件） </el-button>
        </el-card>

        <el-card shadow="never" header="v-auth 高精度权限控制(根据本地存储permissions判断)" style="margin-top: 20px;">
            <el-button v-auth="'user.add'" type="primary">v-auth="'user.add'"</el-button>
            <el-button v-auths="['user.no', 'user.add']" type="primary">v-auths="['user.no','user.add']"</el-button>
            <el-button v-auths-all="['list.add', 'user.edit']" type="primary">v-auths-all="'list.add',
                'user.edit'"</el-button>
            <el-alert title="v-auth指令 原先需要使用v-if来判断是否有权限, 判断单项权限，如果满足就判断有权限，不满足会隐藏。"
                style="margin-top: 20px;"></el-alert>
            <el-alert title="v-auths指令 传入数组,有一项满足就判断有权限，不满足会隐藏。" style="margin-top: 20px;"></el-alert>
            <el-alert title="v-auths-all指令 传入数组,必须全满足才有权限，比如user.no没有这个权限，加到这里的话就表示不全部满足，会隐藏。"
                style="margin-top: 20px;"></el-alert>
            <el-alert title="本地存储的permissions包含有ALL，则v-auth,v-auths,v-auths-all指令都会显示。ALL为最高权限。"
                style="margin-top: 20px;"></el-alert>
        </el-card>

        <el-card shadow="never" header="v-role 角色权限控制(根据本地存储userinfo.roles判断)" style="margin-top: 20px;">
            <el-button v-role="['admin']" type="primary">v-role="'admin'"</el-button>
            <el-button v-role="['ALL', 'admin']" type="primary">v-role="['ALL','admin']"</el-button>
            <el-alert title="v-role指令 原理是判断是否含有用户所在的角色别名" style="margin-top: 20px;"></el-alert>
            <el-alert title="本地存储的userinfo.roles包含有ALL，则v-role指令会显示。ALL为最高权限。" style="margin-top: 20px;"></el-alert>
        </el-card>

        <el-card shadow="never" header="水印指令" style="margin-top: 20px;">
            <div v-waterMarker="waterMarker" style="width: 100%;height: 500px;"></div>
        </el-card>
    </el-main>
</template>

<script setup lang='ts'>
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';

const waterMarker = reactive({
    text: 'FC-Admin',
    textColor: 'rgba(180, 180, 180, 0.8)'
})

const debounceClick = () => {
    ElMessage.success("我是防抖按钮触发的事件");
};

const throttleClick = () => {
    ElMessage.success("我是节流按钮触发的事件");
};

const longpress = () => {
    ElMessage.success("长按事件触发成功");
};

</script>

<style scoped></style>