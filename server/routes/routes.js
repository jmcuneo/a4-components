const express = require("express");
const router = express.Router();
const Data = require("../models/Data");
const User = require("../models/User");
const { cache } = require("express/lib/application");

//authenticate user
const isAuth = (req, res, next) => {
    console.log("Iamprinting", req.user);
    const header = req.header("Authorization");
    if (!header || header == "" || header == undefined) {
        // Set HTTP status code 401 for Unauthorized
        res.status(401);

        // Send a response indicating unauthorized access
        res.send("Unauthorized access");
    }
    const token = header.replace("Bearer ", "");
    if (!token || token == "null" || token == undefined) {
        res.redirect(`${process.env.REACT_HOST}/`);
    } else {
        next();
    }
};

//check if user already logged-in
const isGuest = (req, res, next) => {
    if (req.user) {
        res.redirect("/dashboard");
    } else {
        next();
    }
};

//function containing logic to calculate final price, after discount price
function calculatePrice(bilingObj) {
    //DERIVED FIELDS
    let totalPrice = 0;
    let discount = 0;
    let afterDiscount = 0;
    let finalPrice = 0;
    totalPrice = bilingObj.cost * bilingObj.quantity; //calculating total price based on quantity and cost

    //calculating discount based on total price
    if (totalPrice < 50) {
        discount = 0.1; //10%
    } else if (totalPrice >= 50 && totalPrice < 100) {
        discount = 0.2; //20%
    } else if (totalPrice >= 100 && totalPrice < 500) {
        discount = 0.3; //30%
    } else if (totalPrice >= 500) {
        discount = 0.4; //40%
    }

    afterDiscount = discount * totalPrice; //applying discount
    finalPrice = totalPrice - afterDiscount; //final price including quantity

    //adding properties and values for prices
    bilingObj.totalprice = totalPrice;
    bilingObj.discount = discount * 100;
    bilingObj.afterdiscount = finalPrice;

    return bilingObj;
}

//routes to redirect to user to different pages
router.get("/", async (req, res) => {
    const header = req.header("Authorization");
    if (!header) {
        // Set HTTP status code 401 for Unauthorized
        return res.json({ isAuthenticated: false });
    }
    const token = header.replace("Bearer ", "");

    if (!token || token == "null" || token == undefined) {
        return res.json({ isAuthenticated: false });
    } else {
        return res.json({ isAuthenticated: true });
    }
});

router.get("/dashboard", isAuth, async (req, res) => {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = await User.findOne({ githubId: token });
    return res.json({ username: data.displayName });
});

router.get("/billingsystem", isAuth, async (req, res) => {
    try {
        let total = 0;

        const token = req.header("Authorization").replace("Bearer ", "");
        const user = await User.findOne({ githubId: token });
        const billingdata = await Data.find({ githubId: token }).lean();

        for (const item of billingdata) {
            total = total + (await item).afterDiscount; //calculate total price
        }

        res.json({
            username: user.displayName,
            billingdata: billingdata,
            id: token,
            total: total,
        });
    } catch (err) {

        res.json('error')
    }
});


router.get("/user_info", isAuth, async (req, res) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const userdata = await User.findOne({ githubId: token }).lean();
        return res.json(userdata);
    } catch (err) {
        return res.json("error");
    }
});

router.post("/add-data", isAuth, async (req, res) => {
    try {

        let bilingObj = {
            cost: req.body.cost,
            quantity: req.body.quantity,
        };
        let billingData = calculatePrice(bilingObj);
        req.body.totalPrice = billingData.totalprice;
        req.body.discount = billingData.discount;
        req.body.afterDiscount = billingData.afterdiscount;
        req.body.githubId = req.header("Authorization").replace("Bearer ", "");

        await Data.create(req.body); //add data to database

        return res.json(req.body);
    } catch (err) {

        return res.json("error");
    }
});

router.put("/update_data", isAuth, async (req, res) => {
    try {
        let bilingObj = {
            cost: req.body.cost,
            quantity: req.body.quantity,
        };
        let billingData = calculatePrice(bilingObj);
        req.body.totalPrice = billingData.totalprice;
        req.body.discount = billingData.discount;
        req.body.afterDiscount = billingData.afterdiscount;
        //find entry based on object id and update with values from the form
        let data = await Data.findOneAndUpdate({ _id: req.body._id }, req.body, {
            runValidators: true,
        });

        return res.json({ success: true });
    } catch (err) {

        res.json('error')
    }
});

router.delete("/delete_data", isAuth, async (req, res) => {
    try {
        await Data.deleteOne({ _id: req.body._id }); //delete from database based on object id
        res.redirect("/billingsystem");
    } catch (err) {

        res.json('error')
    }
});

module.exports = router;