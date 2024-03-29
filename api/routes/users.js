const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const { User } = require('../models');
const authenticateUser = require('../middleware/authenticateUser');
const { Op } = require('sequelize');

//DRY async func
const asyncEnvelop = (cb) => {
    return async (req, res, next) =>{
        try {
            await cb(req, res, next) 
            
        } catch(err) {
            res.status(500).send(err.log);
            console.log({err});
        }
    }
}

//Get users
router.get('/users', authenticateUser, asyncEnvelop(async(req, res) =>{
        const user = req.currentUser;
        const users = await User.findByPk(user.id, {
             attributes: ['id', 'firstName', 'lastName', 'emailAddress']
        });
        res.status(200).json(users);
}));
//Post Users
router.post('/users', [
    check('firstName')
    .exists({checkNull: true, checkFalsy: true})
    .withMessage('A first name is required'),
    check('lastName')
    .exists({checkNull: true, checkFalsy: true})
    .withMessage('A last name is required'),
    check('password')
    .exists({checkNull: true, checkFalsy: true})
    .withMessage('A password is required'),
    check('emailAddress')
    .exists({checkNull: true, checkFalsy: true})
    .withMessage('An e-mail address is required')
    .isEmail()
    .withMessage('Please enter a valid emailAddress')
    .custom(email => {
        return User.findOne({
            where: {
                emailAddress: {
                    [Op.eq]: email,
                },
            },
        }).then(e => {
            if (e) {
                return Promise.reject('This emailAddress is already taken');
            }
        })
    })
], asyncEnvelop(async(req, res) => {
    const errors = validationResult(req);
    let user = req.body;
    if(!errors.isEmpty()){
        const errorMessage = errors.array().map(err => err.msg);
        res.status(400).json({errors: errorMessage});
    } else {
        user.password = bcryptjs.hashSync(user.password);
        user = await User.create(req.body);
        res.status(201).location('/').end();
    }
}));

module.exports = router;