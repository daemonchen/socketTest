mongoose = require('mongoose')
mongoose.connect('localhost', 'daemon')

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once 'open', () ->
  console.log("yeap")


schema = mongoose.Schema({
  ip: 'string',
  userName: 'string',
  chat: 'string'
})
Chat = mongoose.model('Chat', schema)


exports = module.exports =  (jsonObj) ->
  # jsonObj:{ip:1,userName:'',chat:''}
  chat = new Chat(jsonObj)
  chat.save (err)->
    if (err)
      console.log(err)
    else
      console.log '------store KO'


