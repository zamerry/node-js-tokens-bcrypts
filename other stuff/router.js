import {Router} from "express"
import Controller from "./controller.js";
import {check} from "express-validator";

const router = new Router()

router.post('/create_roles', Controller.create_role)
router.get('/find_roles', Controller.roles)
router.post('/registration', [
        check('username', 'имя пользователя не может быть пустым').notEmpty(),
        check('password', 'пароль должен быть больше 4 и меньше 12 символов').isLength({min: 4, max: 12})
    ], Controller.registration
)
router.post('/login', Controller.login)
router.get('/users', Controller.users)

export default router