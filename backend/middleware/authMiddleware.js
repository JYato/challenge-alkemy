import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const checkAuth = async (req, res, next) => {
    let token;
    
    if( req.headers.authorization && req.headers.authorization.startsWith("Bearer") ){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.scope('withOutFields').findByPk(decoded.id);
            if(user) {
                req.user = user;
            } else {
                const e = new Error("Invalid user");
                return res.status(403).json({ msg: e.message});
            }

            return next();
        } catch (error) {
            const e = new Error("Invalid token");
            return res.status(403).json({ msg: e.message});
        }
    }
};

export default checkAuth;