/**
 * Created by jasin on 2017/11/18.
 */

//处理鼠标滚轮,并处理兼容
function scrollFunc(e){
    e=e || window.event;
    var ifNum = null;					//用来检测是向上滚轮还是向下
    if(e.wheelDelta){					//IE/Opera/Chrome 
        e.wheelDelta;
        //console.log(e.wheelDelta);
        if(e.wheelDelta>0){				//向上滑动滚轮   即是向右移动图
            ifNum = 1;
            moveBg(ifNum);              	//调用滑动函数
        }else{							//向下滑动滚轮   即是向左移动图
            ifNum = -1;
            moveBg(ifNum);					//调用滑动函数
        }
    }else if(e.detail){					//Firefox 
        e.detail;
        //console.log(e.detail);
        if(e.detail>0){					//向上滑动滚轮   即是向右移动图
            ifNum = 1;
            moveBg(ifNum);					//调用滑动函数
        }else{							//向下滑动滚轮   即是向左移动图
            ifNum = -1;
            moveBg(ifNum);					//调用滑动函数
        }
    }
}
if(document.addEventListener){
    document.addEventListener('DOMMouseScroll',scrollFunc,false);
}//W3C 
window.onmousewheel=document.onmousewheel=scrollFunc;//IE/Opera/Chrome 	
/*-------------------------------封装函数(仅适用本页面,抓取对象在函数中.嘻嘻嘻)---------------------------------------*/
//3.设置每次滑动的距离
var moveDis = 0;
function moveBg(num){
    //1.开始抓取对象,刚开始写,不知道用的到用不到,先写着看
    var $innerBox = $(".innerBox");			//抓取innerBox对象
    var $infoDiv  = $(".infoDiv");			//抓取infoDiv对象
    var $infoOnfont  = $(".infoOnfont");			//抓取infoDiv对象
    //4.获取视口,控制滑动的距离
//			var clientDis = document.body.offsetWidth;
    var clientDis = $infoDiv[0].clientWidth;
    //console.log(clientDis);
    //2.对传入的参数num进行判断,向上滑动鼠标滚轮还是向下滑动滚轮,并分别做事件处理
    if(num>0){//即传入参数为正,即滚轮向下--->向左移动innDiv里面的内容
        moveDis += 33;
        console.log(moveDis);
        //5.将滑动距离控制在innerDiv的框内
        if(moveDis <= 0){
            $infoDiv.css({"transform":"translate3d("+moveDis+"px,0px,-500px)","transition":"0.5s linear"});
            $infoOnfont.css({"transform":"translate3d("+(moveDis-5)+"px,0px,-300px)","transition":"0.5s linear"});
        }else{
            moveDis = 0;
        }
        //$infoDiv.css({"transform":"translate3d("+moveDis+"px,0px,0px)","transition":"0.5s"});
    }else{//即传入参数为正,即滚轮向下--->向左移动innDiv里面的内容
        moveDis -= 33;
        console.log(moveDis);
        //5.将滑动距离控制在innerDiv的框内
        if(Math.abs(moveDis) <= clientDis*3){
            $infoDiv.css({"transform":"translate3d("+moveDis+"px,0px,-500px)","transition":"0.5s linear"});
            $infoOnfont.css({"transform":"translate3d("+(moveDis-5)+"px,0px,-300px)","transition":"0.5s linear"});
        }else{
            moveDis = -clientDis*3;
            return false;
        }
        //$infoDiv.css({"transform":"translate3d("+moveDis+"px,0px,0px)","transition":"0.5s"});
    }
}
