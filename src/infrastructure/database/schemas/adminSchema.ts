import { Schema } from "mongoose";

export const AdminSchema: Schema = new Schema(
    {
        fullName:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        }
    },
    {timestamps: true}
)