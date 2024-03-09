const fs = require('fs');

const requestHandeler = (req , res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/'){
        return fs.readFile('message.txt' , {encoding: 'utf-8'} ,(err , data) => {
            if(err){
                console.log(err);
            }
            console.log(`data from file ${data}`);
            res.write('<html>');
            res.write('<head><title>Enter Message</title></head>');
            res.write(`<body>${data}</body>`);
            res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
            res.write('</html>');
            return res.end();
        })
    }
    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data' , (chunk) => {
            body.push(chunk);
        });

        return req.on('end' , () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message , err => {
                res.statusCode = 302;
                res.setHeader('location','/');
                return res.end();
            });
        });
    }

    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello From My Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
};


//exports = requestHandeler;
//module.exports.handeler = requestHandeler;
module.exports = requestHandeler;