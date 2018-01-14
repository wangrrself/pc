/**
 * Created by jasin on 2017/11/14.
 */
//header的设置
var content = document.querySelector('header .jkj-content');
/*content.addEventListener('mousemove', function (e) {*/
content.onmousemove=function (e) {
    var origin = {
        X: document.body.clientWidth / 2,
        Y: document.body.clientHeight / 2
    };
    //设置旋转角度  旋转中心可以不设置吧
    var rotate = {
        rotateX: 10 * (1 - e.pageY / origin.Y ),
        rotateY: 10 * (e.pageX / origin.X - 1)
    };
    //赋值---设置样式
    content.style.webkitTransform = 'translateZ(20px) rotateY(' + rotate.rotateY + 'deg)  rotateX(' + rotate.rotateX + 'deg)';
    content.style.Transform = 'translateZ(20px) rotateY(' + rotate.rotateY + 'deg)  rotateX(' + rotate.rotateX + 'deg)';
    //设置阴影的效果
    content.style.boxShadow = -parseInt(rotate.rotateY * 5) + 'px ' + parseInt(rotate.rotateX * 5) + 'px ' + '30px #555';
};
/*content.addEventListener('mouseout', function () {*/
content.onmouseout= function () {
    content.style.webkitTransform = 'translateZ(20px) rotateY(' + 0 + ')  rotateX(' + 0 + ')';
    content.style.Transform = 'translateZ(20px) rotateY(' + 0 + ')  rotateX(' + 0 + ')';
    content.style.boxShadow = '';
};


//这是打字的效果  setTimeOut
var textContent = document.querySelector('.extrude');
var str = '生命的化妆,我欠你一份嫁妆!!';
var i = 0;
pressKey();
function pressKey() {
    setTimeout(function () {
        textContent.innerHTML = str.slice(0, i++) + '_';
        pressKey();
        if (i == str.length) {
            textContent.innerHTML = str;
            i=0;
            /*return false;*/
        }
    }, 200)
}

//吸顶条效果的实现
console.log(screen.height+"这个是screen.height");
var topNav = document.getElementById('jkj-topNav');
var contentTop = screen.height;
var goTop=document.getElementById('jkj-goTop');
//console.log(divT);
window.onresize=function () {

}



window.onscroll = function () {
    // 获取当前页面的滚动条纵坐标位置 （依次为火狐谷歌、safari、IE678）
    var scrollT = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    /*if (scrollT >= contentTop) {*/
    if (scrollT >= 100) {
        //显示购物车的图标
        document.querySelector(".shopItem").style.display='inline-block';


        topNav.style.position = 'absolute';   //不可以使用 fixed的方法
        topNav.style.top = scrollT+'px';
        topNav.style.left = 0;
        topNav.style.minWidth = '1300px';
        topNav.style.borderBottom = '1px solid #DADADA';

        topNav.style.background = 'linear-gradient(to bottom, #FDFDFD 0%, #F7F7F7 50%, #F2F2F2 100%)';
        topNav.style.webkitBackgroundImage = 'linear-gradient(to bottom, #FDFDFD 0%, #F7F7F7 50%, #F2F2F2 100%)';
        topNav.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(  src='',  sizingMethod='scale')";
        goTop.style.display='block';
    } else {
        document.querySelector(".shopItem").style.display='none';

        topNav.style.position = '';
        topNav.style.background = '';
        goTop.style.display='none';
    }
};



//轮播图部分代码
var imgContent = document.querySelector('section.jkj-lunbo .content');
var translateX = 0;// 全局变量---设置移动的距离
imgContent.innerHTML += imgContent.innerHTML;  //添加一份儿
var imgs = document.querySelectorAll('section.jkj-lunbo  .content img');
var imgWidth = imgs[0].offsetWidth;
var index = 0;

function picMove() {
    translateX = index * imgWidth;
    imgContent.style.transform = 'translateX(' + translateX + 'px)';
    imgContent.style.webkitTransform = 'translateX(' + translateX + 'px)'
}

//自动轮播的实现
var timer = setInterval(lunbo,3000);
function lunbo() {
    //先清除延时
    imgContent.style.transition = '';
    //如果是第五页,直接跳第二页
    if (index == -7) {
        index = -3;
        picMove();
    }

    //切换页面,并且切换延时的页面
    setTimeout(function () {
        imgContent.style.transition = '.5s';
        index--;
        picMove();
        console.log(index);
    }, 30);

    function circle() {

    }
}
