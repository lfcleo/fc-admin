<template>
    <el-main>
        <el-card shadow="never">
            <div>当切换标签时，此页面内容和数据不会被刷新。</div>
            <div>打开控制台，看console.log输入，当切换标签时，只会打印一次console.</div>
            <div>使用方法：</div>
            <div>1，动态/静态路由，在meta标签中添加isKeepAlive</div>
            <div>2，在路由文件中，添加defineOptions选项，设置name与路由中的一致</div>
        </el-card>
    </el-main>
</template>

<script setup lang='ts'>
import { onMounted } from 'vue'

//使用keep-alive必须要填写name,且与路由中的name保持一致
defineOptions({
    name: "otherKeepAlive"
})

onMounted(() => {
    console.log("页面保活了：KeepAlive：")
})
</script>

<style scoped></style>