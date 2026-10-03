import React, { useState, useEffect } from 'react';
import { MonAn, DanhMucMonAn } from '../types/food';
import { DANH_MUC_MON_AN, LINK_ANH_GOI_Y } from '../data/initialFoods';
import { SafeImage } from './SafeImage';
import { X, Sparkles, Check, Image as BiểuTượngẢnh } from 'lucide-react';

interface ThuocTinhModalBieuMau {
  dangMo: boolean;
  dongModal: () => void;
  xuLyLuuMonAn: (duLieuMon: Omit<MonAn, 'id'> & { id?: string }) => void;
  monAnCanSua?: MonAn | null;
}

export const FoodFormModal: React.FC<ThuocTinhModalBieuMau> = ({
  dangMo,
  dongModal,
  xuLyLuuMonAn,
  monAnCanSua,
}) => {
  const [tenMon, setTenMon] = useState('');
  const [phanLoai, setPhanLoai] = useState<Exclude<DanhMucMonAn, 'Tất cả'>>('Món chính');
  const [giaBan, setGiaBan] = useState<number | ''>(55000);
  const [linkAnh, setLinkAnh] = useState('');
  const [moTa, setMoTa] = useState('');
  const [thongBaoLoi, setThongBaoLoi] = useState('');

  // Nạp dữ liệu khi mở form (thêm mới hoặc sửa)
  useEffect(() => {
    if (monAnCanSua) {
      setTenMon(monAnCanSua.ten);
      setPhanLoai(monAnCanSua.phanLoai as Exclude<DanhMucMonAn, 'Tất cả'>);
      setGiaBan(monAnCanSua.gia);
      setLinkAnh(monAnCanSua.anh);
      setMoTa(monAnCanSua.moTa);
    } else {
      setTenMon('');
      setPhanLoai('Món chính');
      setGiaBan(55000);
      setLinkAnh('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80');
      setMoTa('');
    }
    setThongBaoLoi('');
  }, [monAnCanSua, dangMo]);

  if (!dangMo) return null;

  // Xử lý nộp form thêm / chỉnh sửa món
  const xuLyNopForm = (suKien: React.FormEvent) => {
    suKien.preventDefault();
    if (!tenMon.trim()) {
      setThongBaoLoi('Vui lòng nhập tên món ăn');
      return;
    }
    if (!giaBan || Number(giaBan) <= 0) {
      setThongBaoLoi('Vui lòng nhập giá bán hợp lệ (> 0 ₫)');
      return;
    }
    if (!linkAnh.trim()) {
      setThongBaoLoi('Vui lòng nhập đường dẫn hình ảnh (link ảnh URL)');
      return;
    }

    xuLyLuuMonAn({
      id: monAnCanSua ? monAnCanSua.id : undefined,
      ten: tenMon.trim(),
      phanLoai,
      gia: Number(giaBan),
      anh: linkAnh.trim(),
      moTa: moTa.trim() || 'Món ăn đặc sắc mang đậm hương vị Việt Nam.',
    });
    dongModal();
  };

  const chonNhanhAnhGoiY = (duongDan: string) => {
    setLinkAnh(duongDan);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Nền mờ */}
      <div
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
        onClick={dongModal}
      />

      {/* Hộp thoại form */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 my-6">
        {/* Tiêu đề form */}
        <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div>
            <h3 className="text-lg font-bold text-stone-900 font-display">
              {monAnCanSua ? 'Chỉnh Sửa Món Ăn' : 'Thêm Món Ăn Mới'}
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Các thuộc tính chuẩn: Tên, Phân loại, Giá, Link ảnh, Mô tả
            </p>
          </div>
          <button
            onClick={dongModal}
            className="text-stone-400 hover:text-stone-600 p-1.5 rounded-lg hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nội dung form */}
        <form onSubmit={xuLyNopForm} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {thongBaoLoi && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {thongBaoLoi}
            </div>
          )}

          {/* Tên món */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Tên món ăn <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={tenMon}
              onChange={(e) => setTenMon(e.target.value)}
              placeholder="VD: Phở Bò Tái Lăn, Bún Chả Nướng..."
              required
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
            />
          </div>

          {/* Phân loại & Giá bán */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Phân loại <span className="text-rose-500">*</span>
              </label>
              <select
                value={phanLoai}
                onChange={(e) => setPhanLoai(e.target.value as Exclude<DanhMucMonAn, 'Tất cả'>)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all cursor-pointer"
              >
                {DANH_MUC_MON_AN.filter((dm) => dm !== 'Tất cả').map((danhMuc) => (
                  <option key={danhMuc} value={danhMuc}>
                    {danhMuc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Giá bán (₫) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                min="1000"
                step="1000"
                value={giaBan}
                onChange={(e) => setGiaBan(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="VD: 65000"
                required
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 font-mono-numbers focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              />
            </div>
          </div>

          {/* Link hình ảnh món ăn */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                <BiểuTượngẢnh className="w-3.5 h-3.5 text-stone-500" />
                Link hình ảnh món ăn (URL trực tuyến) <span className="text-rose-500">*</span>
              </label>
              
            </div>
            <input
              type="url"
              value={linkAnh}
              onChange={(e) => setLinkAnh(e.target.value)}
              placeholder="https://images.unsplash.com/... hoặc link ảnh bất kỳ"
              required
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-mono-numbers"
            />

            {/* Gợi ý link ảnh */}
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-stone-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" /> Chọn nhanh link ảnh gợi ý:
              </span>
              {/* nếu muốn giới hạn phân loại để hiển thị *?}
              {/* {LINK_ANH_GOI_Y.slice(0, 4).map((anhMau, viTri) => ( */}
              {LINK_ANH_GOI_Y.map((anhMau, viTri) => (
                <button
                  key={viTri}
                  type="button"
                  onClick={() => chonNhanhAnhGoiY(anhMau.duongDan)}
                  className="px-2 py-0.5 text-[10px] rounded-md bg-stone-100 hover:bg-amber-100 hover:text-amber-800 text-stone-600 transition-colors cursor-pointer"
                >
                  {anhMau.tenGoi}
                </button>
              ))}
            </div>

            {/* Xem trước ảnh */}
            {linkAnh && (
              <div className="mt-3 p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center gap-3">
                <div className="w-16 h-14 rounded-xl overflow-hidden shrink-0 border border-stone-200">
                  <SafeImage duongDanAnh={linkAnh} tenMoTa="Xem trước ảnh món" lopTuyChon="w-full h-full" />
                </div>
                <div className="text-xs text-stone-600 min-w-0">
                  <p className="font-semibold text-stone-800">Khung xem trước ảnh món</p>
                  <p className="text-[11px] text-stone-500 truncate max-w-sm font-mono-numbers">
                    {linkAnh}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Mô tả món ăn */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Mô tả món ăn
            </label>
            <textarea
              rows={3}
              value={moTa}
              onChange={(e) => setMoTa(e.target.value)}
              placeholder="Nhập mô tả hương vị món ăn..."
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-none"
            />
          </div>

          {/* Nút hành động */}
          <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={dongModal}
              className="px-4 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded-xl hover:bg-stone-50 transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              {monAnCanSua ? 'Lưu cập nhật' : 'Thêm món ăn'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
