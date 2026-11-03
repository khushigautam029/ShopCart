import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/customer/Home";
import Login from "./pages/customer/Login";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="w-full min-h-screen flex flex-col bg-white text-[#30283B]">
                    <Toaster position="top-right" />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;