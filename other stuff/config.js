import dotenv from 'dotenv'

dotenv.config()

const secret_obj = {
    secret_key: process.env.SECRET_KEY
}

export default secret_obj