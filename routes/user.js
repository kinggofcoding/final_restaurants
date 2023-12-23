const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const db = require('../models')
const User = db.User


// 使用者註冊
router.post('/', async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body

    if (!email || !password) {
        req.flash('error', 'email及password為必填!')
        res.redirect('back')
    }

    if (password !== confirmPassword) {
        req.flash('error', '驗證密碼與密碼不符!')
        res.redirect('back')
    }

    try {
        const userCount = await User.count({where: { email } })
        if (userCount > 0) return req.flash('error', 'email 已註冊')

        const hash = await bcrypt.hash(password, 10)

        const user = await User.create({
            username,
            email,
            password: hash
        })
        if (user) {
            req.flash('success', '註冊成功')
            res.redirect('/login')
        }
    } catch (error) {
        error.errorMessage = '註冊失敗'
        next(error)
    }
})

module.exports = router