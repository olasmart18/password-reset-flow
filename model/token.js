import { Schema, model } from 'mongoose';

const tokenSchema = new Schema ({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600
    }
});
const Token = model ('Token', tokenSchema);

export default Token;