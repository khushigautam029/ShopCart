import { useState } from "react";
import toast from "react-hot-toast";
import {
    FiArrowLeft,
    FiArrowRight,
    FiCheckCircle,
    FiLock,
    FiPhone,
    FiShoppingBag,
    FiUser,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import API from "../../utils/api";

function Login() {
    const navigate = useNavigate();
    const { loginWithToken } = useAuth();

    const [role, setRole] = useState("CUSTOMER");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const isValidPhone = /^[6-9]\d{9}$/.test(phone);

    const sendOtp = async (event) => {
        event?.preventDefault();

        if (!isValidPhone) {
            toast.error("Please enter a valid 10-digit phone number");
            return;
        }

        try {
            setLoading(true);

            const endpoint =
                role === "CUSTOMER"
                    ? "/auth/login"
                    : "/auth/seller-login";

            await API.post(endpoint, { phone });

            setOtpSent(true);
            setOtp("");
            toast.success("OTP sent successfully!");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to send OTP. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async (event) => {
        event.preventDefault();

        if (!/^\d{6}$/.test(otp)) {
            toast.error("Please enter a valid 6-digit OTP");
            return;
        }

        try {
            setLoading(true);

            const endpoint =
                role === "CUSTOMER"
                    ? "/auth/verify-otp"
                    : "/auth/seller-verify-otp";

            const response = await API.post(endpoint, {
                phone,
                otp,
            });

            let result = response.data;

            while (
                result?.data &&
                typeof result.data === "object" &&
                !result.token
            ) {
                result = result.data;
            }

            const { token, user } = result;

            if (!token || !user) {
                throw new Error("Invalid login response from server");
            }

            loginWithToken(token, user);
            toast.success("Login successful!");

            navigate("/");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                error.message ||
                "OTP verification failed"
            );
        } finally {
            setLoading(false);
        }
    };

    const changePhone = () => {
        setOtpSent(false);
        setOtp("");
    };

    const handleRoleChange = (newRole) => {
        if (loading) return;

        setRole(newRole);
        changePhone();
    };

    return (
        <div className="min-h-screen w-full bg-[#F8F6FB] flex items-center justify-center px-4 py-6 sm:px-6">

            <div className="w-full max-w-[880px] bg-white border border-[#EAE4F2] rounded-2xl shadow-[0_8px_35px_rgba(48,40,59,0.08)] overflow-hidden grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr]">

                {/* Left Branding Section */}
                <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-[#5E3F89] to-[#7652A5] p-8 lg:p-10 text-white">

                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight"
                    >
                        <span className="bg-white/15 p-2 rounded-lg">
                            <FiShoppingBag size={21} />
                        </span>
                        ShopCart<span className="text-[#E9E0F5]">.</span>
                    </Link>

                    <div className="my-8">
                        <div className="w-10 h-1 rounded-full bg-[#D9C5F1] mb-5" />

                        <h1 className="text-3xl lg:text-[34px] font-bold leading-tight">
                            Your shopping,
                            <br />
                            made easier.
                        </h1>

                        <p className="text-sm text-white/80 leading-6 mt-4 max-w-[280px]">
                            Sign in to discover products, explore exclusive
                            deals and manage all your shopping in one place.
                        </p>

                        <div className="mt-7 space-y-3 text-sm text-white/90">
                            <div className="flex items-center gap-2">
                                <FiCheckCircle size={16} />
                                Easy and secure login
                            </div>

                            <div className="flex items-center gap-2">
                                <FiCheckCircle size={16} />
                                Track your orders
                            </div>

                            <div className="flex items-center gap-2">
                                <FiCheckCircle size={16} />
                                Exclusive shopping offers
                            </div>
                        </div>
                    </div>

                    <p className="text-xs text-white/60">
                        Your shopping journey starts here.
                    </p>
                </div>

                {/* Right Login Section */}
                <div className="p-5 sm:p-8 lg:p-10">

                    {/* Mobile Branding */}
                    <div className="md:hidden mb-6">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-xl font-bold text-[#7652A5]"
                        >
                            <FiShoppingBag size={21} />
                            ShopCart.
                        </Link>
                    </div>

                    {/* Heading */}
                    <div className="mb-6">
                        <p className="text-xs font-bold tracking-[0.15em] text-[#7652A5] mb-2">
                            WELCOME BACK
                        </p>

                        <h2 className="text-2xl sm:text-[27px] font-bold text-[#30283B]">
                            {otpSent ? "Verify your number" : "Login to ShopCart"}
                        </h2>

                        <p className="text-sm text-[#77717F] mt-2">
                            {otpSent
                                ? `Enter the 6-digit OTP sent to +91 ${phone}`
                                : "Enter your mobile number to get started."}
                        </p>
                    </div>

                    {/* Role Selection */}
                    <div className="mb-5">
                        <label className="block text-sm font-semibold text-[#30283B] mb-2">
                            Continue as
                        </label>

                        <div className="grid grid-cols-2 gap-2 p-1 bg-[#F8F6FB] rounded-xl border border-[#EAE4F2]">

                            <button
                                type="button"
                                disabled={loading}
                                onClick={() => handleRoleChange("CUSTOMER")}
                                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold transition ${
                                    role === "CUSTOMER"
                                        ? "bg-white text-[#7652A5] shadow-sm border border-[#E9E0F5]"
                                        : "text-[#77717F] hover:text-[#7652A5]"
                                }`}
                            >
                                <FiUser size={16} />
                                Customer
                            </button>

                            <button
                                type="button"
                                disabled={loading}
                                onClick={() => handleRoleChange("SELLER")}
                                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold transition ${
                                    role === "SELLER"
                                        ? "bg-white text-[#7652A5] shadow-sm border border-[#E9E0F5]"
                                        : "text-[#77717F] hover:text-[#7652A5]"
                                }`}
                            >
                                <FiShoppingBag size={16} />
                                Seller
                            </button>
                        </div>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={otpSent ? verifyOtp : sendOtp}>

                        {/* Phone Number */}
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-[#30283B] mb-2">
                                Mobile Number
                            </label>

                            <div className="flex items-center h-11 border border-[#E5DDEC] rounded-lg overflow-hidden transition focus-within:border-[#7652A5] focus-within:ring-2 focus-within:ring-[#7652A5]/10">

                                <div className="h-full flex items-center gap-2 px-3 bg-[#F8F6FB] border-r border-[#E5DDEC] text-sm font-medium text-[#51475E]">
                                    <FiPhone size={15} />
                                    +91
                                </div>

                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) =>
                                        setPhone(
                                            e.target.value
                                                .replace(/\D/g, "")
                                                .slice(0, 10)
                                        )
                                    }
                                    placeholder="Enter 10-digit mobile number"
                                    disabled={otpSent || loading}
                                    className="w-full h-full px-3 text-sm text-[#30283B] outline-none bg-white disabled:bg-gray-50"
                                />
                            </div>
                        </div>

                        {/* OTP Input */}
                        {otpSent && (
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-[#30283B] mb-2">
                                    One-Time Password (OTP)
                                </label>

                                <div className="relative">
                                    <FiLock
                                        size={16}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9B8DAA]"
                                    />

                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        autoComplete="one-time-code"
                                        maxLength={6}
                                        value={otp}
                                        onChange={(e) =>
                                            setOtp(
                                                e.target.value
                                                    .replace(/\D/g, "")
                                                    .slice(0, 6)
                                            )
                                        }
                                        placeholder="Enter 6-digit OTP"
                                        className="w-full h-11 pl-9 pr-3 border border-[#E5DDEC] rounded-lg text-sm text-[#30283B] outline-none focus:border-[#7652A5] focus:ring-2 focus:ring-[#7652A5]/10 tracking-[0.35em] font-semibold"
                                    />
                                </div>

                                <div className="flex items-center justify-between gap-3 mt-3">
                                    <button
                                        type="button"
                                        onClick={changePhone}
                                        disabled={loading}
                                        className="text-xs font-semibold text-[#7652A5] hover:text-[#5E3F89] disabled:opacity-50"
                                    >
                                        <span className="inline-flex items-center gap-1">
                                            <FiArrowLeft size={13} />
                                            Change number
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={sendOtp}
                                        disabled={loading}
                                        className="text-xs font-semibold text-[#7652A5] hover:text-[#5E3F89] disabled:opacity-50"
                                    >
                                        Resend OTP
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={
                                loading ||
                                (!otpSent && !isValidPhone) ||
                                (otpSent && otp.length !== 6)
                            }
                            className="w-full h-11 flex items-center justify-center gap-2 bg-[#7652A5] hover:bg-[#5E3F89] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition shadow-sm shadow-[#7652A5]/15"
                        >
                            {loading
                                ? "Please wait..."
                                : otpSent
                                    ? "Verify OTP & Login"
                                    : "Send OTP"}

                            {!loading && <FiArrowRight size={16} />}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 pt-4 border-t border-[#F0EBF5]">
                        <p className="text-center text-xs text-[#898290] leading-5">
                            By continuing, you agree to ShopCart's{" "}
                            <span className="text-[#7652A5] font-medium">
                                Terms of Service
                            </span>{" "}
                            and{" "}
                            <span className="text-[#7652A5] font-medium">
                                Privacy Policy
                            </span>.
                        </p>

                        <Link
                            to="/"
                            className="flex items-center justify-center gap-1.5 mt-4 text-sm font-semibold text-[#7652A5] hover:text-[#5E3F89] transition"
                        >
                            <FiArrowLeft size={15} />
                            Back to shopping
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;
