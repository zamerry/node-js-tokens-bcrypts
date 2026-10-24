import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {validationResult} from "express-validator"
import roles from "../models/roles.js";
import users from "../models/users.js";
import config from "./config.js";
import Users from "../models/users.js";
import Roles from "../models/roles.js";

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, config.secret_key, {expiresIn: "24h"})
}

class Controller {

    async create_role(req, res) {
        try {
            const {value} = req.body

            if (!value) {
                return res.status(400).json({message: "обязательно нужна роль"})
            }

            const is_duplicate = await Roles.findOne({value})
            if (is_duplicate) {
                return res.status(400).json({message: "такая роль уже есть"})
            }

            const create_role = new Roles({value})
            await create_role.save()
            return res.status(200).json({message: `роль ${value} создана`})
        } catch (e) {
            return res.status(500).json({message: "ошибка при создании роли"})
        }
    }

    async roles(req, res) {
        try {
            const find_roles = await Roles.find()
            return res.status(200).json(find_roles)
        } catch (e) {
            return res.status(500).json({message: "ошибка при поиске ролей"})
        }
    }

    async registration(req, res) {
        try {
            const error = validationResult(req)
            if (!error.isEmpty()) {
                return res.status(400).json({
                    message: "есть ошибка при регистрации, введите данные валидно",
                    error: error.array()
                })
            }
            const {username, password} = req.body
            const is_duplicate = await Users.findOne({username})
            if (is_duplicate) {
                return res.status(400).json({message: `имя ${username} занято`})
            }
            const hash_password = await bcrypt.hash(password, 10)
            const user_role = await Roles.findOne({value: "USER"})

            if (!user_role) {
                return res.status(500).json({message: "нет такой роли"})
            }

            const create_user = new Users({username, password: hash_password, roles: [user_role.value]})
            await create_user.save()
            return res.status(200).json({message: "успешная регистрация"})
        } catch (e) {
            return res.status(500).json({message: "ошибка с регистрацией пользователя", error: e})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body

            const user = await Users.findOne({username})

            if (!user) {
                return res.status(400).json({message: "пользователь не найден"})
            }

            const valid_password = await bcrypt.compare(password, user.password)

            if (!valid_password) {
                return res.status(400).json({message: "неверный пароль"})
            }

            return res.status(200).json({message: "вход разрешен"})

        } catch (e) {
            return res.status(500).json({message: "неизвестная ошибка при регистрации пользователя"}, e)
        }
    }

    async users(req, res) {
        try {
            const find_users = await Users.find()
            return res.status(200).json(find_users)
        } catch (e) {
            return res.status(500).json({message: "ошибка с регистрацией пользователя"})
        }
    }
}

export default new Controller()