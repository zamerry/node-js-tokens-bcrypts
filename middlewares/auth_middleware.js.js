import jwt from "jsonwebtoken";
import config from "../other stuff/config.js";

const auth = (allowed_roles) => {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            return next()
        }
    }
}

export default auth