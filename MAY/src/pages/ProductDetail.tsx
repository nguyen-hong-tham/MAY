import { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiPlus, FiMinus, FiShoppingCart, FiCheck, FiChevronDown } from "react-icons/fi";
import { useCart } from "../contexts/CartContext";
<<<<<<< Updated upstream
import { useProductById, useProducts } from "../hooks/useProducts";
import  DrinkCard  from "../components/DrinkCard";

const sizes = [
  { id: "s", name: "S (250ml)", price: 0 },
  { id: "m", name: "M (350ml)", price: 5000 },
  { id: "l", name: "L (450ml)", price: 10000 },
];

const fallbackToppings = [
  { id: "boba", name: "Boba", price: 10000 },
  { id: "jelly", name: "Jelly", price: 8000 },
  { id: "pudding", name: "Pudding", price: 8000 },
  { id: "egg", name: "Egg", price: 12000 },
];

const fallbackImage =
  "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80";
=======
import { useProductById, useProducts, useAllToppings } from "../hooks/useProducts";
import type { Topping } from "../services/toppingService";
>>>>>>> Stashed changes

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const parsedId = Number(id);
  const productId = Number.isNaN(parsedId) ? undefined : parsedId;

  const { product, loading, error } = useProductById(productId);
  const { products } = useProducts();
  const { toppings: allToppings } = useAllToppings();

  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [openToppingDropdown, setOpenToppingDropdown] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-topping-dropdown]")) {
        setOpenToppingDropdown(false);
      }
    };

    if (openToppingDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [openToppingDropdown]);

  const availableToppings = useMemo(() => {
    if (allToppings && Array.isArray(allToppings) && allToppings.length > 0) {
      return allToppings.map((topping: Topping) => ({
        id: String(topping.id),
        name: topping.name,
        price: topping.price,
      }));
    }
    return [];
  }, [allToppings]);

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("vi-VN").format(value) + "đ";

  
  const toppingsPrice = selectedToppings.reduce(
    (sum, toppingId) =>
      sum + (availableToppings.find((t) => t.id === toppingId)?.price || 0),
    0
  );

  const totalItemPrice = (product?.price || 0) + toppingsPrice;
  const totalPrice = totalItemPrice * quantity;

  const toggleTopping = (toppingId: string) => {
    setSelectedToppings((prev) =>
      prev.includes(toppingId)
        ? prev.filter((t) => t !== toppingId)
        : [...prev, toppingId]
    );
  };

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    const selectedToppingObjects = availableToppings
      .filter((topping) => selectedToppings.includes(topping.id))
      .map((topping) => ({
        id: Number(topping.id),
        name: topping.name,
        price: topping.price,
      }));

    addToCart({
      id: product.id,
      title: product.name,
      image: product.imageUrl || "",
      price: totalItemPrice,
      quantity,
      toppings: selectedToppingObjects,
    });

    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000);
  };

  const relatedProducts = useMemo(() => {
    if (!product) {
      return [];
    }

    return products
      .filter((item) => item.id !== product.id && item.categoryId === product.categoryId)
      .slice(0, 3);
  }, [product, products]);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-12 text-center">
        <p className="text-neutral-600">loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-12 text-center">
        <h1 className="mb-2 text-2xl font-bold text-neutral-900">Cannot load product</h1>
        <p className="mb-4 text-neutral-600">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="rounded-full bg-[#6c935b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
        >
          Return to Home
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-12 text-center">
        <h1 className="mb-4 text-2xl font-bold text-neutral-900">Product not found</h1>
        <button
          onClick={() => navigate("/")}
          className="rounded-full bg-[#6c935b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
        >
          Quay về trang chủ
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 mt-20">
      <section className="rounded-[36px] bg-white p-6 shadow-xl sm:p-8 lg:p-10">
        <div className="grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-neutral-100 to-neutral-50 shadow-lg">
            <img
              src={product.imageUrl || ""}
              className="h-[360px] w-full object-cover sm:h-[460px] lg:h-[620px]"
            />
<<<<<<< Updated upstream
            <div className="absolute left-5 top-5 rounded-full bg-[#6c935b] px-4 py-2 text-sm font-semibold text-white shadow-md">
              {product.category?.name || "Do uong"}
=======
            <div className="absolute left-5 top-5 rounded-full bg-orange-400 px-4 py-2 text-sm font-semibold text-white shadow-md">
              {product.category?.name }
>>>>>>> Stashed changes
            </div>
          </div>

          <div className="flex flex-col">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#086136]">
              Product Detail
            </p>

            <h1 className="mt-3 font-sans text-3xl font-black leading-tight text-neutral-900 sm:text-4xl lg:text-4xl">
              {product.name}
            </h1>

<<<<<<< Updated upstream
            <p className="mt-3 text-lg font-semibold text-[#086136] sm:text-xl">
              Choose size and toppings according to your preference
=======
            <p className="mt-3 text-lg font-semibold text-orange-400 sm:text-xl">
              Tùy chọn topping theo sở thích
>>>>>>> Stashed changes
            </p>

            <div className="mt-6 rounded-[24px] border border-neutral-200 bg-neutral-50 p-5">
              <p className="text-sm leading-8 text-neutral-600 sm:text-base">
<<<<<<< Updated upstream
                {product.description || "Drinks are crafted at MAY with carefully selected ingredients."}
=======
                {product.description}
>>>>>>> Stashed changes
              </p>
            </div>

            <div className="mt-6 flex items-end justify-between gap-4 border-b border-neutral-200 pb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Base Price</p>
                <p className="mt-2 text-3xl font-bold text-[#086136] sm:text-4xl">
                  {formatPrice(product.price)}
                </p>
              </div>

              <div className="rounded-2xl bg-orange-50 px-4 py-3 text-right">
                <p className="text-xs uppercase tracking-wide text-neutral-500">Category</p>
                <p className="mt-1 font-bold text-neutral-900">{product.category?.name || "N/A"}</p>
              </div>
            </div>

<<<<<<< Updated upstream
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-neutral-900">Size</p>
              <div className="grid grid-cols-3 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size.id)}
                    className={`rounded-2xl border-2 px-3 py-4 text-sm font-semibold transition-all ${
                      selectedSize === size.id
                        ? "border-[#dd7484] bg-[#f2e5e5] text-[#086136] shadow-sm"
                        : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400"
                    }`}
                  >
                    <div>{size.name}</div>
                    <div className="mt-1 text-xs">
                      {size.price > 0 ? `+${formatPrice(size.price)}` : "Free"}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-neutral-900">Toppings (Optional)</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {availableToppings.map((topping) => {
                  const active = selectedToppings.includes(topping.id);

                  return (
                    <button
                      key={topping.id}
                      onClick={() => toggleTopping(topping.id)}
                      className={`flex items-center justify-between rounded-2xl border-2 px-4 py-3 text-sm font-medium transition-all ${
                        active
                          ? "border-[#dd7484] bg-[#f2e5e5] text-[#086136]"
                          : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400"
                      }`}
                    >
                      <span>{topping.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs">+{formatPrice(topping.price)}</span>
                        {active && <FiCheck size={16} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
=======
            <div className="mt-6" data-topping-dropdown>
  <p className="mb-3 text-sm font-semibold text-neutral-900">Toppings (Optional)</p>
  <div className="relative">
    <button
      type="button"
      onClick={() => setOpenToppingDropdown(!openToppingDropdown)}
      className="w-full rounded-2xl border-2 border-neutral-300 bg-white px-4 py-3 text-left text-sm font-medium text-neutral-700 transition-all hover:border-neutral-400 flex items-center justify-between"
    >
      <span>
        {selectedToppings.length === 0
          ? "Chọn topping (không bắt buộc)"
          : `Đã chọn ${selectedToppings.length} topping`}
      </span>
      <FiChevronDown
        size={18}
        className={`transition-transform ${openToppingDropdown ? "rotate-180" : ""}`}
      />
    </button>

    {openToppingDropdown && (
      <div className="absolute top-full left-0 right-0 z-50 mt-2 max-h-64 overflow-y-auto rounded-2xl border-2 border-neutral-200 bg-white shadow-lg">
        {availableToppings.length === 0 ? (
          <div className="p-4 text-center text-sm text-neutral-500">
            Không có topping nào
          </div>
        ) : (
          availableToppings.map((topping) => {
            const active = selectedToppings.includes(topping.id);
            return (
              <button
                type="button"
                key={topping.id}
                onClick={() => toggleTopping(topping.id)}
                className={`w-full px-4 py-3 text-left text-sm font-medium border-b border-neutral-100 flex items-center justify-between transition-colors last:border-b-0 ${
                  active
                    ? "bg-orange-50 text-orange-600"
                    : "bg-white text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                <span>{topping.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs">+{formatPrice(topping.price)}</span>
                  {active && <FiCheck size={16} className="text-orange-500" />}
                </div>
              </button>
            );
          })
        )}
      </div>
    )}
  </div>
</div>
>>>>>>> Stashed changes

            <div className="mt-6 grid gap-4 sm:grid-cols-[auto_1fr]">
              <div>
                <p className="mb-3 text-sm font-semibold text-neutral-900">Quantity</p>
                <div className="flex items-center gap-2 rounded-full border-2 border-neutral-300 px-4 py-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-6 w-6 items-center justify-center text-neutral-600 transition hover:text-neutral-900"
                  >
                    <FiMinus size={18} />
                  </button>
                  <span className="w-6 text-center font-semibold text-neutral-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-6 w-6 items-center justify-center text-neutral-600 transition hover:text-neutral-900"
                  >
                    <FiPlus size={18} />
                  </button>
                </div>
              </div>

              <div className="rounded-[24px] border border-neutral-200 bg-[#f2e5e5] p-5">
                <div className="space-y-2 text-sm text-neutral-600">
                  <div className="flex justify-between">
                    <span>
                      {product.name} x {quantity}
                    </span>
                    <span>{formatPrice(product.price * quantity)}</span>
                  </div>

                  {selectedToppings.length > 0 && (
                    <div className="flex justify-between">
                      <span>Toppings x {selectedToppings.length}</span>
                      <span>+{formatPrice(toppingsPrice * quantity)}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-neutral-300 pt-4">
                  <span className="text-base font-semibold text-neutral-900">Total</span>
                  <span className="text-2xl font-bold text-[#086136]">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={handleAddToCart}
                className="relative flex-1 rounded-full bg-[#6c935b] px-6 py-4 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-[1px] hover:bg-[#f59f9f] hover:shadow-lg"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <FiShoppingCart size={18} />
                  Add to cart
                </span>

                {showAddedMessage && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-[#6c935b]">
                    <div className="flex items-center gap-2 text-white">
                      <FiCheck size={18} />
                      Added
                    </div>
                  </div>
                )}
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="flex-1 rounded-full border-2 border-neutral-300 px-6 py-4 text-sm font-bold text-neutral-700 transition-all hover:border-neutral-400 hover:bg-neutral-50"
              >
                Check your cart
              </button>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="mt-14 border-t border-neutral-200 pt-12">
          <h2 className="mb-8 font-serif text-3xl font-black text-[#16434f] sm:text-4xl">
            Similar products
          </h2>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 w-fit">
            {relatedProducts.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
                className="group overflow-hidden rounded-[26px] border border-neutral-200 bg-white text-left shadow-sm transition-all hover:-translate-y-[2px] hover:shadow-md"
              >
<<<<<<< Updated upstream
                <DrinkCard
                  name={item.name}
                  description={item.description}
                  categoryName={item.category?.name}
                  image={item.imageUrl || fallbackImage}
                  price={item.price}
                  isActive={false}
                  isBestSeller={false}
                />
  
=======
                <div className="relative h-48 overflow-hidden bg-neutral-100">
                  <img
                    src={item.imageUrl}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  {item.category?.name && (
                    <span className="absolute left-3 top-3 rounded-full bg-orange-400 px-3 py-1 text-xs font-semibold text-white">
                      {item.category.name}
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-neutral-800">{item.name}</h3>
                  <p className="mt-1 text-sm text-neutral-500 line-clamp-2">
                    {item.description || "Đồ uống được yêu thích tại MAY."}
                  </p>
                  <p className="mt-4 text-lg font-bold text-orange-500">{formatPrice(item.price)}</p>
                </div>
>>>>>>> Stashed changes
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetail;