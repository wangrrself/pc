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
	$servername = "qdm108781507_db";
	$username = "qdm108781507";
	$password = "19940314";
	$dbname = "qdm108781507_db";
	 //创建一个连接
		$conn = mysqli_connect($servername, $username, $password,$dbname);
 
		// 检测连接
	if ($conn->connect_error) {
	    die("连接失败: " . $conn->connect_error);
	} 
//		echo "连接成功";
	mysql_query("SET NAMES `UTF-8`");
	mysql_query("alter database qdm108781507_db character set utf8");
	/*要操作的mysql语言*/
	$sql = "INSERT INTO users (username, userpass, useremail) VALUES ('".$name."','".$pass."','".$email."')";
	
	if (mysqli_query($conn, $sql)) {
	    echo "right";
	} else {
	    echo "error";
	}
	$conn->close();	
?>
