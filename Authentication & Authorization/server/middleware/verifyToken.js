import jwt from 'jsonwebtoken';

export const VerifyToken = async (req, res, next) => {
    try {
        const getToken = req.cookies.token || req.headers('authorization')?.split(" ")[1];
        if (!getToken) {
            return res.status(404)
                .json({
                    success: false,
                    message: "token not found"
                });
        };
        const decode = jwt.verify(getToken, process.env.JWT_SECRET_KEY);
        req.user = decode;

        next();
    } catch (error) {
        return res.status(500)
            .json({
                succuss: false,
                message: "server error in verify token",
                error: error.message
            });
    };
};