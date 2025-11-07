import HeroBanner from "../components/HeroBanner";
import FeaturedProducts from "../components/FeaturedProducts";
import AboutPreview from "../components/AboutPreview";

const Home = () => {
  return (
    <>
      <main className="page-container">
        <HeroBanner />
        <FeaturedProducts />
        <AboutPreview />
      </main>
    </>
  );
};

export default Home;
