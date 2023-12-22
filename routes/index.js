const express = require("express")
const router = express.Router()
const restaurant = require("./restaurant")
const passport = require('passport')

router.use("/restaurants", restaurant)

router.get("/", (req, res) => {
  res.redirect("/restaurants")
})

router.get("/register", (req, res) => {
  res.render("register")
})

router.get("/login", (req, res) => {
  res.render("login")
})

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/restaurants",
    failureRedirect: "/login",
    failureFlash: true,
  })
)

module.exports = router