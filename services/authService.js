import { OtpVerification, User } from "../models/index.js";
import generateToken from "../utils/generateToken.js";
import { createAndSendOtp } from "./otpService.js";

export const loginWithPhone = async (phone) => {
    // First check if the phone already exists
    let user = await User.findOne({
        attributes: ["id", "phone"],
        where: {
            phone,
        },
    });

    // Existing user
    if (user) {
        // Seller cannot use customer login
        if (user.role === "SELLER") {
            throw new Error(
                "This phone number belongs to a seller account. Please use seller login."
            );
        }
        // Customer status checks
        if (user.status === "BLOCKED") {
            throw new Error("Your account has been blocked");
        }

        if (user.status === "INACTIVE") {
            throw new Error("Your account is inactive");
        }
    }

    // New customer → create account
    if (!user) {
        user = await User.create({
            phone,
            role: "CUSTOMER",
            status: "ACTIVE",
            isVerified: false,
        });
    }

    // Send OTP
    const otpData = await createAndSendOtp(phone);
    return {
        user,
        otp: otpData.otp,
        expiresAt: otpData.expiresAt,
    };
};

export const verifyLoginOtp = async (phone, otp) => {
    const otpRecord = await OtpVerification.findOne({
        where: {
            phone,
            otp,
            verifiedAt: null,
        },
        order: [["created_at", "DESC"]],
    });

    if (!otpRecord) {
        throw new Error("Invalid OTP");
    }

    if (new Date() > otpRecord.expiresAt) {
        throw new Error("OTP has expired");
    }

    const user = await User.findOne({
        where: {
            phone,
            role: "CUSTOMER",
        },
    });

    if (!user) {
        throw new Error("Customer account not found");
    }

    if (user.status !== "ACTIVE") {
        throw new Error("Your account is not active");
    }

    await otpRecord.update({
        verifiedAt: new Date(),
    });

    await user.update({
        isVerified: true,
    });

    const token = generateToken(user);

    return {
        user: {
            id: user.id,
            name: user.name,
            phone: user.phone,
            role: user.role,
            status: user.status,
            isVerified: user.isVerified,
        },
        token,
    };
};

export const loginSellerWithPhone = async (phone) => {
    const user = await User.findOne({
        where: {
            phone,
            role: "SELLER",
        },
    });

    if (!user) {
        throw new Error(
            "Seller account not found. Please use your registered seller phone number."
        );
    }

    if (user.status === "BLOCKED") {
        throw new Error("Your seller account has been blocked");
    }

    if (user.status === "INACTIVE") {
        throw new Error("Your seller account is inactive");
    }

    const otp = await createAndSendOtp(phone);
    return {
        phone,
        role: user.role,
        otp,
    };
};

export const verifySellerLoginOtp = async (phone, otp) => {
    const otpRecord = await OtpVerification.findOne({
        where: {
            phone,
            otp,
            verifiedAt: null,
        },
        order: [["created_at", "DESC"]],
    });

    if (!otpRecord) {
        throw new Error("Invalid OTP");
    }

    if (new Date() > otpRecord.expiresAt) {
        throw new Error("OTP has expired");
    }

    const user = await User.findOne({
        where: {
            phone,
            role: "SELLER",
        },
    });

    if (!user) {
        throw new Error("Seller account not found");
    }

    if (user.status !== "ACTIVE") {
        throw new Error("Your seller account is not active");
    }

    await otpRecord.update({
        verifiedAt: new Date(),
    });

    await user.update({
        isVerified: true,
    });

    const token = generateToken(user);

    return {
        user: {
            id: user.id,
            name: user.name,
            phone: user.phone,
            role: user.role,
            status: user.status,
            isVerified: user.isVerified,
        },
        token,
    };
};