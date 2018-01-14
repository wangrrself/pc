
$(function () {

    var endPositon = $("#icon-cart").offset(); //获取--设置终点的位置
    $(".shoppingFly").click(function (event) {   //事件的触发
        //抛物体对象
        var imgSrc = $(".dress_detail_img img").attr("src");
        console.log(imgSrc);
        var flyer = $('<img class="flyer-img" src=' + imgSrc + '>');
        //抛物体对象, 调用方法--并且传入参数
        flyer.fly({ //这个是按照鼠标的位置来的,所以出现了问题(暂时不解决)
            start: {
                left:event.pageX, //抛物体起点横坐标
                top: event.pageY////抛物体起点纵坐标
                //left:event.clientX , //抛物体起点横坐标
                //top: event.clientY  //抛物体起点纵坐标
            },
            end: {
                left: endPositon.left + 50, //抛物体终点横坐标
                top: endPositon.top + 10, //抛物体终点纵坐标
            },
            onEnd: function () {
                //成功加入购物车动画效果
                /* $("#tip").show().animate({width: '200px'}, 300).fadeOut(500);*/
                //销毁抛物体---就是被抛的图片
                this.destory();
                console.log("销毁了????")
            }
        });
    });
});
