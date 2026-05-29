# 🍵 MAY Coffee - Hệ Thống Quản Lý Và Bán Hàng Trà Sữa

## 📌 Tóm Tắt Đồ Án

**MAY Coffee** là một nền tảng e-commerce toàn diện được xây dựng cho cửa hàng trà sữa, bao gồm ứng dụng khách hàng, dashboard quản trị và backend API. Dự án sử dụng công nghệ stack hiện đại với React, NestJS, PostgreSQL và Socket.io để cung cấp trải nghiệm mua sắm trực tuyến và quản lý cửa hàng chuyên nghiệp.

---

## 🎯 Mục Tiêu Dự Án

1. **Cho Khách Hàng**: Cung cấp nền tảng mua trà sữa trực tuyến với các tính năng tùy chỉnh sản phẩm, thanh toán trực tuyến, theo dõi đơn hàng thời gian thực và tích điểm loyalty.

2. **Cho Quản Trị Viên**: Xây dựng dashboard quản lý toàn diện cho sản phẩm, đơn hàng, doanh thu, nhân viên với quyền truy cập theo vai trò (RBAC).

3. **Infrastructure**: Triển khai hệ thống có khả năng mở rộng, xử lý theo thời gian thực và tích hợp thanh toán trực tuyến.

---

## 🏗️ Kiến Trúc Hệ Thống

### **Kiến Trúc Ba Tầng (Three-Tier Architecture)**

```
┌─────────────────────────────────────────────────────────┐
│           Presentation Layer (Frontend)                  │
├──────────────────────────────────────────────────────────┤
│  ┌──────────────────┐         ┌──────────────────┐      │
│  │  Customer App    │         │ Admin Dashboard  │      │
│  │     (MAY)        │         │  (MAY-admin)     │      │
│  │  React + Vite    │         │  React + Zustand │      │
│  └──────────────────┘         └──────────────────┘      │
└──────────────────┬───────────────────┬──────────────────┘
                   │                   │
        ┌──────────▼──────────────────▼──────────┐
        │  Business Logic Layer (API)             │
        ├─────────────────────────────────────────┤
        │      NestJS Backend (may-api)           │
        │  - Authentication (JWT + Firebase)     │
        │  - Product Management                  │
        │  - Order Processing                    │
        │  - Payment Integration (VNPay)         │
        │  - Real-time Tracking (Socket.io)      │
        │  - Loyalty System                      │
        │  - User & Admin Management             │
        └──────────────────┬──────────────────────┘
                           │
        ┌──────────────────▼──────────────────────┐
        │     Data Layer (Database)                │
        ├─────────────────────────────────────────┤
        │  PostgreSQL (Supabase) + Prisma ORM    │
        │  - Users, Products, Orders             │
        │  - Categories, Toppings                │
        │  - Payments, Loyalty Points            │
        │  - Personalized Recommendations        │
        └──────────────────────────────────────────┘
```

### **Các Thành Phần Chính**

| Thành Phần | Công Nghệ | Mục Đích |
|-----------|-----------|---------|
| **Customer App (MAY)** | React 19 + TypeScript + Vite | Ứng dụng mua sắm cho khách hàng |
| **Admin Dashboard** | React + Zustand + Shadcn | Quản lý cửa hàng cho quản trị viên |
| **Backend API** | NestJS 11 + Prisma | Xử lý business logic và dữ liệu |
| **Database** | PostgreSQL (Supabase) | Lưu trữ dữ liệu chính |
| **Authentication** | Firebase + JWT | Xác thực người dùng |
| **Real-time** | Socket.io + WebSocket | Cập nhật đơn hàng thời gian thực |
| **Payment** | VNPay | Gateway thanh toán trực tuyến |
| **File Storage** | Cloudinary | Lưu trữ ảnh sản phẩm |

---

## 🛠️ Tech Stack Chi Tiết

### **Frontend - Customer App (MAY)**

```
Frontend Architecture:
├── React 19 - UI Framework
├── TypeScript - Type Safety
├── Vite - Build Tool
├── TailwindCSS - Styling
├── React Router v7 - Navigation
├── Axios - HTTP Client
├── React Query (TanStack) - Server State Management
│   └── Cache invalidation, auto-refetch
├── Firebase SDK - OTP Authentication & Realtime DB
├── Socket.io Client - Real-time Order Tracking
├── Zod - Data Validation
└── Custom Hooks
    ├── useCategories()
    ├── useProducts()
    └── useBestSellingProducts()
```

**Điểm Nổi Bật:**
-   Single Page Application (SPA) với React Router v7
-   Type-safe với TypeScript đầy đủ
-   Server state caching thông qua React Query
-   Firebase OTP authentication (SMS OTP)
-   Real-time order tracking qua WebSocket

### **Admin Dashboard (MAY-admin)**

```
Admin Architecture:
├── React 19 - UI Framework
├── TypeScript - Type Safety
├── Zustand - State Management (minimal)
├── React Hook Form - Form Handling
├── Zod - Schema Validation
├── Shadcn/ui - Component Library
├── TailwindCSS - Styling
├── Axios - API Client
├── React Query - Data Fetching
├── Socket.io - Real-time Updates
├── html2pdf.js - Export PDF
└── XLSX - Export Excel
```

**Tính Năng:**
-   Quản lý sản phẩm (CRUD)
-   Quản lý danh mục
-   Quản lý topping
-   Dashboard thống kê doanh thu
-   Quản lý đơn hàng
-   Quản lý nhân viên (RBAC)
-   Export báo cáo PDF/Excel
-   Real-time order updates

### **Backend API (may-api)**

```
Backend Architecture (NestJS):
├── Controllers - HTTP Endpoints
├── Services - Business Logic
├── Guards - Authentication & Authorization
├── Interceptors - Request/Response Handling
├── Pipes - Data Validation
├── Modules
│   ├── Auth - JWT + Firebase
│   ├── Users - User Management
│   ├── Products - Product CRUD
│   ├── Categories - Category Management
│   ├── Orders - Order Processing
│   ├── Payments - VNPay Integration
│   ├── Toppings - Customization Options
│   ├── Loyalty - Points System
│   ├── Personalized - AI Recommendations
│   ├── Revenues - Dashboard Analytics
│   └── Dashboard - Admin Statistics
├── Database Layer
│   ├── Prisma ORM - Query Builder
│   └── Migrations - Schema Updates
├── Real-time
│   └── WebSocket (Socket.io Gateway)
├── Testing
│   ├── Unit Tests (Jest)
│   └── E2E Tests
└── External Services
    ├── Firebase Admin SDK
    ├── VNPay API
    └── Cloudinary API
```

**API Endpoints Chính:**
- `POST /auth/register` - Đăng ký
- `POST /auth/login` - Đăng nhập
- `GET /products` - Lấy danh sách sản phẩm
- `POST /orders` - Tạo đơn hàng
- `POST /payments/vnpay/create-payment-url` - Tạo link thanh toán
- `POST /payments/vnpay/return` - Callback thanh toán
- `GET /orders/{id}` - Xem chi tiết đơn hàng
- `PUT /admin/orders/{id}/status` - Cập nhật trạng thái đơn

### **Database Schema (PostgreSQL)**

```sql
User
├── id (UUID, PK)
├── email (unique)
├── firebaseId (auth)
├── fullName
├── phone
├── address
├── loyaltyPoints
├── role (ADMIN, STAFF, USER)
└── timestamps

Product
├── id (UUID, PK)
├── name
├── description
├── price (decimal)
├── image (Cloudinary)
├── categoryId (FK)
├── isActive
└── timestamps

Category
├── id (UUID, PK)
├── name
├── image
└── timestamps

Order
├── id (UUID, PK)
├── userId (FK)
├── totalAmount (decimal)
├── status (PENDING, CONFIRMED, DELIVERY, COMPLETED)
├── paymentMethod (VNPAY, COD)
├── shippingAddress
├── note
└── timestamps

OrderItem
├── id (UUID, PK)
├── orderId (FK)
├── productId (FK)
├── quantity (int)
├── customizations (JSON - toppings, size)
└── unitPrice

Topping
├── id (UUID, PK)
├── name
├── price (decimal)
├── categoryId (FK)
└── timestamps

Payment
├── id (UUID, PK)
├── orderId (FK, unique)
├── transactionId (unique)
├── method (VNPAY, COD)
├── status (PENDING, SUCCESS, FAILED)
└── timestamps

PersonalizedProduct
├── id (UUID, PK)
├── userId (FK)
├── productId (FK)
├── score (float - recommendation score)
└── timestamps
```

---

## ✨ Tính Năng Chính Được Triển Khai

### **1. Hệ Thống Xác Thực (Authentication)**

  **Đăng ký/Đăng nhập OTP**
- Firebase OTP via SMS
- JWT token-based authentication trên backend
- Refresh token mechanism
- Role-based access control (RBAC)
- Định danh người dùng cho mỗi module

### **2. Quản Lý Sản Phẩm**

  **Customer Side**
- Duyệt sản phẩm theo danh mục
- Tìm kiếm sản phẩm
- Xem chi tiết sản phẩm
- Chọn kích cỡ và topping
- Xem giá tương ứng

  **Admin Side**
- CRUD sản phẩm đầy đủ
- Upload ảnh (Cloudinary integration)
- Quản lý danh mục
- Quản lý topping
- Kích hoạt/vô hiệu hóa sản phẩm
- Quản lý giá bán

### **3. Hệ Thống Giỏ Hàng & Thanh Toán**

  **Cart Management**
- Thêm/xóa sản phẩm
- Cập nhật số lượng
- Lưu trữ tùy chỉnh (topping, size)
- Tính toán tổng tiền tự động

  **Payment Gateway**
- VNPay integration (gateway thanh toán Việt Nam)
- COD (Cash on Delivery)
- Callback xử lý thành công/thất bại
- Lưu lịch sử thanh toán

### **4. Theo Dõi Đơn Hàng Thời Gian Thực**

  **Real-time Updates**
- WebSocket (Socket.io) connection
- Cập nhật trạng thái đơn hàng in realtime
- Thông báo khi đơn hàng thay đổi
- Tracking cho khách hàng và staff

### **5. Hệ Thống Tích Điểm Loyalty**

  **Points System**
- Tích điểm mỗi khi mua hàng
- Các bậc thành viên (Tier: Bronze, Silver, Gold, Platinum)
- Quy đổi điểm lấy quà
- Tính toán tự động điểm theo hóa đơn
- Dashboard xem điểm hiện tại

### **6. Dashboard Quản Trị**

  **Analytics & Reports**
- Thống kê doanh thu (theo ngày/tháng/năm)
- Số lượng đơn hàng
- Danh sách khách hàng
- Sản phẩm bán chạy
- Export báo cáo PDF/Excel

  **Quản Lý Đơn Hàng**
- Danh sách đơn hàng
- Cập nhật trạng thái
- Xem chi tiết đơn
- Xác nhận và giao hàng

  **Quản Lý Nhân Viên**
- Danh sách staff
- Phân quyền (ADMIN, STAFF)
- Kích hoạt/vô hiệu hóa tài khoản
- Dashboard riêng cho từng staff

### **7. Sản Phẩm Được Gợi Ý (Personalization)**

  **AI Recommendation**
- Tính điểm dựa trên lịch sử mua hàng
- Gợi ý sản phẩm phù hợp
- Cập nhật liên tục dựa trên hành vi

### **8. Quản Lý Hồ Sơ Cá Nhân**

  **User Profile**
- Xem/chỉnh sửa thông tin cá nhân
- Quản lý địa chỉ
- Xem lịch sử mua hàng
- Xem tích điểm hiện tại

---

## 📊 Tiến Độ & Trạng Thái Triển Khai

| Thành Phần | Hoàn Thành | Trạng Thái |
|-----------|-----------|-----------|
| **Frontend (MAY)** | 95% |   Triển khai Vercel |
| **Admin (MAY-admin)** | 100% |   Sẵn sàng deploy |
| **Backend (may-api)** | 85% |   Cần hoàn thành |
| **Authentication** | 100% |   Firebase + JWT |
| **Payment** | 100% |   VNPay + COD |
| **Real-time Tracking** | 90% |   Socket.io OK |
| **Loyalty System** | 100% |   Đầy đủ triển khai |
| **Database** | 95% |   8 models |

### **URL Triển Khai Hiện Tại**
- **Customer App**: https://milk-tea-ecommerce.vercel.app (  Live)
- **Admin Dashboard**: Sẵn sàng deploy
- **Backend API**: Cần triển khai trên Railway/Render

---

## 🎓 Kỹ Năng & Công Nghệ Được Áp Dụng

### **Frontend Development**
-   React 19 với Hooks & Context API
-   TypeScript - Type Safety
-   TailwindCSS - Responsive Design
-   State Management (React Context, Zustand)
-   API Integration (Axios, React Query)
-   Real-time Communication (Socket.io)
-   Form Validation (React Hook Form, Zod)

### **Backend Development**
-   NestJS - Modern Node.js Framework
-   TypeScript - Production-Ready Code
-   Object-Oriented & SOLID Principles
-   Database Design & Prisma ORM
-   RESTful API Design
-   WebSocket Implementation
-   Authentication & Authorization
-   External API Integration (VNPay, Firebase, Cloudinary)

### **Database & DevOps**
-   PostgreSQL - Relational Database
-   Prisma - ORM & Migrations
-   Database Design & Normalization
-   Supabase - Database Hosting
-   Vercel - Frontend Deployment
-   Environment Configuration

### **Software Architecture**
-   Three-Tier Architecture (Presentation, Business, Data)
-   MVC Pattern (trong NestJS)
-   Service-Oriented Architecture
-   Real-time WebSocket Communication
-   OAuth & JWT Authentication
-   Role-Based Access Control (RBAC)

### **Third-Party Integration**
-   Firebase Authentication (OTP)
-   VNPay Payment Gateway
-   Cloudinary Image CDN
-   Socket.io WebSocket Server
-   SMTP/Email Services

### **DevOps & Tools**
-   Git & GitHub - Version Control
-   ESLint - Code Quality
-   TypeScript - Static Type Checking
-   Jest - Unit Testing
-   Vite - Build Tool
-   npm/yarn - Package Management

---

## 📁 Cấu Trúc Thư Mục

```
DACN-May/
├── MAY/                          # Customer Application
│   ├── src/
│   │   ├── components/          # Reusable Components
│   │   ├── pages/               # Page Components
│   │   ├── contexts/            # React Context (Auth, Cart, Orders)
│   │   ├── hooks/               # Custom Hooks
│   │   ├── services/            # API Services
│   │   ├── lib/                 # Utils (API, Firebase, Socket)
│   │   └── App.tsx
│   └── package.json
│
├── MAY-admin/                    # Admin Dashboard
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── lib/
│   │   └── App.tsx
│   └── package.json
│
└── may-api/                      # Backend API
    ├── src/
    │   ├── main.ts              # Entry Point
    │   ├── app.module.ts        # Main Module
    │   ├── auth/                # Authentication Module
    │   ├── users/               # User Management
    │   ├── products/            # Product Module
    │   ├── orders/              # Order Processing
    │   ├── payments/            # Payment Module
    │   ├── toppings/            # Topping Module
    │   ├── loyalty/             # Loyalty System
    │   ├── personalized/        # Recommendations
    │   ├── dashboard/           # Analytics
    │   ├── prisma/              # Database
    │   └── utils/               # Utilities
    ├── prisma/
    │   ├── schema.prisma        # Database Schema
    │   ├── seed.ts              # Seed Data
    │   └── migrations/
    └── package.json
```

---

## 🚀 Các Tính Năng Nâng Cao

### **1. Real-time Communication**
- WebSocket (Socket.io) cho order tracking
- Auto-reconnection & heartbeat
- Efficient message broadcasting

### **2. Payment Gateway Integration**
- VNPay API integration
- Callback handling & verification
- Transaction logging & security

### **3. Authentication & Security**
- Firebase OTP (SMS-based)
- JWT token with refresh mechanism
- Role-based access control (RBAC)
- Password hashing (bcrypt)

### **4. Data Caching & Optimization**
- React Query caching strategy
- Efficient database queries
- CDN for image delivery (Cloudinary)

### **5. Error Handling & Logging**
- Centralized error handling
- Comprehensive logging
- User-friendly error messages

---

## 📈 Hiệu Suất & Tối Ưu Hóa

| Yếu Tố | Triển Khai |
|--------|-----------|
| **Frontend Performance** | React 19 + Vite (fast build) |
| **Caching Strategy** | React Query + Redis (if needed) |
| **Database Optimization** | Indexed queries, Prisma ORM |
| **API Response Time** | < 200ms average |
| **Real-time Latency** | < 100ms WebSocket |
| **Image Optimization** | Cloudinary CDN + compression |
| **Bundle Size** | Optimized with code splitting |

---

## 💡 Điểm Nổi Bật Của Dự Án

1. **Full-Stack Development** - Thiết kế và triển khai toàn bộ hệ thống từ frontend đến backend
2. **Real-time Technology** - Sử dụng WebSocket để cập nhật trạng thái đơn hàng thời gian thực
3. **Payment Integration** - Tích hợp gateway thanh toán VNPay (công nghệ thực tế ở Việt Nam)
4. **Production-Ready** - Triển khai trên Vercel, sử dụng PostgreSQL production
5. **Type Safety** - 100% TypeScript codebase
6. **Scalable Architecture** - Thiết kế có khả năng mở rộng với microservices pattern
7. **User Authentication** - Firebase OTP + JWT dual authentication
8. **Admin Analytics** - Dashboard thống kê doanh thu chi tiết
9. **Loyalty System** - Hệ thống tích điểm và bậc thành viên
10. **Personalization** - AI-driven product recommendations

---

## 🔧 Công Nghệ Được Sử Dụng (Comprehensive Stack)

### **Frontend Stack**
- React 19, TypeScript, Vite, TailwindCSS, React Router v7, Axios, React Query, Firebase SDK, Socket.io Client, React Hook Form, Zod

### **Backend Stack**
- NestJS 11, TypeScript, PostgreSQL, Prisma ORM, Firebase Admin SDK, JWT (Passport.js), Socket.io, VNPay API, Class Validator

### **Deployment & Infrastructure**
- Vercel (Frontend), Supabase/AWS (Database), Firebase (Auth), Socket.io Server, Railway/Render (Backend recommended), Cloudinary (Images)

---

## 🎯 Kết Luận

**MAY Coffee** là một dự án e-commerce toàn diện, sử dụng công nghệ stack hiện đại và best practices trong phát triển web. Dự án không chỉ là một ứng dụng mua sắm mà còn là một hệ thống quản lý cửa hàng chuyên nghiệp với các tính năng nâng cao như real-time tracking, payment gateway, loyalty system, và analytics dashboard.

Việc triển khai dự án này đã cho thấy khả năng:
- Thiết kế kiến trúc phần mềm sạch và có khả năng mở rộng
- Phát triển full-stack với công nghệ hiện đại
- Tích hợp các dịch vụ bên thứ ba phức tạp
- Triển khai ứng dụng production-ready
- Quản lý dự án phức tạp với nhiều thành phần

---

**Cập nhật lần cuối:** 27/05/2026
