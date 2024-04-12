import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes/api/index.js';
import loginRoutes from './routes/api/login.js';
import path from 'path';
import session from 'express-session';
import ViteExpress from 'vite-express';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();

const port = process.env.PORT || 3000;
app.use(session({
    secret: 'your secret',
    resave: false,
    saveUninitialized: true
  }));


  app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {

    if (!req.session.userId && !req.path.startsWith('/api/login') && req.path != '/login.html') {
        res.redirect('/login.html');
    } else {
        next();
    }
});

//if already login and visting login page, redirect to index page
app.get('/login.html', (req, res) => {
    if (req.session.userId) {
        res.redirect('/index.html');
    } else {
        res.sendFile(path.join(__dirname, 'public', 'login.html'));
    }
}
);
//logout 
app.get('/logout', (req, res) => {
    req.session.userId = null;
    res.redirect('/login.html');
});

app.use(bodyParser.json());
app.use(express.json());
app.use('/api/login', loginRoutes);
app.use('/api', apiRoutes);


app.use(express.static(path.join(__dirname, 'dist/client')));






ViteExpress.listen( app, 3000 );