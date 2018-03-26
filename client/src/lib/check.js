import {Browser} from './browser.js';

function getVersion (version) {
    let nv = '';
    if (version.indexOf('.') > -1) {
        nv = version.split('.')[0];
    } else {
        nv = version;
    }
    return nv - 0;
}

function createElement (info) {
    let dom = document.getElementById('app');
    dom.innerHTML = `
<div class="fuckIE-mook">
    <div class="box">
        <div class="title">亲，您的浏览器过时啦！！！</div>
        <p class="p">您当前使用的是：${info.browser}浏览器，内核：${info.engine}，版本号：${info.version}</p>
    </div>
</div>
<style>
    .fuckIE-mook {
        width: 100%;
        height: 100%;
        background: #ddd;
        position: fixed;
        top: 0;
        left: 0;

    }
    .fuckIE-mook .box {
        width: 700px;
        height: 300px;
        background: #fff;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        padding: 30px 50px;
        box-sizing: border-box;
    }
    .fuckIE-mook .box .title {
        font-size: 30px;
        text-align: center;
    }
</style>


    `;
}
export default function (options) {
    let status = true;
    let info = new Browser();
    console.log(info);
    if (options[info.browser]) {
        if (getVersion(info.version) < options[info.browser]) status = false;
    }
    if (!status) createElement(info);
    return status;
};