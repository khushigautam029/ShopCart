
import { useState } from "react";
import toast from "react-hot-toast";
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

            // Handles the nested response structure from your responseHandler.
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

            // Both roles currently return to Home.
            // We can add a separate seller dashboard route later.
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

    return (
        <div className="min-h-screen bg-[#F8F6FB] flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">

                {/* Left Section */}
                <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-[#30283B] via-[#7652A5] to-[#9B7BC2] p-12 text-white">

                    <Link to="/" className="text-3xl font-bold tracking-wide">
                        Shop<span className="text-[#E9E0F5]">Cart.</span>
                    </Link>

                    <div>
                        <div className="w-16 h-1 bg-[#E9E0F5] rounded-full mb-7" />

                        <h1 className="text-4xl font-bold leading-tight mb-5">
                            Shopping made simple.
                        </h1>

                        <p className="text-white/80 leading-7 text-base">
                            Sign in to explore products, discover great deals
                            and enjoy a seamless shopping experience with ShopCart.
                        </p>
                    </div>

                    <p className="text-sm text-white/70">
                        Your shopping journey starts here.
                    </p>
                </div>

                {/* Right Section */}
                <div className="p-7 sm:p-10 md:p-12">

                    <div className="mb-8">
                        <Link
                            to="/"
                            className="text-2xl font-bold text-[#7652A5] md:hidden"
                        >
                            ShopCart.
                        </Link>

                        <p className="text-sm font-semibold text-[#7652A5] mt-5 mb-2">
                            WELCOME BACK
                        </p>

                        <h2 className="text-3xl font-bold text-[#30283B]">
                            Login to your account
                        </h2>

                        <p className="text-[#77717F] text-sm mt-3">
                            Enter your phone number to continue.
                        </p>
                    </div>

                    {/* Role Selection */}
                    <div className="mb-7">
                        <label className="block text-sm font-semibold text-[#30283B] mb-3">
                            Login as
                        </label>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                disabled={loading}
                                onClick={() => {
                                    setRole("CUSTOMER");
                                    changePhone();
                                }}
                                className={`py-3 rounded-xl border font-semibold transition ${role === "CUSTOMER"
                                        ? "bg-[#7652A5] text-white border-[#7652A5]"
                                        : "bg-white text-[#77717F] border-[#E9E0F5] hover:border-[#7652A5]"
                                    }`}
                            >
                                Customer
                            </button>

                            <button
                                type="button"
                                disabled={loading}
                                onClick={() => {
                                    setRole("SELLER");
                                    changePhone();
                                }}
                                className={`py-3 rounded-xl border font-semibold transition ${role === "SELLER"
                                        ? "bg-[#7652A5] text-white border-[#7652A5]"
                                        : "bg-white text-[#77717F] border-[#E9E0F5] hover:border-[#7652A5]"
                                    }`}
                            >
                                Seller
                            </button>
                        </div>
                    </div>

                    {/* Phone Number Form */}
                    <form onSubmit={otpSent ? verifyOtp : sendOtp}>

                        <div className="mb-5">
                            <label className="block text-sm font-semibold text-[#30283B] mb-2">
                                Phone Number
                            </label>

                            <div className="flex items-center border border-[#E9E0F5] rounded-xl overflow-hidden focus-within:border-[#7652A5] focus-within:ring-2 focus-within:ring-[#7652A5]/10">
                                <span className="px-4 py-3.5 bg-[#F8F6FB] text-[#30283B] border-r border-[#E9E0F5]">
                                    +91
                                </span>

                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) =>
                                        setPhone(
                                            e.target.value.replace(/\D/g, "").slice(0, 10)
                                        )
                                    }
                                    placeholder="Enter your phone number"
                                    disabled={otpSent || loading}
                                    className="w-full px-4 py-3.5 outline-none text-[#30283B] disabled:bg-gray-50"
                                />
                            </div>
                        </div>

                        {otpSent && (
                            <div className="mb-5">
                                <label className="block text-sm font-semibold text-[#30283B] mb-2">
                                    Enter OTP
                                </label>

                                <input
                                    type="text"
                                    inputMode="numeric"
                                    autoComplete="one-time-code"
                                    maxLength={6}
                                    value={otp}
                                    onChange={(e) =>
                                        setOtp(
                                            e.target.value.replace(/\D/g, "").slice(0, 6)
                                        )
                                    }
                                    placeholder="Enter 6-digit OTP"
                                    className="w-full px-4 py-3.5 border border-[#E9E0F5] rounded-xl outline-none focus:border-[#7652A5] focus:ring-2 focus:ring-[#7652A5]/10 tracking-[0.5em] text-center text-lg"
                                />

                                <button
                                    type="button"
                                    onClick={changePhone}
                                    disabled={loading}
                                    className="text-sm text-[#7652A5] font-semibold mt-3 hover:text-[#5E3F89]"
                                >
                                    Change phone number
                                </button>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || (!otpSent && !isValidPhone)}
                            className="w-full bg-[#7652A5] hover:bg-[#5E3F89] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition shadow-md shadow-[#7652A5]/20"
                        >
                            {loading
                                ? "Please wait..."
                                : otpSent
                                    ? "Verify OTP & Login"
                                    : "Send OTP"}
                        </button>
                    </form>

                    {otpSent && (
                        <div className="text-center mt-5">
                            <p className="text-sm text-[#77717F]">
                                Didn't receive the OTP?{" "}
                                <button
                                    type="button"
                                    onClick={sendOtp}
                                    disabled={loading}
                                    className="text-[#7652A5] font-semibold hover:underline disabled:opacity-50"
                                >
                                    Resend OTP
                                </button>
                            </p>
                        </div>
                    )}

                    <p className="text-center text-xs text-[#77717F] mt-8">
                        By continuing, you agree to ShopCart's terms and privacy policy.
                    </p>

                </div>
            </div>
        </div>
    );
}

export default Login;
