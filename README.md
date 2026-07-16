#  MAY Coffee - Nền Tảng Đặt Hàng & Quản Lý Trà Sữa Thông Minh

**MAY Coffee** là một hệ thống E-commerce hoàn chỉnh phục vụ cho việc bán hàng và quản trị chuỗi cửa hàng trà sữa/cà phê. Dự án được triển khai dưới dạng monorepo, áp dụng các công nghệ hiện đại bậc nhất bao gồm **React 19**, **NestJS 11**, **TypeScript**, **TailwindCSS**, và hệ quản trị cơ sở dữ liệu **PostgreSQL** kết hợp **Prisma ORM**.

Hệ thống tích hợp đầy đủ các nghiệp vụ thực tế của một nền tảng dịch vụ F&B cao cấp: thanh toán trực tuyến qua cổng **VNPay**, xác thực người dùng qua **Firebase OTP**, cập nhật trạng thái đơn hàng thời gian thực qua **WebSockets**, tích điểm thành viên (Loyalty), gợi ý sản phẩm cá nhân hóa và Trợ lý ảo AI tư vấn thực đơn (OpenAI GPT-3.5).

---

##  Mục Lục
1. [Công Nghệ Sử Dụng](#-công-nghệ-sử-dụng)
2. [Cấu Trúc Hệ Thống & Phân Hệ](#-cấu-trúc-hệ-thống--phân-hệ)
3. [Sơ Đồ Quy Trình Nghiệp Vụ](#-sơ-đồ-quy-trình-nghiệp-vụ)
4. [Mô Tả Nghiệp Vụ Chi Tiết](#-mô-tả-nghiệp-vụ-chi-tiết)
5. [Cấu Trúc Thư Mục Monorepo](#-cấu-trúc-thư-mục-monorepo)
6. [Hướng Dẫn Cài Đặt & Chạy Project Dưới Local](#-hướng-dẫn-cài-đặt--chạy-project-dưới-local)
7. [Cấu Hình Biến Môi Trường (.env)](#-cấu-hinh-biến-môi-trường-env)
8. [Hướng Dẫn Deploy Hệ Thống](#-hướng-dẫn-deploy-hệ-thống)

---

### Công Nghệ Sử Dụng

### ** Customer App (`MAY/`)**
*   **Core Framework**: React 19 + TypeScript + Vite.
*   **Styling**: TailwindCSS v4.
*   **Routing**: React Router v7.
*   **State Management**: React Context API.
*   **Server State & Caching**: TanStack React Query v5 (Axios làm API Client).
*   **Real-time Communication**: Socket.io Client (theo dõi tiến độ làm nước).
*   **Authentication**: Firebase SDK Client (Xác thực OTP qua số điện thoại).

### ** Admin Dashboard (`MAY-admin/`)**
*   **Core Framework**: React 19 + TypeScript + Vite.
*   **Styling & UI**: TailwindCSS v3 + Shadcn/ui + Lucide Icons.
*   **State Management**: Zustand (Cơ chế store tối giản, hiệu năng cao).
*   **Form Handling & Validation**: React Hook Form + Zod.
*   **Data Exporting**: `XLSX` (Xuất file Excel báo cáo doanh thu) + `html2pdf.js` (Xuất hóa đơn PDF trực tiếp).

### **🔌 Backend API (`may-api/`)**
*   **Core Framework**: NestJS 11 + TypeScript (Kiến trúc Module hóa sạch sẽ).
*   **Database ORM**: Prisma ORM v5 (Hỗ trợ Postgres).
*   **Database Engine**: PostgreSQL (Được host trên Cloud Supabase).
*   **Security & Hashing**: Passport.js + JWT + Bcrypt.
*   **Authentication Validation**: Firebase Admin SDK (Xác thực token OTP được gửi từ client).
*   **Real-time Server**: Socket.io WebSocket Gateway.
*   **AI Integration**: OpenAI SDK (GPT-3.5-Turbo làm chatbot và phân tích hành vi gợi ý).
*   **Payment Gateway**: VNPay SDK (Bảo mật checksum SHA512, tích hợp IPN webhook).
*   **Validation**: Class Validator + Class Transformer.

---

##  Cấu Trúc Hệ Thống & Phân Hệ

Hệ thống được thiết kế dạng monorepo để tối ưu hóa quản lý mã nguồn, bao gồm 3 phân hệ chạy song song và giao tiếp thông qua giao thức REST API & WebSockets:

```mermaid
flowchart TD
    Client[ Customer Client (React 19)"]
    Admin[" Admin Dashboard (React 19 + Shadcn)"]
    API[" NestJS Backend (Port 3001)"]
    DB[(" PostgreSQL (Supabase)")]
    Firebase[" Firebase Auth Service"]
    VNPay[" VNPay Portal (Sandbox)"]
    OpenAI[" OpenAI API (GPT-3.5)"]

    Client -- "Đăng nhập OTP" --> Firebase
    Client -- "REST API / WebSockets" --> API
    Admin -- "REST API / WebSockets" --> API
    API -- "Prisma Client" --> DB
    API -- "Xác thực token OTP" --> Firebase
    API -- "Khởi tạo thanh toán & IPN Callback" --> VNPay
    API -- "Tư vấn món & Phân tích" --> OpenAI
```

---

##  Sơ Đồ Quy Trình Nghiệp Vụ

Dưới đây là luồng xử lý đơn hàng từ lúc đặt món, thanh toán cho đến khi hoàn tất đơn hàng và tích điểm:

```mermaid
sequenceDiagram
    autonumber
    actor Customer as Khách hàng
    participant Client as Customer App (MAY)
    participant API as Backend (may-api)
    participant VNPay as Cổng thanh toán VNPay
    participant Admin as Admin Dashboard
    
    Customer->>Client: Chọn sản phẩm + Size + Toppings
    Customer->>Client: Nhập mã giảm giá/Áp dụng Điểm tích lũy (usedPoint)
    Customer->>Client: Chọn Phương thức thanh toán (VNPay / COD)
    Client->>API: Gửi API Create Order (POST /orders)
    API-->>API: Kiểm tra số dư điểm, tính toán chiết khấu hạng thẻ
    API-->>API: Tạo bản ghi Order (status: PENDING) & Payment (status: PENDING)
    
    alt Thanh toán VNPay
        API->>API: Tạo cổng bảo mật thanh toán & URL VNPay
        API-->>Client: Trả về Payment URL (Redirect)
        Client->>VNPay: Chuyển hướng Khách hàng sang cổng VNPay
        Customer->>VNPay: Nhập thông tin thẻ/tài khoản và xác nhận OTP thanh toán
        VNPay->>API: Gửi IPN Webhook (POST /payments/vnpay/ipn) xác nhận giao dịch thành công
        API-->>API: Cập nhật trạng thái Payment (status: SUCCESS)
        API->>Admin: Gửi thông báo WebSocket (New Order)
    else Thanh toán COD
        API->>Admin: Gửi thông báo WebSocket (New Order)
    end
    
    Admin->>Admin: Quản trị viên kiểm duyệt & Chuẩn bị đơn (CONFIRMED -> SHIPPING)
    Admin->>API: Cập nhật trạng thái đơn (PATCH /orders/:id/status)
    API->>Client: Gửi thông báo WebSocket cập nhật trạng thái đơn hàng thời gian thực
    
    Admin->>API: Xác nhận Giao hàng hoàn tất (COMPLETED)
    API-->>API: Cộng dồn doanh số & Cập nhật hạng thành viên của khách hàng
    API-->>API: Tích lũy 10% giá trị đơn hàng thành Điểm thưởng (loyaltyPoint)
    API->>Client: Đồng bộ trạng thái hoàn thành đơn và cập nhật điểm thưởng mới
```

---

##  Mô Tả Nghiệp Vụ Chi Tiết

### 1. Nghiệp Vụ Xác Thực & Phân Quyền (Authentication & RBAC)
*   **Đăng nhập bằng Email/Password**: Dành cho quản trị viên (`ADMIN`) và nhân viên (`STAFF`). Mật khẩu được mã hóa an toàn qua thuật toán Bcrypt.
*   **Đăng nhập không mật khẩu bằng Firebase OTP**: Dành cho khách hàng (`CUSTOMER`). Khách hàng nhập số điện thoại tại Customer App -> Firebase SDK gửi mã OTP SMS -> Khách hàng xác nhận thành công -> Trả về `idToken`. Gửi `idToken` này lên backend NestJS để xác thực chéo.
    *   **Tự động Đăng ký**: Nếu số điện thoại đăng nhập chưa tồn tại trong hệ thống, hệ thống sẽ tự động tạo một tài khoản mới với vai trò là `CUSTOMER` và gán trạng thái `phoneVerified = true`.
*   **Phân quyền dựa trên Role (RBAC)**:
    *   `CUSTOMER`: Có quyền xem thực đơn, sử dụng Chatbot AI, đặt món, theo dõi trạng thái đơn hàng cá nhân và xem điểm tích lũy.
    *   `STAFF`: Có quyền cập nhật trạng thái đơn hàng từ lúc tiếp nhận đến khi giao hàng, quản lý danh sách toppings/sản phẩm.
    *   `ADMIN`: Có toàn quyền quản trị hệ thống, bao gồm CRUD sản phẩm, danh mục, toppings, quản lý tài khoản nhân viên, xem biểu đồ doanh thu và xuất báo cáo tài chính.
*   **Cơ chế Token kép (Access Token & Refresh Token)**: `access_token` có thời hạn ngắn (15 phút) để bảo mật các cuộc gọi API thông thường. Khi hết hạn, client sử dụng `refresh_token` (thời hạn 7 ngày) gửi lên `/auth/refresh` để nhận `access_token` mới mà không cần bắt người dùng đăng nhập lại.

### 2. Nghiệp Vụ Đặt Hàng & Tùy Biến Sản Phẩm (Ordering Flow)
*   **Tùy biến chi tiết món uống**: Mỗi cốc nước có thể tùy chọn:
    *   Kích thước (Size S, M, L) điều chỉnh giá tiền tương ứng.
    *   Lượng đá, lượng đường (0%, 30%, 50%, 70%, 100%).
    *   Danh sách toppings kèm theo (mỗi topping cộng thêm một khoản phí cụ thể).
*   **Tính toán giỏ hàng & Tổng tiền**:
    ```text
    Tổng tiền đơn hàng = Tổng tiền sản phẩm (đã gồm topping & size) - Điểm tích lũy sử dụng - Giảm giá theo hạng thành viên.
    ```
*   **Giao dịch Cơ sở dữ liệu (Database Transaction)**: Quá trình tạo đơn hàng được bọc trong một Prisma Transaction để đảm bảo tính nhất quán (ACID). Nếu bất kỳ khâu nào thất bại (ví dụ: sản phẩm không tồn tại, số lượng không hợp lệ, không đủ điểm tích lũy), toàn bộ quá trình sẽ được rollback để tránh mất mát dữ liệu.

### 3. Nghiệp Vụ Tích Điểm & Hạng Thành Viên (Loyalty System)
*   **Tính điểm tích lũy**: Khi một đơn hàng hoàn thành (`COMPLETED`), khách hàng sẽ nhận được điểm thưởng tương đương **10% giá trị thực trả** của đơn hàng đó.
    ```text
    Điểm nhận được = Math.floor(Giá trị hóa đơn thanh toán * 0.1)
    ```
*   **Sử dụng điểm đổi tiền**: Khách hàng có thể quy đổi điểm tích lũy trực tiếp để thanh toán cho đơn hàng tiếp theo (mỗi điểm quy đổi tương đương **1 VND**). Điểm sử dụng sẽ bị trừ ngay khi tạo đơn và được hoàn lại tài khoản nếu đơn hàng bị hủy (`CANCELLED`).
*   **Hạng thành viên (Membership Tiers)**: Hạng được tính toán tự động dựa trên tổng số tiền khách hàng đã tích lũy chi tiêu thành công (`totalSpent`):
    *   **NORMAL (Hạng Thường)**: `totalSpent` dưới 100.000đ. Không có ưu đãi chiết khấu.
    *   **SILVER (Hạng Bạc)**: `totalSpent` từ 100.000đ đến dưới 2.000.000đ. Không chiết khấu đơn hàng.
    *   **GOLD (Hạng Vàng)**: `totalSpent` từ 2.000.000đ đến dưới 3.500.000đ. **Giảm giá ngay 5%** trên tổng giá trị hóa đơn.
    *   **PLATINUM (Hạng Kim Cương)**: `totalSpent` từ 3.500.000đ trở lên. **Giảm giá ngay 10%** trên tổng giá trị hóa đơn.

### 4. Nghiệp Vụ Thanh Toán & Tích Hợp VNPay
*   **Luồng thanh toán COD (Thanh toán khi nhận hàng)**: Tạo đơn với trạng thái thanh toán là `PENDING`. Khách hàng nhận nước và trả tiền mặt cho shipper. Khi shipper chuyển tiền về hệ thống, nhân viên sẽ chuyển trạng thái đơn hàng thành `COMPLETED` để hoàn tất thanh toán.
*   **Luồng thanh toán VNPay trực tuyến (Sandbox)**:
    *   **Khởi tạo**: Hệ thống tạo URL thanh toán bảo mật sử dụng thuật toán băm chữ ký SHA512 với các tham số: mã đơn hàng, số tiền, thông tin thanh toán, địa chỉ IP của client, và địa chỉ Redirect (`vnp_ReturnUrl`).
    *   **Bảo mật IPN (Instant Payment Notification)**: Khi khách hàng hoàn thành thanh toán trên cổng VNPay, VNPay gửi yêu cầu ngầm trực tiếp tới API webhook của backend (`/payments/vnpay/ipn`). Webhook sẽ xác thực chữ ký chữ ký số bảo mật, đối chiếu số tiền thanh toán với cơ sở dữ liệu để tránh gian lận giao dịch trước khi cập nhật trạng thái thanh toán thành `SUCCESS`.
    *   **Xử lý khi thất bại**: Nếu khách hàng hủy thanh toán hoặc giao dịch thất bại, trạng thái thanh toán cập nhật thành `FAILED`, đồng thời đơn hàng tự động chuyển sang trạng thái `CANCELLED` để hoàn trả điểm tích lũy nếu có.

### 5. Nghiệp Vụ Gợi Ý Cá Nhân Hóa & Trợ Lý Ảo AI
*   **Đo lường gợi ý sản phẩm**: Dựa trên 20 đơn hàng đã hoàn thành gần nhất của một người dùng, backend sẽ tự động tính toán điểm số yêu thích của sản phẩm đó đối với người dùng (`favoriteScore`):
    ```text
    favoriteScore = (Số lần mua sản phẩm * 5) + (Tổng số lượng sản phẩm đã mua * 2) + Điểm thời gian mua gần nhất.
    ```
    *   *Điểm thời gian mua gần nhất*: Mua trong vòng 7 ngày qua nhận 10 điểm, trong vòng 30 ngày nhận 5 điểm, trong vòng 90 ngày nhận 2 điểm.
    *   Hệ thống tự động lọc ra các danh sách cá nhân hóa: **Yêu thích nhất** (sắp xếp theo điểm yêu thích), **Đã đặt gần đây** (theo mốc thời gian đặt hàng mới nhất), **Đặt thường xuyên** (sản phẩm đặt tối thiểu 2 lần trở lên).
    *   Tự động gợi ý tối đa 3 loại Toppings đi kèm được người dùng ưa chuộng nhất đối với mỗi sản phẩm cụ thể.
*   **Trợ lý ảo AI tư vấn thông minh**:
    *   Tích hợp mô hình `gpt-3.5-turbo` của OpenAI để trò chuyện với khách hàng.
    *   **Lọc dữ liệu thông minh**: Khi khách hàng hỏi các câu hỏi chứa từ khóa liên quan đến sức khỏe ("healthy", "ít calo"), AI sẽ lọc danh sách sản phẩm có lượng calo dưới 200. Nếu câu hỏi chứa từ khóa "không caffeine", hệ thống sẽ lọc bỏ hoàn toàn các loại đồ uống có chứa caffeine.
    *   Danh sách sản phẩm được lọc sẵn từ database sẽ được truyền làm ngữ cảnh (context) đầu vào cho GPT để đưa ra phản hồi chính xác, đảm bảo AI không đề xuất các món không có trong thực đơn của quán.
    *   Hạn chế phạm vi trả lời: AI chỉ được phép tư vấn các món nước, toppings, calo, caffeine, so sánh giá cả trong cửa hàng. Nếu khách hàng hỏi ngoài phạm vi, AI sẽ lịch sự từ chối trả lời.

### 6. Nghiệp Vụ Thống Kê & Báo Cáo Doanh Thu (Admin Dashboard)
*   **Quick Stats**: Cung cấp số liệu thống kê nhanh ở đầu trang bao gồm: Tổng số đơn hàng, tổng doanh thu thực tế (chỉ tính các đơn đã hoàn thành), tổng số lượng khách hàng đã đăng ký, và tổng số sản phẩm đang kinh doanh.
*   **Biểu đồ Doanh thu & Đơn hàng**: Tổng hợp dữ liệu theo ngày trong khoảng thời gian tùy chọn (mặc định 30 ngày gần nhất) để vẽ biểu đồ tăng trưởng doanh số.
*   **Báo cáo sản phẩm bán chạy nhất**: Nhóm và tính toán tổng lượng bán của từng sản phẩm cùng doanh thu trực tiếp đem lại từ sản phẩm đó.
*   **Khách hàng VIP**: Tổng hợp danh sách khách hàng có tổng mức chi tiêu (`totalSpent`) cao nhất để phục vụ cho các chương trình chăm sóc khách hàng đặc biệt.

---

##  Cấu Trúc Thư Mục Monorepo

```
DACN-May/
├── MAY/                         # 🛍️ Customer App (React 19 + Tailwind v4)
│   ├── src/
│   │   ├── components/          # Giao diện dùng chung (Button, Input, Card...)
│   │   ├── pages/               # Trang Menu, Giỏ hàng, Đơn hàng, Profile, Chatbot...
│   │   ├── contexts/            # Quản lý Global State (AuthContext, CartContext)
│   │   ├── hooks/               # Các custom hooks phục vụ logic UI
│   │   ├── services/            # Call API endpoints thông qua Axios instance
│   │   └── lib/                 # Khởi tạo Firebase SDK & Socket client
│   ├── vite.config.ts
│   └── package.json
│
├── MAY-admin/                   # 📊 Admin Dashboard (React 19 + Shadcn/ui)
│   ├── src/
│   │   ├── components/          # Bảng dữ liệu (Data-tables), biểu đồ (Charts)
│   │   ├── pages/               # Dashboard, Orders, Products, Toppings, Staffs...
│   │   ├── layouts/             # Sidebar, Header điều hướng cho quản trị viên
│   │   └── lib/                 # Quản lý state thông qua Zustand (authStore, socketStore)
│   ├── vite.config.ts
│   └── package.json
│
├── may-api/                     # 🔌 Backend API (NestJS 11 + Prisma)
│   ├── src/
│   │   ├── main.ts              # Cấu hình CORS, Swagger, tiền tố prefix API, PORT
│   │   ├── auth/                # Xác thực JWT, Firebase IdToken verification
│   │   ├── users/               # CRUD thông tin khách hàng/nhân viên
│   │   ├── products/            # Quản lý danh sách nước uống, calories, dinh dưỡng
│   │   ├── categories/          # Danh mục sản phẩm đa cấp (Parent/Children)
│   │   ├── toppings/            # Quản lý toppings đi kèm
│   │   ├── orders/              # Nghiệp vụ giỏ hàng, đặt hàng, cập nhật trạng thái đơn
│   │   ├── payments/            # Khởi tạo URL VNPay & Xác thực webhook IPN
│   │   ├── loyalty/             # Logic tích điểm và chiết khấu hạng thành viên
│   │   ├── personalized/        # Thuật toán tính điểm favoriteScore gợi ý món
│   │   ├── dashboard/           # Thống kê số liệu doanh thu & sản phẩm bán chạy
│   │   └── prisma/              # Prisma Service kết nối PostgreSQL
│   ├── prisma/
│   │   ├── schema.prisma        # Sơ đồ quan hệ thực thể cơ sở dữ liệu (PostgreSQL)
│   │   ├── seed.ts              # Script nạp dữ liệu mẫu tự động
│   │   └── migrations/          # Lịch sử đồng bộ cấu trúc cơ sở dữ liệu
│   └── package.json
│
├── vercel.json                  # Cấu hình deploy nhiều dự án cùng lúc trên Vercel
├── index.js                     # Express server chạy bổ trợ cổng phụ
└── README.md                    # File hướng dẫn hiện tại
```

---

##  Hướng Dẫn Cài Đặt & Chạy Project Dưới Local

### 1. Cài Đặt Ban Đầu (Installation)

Trước tiên, hãy tải dự án về máy tính cá nhân và thực hiện cài đặt các thư viện phụ thuộc (dependencies) cho cả 3 dự án nhỏ.

#### Cài đặt Backend API (`may-api`)
```bash
cd may-api
npm install
```

#### Cài đặt Customer App (`MAY`)
```bash
cd ../MAY
npm install
```

#### Cài đặt Admin Dashboard (`MAY-admin`)
```bash
cd ../MAY-admin
npm install
```

---

### 2. Thiết Lập Database & Khởi Tạo Dữ Liệu Mẫu

Dự án sử dụng **Prisma ORM** để tương tác với cơ sở dữ liệu PostgreSQL. Bạn cần đảm bảo đã điền chính xác biến `DATABASE_URL` trong file `.env` trước khi thực hiện các bước dưới đây.

1.  **Đồng bộ cấu trúc bảng (Migrations)**:
    Di chuyển vào thư mục backend và chạy lệnh đồng bộ cấu trúc schema của Prisma lên cơ sở dữ liệu PostgreSQL:
    ```bash
    cd may-api
    npx prisma migrate dev
    ```
2.  **Nạp dữ liệu mẫu (Seeding)**:
    Để có sẵn danh sách sản phẩm, danh mục, toppings và tài khoản Admin/Staff mẫu, hãy chạy lệnh seed:
    ```bash
    npx prisma db seed
    ```

---

### 3. Hướng Dẫn Chạy Dự Án Dưới Local

Hệ thống cần chạy song song cả 3 phân hệ. Hãy mở 3 cửa sổ terminal riêng biệt để khởi chạy:

####  Terminal 1: Khởi chạy Backend API
```bash
cd may-api
npm run start:dev
# Server chạy tại: http://localhost:3001
```

#### 🛒 Terminal 2: Khởi chạy Customer App
```bash
cd MAY
npm run dev
# Ứng dụng khách hàng chạy tại: http://localhost:5173
```

####  Terminal 3: Khởi chạy Admin Dashboard
```bash
cd MAY-admin
npm run dev
# Dashboard quản lý chạy tại: http://localhost:5174
```

---

##  Cấu Hình Biến Môi Trường (.env)

Hãy tạo file `.env` ở trong từng thư mục con tương ứng dựa trên cấu hình chi tiết dưới đây:

###  File cấu hình: `may-api/.env`
```env
PORT=3001
API_URL=http://localhost:3001

# Chuỗi kết nối PostgreSQL (Ví dụ lấy từ Supabase)
DATABASE_URL="postgresql://postgres.[project_ref]:[password]@aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres?sslmode=require&pgbouncer=true&connection_limit=5"

# Cấu hình mã hóa JWT
JWT_SECRET="fa11d9aea8242d5fcce9760181fdc3bfede3cfc00f3beec470f01ac0c862aadc"
JWT_REFRESH_SECRET="refresh_secret_key_456"

# Supabase Credentials
SUPABASE_URL=https://[project_ref].supabase.co
SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
SUPABASE_SECRET_KEY=your-supabase-secret-key

# Cấu hình upload ảnh lên Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_API_KEY=your_cloudinary_api_key
VITE_CLOUDINARY_API_SECRET_KEY=your_cloudinary_api_secret
VITE_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset

# Cấu hình Cổng thanh toán VNPay Sandbox
VNP_TMNCODE=your_vnpay_tmncode
VNP_HASH_SECRET=your_vnpay_hash_secret
VNP_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
VNP_RETURN_URL=http://localhost:3001/payments/vnpay/return
FRONTEND_PAYMENT_SUCCESS_URL=http://localhost:5173/checkout/success
FRONTEND_PAYMENT_FAILED_URL=http://localhost:5173/checkout/failed

# Cấu hình Firebase Admin SDK (để verify OTP token)
FIREBASE_PROJECT_ID=project-may-82c39
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@project-may-82c39.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Cấu hình OpenAI API Key (Chatbot AI)
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

###  File cấu hình: `MAY/.env`
```env
# URL trỏ tới API Backend
VITE_API_URL=http://localhost:3001

# Firebase Web Client SDK Configuration
VITE_FIREBASE_API_KEY=AIzaSyDbPm5VW8nvVA6pnBJNAzJeNqMecjmqDNw
VITE_FIREBASE_AUTH_DOMAIN=may-auth.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=may-auth
VITE_FIREBASE_STORAGE_BUCKET=may-auth.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=284684495531
VITE_FIREBASE_APP_ID=1:284684495531:web:3c0d69485e707fb6eae5ee
VITE_FIREBASE_MEASUREMENT_ID=G-6B6PF0RET6

# Cloudinary CDN Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_API_KEY=your_cloudinary_api_key
VITE_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
```

###  File cấu hình: `MAY-admin/.env`
```env
# URL trỏ tới API Backend
VITE_API_URL=http://localhost:3001

# Firebase Web Client Config (dành cho Admin/Staff xác thực nếu cần)
VITE_FIREBASE_API_KEY=AIzaSyDbPm5VW8nvVA6pnBJNAzJeNqMecjmqDNw
VITE_FIREBASE_AUTH_DOMAIN=may-auth.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=may-auth
VITE_FIREBASE_STORAGE_BUCKET=may-auth.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=284684495531
VITE_FIREBASE_APP_ID=1:284684495531:web:3c0d69485e707fb6eae5ee
VITE_FIREBASE_MEASUREMENT_ID=G-6B6PF0RET6

# Cloudinary Upload Widget
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_API_KEY=your_cloudinary_api_key
VITE_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
```

---

##  Hướng Dẫn Deploy Hệ Thống

### 1. Deploy Frontend (Customer App & Admin Dashboard) lên Vercel
Vercel hỗ trợ cấu trúc monorepo cực tốt. Ở thư mục gốc của dự án đã cấu hình sẵn file `vercel.json` định nghĩa các dự án con. 
*   Đẩy mã nguồn lên GitHub cá nhân của bạn.
*   Truy cập Vercel, chọn **Import Project** từ repo GitHub.
*   Vercel sẽ tự động phát hiện monorepo. Bạn cấu hình từng project con:
    *   Dành cho **Customer App**: Đặt **Root Directory** là `MAY`.
    *   Dành cho **Admin Dashboard**: Đặt **Root Directory** là `MAY-admin`.
*   Cấu hình các biến môi trường (`VITE_API_URL` trỏ tới API Production) tại mục Settings của từng dự án tương ứng trên Vercel.

### 2. Deploy Backend API (`may-api`)
*   **Lưu ý quan trọng**: Do hệ thống sử dụng kết nối **WebSocket** (Socket.io) chạy nền liên tục để đồng bộ trạng thái đơn hàng thời gian thực, việc triển khai server backend NestJS dưới dạng Serverless (như Vercel Serverless Functions) sẽ gặp giới hạn (mất kết nối socket).
*   **Khuyên dùng**: Triển khai API trên các nền tảng hỗ trợ dịch vụ container hoạt động liên tục (Always-on) như **Railway**, **Render**, hoặc **AWS EC2/Elastic Beanstalk**.
*   Thiết lập lệnh build là `npm run build` và lệnh start là `npm run start:prod`.

---

*Chúc các bạn có những trải nghiệm tuyệt vời cùng với dự án MAY Coffee! Nếu gặp bất kỳ khó khăn nào trong quá trình cài đặt, vui lòng tạo Issue trên repo để nhận hỗ trợ kịp thời.* 🍵
