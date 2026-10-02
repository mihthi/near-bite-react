import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Utensils,
} from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa6';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-stone-200 bg-white text-stone-700">
      <div className="h-1 bg-amber-600" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr_0.85fr] lg:gap-16">
          <section>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-600 text-white shadow-sm shadow-amber-600/20">
                <Utensils className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-display text-2xl leading-none text-stone-900">Bếp Việt</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-700">
                  Hương vị thân quen
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-sm text-sm leading-6 text-stone-500">
              Những món ăn Việt được phục vụ bằng sự tử tế.
            </p>

            <div className="mt-7 flex items-center gap-2" aria-label="Theo dõi chúng tôi">
              <span className="mr-2 text-xs font-semibold uppercase tracking-[0.12em] text-stone-400">
                Theo dõi chúng tôi
              </span>
              <a
                aria-label="Facebook"
                href="#facebook"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 text-stone-500 transition-colors hover:border-amber-600 hover:bg-amber-600 hover:text-white"
              >
                <FaFacebookF className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                aria-label="TikTok"
                href="#tiktok"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 text-stone-500 transition-colors hover:border-amber-600 hover:bg-amber-600 hover:text-white"
              >
                <FaTiktok className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                aria-label="Instagram"
                href="#instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 text-stone-500 transition-colors hover:border-amber-600 hover:bg-amber-600 hover:text-white"
              >
                <FaInstagram className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-stone-900">
              Địa chỉ & liên hệ
            </h2>
            <div className="mt-5 space-y-4 text-sm text-stone-600">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
                <p>
                  273 An Dương Vương 
                  <br />
                  Phường Chợ Quán, Hồ Chí Minh
                </p>
              </div>
              <a className="flex items-center gap-3 transition-colors hover:text-amber-700" href="mailto:hello@bepviet.vn">
                <Mail className="h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
                hello@bepviet.vn
              </a>
              <a className="flex items-center gap-3 transition-colors hover:text-amber-700" href="tel:+842812345678">
                <Phone className="h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
                Hotline: 028 1234 5678
              </a>
            </div>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-stone-900">
              Giờ mở cửa
            </h2>
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                  <Clock3 className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-lg font-bold tracking-tight text-stone-900">15:00 – 22:30</p>
                  <p className="mt-1 text-xs text-stone-500">Mở cửa mỗi ngày</p>
                </div>
              </div>
              <a
                href="mailto:hello@bepviet.vn"
                className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-amber-700 transition-colors hover:text-amber-800"
              >
                Liên hệ đặt bàn
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </section>
        </div>

        <div className="mt-10 flex flex-col items-end gap-2 border-t border-stone-200 pt-5 text-xs text-stone-400">
          <span>© 2026 Bếp Việt</span>
        </div>
      </div>
    </footer>
  );
}
