const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    id: {
        type : String,
        required: true
    },
    comment: {
        type:String,
        required:true
    },

    createDate: {
        type:String,
        required:true,
    },
    createdTime: {
        type: String,
        required: true
      },
      username: {
          type:String,
          required:true
      }
});

//creates collection called Job
module.exports = mongoose.model('comments', schema);