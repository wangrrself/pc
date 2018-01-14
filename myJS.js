/**
 * Created by jasin on 2017/10/25.
 */
//子页面的切换函数--changeSub()
//changeSub(index,id1,id2,id3,di4)
function changeSub(index, s1, s2, s3, s4) {
	var s1 = plus.webview.getWebviewById('s1');
	var s2 = plus.webview.getWebviewById('s2');
	var s3 = plus.webview.getWebviewById('s3');
	var s4 = plus.webview.getWebviewById('s4');
	//涉及到算法了
	s1.setStyle({
		left: (0 - index) * 100 + '%'
	});
	s2.setStyle({
		left: (1 - index) * 100 + '%'
	});
	s3.setStyle({
		left: (2 - index) * 100 + '%'
	});
	s4.setStyle({
		left: (3 - index) * 100 + '%'
	});
}

//页面的滑动--s1,s2,s3 就是页面的ID
function pageSlide(s1, s2, s3, s4) {
	//获取所有页面
	var arr = [];
	arr[0] = plus.webview.getWebviewById(s1);
	//arr[0] = plus.webview.currentWebview();
	//arr[0] = plus.webview.getLaunchWebview();
	arr[1] = plus.webview.getWebviewById(s2);
	arr[2] = plus.webview.getWebviewById(s3);
	arr[3] = plus.webview.getWebviewById(s4);
	console.log(arr[0]);
	console.log(arr[1]);
	console.log(arr[2]);
	console.log(arr[3]);

	arr[0].drag({
		direction: 'left',
		moveMode: 'followFinger'
	}, {
		view: arr[1],
		moveMode: 'follow'
	}, function(e) {
		//回调函数,滑动成功,就执行--图标的同步
		if(e.type == 'end' && e.result) {
			var as = document.querySelectorAll('nav a');
			for(var i = 0; i < 4; i++) {
				as[i].classList.remove('mui-active');
			}
			as[1].classList.add('mui-active');
		}
	});

	arr[1].drag({
		direction: 'left',
		moveMode: 'followFinger'
	}, {
		view: arr[2],
		moveMode: 'follow'
	}, function(e) {
		//回调函数
		if(e.type == 'end' && e.result) {
			var as = document.querySelectorAll('nav a');
			for(var i = 0; i < 4; i++) {
				as[i].classList.remove('mui-active');
			}
			as[2].classList.add('mui-active');
		}
	});
	arr[1].drag({
		direction: 'right',
		moveMode: 'followFinger'
	}, {
		view: arr[0],
		moveMode: 'follow'
	}, function(e) {
		if(e.type == 'end' && e.result) {
			var as = document.querySelectorAll('nav a');
			for(var i = 0; i < 4; i++) {
				as[i].classList.remove('mui-active');
			}
			as[0].classList.add('mui-active');
		}
	});
	arr[2].drag({
		direction: 'left',
		moveMode: 'followFinger'
	}, {
		view: arr[3],
		moveMode: 'follow'
	}, function(e) {
		if(e.type == 'end' && e.result) {
			var as = document.querySelectorAll('nav a');
			for(var i = 0; i < 4; i++) {
				as[i].classList.remove('mui-active');
			}
			as[3].classList.add('mui-active');
		}
	});
	arr[2].drag({
		direction: 'right',
		moveMode: 'followFinger'
	}, {
		view: arr[1],
		moveMode: 'follow'
	}, function(e) {
		if(e.type == 'end' && e.result) {
			var as = document.querySelectorAll('nav a');
			for(var i = 0; i < 4; i++) {
				as[i].classList.remove('mui-active');
			}
			as[1].classList.add('mui-active');
		}
	});
	arr[3].drag({
		direction: 'right',
		moveMode: 'followFinger'
	}, {
		view: arr[2],
		moveMode: 'follow'
	}, function(e) {
		if(e.type == 'end' && e.result) {
			var as = document.querySelectorAll('nav a');
			for(var i = 0; i < 4; i++) {
				as[i].classList.remove('mui-active');
			}
			as[2].classList.add('mui-active');
		}
	})
}

//微信的分享功能
/*
 * 参数data1---->就是之前请求数据返回的data
 * */
function share(data1, index) { //使用这一步的时候,需要添加权限
	plus.share.getServices(function(s) {
		//console.log(JSON.stringify(s));
		var wxshare = null;
		//从返回的服务中遍历寻找微信服务
		for(var k in s) {
			if(s[k].id == 'weixin') {
				wxshare = s[k];
			}
		}
		//console.log('看看对象获取成功没有' + JSON.stringify(wxshare));
		//如果没有匹配到微信服务,执行
		if(wxshare == null) {
			mui.toast('微信服务找不到了大侠');
			//之后,就不往下执行了--函数到此为止
			return false;
		}
		//发送的内容--就是title和content(分享的链接)
		console.log('data1是个什么' + data1);
		var msg = { //这里是字符串码???
			title: data1.title,
			content: '这是主体部分',
			href: 'http://www.baidu.com'
		};
		if(index == 1) {
			//微信朋友
			msg.extra = {
				scene: "WXSceneSession"
			}

		} else if(index == 2) {
			//朋友圈
			msg.extra = {
				scene: "WXSceneTimeline"
			}
		} else {

		}

		//微信分享,发送内容
		wxshare.send(msg, function(s) {
			mui.toast('分享成功');
		}, function(e) {
			mui.toast('分享或者取消分享')
		});

	}, function(e) {
		console.log('失败' + e);
	})
}

//刷新模块-----使用page来标记到了几页(主页需要有一个全局)
//下拉刷新
function getList() { //就是一个动态获取数据的过程
	page = 1;
	console.log(page);
	mui.ajax('http://hoa.hcoder.net/index.php?user=hcoder&pwd=hcoder&m=mediaList&page=' + page, {
		//dataType:'json',
		type: 'GET', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			console.log(typeof data); //data是字符串
			data = data.split('--hcSplitor--');
			var str = '';
			for(var i = 0; i < data.length; i++) {
				data[i] = data[i].split('--hcListSplitor--');
				str += '<li class="mui-table-view-cell mui-media"><a href="javascript:;"><img class="mui-media-object mui-pull-right"src="' + data[i][1] + '"><div class="mui-media-body"><span>ID:' + data[i][0] + '</span><p class="mui-ellipsis">' + data[i][2] + '</p><p class="mui-ellipsis">' + data[i][3] + '</p></div></a></li>'
			}
			mui('#dataList')[0].innerHTML = str;
			mui('#refreshContainer').pullRefresh().endPulldownToRefresh();

			//重置上拉加载
			mui('#refreshContainer').pullRefresh().refresh(true);
			page++;
		},
		error: function(xhr, type, errorThrown) {
			mui.toast('下拉错误');
		}
	});
	var lis = document.querySelectorAll('#dataList li');
	for(var i = 0; i < lis.length; i++) {
		lis[i].index = i;
	}
}
//上拉加载
function getMore() {
	var _self = this;
	mui.ajax('http://hoa.hcoder.net/index.php?user=hcoder&pwd=hcoder&m=mediaList&page=' + page, {
		type: 'GET', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			console.log(data);
			console.log(typeof data);
			if(data == 'null') {
				_self.endPullupToRefresh(true); //结束上拉加载的动作
				return false;
			}
			data = data.split('--hcSplitor--');
			for(var i = 0; i < data.length; i++) {
				data[i] = data[i].split('--hcListSplitor--');
				var addLi = document.createElement('li');
				addLi.className = 'mui-table-view-cell mui-media';
				//addLi.setAttribute('class','mui-table-view-cell mui-media')
				//addLis.classList.add("class", "mui-table-view-cell", "mui-media")
				addLi.innerHTML = '<a href="javascript:;"><img class="mui-media-object mui-pull-right"src="' + data[i][1] + '"><div class="mui-media-body"><span>ID:' + data[i][0] + '</span><p class="mui-ellipsis">' + data[i][2] + '</p><p class="mui-ellipsis">' + data[i][3] + '</p></div></a>';
				mui('#dataList')[0].appendChild(addLi);
			}
			_self.endPullupToRefresh(false); //显示加载跟多按钮
			page++;
		},
		error: function(xhr, type, errorThrown) {
			mui.toast('上拉错误');
		}
	});
	var lis = document.querySelectorAll('#dataList li');
	for(var i = 0; i < lis.length; i++) {
		lis[i].index = i;
	}
}

//微信登录函数
/*
 * 注意:HTML代码结构   是mt-列表格式
 * */
function wxLogin() {
	//获得服务列表--好像又要配置服务了(妈的)
	plus.oauth.getServices(function(s) {
		//遍历匹配服务
		for(var k in s) {
			if(s[k].id == 'weixin') {
				var weixinObj = s[k]; //这里为什么要var呢??
			}
		}
		//如果没有匹配到服务--报错,终止程序
		if(!weixinObj) {
			mui.toast('没有找到微信服务');
			return false;
		}
		//微信服务对象的login方法
		weixinObj.login(function(res) {
			//获取微信的个人数据
			var unionid = weixinObj.authResult.unionid;
			//userInfo---这个u不是大写(编辑器的提示看错了-是第二个)
			var uface = weixinObj.userInfo.headimgurl;
			var uname = weixinObj.userInfo.nickname;
			//获得的数据展示到页面
			mui('#name')[0].innerHTML = uname;
			mui('#face')[0].src = uface;
			//将数据放送给后台
			mui.post('http://hoa.hcoder.net/index.php?c=members&m=addByWx', { //向服务器发送数据
				openid: unionid,
				nickname: uname
			}, function(data) {
				//接收数据,存到本地---说明你已经登陆了

				data = JSON.parse(data);
				console.log('获取的数据' + typeof data)

				var uid = data.id;
				var urand = data.randnumber;
				//存储--转换为字符串类型
				plus.storage.setItem('uid', uid + '');
				plus.storage.setItem('urand', urand + '');
				plus.storage.setItem('uname', uname + '');
				plus.storage.setItem('uface', uface + '');

				mui.toast('登录成功了少侠');
				console.log('登录成功了少侠');
			});
		}, function(e) {
			mui.toast('微信登录认证服务失败')
		})
	}, function(e) {
		mui.toast('找不见微信服务了');
		console.log('找不见微信服务了');
	});
}

function logOut() {
	plus.oauth.getServices(function(services) {
		//在服务列表里面匹配
		for(var key in services) {
			if(services[key].id == 'weixin') {
				var weixinObj = services[key];
			}
		}
		if(!weixinObj) {
			mui.toast('未获取到微信服务');
			//return false;
		}
		weixinObj.logout(function() {
			plus.storage.removeItem('uid');
			plus.storage.removeItem('uname');
			plus.storage.removeItem('uface');
			plus.storage.removeItem('urand');

			mui.toast('退出成功');
			mui('#name')[0].innerHTML = '未登录';
			mui('#face')[0].src = '';
			//获取对象
		}, function(e) {
			mui.toast('退出失败' + e.message);
		})

	}, function(e) {
		mui.toast('获取服务列表失败' + e.message + '--' + e.code);
	})
}

function myLogout() {
	plus.storage.removeItem('uid');
	plus.storage.removeItem('uname');
	plus.storage.removeItem('uface');
	plus.storage.removeItem('urand');

	mui('#name')[0].innerHTML = '未登录';
	mui('#face')[0].src = '';
}

/* QQ分享开始 */
function setMSG(index,data1) {
	//msg的设置
	msg = { //这里是字符串码???
		title: data1.title,
		content:  data1.title,
		href: 'http://www.baidu.com'
	};
	if(index == 1) {
		//微信朋友
		msg.extra = {
			scene: "WXSceneSession"
		}

	} else if(index == 2) {
		//朋友圈
		msg.extra = {
			scene: "WXSceneTimeline"
		}
	} else if(index == 3) {
		//index
		msg.extra = {
			scene: null
		}
	}
}

//寻找服务
function serve(index) {
	var myShare = null;
	plus.share.getServices(function(s) {
		console.log(JSON.stringify(s));
		if(index == 3) {
			for(var k in s) {
				if(s[k].id == 'qq') {
					myShare = s[k];
				}
			}

		} else {
			for(var k in s) {
				if(s[k].id == 'weixin') {
					myShare = s[k];
				}
			}
		}
		console.log(myShare);
		console.log(JSON.stringify(myShare));
		send(myShare)

	}, function(e) {
		console.log('获取服务的过程中失败了大哥' + e);
	})
}

//发送信息
function send(myShare) {
	console.log('外层的:share' + myShare);
	if(myShare == null) {
		mui.toast('没有找到服务');
		return false;
	}
	myShare.send(msg, function(s) {
		mui.toast('分享成功');
	}, function(e) {
		mui.toast('分享失败或者取消分享')
	})
}
/* QQ分享结束 */