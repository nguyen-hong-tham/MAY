# 🍵 MAY Coffee - Nền Tảng Đặt Hàng & Quản Lý Trà Sữa Toàn Diện

**MAY Coffee** là một hệ thống E-commerce hoàn chỉnh phục vụ cho việc bán hàng và quản lý cửa hàng trà sữa/cà phê. Dự án được phát triển dưới dạng monorepo, áp dụng các công nghệ hiện đại bậc nhất bao gồm **React 19**, **NestJS 11**, **TypeScript**, **TailwindCSS**, và hệ quản trị cơ sở dữ liệu **PostgreSQL** kết hợp **Prisma ORM**.

Hệ thống tích hợp đầy đủ các tính năng thực tế như cổng thanh toán điện tử **VNPay**, xác thực người dùng qua **Firebase OTP**, cập nhật trạng thái đơn hàng thời gian thực qua **WebSockets**, tích điểm thành viên (Loyalty), và gợi ý sản phẩm cá nhân hóa thông qua **AI**.

---

## 🚀 Các Thành Phần Trong Hệ Thống

Dự án được cấu trúc thành 3 phân hệ chính:

1.  **🛍️ Customer App (`MAY/`)**
    *   **Mục đích**: Ứng dụng dành cho khách hàng tìm kiếm, tùy chỉnh đồ uống (chọn size, thêm topping), đặt hàng, theo dõi đơn hàng và tích lũy điểm thưởng.
    *   **Tech Stack**: React 19 + TypeScript + Vite + TailwindCSS v4 + React Router v7 + React Query + Firebase SDK (Auth) + Socket.io Client.
    *   **Trạng thái**: Đã deploy trực tuyến trên Vercel.
2.  **📊 Admin Dashboard (`MAY-admin/`)**
    *   **Mục đích**: Trang quản trị dành cho Admin và Staff để quản lý sản phẩm, đơn hàng, danh mục, topping, thống kê doanh thu và xuất báo cáo.
    *   **Tech Stack**: React 19 + TypeScript + Zustand + Shadcn/ui + TailwindCSS v3 + React Hook Form + Zod + Socket.io Client + html2pdf.js + XLSX (Excel).
    *   **Trạng thái**: Sẵn sàng deploy.
3.  **🔌 Backend API (`may-api/`)**
    *   **Mục đích**: API xử lý nghiệp vụ, xác thực JWT, tương tác cơ sở dữ liệu, cổng thanh toán VNPay, AI recommendation engine và WebSocket server.
    *   **Tech Stack**: NestJS 11 + TypeScript + Prisma ORM + PostgreSQL (Supabase) + Firebase Admin SDK + JWT (Passport) + Socket.io Gateway + VNPay SDK + OpenAI API.
    *   **Trạng thái**: Sẵn sàng deploy.

---

## ✨ Các Tính Năng Nổi Bật

### 👥 Dành Cho Khách Hàng (Customer App)
*   **Xác thực Firebase OTP (SMS-based)**: Đăng nhập nhanh qua số điện thoại gửi mã OTP, kết hợp phân quyền token JWT ở backend.
*   **Tùy biến món uống sinh động**: Cho phép khách hàng thêm toppings (trân châu, thạch, pudding), chọn kích cỡ (S, M, L) tương ứng với giá tiền thay đổi động.
*   **Thanh toán tiện lợi**: Hỗ trợ hai hình thức COD (Thanh toán khi nhận hàng) và thanh toán trực tuyến qua **Cổng thanh toán VNPay** (Sandbox).
*   **Theo dõi đơn hàng thời gian thực (Real-time tracking)**: Sử dụng WebSockets (Socket.io) để đồng bộ trạng thái chuẩn bị nước và giao hàng từ admin tới khách hàng ngay lập tức.
*   **Hệ thống tích điểm & Hạng thành viên (Loyalty System)**: Tích lũy điểm từ các đơn hàng để thăng hạng (Bronze, Silver, Gold, Platinum) và nhận các quyền lợi/giảm giá đi kèm.
*   **Gợi ý sản phẩm thông minh (AI Recommendation)**: Đưa ra danh sách gợi ý sản phẩm dựa trên lịch sử mua sắm, hành vi duyệt web và các sản phẩm đang xu hướng bằng thuật toán scoring.

### 👨‍💼 Dành Cho Quản Trị Viên (Admin Dashboard)
*   **Báo cáo & Thống kê trực quan**: Biểu đồ doanh thu theo ngày/tháng, số lượng đơn hàng, thống kê các sản phẩm bán chạy nhất.
*   **Quản lý danh mục & Sản phẩm (CRUD)**: Quản trị dễ dàng danh sách món nước, danh mục, và toppings đi kèm với khả năng upload ảnh lên **Cloudinary CDN**.
*   **Hệ thống phân quyền chi tiết (RBAC)**: Phân chia rõ ràng 3 quyền truy cập: `ADMIN` (Toàn quyền quản trị), `STAFF` (Xử lý đơn hàng, xem dashboard bán hàng), và `USER` (Khách hàng).
*   **Quản lý đơn hàng tập trung**: Cập nhật trạng thái đơn hàng nhanh chóng (Pending ➔ Confirmed ➔ Delivery ➔ Completed/Cancelled), tự động thông báo tới khách hàng qua WebSocket.
*   **Xuất hóa đơn & Báo cáo**: Hỗ trợ in đơn hàng dạng PDF và xuất báo cáo dữ liệu doanh thu/sản phẩm ra file Excel.

---

## 📁 Cấu Trúc Thư Mục Dự Án

```
DACN-May/
├── MAY/                         # 🛍️ Customer App (React 19 + Tailwind v4)
│   ├── src/
│   │   ├── components/          # Các component giao diện dùng chung
│   │   ├── pages/               # Trang giỏ hàng, menu, checkout, profile...
│   │   ├── contexts/            # Quản lý global state (Auth, Cart)
│   │   ├── hooks/               # Custom React hooks
│   │   ├── services/            # API call kết nối với Backend
│   │   └── lib/                 # Cấu hình thư viện (Firebase client, socket)
│   ├── vite.config.ts
│   └── package.json
│
├── MAY-admin/                   # 📊 Admin Dashboard (React 19 + Shadcn/ui)
│   ├── src/
│   │   ├── components/          # UI Components & Table layouts
│   │   ├── pages/               # Dashboard, Orders, Products, Staffs...
│   │   ├── layouts/             # Sidebar, Header layouts
│   │   └── lib/                 # Cấu hình Axios, Zustand store
│   ├── vite.config.ts
│   └── package.json
│
├── may-api/                     # 🔌 Backend API (NestJS 11 + Prisma)
│   ├── src/
│   │   ├── main.ts              # Entry point của server
│   │   ├── auth/                # Module xác thực JWT & Firebase Admin
│   │   ├── users/               # Quản lý người dùng và vai trò (Role)
│   │   ├── products/            # API Sản phẩm, danh mục, topping
│   │   ├── orders/              # Xử lý đặt hàng & giỏ hàng
│   │   ├── payments/            # Tích hợp IPN & Return URL của VNPay
│   │   ├── loyalty/             # Xử lý logic tích điểm, thăng hạng thành viên
│   │   ├── personalized/        # Gợi ý AI cho người dùng
│   │   ├── dashboard/           # API cung cấp số liệu thống kê cho Admin
│   │   └── prisma/              # Prisma Client module
│   ├── prisma/
│   │   ├── schema.prisma        # Database schema (PostgreSQL)
│   │   ├── seed.ts              # Dữ liệu mẫu ban đầu (seeding)
│   │   └── migrations/          # Lịch sử thay đổi DB structure
│   └── package.json
│
├── vercel.json                  # Cấu hình monorepo deployment trên Vercel
├── index.js                     # Express server chạy cổng phụ
└── README.md                    # File hướng dẫn hiện tại
```

---

## 🛠️ Hướng Dẫn Cài Đặt & Chạy Dưới Local

### 1. Yêu Cầu Hệ Thống
*   Đã cài đặt **Node.js** (Khuyến nghị phiên bản `>= 18.x.x`).
*   Một cơ sở dữ liệu **PostgreSQL** hoạt động (hoặc qua Supabase/RDS).
*   Tài khoản **Firebase** để xác thực OTP và thiết lập project.
*   Thông tin tài khoản Merchant **VNPay Sandbox** để kiểm thử thanh toán.
*   Tài khoản **Cloudinary** để upload và lưu trữ hình ảnh sản phẩm.

---

### 2. Cấu Hình Biến Môi Trường (Environment Variables)

Hãy tạo các file `.env` ở trong từng thư mục con dựa trên cấu hình mẫu dưới đây:

#### 🔌 Backend (`may-api/.env`)
```env
PORT=3001
API_URL=http://localhost:3001

# Database (PostgreSQL)
DATABASE_URL="postgresql://<user>:<password>@<host>:5432/<db_name>?sslmode=require"

# JWT Configuration
JWT_SECRET="YOUR_JWT_SECRET_KEY"
JWT_REFRESH_SECRET="YOUR_JWT_REFRESH_SECRET_KEY"

# Supabase Credentials (nếu có dùng)
SUPABASE_URL=https://<your-project>.supabase.co
SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
SUPABASE_SECRET_KEY=your-supabase-secret-key

# Cloudinary CDN Configuration
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_API_KEY=your-api-key
VITE_CLOUDINARY_API_SECRET_KEY=your-api-secret
VITE_CLOUDINARY_UPLOAD_PRESET=your-preset-folder

# VNPay Gateway Setup
VNP_TMNCODE=your-vnpay-tmncode
VNP_HASH_SECRET=your-vnpay-hash-secret
VNP_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
VNP_RETURN_URL=http://localhost:3001/payments/vnpay/return
FRONTEND_PAYMENT_SUCCESS_URL=http://localhost:5173/checkout/success
FRONTEND_PAYMENT_FAILED_URL=http://localhost:5173/checkout/failed

# Firebase Admin SDK credentials
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# OpenAI Service
OPENAI_API_KEY=your-openai-api-key
```

#### 🛍️ Customer App (`MAY/.env`) & 📊 Admin Dashboard (`MAY-admin/.env`)
```env
# API URL kết nối backend
VITE_API_URL=http://localhost:3001

# Firebase Configuration
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id

# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_API_KEY=your-api-key
VITE_CLOUDINARY_UPLOAD_PRESET=your-preset-folder
```

---

### 3. Các Bước Khởi Chạy Hệ Thống

#### Bước A: Cài đặt và cấu hình Database (Backend)
1. Di chuyển vào thư mục backend và cài đặt dependencies:
   ```bash
   cd may-api
   npm install
   ```
2. Thực hiện migrate database PostgreSQL qua Prisma:
   ```bash
   npx prisma migrate dev
   ```
3. Chạy seed để nạp dữ liệu mẫu (sản phẩm, tài khoản admin mặc định, toppings, danh mục):
   ```bash
   npx prisma db seed
   ```
4. Khởi chạy backend API ở chế độ development:
   ```bash
   npm run start:dev
   # Backend chạy tại: http://localhost:3001
   # API Swagger docs: http://localhost:3001/api (nếu được kích hoạt)
   ```

#### Bước B: Khởi chạy Customer App (MAY)
1. Mở một terminal mới, chuyển đến thư mục `MAY` và cài đặt dependencies:
   ```bash
   cd MAY
   npm install
   ```
2. Chạy ứng dụng khách hàng:
   ```bash
   npm run dev
   # Client chạy tại: http://localhost:5173
   ```

#### Bước C: Khởi chạy Admin Dashboard (MAY-admin)
1. Mở một terminal mới, chuyển đến thư mục `MAY-admin` và cài đặt dependencies:
   ```bash
   cd MAY-admin
   npm install
   ```
2. Chạy dashboard admin:
   ```bash
   npm run dev
   # Dashboard chạy tại: http://localhost:5174 (hoặc cổng kế tiếp khả dụng)
   ```

---

## 🌐 Triển Khai Lên Production (Deployment)

Dự án đã cấu hình sẵn file `vercel.json` ở thư mục gốc giúp bạn triển khai trực tiếp monorepo lên **Vercel** một cách dễ dàng.

### Các Lưu Ý Khi Deploy:
1.  **Frontend (MAY & MAY-admin)**: Triển khai trực tiếp lên Vercel. Bạn cần đảm bảo cấu hình đúng **Root Directory** tương ứng (`MAY` hoặc `MAY-admin`) và thêm đầy đủ các biến môi trường (`VITE_API_URL` chỉ tới API Production).
2.  **Backend (may-api)**: Có thể được host trên các dịch vụ hỗ trợ Node.js lâu dài như **Railway**, **Render**, hoặc **AWS EC2/Elastic Beanstalk** (Hạn chế deploy Serverless hoàn toàn do kết nối WebSocket cần duy trì liên tục).
3.  **Database**: Sử dụng cơ sở dữ liệu cloud miễn phí/trả phí như **Supabase PostgreSQL** hoặc **Neon DB**.

---

## 📝 Giấy Phép & Đóng Góp

Dự án này phục vụ mục đích học tập, thực tập và phát triển đồ án chuyên ngành. Mọi đóng góp ý kiến hoặc báo lỗi xin vui lòng tạo Issue hoặc Pull Request trên GitHub chính thức của dự án.

*   **Repository**: [nguyen-hong-tham/MAY](https://github.com/nguyen-hong-tham/MAY)
*   **Customer Live App**: [milk-tea-ecommerce.vercel.app](https://milk-tea-ecommerce.vercel.app)

*Chúc các bạn trải nghiệm tuyệt vời cùng với MAY Coffee!* 🍵
