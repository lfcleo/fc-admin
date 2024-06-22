interface CompressImageParams {
    width?: number;     // 图片宽度，
    height?: number;    // 图片高度
    quality: number;    // 图片质量，0-1之间小数
    fileObj: any;       // 要压缩的文件
}

/**
 * @description: 压缩图片
 * @param {CompressImageParams} params
 */
export function compressImg(params: CompressImageParams) {
    return new Promise((resolved, reject) => {
        // 定义默认输出图片类型
        let type = 'image/png'
        // 创建image对象
        const image = new Image()
        // 这里做了个判断，可以直接传入图片地址。
        if (typeof (params.fileObj) === "object") {
            image.src = window.URL.createObjectURL(params.fileObj as MediaSource)
            // 携带原类型type
            params.fileObj.type && (type = params.fileObj.type)
        } else {
            image.src = params.fileObj
        }
        image.onload = function () {
            let w = params.width ? params.width : image.width       // 当前图片宽
            let h = params.height ? params.height : image.height    // 当前图片高
            const canvas = document.createElement('canvas')         // 创建一个canvas
            const ctx = canvas.getContext('2d')                     // 获取绘图环境
            // 创建属性节点
            const anw = document.createAttribute('width')
            anw.nodeValue = w.toString()
            const anh = document.createAttribute('height')
            anh.nodeValue = h.toString()
            canvas.setAttributeNode(anw)
            canvas.setAttributeNode(anh)
            // 设置图片
            ctx?.drawImage(image, 0, 0, w, h)
            // canvas转换字节流并设置质量
            const data = canvas.toDataURL(type, params.quality)
            // 拿到了base64后，可根据需求转成file或者blob
            // base64转换为file对象
            const newFile = dataURLtoFile(data, params.fileObj.name)
            resolved(newFile)
        }

        image.onerror = function () {
            // 失败
            reject(false)
        }
    })
}


/**
* @description: base64转file对象
* @param {*} dataurl
* @param {*} filename
*/
function dataURLtoFile(dataurl: string, filename: string = Date.now().toString()) {
    let arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)?.[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}