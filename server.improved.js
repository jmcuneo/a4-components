import express from 'express';
import vite from 'vite-express';
import passport from 'passport';
import passport_github from 'passport-github2';
import handlebars from 'express-handlebars';
import isolation from './isolation.js';
import database from './database.js';
import startProxy from './server.js';
import path from 'path';

console.log('path: '+path.resolve())

const
  app = express(),
  port = 3000,
  CALLBACK_DOMAIN = "https://game.gamestream.stream";
//CALLBACK_DOMAIN = "http://localhost:3000";

// setup database and sesions

database.set_up_db_store(app)

// setup handlebars

const hbs = handlebars.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './hbs');

// setup Passport

passport.use(new passport_github.Strategy({
  clientID: process.env.GITHUB_CLIENT,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: `${CALLBACK_DOMAIN}/auth/login/callback`
},
  function (accessToken, refreshToken, profile, done) {
    database.DB.findOne({ user_id: profile.id }).then((user) => {
      let is_new = false;
      if (user == null) {
        user = {
          user_id: profile.id,
          username: profile.username,
          equations: {}
        };
        database.DB.insertOne(user);
        is_new = true;
      }
      done(null, { id: profile.id, is_new });

    }).catch((err) => {
      console.log(err);
      done(null, null);
    });
  }
));


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, cb) => cb(null, user.id));

passport.deserializeUser((id, cb) => cb(null, { id }));

app.use(express.json());

// setup passport urls

app.post('/auth/login',
  passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/login/callback',
  passport.authenticate('github', { failureRedirect: '/failed' }),
  function (req, res) {
    if (req.user.is_new) {
      res.redirect('/created');
    } else {
      res.redirect('/success');
    }
  });



app.post("/auth/logout", (req, res) => {
  req.logout(function (err) {
    res.redirect('/logout');
  })
});

// setup login

function login_page(smallMess, message) {
  return (req, res) => {
    res.render('login', { message, smallMess, layout: false });
  }
}

app.get("/created", login_page("Account Success", "A new account has been made. Redirecting..."));
app.get("/success", login_page("Login Success", "You have been logged in. Redirecting..."));
app.get("/failed", login_page("Login Failed", "Login failed. Redirecting..."));
app.get("/logout", login_page("Logged Out", "You have been logged out. Redirecting..."));


// setup posts

app.post('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401).send()
  } else {
    try {
      isolation.evaluate(req.user.id, req.body.name ?? "", req.body.code ?? "").then((equations) => {
        if (equations == null) {
          req.logout(() => res.status(401).send());
          return;
        }
        res.writeHead(200, "OK", { "Content-Type": "application/json" });
        let json = Object.entries(equations).map(e => ({ name: e[0], code: e[1].code, result: e[1].result }))
        res.end(JSON.stringify(json));
      }).catch(e => {
        res.writeHead(404);
        res.end("script failed to run");
      });
    } catch (e) {
      res.writeHead(404);
      res.end("oh noes");
    }
  }
});

// Run

if (true) {
  // run proxy
  startProxy()
}

vite.listen(app, process.env.PORT || port)
