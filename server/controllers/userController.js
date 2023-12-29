const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Project = require('../models/Project.js');

const { validationResult } = require('express-validator');

const bcryptSalt = bcrypt.genSaltSync(10);


exports.getProfile = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.json(null);
        }

        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
            if (err) {
                console.error(err);
                return res.status(401).json({ error: 'Token is not valid' });
            }

            try {
                const user = await User.findById(userData.id);

                if (user) {
                    const { name, email, _id } = user;
                    res.json({ name, email, _id });
                } else {
                    console.error('User not found');
                    res.status(404).json({ error: 'User not found' });
                }
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Server error' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.signup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({ errors: errorMessages });
        }

        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Please fill all the required fields correctly.' });
        }

        const newUser = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        })

        res.json({ newUser });

    } catch (error) {
        console.error(error);
        res.status(402).json({ error: 'Unexpected error occurred. Try again later' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const passwordMatch = bcrypt.compareSync(password, user.password);
            if (passwordMatch) {
                jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token, { httpOnly: true, secure: true, samesite: 'none' }).json (user);
                });
            } else {
                res.status(422).json({ error: `Password doesn't match. Kindly check it once again` });
            }
        } else {
            res.status(404).json({ error: 'No accounts were found linked to the information provided.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.logout = async (req, res) => {
    try {
        res.cookie('token', '').json(true);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getUserDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        const userDetails = await User.findById(userId);
        res.status(200).json(userDetails);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.editUserDetails = async (req, res) => {
    try {
        const { name, email, bio } = req.body;
        const userId = req.user.id;

        if (userId) {
            try {
                const userDetails = await User.findById(userId);
                userDetails.set({ name, email, bio });
                await userDetails.save();
                res.status(200).json('Succesfully Updated');
            } catch (error) {
                throw error;
            }
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.changeUserPassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmNewPassword } = req.body;
        const { id } = req.user;

        try {
            const user = await User.findById(id);
            const isPasswordValid = await bcrypt.compareSync(currentPassword, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Current password is incorrect.' });
            }

            if (newPassword !== confirmNewPassword) {
                return res.status(400).json({ error: 'New password and confirmation password does not match' })
            }

            const newHashedPassword = await bcrypt.hashSync(newPassword, bcryptSalt);

            user.password = newHashedPassword;

            await user.save();
            res.cookie('token', '');

            res.json({ message: 'Password changed succesfully' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getUserProjects = async (req, res) => {
    try {
        const userId = req.user.id;
        const userProjects = await Project.find({ creator: userId });
        res.status(200).json(userProjects);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getBackedProjects = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const backedProjects = [];

        for (const fundedProject of user.fundedProjects) {
            const project = await Project.findById(fundedProject.projectId);

            if (project) {
                backedProjects.push({ project, amount: fundedProject.amount });
            }
        }
        res.json({ backedProjects });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

};