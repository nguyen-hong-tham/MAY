import { useNavigate, useParams } from "react-router-dom";
import { useMemo } from "react";
import { useCategories } from "../hooks/useCategories";

function CategoryTabs() {
  const navigate = useNavigate();

  // lấy category hiện tại từ URL
  const { category } = useParams();

  // gọi hook để lấy danh sách category từ backend
  const { categories, loading } = useCategories();

  // tạo danh sách tab để hiển thị
  const categoryTabs = useMemo(
    () => [{ id: 0, slug: "all", name: "All" }, ...categories],
    [categories]
  );

  // xác định tab đang được chọn
  // nếu URL chưa có category thì mặc định là "all"
  const activeCategory = category || "all";

  // nếu đang tải và chưa có dữ liệu thì hiện loading
  if (loading && categories.length === 0) {
    return (
      <div className="w-full py-2 px-2 sm:px-4 text-xs sm:text-sm text-neutral-500 text-center">
        Đang tải...
      </div>
    );
  }

  return (
    //   Responsive tabs with horizontal scroll on mobile
    <div className="w-full overflow-x-auto">
      <div className="mx-auto flex gap-3 sm:gap-4 md:gap-6 py-2 px-2 sm:px-4 
        text-xs sm:text-base md:text-lg font-semibold whitespace-nowrap">
        {categoryTabs.map((cat) => {
          // kiểm tra tab hiện tại có đang active không
          const isActive = activeCategory === cat.slug;

          return (
            <button
              key={cat.id} // key để React phân biệt từng tab
              onClick={() =>
                // nếu là tab all thì về /products
                // nếu là tab khác thì đi đến /products/{slug}
                cat.slug === "all"
                  ? navigate("/products")
                  : navigate(`/products/${cat.slug}`)
              }
              className={`transition relative pb-1 shrink-0 ${
                // nếu active thì chữ màu cam
                // nếu không active thì chữ màu xám, hover đậm hơn
                isActive
                  ? "text-orange-400"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              {/* tên tab hiển thị ra ngoài */}
              {cat.name}

              {/* nếu tab đang active thì hiện gạch chân màu cam */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6c935b] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryTabs;