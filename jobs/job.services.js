const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
//calling the Job table in database
const Job = db.Job;
const Uplds = db.Uplds

//in this every function mus export
module.exports = {

    getAll,
    getJobsById,
    updateAssignUser,
    insertJob,
    updateJobTemp,
    updateJobStatus
};

async function getAll()
//getting the all data form db
{
    return await Job.find({});
}




async function getJobsById(id) {
    //finding the data by id
    console.log(id);
    return await Job.find({ "id": id })

}

async function updateJobStatus(jobObj) {

    console.log("This is the jobservice" + JSON.stringify(jobObj));

    Uplds.updateOne(
        { uniqueId: jobObj.uniqueId },
        { $set: jobObj }
        , function (err, responses) {
            if (err) {
                console.log(err);
            }
        });
}


async function updateAssignUser(jobObj) {
    //update a one field update method
    console.log("This is the jobservice" + JSON.stringify(jobObj));
    Job.updateOne(
        { id: jobObj.id },
        { $set: jobObj }
        , function (err, responses) {
            if (err) {
                console.log(err);
            }
        });
        //This is will update the jobDetail table 
        Uplds.updateMany(
            { id: jobObj.id },
            { $set: jobObj }
            , function (err, responses) {
                if (err) {
                    console.log(err);
                }
            });

}

//new method

async function updateJobTemp(jobObj) {
    //update a one field update method
    console.log("This is the jobservice Template" + JSON.stringify(jobObj));
    console.log()
    Uplds.updateOne(
        { uniqueId: jobObj.uniqueId },
        { $set: jobObj }
        , function (err, responses) {
            if (err) {
                console.log(err);
            }
        });
        // //This is will update the jobDetail table 
        // Uplds.updateMany(
        //     { id: jobObj.id },
        //     { $set: jobObj }
        //     , function (err, responses) {
        //         if (err) {
        //             console.log(err);
        //         }
        //     });

}








async function insertJob(userParam) {

    console.log("Awaa" + JSON.stringify(userParam));
    
    const job = new Job(userParam);


    console.log(job);
    // save user
    await job.save();

    
}
// remongo_responses

// async function updateAssignUser(id, role) {
//     const job = await getJobsById(id);
//     console.log("This is the job.service " + job);
//     console.log("This is the old user in this row" +Job.assigneUser);
//     Object.assign(Job.assigneUser, job.role,);
//     console.log("Current status :"  + job);
//     await job.save();
// }
