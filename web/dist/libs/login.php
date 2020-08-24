<?php

  # 1. 获取前端的参数
  $username = $_POST['username'];
  $password = $_POST['password'];

  # 2. 链接数据库
  $conn = mysql_connect('localhost', 'root', 'root');
  mysql_select_db('damai');

  $sql = "SELECT * FROM `item` WHERE `username`='$username' AND `password`='$password'";     

  $res = mysql_query($sql);

  # 一个严谨性的判断
  if (!$res) {
    die('执行 sql 语句出错： ' . mysql_error());
  }

  # 解析结果
  $row = mysql_fetch_assoc($res);
  # 判断登录状态
  if ($row) {
    // 登录成功
    $arr = array(
      "message" => "登录成功",
      "type" => true
    );
    // 这个位置表示登录成功
    // 如果这个位置的代码能执行，一定是登录成功了
    // 后端可以设置 cookie
    // setcookie('login', '1', time() + 30);
    // 如果浏览器里面的 cookie 里面有一个 login 值是 1
    // 表示你登录成功过
    // 下面的是返回结果给前端
    echo json_encode($arr);
  } else {
    // 登录失败
    $arr = array(
      "message" => "用户名或密码错误",
      "type" => false
    );
    echo json_encode($arr);
  }
?>
