<!--
* @Description: 多图片上传组件
* @Version: 1.0.0
* @Author: Leo https://github.com/lfcleo
* @Date: 2024-05-30 14:04:46
* @LastEditTime: 2024-05-30 14:04:46
-->
<template>
    <div class="fc-upload-box">
        <el-upload v-model:file-list="_fileList" action="#" list-type="picture-card"
            :class="['upload', self_disabled ? 'disabled' : '', drag ? 'no-border' : '']" :multiple="true"
            :disabled="self_disabled" :limit="limit" :http-request="handleHttpUpload" :before-upload="beforeUpload"
            :on-exceed="handleExceed" :on-success="uploadSuccess" :on-error="uploadError" :drag="drag"
            :accept="fileType.join(',')">
            <div class="upload-empty">
                <slot name="empty">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </slot>
            </div>
            <template #file="{ file }">
                <img :src="file.url" class="fc-upload-image" />
                <div class="fc-upload-handle" @click.stop>
                    <div class="fc-handle-icon" @click="handlePictureCardPreview(file)">
                        <el-icon>
                            <ZoomIn />
                        </el-icon>
                        <span>查看</span>
                    </div>
                    <div v-if="!self_disabled" class="fc-handle-icon" @click="handleRemove(file)">
                        <el-icon>
                            <Delete />
                        </el-icon>
                        <span>删除</span>
                    </div>
                    <div v-if="sortable" class="fc-handle-icon move">
                        <el-icon>
                            <Rank />
                        </el-icon>
                        <span>移动</span>
                    </div>
                </div>
            </template>
        </el-upload>
        <div class="el-upload__tip">
            <slot name="tip"></slot>
        </div>
        <el-image-viewer v-if="imgViewVisible" :url-list="[viewImageUrl]" @close="imgViewVisible = false" />
    </div>
</template>

<script setup lang='ts'>
import { ref, computed, inject, watch, onMounted } from 'vue'
import type { UploadProps, UploadFile, UploadUserFile, UploadRequestOptions } from "element-plus";
import { ElNotification, formContextKey, formItemContextKey } from "element-plus";
import { compressImg } from "@/utils/compress";
import Sortable from "sortablejs";

type ImageMimeType =
    | "image/apng"
    | "image/bmp"
    | "image/gif"
    | "image/jpeg"
    | "image/pjpeg"
    | "image/png"
    | "image/svg+xml"
    | "image/tiff"
    | "image/webp"
    | "image/x-icon";

interface UploadFileProps {
    fileList: UploadUserFile[];
    requestApi: (params: any) => Promise<any>;  // 上传图片的 requestApi 方法 ==> 必传
    drag?: boolean;             // 是否支持拖拽上传 ==> 非必传（默认为 true）
    disabled?: boolean;         // 是否禁用上传组件 ==> 非必传（默认为 false）
    limit?: number;             // 最大图片上传数 ==> 非必传（默认为 5张）
    fileSize?: number;          // 图片大小限制 ==> 非必传（默认为 5M）
    fileType?: ImageMimeType[]; // 图片类型限制 ==> 非必传（默认为 ["image/jpeg", "image/png", "image/gif"]）
    height?: string;            // 组件高度 ==> 非必传（默认为 150px）
    width?: string;             // 组件宽度 ==> 非必传（默认为 150px）
    borderRadius?: string;      // 组件边框圆角 ==> 非必传（默认为 8px）
    comporess?: boolean;        // 是否启用图片压缩 ===> 非必传，默认为false
    comporessQuality?: number   // 图片压缩质量 取0-1之间 ===> 非必传，默认0.4
    sortable?: boolean;         // 是否开启拖拽排序 ==>非必传，默认不开启
}

const props = withDefaults(defineProps<UploadFileProps>(), {
    fileList: () => [],
    drag: true,
    disabled: false,
    limit: 5,
    fileSize: 5,
    fileType: () => ["image/jpeg", "image/png", "image/gif"],
    height: "150px",
    width: "150px",
    borderRadius: "8px",
    comporess: false,
    sortable: false,
});

// 获取 el-form 组件上下文
const formContext = inject(formContextKey, void 0);
// 获取 el-form-item 组件上下文
const formItemContext = inject(formItemContextKey, void 0);
// 判断是否禁用上传和删除
const self_disabled = computed(() => {
    return props.disabled || formContext?.disabled;
});

const _fileList = ref<UploadUserFile[]>(props.fileList);

onMounted(() => {
    if (props.sortable) {
        dragSort();
    }
})

// 拖拽排序
const dragSort = () => {
    const tbody = document.querySelector(".el-upload-list") as HTMLElement;
    Sortable.create(tbody, {
        handle: ".move",
        animation: 300,
        onEnd({ newIndex, oldIndex }) {
            const [removedItem] = props.fileList.splice(oldIndex!, 1);
            props.fileList.splice(newIndex!, 0, removedItem);
            // emit("dargSort", { newIndex, oldIndex });
        }
    });
};

// 监听 props.fileList 列表默认值改变
watch(
    () => props.fileList,
    (n: UploadUserFile[]) => {
        _fileList.value = n;
    }
);

/**
 * @description 文件上传之前判断
 * @param rawFile 选择的文件
 * */
const beforeUpload: UploadProps["beforeUpload"] = rawFile => {
    const imgSize = rawFile.size / 1024 / 1024 < props.fileSize;
    const imgType = props.fileType.includes(rawFile.type as ImageMimeType);
    if (!imgType)
        ElNotification({
            message: "上传图片不符合所需的格式！",
            type: "warning"
        });
    if (!imgSize)
        setTimeout(() => {
            ElNotification({
                message: `上传图片大小不能超过 ${props.fileSize}M！`,
                type: "warning"
            });
        }, 0);
    return imgType && imgSize;
};

/**
 * @description 图片上传
 * @param options upload 所有配置项
 * */
const handleHttpUpload = async (options: UploadRequestOptions) => {
    let formData = new FormData();
    // 是否需要压缩图片
    if (props.comporess) {
        try {
            let comFile = await compressImg({
                quality: props.comporessQuality as number,
                fileObj: options.file
            })
            formData.append("file", comFile as File);
        } catch (error) {
            options.onError(error as any);
            return
        }
    } else {
        formData.append("file", options.file);
    }
    try {
        const api = props.requestApi;
        const { data } = await api(formData);
        options.onSuccess(data);
    } catch (error) {
        options.onError(error as any);
    }
};

/**
 * @description 图片上传成功
 * @param response 上传响应结果
 * @param uploadFile 上传的文件
 * */
const emit = defineEmits<{
    "update:fileList": [value: UploadUserFile[]];
}>();
const uploadSuccess = (response: string, uploadFile: UploadFile) => {
    if (!response) return;
    uploadFile.url = response;
    emit("update:fileList", _fileList.value);
    // 调用 el-form 内部的校验方法（可自动校验）
    formItemContext?.prop && formContext?.validateField([formItemContext.prop as string]);
    ElNotification({
        message: "图片上传成功！",
        type: "success"
    });
};

/**
 * @description 删除图片
 * @param file 删除的文件
 * */
const handleRemove = (file: UploadFile) => {
    _fileList.value = _fileList.value.filter(item => item.url !== file.url || item.name !== file.name);
    emit("update:fileList", _fileList.value);
};

/**
 * @description 图片上传错误
 * */
const uploadError = () => {
    ElNotification({
        message: "图片上传失败，请您重新上传！",
        type: "error"
    });
};

/**
 * @description 文件数超出
 * */
const handleExceed = () => {
    ElNotification({
        message: `当前最多只能上传 ${props.limit} 张图片，请移除后上传！`,
        type: "warning"
    });
};

/**
 * @description 图片预览
 * @param file 预览的文件
 * */
const viewImageUrl = ref("");
const imgViewVisible = ref(false);
const handlePictureCardPreview: UploadProps["onPreview"] = file => {
    viewImageUrl.value = file.url!;
    imgViewVisible.value = true;
};
</script>

<style scoped lang="scss">
.is-error {
    .upload {

        :deep(.el-upload--picture-card),
        :deep(.el-upload-dragger) {
            border: 1px dashed var(--el-color-danger) !important;

            &:hover {
                border-color: var(--el-color-primary) !important;
            }
        }
    }
}

:deep(.disabled) {

    .el-upload--picture-card,
    .el-upload-dragger {
        cursor: not-allowed;
        background: var(--el-disabled-bg-color) !important;
        border: 1px dashed var(--el-border-color-darker);

        &:hover {
            border-color: var(--el-border-color-darker) !important;
        }
    }
}

.fc-upload-box {
    .no-border {
        :deep(.el-upload--picture-card) {
            border: none !important;
        }
    }

    :deep(.upload) {
        .el-upload-dragger {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            padding: 0;
            overflow: hidden;
            border: 1px dashed var(--el-border-color-darker);
            border-radius: v-bind(borderRadius);

            &:hover {
                border: 1px dashed var(--el-color-primary);
            }
        }

        .el-upload-dragger.is-dragover {
            background-color: var(--el-color-primary-light-9);
            border: 2px dashed var(--el-color-primary) !important;
        }

        .el-upload-list__item,
        .el-upload--picture-card {
            width: v-bind(width);
            height: v-bind(height);
            background-color: transparent;
            border-radius: v-bind(borderRadius);
        }

        .fc-upload-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        .fc-upload-handle {
            position: absolute;
            top: 0;
            right: 0;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            cursor: pointer;
            background: rgb(0 0 0 / 60%);
            opacity: 0;
            transition: var(--el-transition-duration-fast);

            .fc-handle-icon {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 0 6%;
                color: aliceblue;

                .el-icon {
                    margin-bottom: 15%;
                    font-size: 140%;
                }

                span {
                    font-size: 100%;
                }
            }
        }

        .el-upload-list__item {
            &:hover {
                .fc-upload-handle {
                    opacity: 1;
                }
            }
        }

        .fc-upload-empty {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 13px;
            line-height: 30px;
            color: var(--el-color-info);

            .el-icon {
                font-size: 28px;
                color: var(--el-text-color-secondary);
            }
        }
    }

    .el-upload__tip {
        line-height: 15px;
        text-align: center;
    }
}
</style>