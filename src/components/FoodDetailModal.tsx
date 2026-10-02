import React from 'react';
import { MonAn } from '../types/food';
import { dinhDangTienVND } from '../data/initialFoods';
import { SafeImage } from './SafeImage';
import { X, Tag } from 'lucide-react';

interface ThuocTinhModalChiTiet {
  monAn: MonAn | null;
  dangMo: boolean;
  dongModal: () => void;
}

export const FoodDetailModal: React.FC<ThuocTinhModalChiTiet> = ({
  monAn,
  dangMo,
  dongModal,
}) => {
  if (!dangMo || !monAn) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Nền mờ */}
      <div
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
        onClick={dongModal}
      />

      {/* Hộp thoại chi tiết món ăn */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Nút đóng nổi trên ảnh */}
        <button
          onClick={dongModal}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-stone-700 hover:text-stone-950 hover:bg-white transition-all duration-150 cursor-pointer"
          aria-label="Đóng chi tiết"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Ảnh món ăn */}
        <div className="relative h-60 w-full bg-stone-900 overflow-hidden">
          <SafeImage
            duongDanAnh={monAn.anh}
            tenMoTa={monAn.ten}
            lopTuyChon="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

          {/* Phân loại & Giá tiền nổi trên ảnh */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-stone-850 shadow-md">
              <Tag className="w-3.5 h-3.5 text-amber-600" />
              {monAn.phanLoai}
            </span>

            <span className="text-xl sm:text-2xl font-extrabold text-amber-400 font-mono-numbers drop-shadow-sm">
              {dinhDangTienVND(monAn.gia)}
            </span>
          </div>
        </div>

        {/* Nội dung chi tiết: Tên, Mô tả, Giá, Phân loại */}
        <div className="p-6 sm:p-7 space-y-5">
          {/* Tên món */}
          <div>
            <span className="text-[11px] font-semibold text-stone-500 tracking-wider uppercase">
              Tên món ăn
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-display mt-0.5">
              {monAn.ten}
            </h2>
          </div>

          {/* Bảng tóm tắt: Phân loại & Giá bán */}
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
            <div>
              <span className="block text-[11px] text-stone-500 font-medium">Phân loại</span>
              <span className="text-sm font-semibold text-stone-800">{monAn.phanLoai}</span>
            </div>
            <div>
              <span className="block text-[11px] text-stone-500 font-medium">Giá bán</span>
              <span className="text-sm font-bold text-amber-600 font-mono-numbers">
                {dinhDangTienVND(monAn.gia)}
              </span>
            </div>
          </div>

          {/* Mô tả món ăn */}
          <div>
            <span className="text-[11px] font-semibold text-stone-500 tracking-wider uppercase block mb-1.5">
              Mô tả món ăn
            </span>
            <p className="text-sm text-stone-700 leading-relaxed bg-stone-50/60 p-4 rounded-2xl border border-stone-100">
              {monAn.moTa}
            </p>
          </div>

          {/* Nút đóng */}
          <div className="pt-2 flex items-center justify-end border-t border-stone-100">
            <button
              type="button"
              onClick={dongModal}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
            >
              Đóng lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
