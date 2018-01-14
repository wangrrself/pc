<?php
	//清除默认报错的信息
	error_reporting(0);
	//获得用户登录的账号密码
	$name = $_POST["useLoginName"];
	$pass = $_POST["useLoginPass"];
	//开始php对数据库的操作
	header('Content-Type:text/html;charset=utf-8');
	$servername = "localhost";
	$username = "root";
	$password = "940314";
	$dbname = "dressing";		 
	$conn = mysqli_connect($servername, $username, $password, $dbname);
	// 检测连接
	if (!$conn) {
    	die("连接失败: " .mysqli_connect_error());
	}else{
		mysql_query("SET NAMES `UTF-8`");
		$sql = "select * from users where (username='".$name."') and (userpass='".$pass."')";

		$result = mysqli_query($conn, $sql);

		if (mysqli_num_rows($result) > 0) {
			echo "right";
		}else{
			echo "error";
		}
	}
	$conn->close();		
?>
