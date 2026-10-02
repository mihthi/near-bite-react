export interface MonAn {
  id: string;
  ten: string;     
  phanLoai: string;    
  gia: number;       
}

export type CheDoXem = 'thuc-don' | 'quan-ly';

export type ThongBaoThanhCong = {
  dangMo: boolean;
  noiDung: string;
};