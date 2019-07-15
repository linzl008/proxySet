// 基准大小
const baseSize = 100
// 设置 rem 函数
function setRem () {
  if(document.documentElement.clientWidth > 1366){
    var  documentwidth = document.documentElement.clientWidth;
  }else{
    var documentwidth = 1366;
  }
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  const scale = documentwidth / 1920
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
}
// 初始化
setRem() ;
// 改变窗口大小时重新设置 rem
window.onresize =  ()=> {
  setRem()
}
/*
window.resizeList = [];
window.myOnresize =  function(cb) {
  window.resizeList.push(cb);
  window.addEventListener('resize',()=>{
    var target = this;
    if (target.resizeFlag) {
      clearTimeout(target.resizeFlag);
    }
    target.resizeFlag = setTimeout(function() {
      for (var i = 0; i < window.resizeList.length; i++) {
        var tempCb = window.resizeList[i];
        tempCb && tempCb()
      }
      cb && cb()
      target.resizeFlag = null;
    }, 100);
  })

}
window.myOnresize(setRem);*/
