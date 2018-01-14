<?php
	//清除默认报错的信息
	error_reporting(0);
	//接受注册后的账号,密码,邮箱
	$name = $_POST["usePhone"];
	$pass = $_POST["usePass"];
	$email = $_POST["useEmail"];
//		echo "账号".$name;
//		echo "密码".$pass;
//		echo "邮箱".$email;
	//开始链接数据库
	header('Content-Type:text/html;charset=utf-8');
	$servername = "localhost";
	$username = "root";
	$password = "940314";
	$dbname = "dressing";	
	 //创建一个连接
	$conn = mysqli_connect($servername, $username, $password, $dbname);
 
		// 检测连接
	if (!$conn) {
	    die("Connection failed: " . mysqli_connect_error());
	}
//		echo "连接成功";
	mysql_query("SET NAMES `UTF-8`");
	/*要操作的mysql语言*/
	$sql = "INSERT INTO users (username, userpass, useremail) VALUES ('".$name."','".$pass."','".$email."')";
	
	if (mysqli_query($conn, $sql)) {
	    echo "right";
	} else {
	    echo "error";
	}
	$conn->close();	
?>
