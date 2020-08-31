let querystring = require('querystring');
/**
 * 模拟一个Kotlin加载器
 */
function custom_loader(file_content) {
    // console.log(this); // 可以通过this关键字访问Webpack Loader API
    console.log('请求', this.request);
    console.log("加载器查询字符串", this.query);
    console.log('资源路径', this.resourcePath);
    console.log('资源查询字符串', this.resourceQuery);
    console.log({ '编译Kotlin': file_content }); // 需要处理的文件内容通过形式参数传递

    // 模拟编译过程
    let match = file_content.match(/.*fun\s+main\(.*\)\s*{\r?\n?(.*)\r?\n?}.*/)[1];
    let code = match.replace('println', 'console.log');

    let id = querystring.parse(this.resourceQuery.replace('?', '')).button_id;
    return `
        // import $ from 'jquery'; // 可以使用ES6 Module语法引用模块, 可以被Webpack选项externals排除

        let button = globalThis['${id}']; // 通过资源查询字符串指定的按钮ID为按钮绑定点击监听器
        button.addEventListener('click', () => {
            ${code};
        });
        export default 'Kotlin Compiled!'; // 默认导出
    `;
}
module.exports = custom_loader;