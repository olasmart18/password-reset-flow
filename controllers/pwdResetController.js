import joi from 'joi';
import crypto from 'crypto';
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
                   
                    console.log(user._id);
                    const createToken = crypto.randomBytes(32).toString('hex');
                    console.log(createToken);
                     // create a new token 
                   await new Token ({
                        userId: user._id,
                        token: createToken,
                        createdAt: Date.now()
                    }).save();
                   

                    console.log(token);

                const resetLink = `${process.env.BASE_URL}/password-reset/?token=${createToken}$id=${user._id}`;
                console.log(resetLink);
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
    
}