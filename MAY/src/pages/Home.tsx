import Hero from "../components/Hero";
import CategoryTabs from "../components/CategoryTabs";
import DrinkSlider from "../components/DrinkSlider";

function Home() {
  return (
    <div className="flex flex-col gap-0 h-full">
      <Hero />
      <CategoryTabs />
      <div className="flex-1 flex items-center justify-center">
        <DrinkSlider />
      </div>
    </div>
  );
}

export default Home;