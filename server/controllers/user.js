const User = require('../models/user.model');

exports.registerUser = async (req, res) => {
    try {
        // Extract user data from request body
        const { username, email, password, bio, userImage } = req.body;

        // Create a new user instance
        const newUser = new User({
            username,
            email,
            password,
            bio,
            userImage
        });

        // Save the user to the database
        await newUser.save();

        // Redirect the user to a success page or any other desired route
        res.redirect('/profile');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
    }
};
