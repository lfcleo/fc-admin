import { type UserConfigExport, type ConfigEnv, loadEnv } from "vite";
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import type { ComponentResolveResult } from "unplugin-vue-components/types";
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default ({ mode }: ConfigEnv): UserConfigExport => {
    const env = loadEnv(mode, process.cwd());
    return {
        base: './',
        plugins: [
            vue(),
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                dts: true,
                resolvers: [
                    (name: string): ComponentResolveResult | null => {
                        if (name.startsWith('fc')) {
                            return { name: name.toLowerCase(), from: `@/components/${name.toLowerCase()}` };
                        }
                    },
                    ElementPlusResolver(),
                ],
            }),
        ],
        resolve: {
            alias: {
                "@": resolve(__dirname, "./src"),
            },
            extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
        },
        server: {
            host: "0.0.0.0",
            port: Number(env.VITE_VUE_APP_PORT),
            open: true,
            proxy: {
                //可配置多个代理
                "/apiv1": {
                    target: env.VITE_VUE_APP_API_BASEURL,
                    secure: false,   // 是否https接口
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/apiv1/, ""),
                }
            },
            warmup: {
                clientFiles: ["./index.html", "./src/{views,components}/*"]
            }
        },
        build: {
            rollupOptions: {
                output: {
                    entryFileNames: `assets/[name].[hash].js`,
                    chunkFileNames: `assets/[name].[hash].js`,
                    assetFileNames: `assets/[name].[hash].[ext]`,

                }
            },
        }
    };
};