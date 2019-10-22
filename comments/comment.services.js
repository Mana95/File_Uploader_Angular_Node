const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Comments = db.Comments;

module.exports = {

    create,
    getJobsById,
    getAllComments

};

async function getAllComments()
//getting the all data form db
{
    return await Comments.find({});
}



async function create(userParam) {
    console.log("test");

    const user = new Comments(userParam);
    console.log(user);
   
    // save user
    await user.save();
}

async function getJobsById(id) {
    //finding the data by id
    console.log("This is the uploadservice"+ id);
    return await Comments.find({ "id": id })

}
