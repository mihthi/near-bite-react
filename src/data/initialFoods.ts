import { DanhMucMonAn } from '../types/food';

// Danh sách danh mục món ăn
export const DANH_MUC_MON_AN: DanhMucMonAn[] = [
  'Tất cả',
  'Khai vị',
  'Món chính',
  'Món nước',
  'Món nướng & xào',
  'Tráng miệng',
  'Đồ uống'
];

// Danh sách link ảnh mẫu gợi ý để người dùng chọn nhanh khi thêm món
export const LINK_ANH_GOI_Y = [
  { tenGoi: 'Phở & Món nước', duongDan: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80' },
  { tenGoi: 'Cơm tấm / Sườn', duongDan: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80' },
  { tenGoi: 'Gà nướng / Thịt nướng', duongDan: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80' },
  { tenGoi: 'Gỏi cuốn thanh mát', duongDan: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80' },
  { tenGoi: 'Bánh mì đặc biệt', duongDan: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?auto=format&fit=crop&w=800&q=80' },
  { tenGoi: 'Cá kho / Hải sản', duongDan: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80' },
  { tenGoi: 'Cà phê trứng / Đồ uống', duongDan: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80' },
  { tenGoi: 'Chè khúc bạch / Tráng miệng', duongDan: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80' }
];

// Hàm định dạng số tiền sang chuẩn Việt Nam Đồng (VNĐ)
export const dinhDangTienVND = (soTien: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(soTien);
};
