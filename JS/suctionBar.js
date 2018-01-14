//吸顶条效果的实现
var topNav = document.getElementById('jkj-topNav');
window.onscroll = function () {
    // 获取当前页面的滚动条纵坐标位置 （依次为火狐谷歌、safari、IE678）
    var scrollT = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    /*if (scrollT >= contentTop) {*/
    if (scrollT >= 100) {
        //显示购物车的图标
        document.querySelector(".jkj-subMenu").style.display='inline-block';
        document.querySelector(".jkj-subMenu").style.display='inline-block';

        //设置为固定定位
        topNav.style.position = 'fixed';
        topNav.style.top = 0;
        topNav.style.left = 0;
        topNav.style.borderBottom = '1px solid #DADADA';

        topNav.style.background = 'linear-gradient(to bottom, #FDFDFD 0%, #F7F7F7 50%, #F2F2F2 100%)';
        topNav.style.webkitBackgroundImage = 'linear-gradient(to bottom, #FDFDFD 0%, #F7F7F7 50%, #F2F2F2 100%)';
        topNav.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(  src='',  sizingMethod='scale')";
    } else {
        document.querySelector(".jkj-subMenu").style.display='none';

        topNav.style.position = '';
        topNav.style.background = '';
    }
};
