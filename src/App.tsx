import { useState } from 'react';

// 1. Import các Component giao diện Thi lam
import { FoodFormModal } from './components/FoodFormModal';
import { ConfirmModal } from './components/ConfirmModal';

// 2. Import các dữ liệu/hàm từ file initialFoods.ts 
import { DANH_MUC_MON_AN, dinhDangTienVND } from './data/initialFoods';

export default function App() {
  // Quản lý trạng thái đóng/mở của 2 Modal
  const [moForm, setMoForm] = useState(false);
  const [moXacNhan, setMoXacNhan] = useState(false);

  // Hàm test giả lập để nhận dữ liệu từ FoodFormModal
  const xuLyLuuMonAn = (duLieu: any) => {
    console.log("Dữ liệu form gửi ra:", duLieu);
    alert("Đã lưu form thành công! Bấm F12 xem Console để thấy dữ liệu chi tiết.");
    setMoForm(false);
  };

  return (
    <div className="min-h-screen p-8 bg-stone-100 font-sans">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-stone-200">
        <h1 className="text-2xl font-bold text-stone-800 mb-2">
          Trang Kiểm Tra Code của Thi
        </h1>
        <p className="text-stone-500 mb-8 text-sm">
          Hiển thị độc lập các component và dữ liệu do bạn phụ trách.
        </p>

        {/* 1: TEST DỮ LIỆU TỪ initialFoods.ts */}
        <div className="mb-8 p-5 bg-amber-50 rounded-xl border border-amber-200">
          <h2 className="font-bold text-amber-800 mb-3">1. Dữ liệu từ file initialFoods.ts:</h2>
          <ul className="text-sm text-stone-700 space-y-2 list-disc pl-5">
            <li>
              <strong>Danh mục món ăn đang có: </strong> 
              {/* In mảng danh mục ra màn hình */}
              {DANH_MUC_MON_AN ? DANH_MUC_MON_AN.join(', ') : 'Chưa tải được mảng DANH_MUC_MON_AN'}
            </li>
            <li>
              <strong>Test hàm định dạng tiền (Ví dụ 150000): </strong> 
              {/* Chạy thử hàm định dạng tiền tệ */}
              <span className="font-mono text-rose-600 font-semibold">
                {dinhDangTienVND ? dinhDangTienVND(150000) : 'Chưa có hàm dinhDangTienVND'}
              </span>
            </li>
          </ul>
        </div>

        {/*2: TEST CÁC COMPONENT MODAL*/}
        <div>
          <h2 className="font-bold text-stone-800 mb-3">2. Test giao diện Component:</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setMoForm(true)}
              className="px-6 py-2.5 text-white bg-amber-600 font-medium rounded-xl hover:bg-amber-700 transition-colors shadow-sm"
            >
              Mở Form Thêm Món
            </button>

            <button
              onClick={() => setMoXacNhan(true)}
              className="px-6 py-2.5 text-white bg-rose-600 font-medium rounded-xl hover:bg-rose-700 transition-colors shadow-sm"
            >
              Mở Form Xác Nhận
            </button>
          </div>
        </div>
      </div>

      {/*render các components ẩn*/}
      <FoodFormModal
        dangMo={moForm}
        dongModal={() => setMoForm(false)}
        xuLyLuuMonAn={xuLyLuuMonAn}
        monAnCanSua={null}
      />

      <ConfirmModal
        dangMo={moXacNhan}
        tieuDe="Xác nhận xóa dữ liệu"
        moTaChiTiet="Đây là giao diện test Confirm Modal "
        nhanNutXacNhan="Đồng ý xóa"
        nhanNutHuy="Hủy bỏ"
        xuLyXacNhan={() => {
          alert('Bạn đã bấm xác nhận thành công!');
          setMoXacNhan(false);
        }}
        dongModal={() => setMoXacNhan(false)}
      />
    </div>
  );
}