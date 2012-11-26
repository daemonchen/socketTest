var clientName='';
var app=require('http').createServer(function(req,res){
	fs.readFile(__dirname+'/index.html',function(err,data){
		if(err){
			res.writeHead(500);
			return res.end('Server ERR');
		}
		res.writeHead(200);
		res.end(data);
		//clientName=req;
	});
});
var io=require('socket.io').listen(app);
var fs=require('fs');
app.listen(8081);
io.sockets.on('connection',function(socket){
	clientName=JSON.stringify(socket[1]);
	socket.on('client',function(data){
		socket.broadcast.emit('server',{userName:data['userName'],chat:data['chat']});
	});	
});
