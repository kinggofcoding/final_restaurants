const express = require('express')
const router = express.Router()
const passport = require('passport')


// 使用facebook登入
router.get(
  '/login/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
)

// facebook驗證後呼叫的route
router.get(
  '/redirect/facebook',
  passport.authenticate('facebook', {
    successRedirect: '/restaurants',
    failureRedirect: '/login',
    failureFlash: true,
  })
)

module.exports = router
