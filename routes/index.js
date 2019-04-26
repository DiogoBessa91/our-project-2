const express = require('express');
const User = require('../models/User');
const {checkConnected} = require('../middlewares');
const router  = express.Router();
const uploadCloud = require('../config/cloudinary');


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/edit-profile', (req, res, next) => {
  User.findById(req.user._id)
   .then(user =>{
     res.render('edit-profile', {user});

   })
});

// Route POST /create-profile to receive the form submission
router.post('/create-profile', uploadCloud.single('photo'), (req, res, next) => {
  //Beca\ the info was sent with a post form, we can access data with 'req.body'
  User.create(req.user, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role,
    photo: req.file.url,
    story: req.body.story

  })
  .then(() => {
    res.redirect('/profile/')
  })
});

// Route POST /create-book to receive the form submission
router.post('/edit-profile', uploadCloud.single('photo'), (req, res, next) => {
  //Beca\ the info was sent with a post form, we can access data with 'req.body'
  User.findByIdAndUpdate(req.user._id, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role,
    photo: req.file.url,
    story: req.body.story

  })
  .then(() => {
    res.redirect('/profile/')
  })
});

router.post('/students', (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role,
    photo: req.file.url,
    story: req.body.story

  })
  .then(() => {
    res.redirect('/profile/')
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

router.get("/profile/:userId", (req, res, next) => {
  //get user with the id received on the params and send to the view
  User.findById(req.params.userId)
  //User.find({userId: req.params.userId})
  .then((user) => {
    console.log("XXXXXXXXXXXXXXXXXXXXX");
    console.log(req.params.userId);
    console.log(user);
    res.render('auth/generalProfile', {
      user
    })
  })
});

router.get("/about", (req, res, next) => {
  res.render("auth/about");
});

module.exports = router;
