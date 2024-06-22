import SecureLS from 'secure-ls'
const ls = new SecureLS({
    encodingType: import.meta.env.VITE_LS_ENCRYPTION,
    isCompression: import.meta.env.VITE_LS_ENCRYPTION ? true : false,
    encryptionSecret: import.meta.env.VITE_LS_ENCRYPTION_KEY
})

export const SelfStorage = {
    setItem(key: any, value: any) {
        ls.set(key, value)
    },
    getItem(key: any) {
        return ls.get(key)
    }
}