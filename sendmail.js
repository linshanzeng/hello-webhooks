const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: 'smtp.163.com',
    service: '163', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    secure: true,
    auth: {
        user: 'zenglinshan2288@163.com',
        // 这里密码不是密码，是你设置的smtp授权码
        pass: 'RGUQVCLCTYCVSNCC',
    }
});


function sendMail(message){
    let mailOptions = {
        from: '"zenglinshan2288" <zenglinshan2288@163.com>', // 发送地址
        to: 'zenglinshan2288@163.com', // 接收者
        subject: '部署通知', // 主题
        html:message // 内容主体
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            // return console.log(error);
            console.log(error);
        }
        console.log('Message sent: %s', info);//.messageId);
    });
}
module.exports = sendMail;
