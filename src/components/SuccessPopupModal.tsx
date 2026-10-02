import React from 'react';
import { ThongBaoThanhCong } from '../types/food';
import { CheckCircle2, X } from 'lucide-react';

interface ThuocTinhPopupThanhCong {
  thongBao: ThongBaoThanhCong;
  dongPopup: () => void;
}

export const SuccessPopupModal: React.FC<ThuocTinhPopupThanhCong> = ({
  thongBao,
  dongPopup,
}) => {
  if (!thongBao.dangMo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Nền mờ phía sau */}
      <div
        className="fixed inset-0 bg-stone-950/50 backdrop-blur-xs transition-opacity"
        onClick={dongPopup}
      />

      {/* Hộp thoại thông báo */}
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 text-center z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={dongPopup}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 p-1 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="Đóng popup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Biểu tượng tích xanh thành công */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-xs">
          <CheckCircle2 className="w-9 h-9 stroke-[2]" />
        </div>

        <h3 className="text-lg font-bold text-stone-900 font-display">
          {thongBao.tieuDe}
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed px-2">
          {thongBao.noiDung}
        </p>

        <div className="mt-6">
          <button
            type="button"
            onClick={dongPopup}
            className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl transition-all shadow-sm shadow-emerald-600/20 cursor-pointer"
          >
            Đồng ý / Hoàn tất
          </button>
        </div>
      </div>
    </div>
  );
};
