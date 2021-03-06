const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

let onlinecount = 0;
var nickname;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view/index.html');
    //console.log(req.query.username);
    nickname = req.query.username;
    //console.log(nickname);
});



io.on('connection', (socket) => {
	
	onlinecount++;
	io.emit("online" , "Online Users :" + onlinecount);
	

	socket.on("greet", () => {
		socket.emit("greet","Online Users: " + onlinecount);
	});

	
	socket.on("send",(msg) => {
		//if(Object.keys(msg).length < 2) return;
		io.emit("msg",msg);
		console.log(msg);
	});

	socket.on('disconnect', () => {
		onlinecount = (onlinecount < 0) ? 0 : onlinecount -= 1;
		io.emit("online","Online Users: " + onlinecount);
	});
});



server.listen(3000, () => {
    console.log("Please visit http://localhost:3000");
});