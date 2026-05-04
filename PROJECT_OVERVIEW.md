# 🍵 MAY Coffee - Hệ Thống Quản Lý Và Bán Hàng Trà Sữa

## 📋 Giới Thiệu Dự Án

**MAY Coffee** là một nền tảng e-commerce toàn diện dành cho cửa hàng trà sữa, bao gồm:
- **Ứng dụng khách hàng (MAY)**: Mua sắm trực tuyến, theo dõi đơn hàng, tích điểm loyalty
- **Dashboard quản trị (MAY-admin)**: Quản lý sản phẩm, đơn hàng, doanh thu, nhân viên
- **Backend API (may-api)**: Xử lý logic business, authentication, thanh toán, real-time updates

---

## 🛠️ Công Nghệ Sử Dụng

### **Frontend - MAY (Customer App)**
| Công Nghệ | Mục Đích |
|-----------|---------|
| **React 19** | UI Framework chính |
| **TypeScript** | Type safety, phát hiện lỗi sớm |
| **Vite** | Fast build tool, dev server nhanh |
| **TailwindCSS** | Utility-first CSS framework |
| **React Router v7** | Client-side routing, SPA |
| **Axios** | HTTP client cho API calls |
| **React Query (TanStack)** | Server state management, caching |
| **Firebase SDK** | Authentication (OTP), real-time DB |
| **Socket.io Client** | Real-time order tracking |

### **Admin Dashboard - MAY-admin**
| Công Nghệ | Mục Đích |
|-----------|---------|
| **React 19** | UI Framework |
| **TypeScript** | Type safety |
| **Zustand** | State management (lightweight) |
| **React Hook Form** | Form handling, validation |
| **Zod** | Schema validation |
| **Shadcn/ui** | Pre-built components |
| **TailwindCSS** | Styling |
| **Axios** | API client |
| **React Query** | Data fetching & caching |
| **Socket.io** | Real-time updates |
| **html2pdf.js** | Export đơn hàng PDF |
| **XLSX** | Export dữ liệu Excel |

### **Backend API - may-api**
| Công Nghệ | Mục Đích |
|-----------|---------|
| **NestJS 11** | Framework Node.js (MVC pattern) |
| **TypeScript** | Type-safe backend |
| **PostgreSQL** | Relational database |
| **Prisma ORM** | Database query builder, migrations |
| **Firebase Admin SDK** | Server-side auth verification |
| **JWT (Passport.js)** | Token-based authentication |
| **Socket.io** | Real-time order tracking, WebSocket |
| **VNPay** | Payment gateway (Vietnamese) |
| **Class Validator** | DTO validation |
| **Jest** | Unit & E2E testing |

### **Deployment & Infrastructure**
| Công Nghệ | Mục Đích |
|-----------|---------|
| **Vercel** | Hosting frontend (MAY, MAY-admin) |
| **Supabase/AWS** | PostgreSQL database |
| **Firebase** | Authentication, real-time DB |
| **Socket.io Server** | Real-time communication |
| **Railway/Render** | Backend hosting (recommended) |
| **Cloudinary** | Image upload & CDN |

---

## 📊 Tính Năng Chính

### **👥 Dành Cho Khách Hàng**
- ✅ **Đăng ký/Đăng nhập**: Firebase OTP authentication
- ✅ **Duyệt sản phẩm**: Filter theo danh mục, tìm kiếm
- ✅ **Tùy chỉnh đơn hàng**: Chọn topping, lựa chọn kích cỡ
- ✅ **Giỏ hàng**: Thêm/xóa sản phẩm, cập nhật số lượng
- ✅ **Thanh toán**: VNPay, COD (Cash on Delivery)
- ✅ **Tích điểm Loyalty**: Tích điểm mỗi lần mua, redeem quà
- ✅ **Theo dõi đơn hàng**: Real-time tracking via WebSocket
- ✅ **Lịch sử đơn hàng**: Xem tất cả đơn hàng cũ
- ✅ **Hồ sơ cá nhân**: Quản lý thông tin, địa chỉ
- ✅ **Sản phẩm được gợi ý**: AI personalization

### **👨‍💼 Dành Cho Quản Trị Viên**
- ✅ **Dashboard thống kê**: Doanh thu, đơn hàng, khách hàng
- ✅ **Quản lý sản phẩm**: CRUD, upload ảnh
- ✅ **Quản lý danh mục**: Tạo, sửa, xóa category
- ✅ **Quản lý topping**: Tùy chỉnh topping menu
- ✅ **Quản lý đơn hàng**: Xem, cập nhật trạng thái
- ✅ **Quản lý nhân viên**: RBAC (Role-Based Access Control)
- ✅ **Báo cáo doanh thu**: Export PDF/Excel
- ✅ **Quản lý người dùng**: Kích hoạt/vô hiệu hóa tài khoản
- ✅ **Dashboard nhân viên**: Xem đơn hàng của shop

---

## 📈 Tiến Độ Hiện Tại

| Phần | Hoàn Thành | Ghi Chú |
|-----|-----------|--------|
| **Frontend (MAY)** | 95% | Đã deploy Vercel, minor fixes |
| **Admin (MAY-admin)** | 100% | Đầy đủ chức năng quản lý |
| **Backend (may-api)** | 85% | Thiếu Reviews & SMS notifications |
| **Database Schema** | 95% | 8 models, cần Review model |
| **Authentication** | 100% | Firebase + JWT working |
| **Payment** | 100% | VNPay & COD integrated |
| **Real-time** | 90% | WebSocket order tracking ok |
| **Loyalty System** | 100% | Points & Tiers implemented |

---

## 🗄️ Cấu Trúc Database

```
User
├── id (PK)
├── email (unique)
├── firebaseId (for auth)
├── fullName
├── phone
├── address
├── loyaltyPoints
├── role (ADMIN, STAFF, USER)
└── createdAt

Product
├── id (PK)
├── name
├── description
├── price
├── categoryId (FK)
├── image
├── isActive
└── createdAt

Category
├── id (PK)
├── name
├── image
├── parentId (for hierarchy)
└── createdAt

Order
├── id (PK)
├── userId (FK)
├── totalAmount
├── status (PENDING, CONFIRMED, DELIVERY, COMPLETED)
├── paymentMethod
├── shippingAddress
├── note
└── createdAt

OrderItem
├── id (PK)
├── orderId (FK)
├── productId (FK)
├── quantity
├── customizations (toppings, size)
└── price

Topping
├── id (PK)
├── name
├── price
├── categoryId (FK)
└── createdAt

Payment
├── id (PK)
├── orderId (FK)
├── transactionId
├── method (VNPAY, COD)
├── status
└── createdAt

PersonalizedProduct
├── id (PK)
├── userId (FK)
├── productId (FK)
├── score (AI recommendation)
└── createdAt
```

---

## 🚀 Deployment Status

### **Frontend (MAY)**
- **URL**: https://milk-tea-ecommerce.vercel.app
- **Status**: ✅ Live (với env vars)
- **Hosting**: Vercel
- **Build Command**: `cd MAY && npm install && npm run build`

### **Admin (MAY-admin)**
- **Status**: ✅ Ready to deploy
- **Hosting**: Vercel (chưa deploy)
- **Build Command**: `cd MAY-admin && npm install && npm run build`

### **Backend (may-api)**
- **Status**: ⚠️ NOT on Vercel (serverless limitation)
- **Recommended**: Railway, Render, hoặc AWS
- **Build Command**: `npm run build`

---

## 🛠️ Các Công Nghệ Nâng Cao

| Tính Năng | Công Nghệ |
|----------|-----------|
| **Authentication** | Firebase + JWT |
| **Real-time Tracking** | Socket.io (WebSocket) |
| **Payment Gateway** | VNPay (Vietnamese) |
| **Image Hosting** | Cloudinary CDN |
| **Database Migration** | Prisma Migrations |
| **Code Quality** | ESLint, TypeScript |
| **Testing** | Jest (Unit & E2E) |
| **API Documentation** | Swagger (NestJS) |

---

## 📝 Còn Thiếu (Before Launch)

1. **Review & Rating System** - 🔴 HIGH PRIORITY
   - Chưa có Review model
   - Chưa có API endpoints
   - Chưa có UI component

2. **SMS Notifications** - 🔴 HIGH PRIORITY
   - Chưa integ Twilio/AWS SNS
   - Cần gửi OTP, order updates via SMS

3. **Email Notifications** - 🟡 MEDIUM
   - Setup SMTP hoặc SendGrid

4. **Advanced Profile** - 🟡 MEDIUM
   - Avatar upload
   - Address book
   - Saved payment methods

---

## 🔗 Liên Kết Dự Án

| Thành Phần | URL | Status |
|----------|-----|--------|
| GitHub Repository | https://github.com/nguyen-hong-tham/MAY | ✅ Public |
| Customer App | https://milk-tea-ecommerce.vercel.app | 🔄 Building |
| Admin Dashboard | (chưa deploy) | ⏳ Ready |
| Backend API | (chưa deploy) | ⏳ Ready |

---

## 👨‍💻 Tech Stack Summary

- **Frontend**: React + TypeScript + TailwindCSS + Vite
- **Backend**: NestJS + PostgreSQL + Prisma + Firebase
- **Real-time**: Socket.io
- **Payment**: VNPay
- **Auth**: Firebase + JWT
- **Hosting**: Vercel (Frontend), Railway (Backend)

---

**Cập nhật lần cuối**: 27/04/2026
