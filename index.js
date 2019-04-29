const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

let onlinecount = 0;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view/index.html');
    //res.sendFile(__dirname + '/view/online_user.html');
});

io.on('connection', (socket) => {
	onlinecount++;
	io.emit("online" , "Online Users :" + onlinecount);

	socket.on("greet", () => {
		socket.emit("greet","Online Users: " + onlinecount);
	});

	socket.on("send",(msg) => {
		io.emit("msg",msg);
	});

	socket.on('disconnect', () => {
		onlinecount = (onlinecount < 0) ? 0 : onlinecount -= 1;
		io.emit("online","Online Users: " + onlinecount);
	});
});


server.listen(3000, () => {
    console.log("Please visit http://localhost:3000");
});