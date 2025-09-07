import User from '../models/user.models.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//Create User Function
export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        for (const [key, value] of Object.entries(req.body)) {
            if (!value?.trim()) {
                res.status(400)
                    .json({
                        success: false,
                        message: `${key} is required`,
                    });
                break;
            };
        };
        if (password.length < 6) {
            return res.status(400)
                .json({
                    success: false,
                    message: "Password minimum length must be 6"
                })
        }
        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(400)
                .json({
                    success: false,
                    message: "User already exist",
                    error: error.message
                });
        };

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashPassword
        });
        await newUser.save();

        return res.status(201)
            .json({
                success: true,
                message: "User Successfully Register"
            })
    } catch (error) {
        return res.status(500)
            .json({
                success: false,
                message: "server error in create user",
                error: error.message
            });
    }
};
//Login User Function
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        for (const [key, value] of Object.entries(req.body)) {
            if (!value?.trim()) {
                return res.status(400)
                    .json({
                        success: false,
                        message: `${key} is required`
                    });
            };
        };

        const verifyEmail = await User.findOne({ email });
        if (!verifyEmail) {
            return res.status(403)
                .json({
                    success: false,
                    message: "Invalid Credentials",
                    error: error.message
                });
        };
        const verifyPassword = await bcrypt.compare(password, verifyEmail.password);
        if (!verifyPassword) {
            return res.status(403)
                .json({
                    success: false,
                    message: "Invalid Credentials"
                })
        };
        const token = jwt.sign({
            _id: verifyEmail._id,
            email: verifyEmail.email
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1d'
        });

        return res.cookie("token", token, {
            httpOnly: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        }).json({
            success: true,
            message: "User Login Successfully",
            token
        })
    } catch (error) {
        return res.status(500)
            .json({
                success: false,
                message: "server error in login user",
                error: error.message
            })
    }
};
//LogOut User Function
export const logoutUser = async (req, res) => {
    try {
        return res.clearCookie("token")
            .json({
                success: true,
                message: "User Logout Successfully",
            });
    } catch (error) {
        return res.status(500)
            .json({
                success: false,
                message: "server error in logout user",
                error: error.message
            });
    };
};


