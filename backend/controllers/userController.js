import User from "../models/User.js";
import generateJWT from "../helpers/generateJWT.js";
import generateId from "../helpers/generateId.js";
import { emailRegister } from "../helpers/emails.js";

const register = async (req, res) => {
    const {email, name, password} = req.body;

    //prevent duplicate users
    const existUser = await User.findOne({where: {email}})
    if(existUser){
        const error = new Error("The user has already been registered");
        return res.status(400).json({msg: error.message});
    }

    try {
        //Save new User
        const user = await User.create({
            email,
            name,
            password,
            token: generateId()
        });

        //Send confirmation email
        emailRegister({
            email: user.email,
            name: user.name,            
            token: user.token
        });

        res.status(200).json({
            email: user.email,
            name: user.name,
            token: user.token
        })
        
    } catch (error) {
        console.log(error);
    }
}

const confirm = async (req, res) => {
    const {token} = req.params;

    const confirmedUser = await User.findOne({where: {token}});

    //If token was used before and it not exists more
    if(!confirmedUser){
        const error = new Error("Token does not exist");
        return res.status(404).json({msg: error.message});
    }

    try {
        confirmedUser.token = null;
        confirmedUser.confirmed = true;
        await confirmedUser.save();
        return res.status(201).json({msg: "Account confirmed successfully"})
    } catch (error) {
        console.log(error);
    }    
}

const authenticate = async (req, res) => {
    const {email, password} = req.body;
    
    //user exists?
    const user = await User.findOne({where: {email}});
    if(!user) {
        const error = new Error("User does not exist");
        return res.status(404).json({ msg: error.message });
    }

    // is confirmed?
    if (!user.confirmed) {
        const error = new Error("Your account has not been confirmed");
        return res.status(403).json({ msg: error.message });
    }

    //review password
    if(await user.verifyPassword(password)) {
        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateJWT(user.id)
        })
    } else {
        const error = new Error("Incorrect password");
        return res.status(403).json({ msg: error.message });
    }
}

const profile = async (req, res) => {
    const {user} = req;
    res.status(200).json(user);
}

export {
    register,
    confirm,
    authenticate,
    profile
}