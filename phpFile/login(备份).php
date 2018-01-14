<?php
	//清除默认报错的信息
	error_reporting(0);
	//获得用户登录的账号密码
	$name = $_POST["useLoginName"];
	$pass = $_POST["useLoginPass"];
	//开始php对数据库的操作
	header('Content-Type:text/html;charset=utf-8');
	// Session需要先启动。
	$servername = "localhost";
	$username = "qdm108781507";
	$password = "19940314";
	$dbname = "qdm108781507_db";		 
	$conn = mysqli_connect($servername, $username, $password,$dbname);
		// 检测连接
	if ($conn->connect_error) {
	    die("连接失败:".$conn->connect_error);
	    echo "连接失败";
	} 
	mysql_query("SET NAMES `UTF-8`");
	mysql_query("alter database qdm108781507_db character set utf8");
	mysql_query("insert into users(username,userpass,useremail) values('18435205040','123456','45156@qq.com')");
	
	$sql = "select * from users where (username='".$name."') and (userpass='".$pass."')";
	$result = mysql_query($conn, $sql);
	mysql_query("SET NAMES `UTF-8`");
	mysql_query("alter database qdm108781507_db character set utf8");
	mysql_query("SET character_set_server = utf8;");
	if (mysql_num_rows($result) > 0) {
		echo "right";
	}else{
		echo "error";
	}
	mysql_query("SET NAMES `UTF-8`");
	mysql_query("alter database qdm108781507_db character set utf8");
	mysql_query("SET character_set_server = utf8;");
	$conn->close();		
?>
