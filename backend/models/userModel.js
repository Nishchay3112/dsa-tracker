const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username:{
    type : String,
    minlength : 4,
    required : true,
    unique : true
  },
  email:{
    type : String,
    required: true,
    unique: true
  },
  password:{
    type:String,
    required : true,
    minlength:4
  }
})

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;