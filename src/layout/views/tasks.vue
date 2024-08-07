<template>
    <el-container v-loading="loading">
        <el-main>
            <el-empty v-if="tasksData.length == 0" :image-size="120">
                <template #description>
                    <h2>没有正在执行的任务</h2>
                </template>
                <p style="font-size: 14px;color: #999;line-height: 1.5;margin: 0 40px;">
                    在处理耗时过久的任务时为了不阻碍正在处理的工作，可在任务中心进行异步执行。</p>
            </el-empty>
            <el-card v-for="task in tasksData" :key="task.id" shadow="hover" class="user-bar-tasks-item">
                <div class="user-bar-tasks-item-body">
                    <div class="taskIcon">
                        <el-icon v-if="task.type == 'export'" :size="20">
                            <Paperclip />
                        </el-icon>
                        <el-icon v-if="task.type == 'report'" :size="20">
                            <DataAnalysis />
                        </el-icon>
                    </div>
                    <div class="taskMain">
                        <div class="title">
                            <h2>{{ task.taskName }}</h2>
                            <!-- 使用自定义指令v-time能自动格式化时间 -->
                            <p><span v-time="task.createDate"></span> 创建</p>
                        </div>
                        <div class="bottom">
                            <div class="state">
                                <el-tag type="info" v-if="task.state == '0'">执行中</el-tag>
                                <el-tag v-if="task.state == '1'">完成</el-tag>
                            </div>
                            <div class="handler">
                                <el-button v-if="task.state == '1'" type="primary" circle icon="Download"
                                    @click="download(task)"></el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </el-card>
        </el-main>
        <el-footer style="padding:10px;text-align: right;">
            <el-button circle icon="Refresh" @click="refresh"></el-button>
        </el-footer>
    </el-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { TaskModel } from '@/models/authModel';

const loading = ref(false)
const tasksData = ref<TaskModel[]>([])

onMounted(() => {
    getData()
})

const getData = () => {
    loading.value = true
    tasksData.value = [{
        "id": "100",
        "taskName": "年度报表生成",
        "type": "report",
        "result": "",
        "state": "0",
        "stateName": "执行中",
        "createDate": "2023-12-24T19:33:03.345+08:00"
    },
    {
        "id": "101",
        "taskName": "系统日志导出",
        "type": "export",
        "result": "https://www.baidu.com",
        "state": "1",
        "stateName": "完成",
        "createDate": "2023-12-24T19:33:03.345+08:00"
    }]
    loading.value = false
}

const refresh = () => {
    getData()
}

const download = (row: TaskModel) => {
    const a = document.createElement("a") as HTMLAnchorElement;
    a.style.display = "none";
    a.target = "_blank";
    a.href = row.result;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
</script>

<style scoped>
.user-bar-tasks-item {
    margin-bottom: 10px;
}

.user-bar-tasks-item:hover {
    border-color: var(--el-color-primary);
}

.user-bar-tasks-item-body {
    display: flex;
}

.user-bar-tasks-item-body .taskIcon {
    width: 45px;
    height: 45px;
    background: var(--el-color-primary-light-9);
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--el-color-primary);
    border-radius: 20px;
}

.user-bar-tasks-item-body .taskMain {
    flex: 1;
}

.user-bar-tasks-item-body .title h2 {
    font-size: 15px;
}

.user-bar-tasks-item-body .title p {
    font-size: 13px;
    color: #999;
    margin-top: 5px;
}

.user-bar-tasks-item-body .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
}
</style>