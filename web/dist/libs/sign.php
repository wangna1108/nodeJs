<?php

  # 1. 获取前端的参数
  $username = $_POST['username'];
  $password = $_POST['password'];

  # 2. 链接数据库
  $conn = mysql_connect('localhost', 'root', 'root');
  mysql_select_db('damai');

  $sql="INSERT INTO `item` (`username`,`password`) VALUES('$username','$password')";   

  $res = mysql_query($sql);

  # 一个严谨性的判断
  if (!$res) {
    die('执行 sql 语句出错： ' . mysql_error());
  }

  # 解析结果
  $row = mysql_fetch_assoc($res);
  # 判断添加数据
  if ($row) {
    // 登录成功
    $arr = array(
      "message" => "登录成功",
      "type" => true
    );
    echo json_encode($arr);
  }else {
    // 登录失败
    $arr = array(
      "message" => "用户名或密码错误",
      "type" => false
    );
    echo json_encode($arr);
  } 
?>
