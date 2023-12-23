const express = require("express")
const router = express.Router()
const restaurant = require("./restaurant")
const user = require("./user")
const passport = require("passport")
const authHandler = require("../middlewares/auth-handler")

router.use("/restaurants", authHandler, restaurant)
router.use("/users", user)

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

router.post("logout", (req, res, next) => {
  req.logout((error) => {
    if (error) return next(error)
    return res.redirect("/login")
  })
})

module.exports = router
