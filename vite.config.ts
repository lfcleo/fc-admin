import { type UserConfigExport, type ConfigEnv, loadEnv, ProxyOptions } from "vite";
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
            port: Number(env.VITE_VUE_PORT),
            open: true,
            cors: true,
            proxy: createProxy(JSON.parse(env.VITE_PROXY || '[]')),
            warmup: {
                clientFiles: ["./index.html", "./src/{views,components}/*"]
            }
        },
        build: {
            outDir: "dist",
            minify: "esbuild",
            // esbuild 打包更快，但是不能去除 console.log。terser打包慢，但能去除 console.log，正式环境建议使用
            // minify: "terser",
            // terserOptions: {
            // 	compress: {
            // 		drop_console: viteEnv.VITE_DROP_CONSOLE,
            // 		drop_debugger: true
            // 	}
            // },
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


type ProxyItem = [string, string];

type ProxyList = ProxyItem[];

type ProxyTargetList = Record<string, ProxyOptions>;
/**
 * 创建代理，用于解析 .env.development 代理配置
 * @param list
 */
function createProxy(list: ProxyList = []) {
    const ret: ProxyTargetList = {};
    for (const [prefix, target] of list) {
        const httpsRE = /^https:\/\//;
        const isHttps = httpsRE.test(target);

        // https://github.com/http-party/node-http-proxy#options
        ret[prefix] = {
            target: target,
            changeOrigin: true,
            ws: true,
            rewrite: path => path.replace(new RegExp(`^${prefix}`), ""),
            // https is require secure=false
            ...(isHttps ? { secure: false } : {})
        };
    }
    return ret;
}