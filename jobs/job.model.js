const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  id: {
    type: String,
    required: true
  },

  jobname: {
    type: String,
      required: true
  },

  username: {
    type: String,
    required: true
  },
  assignUser: {
    type: String,
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  createdTime: {
    type: String,
    required: true
  },
  jobDescription: {
    type: String,
    required:true
  },
  status: {
    type: String,
    required: true

  }
});


//creates collection called Job
module.exports = mongoose.model('jobs', schema);
