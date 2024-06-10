import { connect } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
    try {
        // Extract data from token
        const userId = await getDataFromToken(request);
        const user = await User.findById(userId).select("-password");

        // check if there is no user

        if (!user) {
            return NextResponse.json({
                error: "User doesn't exist"
            }, { status: 400 })
        }

        return NextResponse.json({
            message: "User found",
            data: user
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}