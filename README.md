````markdown
# Trang phục qua các thập niên (Demo)

Đây là một site demo tĩnh hiển thị trang phục theo từng thập niên. Mục tiêu: làm nhanh, responsive, dễ mở rộng và dễ deploy.

Mô tả:
- index.html: giao diện chính, thanh chọn thập niên, ô tìm kiếm, lưới ảnh.
- styles.css: kiểu dáng, responsive.
- script.js: tải dữ liệu từ `data/decades.json`, lọc và hiển thị, modal chi tiết.
- data/decades.json: nơi chứa dữ liệu mẫu (thêm ảnh, mô tả, tag...).
- Bạn có thể thêm ảnh vào thư mục `images/` và cập nhật đường dẫn trong file JSON.

Hướng dẫn chạy:
1. Clone repo:
   git clone https://github.com/<you>/<repo>.git
2. Đặt các file vào thư mục (hoặc copy vào repo `lapgia57-netizen/codetp`).
3. Mở `index.html` trong trình duyệt (hoặc chạy server tĩnh như `npx http-server`).
4. Deploy: GitHub Pages (branch main / gh-pages) hoặc Netlify.

Gợi ý mở rộng:
- Phân trang hoặc lazy-load khi có nhiều ảnh.
- Thêm khu vực timeline tương tác (sử dụng thư viện như vis.js hoặc d3).
- Thêm form để người dùng đóng góp ảnh (kèm upload server-side).
- Thêm filtters theo loại trang phục (váy, áo khoác, phụ kiện).
- Kết hợp CMS (Netlify CMS, Sanity, Contentful) để dễ quản lý nội dung.

Nếu bạn muốn, tôi có thể:
- Tạo pull request trực tiếp vào `lapgia57-netizen/codetp` với cấu trúc này.
- Viết script tự động import ảnh từ một thư mục.
- Thiết kế giao diện chi tiết hơn hoặc thêm transitions.
````