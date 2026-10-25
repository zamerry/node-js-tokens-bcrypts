import jwt from "jsonwebtoken";
import config from "../other stuff/config.js";

const auth = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next()
    }

    try {
        const auth_header = req.headers.authorization

        if (!auth_header) {
            return res.status(400).json({message: "пользователь не зарегестрирован"})
        }

        const token = auth_header.split(" ")[1]
        if (!token) {
            return res.status(400).json({message: "неверный формат токена"})
        }

        const decoded_data = jwt.verify(token, config.secret_key)
        req.user = decoded_data
        next()
    } catch (e) {
        return res.status(400).json({message: "есть ошибки", error: e})
    }
}

export default auth