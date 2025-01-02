import { Schema } from "mongoose";


export const CompanySchema: Schema = new Schema(
    {
        companyname:{
            type: String,
            required: true
        },
        companyphone:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/
        },
        password:{
            type: String,
            required: true
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