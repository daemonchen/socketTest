exports=module.exports=function(jsonObj){
	//jsonObj:{ip:1,userName:'',chat:''}
	console.log("2101");
	var kitty = new Chat(jsonObj);
	kitty.save(function (err) {
	  if (err){
	  	console.log(err)
	  }
	  console.log('meow');
	});
}
var mongoose = require('mongoose');
mongoose.connect('localhost', 'daemon');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
});

var schema = mongoose.Schema({ ip: 'string',userName:'string',chat:'string' });
var Chat = mongoose.model('Chat', schema);


