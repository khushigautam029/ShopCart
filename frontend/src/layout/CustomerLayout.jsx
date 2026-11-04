
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const CustomerLayout = () => {
    return (
        <div className="w-full min-h-screen flex flex-col bg-white text-[#30283B]">
            <Navbar />

            <main className="flex-1 w-full">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default CustomerLayout;
