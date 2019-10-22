const express = require('express');
const router = express.Router();
//this is a service called jobService this is will creates on the frontend on the project
const commentServices = require('./comment.services');

//route to the path by exporting the routers
module.exports = router;

//Http reqest in backend
router.post('/insertComment', commentInsert);
router.get('/allComments', getAll);
router.get('/jobById/:id', getJobsById);



function getJobsById(req, res, next) {
    console.log("This is the Commetts"+ req.params.id);
    commentServices.getJobsById(req.params.id)
        .then(jobs => res.json(jobs))
        .catch(err => next(err));
}




function commentInsert(req, res, next) {

    console.log(req.body);
    commentServices.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    console.log("hi");
    //Calling the get all method
    commentServices.getAllComments()
        .then(jobs => res.json(jobs))
        .catch(err => next(err));
}
