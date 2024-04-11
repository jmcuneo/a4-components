import express from 'express'
import ViteExpress from 'vite-express'

import passport from 'passport'
import passportConfig from './config/passport.mjs'
import session from 'express-session'
import cors from 'cors'
import dayjs from 'dayjs'
import  connect from './db/connection.mjs'
import { database } from './db/connection.mjs'
import getNextID from './db/userData.mjs'
import { resolve } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory


const app = express()
// ViteExpress.config({ mode: "production" })

app.use(express.json())
passportConfig(passport);
app.use(express.json());
app.use(cors());
app.use(session({
	secret: 'sessionSecretHehe',
	resave: false,
	saveUninitialized: false,
	cookie: { maxAge: 60000 * 60 * 24 }
}));
app.use(passport.initialize());
app.use(passport.session());

const ensureAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("login.html");
}

app.get('/login', (req, res) => {
	res.redirect("login.html");
})

app.get('/auth/github',
	passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback',
	passport.authenticate('github', { failureRedirect: '/login' }),
	function (req, res) {
		// Successful authentication, redirect home.
		res.redirect('/');
	});



app.get("/", ensureAuthenticated, async (req, res) => {
	res.setHeader('content-type', 'text/html');
	res.sendFile(resolve(__dirname, "index.html"));
})


// route to get all shifts for the authorized user
app.get("/shifts/get", ensureAuthenticated, async (req, res) => {
	const db = database();

	const shifts = await db
		.collection("shifts")
		.find({ user: req.user.username })
		.toArray();
	shifts.forEach((shift) => {
		delete shift._id;
		delete shift.user;
	});
	res.send(shifts);
})

app.get("/shifts/name", ensureAuthenticated, (req, res) => {
	res.send({ user: req.user.username} );
})

// route to add a shift
app.post("/shifts/add", ensureAuthenticated, async (req, res) => {
	const db = database();

	// if the request doesnt have an ID, user wants to add a new shift.
	// create the new shift, and find the record for it.
	if (req.body.id == "") {
		let shiftID = await getNextID(req.user.username);
		const startDate = dayjs(req.body.start);
		const endDate = dayjs(req.body.end);
		const duration = endDate.diff(startDate, 'hour', true);
		const doc = {
			id: shiftID.toString(),
			user: req.user.username,
			start: startDate.toString(),
			end: endDate.toString(),
			duration: duration.toString()
		};
		await db.collection("shifts").insertOne(doc);
	} else {
		// use is requesting to update a shift
		const old = { id: req.body.id }
		const startDate = dayjs(req.body.start);
		const endDate = dayjs(req.body.end);
		const duration = endDate.diff(startDate, 'hour', true);
		const update = {
			$set: {
				start: startDate.toString(),
				end: endDate.toString(),
				duration: duration.toString()
			}
		};
		await db.collection("shifts").updateOne(old, update)
	}
	res.status(200).send('OK');
})

// route to delete a shift
app.post("/shifts/delete", ensureAuthenticated, async (req, res) => {
	// delete the requested shift !
	const db = database();
	const coll = db.collection("shifts");
	console.log(req.body);
	const query = { id: req.body.removeID, user: req.user.username };
	console.log(query);
	const find = await coll.findOne(query);
	if (find) {
		const result = await coll.deleteOne({ _id: find._id });
		if (result.deletedCount === 1) {
			console.log("success")
		} else {
			console.error("unsuccess");
		}
	}
	res.status(200).send('OK');
})

// connect to database first. then establish vite web server.
connect().then(() => {
	console.log("Connected to Mongo");
	ViteExpress.listen(app, 3000, () => {
		console.log("Listening to web requests");
	})

}).catch((err) => {
	console.log(err);
});
