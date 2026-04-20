# Hướng Dẫn Tạo Excel Export

> **Mục tiêu**: Tạo 2 file để cho phép download dữ liệu thành file Excel
> - `excel-export.ts` - Chứa các hàm export
> - `index.tsx` - Thêm nút và logic để gọi hàm export

---

## 📋 Bước 1: Hiểu Cấu Trúc Dữ Liệu

### Data Doanh Thu (Revenue)
```javascript
// data?.chart là một mảng (array) của:
{
  date: "2026-01-01",      // Ngày
  total: 1500000           // Tổng doanh thu
}[]
```

### Data Thống Kê Đơn Hàng (OrderStats)
```javascript
// orderStatsData là object:
{
  stats: {
    PENDING: 10,
    CONFIRMED: 20,
    SHIPPING: 15,
    COMPLETED: 150,
    CANCELLED: 5
  },
  percentages: {
    PENDING: 4,
    CONFIRMED: 8,
    SHIPPING: 6,
    COMPLETED: 60,
    CANCELLED: 2
  },
  total: 250,
  summary: {
    completed: 150,
    cancelled: 5,
    pending: 10
  }
}
```

---

## 🔧 Bước 2: Tạo File `excel-export.ts`

**Địa chỉ file**: `src/pages/revenues/utils/excel-export.ts`

### Phần 1: Import Libraries
```typescript
import * as XLSX from 'xlsx'      // ✅ Cài sẵn rồi
import { saveAs } from 'file-saver' // ✅ Cài sẵn rồi
```

**Giải thích:**
- `XLSX` - Thư viện tạo file Excel (xlsx format)
- `saveAs` - Hàm download file từ trình duyệt

---

### Phần 2: Tạo Hàm Helper `exportToExcel()`

```typescript
const exportToExcel = (data: any[], fileName: string) => {
  // Kiểm tra data có rỗng không
  if (!data || data.length === 0) {
    alert('Không có dữ liệu để export')
    return
  }

  // BƯỚC 1: Chuyển array thành Excel sheet
  const worksheet = XLSX.utils.json_to_sheet(data)
  
  // BƯỚC 2: Tạo workbook (file Excel) mới
  const workbook = XLSX.utils.book_new()
  
  // BƯỚC 3: Thêm sheet vào workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
  
  // BƯỚC 4: Chuyển workbook thành dạng binary (0101...)
  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  })
  
  // BƯỚC 5: Tạo blob (file) từ binary data
  const blob = new Blob([excelBuffer], {
    type: 'application/octet-stream',
  })
  
  // BƯỚC 6: Download file
  saveAs(blob, fileName)
}
```

**Giải thích:** 
- Hàm này làm "bộ máy chính" - nhận dữ liệu, tạo Excel, download
- Tất cả các hàm export khác sẽ gọi hàm này

---

### Phần 3: Tạo Hàm `exportRevenueToExcel()`

```typescript
export const exportRevenueToExcel = (trendData: any[]) => {
  // BƯỚC 1: Format data để đúng cấu trúc Excel
  // Chuyển từ { date: "...", total: ... }
  // Thành { "Ngày": "...", "Doanh thu": ... }
  const formattedData = trendData.map(item => ({
    'Ngày': item.date,                    // Cột 1: Ngày
    'Doanh thu': item.total || item.revenue  // Cột 2: Doanh thu
  }))
  
  // BƯỚC 2: Tạo tên file với ngày hiện tại
  const fileName = `Báo cáo doanh thu-${new Date().toISOString().split('T')[0]}.xlsx`
  // Ví dụ: "Báo cáo doanh thu-2026-04-19.xlsx"
  
  // BƯỚC 3: Gọi hàm helper để export
  exportToExcel(formattedData, fileName)
}
```

**Giải thích:**
- `map()` - Chuyển dữ liệu sang tên cột tiếng Việt
- `item.total || item.revenue` - Nếu `total` không có thì dùng `revenue`
- `toISOString().split('T')[0]` - Lấy ngày hôm nay (YYYY-MM-DD)

---

### Phần 4: Tạo Hàm `exportOrderStatsToExcel()`

```typescript
export const exportOrderStatsToExcel = (data: any) => {
  let formattedData: any[] = []
  
  // BƯỚC 1: Kiểm tra data là array hay object
  if (Array.isArray(data)) {
    // Nếu là ARRAY (danh sách đơn hàng theo ngày)
    formattedData = data.map(item => ({
      'Ngày': item.date,
      'Tổng đơn hàng': item.orders || item.total,
      'Hoàn thành': item.completed,
      'Đã hủy': item.cancelled,
    }))
  } else if (data && typeof data === 'object') {
    // Nếu là OBJECT (tổng kết)
    formattedData = [
      {
        'Trạng thái': 'Đã xác nhận',
        'Số lượng': data.stats?.CONFIRMED || 0,
        'Phần trăm': `${data.percentages?.CONFIRMED || 0}%`,
      },
      {
        'Trạng thái': 'Đang giao hàng',
        'Số lượng': data.stats?.SHIPPING || 0,
        'Phần trăm': `${data.percentages?.SHIPPING || 0}%`,
      },
      {
        'Trạng thái': 'Hoàn thành',
        'Số lượng': data.stats?.COMPLETED || 0,
        'Phần trăm': `${data.percentages?.COMPLETED || 0}%`,
      },
      {
        'Trạng thái': 'Đã hủy',
        'Số lượng': data.stats?.CANCELLED || 0,
        'Phần trăm': `${data.percentages?.CANCELLED || 0}%`,
      },
      {
        'Trạng thái': 'Đang chờ xử lý',
        'Số lượng': data.stats?.PENDING || 0,
        'Phần trăm': `${data.percentages?.PENDING || 0}%`,
      },
    ]
  }
  
  // BƯỚC 2: Kiểm tra có dữ liệu không
  if (formattedData.length === 0) {
    alert('Không có dữ liệu để export')
    return
  }
  
  // BƯỚC 3: Tạo tên file và export
  const fileName = `Báo cáo đơn hàng-${new Date().toISOString().split('T')[0]}.xlsx`
  exportToExcel(formattedData, fileName)
}
```

**Giải thích:**
- `Array.isArray(data)` - Kiểm tra có phải array không
- `data.stats?.CONFIRMED` - Lấy giá trị, nếu không có thì null (optional chaining)
- `||` - Toán tử "hoặc", nếu bên trái falsy thì lấy bên phải

---

## 🎨 Bước 3: Sửa File `index.tsx`

**Địa chỉ file**: `src/pages/revenues/index.tsx`

### Phần 1: Thêm Import

Ở dòng đầu của file, thêm:

```typescript
import { exportRevenueToExcel, exportOrderStatsToExcel } from './utils/excel-export'
```

**Giải thích:**
- Import 2 hàm từ file vừa tạo
- Dùng `./` vì file excel-export.ts ở cùng thư mục

---

### Phần 2: Tạo Nút Export Button

Tìm vị trí **Header** (đoạn có `<h1>Analytics</h1>`), thêm button:

```typescript
<div className="mb-8 flex justify-between items-center">
  <div>
    <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
    <p className="text-gray-600 mt-2">Track your sales and order performance</p>
  </div>
  
  {/* ✅ THÊM BUTTON NÀY */}
  <button
    onClick={() => {
      // Kiểm tra tab nào đang active
      if (activeTab === 'revenue') {
        // Nếu tab doanh thu, export doanh thu
        exportRevenueToExcel(data?.chart || [])
      } else {
        // Nếu tab đơn hàng, export thống kê đơn hàng
        exportOrderStatsToExcel(orderStatsData)
      }
    }}
    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
  >
    📥 Export Excel
  </button>
</div>
```

**Giải thích:**
- `onClick()` - Hàm chạy khi click nút
- `activeTab === 'revenue'` - Kiểm tra tab nào active
- `data?.chart || []` - Lấy data chart, nếu không có thì dùng array rỗng
- `className` - CSS Tailwind để tạo style button xanh

---

## ✅ Checklist

Khi hoàn thành, kiểm tra:

- [ ] File `excel-export.ts` có 4 hàm:
  - `exportToExcel()` - Hàm helper
  - `exportRevenueToExcel()` - Export doanh thu
  - `exportOrderStatsToExcel()` - Export đơn hàng

- [ ] File `index.tsx`:
  - [ ] Import đúng từ `./utils/excel-export`
  - [ ] Có nút button với text "📥 Export Excel"
  - [ ] Button có `onClick()` gọi 2 hàm export

- [ ] Packages đã cài:
  ```bash
  npm install xlsx file-saver @types/file-saver
  ```

---

## 🧪 Cách Test

1. Mở trang Analytics
2. Click tab "STT Revenue"
3. Click nút "📥 Export Excel"
4. Check folder Downloads có file `Báo cáo doanh thu-YYYY-MM-DD.xlsx` không

5. Click tab "STT Order Ratios"
6. Click nút "📥 Export Excel"
7. Check folder Downloads có file `Báo cáo đơn hàng-YYYY-MM-DD.xlsx` không

---

## 💡 Lỗi Thường Gặp

### ❌ "Cannot find module 'xlsx'"
**Cách sửa:** Chạy `npm install xlsx file-saver @types/file-saver`

### ❌ Button không làm gì
**Cách sửa:** Kiểm tra:
- Import có đúng không?
- Hàm onClick có gọi `exportRevenueToExcel()` không?
- `data?.chart` có dữ liệu không?

### ❌ File Excel trống
**Cách sửa:**
- Chắc chắn `formattedData` có dữ liệu
- Đoạn `map()` format dữ liệu đúng chưa?

---

## 📚 Tìm Hiểu Thêm

- **XLSX library docs**: https://github.com/SheetJS/sheetjs
- **file-saver docs**: https://github.com/eligrey/FileSaver.js
- **Optional Chaining (`?.`)**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
