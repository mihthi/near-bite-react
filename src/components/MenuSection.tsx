import React, { useState, useMemo } from 'react';
import { MonAn, DanhMucMonAn } from '../types/food';
import { DANH_MUC_MON_AN, dinhDangTienVND } from '../data/initialFoods';
import { SafeImage } from './SafeImage';
import { Pagination } from './Pagination';
import { Search, X, Eye, ArrowUpDown, Sparkles } from 'lucide-react';

interface ThuocTinhPhanMenu {
  danhSachMonAn: MonAn[];
  chonXemChiTietMon: (monAn: MonAn) => void;
}

export const MenuSection: React.FC<ThuocTinhPhanMenu> = ({
  danhSachMonAn,
  chonXemChiTietMon,
}) => {
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
  const [danhMucDangChon, setDanhMucDangChon] = useState<DanhMucMonAn>('Tất cả');
  const [kieuSapXep, setKieuSapXep] = useState<'mac-dinh' | 'gia-tang' | 'gia-giam' | 'ten-az'>('mac-dinh');
  const [trangHienTai, setTrangHienTai] = useState(1);

  const SO_MON_MOI_TRANG = 6; // Phân trang chuẩn 6 món ăn ở mỗi trang

  // Lọc và sắp xếp danh sách món ăn
  const danhSachMonDaLoc = useMemo(() => {
    const tuKhoaChuanHoa = tuKhoaTimKiem.toLowerCase().trim();
    const ketQuaLoc = danhSachMonAn.filter((mon) => {
      const khopDanhMuc =
        danhMucDangChon === 'Tất cả' || mon.phanLoai === danhMucDangChon;
      const khopTuKhoa =
        mon.ten.toLowerCase().includes(tuKhoaChuanHoa) ||
        mon.moTa.toLowerCase().includes(tuKhoaChuanHoa);
      return khopDanhMuc && khopTuKhoa;
    });

    if (kieuSapXep === 'gia-tang') {
      ketQuaLoc.sort((monA, monB) => monA.gia - monB.gia);
    } else if (kieuSapXep === 'gia-giam') {
      ketQuaLoc.sort((monA, monB) => monB.gia - monA.gia);
    } else if (kieuSapXep === 'ten-az') {
      ketQuaLoc.sort((monA, monB) => monA.ten.localeCompare(monB.ten, 'vi'));
    }

    return ketQuaLoc;
  }, [danhSachMonAn, danhMucDangChon, tuKhoaTimKiem, kieuSapXep]);

  // Tính toán số trang và cắt mảng món ăn hiển thị ở trang hiện tại
  const tongSoTrang = Math.ceil(danhSachMonDaLoc.length / SO_MON_MOI_TRANG) || 1;
  const danhSachMonHienThi = useMemo(() => {
    const viTriBatDau = (trangHienTai - 1) * SO_MON_MOI_TRANG;
    return danhSachMonDaLoc.slice(viTriBatDau, viTriBatDau + SO_MON_MOI_TRANG);
  }, [danhSachMonDaLoc, trangHienTai]);

  const thayDoiDanhMuc = (danhMucMoi: DanhMucMonAn) => {
    setDanhMucDangChon(danhMucMoi);
    setTrangHienTai(1);
  };

  const thayDoiTuKhoa = (giaTriMoi: string) => {
    setTuKhoaTimKiem(giaTriMoi);
    setTrangHienTai(1);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Banner giới thiệu thực đơn */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 text-white p-6 sm:p-10 shadow-xl border border-stone-800">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tinh Hoa Ẩm Thực Truyền Thống & Đương Đại</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
            Thực Đơn Đậm Đà Bản Sắc Việt
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl">
            Khám phá các món ăn hảo hạng với thông tin chi tiết tên món, mô tả hương vị, giá bán và
            hình ảnh minh họa trực quan.
          </p>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Thanh công cụ: Tìm kiếm, Bộ lọc danh mục, Sắp xếp */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Ô tìm kiếm món ăn */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={tuKhoaTimKiem}
              onChange={(e) => thayDoiTuKhoa(e.target.value)}
              placeholder="Tìm kiếm theo tên món ăn, mô tả hương vị..."
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 bg-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-2xs transition-all"
            />
            {tuKhoaTimKiem && (
              <button
                onClick={() => thayDoiTuKhoa('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5 cursor-pointer"
                aria-label="Xóa từ khóa tìm kiếm"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Chọn sắp xếp */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500">
                <ArrowUpDown className="w-3.5 h-3.5" />
              </div>
              <select
                value={kieuSapXep}
                onChange={(e) => setKieuSapXep(e.target.value as any)}
                className="pl-8 pr-7 py-2.5 text-xs font-medium rounded-xl border border-stone-300 bg-white text-stone-700 hover:border-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-2xs transition-all cursor-pointer"
              >
                <option value="mac-dinh">Sắp xếp: Mặc định</option>
                <option value="gia-tang">Giá: Thấp đến cao</option>
                <option value="gia-giam">Giá: Cao đến thấp</option>
                <option value="ten-az">Tên món: A - Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Các nút bấm lọc theo danh mục món ăn */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {DANH_MUC_MON_AN.map((danhMuc) => {
            const laDangChon = danhMucDangChon === danhMuc;
            const soLuong =
              danhMuc === 'Tất cả'
                ? danhSachMonAn.length
                : danhSachMonAn.filter((m) => m.phanLoai === danhMuc).length;

            return (
              <button
                key={danhMuc}
                onClick={() => thayDoiDanhMuc(danhMuc)}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  laDangChon
                    ? 'bg-amber-600 text-white shadow-sm shadow-amber-600/25 ring-2 ring-amber-600/20'
                    : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                <span>{danhMuc}</span>
                <span
                  className={`text-[10px] font-mono-numbers px-1.5 py-0.2 rounded-full ${
                    laDangChon
                      ? 'bg-amber-700/80 text-white'
                      : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  {soLuong}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lưới hiển thị món ăn: Đúng 6 món ở mỗi trang */}
      {danhSachMonHienThi.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {danhSachMonHienThi.map((monAn) => (
            <div
              key={monAn.id}
              onClick={() => chonXemChiTietMon(monAn)}
              className="group relative bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:shadow-stone-950/5 hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col"
            >
              {/* Ảnh món ăn có hiệu ứng hover zoom */}
              <div className="relative h-52 w-full overflow-hidden bg-stone-100">
                <SafeImage
                  duongDanAnh={monAn.anh}
                  tenMoTa={monAn.ten}
                  lopTuyChon="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                {/* Nhãn phân loại */}
                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-xs text-stone-800 shadow-2xs border border-white/50">
                    {monAn.phanLoai}
                  </span>
                </div>

                {/* Nút xem nhanh khi hover */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-stone-900 text-xs font-semibold shadow-md">
                    <Eye className="w-3.5 h-3.5 text-amber-600" />
                    Xem chi tiết
                  </span>
                </div>
              </div>

              {/* Thông tin món ăn: Tên, Mô tả, Giá */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-1">
                    {monAn.ten}
                  </h3>

                  <p className="mt-1.5 text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {monAn.moTa}
                  </p>
                </div>

                {/* Giá món ăn */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 block uppercase tracking-wider">
                      Giá món
                    </span>
                    <span className="text-base font-extrabold text-amber-600 font-mono-numbers">
                      {dinhDangTienVND(monAn.gia)}
                    </span>
                  </div>

                  <span className="text-xs text-amber-600 font-medium group-hover:underline flex items-center gap-1">
                    Chi tiết &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Giao diện khi không tìm thấy món */
        <div className="py-16 px-4 text-center rounded-3xl bg-white border border-stone-200">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-900">Không tìm thấy món ăn nào</h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            Không có kết quả nào phù hợp với bộ lọc hoặc từ khóa &quot;{tuKhoaTimKiem}&quot;.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setTuKhoaTimKiem('');
                setDanhMucDangChon('Tất cả');
              }}
              className="px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        </div>
      )}

      {/* Phân trang: 6 món ở mỗi trang */}
      <Pagination
        trangHienTai={trangHienTai}
        tongSoTrang={tongSoTrang}
        tongSoLuong={danhSachMonDaLoc.length}
        soLuongMoiTrang={SO_MON_MOI_TRANG}
        chuyenTrang={(trangMoi) => {
          setTrangHienTai(trangMoi);
          window.scrollTo({ top: 320, behavior: 'smooth' });
        }}
      />
    </div>
  );
};
