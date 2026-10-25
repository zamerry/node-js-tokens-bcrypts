import jwt from "jsonwebtoken";
import config from "../other stuff/config.js";

const auth = (allowed_roles) => {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
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

            const {roles: user_role} = jwt.verify(token, config.secret_key)

            let has_role = false
            user_role.forEach(roles => {
                if (allowed_roles.includes(roles)) {
                    has_role = true
                }
            })

            if (!has_role) {
                return res.status(400).json({message: "нет доступа"})
            }
            next()

        } catch (e) {
            return res.status(400).json({message: "либо истек токен или неверный токен", error: e})
        }
    }
}

export default auth