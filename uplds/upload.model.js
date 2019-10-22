const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    id: {
        type: String,
        required: true
    },
    uniqueId: {
        type: String,
        unique : true,
        required: true
    },
    jobname: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required:true
    },

    status: {
        type: String,
        required:true
    },

    assignUser: {

        type: String,
        required: true
    },

    jobDescription: {
        type: String,
        required: true
    },
    
    
    filename: {
        type: String,
         required: true
         },

        //  path: {
        //      type: String,
        //      required: true
        //  },

    itemsize: {
         type: String,
         required: true
        },

    itemtemp: {
         type: String
         
         },

    createdDate: {
       type: String,
    required: true
     },

    createdTime: {
        type: String,
        required: true
     }
     
});
//I commented
// schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Jobdetails', schema);
