/**
 * @description 生成唯一 uuid
 * @return string
 */
export function generateUUID() {
    if (typeof crypto === "object") {
        if (typeof crypto.randomUUID === "function") {
            return crypto.randomUUID();
        }
        if (typeof crypto.getRandomValues === "function" && typeof Uint8Array === "function") {
            const callback = (c: any) => {
                const num = Number(c);
                return (num ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))).toString(16);
            };
            return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, callback);
        }
    }
    let timestamp = new Date().getTime();
    let performanceNow = (typeof performance !== "undefined" && performance.now && performance.now() * 1000) || 0;
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        let random = Math.random() * 16;
        if (timestamp > 0) {
            random = (timestamp + random) % 16 | 0;
            timestamp = Math.floor(timestamp / 16);
        } else {
            random = (performanceNow + random) % 16 | 0;
            performanceNow = Math.floor(performanceNow / 16);
        }
        return (c === "x" ? random : (random & 0x3) | 0x8).toString(16);
    });
}
