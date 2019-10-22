const express = require('express');
const router = express.Router();
//this is a service called jobService this is will creates on the frontend on the project
const jobService = require('./job.services');

//route to the path by exporting the routers
module.exports = router;

//Http reqest in backend

router.get('/job', getJobs);
router.get('/jobById/:id', getJobsById);
router.post('/jobAssignUser', jobAssignUser);
router.post('/jobinsert', uploadJob);
router.post('/jobUpdateTemp', jobUpdateTemp);
router.post('/jobUpdateStatus', jobUpdateStatus);


function jobUpdateStatus(req, res, next) {

    //  console.log( "This is the jobcontroller.js " + req.body);
      
      jobService.updateJobStatus(req.body)
          .then(() => res.json({}))
          .catch(err => next(err));
  }





function jobAssignUser(req, res, next) {

  //  console.log( "This is the jobcontroller.js " + req.body);
    
    jobService.updateAssignUser(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function jobUpdateTemp(req, res, next) {

    console.log( "This is the jobcontroller.js " + req.body);
    
    jobService.updateJobTemp(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}


//New Job insert method
function uploadJob(req, res, next) {

    console.log(req.body);
    jobService.insertJob(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
        

}


//getting the database data
function getJobs(req, res, next) {
    console.log("hi");
    //Calling the get all method
    jobService.getAll()
        .then(jobs => res.json(jobs))
        .catch(err => next(err));
}

function getJobsById(req, res, next) {
    console.log("this is the getJobById" + id);
    jobService.getJobsById(req.params.id)
        .then(jobs => res.json(jobs))
        .catch(err => next(err));
}