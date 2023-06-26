import joi from 'joi';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import sendEmail from '../utils/sendEmail.js';
import User from '../model/user.js';
import Token from '../model/token.js';

// provide email for password reset link
export const emailLink = async (req, res) =>{
   try {
    // validate email provided
    const schema = joi.object({email: joi.string().email().required()})
    const { error } = schema.validate(req.body);
    if (!error) {
        // find a user by email
            const user = await User.findOne({email: req.body.email});
           
            if (!user) {
                res.status(404).json({
                    message: 'email provided is not registered'
                })
            } else {
                const token = await Token.findOne({userId: user._id})
                   if(token)
                    await token.deleteOne();
                    const createToken = crypto.randomBytes(32).toString('hex');
                     // create a new token 
                   await new Token ({
                        userId: user._id,
                        token: createToken,
                        createdAt: Date.now()
                    }).save();
                const resetLink = `${process.env.BASE_URL}/password-reset/${createToken}/${user._id}`;
                await sendEmail(user.email, 'password reset', resetLink);
                res.status(200).json({
                    message: 'password reset link has been sent to your email',
                    link: resetLink
                })
            }
    } else {
        res.status(400).json({
            message: error.details[0].message
        })
    }
   } catch (err) {
    res.status(500).json({
        message: 'something went wrong, try again'
    })
   }
}

// reset password here
export const resetPassword = async (req, res) => {
    try {
        // request the token and user id from the params
        // the requested token and password should come 
        // with the password reset link
        const { token, userId } = req.params;
        const user = await User.findById(userId); // find the user reseting passord from db
        if (!user) return res.status(404).json({
            message: 'not a valid user'
        });
        // find the token associated with the userId from db
        const findToken = await Token.findOne({
            userId: user._id,
            token: token
        });
        if (!findToken) return res.status(400).json({
            message: 'token not valid or  expired'
        });
        // replace the old passord with new one 
        const password = req.body.password;
        // encrypted password before saving to db
        const saltRound = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, saltRound);
        const updatePwd = await User.findByIdAndUpdate({_id: userId},
            { $set: { password: hash }},
            { new: true });
        await updatePwd.save(); // save new data
        await findToken.deleteOne(); // delete  token fron db
        return res.status(200).json({
            message: 'password changed successfully'
        });
    } catch (err) {
        return res.status(500).json({
            message: 'server error, try again'
        })
    }
};