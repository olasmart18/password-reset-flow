import User, { validate } from '../model/user.js';
import joi from 'joi';
import bcrypt from 'bcrypt';
// import jwt from 'jsonwewbtoken';

// cretae new user
export const register = async (req, res) => {
    try {
        // validate user data
        const { error } = validate(req.body);
        if (error) {
            res.status(400).json({
                message: error.details[0].message
            })
        } else {
            const user = new User(req.body)
            await user.save();
            res.status(200).json({
                message: 'user created',
                data: user
            });
        }
    } catch (err) {
        res.status(500).json({
            message: 'somrthing went wrong'
        });
    }
}

// login user
export const login = async (req, res) => {
    /**
     * login new user
     * create and sign token
     * cookies and session
     */
    try {
        // validate information provided
        const schema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        const { email, password } = req.body;
        const existUser = await User.findOne({ email: email });
        if (!existUser) return res.json({ message: 'email is not registered' });
        // compare user pasasword
        if (password !== existUser.password) return res.json({messgae: 'email or password not correct'});
        res.status(200).json({
                message: 'login successful'
            })
        
    } catch (err) {
        res.json({message: 'error, try again'});
    }
}