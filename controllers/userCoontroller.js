import User, { validate } from '../model/user.js';
import joi from 'joi';
import bcrypt from 'bcrypt';
// import jwt from 'jsonwewbtoken';

// create new user
export const register = async (req, res) => {
    try {
        // validate user data
        const { error } = validate(req.body);
        if (error) {
            res.status(400).json({
                message: error.details[0].message
            })
        } else {
            const password = req.body.password;
            const saltRound = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, saltRound);
            // create new user
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            await user.save();
            res.status(200).json({
                message: 'user created',
                data: user
            });
        }
    } catch (err) {
        res.status(500).json({
            message: 'something went wrong'
        });
    }
}

// login user
export const login = async (req, res) => {
    try {
        // validate information provided
        const schema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).json({
            message: error.details[0].message });

        const { email, password } = req.body;
        const existUser = await User.findOne({ email: email }); // find existing user
        if (!existUser) return res.json({
            message: 'email is not registered' });
        // compare user pasasword
        const correctPwd = bcrypt.compareSync(password, existUser.password);
        if (!correctPwd) return res.json({
            messgae: 'email or password not correct' });
        res.status(200).json({
                message: 'login successful'
            })
        
    } catch (err) {
        res.json({message: 'error, try again'});
    }
}