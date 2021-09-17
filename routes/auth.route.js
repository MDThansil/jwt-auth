const jwt = require('jsonwebtoken');
const router = require('express').Router();

const users = [
  {
    id: 1,
    name: 'User 1',
    email: 'mail1@mail.com',
    password: 'password@1',
  },
  {
    id: 2,
    name: 'User 2',
    email: 'mail2@mail.com',
    password: 'password@2',
  },
  {
    id: 3,
    name: 'User 3',
    email: 'mail3@mail.com',
    password: 'password@3',
  },
];

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res
      .status(400)
      .json({ status: 'error', message: 'input not provided!' });
  }

  const user = users.find(
    (item) => item.email == email && item.password == password
  );

  if (user) {
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      'thesecret',
      {
        expiresIn: '1h',
      }
    );
    res.status(200).json({ status: 'success', authToken: token });
  } else {
    res.status(401).json({ status: 'error', message: 'Login failed!' });
  }
});

module.exports = router;
