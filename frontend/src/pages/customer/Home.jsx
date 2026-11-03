
import CategorySection from "../../components/CategorySection";
import DealOfTheDay from "../../components/DealOfTheDay";
import Footer from "../../components/Footer";
import HeroSection from "../../components/HeroSection";
import Navbar from "../../components/Navbar";
import ProductSection from "../../components/ProductSection";
import PromotionalBanner from "../../components/PromotionalBanner";
import RecentlyViewed from "../../components/RecentlyViewed";
import ServiceHighlights from "../../components/ServiceHighlights";

const Home = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <HeroSection />
                <CategorySection />
                <ProductSection />
                <RecentlyViewed />
                <PromotionalBanner />
                <DealOfTheDay />
                <ServiceHighlights />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
