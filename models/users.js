import mongoose from "mongoose"

const Users = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role', required: true}]
})

export default mongoose.model('User', Users)