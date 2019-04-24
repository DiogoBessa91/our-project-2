const express = require('express');
const User = require('../models/User');
const {checkConnected} = require('../middlewares');
const router  = express.Router();
const uploadCloud = require('../config/cloudinary');


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


// Route POST /create-book to receive the form submission
router.post('/create-profile', uploadCloud.single('photo'), (req, res, next) => {
  //Beca\ the info was sent with a post form, we can access data with 'req.body'
  Profile.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role,
    photo: req.file.url,

  })
  .then(createdProfile => {
    res.redirect('/profile/'+createdProfile._id)
  })
});

router.get("/students", (req, res, next) => {
  User.find()
  .then(usersFromDb => {
    res.render("auth/students", { users: usersFromDb });
  })
});

router.get("/contacts", (req, res, next) => {
  res.render("auth/contacts");
});

router.get("/profile", checkConnected, (req, res, next) => {
  res.render("auth/profile", {
    user: req.user
  });
});

router.get("/about", (req, res, next) => {
  res.render("auth/about");
});

module.exports = router;
