import HeroBanner from "../components/HeroBanner";
import FeaturedProducts from "../components/FeaturedProducts";
import AboutPreview from "../components/AboutPreview";
import Category from "../components/CategoryBanner";
import "./home.css"

const Home = () => {
  return (
    <>
      <main className="home-page">
        <HeroBanner />
        <Category />
        <FeaturedProducts />
        <AboutPreview />
      </main>
    </>
  );
};

export default Home;
