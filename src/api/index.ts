import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessageBox, ElNotification } from "element-plus";
import { AxiosCanceler } from "./utils/axiosCancel";
import { ResultData } from "./utils/models";
import { useAuthStore } from "@/store/modules/auth";
import router from "@/router";

//可设置公共请求头，会追加到headers中,如有需要
const publicHeaders = {}

const config = {
    // 设置超时时间
    timeout: import.meta.env.VITE_TIMEOUT as number,
    // 跨域时候允许携带凭证
    withCredentials: true
};

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    cancel?: boolean;
}

//FIX 多个API同时401时疯狂弹窗BUG
let MessageBox_401_show = false

const axiosCanceler = new AxiosCanceler();

class RequestHttp {
    service: AxiosInstance;
    public constructor(config: AxiosRequestConfig) {
        // instantiation
        this.service = axios.create(config);

        /**
         * @description 请求拦截器
         * 客户端发送请求 -> [请求拦截器] -> 服务器
         * token校验(JWT) : 接受服务器返回的 token,存储到 vuex/pinia/本地储存当中
         */
        this.service.interceptors.request.use(
            (config: CustomAxiosRequestConfig) => {
                const authStore = useAuthStore();
                // 重复请求不需要取消，在 api 服务中通过指定的第三个参数: { cancel: false } 来控制
                config.cancel ??= true;
                config.cancel && axiosCanceler.addPending(config);
                if (authStore.token) {
                    config.headers[import.meta.env.VITE_TOKEN_NAME] = authStore.token
                }
                Object.assign(config.headers, publicHeaders)
                return config;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        );

        /**
         * @description 响应拦截器
         *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
         */
        this.service.interceptors.response.use(
            (response: AxiosResponse & { config: CustomAxiosRequestConfig }) => {
                const { data, config } = response;
                axiosCanceler.removePending(config);
                // 登录失效,提示用户后跳转到登录页面
                if (data.code == 401) {
                    if (!MessageBox_401_show) {
                        MessageBox_401_show = true
                        ElMessageBox.confirm('当前用户已被登出或无权限访问当前资源，请尝试重新登录后再操作。', '无权限访问', {
                            type: 'error',
                            closeOnClickModal: false,
                            center: true,
                            confirmButtonText: '重新登录',
                            beforeClose: (_action, _instance, done) => {
                                MessageBox_401_show = false
                                done()
                            }
                        }).then(() => {
                            router.replace({ path: '/login' });
                        }).catch(() => { })
                    }
                    return Promise.reject(data);
                }
                // 全局错误信息拦截（防止下载文件的时候返回数据流，没有 code 直接报错）
                if (data.code && data.code !== 200) {
                    ElNotification.error({
                        title: '请求错误',
                        message: data.message || `Status:${data.code}，未知错误！`
                    });
                    return Promise.reject(data);
                }
                // 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
                return data;
            },
            async (error: AxiosError) => {
                const { response } = error;
                // 请求超时 && 网络错误单独判断，没有 response
                if (error.message.indexOf("timeout") !== -1) ElNotification.error("请求超时！请您稍后重试");
                if (error.message.indexOf("Network Error") !== -1) ElNotification.error("网络错误！请您稍后重试");
                // 根据服务器响应的错误状态码
                if (response) ElNotification.error("服务器错误");
                // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
                if (!window.navigator.onLine) router.replace("/500");
                return Promise.reject(error);
            }
        );
    }

    /**
     * @description 常用请求方法封装
     */
    get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
        return this.service.get(url, { params, ..._object });
    }
    post<T>(url: string, params?: object | string, _object = {}): Promise<ResultData<T>> {
        return this.service.post(url, params, _object);
    }
    put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
        return this.service.put(url, params, _object);
    }
    delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
        return this.service.delete(url, { params, ..._object });
    }
    download(url: string, params?: object, _object = {}): Promise<BlobPart> {
        return this.service.post(url, params, { ..._object, responseType: "blob" });
    }
}

export default new RequestHttp(config);
