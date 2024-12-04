const User = require('../model/Users');

async function register(req, res) {
    try {
        const { username, password } = req.body;

        const newUser = new User({ username, password });

        await newUser.save();

        const token = newUser.generateAuthToken();

        res.status(201).json({ message: 'User added'});

    } catch (error) {
        res.status(500).json({ error: 'An error occurred while adding the user' });
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const token = user.generateAuthToken();

        res.status(200).json({ message: 'Login successful' });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
}



module.exports = { register,login };
