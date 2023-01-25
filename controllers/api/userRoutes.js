const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    try {
        const userDb = await User.findOne({
            where: {
                email: req.body.email,
            }
        });

        if (!userDb) {
            res.status(404).json({message: 'Doesnt exist a user with that email. Please use a registered email, or create and account.'});
            return;
        }

        const validPassword = await bcrypt.compare(req.body.password, userDb.password);
        if (!validPassword) {
            res.status(404).json({message: 'Your password is incorrect. Please use a registered email, or create and account.'});
            return; 
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json({message: 'Login succeeded'});
        });

    } catch(err) {
        res.status(500).json({message: "An error occurred, please try again. If problem persists, contact us"});
    }
});

module.exports = router;