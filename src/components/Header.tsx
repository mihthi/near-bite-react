import React from 'react';
import { CheDoXem } from '../types/food';
import { Utensils, LayoutGrid, TableProperties } from 'lucide-react';

interface ThuocTinhThanhHeader {
  cheDoXem: CheDoXem;
  doiCheDoXem: (cheDoMoi: CheDoXem) => void;
  tongSoMon: number;
}

export const Header: React.FC<ThuocTinhThanhHeader> = ({
  cheDoXem,
  doiCheDoXem,
  tongSoMon,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Vùng 1: Tên thương hiệu ứng dụng */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white shadow-md shadow-amber-600/20 shrink-0">
              <Utensils className="w-5 h-5" />
            </div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                doiCheDoXem('thuc-don');
              }}
              className="text-lg font-bold tracking-tight text-stone-900 font-display flex items-center gap-1.5"
            >
              <span>Bếp Việt</span>
            </a>
          </div>

          {/* Vùng 2: Chuyển đổi tab Thực Đơn / Quản Lý Món Ăn */}
          <nav className="flex items-center p-1 bg-stone-100/90 rounded-xl border border-stone-200/80">
            <button
              onClick={() => doiCheDoXem('thuc-don')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer ${
                cheDoXem === 'thuc-don'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4 text-amber-600" />
              <span>Thực Đơn (Menu)</span>
            </button>

            <button
              onClick={() => doiCheDoXem('quan-ly')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer ${
                cheDoXem === 'quan-ly'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <TableProperties className="w-4 h-4 text-amber-600" />
              <span>Quản Lý Món Ăn</span>
              <span className="ml-0.5 text-[11px] font-mono-numbers px-1.5 py-0.2 rounded-full bg-stone-200/80 text-stone-700">
                {tongSoMon}
              </span>
            </button>
          </nav>

        </div>
      </div>
    </header>
  );
};
