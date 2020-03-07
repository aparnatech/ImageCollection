const router = require('express').Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require("../config/keys").JWT_KEY;

router.post('/signup', (req, res) => {
    const userdata = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    if (!userdata.name || !userdata.email || !userdata.password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    User.findOne({
      email: userdata.email
    })
      .then(user => {
        if (user) {
          return res.status(409).json({
            message: 'Mail exist'
          });
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(userdata.password, salt, (err, hash) => {
              if (err) {
                throw err;
              }
              userdata.password = hash;
              User.create(userdata)
                .then(user =>
                  jwt.sign(
                    { id: user._id,key },
                    {
                      expiresIn: 3600
                    },
                    (err, token) => {
                      if (err) throw err;
                      res.json({
                        success: true,
                        token: token,
                        user: {
                          _id: user.id,
                          name: user.name,
                          email: user.email
                        }
                      });
                    }
                  )
                )
                .catch(err => res.send(err));
            });
          });
        }
      })
      .catch(err => {
        res.send('user already taken');
      });
  });
  

  router.post('/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    User.findOne({
      email: req.body.email
    })
      .then(user => {
        console.log(user);
        if (user) {
          console.log(user);
          bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
              return res.status(401).json({
                message: 'password does not match'
              });
            }
            if (result) {
              const payload = {
                _id: user._id,
                name: user.name,
                email: user.email
              };
              const token = jwt.sign(payload, keys.secretOrKey, {
                expiresIn: '1h'
              });
              return res.status(200).json({
                message: 'Authorazation successfull',
                token: token
              });
            }
            res.status(401).json({
              message: 'Authorazation failed'
            });
          });
        } else {
          res.status(401).json({
            error: 'user does not exist'
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

router.delete('/:userId', (req, res, next) => {
    User.remove({
        _id: req.params.id
    }).exec().then(res => {
        res.status(200)
    }).catch(
        err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
    );
})
module.exports = router;