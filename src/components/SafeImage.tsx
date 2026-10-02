import React, { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface ThuocTinhHinhAnh {
  duongDanAnh: string;
  tenMoTa: string;
  lopTuyChon?: string;
}

export const SafeImage: React.FC<ThuocTinhHinhAnh> = ({
  duongDanAnh,
  tenMoTa,
  lopTuyChon = '',
}) => {
  const [biLoi, setBiLoi] = useState(false);
  const [dangTai, setDangTai] = useState(true);

  if (!duongDanAnh || biLoi) {
    return (
      <div
        className={`bg-stone-100 flex flex-col items-center justify-center text-stone-400 p-4 border border-dashed border-stone-200 ${lopTuyChon}`}
        role="img"
        aria-label={tenMoTa}
      >
        <UtensilsCrossed className="w-8 h-8 text-stone-400 stroke-[1.5] mb-1" />
        <span className="text-[11px] font-medium text-stone-500 text-center line-clamp-1">{tenMoTa}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-stone-100 ${lopTuyChon}`}>
      {dangTai && (
        <div className="absolute inset-0 bg-stone-200 animate-pulse flex items-center justify-center">
          <UtensilsCrossed className="w-6 h-6 text-stone-300 stroke-[1.5]" />
        </div>
      )}
      <img
        src={duongDanAnh}
        alt={tenMoTa}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setDangTai(false)}
        onError={() => {
          setDangTai(false);
          setBiLoi(true);
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          dangTai ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};
