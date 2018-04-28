import { Browser } from './browser.js';
// import Promise from 'promise-polyfill';

function getVersion(version) {
  let nv = '';
  if (version.indexOf('.') > -1) {
    nv = version.split('.')[0];
  } else {
    nv = version;
  }
  return nv - 0;
}

function createElement(info) {
  let dom = document.getElementById('app');
  dom.innerHTML = `
<div class="fuckIE-mook">
    <div class="bg">
        <div class="box">
            <div class="title">亲，您的浏览器过时啦！！！</div>
            <p class="p">您当前使用的是：<span class="color">${info.browser}浏览器</span>，内核：<span class="color">${info.engine}</span>，版本号：<span class="color">${info.version}</span></p>
            <p class="p">很不幸，您的浏览器不能完全支持我们的技术，建议您升级浏览器，或者使用下方推荐的浏览器来体验本站。</p>
            <p class="tip">Tip： 如果您使用的是浏览器的兼容模式（兼容模式运行的是低版本的IE内核），请切换到极速模式。</p>
            <div class="brower">
                <img src="https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/common/img/brower.png" />
            </div>
        </div>
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
        font-family: "微软雅黑";
    }
    .fuckIE-mook .bg {
        width: 700px;
        height: 390px;
        background: rgba(0,0,0,0.5);
        background: linear-gradient(45deg, #ff534d, #e9f01d, #9966cc, #00ff80, #82a6f5, #ff534d);
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        padding: 5px;
        box-sizing: border-box;
    }
    .fuckIE-mook .bg .box {
        width: 100%;
        height: 100%;
        background: #fff;
        padding: 30px 50px;
        box-sizing: border-box;
    }
    .fuckIE-mook .bg .box .title {
        font-size: 20px;
        text-align: center;
        margin-bottom: 20px;
    }
    .fuckIE-mook .bg .box .p {
        line-height: 25px;
        margin: 10px 0;
        text-indent: 32px;
        font-size: 16px;
    }
    .fuckIE-mook .bg .box .tip {
        line-height: 20px;
        margin: 10px 0;
        text-indent: 30px;
        font-size: 14px;
        color: orange;
    }
    .fuckIE-mook .bg .box .p .color {
        color: #ff534d;
    }

    .fuckIE-mook .bg .box .brower {
        width: 100%;
    }
    .fuckIE-mook .bg .box .brower img {
        display: block;
        margin: 0 auto;
    }
</style>


    `;
}
export default (options) => {
  let status = true;
  let info = new Browser();
  if (options[info.browser]) {
    if (getVersion(info.version) <= options[info.browser]) status = false;
  }
  if (!status) createElement(info);
  return status
};

// promise 写法 待完善
// export default (options) => {
//   return new Promise((resolve, reject) => {
//     let status = true;
//     let info = new Browser();
//     if (options[info.browser]) {
//       if (getVersion(info.version) <= options[info.browser]) status = false;
//     }
//     // if (!status) createElement(info);
//     // return status;
//     if (status) resolve();
//     else {
//       reject(() => {
//         createElement(info);
//       });
//     }
//   })
// };
