const express = require('express')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/User')
const router = express.Router()
router.get('/user', (req, res) => {
    res.send("Hello")
})

router.post('/register', (req, res) => {
    const userData = req.body;
    console.log(userData)
    bcrypt.hash(userData.password, 10)
        .then((encryptedPassword) => {
            const user = new User({
                email: userData.email,
                name: userData.name,
                password: encryptedPassword
            })
            user.save().then((userData) => {
                res.status(201).json({
                    message: "User registered successfully!",
                    data: userData
                });
            }).catch(err => {
                res.status(500).json({
                    message: "Failed to create user!",
                    error: err
                });
            });
        }).catch(err => {
            console.log("error while encrypting", err);
            res.status(500).json({
                message: "Internal server error"
            });
        })
})
router.post('/login', (req, res) => {
    const userData = req.body;
    User.findOne({email: userData.email}).then(user => {
        if(user) {
            return bcrypt.compare(userData.password, user.password).then(authStatus => {
                if(authStatus) {
                    return jwt.sign(
                        {
                            email: user.email, 
                            id: user._id
                        }, 
                        'Bunny',  
                        {
                        expiresIn: "1h"
                        }, (err, token) => {
                            if(err) {
                                return res.status(200).json({
                                    message: "Token creation failed"
                                });
                            }
                            return res.json({
                                message: "Authentication successful",
                                token: token
                            });
                        }
                    )
                }
                res.status(401).json({
                    message: "Authentication failed"
                });

            })
        }
        res.status(401).json({
            message: "Authentication failed"
        });
    }).catch(err => {
        res.send(err);
    })
})


module.exports = router 