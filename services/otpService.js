import { OtpVerification } from "../models/index.js";
import generateOtp from "../utils/generateOtp.js";

export const createAndSendOtp = async (phone) => {
    const otp = generateOtp();

    const expiresAt = new Date(
        Date.now() + 5 * 60 * 1000
    );

    await OtpVerification.create({
        phone,
        otp,
        expiresAt,
    });

    if (process.env.OTP_PROVIDER === "console") {
        console.log(`📱 OTP for ${phone}: ${otp}`);
    }

    if (process.env.OTP_PROVIDER === "sms") {
        // SMS provider will be integrated here later
        console.log("📲 SMS OTP provider is enabled");
    }

    return {
        phone,
        expiresAt,
        otp
    };
};

