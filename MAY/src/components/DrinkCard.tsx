// khai báo kiểu dữ liệu mà component này sẽ nhận vào từ component cha
type DrinkCardProps = {
  name: string;          // tên sản phẩm
  description?: string;  // mô tả
  categoryName?: string; // tên danh mục
  image: string;         // link ảnh sản phẩm
  price: number;         // giá sản phẩm
  isActive: boolean;

  isBestSeller?: boolean;
};

// component DrinkCard nhận props từ bên ngoài
function DrinkCard({
  name,
  description,
  categoryName,
  image,
  price,
  isActive,
  isBestSeller,
}: DrinkCardProps) {

  const formattedPrice = new Intl.NumberFormat("vi-VN").format(price) + "đ";

  return (
    <div
      className={`relative h-full flex flex-col w-full rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 ${isActive
          ? "bg-white shadow-2xl ring-2 ring-[#6cb08f]"
          : "bg-neutral-100/50 shadow-md opacity-75"
        }`}
    >
      {/* phần ảnh sản phẩm - Responsive height */}
      <div className="relative overflow-hidden rounded-t-xl sm:rounded-t-2xl shrink-0 h-32 sm:h-40 md:h-48">
        <img
          src={image}       // ảnh lấy từ props
          className="h-full w-full object-cover"
          alt={name}
        />

        {/* nếu có categoryName thì hiện nhãn danh mục ở góc trên ảnh */}
        {categoryName && (
          <span className="absolute left-2 sm:left-3 top-2 sm:top-3 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-semibold bg-[#6c935b] text-white">
            {categoryName}
          </span>
        )}

        {isBestSeller && (
          <span className="absolute right-2 sm:right-3 top-2 sm:top-3 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-bold bg-red-500 text-white shadow-md">
            Bán chạy nhất
          </span>
        )}
      </div>

      <div className="p-2 sm:p-3 md:p-4 flex flex-col grow">
        {/* tên sản phẩm */}
        <h3 className="font-extrabold text-xs sm:text-sm text-neutral-700 uppercase tracking-wide line-clamp-2">
          {name}
        </h3>

        {/* mô tả sản phẩm
            nếu không có description thì hiện câu mặc định */}
        <p className="mt-1 sm:mt-1.5 text-xs leading-4 text-neutral-600 flex-grow line-clamp-2">
          {description}
        </p>

        {/* giá sản phẩm */}
        <p className="mt-1.5 sm:mt-2 text-xs font-bold text-[#086136]">
          {formattedPrice}
        </p>

        <div className="mt-2 sm:mt-3 flex justify-center gap-1 sm:gap-1.5 shrink-0">
          {/* nút order - Fully responsive */}
          <button className="rounded-full bg-[#f59f9f] px-3 sm:px-4 py-1 sm:py-1.5 text-xs font-bold text-[#086136] hover:bg-[#f2e5e5] transition flex-1 active:scale-95 whitespace-nowrap">
           Thêm vào giỏ
          </button>

        </div>
      </div>
    </div>
  );
}

export default DrinkCard;