const express = require('express');
const axios = require('axios');
const router = express.Router();

// Redirect 
router.get('/github', (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = 'http://localhost:3001/auth/github/callback';
  const scope = 'read:user';
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  res.redirect(githubAuthUrl);
});

// OAuth Callback
router.get('/github/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) {
    res.status(400).send('Error: No code returned from GitHub OAuth');
    return;
  }
  try {
    const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }, { headers: { Accept: 'application/json' } });

    const accessToken = tokenResponse.data.access_token;
    req.session.accessToken = accessToken;  // Store access token in session
    res.cookie('isAuthenticated', true, { httpOnly: false });  // Set a client-side accessible cookie
    res.redirect('http://localhost:3000/home');  // Redirect to Home page in frontend
  } catch (error) {
    console.error('Error exchanging GitHub code for access token:', error);
    res.status(500).send('Authentication failed');
  }
});

// Logout 
router.get('/logout', (req, res) => {
  req.session.destroy((err) => { // Ensure sessions are properly configured to be destroyed
    if (err) {
      console.error('Failed to destroy the session on logout', err);
      res.status(500).send('Logout failed');
    } else {
      res.clearCookie('isAuthenticated'); // Also clear the cookie set during authentication
      res.redirect('http://localhost:3000/'); // Don't know if I need this??
    }
  });
});


module.exports = router;
