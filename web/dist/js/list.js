"use strict";var inner3=document.querySelector(".inner3"),timerId=0;function getList(n){ajax({url:"/dm",data:{keyword:"",cty:"",sctl:"",ctl:"演唱会",tsg:0,st:"",et:"",order:1,pageSize:30,currPage:1,tn:""},dataType:"json",success:function(n){console.log(n),cityName(n.pageData.factMap.cityname),resultData(n.pageData.resultData)}})}window.onscroll=function(){var n=document.documentElement.scrollTop||document.body.scrollTop;inner3.style.opacity=300<=n?1:0,n<=0&&clearInterval(timerId)},inner3.addEventListener("click",function(){timerId=setInterval(function(){document.documentElement.scrollTop-=100},0)}),getList();var allList=document.querySelector(".all-list"),as=document.querySelectorAll(".all-list a"),city=document.querySelector("#city"),navList=document.querySelector(".nav-list");function cityName(n){var e="";n.forEach(function(n,t){e+='\n                <a href="javascsript:;">'.concat(n.name,"</a>\n               ")}),allList.innerHTML=e}city.addEventListener("mouseover",function(){navList.style.overflow="visible"}),document.addEventListener("click",function(){navList.style.overflow="hidden"});var listIng=document.querySelector("#listing");function resultData(c){c.forEach(function(n,t){var e="";c.forEach(function(n,t){e+='\n               <li>\n                <img src="'.concat(n.verticalPic,'" alt="">\n                <div class="ych">演唱会</div>\n                <div class="details">\n                    <span>').concat(n.cityname,'</span>\n                    <a href="javascript">').concat(n.name,"</a>\n                    <p>").concat(n.description,'</p>\n                    <div class="address">\n                        <img src="../images/cd236bf8faa61c48cccfd03f9b2b1b3.png" alt="">\n                        <span>').concat(n.venuecity,"\n                              ").concat(n.venue,'\n                        </span>\n                    </div>\n                    <div class="time">\n                        <img src="../images/9aa1d16fd8bcc21b40207f6408e7ce9.png" alt="">\n                        <span>').concat(n.showtime,'</span>\n                    </div>\n                    <div class="price">\n                        <span>').concat(n.price_str,"</span>\n                        <span>售票中</span>\n                    </div>\n                </div>\n                </li>\n                ")}),listIng.innerHTML=e})}