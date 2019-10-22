const express = require('express');
const router = express.Router();
var path = require('path');
var mime = require('mime');
var fs = require('fs');



const uploadService = require('./upload.service');


module.exports = router;
router.post('/upload', uploadAll);
router.get('/download/:id/:file', downloadFile);

router.get('/joball', getJobs);
router.post('/jobAssignUser', jobAssignUser);
router.get('/jobById/:id', getJobsById);


function uploadAll(req, res, next) {

    console.log(req.body);
    uploadService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
        

}

// function uploadJobs(req, res, next) {

//     console.log(req.body);
//     uploadService.jobinsert(req.body)
//         .then(() => res.json({}))
//         .catch(err => next(err));
        

// }
function downloadFile (req, res , next){

  console.log("Here is the download");

    var filename = req.params.file;
    var id = req.params.id;
    var file = './uploads/'+id+'/'+ filename.split('.').slice(0, -1).join('.') +"CallData.csv";

    res.download(file); 
}


//getting the database data
function getJobs(req, res, next) {
    console.log("hi");
    //Calling the get all method
    uploadService.getAll()
        .then(jobs => res.json(jobs))
        .catch(err => next(err));
}

function jobAssignUser(req, res, next) {

    console.log(req.body);
    
    jobService.updateAssignUser(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getJobsById(req, res, next) {
    console.log("This is the uploadcontroller");
    uploadService.getJobsById(req.params.id)
        .then(jobs => res.json(jobs))
        .catch(err => next(err));
}