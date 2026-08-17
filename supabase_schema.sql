-- Agar sizda `reports` jadvali allaqachon mavjud bo'lsa, unga yangi qo'shilgan `address` (manzil) ustunini qo'shish uchun quyidagi qatorni ishga tushiring:
ALTER TABLE reports ADD COLUMN IF NOT EXISTS address TEXT;

-- =========================================================================

-- Agar siz bazani endi boshidan yaratayotgan bo'lsangiz, quyidagi to'liq kodni ishlatishingiz mumkin:
CREATE TABLE IF NOT EXISTS reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  address TEXT,
  image_url TEXT,
  status TEXT DEFAULT 'Yangi',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS (Row Level Security) ni o'chirish (yoki public qilish)
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Barcha foydalanuvchilar o'qiy olishi uchun:
CREATE POLICY "Public can view reports" ON reports
  FOR SELECT USING (true);

-- Barcha foydalanuvchilar yoza olishi uchun (test rejimida):
CREATE POLICY "Public can insert reports" ON reports
  FOR INSERT WITH CHECK (true);
