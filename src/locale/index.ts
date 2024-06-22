import { createI18n } from 'vue-i18n'
import { useSysGlobalStore } from "@/store/system/global";
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import enCn from 'element-plus/es/locale/lang/en'

import zh_cn from './lang/zh-cn'
import en from './lang/en'
import { Pinia } from 'pinia';

const messages = {
    'zh-cn': {
        ...zhCn,
        ...zh_cn
    },
    'en': {
        ...enCn,
        ...en
    }
}

const i18n = (pinia: Pinia) => {
    const sysGlobalStore = useSysGlobalStore(pinia);
    return createI18n({
        legacy: false,
        locale: sysGlobalStore.sysLang,
        fallbackLocale: 'zh-cn',
        globalInjection: true,
        messages,
    });
}
export default i18n;