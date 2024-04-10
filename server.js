import express from 'express';
import ViteExpress from 'vite-express';
import dotenv from 'dotenv';
import passport from 'passport';
import passport_github from 'passport-github2';
import session from 'cookie-session';
import MongoClient from 'mongodb';
import ejs from 'ejs';

dotenv.config();

const app = express();

const router = express.Router();
const GitHubStrategy = passport_github.Strategy;

app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
      
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`;
const client = new MongoClient.MongoClient(uri);

let collection = null;
let users = null;

async function run() {
    await client.connect();
    collection = await client.db("a3-EllysGorodisch").collection("Recipes");
    users = await client.db("a3-EllysGorodisch").collection("Users");
    console.log("Done!");
}

run();

const logger = (req, res, next) => {
    console.log("url:", req.url);
    next();
};

app.use(express.static("public"));
app.use(express.static("src"));
app.set("views", "./");
app.use(logger);
app.use(express.json());

// Cookie Session
app.use(session({
    maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
    keys: [process.env.COOKIE_KEY]
}));

// Regenerate Function
app.use(function(req, res, next) {
    if (req.session && !req.session.regenerate) {
        req.session.regenerate = (callback) => {
            callback();
        };
    }
    if (req.session && !req.session.save) {
        req.session.save = (callback) => {
            callback();
        };
    }
    next();
});

app.use(passport.initialize());
app.use(passport.session());

// Collection Checker
app.use((req, res, next) => {
    if (collection !== null) {
        next();
    } else {
        res.status(503).send();
    }
});

passport.use(
    new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "https://a4-ellysgorodisch.onrender.com/auth/github/redirect"
        //callbackURL: "/auth/github/redirect"
    }, async (accessToken, refreshToken, profile, done) => {
        console.log("Strategy:");
        await users.findOne({githubID: profile.id}).then(async (user) => {
            if (user) {
                console.log("Old User:");
                console.log(user);
                return done(null, user);
            } else {
                await users.insertOne({githubID: profile.id}).then((newUser) => {
                    console.log("New User:");
                    console.log(newUser);
                    return done(null, newUser.insertId);
                });
            }
        });
    })
);

function isUserAuthenticated(req, res, next) {
    console.log(req.user);
    if (req.user) {
        next();
    } else {
        return res.send('You must login!');
    }
}

passport.serializeUser((user, done) => {
    console.log("Serialize:");
    console.log(user);
    done(null, user);
});

passport.deserializeUser((user, done) => {
    console.log("Deserialize:");
    console.log(user);
    done(null, user);
});

app.get("/", (req, res) => {
    return res.render("dist/index.html");
});

router.get("/github", passport.authenticate("github", {
    scope: ['user:email']
}));

router.get("/github/redirect", passport.authenticate("github", {failureRedirect: "/"}), (req, res) => {
    console.log("Redirect:");
    console.log(req.user);
    if (req.user) {
        return res.redirect("/recipes");
    } else {
        return res.send("You must login!");
    }
});

router.get("/logout", (req, res) => {
    req.logout(() => {
        return res.redirect("/");
    });
});

app.use("/auth", router);

app.get("/recipes", isUserAuthenticated, (req, res) => {
    console.log(req.user);
    return res.render("dist/recipes.html");
});

async function createTable(res, userID) {
    let test = await collection.find({
        userID: userID
    }).toArray().then((data) => {
        console.log(data);
        let sort = {"Breakfast": 0, "Lunch": 1, "Dinner": 2};
        data.sort((a, b) => sort[a.type] - sort[b.type]);
        return data;
    });
    res.json(test);
};

app.get("/appdata", async (req, res) => {
    console.log("App Data:");
    console.log(req.user);
    await createTable(res, req.user._id);
});

app.post("/add", express.json(), async (req, res) => {
    const data = req.body;
    console.log(data);
    await collection.insertOne({
        userID: req.user._id,
        name: data.name,
        type: data.type,
        prep: data.prep,
        cook: data.cook,
        total: parseInt(data.prep) + parseInt(data.cook)
    }).then((result) => {
        console.log("Add:");
        console.log(result);
    });
    await createTable(res, req.user._id);
});

app.post("/remove", express.json(), async (req, res) => {
    const data = req.body;
    console.log(data);
    await collection.deleteOne({
        userID: req.user._id,
        name: {$regex: `^${data.name}$`, $options: "i"}
    }).then(async (result) => {
        console.log("Remove:");
        console.log(result);
        if (result.deletedCount === 0) {
            res.send("Error: Recipe Does Not Exist");
        } else {
            await createTable(res, req.user._id);
        }
    });
});

app.post("/modify", express.json(), async (req, res) => {
    const data = req.body;
    console.log(data);
    await collection.updateOne(
        {
            userID: req.user._id,
            name: {$regex: `^${data.name}$`, $options: "i"}
        }, {
            $set: {
                type: data.type,
                prep: data.prep,
                cook: data.cook,
                total: parseInt(data.prep) + parseInt(data.cook)
            }
        }
    ).then(async (result) => {
        console.log("Modify:");
        console.log(result);
        if (result.matchedCount === 0) {
            res.send("Error: Recipe Does Not Exist")
        } else {
            await createTable(res, req.user._id);
        }
    });
});

ViteExpress.listen(app, 3000);