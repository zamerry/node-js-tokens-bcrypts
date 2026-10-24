import mongoose from "mongoose"

const Roles = new mongoose.Schema({
    value: {type: String, unique: true, default: "USER"}
})

export default mongoose.model('Role', Roles)