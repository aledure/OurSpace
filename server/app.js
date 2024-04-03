require("dotenv").config();
// require("express-async-errors");

const express = require("express"); // import express
const app = express(); // create express app
const connectToDB = require("./db/connect");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// ROUTERS
 const authRouter = require("./routes/auth.routes");
// const blogRouter = require('./routes/blog.routes');
 const postsRouter = require("./routes/posts.routes");

// * MIDDLEWARE
app.use(express.json()); // parse json data
// app.use(cookieParser(process.env.JWT_SECRET));
// app.use(
//     cors({
//         origin: "http://localhost:4200",
//         credentials: true,
//     })
// );

// * ROUTES
app.get("/api/v1/", (req, res) => {
    res.send("Hello World");
});
 app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/blog", blogRouter);
 app.use("/api/v1/posts", postsRouter);

// * CONFIG
const PORT = 5000; // port number
const SERVER_URL = `http://localhost:${PORT}`; // server url

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
};

start();
