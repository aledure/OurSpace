// IMPORTS
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); 
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

const app = express();

// Create a transporter object to send emails
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Middleware for parsing JSON
app.use(express.json());

// Register
app.post('/register', async (req, res) => {
  // Hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // Create new user
  let user = new User({
    ...req.body,
    password: hashedPassword
  });
  await user.save();

  // Create a verification token
  let verificationToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Create a verification link
  let verificationLink = `http://localhost:3000/verify-email?token=${verificationToken}`; // change to actual link*************

  // Send verification email
  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Email Verification',
    text: `Please verify your email by clicking on the following link: ${verificationLink}`, 
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.send('Signup successful. Please check your email to verify your account.');
});

// email verification
app.get('/verify-email', async (req, res) => {
  try {
    let payload = jwt.verify(req.query.token, process.env.JWT_SECRET);
    let user = await User.findById(payload.id);
    user.emailVerified = true;
    await user.save();
    res.send('Email verification successful.');
  } catch (error) {
    res.send('Email verification failed.');
  }
});

// Password reset request
app.post('/password-reset-request', async (req, res) => {
  // Find user
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send('No account with that email address exists.');
  }

  // Create password reset token and expiration
  user.passwordResetToken = crypto.randomBytes(20).toString('hex');
  user.passwordResetExpires = Date.now() + 3600000; // 1 hour from now

  await user.save();

  // Create reset link
  let resetLink = `http://localhost:3000/reset-password?token=${user.passwordResetToken}`; // change to actual link*************

  // Send reset email
  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Password Reset',
    text: `Please reset your password by clicking on the following link: ${resetLink}`,
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.send('Password reset email sent.');
});

// Password reset
app.post('/reset-password', async (req, res) => {
  // Find user
  const user = await User.findOne({ 
    passwordResetToken: req.body.token, 
    passwordResetExpires: { $gt: Date.now() } 
  });

  if (!user) {
    return res.status(400).send('Password reset token is invalid or has expired.');
  }

  // Hash new password and clear reset token and expiration
  user.password = await bcrypt.hash(req.body.password, 10);
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  res.send('Password has been reset.');
});

// JWT middleware
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Login
app.post('/login', async (req, res) => {
  // Find user
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send('No account with that email address exists.');
  }

  // Check password
  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(400).send('Invalid password.');
  }

  // Create and sign a JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.send({ token });
});

// Other routes and functions...

app.listen(3000, () => console.log('Server started on port 3000')); // change to actual port*************

// EXPORTS
module.exports = app;