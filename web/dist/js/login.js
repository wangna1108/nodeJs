"use strict";for(var btns=document.querySelectorAll("ul > li"),tabs=document.querySelectorAll("ol > li"),i=0;i<btns.length;i++)btns[i].setAttribute("index",i),btns[i].onclick=function(){for(var e=0;e<btns.length;e++)btns[e].className="",tabs[e].className="";this.className="active";var t=this.getAttribute("index");tabs[t].className="active"};var form=document.getElementById("form"),username=document.querySelector("#username"),password=document.querySelector("#password"),pass=document.querySelector(".pass");form.addEventListener("submit",function(e){(e=e||window.event).preventDefault(),ajax({url:"../libs/login.php",type:"POST",data:{username:username.value,password:password.value},dataType:"json",success:function(e){e.type?window.location.href="./index.html":pass.style.visibility="visible"}})});