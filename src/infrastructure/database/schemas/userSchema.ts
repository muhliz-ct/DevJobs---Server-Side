import { Schema } from "mongoose";

export const UserSchema: Schema = new Schema(
    {
        fullName:{
            type: String,
            required: true
        },
        phoneNumber:{
            type: String,
            // required: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/
        },
        password:{
            type: String,
            // required: true
        },
        otp: {
            type: String,
            required: false,
        },
        otpExpiry: {
            type: Date,
            required: false,
        },

    },
    {timestamps: true}
)