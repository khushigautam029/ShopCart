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

    return {
        phone,
        expiresAt,
        otp
    };
};

