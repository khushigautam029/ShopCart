import { useState } from 'react';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
    const [step, setStep] = useState(1); // 1 = Phone Input, 2 = OTP Input
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const { loginWithToken } = useAuth();
    const navigate = useNavigate();

    // Step 1: Request OTP
    const handleSendOtp = (e) => {
        e.preventDefault();
        if (phone.length < 10) return;

        setLoading(true);
        // Simulated API call matching backend: POST /api/auth/send-otp
        setTimeout(() => {
            setLoading(false);
            setStep(2);
        }, 800);
    };

    // Step 2: Handle OTP input digit progression
    const handleOtpChange = (element, index) => {
        if (isNaN(Number(element.value))) return false;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Auto-focus next input field
        if (element.nextSibling && element.value !== '') {
            element.nextSibling.focus();
        }
    };

    // Verify OTP & Complete Login
    const handleVerifyOtp = (e) => {
        e.preventDefault();
        const otpCode = otp.join('');
        if (otpCode.length < 6) return;

        setLoading(true);
        // Simulated API response matching backend authController/authService
        setTimeout(() => {
            setLoading(false);
            loginWithToken('mock-jwt-token-12345', {
                id: 1,
                phone,
                role: 'CUSTOMER',
                isVerified: true
            });
            navigate('/');
        }, 1000);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6">

                {/* Header */}
                <div className="text-center">
                    <Link to="/" className="text-3xl font-extrabold text-indigo-600 tracking-tight">
                        ShopCart
                    </Link>
                    <h2 className="text-xl font-bold text-gray-900 mt-4">
                        {step === 1 ? 'Welcome Back' : 'Verify Mobile Number'}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {step === 1
                            ? 'Enter your 10-digit phone number to receive a one-time password (OTP)'
                            : `We sent a 6-digit code to +91 ${phone}`}
                    </p>
                </div>

                {/* Step 1: Phone Input Form */}
                {step === 1 && (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Mobile Phone Number</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-gray-500 font-medium">
                                    +91
                                </span>
                                <input
                                    type="tel"
                                    required
                                    maxLength="10"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                    placeholder="9876543210"
                                    className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-12 pr-4 py-3 text-sm font-semibold tracking-wide focus:outline-none focus:border-indigo-500 focus:bg-white"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={phone.length < 10 || loading}
                            className="w-full bg-indigo-600 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition flex items-center justify-center space-x-2 shadow-md"
                        >
                            <span>{loading ? 'Sending OTP...' : 'Get OTP'}</span>
                            <FiArrowRight />
                        </button>
                    </form>
                )}

                {/* Step 2: OTP Verification Form */}
                {step === 2 && (
                    <form onSubmit={handleVerifyOtp} className="space-y-6">
                        <div className="flex justify-between gap-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(e.target, index)}
                                    onFocus={(e) => e.target.select()}
                                    className="w-12 h-12 text-center text-lg font-bold border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition"
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={otp.join('').length < 6 || loading}
                            className="w-full bg-indigo-600 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition flex items-center justify-center space-x-2 shadow-md"
                        >
                            <FiCheckCircle />
                            <span>{loading ? 'Verifying...' : 'Verify & Continue'}</span>
                        </button>

                        <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="text-indigo-600 font-semibold hover:underline"
                            >
                                Change Phone Number
                            </button>
                            <button
                                type="button"
                                onClick={handleSendOtp}
                                className="text-gray-600 font-semibold hover:text-indigo-600"
                            >
                                Resend OTP
                            </button>
                        </div>
                    </form>
                )}

                {/* Footer Note */}
                <p className="text-xs text-center text-gray-400">
                    By continuing, you agree to ShopCart's Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    );
}