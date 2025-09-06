const express = require('express')
const router = express.Router()

const User = require('../models/user.js')


router.get('/newrecipe', async (req, res) => {
  res.render('foods/newrecipe.ejs')
})

router.get('/:foodId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    const food = currentUser.foods.id(req.params.foodId)
    res.render('foods/recipe.ejs', {
      food: food,
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})


router.get('/:foodId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    const food = currentUser.foods.id(req.params.foodId)
    res.render('foods/edit.ejs', {
      food: food,
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.post('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    currentUser.foods.push(req.body)
    await currentUser.save()
    res.redirect(`/users/${currentUser._id}/foods`)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})


router.put('/:foodId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    const food = currentUser.foods.id(req.params.foodId)
    food.set(req.body)
    await currentUser.save()
    res.redirect(
      `/users/${currentUser._id}/foods/${req.params.foodId}`
    )
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})



router.delete('/:foodId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    currentUser.foods.id(req.params.foodId).deleteOne()
    await currentUser.save()
    res.redirect(`/users/${currentUser._id}/foods`)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})




module.exports = router