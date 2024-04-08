<<<<<<< HEAD
require("dotenv").config();
require("express-async-errors");
=======
const express = require('express');
const connectDB = require('./database/connect');
const cors = require('cors');
const { auth } = require('express-openid-connect');
const postRoutes = require('./routes/post.routes');
const userController = require('./controllers/user');
>>>>>>> master

const app = express();

<<<<<<< HEAD
// ROUTERS
// const authRouter = require("./routes/auth.routes");
=======
app.use(cors());
>>>>>>> master


<<<<<<< HEAD
// * ROUTES
app.get("/api/v1/", (req, res) => {
  res.send("Hello World");
});
// app.use("/api/v1/auth", authRouter);
=======
// Connect to MongoDB
connectDB();
>>>>>>> master

// middleware
app.use(express.json());

<<<<<<< HEAD
// * LISTEN
const start = async () => {
  try {
    await connectToDB(process.env.MONGO_URL); // connect to database

    app.listen(PORT, () => {
      console.log(`Server is running at: ${SERVER_URL}`);
    });
  } catch (err) {
    console.log(err); // log error
  }
=======
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET_KEY,
    baseURL: 'http://localhost:3000',
    clientID: 'CV5gXGgjddhfEixRnKlIzb0A4HnE7sK4',
    issuerBaseURL: 'https://dev-60807hjlinnon75f.us.auth0.com'
>>>>>>> master
};

// Attach authentication routes (/login, /logout, /callback) to the application
app.use(auth(config));

// Define other routes and middleware for your application
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.post('/register', userController.registerUser);


const { requiresAuth } = require('express-openid-connect');

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});


// Routes
app.use('/api/v1/posts', postRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});