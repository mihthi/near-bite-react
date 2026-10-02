import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface ThuocTinhModalXacNhan {
  dangMo: boolean;
  tieuDe: string;
  moTaChiTiet: string;
  soLuongMonAnhHuong?: number;
  nhanNutXacNhan?: string;
  nhanNutHuy?: string;
  laHanhDongXoa?: boolean;
  xuLyXacNhan: () => void;
  dongModal: () => void;
}

export const ConfirmModal: React.FC<ThuocTinhModalXacNhan> = ({
  dangMo,
  tieuDe,
  moTaChiTiet,
  soLuongMonAnhHuong,
  nhanNutXacNhan = 'Xác nhận',
  nhanNutHuy = 'Hủy bỏ',
  laHanhDongXoa = true,
  xuLyXacNhan,
  dongModal,
}) => {
  if (!dangMo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Lớp nền mờ */}
      <div
        className="fixed inset-0 bg-stone-950/40 backdrop-blur-xs transition-opacity"
        onClick={dongModal}
      />

      {/* Hộp thoại xác nhận */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-start gap-4">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              laHanhDongXoa ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
            }`}
          >
            {laHanhDongXoa ? (
              <Trash2 className="w-5 h-5 stroke-[1.75]" />
            ) : (
              <AlertTriangle className="w-5 h-5 stroke-[1.75]" />
            )}
          </div>

          <div className="flex-1">
            <h3 className="text-base font-semibold text-stone-900">{tieuDe}</h3>
            <p className="mt-1 text-xs text-stone-600 leading-relaxed">{moTaChiTiet}</p>
            {soLuongMonAnhHuong !== undefined && soLuongMonAnhHuong > 0 && (
              <div className="mt-2.5 inline-flex items-center px-2 py-1 rounded bg-rose-50 text-rose-700 text-xs font-mono-numbers font-medium">
                Số lượng món được chọn: {soLuongMonAnhHuong} món
              </div>
            )}
          </div>

          <button
            onClick={dongModal}
            className="text-stone-400 hover:text-stone-600 p-1 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={dongModal}
            className="px-4 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors cursor-pointer"
          >
            {nhanNutHuy}
          </button>
          <button
            type="button"
            onClick={() => {
              xuLyXacNhan();
              dongModal();
            }}
            className={`px-4 py-2 text-xs font-medium text-white rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              laHanhDongXoa
                ? 'bg-rose-600 hover:bg-rose-700'
                : 'bg-amber-600 hover:bg-amber-700'
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            {nhanNutXacNhan}
          </button>
        </div>
      </div>
    </div>
  );
};
