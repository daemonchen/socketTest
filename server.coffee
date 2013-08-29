store = require('./store')
connect = require("connect")
clientName = ''
clientIp = null

app = connect()
.use(connect.logger())
.use(connect.static(__dirname+"/"))
.listen(8081)
# var app = require('http').createServer(function (req, res) {
#   fs.readFile(__dirname + '/index.html', function (err, data) {
#     if (err) {
#       res.writeHead(500);
#       return res.end('Server ERR');
#     }
#     res.writeHead(200);
#     res.end(data);
#     //clientName=req;
#   });
# });
io = require('socket.io').listen(app)
fs = require('fs')

storeData = (data)->
  store({
    ip: clientIp.address + ':' + clientIp.port,
    userName: data['userName'],
    chat: data['chat'].toString()
  }) #store the chat

postMessage = (socket, data) ->
  socket.emit('server', {
    ip: clientIp.address + ':' + clientIp.port,
    userName: data['userName'],
    chat: data['chat']
  })
  socket.broadcast.emit('broadcast', {
    ip: clientIp.address + ':' + clientIp.port,
    userName: data['userName'],
    chat: data['chat']
  })

io.sockets.on 'connection', (socket) ->
  clientName = JSON.stringify(socket[1])
  clientIp = socket.handshake.address
  socket.on 'client', (data) ->
    storeData data
    postMessage this, data

