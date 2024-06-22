export default {
    // hex颜色转rgb颜色
    HexToRgb(str: string): number[] {
        str = str.replace("#", "");
        const hxs = str.match(/../g)?.map((v) => parseInt(v, 16));
        if (!hxs || hxs.length !== 3) throw new Error("Invalid hex color format.");
        return hxs as number[];
    },

    // rgb颜色转hex颜色
    RgbToHex(a: number, b: number, c: number): string {
        const hexs = [a.toString(16), b.toString(16), c.toString(16)].map((hex) => hex.padStart(2, '0'));
        return "#" + hexs.join("");
    },

    //加深
    darken(color: string, level: number): string {
        var rgbc = this.HexToRgb(color)
        for (var i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level))
        return this.RgbToHex(rgbc[0], rgbc[1], rgbc[2])
    },
    //变淡
    lighten(color: string, level: number): string {
        var rgbc = this.HexToRgb(color)
        for (var i = 0; i < 3; i++) rgbc[i] = Math.floor((255 - rgbc[i]) * level + rgbc[i])
        return this.RgbToHex(rgbc[0], rgbc[1], rgbc[2])
    }
} as const;