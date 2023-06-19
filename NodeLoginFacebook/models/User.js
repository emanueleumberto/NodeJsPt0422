
const mongoose = require("mongoose");
 
mongoose.connect("mongodb+srv://admin:root@cluster0.rpwcfk4.mongodb.net/ReactNodeDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var userSchema = mongoose.Schema({
    uid: String,
    token: String,
    email: String,
    name: String,
    gender: String,
    pic: String
});
 
module.exports = mongoose.model('userfacebooklogin', userSchema);