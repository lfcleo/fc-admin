<!--
* @Description: 单图片上传组件
* @Version: 1.0.0
* @Author: Leo https://github.com/lfcleo
* @Date: 2024-05-30 13:46:48
* @LastEditTime: 2024-05-30 13:46:48
-->
<template>
    <div class="fc-upload-box">
        <el-upload :id="uuid" action="#" :class="['upload', self_disabled ? 'disabled' : '', drag ? 'no-border' : '']"
            :multiple="false" :disabled="self_disabled" :show-file-list="false" :on-change="handleChange"
            :http-request="handleHttpUpload" :before-upload="beforeUpload" :on-success="onSuccess" :on-error="onError"
            :drag="drag" :accept="fileType.join(',')" :auto-upload="!cropper">
            <template v-if="imageUrl">
                <img :src="imageUrl" class="fc-upload-image" />
                <div class="fc-upload-handle" @click.stop>
                    <div v-if="!self_disabled && editBtn" class="fc-handle-icon" @click="editImg">
                        <el-icon v-if="editBtnOption.icon">
                            <component :is="editBtnOption.icon" />
                        </el-icon>
                        <span v-if="editBtnOption.title">{{ editBtnOption.title }}</span>
                    </div>
                    <div v-if="showBtn" class="fc-handle-icon" @click="imgViewVisible = true">
                        <el-icon v-if="showBtnOption.icon">
                            <component :is="showBtnOption.icon" />
                        </el-icon>
                        <span v-if="showBtnOption.title">{{ showBtnOption.title }}</span>
                    </div>
                    <div v-if="!self_disabled && deleBtn" class="fc-handle-icon" @click="deleteImg">
                        <el-icon v-if="deleBtnOption.icon">
                            <component :is="deleBtnOption.icon" />
                        </el-icon>
                        <span v-if="deleBtnOption.title">{{ deleBtnOption.title }}</span>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="fc-upload-empty">
                    <slot name="empty">
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </slot>
                </div>
            </template>
        </el-upload>
        <div class="el-upload__tip">
            <slot name="tip"></slot>
        </div>
        <el-image-viewer v-if="imgViewVisible" :url-list="[imageUrl]" @close="imgViewVisible = false" />
        <el-dialog title="图片裁剪" v-model="cropperDialogVisible" width="800px" append-to-body @opened="openDialog"
            @close="closeDialog">
            <el-row>
                <el-col :xs="24" :md="12" :span="12" style="height: 300px;">
                    <vue-cropper ref="cropperRef" :img="cropperOptionImg" :info="true"
                        :autoCrop="cropperOption?.autoCrop" :autoCropWidth="cropperOption?.autoCropWidth"
                        :autoCropHeight="cropperOption?.autoCropHeight" :fixedBox="cropperOption?.fixedBox"
                        :outputType="cropperOption?.outputType" @realTime="cropperRealTime" />
                </el-col>
                <el-col :span="12" :xs="24" :md="12" style="height: 300px;">
                    <div class="fc-preview-box"
                        :style="`width:${cropperPreviews.w}px;height:${cropperPreviews.h}px;border-radius:${borderRadius}`">
                        <img :src="cropperPreviews.url" :style="cropperPreviews.img" />
                    </div>
                </el-col>
            </el-row>
            <el-row style="margin-top: 12px;">
                <el-col :span="12">
                    <el-row>
                        <el-col :span="4">
                            <el-button icon="Plus" @click="changeScale(1)"></el-button>
                        </el-col>
                        <el-col :span="4">
                            <el-button icon="Minus" @click="changeScale(-1)"></el-button>
                        </el-col>
                        <el-col :span="4">
                            <el-button icon="RefreshLeft" @click="rotateLeft()"></el-button>
                        </el-col>
                        <el-col :span="4">
                            <el-button icon="RefreshRight" @click="rotateRight()"></el-button>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row>
                        <el-col :span="4" :offset="14">
                            <el-button type="primary" plain @click="cancelCropperDialog">取 消</el-button>
                        </el-col>
                        <el-col :span="4" :offset="1">
                            <el-button type="primary" @click="sureCropperClick">确定</el-button>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script setup lang='ts'>
import { ref, computed, inject } from "vue";
import { generateUUID } from "@/utils/uuid";
import { ElNotification, formContextKey, formItemContextKey } from "element-plus";
import type { UploadProps, UploadRawFile, UploadRequestOptions } from "element-plus";
import "vue-cropper/dist/index.css";
import { VueCropper } from "vue-cropper";
import { compressImg } from "@/utils/compress";

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
    imageUrl: string;               // 图片地址 ==> 必传
    requestApi: (params: any) => Promise<any>;  // 上传图片的 requestApi 方法 ==> 必传
    drag?: boolean;                 // 是否支持拖拽上传 ==> 非必传（默认为 true）
    disabled?: boolean;             // 是否禁用上传组件 ==> 非必传（默认为 false）
    fileSize?: number;              // 图片大小限制 ==> 非必传（默认为 5M）
    fileType?: ImageMimeType[];     // 图片类型限制 ==> 非必传（默认为 ["image/jpeg", "image/png", "image/gif"]）
    height?: string;                // 组件高度 ==> 非必传（默认为 150px）
    width?: string;                 // 组件宽度 ==> 非必传（默认为 150px）
    borderRadius?: string;          // 组件边框圆角 ==> 非必传（默认为 8px）
    cropper?: boolean;              // 是否启用裁剪图片 ==> 非必传，默认为false
    cropperOption?: CropperOption;  // 裁剪图片配置选项
    comporess?: boolean;            // 是否启用图片压缩 ===> 非必传，默认为false
    comporessQuality?: number;      // 图片压缩质量 取0-1之间 ===> 非必传，默认0.4
    editBtn?: boolean;              // 是否显示编辑按钮
    editBtnOption?: BtnOption;      // 编辑按钮配置
    showBtn?: boolean;              // 是否显示查看按钮
    showBtnOption?: BtnOption;      // 查看按钮配置
    deleBtn?: boolean;              // 是否显示删除按钮
    deleBtnOption?: BtnOption;      // 删除按钮配置
    onSuccess?: () => void;         // 图片上传成功回调
    onError?: () => void;           // 图片上传失败回调
}

// 裁剪图片配置
export interface CropperOption {
    autoCropWidth?: number,      // 默认生成截图框宽度 默认200
    autoCropHeight?: number,     // 默认生成截图框高度 默认200
    outputType?: string,         // 裁剪生成图片的格式 jpeg, png, webp，默认png
    autoCrop?: boolean,          // 是否默认生成截图框,默认true
    fixedBox?: boolean,          // 固定截图框大小,默认false
}

// 编辑/查看/删除按钮配置
export interface BtnOption {
    icon?: string;               // 按钮图标
    title?: string;              // 按钮标题
}
// 接受父组件参数
const props = withDefaults(defineProps<UploadFileProps & { cropperOption?: CropperOption }>(), {
    imageUrl: "",
    drag: true,
    disabled: false,
    fileSize: 5,
    fileType: () => ["image/jpeg", "image/png", "image/gif"],
    height: "150px",
    width: "150px",
    borderRadius: "8px",
    cropper: false,
    cropperOption: (): CropperOption => ({
        autoCropWidth: 200,     // 默认生成截图框宽度 默认容器的 80%
        autoCropHeight: 200,    // 默认生成截图框高度 默认容器的 80%
        outputType: "png",      // 裁剪生成图片的格式 jpeg, png, webp
        autoCrop: true,         // 是否默认生成截图框
        fixedBox: false,        // 固定截图框大小
    }),
    comporess: false,
    editBtn: true,
    editBtnOption: (): BtnOption => ({
        icon: "Edit",
        title: "编辑",
    }),
    showBtn: true,
    showBtnOption: (): BtnOption => ({
        icon: "ZoomIn",
        title: "查看",
    }),
    deleBtn: true,
    deleBtnOption: (): BtnOption => ({
        icon: "Delete",
        title: "删除",
    }),
    onSuccess: () => { },
    onError: () => {
        ElNotification({
            message: "图片上传失败，请您重新上传！",
            type: "error"
        });
    },
});

// 生成组件唯一id
const uuid = ref("id-" + generateUUID());

// 查看图片
const imgViewVisible = ref(false);
// 获取 el-form 组件上下文
const formContext = inject(formContextKey, void 0);
// 获取 el-form-item 组件上下文
const formItemContext = inject(formItemContextKey, void 0);
// 判断是否禁用上传和删除
const self_disabled = computed(() => {
    return props.disabled || formContext?.disabled;
});
// 图片裁剪弹窗
const cropperDialogVisible = ref(false)
const cropperRef = ref()
// 图片裁剪弹窗参数
const cropperOptionImg = ref<string | ArrayBuffer | null | undefined>('')
// 裁剪后的预览样式信息
const cropperPreviews: any = ref({})

// 图片改变
const handleChange: UploadProps['onChange'] = (uploadFile) => {
    if (!props.cropper) return
    cropperDialogVisible.value = true
    let reader = new FileReader()
    reader.readAsDataURL(uploadFile.raw as UploadRawFile)
    reader.onload = e => {
        cropperOptionImg.value = e.target?.result // base64
    }
}

/**
 * @description 文件上传之前判断
 * @param rawFile 选择的文件
 * */
const beforeUpload: UploadProps["beforeUpload"] = (rawFile) => {
    const imgSize = rawFile.size / 1024 / 1024 < props.fileSize;
    const imgType = props.fileType.includes(rawFile.type as ImageMimeType);
    if (!imgType)
        ElNotification({
            title: "温馨提示",
            message: "上传图片不符合所需的格式！",
            type: "warning"
        });

    if (!imgSize)
        setTimeout(() => {
            ElNotification({
                title: "温馨提示",
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
const emit = defineEmits<{
    "update:imageUrl": [value: string];
}>();
// 自动上传原图，无裁剪
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
    requestHandler(formData, (error) => {
        options.onError(error);
    })
};

// 手动上传裁剪的图片
const sureCropperClick = () => {
    cropperRef.value.getCropBlob(async (data: any) => {
        let formData = new FormData();
        // 是否需要压缩图片
        if (props.comporess) {
            try {
                let comFile = await compressImg({
                    quality: props.comporessQuality as number,
                    fileObj: data
                })
                formData.append("file", comFile as File);
            } catch (error) {
                return
            }
        } else {
            formData.append("file", data);
        }
        requestHandler(formData)
    });
}

// 上传图片请求
const requestHandler = async (formData: FormData, errCallBack?: (error: any) => void) => {
    try {
        const api = props.requestApi;
        const { data } = await api(formData);
        emit("update:imageUrl", data);
        cropperDialogVisible.value = false
        // 调用 el-form 内部的校验方法（可自动校验）
        formItemContext?.prop && formContext?.validateField([formItemContext.prop as string]);
    } catch (error) {
        if (errCallBack) {
            errCallBack(error)
        } else {
            props.onError()
        }
    }
}

//  删除图片
const deleteImg = () => {
    emit("update:imageUrl", "");
};

// 编辑图片
const editImg = () => {
    const dom = document.querySelector(`#${uuid.value} .el-upload__input`);
    dom && dom.dispatchEvent(new MouseEvent("click"));
};

// 打开裁剪弹窗
const openDialog = () => {
    //   showCropper.value = true;
}
// 关闭裁剪弹窗
const closeDialog = () => {
    //   options.img = props.dataInfo.img;
}

// 修改图片大小 正数为变大 负数变小
const changeScale = (num: number) => {
    num = num || 1;
    cropperRef.value.changeScale(num);
}

// 向左边旋转90度
const rotateLeft = () => {
    cropperRef.value.rotateLeft();
}
// 向右边旋转90度
const rotateRight = () => {
    cropperRef.value.rotateRight();
}

// 实时预览事件
const cropperRealTime = (data: any) => {
    cropperPreviews.value = data    // 预览img图片
}

// 取消截图弹窗
const cancelCropperDialog = () => {
    cropperDialogVisible.value = false
}
</script>

<style scoped lang="scss">
.is-error {
    .upload {

        :deep(.el-upload),
        :deep(.el-upload-dragger) {
            border: 1px dashed var(--el-color-danger) !important;

            &:hover {
                border-color: var(--el-color-primary) !important;
            }
        }
    }
}

:deep(.disabled) {

    .el-upload,
    .el-upload-dragger {
        cursor: not-allowed !important;
        background: var(--el-disabled-bg-color);
        border: 1px dashed var(--el-border-color-darker) !important;

        &:hover {
            border: 1px dashed var(--el-border-color-darker) !important;
        }
    }
}

.fc-upload-box {
    .no-border {
        :deep(.el-upload) {
            border: none !important;
        }
    }

    :deep(.upload) {
        .el-upload {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: v-bind(width);
            height: v-bind(height);
            overflow: hidden;
            border: 1px dashed var(--el-border-color-darker);
            border-radius: v-bind(borderRadius);
            transition: var(--el-transition-duration-fast);

            &:hover {
                border-color: var(--el-color-primary);

                .fc-upload-handle {
                    opacity: 1;
                }
            }

            .el-upload-dragger {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                padding: 0;
                overflow: hidden;
                background-color: transparent;
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

            .fc-upload-image {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }

            .fc-upload-empty {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-size: 13px;
                line-height: 30px;
                color: var(--el-color-info);

                .el-icon {
                    font-size: 28px;
                    color: var(--el-text-color-secondary);
                }
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
                        margin-bottom: 40%;
                        font-size: 130%;
                        line-height: 130%;
                    }

                    span {
                        font-size: 85%;
                        line-height: 85%;
                    }
                }
            }
        }
    }

    .el-upload__tip {
        line-height: 18px;
        text-align: center;
    }
}

.fc-preview-box {
    position: absolute;
    top: 50%;
    transform: translate(50%, -50%);
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    overflow: hidden;
}
</style>