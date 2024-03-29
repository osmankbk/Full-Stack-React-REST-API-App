const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const { Course, User } = require('../models');
const authenticateUser = require('../middleware/authenticateUser');
const { Op } = require('sequelize');

//DRY async function
const asyncEnvelop = (cb) => {
    return async (req, res, next) =>{
        try {
            await cb(req, res, next) 
            
        } catch(err) {
            res.status(500).send(err.log);
            console.log(err.status);
        }
    }
}

//Get courses
router.get('/courses', asyncEnvelop(async(req, res) =>{
    try {
        const course = await Course.findAll({
            attributes: ['id', 'title', 'description', 'estimatedTime', 'materialsNeeded', 'userId'],
            include: [{
                attributes: ['id', 'firstName', 'lastName', 'emailAddress'],
                model: User,
            }],
        });
        res.status(200).json(course);
    } catch(err) {
        console.log({error: err.message});
    }
    
}));

//Get A course
router.get('/courses/:id', asyncEnvelop(async(req, res) =>{
    const course = await Course.findByPk(req.params.id, {
        attributes: ['id', 'title', 'description', 'estimatedTime', 'materialsNeeded', 'userId'],
        include: [{
            attributes: ['id', 'firstName', 'lastName', 'emailAddress'],
            model: User
        }],
    });
    if(course) {
        res.status(200).json(course);
    } else {
        res.status(404).json({'error': 'course not available'});
    }
    
}));

//Post course
router.post('/courses', authenticateUser, [
    check('title')
    .exists({checkNull: true, checkFalsy: true})
    .withMessage('A title is required'),
    check('description')
    .exists({checkNull: true, checkFalsy: true})
    .withMessage('A description is required')
], asyncEnvelop(async(req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const errorMessage = errors.array().map(err => err.msg);
            res.status(400).json({errors: errorMessage});
        } else {
            const course = await Course.create(req.body);
            res.status(201).location(`/courses/${course.id}`).end();
        }
    } catch(error) {
        console.log({error: error.message});
    }
   
}));

//Update course
router.put('/courses/:id', authenticateUser, [
    check('title')
    .exists({checkNull: true, checkFalsy: true})
    .withMessage('A title is required'),
    check('description')
    .exists({checkNull: true, checkFalsy: true})
    .withMessage('A description is required')
], asyncEnvelop(async(req, res) =>{
    try {
        const errors = validationResult(req);
        let course = await Course.findByPk(req.params.id);
        if(!errors.isEmpty()){
            const errorMessage = errors.array().map(err => err.msg);
            res.status(400).json({errors: errorMessage});
        } else {
        if(course) {
            if(course.userId === req.currentUser.id) {
                course = course.update(req.body);
                res.status(204).end();
            } else {
                res.status(403).json({'error': 'Sorry, you need to own the course to make changes'});
            }
        } else {
            res.status(404).json({'error': 'course not available'});
        }
        }
    } catch(error) {
        console.log({error: error.message});
    }
    
}));

//Delete course
router.delete('/courses/:id', authenticateUser,  asyncEnvelop(async(req, res) =>{
    try {
        const course = await Course.findByPk(req.params.id);
        if(course) {
            if(course.userId === req.currentUser.id){
                await course.destroy();
                res.status(204).end();
            } else {
                res.status(403).json({'error': 'Sorry, you need to own the course to make changes'})
            }
           
        } else {
            res.status(404).json({'error': 'course not available'});
        }
        
    } catch(error) {
        console.log({error: error.message});
    }
    
}));

module.exports = router;