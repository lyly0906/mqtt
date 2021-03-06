'use strict'
const Koa = require('koa');
var mqtt = require('mqtt');  
var WebSocket = require('ws'); 
const app = new Koa();

var msg = {sd:"-",wd:""};
// response
app.use(async(ctx) => {
  ctx.body = "当前温度:" + msg.sd + "度" + "\n" + '穿衣提示:'+msg.wd + "\n"  ;
});

app.listen(3000);


var client2 = mqtt.connect("mqtt://192.168.2.117:1883", {
});  
  
client2.on('connect', function () {
   console.log('>>> connected');
   client2.subscribe('v1/devices/me/rpc/request/+',{qos:1});
})  
  
//client2.subscribe('v1/devices/me/telemetry',{qos:1});//订阅主题为test的消息  
  
client2.on('message',function(top,message) {  
    console.log(message.toString());  
	var data = JSON.parse(message.toString());
	  console.log(message.toString()); 
	  console.log(data.sd); 
	  msg = data;
      
	  var ws = new WebSocket("ws://192.168.2.117:9998?t=test");
                ws.onmessage = function (evnt) {
                    var strs = evnt.data.toString();
                    if(strs.indexOf("logout") >= 0){
                        stopsocket();
                    }
                };
                ws.onopen = function() {
                    if(ws.readyState == 1){
                        ws.send("logout");
                    }
                };
	  

});  

