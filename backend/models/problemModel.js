const mongoose = require('mongoose');

const problemSchema = mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  difficulty:{
    type:String,
    enum:['Easy','Medium','Hard'],
    required:true
  },
  topic: {
    type: [String],
    required:true
  },
  platform: {
    type: String,
    enum: ['LeetCode', 'GFG', 'Codeforces', 'Codechef', 'AtCoder', 'SPOJ', 'Other'],
    required:true
  },
  notes:{
    type:String,
    default:''
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  date:{
    type:Date,
    default:Date.now
  }
})

const problemModel = mongoose.model('problem',problemSchema);

module.exports = problemModel;