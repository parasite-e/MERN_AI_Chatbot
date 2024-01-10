import { hash, compare } from "bcrypt";
import User from "../models/User.js";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllUsers = async (req, res, next) => {
    //get all users from DB
    try {
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const userLogin = async (req, res, next) => {
    //user log in
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User not Registered");
        }
        const isCorrectPassword = await compare(password, user.password);
        if (!isCorrectPassword) {
            return res.status(403).send("Incorrect Password");
        }
        //clearing the cookies for new login
        res.clearCookie(COOKIE_NAME, {
            path: '/',
            domain: 'http://127.0.0.1:5173',
            httpOnly: true,
            signed: true
        });
        //creating the jwt token
        const token = createToken(user._id.toString(), user.email, "7d");
        //cookie expires date 
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        //creating the cookie
        res.cookie(COOKIE_NAME, token, {
            path: '/',
            domain: 'http://127.0.0.1:5173',
            expires,
            httpOnly: true,
            signed: true
        });
        return res.status(200).json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const userSignup = async (req, res, next) => {
    //user signup
    try {
        const { name, email, password } = req.body;
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(401).send("Already Registered");
        }
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        //creating cookies and token 
        //clearing the cookies for new signup
        res.clearCookie(COOKIE_NAME, {
            path: '/',
            domain: 'http://127.0.0.1:5173',
            httpOnly: true,
            signed: true
        });
        //creating the jwt token
        const token = createToken(user._id.toString(), user.email, "7d");
        //cookie expires date 
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        //creating the cookie
        res.cookie(COOKIE_NAME, token, {
            path: '/',
            domain: 'http://127.0.0.1:5173',
            expires,
            httpOnly: true,
            signed: true
        });
        return res.status(201).json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=user-controller.js.map