import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import DrinkCard from "./DrinkCard";
import { useProducts } from "../hooks/useProducts";
import { useBestSellingProducts } from "../hooks/useBestSellingProducts";

function DrinkSlider() {
  const [activeIndex, setActiveIndex] = useState(1);
  const navigate = useNavigate();

  const { products, loading, error } = useProducts();
  const { bestSellingProducts } = useBestSellingProducts();

  const bestSellerSet = new Set(bestSellingProducts.map((p) => p.id));

  const drinks = (products || [])
    .filter((p) => bestSellerSet.has(p.id))
    .slice(0, 8);

  const canSlide = drinks.length > 1;

  const handlePrev = () => {
    if (!canSlide) return;
    setActiveIndex((prev) => (prev === 0 ? drinks.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (!canSlide) return;
    setActiveIndex((prev) => (prev === drinks.length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <section className="w-full h-full flex items-center justify-center py-4 text-neutral-600">
        Đang tải...
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full h-full flex flex-col items-center justify-center py-4 text-neutral-600">
        <p>Không thể tải slider sản phẩm.</p>
        <p className="text-xs mt-1">{error}</p>
      </section>
    );
  }

  if (!drinks.length) {
    return (
      <section className="w-full h-full flex items-center justify-center py-4 text-neutral-600">
        Không có best seller để hiển thị.
      </section>
    );
  }

  const safeIndex = activeIndex % drinks.length;

  const prevIndex = safeIndex === 0 ? drinks.length - 1 : safeIndex - 1;
  const nextIndex =
    safeIndex === drinks.length - 1 ? 0 : safeIndex + 1;

  const displayDrinks = canSlide
    ? [drinks[prevIndex], drinks[safeIndex], drinks[nextIndex]]
    : [drinks[0]];

  return (
    <section className="w-full flex flex-col justify-center mt-12 sm:mt-16 md:mt-20 px-2 sm:px-4">
      {/* Header */}
      <div className="mb-4 sm:mb-6 text-center">
        <h2 className="mt-1 text-lg sm:text-xl md:text-2xl font-black text-neutral-700">
          Sản phẩm bán chạy nhất
        </h2>

        <p className="mt-1 text-xs sm:text-sm text-neutral-500">
          5 sản phẩm bán chạy nhất của chúng tôi
        </p>
      </div>

      {/* Slider Container */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
        {/* Previous Button -   Fixed typo (was s-right-4) */}
        <button
          onClick={handlePrev}
          className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 
            flex items-center justify-center rounded-full 
            text-neutral-400 hover:text-neutral-900 transition hover:scale-110 
            active:scale-95 hover:bg-neutral-100"
          aria-label="Previous product"
        >
          <FiChevronLeft size={24} className="sm:w-6 sm:h-6" />
        </button>

        {/* Carousel Container */}
        <div className="relative flex items-end justify-center gap-2 sm:gap-3 md:gap-4 
          min-h-0 flex-1">
          {displayDrinks.map((drink, index) => (
            <div
              key={drink.id}
              className={`cursor-pointer transition-all duration-500 ease-out 
                ${canSlide && index === 1
                  ? "z-10 translate-y-0 scale-100 opacity-100"
                  : "translate-y-2 sm:translate-y-3 scale-80 sm:scale-85 opacity-60 sm:opacity-70"
                  /*   Adjusted scale for zoom tolerance */
                }`}
              onClick={() => {
                console.log("Clicked drink:", drink);
                if (!drink.id) return;
                navigate(`/product/${drink.id}`);
              }}
            >
              <div className="w-full max-w-xs sm:max-w-sm">
                <DrinkCard
                  name={drink.name}
                  description={drink.description}
                  categoryName={drink.category?.name}
                  image={drink.imageUrl||""}
                  price={drink.price}
                  isActive={canSlide ? index === 1 : true}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Next Button -   Fixed typo (was s-right-4, should be -right-4) */}
        <button
          onClick={handleNext}
          className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 
            flex items-center justify-center rounded-full 
            text-neutral-400 hover:text-neutral-900 transition hover:scale-110 
            active:scale-95 hover:bg-neutral-100 z-10"
          aria-label="Next product"
        >
          <FiChevronRight size={24} className="sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="mt-4 sm:mt-6 flex items-center justify-center gap-1.5 sm:gap-2">
        {drinks.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`rounded-full transition-all ${index === safeIndex
              ? "h-1.5 w-5 sm:w-6 md:w-7 bg-[#6c935b]"
              : "h-1.5 w-1.5 sm:w-2 sm:h-2 bg-neutral-300 hover:bg-neutral-400"
              }`}
            aria-label={`Go to product ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default DrinkSlider;