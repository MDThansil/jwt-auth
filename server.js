const jwt = require('jsonwebtoken');
const express = require('express');

const app = express();

// middlewares
app.use(express.json());

// routes
app.use('/auth', require('./routes/auth.route'));

app.get('/protected', isLoggedIn, (req, res) => {
  res.send('you are in protected route!');
});

function isLoggedIn(req, res, next) {
  const authToken =
    req.body.token || req.query.token || req.headers['x-access-token'];

  if (!authToken) {
    return res
      .status(401)
      .json({ status: 'error', message: 'access token not provided!' });
  }

  try {
    const decoded = jwt.verify(authToken, 'thesecret');
    req.authUser = { id: decoded.id, name: decoded.name, email: decoded.email };
    next();
  } catch (e) {
    res.status(401).json({ status: 'error', message: 'auth session expired' });
  }
}

app.listen(process.env.PORT || 8000, () => {
  console.log('server started');
});
