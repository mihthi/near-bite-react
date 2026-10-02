import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ThuocTinhPhanTrang {
  trangHienTai: number;
  tongSoTrang: number;
  tongSoLuong: number;
  soLuongMoiTrang: number;
  chuyenTrang: (trangMoi: number) => void;
}

export const Pagination: React.FC<ThuocTinhPhanTrang> = ({
  trangHienTai,
  tongSoTrang,
  tongSoLuong,
  soLuongMoiTrang,
  chuyenTrang,
}) => {
  if (tongSoTrang <= 1 && tongSoLuong <= soLuongMoiTrang) {
    return (
      <div className="flex items-center justify-between text-xs text-stone-500 py-3 px-1">
        <span>Hiển thị tất cả {tongSoLuong} món ăn</span>
        <span className="font-mono-numbers">Trang 1 / 1</span>
      </div>
    );
  }

  const viTriBatDau = tongSoLuong === 0 ? 0 : (trangHienTai - 1) * soLuongMoiTrang + 1;
  const viTriKetThuc = Math.min(trangHienTai * soLuongMoiTrang, tongSoLuong);

  // Tạo danh sách các số trang cần hiển thị trên giao diện
  const taoDanhSachSoTrang = () => {
    const cacTrang: (number | string)[] = [];
    if (tongSoTrang <= 5) {
      for (let i = 1; i <= tongSoTrang; i++) cacTrang.push(i);
    } else {
      if (trangHienTai <= 3) {
        cacTrang.push(1, 2, 3, 4, '...', tongSoTrang);
      } else if (trangHienTai >= tongSoTrang - 2) {
        cacTrang.push(1, '...', tongSoTrang - 3, tongSoTrang - 2, tongSoTrang - 1, tongSoTrang);
      } else {
        cacTrang.push(1, '...', trangHienTai - 1, trangHienTai, trangHienTai + 1, '...', tongSoTrang);
      }
    }
    return cacTrang;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2 border-t border-stone-200">
      <div className="text-xs text-stone-600">
        Hiển thị <span className="font-semibold text-stone-900 font-mono-numbers">{viTriBatDau}</span> -{' '}
        <span className="font-semibold text-stone-900 font-mono-numbers">{viTriKetThuc}</span> trong tổng số{' '}
        <span className="font-semibold text-stone-900 font-mono-numbers">{tongSoLuong}</span> món ăn
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => chuyenTrang(trangHienTai - 1)}
          disabled={trangHienTai === 1}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer"
          aria-label="Trang trước"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Trước</span>
        </button>

        <div className="flex items-center gap-1">
          {taoDanhSachSoTrang().map((soTrang, viTri) => {
            if (soTrang === '...') {
              return (
                <span key={`dau-cham-${viTri}`} className="px-2 py-1 text-xs text-stone-400">
                  ...
                </span>
              );
            }
            const laTrangHienTai = soTrang === trangHienTai;
            return (
              <button
                key={`trang-${soTrang}`}
                onClick={() => chuyenTrang(soTrang as number)}
                className={`w-8 h-8 flex items-center justify-center text-xs font-medium rounded-lg font-mono-numbers transition-all duration-150 cursor-pointer ${
                  laTrangHienTai
                    ? 'bg-amber-600 text-white font-semibold shadow-xs'
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                }`}
                aria-current={laTrangHienTai ? 'page' : undefined}
              >
                {soTrang}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => chuyenTrang(trangHienTai + 1)}
          disabled={trangHienTai === tongSoTrang || tongSoTrang === 0}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer"
          aria-label="Trang sau"
        >
          <span className="hidden sm:inline">Sau</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
