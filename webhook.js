let http = require('http');
var spawn = require('child_process').spawn;
let sendMail = require('./sendmail.js');
let server = http.createServer(function(req,res){
    console.log(req.method,req.url);
    if(req.url == '/webhook' && req.method =='POST'){
        let buffers = [];
        req.on('data',function(data){
            buffers.push(data);
        });
        req.on('end',function(){
            //获取webhook请求的payload,也是
            let payload = JSON.parse(Buffer.concat(buffers));
            console.log(payload.pusher,payload.head_commit)
            let event = req.headers['x-github-event'];
                        console.log(payload.repository)
            res.setHeader('Content-Type','application/json');
            res.end(JSON.stringify({"ok":true}));//这个是github约定的，如果是这个，delivery记录就是绿色成功态，否者就是红色，各种错误信息
            if(event === 'push'){
                //执行相应的shell
                let child = spawn('sh', [`${payload.repository.name}`]);
                let buffers = [];
                child.stdout.on('data', function (buffer) { buffers.push(buffer)});
                child.stdout.on('end', function () {
                    //获取子进程日志信息
                    let logs = Buffer.concat(buffers).toString();
                    //发邮件
                    sendMail(`
            <h1>部署日期: ${new Date()}</h1>
            <h2>部署人: ${payload.pusher.name}</h2>
            <h2>部署邮箱: ${payload.pusher.email}</h2>
            <h2>提交信息: ${payload.head_commit.message}</h2>
            <h2>布署日志:<br/> ${logs.replace(/\\n/,'<br/>')}</h2>
        
        `);
                });
            }
        });
    }else{
        res.end('Now Found!!!!');
    }
});
server.listen(4000,()=>{
    console.log('服务正在4000端口上启动!');
});
