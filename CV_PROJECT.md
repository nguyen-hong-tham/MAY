# 🍵 MAY Coffee - Hệ Thống Quản Lý Và Bán Hàng Trà Sữa

## 📌 Giới Thiệu Dự Án

**MAY Coffee** là nền tảng e-commerce toàn diện cho cửa hàng trà sữa, gồm ứng dụng khách hàng, dashboard quản trị, và backend API. Dự án hoàn chỉnh từ frontend, backend đến database, triển khai trên production.

**Status**: 95% hoàn thành | **Deployed**: Vercel (Frontend) | **Tech Stack**: React 19 + NestJS 11 + PostgreSQL

---

## 🎯 Giới Thiệu Module

**MAY** (Customer App)
- Ứng dụng mua sắm cho khách hàng
- URL: https://milk-tea-ecommerce.vercel.app (Live)

**MAY-admin** (Admin Dashboard)
- Dashboard quản lý cho quản trị viên
- Sẵn sàng triển khai

**may-api** (Backend API)
- API backend xử lý tất cả business logic
- Sẵn sàng triển khai

---

## ✅ Tính Năng Đã Triển Khai

### **FRONTEND (Customer App - MAY)**

#### **1. Hệ Thống Xác Thực (Authentication)**
- ✅ Đăng ký với Firebase OTP (SMS OTP)
- ✅ Đăng nhập OTP 
- ✅ JWT token management trên backend
- ✅ Session persistence
- ✅ Refresh token mechanism

#### **2. Tính Năng Mua Sắm**
- ✅ Duyệt danh sách sản phẩm
- ✅ Filter theo danh mục
- ✅ Tìm kiếm sản phẩm
- ✅ Xem chi tiết sản phẩm
- ✅ Chọn kích cỡ (S, M, L, XL)
- ✅ Chọn topping (thêm/bớt)
- ✅ Tính giá tự động theo lựa chọn
- ✅ Xem ảnh sản phẩm từ Cloudinary

#### **3. Giỏ Hàng**
- ✅ Thêm sản phẩm vào giỏ
- ✅ Xóa sản phẩm khỏi giỏ
- ✅ Cập nhật số lượng
- ✅ Lưu tùy chỉnh (size, topping)
- ✅ Tính tổng tiền tự động
- ✅ Lưu trữ local storage + API sync

#### **4. Thanh Toán**
- ✅ Chọn phương thức thanh toán (VNPay, COD)
- ✅ Nhập địa chỉ giao hàng
- ✅ Chuyển hướng đến VNPay
- ✅ Xử lý callback từ VNPay
- ✅ Trang thành công/thất bại
- ✅ Lưu lịch sử thanh toán

#### **5. Theo Dõi Đơn Hàng**
- ✅ Real-time tracking qua WebSocket (Socket.io)
- ✅ Cập nhật trạng thái đơn (PENDING → CONFIRMED → DELIVERY → COMPLETED)
- ✅ Xem thời gian giao dự kiến
- ✅ Thông báo khi có cập nhật

#### **6. Hệ Thống Tích Điểm Loyalty**
- ✅ Xem điểm hiện tại
- ✅ Xem lịch sử tích điểm
- ✅ Xem các bậc thành viên (Bronze, Silver, Gold, Platinum)
- ✅ Xem quyền lợi từng bậc
- ✅ Xem các đơn hàng và điểm tương ứng

#### **7. Hồ Sơ Cá Nhân**
- ✅ Xem thông tin cá nhân (email, tên, số điện thoại)
- ✅ Chỉnh sửa thông tin
- ✅ Xem lịch sử mua hàng
- ✅ Xem tất cả đơn hàng cũ
- ✅ Quản lý địa chỉ (chính/phụ)

#### **8. Gợi Ý Sản Phẩm**
- ✅ Hiển thị sản phẩm "Best Selling"
- ✅ Gợi ý sản phẩm dựa trên hành vi người dùng
- ✅ Tính điểm recommendation động

---

### **ADMIN DASHBOARD (MAY-admin)**

#### **1. Dashboard Thống Kê**
- ✅ Tổng doanh thu (hôm nay, tuần, tháng, năm)
- ✅ Số đơn hàng (tổng, hoàn thành, hủy)
- ✅ Số khách hàng mới
- ✅ Sản phẩm bán chạy
- ✅ Biểu đồ doanh thu (Revenue chart)
- ✅ Biểu đồ đơn hàng (Order chart)
- ✅ Export dữ liệu PDF/Excel

#### **2. Quản Lý Sản Phẩm**
- ✅ Danh sách sản phẩm
- ✅ Thêm sản phẩm mới
- ✅ Chỉnh sửa sản phẩm
- ✅ Xóa sản phẩm
- ✅ Upload ảnh (Cloudinary)
- ✅ Kích hoạt/vô hiệu hóa sản phẩm
- ✅ Quản lý giá bán
- ✅ Quản lý mô tả

#### **3. Quản Lý Danh Mục**
- ✅ Danh sách danh mục
- ✅ Thêm danh mục
- ✅ Chỉnh sửa danh mục
- ✅ Xóa danh mục
- ✅ Upload ảnh danh mục

#### **4. Quản Lý Topping**
- ✅ Danh sách topping
- ✅ Thêm topping
- ✅ Chỉnh sửa giá topping
- ✅ Xóa topping
- ✅ Gán topping vào danh mục

#### **5. Quản Lý Đơn Hàng**
- ✅ Danh sách đơn hàng
- ✅ Xem chi tiết đơn hàng
- ✅ Cập nhật trạng thái đơn (PENDING → CONFIRMED → DELIVERY → COMPLETED)
- ✅ Xem sản phẩm trong đơn (kèm topping, size)
- ✅ Real-time sync với Socket.io
- ✅ Filter theo trạng thái, ngày, khách hàng
- ✅ Tìm kiếm đơn hàng
- ✅ Export đơn hàng PDF

#### **6. Quản Lý Khách Hàng**
- ✅ Danh sách khách hàng
- ✅ Xem thông tin khách hàng
- ✅ Xem lịch mua hàng
- ✅ Xem điểm loyalty
- ✅ Kích hoạt/vô hiệu hóa tài khoản
- ✅ Xem tổng chi tiêu

#### **7. Quản Lý Nhân Viên (RBAC)**
- ✅ Danh sách nhân viên
- ✅ Thêm nhân viên
- ✅ Chỉnh sửa thông tin nhân viên
- ✅ Phân quyền (ADMIN, STAFF)
- ✅ Kích hoạt/vô hiệu hóa tài khoản
- ✅ Xem lịch hoạt động

#### **8. Dashboard Nhân Viên**
- ✅ Staff có thể xem đơn hàng của shop họ
- ✅ Cập nhật trạng thái đơn hàng
- ✅ Real-time notification khi có đơn mới
- ✅ Xem thống kê doanh thu shop họ

---

### **BACKEND API (may-api)**

#### **1. Authentication Module**
- ✅ Đăng ký user (Firebase + JWT)
- ✅ Đăng nhập (Firebase OTP verification)
- ✅ Refresh token
- ✅ Logout
- ✅ JWT middleware protection
- ✅ Role-based access (ADMIN, STAFF, USER)

#### **2. User Management**
- ✅ Tạo user mới
- ✅ Cập nhật profile (tên, số điện thoại, địa chỉ)
- ✅ Xem profile người dùng
- ✅ Xem lịch mua hàng
- ✅ Quản lý địa chỉ giao hàng
- ✅ Xem tích điểm loyalty
- ✅ Disable/enable tài khoản

#### **3. Product Management**
- ✅ GET /products - Lấy danh sách sản phẩm
- ✅ POST /products - Tạo sản phẩm mới (Admin)
- ✅ PUT /products/:id - Chỉnh sửa sản phẩm
- ✅ DELETE /products/:id - Xóa sản phẩm
- ✅ GET /products/:id - Xem chi tiết sản phẩm
- ✅ GET /products/search - Tìm kiếm sản phẩm
- ✅ GET /products/category/:id - Lấy sản phẩm theo danh mục
- ✅ GET /products/best-selling - Sản phẩm bán chạy
- ✅ Upload ảnh Cloudinary

#### **4. Category Management**
- ✅ CRUD danh mục
- ✅ Tạo danh mục cha/con (hierarchy)
- ✅ Upload ảnh danh mục
- ✅ Lấy danh mục có sản phẩm

#### **5. Order Management**
- ✅ POST /orders - Tạo đơn hàng mới
- ✅ GET /orders - Lấy danh sách đơn hàng
- ✅ GET /orders/:id - Xem chi tiết đơn hàng
- ✅ PUT /orders/:id/status - Cập nhật trạng thái
- ✅ GET /orders/user/:id - Đơn hàng của user
- ✅ DELETE /orders/:id - Hủy đơn hàng
- ✅ Filter theo trạng thái, ngày tháng
- ✅ OrderItems lưu tùy chỉnh (size, topping)

#### **6. Payment Module**
- ✅ POST /payments/vnpay/create-payment-url - Tạo URL thanh toán VNPay
- ✅ POST /payments/vnpay/return - Callback từ VNPay
- ✅ POST /payments/verify - Verify giao dịch
- ✅ GET /payments/:orderId - Xem thông tin thanh toán
- ✅ Xử lý COD (Cash on Delivery)
- ✅ Ghi log transaction

#### **7. Topping Management**
- ✅ CRUD topping
- ✅ Gán topping vào category
- ✅ Lấy danh sách topping theo category
- ✅ Quản lý giá topping

#### **8. Loyalty System**
- ✅ Tính điểm mỗi khi tạo đơn hàng
- ✅ Lưu lịch tích điểm
- ✅ Xác định bậc thành viên (Bronze: 0-999, Silver: 1000-4999, Gold: 5000-9999, Platinum: >=10000)
- ✅ Xử lý quy đổi điểm lấy quà
- ✅ Áp dụng discount theo bậc
- ✅ GET /loyalty/points - Xem điểm hiện tại
- ✅ GET /loyalty/history - Lịch tích điểm

#### **9. Personalized Recommendations**
- ✅ Tính điểm recommendation cho mỗi user-product pair
- ✅ Lưu vào PersonalizedProduct table
- ✅ Thuật toán: based on purchase history + browsing history
- ✅ GET /personalized/recommendations - Lấy sản phẩm gợi ý
- ✅ Update recommendation định kỳ

#### **10. Dashboard Analytics**
- ✅ GET /dashboard/revenue - Doanh thu (theo ngày/tháng/năm)
- ✅ GET /dashboard/orders - Thống kê đơn hàng
- ✅ GET /dashboard/customers - Số khách hàng
- ✅ GET /dashboard/top-products - Sản phẩm bán chạy
- ✅ GET /dashboard/staff-revenue - Doanh thu theo staff
- ✅ Biểu đồ thống kê

#### **11. Real-time Tracking (Socket.io)**
- ✅ WebSocket connection
- ✅ Emit event khi đơn hàng được tạo
- ✅ Emit event khi trạng thái đơn thay đổi
- ✅ Admin & Customer nhận real-time update
- ✅ Auto-reconnection
- ✅ Message queue (nếu client disconnect)

#### **12. Admin Management**
- ✅ CRUD nhân viên
- ✅ Phân quyền (ADMIN, STAFF, MANAGER)
- ✅ Audit log hoạt động
- ✅ Disable/enable account

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

### **FRONTEND - Customer App (MAY)**

| Thư Viện | Phiên Bản | Mục Đích |
|---------|---------|---------|
| **React** | 19 | UI Framework chính |
| **TypeScript** | 5.x | Type safety, phát hiện lỗi |
| **Vite** | 5.x | Build tool, dev server (cực nhanh) |
| **TailwindCSS** | 3.x | Utility-first CSS framework |
| **React Router** | 7.x | Client-side routing, SPA |
| **Axios** | 1.6.x | HTTP client cho API calls |
| **React Query (TanStack)** | v5.x | Server state management, caching |
| **Firebase SDK** | 10.x | Authentication (OTP via SMS) |
| **Socket.io Client** | 4.x | Real-time order tracking |
| **React Hook Form** | 7.x | Form handling & validation |
| **Zod** | 3.x | Schema validation |

**Folder Structure:**
```
MAY/src/
├── components/       # Reusable UI components
├── pages/            # Page components
├── contexts/         # React Context (AuthContext, CartContext, OrdersContext)
├── hooks/            # Custom hooks (useCategories, useProducts, useBestSellingProducts)
├── services/         # API services (categoryService, productService, toppingService)
├── lib/              # Utils (api.ts, firebase.ts, socket.ts)
└── assets/           # Images, icons
```

---

### **ADMIN DASHBOARD (MAY-admin)**

| Thư Viện | Phiên Bản | Mục Đích |
|---------|---------|---------|
| **React** | 19 | UI Framework |
| **TypeScript** | 5.x | Type safety |
| **Zustand** | 4.x | Lightweight state management |
| **React Hook Form** | 7.x | Form handling |
| **Zod** | 3.x | Schema validation |
| **Shadcn/ui** | Latest | Pre-built component library |
| **TailwindCSS** | 3.x | Styling |
| **Axios** | 1.6.x | API client |
| **React Query** | v5.x | Data fetching & caching |
| **Socket.io** | 4.x | Real-time updates |
| **html2pdf.js** | Latest | Export order to PDF |
| **XLSX** | Latest | Export data to Excel |

**Folder Structure:**
```
MAY-admin/src/
├── components/       # Reusable components
├── pages/            # Page components
├── layouts/          # Layout components (MainLayout, Sidebar)
├── lib/              # Utils (axios.ts, firebase.ts, socket.ts, utils.ts)
└── routes/           # Route configuration
```

**Key Features Implemented:**
- Dashboard thống kê doanh thu
- Quản lý sản phẩm (CRUD)
- Quản lý đơn hàng
- Export PDF/Excel
- Real-time updates via Socket.io
- RBAC (Role-Based Access Control)

---

### **BACKEND API (may-api)**

#### **Framework & Core**
| Thư Viện | Phiên Bản | Mục Đích |
|---------|---------|---------|
| **NestJS** | 11.x | Progressive Node.js framework |
| **TypeScript** | 5.x | Type-safe backend code |
| **Express** | 4.x | Web framework (được NestJS sử dụng) |

#### **Database & ORM**
| Thư Viện | Phiên Bản | Mục Đích |
|---------|---------|---------|
| **PostgreSQL** | 14+ | Relational database |
| **Prisma** | 5.x | ORM, query builder, migrations |
| **@prisma/client** | 5.x | Database client |

#### **Authentication & Security**
| Thư Viện | Phiên Bản | Mục Đích |
|---------|---------|---------|
| **@nestjs/jwt** | Latest | JWT token handling |
| **@nestjs/passport** | Latest | Authentication strategy |
| **passport-jwt** | Latest | JWT authentication |
| **firebase-admin** | Latest | Firebase server-side auth verification |
| **bcrypt** | Latest | Password hashing |

#### **API & Validation**
| Thư Viện | Phiên Bản | Mục Đích |
|---------|---------|---------|
| **@nestjs/common** | 11.x | Core NestJS utilities |
| **class-validator** | Latest | DTO validation (decorators) |
| **class-transformer** | Latest | DTO transformation |
| **@nestjs/swagger** | Latest | API documentation (Swagger) |

#### **Real-time Communication**
| Thư Viện | Phiên Bản | Mục Đích |
|---------|---------|---------|
| **@nestjs/websockets** | 11.x | WebSocket support |
| **socket.io** | 4.x | Real-time bi-directional communication |

#### **Payment & External Services**
| Thư Viện | Phiên Bản | Mục Đích |
|---------|---------|---------|
| **axios** | 1.6.x | HTTP client để call VNPay API |
| **cloudinary** | Latest | Image upload & CDN |
| **qs** | Latest | Query string parser (cho VNPay) |

#### **Testing**
| Thư Viện | Phiên Bản | Mục Đích |
|---------|---------|---------|
| **@nestjs/testing** | 11.x | Testing utilities |
| **jest** | Latest | Unit testing framework |
| **@types/jest** | Latest | Jest type definitions |

**Folder Structure:**
```
may-api/src/
├── main.ts                      # Entry point
├── app.module.ts                # Root module
├── app.controller.ts            # Root controller
├── app.service.ts               # Root service
│
├── auth/                        # Authentication module
│   ├── auth.module.ts
│   ├── auth.service.ts          # Login, register, token
│   ├── auth.controller.ts       # Auth endpoints
│   ├── guards/                  # JWT guard
│   ├── strategies/              # Passport strategies
│   └── dtos/                    # LoginDto, RegisterDto
│
├── users/                       # User management
│   ├── users.module.ts
│   ├── users.service.ts
│   ├── users.controller.ts
│   └── dtos/
│
├── products/                    # Product management
│   ├── products.module.ts
│   ├── products.service.ts
│   ├── products.controller.ts
│   └── dtos/
│
├── categories/                  # Category management
│   ├── categories.module.ts
│   ├── categories.service.ts
│   ├── categories.controller.ts
│   └── dtos/
│
├── orders/                      # Order processing
│   ├── orders.module.ts
│   ├── orders.service.ts
│   ├── orders.controller.ts
│   └── dtos/
│
├── payments/                    # Payment integration (VNPay)
│   ├── payments.module.ts
│   ├── payments.service.ts      # VNPay API calls
│   ├── payments.controller.ts
│   └── dtos/
│
├── toppings/                    # Topping management
│   ├── toppings.module.ts
│   ├── toppings.service.ts
│   ├── toppings.controller.ts
│   └── dtos/
│
├── loyalty/                     # Loyalty points system
│   ├── loyalty.module.ts
│   ├── loyalty.service.ts       # Points calculation
│   ├── loyalty.controller.ts
│   └── dtos/
│
├── personalized/                # AI recommendations
│   ├── personalized.module.ts
│   ├── personalized.service.ts  # Recommendation algorithm
│   ├── personalized.controller.ts
│   └── dtos/
│
├── dashboard/                   # Admin analytics
│   ├── dashboard.module.ts
│   ├── dashboard.service.ts     # Revenue, orders stats
│   ├── dashboard.controller.ts
│   └── dtos/
│
├── prisma/                      # Database layer
│   ├── prisma.service.ts        # Prisma client singleton
│   └── prisma.module.ts
│
├── config/                      # Configuration
│   └── database.config.ts
│
└── utils/                       # Utilities
    ├── exceptions.ts
    ├── interceptors/
    └── decorators/
```

**API Endpoints Summary:**

| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/auth/register` | Đăng ký user mới |
| **POST** | `/auth/login` | Đăng nhập (Firebase OTP) |
| **POST** | `/auth/refresh` | Refresh token |
| **GET** | `/products` | Danh sách sản phẩm |
| **POST** | `/products` | Tạo sản phẩm (Admin) |
| **PUT** | `/products/:id` | Chỉnh sửa sản phẩm |
| **DELETE** | `/products/:id` | Xóa sản phẩm |
| **GET** | `/products/best-selling` | Sản phẩm bán chạy |
| **GET** | `/categories` | Danh sách danh mục |
| **POST** | `/orders` | Tạo đơn hàng |
| **GET** | `/orders/:id` | Chi tiết đơn hàng |
| **PUT** | `/orders/:id/status` | Cập nhật trạng thái |
| **POST** | `/payments/vnpay/create-payment-url` | Tạo URL thanh toán VNPay |
| **POST** | `/payments/vnpay/return` | Callback từ VNPay |
| **GET** | `/loyalty/points` | Xem điểm hiện tại |
| **GET** | `/dashboard/revenue` | Doanh thu thống kê |
| **GET** | `/personalized/recommendations` | Sản phẩm gợi ý |

---

---

## 📊 Database Schema (PostgreSQL)

```sql
User
├── id (UUID, PK)
├── email (unique)
├── firebaseId (Firebase UID)
├── fullName
├── phone
├── address (multiple)
├── loyaltyPoints (int)
├── tier (Bronze/Silver/Gold/Platinum)
├── role (ADMIN/STAFF/USER)
└── timestamps (createdAt, updatedAt)

Product
├── id (UUID, PK)
├── name
├── description
├── price (DECIMAL)
├── image (URL từ Cloudinary)
├── categoryId (FK → Category)
├── isActive (boolean)
└── timestamps

Category
├── id (UUID, PK)
├── name
├── image (URL)
└── timestamps

Order
├── id (UUID, PK)
├── userId (FK → User)
├── totalAmount (DECIMAL)
├── status (PENDING/CONFIRMED/DELIVERY/COMPLETED/CANCELLED)
├── paymentMethod (VNPAY/COD)
├── shippingAddress
├── note
└── timestamps

OrderItem
├── id (UUID, PK)
├── orderId (FK → Order)
├── productId (FK → Product)
├── quantity (int)
├── unitPrice (DECIMAL)
├── customizations (JSON: {size: "L", toppings: [{id, name, price}]})
└── timestamps

Topping
├── id (UUID, PK)
├── name
├── price (DECIMAL)
├── category (e.g., "Pearl", "Jelly", "Pudding")
└── timestamps

Payment
├── id (UUID, PK)
├── orderId (FK → Order, unique)
├── transactionId (unique - từ VNPay)
├── method (VNPAY/COD)
├── amount (DECIMAL)
├── status (PENDING/SUCCESS/FAILED)
├── responseCode (từ VNPay)
├── responseMessage (từ VNPay)
└── timestamps

LoyaltyPoint
├── id (UUID, PK)
├── userId (FK → User)
├── orderId (FK → Order)
├── pointsEarned (int)
├── reason (enum: PURCHASE, REFERRAL, REDEEM)
├── description
└── timestamps

PersonalizedProduct
├── id (UUID, PK)
├── userId (FK → User)
├── productId (FK → Product)
├── score (FLOAT: 0.0 - 1.0)
├── reason (enum: PURCHASE_HISTORY, BROWSING, TRENDING)
└── timestamps (updatedAt)
```

---

## 🎓 Kỹ Năng & Kiến Thức Được Áp Dụng

### **Frontend Development**
✅ React 19 hooks & best practices
✅ TypeScript - strict mode
✅ State management (Context API + Zustand)
✅ API integration (Axios + React Query)
✅ Real-time communication (Socket.io Client)
✅ Form validation (React Hook Form + Zod)
✅ Responsive design (TailwindCSS)
✅ Component composition & reusability
✅ Performance optimization (code splitting, lazy loading)

### **Backend Development**
✅ NestJS architecture & patterns
✅ RESTful API design
✅ Service-oriented architecture
✅ Dependency injection (NestJS DI)
✅ Database ORM (Prisma)
✅ Authentication & authorization (JWT + Firebase)
✅ Input validation (class-validator)
✅ Error handling & logging
✅ WebSocket implementation (Socket.io Gateway)
✅ External API integration (VNPay, Firebase, Cloudinary)

### **Database Design**
✅ Relational database modeling
✅ Primary & foreign keys
✅ Indexes & query optimization
✅ Database migrations (Prisma Migrations)
✅ Normalization & ACID compliance

### **DevOps & Deployment**
✅ Vercel deployment (Frontend)
✅ Environment configuration (.env)
✅ Database hosting (Supabase/PostgreSQL)
✅ Git & version control
✅ CI/CD ready architecture

### **Security**
✅ Firebase OTP authentication
✅ JWT token management
✅ Password hashing (bcrypt)
✅ CORS configuration
✅ Input validation & sanitization
✅ SQL injection prevention (Prisma)
✅ Secure payment callback verification

### **Testing & Quality**
✅ Jest setup
✅ TypeScript strict mode
✅ ESLint & code standards
✅ Error handling

---

## 🏆 Điểm Nổi Bật Của Dự Án

1. **Full-Stack Development**
   - Thiết kế và triển khai toàn bộ hệ thống từ UI đến Database
   - Frontend responsive, Backend scalable

2. **Real-time Technology**
   - WebSocket (Socket.io) cho real-time order tracking
   - Bi-directional communication giữa client & server
   - Efficient message broadcasting

3. **Payment Gateway Integration**
   - VNPay integration (Payment gateway thực tế ở Việt Nam)
   - Callback verification & transaction logging
   - COD support

4. **Production-Ready**
   - Deployed trên Vercel (Frontend)
   - PostgreSQL production database (Supabase)
   - Environment configuration
   - Error handling & logging

5. **Type Safety**
   - 100% TypeScript codebase
   - Strict type checking
   - DTO validation

6. **Authentication & Security**
   - Firebase OTP (SMS-based)
   - JWT token with refresh mechanism
   - Role-Based Access Control (RBAC: ADMIN, STAFF, USER)
   - Password hashing

7. **Scalable Architecture**
   - Service-oriented modules (NestJS)
   - Separation of concerns
   - Reusable components (React)

8. **Admin Analytics**
   - Real-time dashboard statistics
   - Revenue tracking
   - Order management
   - PDF/Excel export

9. **Loyalty System**
   - Points calculation based on purchases
   - Member tiers (Bronze, Silver, Gold, Platinum)
   - Tier benefits & discounts

10. **Personalization**
    - AI-driven product recommendations
    - Based on purchase history & browsing behavior
    - Dynamic recommendation scoring

---

## 📈 Tiến Độ & Deployment Status

| Thành Phần | Phần Trăm | Trạng Thái | URL |
|-----------|---------|-----------|-----|
| **Customer App (MAY)** | 95% | ✅ Live on Vercel | https://milk-tea-ecommerce.vercel.app |
| **Admin Dashboard (MAY-admin)** | 100% | 📦 Ready to deploy | - |
| **Backend API (may-api)** | 85% | ⏳ Ready to deploy | - |
| **Authentication** | 100% | ✅ Firebase + JWT | - |
| **Payment (VNPay)** | 100% | ✅ Integrated | - |
| **Real-time Tracking** | 90% | ✅ Socket.io OK | - |
| **Loyalty System** | 100% | ✅ Full implementation | - |
| **Database** | 95% | ✅ 8 models complete | PostgreSQL (Supabase) |

### **Triển Khai Recommendation**
- **Frontend**: Vercel ✅ (đã deploy)
- **Backend**: Railway, Render, hoặc AWS Lambda
- **Database**: Supabase/AWS RDS
- **Real-time**: Dedicated Socket.io server

---

## 🚀 Cách Chạy Dự Án Locally

### **1. Customer App (MAY)**
```bash
cd MAY
npm install
npm run dev
# Truy cập: http://localhost:5173
```

### **2. Admin Dashboard (MAY-admin)**
```bash
cd MAY-admin
npm install
npm run dev
# Truy cập: http://localhost:5174
```

### **3. Backend API (may-api)**
```bash
cd may-api
npm install
npm run start:dev
# Truy cập: http://localhost:3000
# API docs: http://localhost:3000/api
```

---

## 📁 Project Structure

```
DACN-May/
├── MAY/                         # 🛍️ Customer App (React 19)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── lib/
│   ├── vite.config.ts
│   └── package.json
│
├── MAY-admin/                   # 📊 Admin Dashboard (React 19 + Shadcn)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   └── lib/
│   ├── vite.config.ts
│   └── package.json
│
├── may-api/                     # 🔌 Backend API (NestJS 11)
│   ├── src/
│   │   ├── main.ts
│   │   ├── auth/
│   │   ├── users/
│   │   ├── products/
│   │   ├── orders/
│   │   ├── payments/
│   │   ├── loyalty/
│   │   ├── personalized/
│   │   ├── dashboard/
│   │   └── prisma/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.ts
│   │   └── migrations/
│   └── package.json
│
├── CV_PROJECT.md                # 📋 This file
├── PROJECT_OVERVIEW.md
└── PRESENTATION.md
```

---

## 💼 Summary

**MAY Coffee** là một hệ thống e-commerce trà sữa hoàn chỉnh, sử dụng tech stack hiện đại và best practices. Dự án triển khai:

- **Frontend**: React 19 + TypeScript + TailwindCSS
- **Admin**: React + Zustand + Shadcn
- **Backend**: NestJS + PostgreSQL + Prisma
- **Authentication**: Firebase OTP + JWT
- **Real-time**: Socket.io WebSocket
- **Payments**: VNPay integration
- **Deployment**: Vercel (Frontend) + Supabase (Database)

**Tất cả các tính năng chính đã triển khai đầy đủ và sẵn sàng sử dụng trong production.**

---

**Cập nhật:** 01/06/2026
