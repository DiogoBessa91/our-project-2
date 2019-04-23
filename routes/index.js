const express = require('express');
const {checkConnected} = require('../middlewares');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


// Route POST /create-book to receive the form submission
router.post('/create-profile', (req, res, next) => {
  //Because the info was sent with a post form, we can access data with 'req.body'
  Profile.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role,
  })
  .then(createdProfile => {
    res.redirect('/profile/'+createdProfile._id)
  })
});

router.get("/students", (req, res, next) => {
  res.render("auth/students");
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
