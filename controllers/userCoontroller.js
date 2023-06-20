import User, { validate } from '../model/user.js';

export const createUser = async (req, res) => {
    try {
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