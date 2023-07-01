export function getMessage(langs: Record<string, Record<string, any>>, prefix = 'lang') {
    let obj = {};
    Object.keys(langs).forEach((key) => {
        const langFileModule = langs[key].default;//获取到文件内容
        let fileName = key.replace(`./${prefix}/`, '').replace(/^\.\//, '');//获取文件名称
        const lastIndex = fileName.lastIndexOf('.'); //获取文件最终.后缀
        fileName = fileName.substring(0, lastIndex);
        const keyList = fileName.split('/'); //切割为数组
        const objKey = keyList.join('.');
        obj[objKey] = langFileModule || {}
    });
    return obj;
}