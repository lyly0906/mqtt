var http = require('http');
var mqtt = require('mqtt');  
var client2 = mqtt.connect("mqtt://192.168.2.117:1883", {
    username: 'Hlm1vaQWLAdg3U64bqtM'
});  
  
client2.subscribe('v1/devices/me/telemetry',{qos:1});//订阅主题为test的消息  
  
client2.on('message',function(top,message) {  
    console.log(message.toString());  
});  

http.createServer(function (request, response) {

    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});

    // 发送响应数据 "Hello World"
    response.end('Hello World\n');
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');