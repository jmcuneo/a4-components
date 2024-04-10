const express = require('express')
const router = express.Router()
const Data = require('../models/Data')
const User = require("../models/User");
const { cache } = require("express/lib/application");

//authenticate user
const isAuth = (req, res, next) => {
   if (req.user) {
        next()
   }
    else {
        res.redirect('/')
    }
}

//check if user already logged-in
const isGuest = (req, res, next) => {
    if (req.user) {
        res.redirect('/dashboard')
    } else {
        next()
    }
}

//function containing logic to calculate final price, after discount price
function calculatePrice(bilingObj) {
    //DERIVED FIELDS
    let totalPrice = 0
    let discount = 0
    let afterDiscount = 0
    let finalPrice = 0
    totalPrice = bilingObj.cost * bilingObj.quantity //calculating total price based on quantity and cost

    //calculating discount based on total price
    if (totalPrice < 50) {
        discount = 0.10 //10%
    }
    else if (totalPrice >= 50 && totalPrice < 100) {
        discount = 0.20 //20%
    }
    else if (totalPrice >= 100 && totalPrice < 500) {
        discount = 0.30 //30%
    }
    else if (totalPrice >= 500) {
        discount = 0.40 //40%
    }

    afterDiscount = discount * totalPrice //applying discount
    finalPrice = totalPrice - afterDiscount //final price including quantity

    //adding properties and values for prices
    bilingObj.totalprice = totalPrice
    bilingObj.discount = discount * 100
    bilingObj.afterdiscount = finalPrice

    return bilingObj

}

//routes to redirect to user to different pages
router.get('/', isGuest, (req, res) => {
    res.render('login')
})


router.get('/dashboard', isAuth, async (req, res) => {
    let displayName = "ssunku6"
    //res.render('dashboard', { name: req.user.displayName })
    return res.json({username:displayName})
})

router.get('/billingsystem', isAuth, async (req, res) => {
    try {
        let total = 0
        let username = "ssunku6"
        let id = "128723424"
        //const billingdata = await Data.find({ githubId: req.user.githubId }).lean()
        const billingdata = await Data.find({ githubId: id }).lean()
        for(const item of billingdata){
            total = total + (await item).afterDiscount //calculate total price
        }

        //res.render('billingsystem', { username: req.user.displayName, billingdata: billingdata, id: req.user.githubId, total:total })
        console.log(username, id, billingdata)
        res.json({ username: username, billingdata: billingdata, id: id, total:total })
    } catch (err) {
       res.render('error')
        //res.json('error')
    }
})

router.get('/instructions', isAuth, (req, res) => {
    res.render('instructions')
})

router.get('/user_info', isAuth, async (req, res) => {
    try {
        let githubId = "128723424"
        //const userdata = await User.find({ githubId: req.user.githubId }).lean()
        const userdata = await User.find({ githubId: githubId }).lean()
        //res.render('user', { userdata: userdata }) //find data based in GitHub ID and render with this page
        return res.json(userdata)
    } catch (err) {
        //res.render('error')
        return res.json('error')
    }
})

router.post('/add-data', isAuth, async (req, res) => {
    try {
        // req.body.user = req.user.id
        let bilingObj = {
            cost: req.body.cost,
            quantity: req.body.quantity
        }
        let billingData = calculatePrice(bilingObj)
        req.body.totalPrice = billingData.totalprice
        req.body.discount = billingData.discount
        req.body.afterDiscount = billingData.afterdiscount
        await Data.create(req.body) //add data to database
        //res.redirect('/billingsystem')
        console.log(req.body)
        return res.json(req.body)
    } catch (err) {
        //res.render('error')
        return res.json('error')
    }
})

router.put('/update_data', isAuth, async (req, res) => {
    try {
        // let bilingObj = {
        //     cost: req.body.cost,
        //     quantity: req.body.quantity
        // }
        // let billingData = calculatePrice(bilingObj)
        // req.body.totalPrice = billingData.totalprice
        // req.body.discount = billingData.discount
        // req.body.afterDiscount = billingData.afterdiscount
        // //find entry based on object id and update with values from the form
        // let data = await Data.findOneAndUpdate({ _id: req.body._id }, req.body, {
        //     runValidators: true
        // })
        // res.redirect('/billingsystem')
        return "react"
    } catch (err) {
        res.render('error')
    }
})

router.delete('/delete_data', isAuth, async (req, res) => {
    try {
        await Data.deleteOne({ _id: req.body._id }) //delete from database based on object id
        res.redirect('/billingsystem')
    } catch (err) {
        res.render('error')
    }
})

module.exports = router