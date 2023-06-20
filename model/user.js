import { Schema, model } from "mongoose";
import joi from 'joi'

const userSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true});

const User = model('User', userSchema);

 const validate = (user) => {
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required()
    });
    return schema.validate(user);
}


export default User; 
export { validate }