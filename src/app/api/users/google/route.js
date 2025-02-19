import { ApiError } from "@/helpers/ApiError.js";
import { connect } from "@/dbconfig/dbConfig.js";
import User from "@/models/userModel.js";
import jwt from 'jsonwebtoken'
import { NextResponse } from "next/server";

connect();

export async function POST(request){

    try {
        const { email, name } = await request.json();
        if(!email) throw new ApiError(500, "email not recieved");
        const presentUser = await User.findOne({email});
    
        if(presentUser){
            const token = jwt.sign(
                {
                    id: presentUser._id
                }, 
                process.env.ACCESS_TOKEN_SECRET, 
                {
                    expiresIn: "1d"
                }
            )
    
            if(!token) throw new ApiError(500, "token not recieved");    
            const response = NextResponse.json({
                message: "Successfully logged in",
                success: true,
                data: presentUser
            }, { status: 200 })
    
            response.cookies.set("access_token", token, { httpOnly: true, secure: true });
            return response;
            
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const newUser = await User.create({
                username: name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4),
                email,
                password: generatedPassword,
                address: "abc"
            })
            if(!newUser) throw new ApiError(500, "Unable to create user")
            const token = jwt.sign(
                {
                    id: newUser._id
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "1d"
                }
            )
            const response = NextResponse.json({
                message: "User created successfully",
                success: true,
                data: newUser
            }, { status: 200 })
            response.cookies.set("access_token", token, {
                httpOnly: true,
                secure: true
            })
            return response;
        }
    } catch (error) {
        const response = NextResponse.json({
            message: error.message,
            success: false
        }, {
            status: error.statusCode || 500
        })
        return response;
    }

}