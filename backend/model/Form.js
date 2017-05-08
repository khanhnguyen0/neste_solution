var mongoose = require('mongoose');
const formSchema = mongoose.Schema({
  category:{type:String, required:true, unique:true, lowercase:true},
  data:[
    {
    type:String, required:true
  }]
});

module.exports = mongoose.model('Form',formSchema)
