import { useEffect, useRef, useState } from "react";

interface CloudinaryUploadProps {
  onUpload: (url: string) => void;
}

export default function CloudinaryUpload({ onUpload }: CloudinaryUploadProps) {
  const widgetRef = useRef<any>(null);
  const onUploadRef = useRef(onUpload);
  const [loading, setLoading] = useState(false);

  const cloudName =
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dlbrgqhhg";
  const uploadPreset =
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "may_products";

  useEffect(() => {
    onUploadRef.current = onUpload;
  }, [onUpload]);

  const initWidget = () => {
    if (!window.cloudinary) return null;

    if (!widgetRef.current) {
      widgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName,
          uploadPreset,
          sources: ["local", "url"],
          multiple: false,
          maxFiles: 1,
          resourceType: "image",
          folder: "products",
          clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
          maxImageFileSize: 5000000,
          cropping: true,
          croppingAspectRatio: 1,
          showAdvancedOptions: false,
        },
        (error: any, result: any) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            return;
          }

          if (result?.event === "success") {
            onUploadRef.current?.(result.info.secure_url);
          }
        }
      );
    }

    return widgetRef.current;
  };

  const handleOpenWidget = () => {
    if (window.cloudinary) {
      const widget = initWidget();
      if (widget) {
        widget.open();
        return;
      }
    }

    // Nếu script chưa load xong, load script động từ CDN
    setLoading(true);
    const existingScript = document.getElementById("cloudinary-upload-widget-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "cloudinary-upload-widget-script";
      script.src = "https://upload-widget.cloudinary.com/latest/global/all.js";
      script.async = true;
      script.onload = () => {
        setLoading(false);
        const widget = initWidget();
        widget?.open();
      };
      script.onerror = () => {
        setLoading(false);
        alert("Không thể kết nối đến máy chủ Cloudinary. Vui lòng kiểm tra lại mạng!");
      };
      document.body.appendChild(script);
    } else {
      // Đợi 300ms rồi thử lại
      setTimeout(() => {
        setLoading(false);
        const widget = initWidget();
        widget?.open();
      }, 300);
    }
  };

  return (
    <button
      type="button"
      onClick={handleOpenWidget}
      disabled={loading}
      className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 hover:bg-slate-50 transition-colors text-slate-600 font-medium"
    >
      {loading ? "Đang mở cửa sổ tải ảnh..." : "Tải ảnh lên"}
    </button>
  );
}