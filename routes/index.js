const express = require('express')
const router = express.Router()
const restaurant = require('./restaurant')
const user = require('./user')
const passport = require('passport')
const authHandler = require('../middlewares/auth-handler')
const oauth = require('./oauth')

router.use('/restaurants', authHandler, restaurant)
router.use('/users', user)
router.use('/oauth', oauth)

router.get('/', (req, res) => {
  res.redirect('/restaurants')
})

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 使用者登入
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/restaurants',
    failureRedirect: '/login',
    failureFlash: true,
  })
)

// 使用者登出
router.post('/logout', (req, res, next) => {
  req.logout((error) => {
    if (error) return next(error)
    req.flash('success', '登出成功')
    return res.redirect('/login')
  })
})

module.exports = router
