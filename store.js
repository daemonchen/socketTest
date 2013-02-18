exports = module.exports = function (jsonObj) {
	//jsonObj:{ip:1,userName:'',chat:''}
	var chat = new Chat(jsonObj);
	chat.save(function (err) {
		if (err) {
			console.log(err)
		}
		console.log('KO');
	});
}

var mongoose = require('mongoose');
mongoose.connect('localhost', 'daemon');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	console.log("yeap");
});

var schema = mongoose.Schema({
	ip: 'string',
	userName: 'string',
	chat: 'string'
});
var Chat = mongoose.model('Chat', schema);