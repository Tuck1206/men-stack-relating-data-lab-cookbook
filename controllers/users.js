const express = require('express')
const router = express.Router()

const User = require('../models/user.js')

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    console.log(users)
    res.render('users/index.ejs', {
      users: users
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})


router.get('/:userId/foods', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId)
    const user = await User.findById(req.session.user)
    
    console.log(currentUser)
    res.render('foods/recipes.ejs', {
      foods: currentUser.foods,
      currentUser,
      user
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})




module.exports = router

