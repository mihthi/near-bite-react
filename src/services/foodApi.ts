import { MonAn } from '../types/food';
import duLieuGocTuJson from '../data/foods.json';

const KHOA_LUU_TRU = 'bep_viet_du_lieu_mon_an_v3';

// Đọc danh sách món ăn từ LocalStorage (nếu chưa có thì lấy từ foods.json)
export const docDuLieuTuBoNho = (): MonAn[] => {
  try {
    const chuoiJson = localStorage.getItem(KHOA_LUU_TRU);
    if (chuoiJson) {
      const danhSach = JSON.parse(chuoiJson);
      if (Array.isArray(danhSach) && danhSach.length > 0) {
        return danhSach;
      }
    }
  } catch (loi) {
    console.error('Lỗi khi đọc dữ liệu từ LocalStorage:', loi);
  }
  return duLieuGocTuJson as MonAn[];
};

// Lưu danh sách món ăn vào LocalStorage
export const luuDuLieuVaoBoNho = (danhSachMon: MonAn[]): void => {
  try {
    localStorage.setItem(KHOA_LUU_TRU, JSON.stringify(danhSachMon));
  } catch (loi) {
    console.error('Lỗi khi lưu dữ liệu vào LocalStorage:', loi);
  }
};

// Dịch vụ API giả lập bất đồng bộ để kết nối với TanStack Query
export const foodApi = {
  // Lấy toàn bộ danh sách món ăn
  layDanhSachMonAn: async (): Promise<MonAn[]> => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return docDuLieuTuBoNho();
  },

  // Thêm một món ăn mới vào đầu danh sách
  themMonAnMoi: async (monMoi: Omit<MonAn, 'id'>): Promise<MonAn> => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    const danhSachHienTai = docDuLieuTuBoNho();
    const monAnMoiTao: MonAn = {
      ...monMoi,
      id: `mon-${Date.now()}`,
    };
    const danhSachMoi = [monAnMoiTao, ...danhSachHienTai];
    luuDuLieuVaoBoNho(danhSachMoi);
    return monAnMoiTao;
  },

  // Chỉnh sửa thông tin món ăn
  capNhatMonAn: async (monCapNhat: MonAn): Promise<MonAn> => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    const danhSachHienTai = docDuLieuTuBoNho();
    const danhSachMoi = danhSachHienTai.map((mon) =>
      mon.id === monCapNhat.id ? monCapNhat : mon
    );
    luuDuLieuVaoBoNho(danhSachMoi);
    return monCapNhat;
  },

  // Xóa một món ăn theo ID
  xoaMotMonAn: async (idMonAn: string): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    const danhSachHienTai = docDuLieuTuBoNho();
    const danhSachMoi = danhSachHienTai.filter((mon) => mon.id !== idMonAn);
    luuDuLieuVaoBoNho(danhSachMoi);
    return idMonAn;
  },

  // Xóa nhiều món ăn được chọn (Xóa hàng loạt)
  xoaNhieuMonAn: async (danhSachId: string[]): Promise<string[]> => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    const danhSachHienTai = docDuLieuTuBoNho();
    const danhSachMoi = danhSachHienTai.filter((mon) => !danhSachId.includes(mon.id));
    luuDuLieuVaoBoNho(danhSachMoi);
    return danhSachId;
  },

};
