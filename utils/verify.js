import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.cookies.uuid;
    if (!token) return res.json({
        message: 'unauthorised'
    });
    jwt.verify(token, process.env.SECRET_KEY, (err) => {
        if (err)  return res.send('invalid token');
        next(); 
    })
   
}

export default verifyToken;