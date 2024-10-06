const User = require('../models/user.model').User;

const registerUser = async (req, res) => {
    try {
        console.log('User Details: ', req.body);

        // Check if the username already exists
        let existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).send('Username already exists!');
        }

        // If username is not taken, create a new user
        let userData = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        await userData.save();
        res.send('User registered successfully!');
    } catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong');
    }
};

const getUser = async (req, res) => {
    try {
        User.find({})
            .then(data => res.send(data))
            .catch(err => res.status(500).send('Something went wrong'));
    } catch (err) {
        console.log(err);
        res.status(500).send('ERR');
    }
};

const getUserById = async(req,res) => {
    try{
        User.findById(req.params.id)
        .then(data => res.send(data))
        .catch(err => res.send('something went wrong'))
    }catch(err){
        console.log(err)
        res.send('ERR')
    }
}

const updateUserById = async(req,res) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            },
            {
                new: true
            }
        )
        if(!updatedUser){
           return res.status(404).send('User Not found')
        }
        res.send(updatedUser)
    }catch(err){
        console.log(err)
        res.send('ERR')
    }
}

const deleteUserById = async(req,res) => {
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        if(!deletedUser){
            return res.status(404).send('User Not found')
        }
        res.send('User deleted successfully')
    }catch(err){

    }
}

module.exports = { registerUser,getUser, getUserById, updateUserById, deleteUserById }

