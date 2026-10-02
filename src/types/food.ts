// Định nghĩa danh mục phân loại món ăn
export type DanhMucMonAn =
  | 'Tất cả'
  | 'Khai vị'
  | 'Món chính'
  | 'Món nước'
  | 'Món nướng & xào'
  | 'Tráng miệng'
  | 'Đồ uống';

// Lọc theo các mức giá tiền
export type MucGiaLoc =
  | 'tat-ca'
  | 'duoi-50k'
  | '50k-den-100k'
  | 'tren-100k';

// Chế độ xem trang: Thực đơn (menu) hoặc Quản lý bảng (manage)
export type CheDoXem = 'thuc-don' | 'quan-ly';

// Đối tượng Món Ăn chuẩn đúng theo JSON mock data: (id, ten, phanLoai, moTa, gia, anh)
export interface MonAn {
  id: string;
  ten: string;       // Tên món ăn
  phanLoai: string;  // Phân loại danh mục
  moTa: string;      // Mô tả hương vị
  gia: number;       // Giá tiền (VNĐ)
  anh: string;       // Link hình ảnh trực tuyến
}

// Kiểu dữ liệu cho Popup thông báo thành công
export interface ThongBaoThanhCong {
  dangMo: boolean;
  loaiThaoTac: 'them' | 'sua' | 'xoa' | 'xoa-hang-loat' | 'khoi-phuc';
  tieuDe: string;
  noiDung: string;
}
