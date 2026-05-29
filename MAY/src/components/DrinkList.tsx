import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DrinkCard from "./DrinkCard";
import { useProducts } from "../hooks/useProducts";
import { useBestSellingProducts } from "../hooks/useBestSellingProducts";

const fallbackImage =
    "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80";

const PAGE_SIZE = 4;

function DrinkList() {
    const navigate = useNavigate();
    const { products, loading, error } = useProducts();
    const { bestSellingProducts } = useBestSellingProducts();

    const [visibleCount] = useState(PAGE_SIZE);

    const bestSellerSet = new Set(bestSellingProducts.map((p) => p.id));

    if (loading) {
        return (
            <section className="w-full flex justify-center py-10 text-neutral-500">
                Đang tải sản phẩm...
            </section>
        );
    }

    if (error) {
        return (
            <section className="w-full flex flex-col items-center py-10 text-neutral-500">
                <p>Không thể tải sản phẩm</p>
                <p className="text-sm">{error}</p>
            </section>
        );
    }

    if (!products || products.length === 0) {
        return (
            <section className="w-full flex justify-center py-10 text-neutral-500">
                Không có sản phẩm nào
            </section>
        );
    }

    const visibleProducts = products.slice(0, visibleCount);

    return (
        <section className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-8 sm:py-10 md:py-12">
            <div className="mb-6 text-center px-2">
                <h2 className="mt-1 text-lg sm:text-xl md:text-2xl font-black text-neutral-700">
                   Một vài loại đồ uống khác
                </h2>

                <p className="mt-1 text-xs sm:text-sm text-neutral-500">
                   Nguyên liệu nguyên chất, hương vị tươi mát.
                </p>
            </div>

            {/*   Proper responsive grid - 2 cols mobile, 3 cols tablet, 4 cols desktop */}
            <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                {visibleProducts.map((drink) => (
                    <div
                        key={drink.id}
                        className="cursor-pointer transition hover:scale-105 active:scale-95"
                        onClick={() => {
                            if (!drink.id) return;
                            navigate(`/product/${drink.id}`);
                        }}
                    >
                        <DrinkCard
                            name={drink.name}
                            description={drink.description}
                            categoryName={drink.category?.name}
                            image={drink.imageUrl || fallbackImage}
                            price={drink.price}
                            isActive={false}
                            isBestSeller={bestSellerSet.has(drink.id)}
                        />
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-8 sm:mt-10 md:mt-12">
                <button
                    onClick={() => navigate("/products")}
                    className="px-4 sm:px-6 py-2 rounded-full border border-neutral-300 text-xs sm:text-sm text-neutral-700 hover:bg-neutral-100 transition active:scale-95"
                >
                    Xem thêm
                </button>
            </div>
        </section>
    );
}

export default DrinkList;