import React, { useState, useMemo } from 'react';
import { MonAn, DanhMucMonAn, MucGiaLoc } from '../types/food';
import { DANH_MUC_MON_AN, dinhDangTienVND } from '../data/initialFoods';
import { SafeImage } from './SafeImage';
import { Pagination } from './Pagination';
import {
  Search,
  X,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckSquare,
  Square,
  MinusSquare,
  DollarSign,
} from 'lucide-react';

interface ThuocTinhPhanQuanLy {
  danhSachMonAn: MonAn[];
  xemChiTietMon: (monAn: MonAn) => void;
  chinhSuaMon: (monAn: MonAn) => void;
  xoaMotMon: (monAn: MonAn) => void;
  xoaNhieuMon: (danhSachId: string[]) => void;
  moPopupThemMon: () => void;
}

export const ManagementSection: React.FC<ThuocTinhPhanQuanLy> = ({
  danhSachMonAn,
  xemChiTietMon,
  chinhSuaMon,
  xoaMotMon,
  xoaNhieuMon,
  moPopupThemMon,
}) => {
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
  const [danhMucDangChon, setDanhMucDangChon] = useState<DanhMucMonAn>('Tất cả');
  const [mucGiaDangLoc, setMucGiaDangLoc] = useState<MucGiaLoc>('tat-ca');
  const [danhSachIdDaChon, setDanhSachIdDaChon] = useState<string[]>([]);
  const [idDongDangChon, setIdDongDangChon] = useState<string | null>(null);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const [soDongMoiTrang, setSoDongMoiTrang] = useState(8);

  // Lọc danh sách món ăn theo danh mục, mức giá và từ khóa
  const danhSachMonDaLoc = useMemo(() => {
    return danhSachMonAn.filter((mon) => {
      // Lọc danh mục
      const khopDanhMuc =
        danhMucDangChon === 'Tất cả' || mon.phanLoai === danhMucDangChon;

      // Lọc giá tiền
      let khopGiaTien = true;
      if (mucGiaDangLoc === 'duoi-50k') {
        khopGiaTien = mon.gia < 50000;
      } else if (mucGiaDangLoc === '50k-den-100k') {
        khopGiaTien = mon.gia >= 50000 && mon.gia <= 100000;
      } else if (mucGiaDangLoc === 'tren-100k') {
        khopGiaTien = mon.gia > 100000;
      }

      // Lọc từ khóa tìm kiếm
      const tuKhoa = tuKhoaTimKiem.toLowerCase().trim();
      const khopTuKhoa =
        mon.ten.toLowerCase().includes(tuKhoa) ||
        mon.moTa.toLowerCase().includes(tuKhoa) ||
        mon.phanLoai.toLowerCase().includes(tuKhoa);

      return khopDanhMuc && khopGiaTien && khopTuKhoa;
    });
  }, [danhSachMonAn, danhMucDangChon, mucGiaDangLoc, tuKhoaTimKiem]);

  // Phân trang danh sách bảng
  const tongSoTrang = Math.ceil(danhSachMonDaLoc.length / soDongMoiTrang) || 1;
  const danhSachMonTrangNay = useMemo(() => {
    const viTriBatDau = (trangHienTai - 1) * soDongMoiTrang;
    return danhSachMonDaLoc.slice(viTriBatDau, viTriBatDau + soDongMoiTrang);
  }, [danhSachMonDaLoc, trangHienTai, soDongMoiTrang]);

  // Trạng thái chọn tất cả ở trang hiện tại
  const cacIdTrangNay = danhSachMonTrangNay.map((m) => m.id);
  const daChonTatCaTrangNay =
    cacIdTrangNay.length > 0 &&
    cacIdTrangNay.every((id) => danhSachIdDaChon.includes(id));
  const daChonMotPhanTrangNay =
    cacIdTrangNay.some((id) => danhSachIdDaChon.includes(id)) && !daChonTatCaTrangNay;

  // Bật/tắt chọn tất cả món ở trang hiện tại
  const chonHoacBoChonTatCaTrangNay = () => {
    if (daChonTatCaTrangNay) {
      setDanhSachIdDaChon((danhSachCu) =>
        danhSachCu.filter((id) => !cacIdTrangNay.includes(id))
      );
    } else {
      const danhSachMoi = Array.from(new Set([...danhSachIdDaChon, ...cacIdTrangNay]));
      setDanhSachIdDaChon(danhSachMoi);
    }
  };

  // Chọn hoặc bỏ chọn một món đơn lẻ
  const chonHoacBoChonMotMon = (idMonAn: string, suKien?: React.MouseEvent) => {
    if (suKien) suKien.stopPropagation();
    setDanhSachIdDaChon((danhSachCu) =>
      danhSachCu.includes(idMonAn)
        ? danhSachCu.filter((id) => id !== idMonAn)
        : [...danhSachCu, idMonAn]
    );
  };

  // Nhấn vào một dòng để in đậm và làm nổi bật
  const bamVaoDong = (monAn: MonAn) => {
    setIdDongDangChon(monAn.id === idDongDangChon ? null : monAn.id);
  };

  const huyTatCaLuaChon = () => {
    setDanhSachIdDaChon([]);
  };

  const thucHienXoaHangLoat = () => {
    if (danhSachIdDaChon.length > 0) {
      xoaNhieuMon(danhSachIdDaChon);
      setDanhSachIdDaChon([]);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Khung tiêu đề quản lý & nút thêm món */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-stone-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
              Bảng Quản Lý Món Ăn
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-mono-numbers">
              {danhSachMonAn.length} món
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Hiển thị món ăn theo từng dòng, lọc theo giá tiền, đánh số STT, hỗ trợ chọn nhiều ô tích để xóa nhanh.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={moPopupThemMon}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 active:bg-amber-800 rounded-xl transition-all duration-150 shadow-sm shadow-amber-600/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm món ăn mới</span>
          </button>
        </div>
      </div>

      {/* Thanh bộ lọc và tìm kiếm ở trên cùng */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200/90 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Ô tìm kiếm */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={tuKhoaTimKiem}
              onChange={(e) => {
                setTuKhoaTimKiem(e.target.value);
                setTrangHienTai(1);
              }}
              placeholder="Tìm kiếm theo tên món ăn, mô tả, phân loại..."
              className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm rounded-xl border border-stone-300 bg-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
            />
            {tuKhoaTimKiem && (
              <button
                onClick={() => {
                  setTuKhoaTimKiem('');
                  setTrangHienTai(1);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5 cursor-pointer"
                aria-label="Xóa tìm kiếm"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Lọc theo giá tiền & Số dòng */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Hộp chọn lọc mức giá */}
            <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-300 rounded-xl px-2.5 py-1">
              <DollarSign className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <select
                value={mucGiaDangLoc}
                onChange={(e) => {
                  setMucGiaDangLoc(e.target.value as MucGiaLoc);
                  setTrangHienTai(1);
                }}
                className="bg-transparent text-xs font-semibold text-stone-700 focus:outline-none cursor-pointer py-1"
                aria-label="Lọc theo mức giá tiền"
              >
                <option value="tat-ca">Tất cả mức giá</option>
                <option value="duoi-50k">Dưới 50.000 ₫</option>
                <option value="50k-den-100k">Từ 50.000 ₫ - 100.000 ₫</option>
                <option value="tren-100k">Trên 100.000 ₫</option>
              </select>
            </div>

            {/* Số dòng hiển thị mỗi trang */}
            <div className="flex items-center gap-1.5 text-xs text-stone-500">
              <span className="hidden sm:inline">Hiển thị:</span>
              <select
                value={soDongMoiTrang}
                onChange={(e) => {
                  setSoDongMoiTrang(Number(e.target.value));
                  setTrangHienTai(1);
                }}
                className="px-2.5 py-2 text-xs font-medium rounded-xl border border-stone-300 bg-white text-stone-700 font-mono-numbers focus:outline-none focus:ring-2 focus:ring-amber-500/20 cursor-pointer"
              >
                <option value={6}>6 dòng</option>
                <option value={8}>8 dòng</option>
                <option value={10}>10 dòng</option>
                <option value={15}>15 dòng</option>
              </select>
            </div>
          </div>
        </div>

        {/* Nút lọc phân loại danh mục */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {DANH_MUC_MON_AN.map((danhMuc) => {
            const laDangChon = danhMucDangChon === danhMuc;
            const soLuong =
              danhMuc === 'Tất cả'
                ? danhSachMonAn.length
                : danhSachMonAn.filter((m) => m.phanLoai === danhMuc).length;

            return (
              <button
                key={danhMuc}
                onClick={() => {
                  setDanhMucDangChon(danhMuc);
                  setTrangHienTai(1);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  laDangChon
                    ? 'bg-amber-600 text-white font-semibold shadow-xs'
                    : 'bg-stone-50 border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <span>{danhMuc}</span>
                <span
                  className={`text-[10px] font-mono-numbers px-1.5 py-0.2 rounded-full ${
                    laDangChon
                      ? 'bg-amber-700 text-white'
                      : 'bg-stone-200 text-stone-600'
                  }`}
                >
                  {soLuong}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Thanh thao tác hàng loạt - Hiển thị khi tích chọn nhiều món */}
      {danhSachIdDaChon.length > 0 && (
        <div className="p-3.5 bg-amber-50/90 border border-amber-200 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-xs animate-in fade-in duration-150">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xs font-mono-numbers">
              {danhSachIdDaChon.length}
            </div>
            <span className="text-xs font-semibold text-amber-950">
              Đã chọn <strong className="font-mono-numbers">{danhSachIdDaChon.length}</strong> món ăn trong danh sách
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={huyTatCaLuaChon}
              className="px-3 py-1.5 text-xs font-medium text-stone-600 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors cursor-pointer"
            >
              Hủy chọn
            </button>
            <button
              onClick={thucHienXoaHangLoat}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa các món đã chọn ({danhSachIdDaChon.length})</span>
            </button>
          </div>
        </div>
      )}

      {/* Bảng dữ liệu quản lý món ăn */}
      <div className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-[11px] font-semibold text-stone-600 uppercase tracking-wider">
                {/* Ô tích chọn tất cả */}
                <th scope="col" className="w-12 px-4 py-3.5 text-center">
                  <button
                    type="button"
                    onClick={chonHoacBoChonTatCaTrangNay}
                    title={daChonTatCaTrangNay ? 'Bỏ chọn trang này' : 'Chọn tất cả trang này'}
                    className="text-stone-400 hover:text-amber-600 transition-colors cursor-pointer inline-flex items-center justify-center"
                    aria-label="Chọn tất cả"
                  >
                    {daChonTatCaTrangNay ? (
                      <CheckSquare className="w-4 h-4 text-amber-600" />
                    ) : daChonMotPhanTrangNay ? (
                      <MinusSquare className="w-4 h-4 text-amber-600" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>

                {/* STT - Đánh số thứ tự bên trái */}
                <th scope="col" className="w-14 px-3 py-3.5 font-mono-numbers text-center">
                  STT
                </th>

                {/* Hình ảnh */}
                <th scope="col" className="w-20 px-3 py-3.5">
                  Hình ảnh
                </th>

                {/* Tên món ăn */}
                <th scope="col" className="px-4 py-3.5 min-w-[180px]">
                  Tên món ăn
                </th>

                {/* Phân loại */}
                <th scope="col" className="px-4 py-3.5 min-w-[120px]">
                  Phân loại
                </th>

                {/* Giá bán */}
                <th scope="col" className="px-4 py-3.5 text-right min-w-[110px]">
                  Giá bán
                </th>

                {/* Mô tả */}
                <th scope="col" className="px-4 py-3.5 min-w-[220px]">
                  Mô tả hương vị
                </th>

                {/* Thao tác */}
                <th scope="col" className="px-4 py-3.5 text-right min-w-[130px]">
                  Thao tác
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-100 text-xs">
              {danhSachMonTrangNay.length > 0 ? (
                danhSachMonTrangNay.map((monAn, chiSo) => {
                  const laDaChon = danhSachIdDaChon.includes(monAn.id);
                  const laDangHoverHoacBam = idDongDangChon === monAn.id;
                  const soThuTu = (trangHienTai - 1) * soDongMoiTrang + chiSo + 1;

                  return (
                    <tr
                      key={monAn.id}
                      onClick={() => bamVaoDong(monAn)}
                      className={`group transition-all duration-150 cursor-pointer select-none ${
                        laDaChon
                          ? 'bg-amber-50/80 font-medium text-stone-900 border-l-4 border-l-amber-600'
                          : laDangHoverHoacBam
                          ? 'bg-stone-50 font-semibold text-stone-900 ring-1 ring-inset ring-amber-500/20'
                          : 'hover:bg-amber-50/30 text-stone-700'
                      }`}
                    >
                      {/* Ô tích Checkbox */}
                      <td
                        className="px-4 py-3 text-center"
                        onClick={(e) => chonHoacBoChonMotMon(monAn.id, e)}
                      >
                        <button
                          type="button"
                          className="text-stone-400 hover:text-amber-600 transition-colors inline-flex items-center justify-center cursor-pointer"
                          aria-label={`Chọn món ${monAn.ten}`}
                        >
                          {laDaChon ? (
                            <CheckSquare className="w-4 h-4 text-amber-600" />
                          ) : (
                            <Square className="w-4 h-4 text-stone-400 group-hover:text-stone-600" />
                          )}
                        </button>
                      </td>

                      {/* STT - Đánh số bên trái */}
                      <td className="px-3 py-3 text-center font-mono-numbers text-stone-500 group-hover:text-stone-900 text-xs">
                        {String(soThuTu).padStart(2, '0')}
                      </td>

                      {/* Hình ảnh thu nhỏ */}
                      <td className="px-3 py-3">
                        <div className="w-14 h-11 rounded-lg overflow-hidden border border-stone-200 bg-stone-100 shrink-0">
                          <SafeImage
                            duongDanAnh={monAn.anh}
                            tenMoTa={monAn.ten}
                            lopTuyChon="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                      </td>

                      {/* Tên món */}
                      <td className="px-4 py-3">
                        <span
                          className={`text-stone-900 line-clamp-1 ${
                            laDaChon || laDangHoverHoacBam ? 'font-bold text-amber-900' : 'font-semibold'
                          }`}
                        >
                          {monAn.ten}
                        </span>
                      </td>

                      {/* Phân loại */}
                      <td className="px-4 py-3">
                        <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-medium bg-stone-100 text-stone-700">
                          {monAn.phanLoai}
                        </span>
                      </td>

                      {/* Giá bán */}
                      <td className="px-4 py-3 text-right">
                        <span
                          className={`font-mono-numbers ${
                            laDaChon || laDangHoverHoacBam ? 'font-bold text-amber-700' : 'font-semibold text-stone-800'
                          }`}
                        >
                          {dinhDangTienVND(monAn.gia)}
                        </span>
                      </td>

                      {/* Mô tả */}
                      <td className="px-4 py-3">
                        <p className="text-[11px] text-stone-500 line-clamp-1 font-normal max-w-xs">
                          {monAn.moTa}
                        </p>
                      </td>

                      {/* Thao tác (Xem, Sửa, Xóa) */}
                      <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          {/* Xem chi tiết */}
                          <button
                            type="button"
                            onClick={() => xemChiTietMon(monAn)}
                            title="Xem chi tiết món"
                            className="p-1.5 text-stone-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                            aria-label={`Xem chi tiết ${monAn.ten}`}
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Chỉnh sửa */}
                          <button
                            type="button"
                            onClick={() => chinhSuaMon(monAn)}
                            title="Chỉnh sửa món này"
                            className="p-1.5 text-stone-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            aria-label={`Chỉnh sửa ${monAn.ten}`}
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          {/* Xóa */}
                          <button
                            type="button"
                            onClick={() => xoaMotMon(monAn)}
                            title="Xóa món này"
                            className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            aria-label={`Xóa ${monAn.ten}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                /* Bảng trống */
                <tr>
                  <td colSpan={8} className="py-14 text-center">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-stone-100 flex items-center justify-center text-stone-400 mb-2">
                      <Search className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-semibold text-stone-800">Không có món ăn phù hợp</p>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Thử đổi mức giá lọc, xóa từ khóa tìm kiếm hoặc chọn danh mục khác
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Phân trang dưới cùng */}
        <div className="px-4 bg-stone-50/50">
          <Pagination
            trangHienTai={trangHienTai}
            tongSoTrang={tongSoTrang}
            tongSoLuong={danhSachMonDaLoc.length}
            soLuongMoiTrang={soDongMoiTrang}
            chuyenTrang={(trangMoi) => setTrangHienTai(trangMoi)}
          />
        </div>
      </div>
    </div>
  );
};
