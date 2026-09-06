# 🏠 UyBozor - Ko'chmas Mulk Portali (Next.js 16 + React 19 + Tailwind CSS)

O'zbekistonda uylarni **ijaraga olish** va **sotib olish** bo'yicha zamonaviy, tezkor va qulay veb-platforma.

## 🚀 Texnologiyalar
- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Kutubxona**: [React 19](https://react.dev/)
- **Stillar**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Ikonalar**: [Lucide React](https://lucide.dev/)
- **Til**: TypeScript
- **Konfiguratsiya**: Vercel uchun to'liq sozlangan (`vercel.json`, `vercel.config.json`)

---

## ✨ Asosiy Imkoniyatlar

1. **🏠 Bosh Sahifa (Home)**:
   - Zamonaviy Hero qismi va interaktiv qidiruv vidjeti (Ijara / Sotuv tanlovi)
   - Shaharlar, narxlar, xonalar soni bo'yicha tezkor filter
   - Saralangan va eng yangi e'lonlar kartochkalari
   - Kvartiralar, novostroykalar, hovlilar va tijorat maydonlari toifalari
   - Ishlaydigan onlayn **Ipoteka Kalkulyatori**

2. **🔍 E'lonlar Katalogi (`/properties`)**:
   - Jonli filtrlash (Ijara/Sotuv, shahar, mulk turi, narx oralig'i, maydon, xonalar, qulayliklar)
   - Saralash: yangilar, arzonlar, qimmatlar, maydon bo'yicha
   - Ko'rinish rejimlari: Katakchalar (Grid) va Ro'yxat (List)

3. **🏢 Uyning Batafsil Sahifasi (`/properties/[id]`)**:
   - Katta rasm galereyasi va to'liq ekranda ko'rish (Lightbox)
   - Barcha texnik ko'rsatkichlar (maydon, xonalar, qavat, ta'mir holati, qurilgan yili)
   - Mavjud qulayliklar (Wi-Fi, konditsioner, mebel, lift va h.k.)
   - Joylashuv va xarita simulyatsiyasi
   - Sotuvdagi uylar uchun avtomatik hisoblangan Ipoteka kalkulyatori
   - Mulk egasi / Rieltor bilan tezkor aloqa (Telefon, Telegram va so'rov qoldirish formasi)

4. **➕ Yangi E'lon Joylashtirish (`/add-property`)**:
   - 0% komissiya bilan foydalanuvchilar o'z uylarini ijaraga yoki sotuvga qo'yish formasi
   - Ma'lumotlar kiritilishi bilan darhol katalogga qo'shiladi (LocalStorage orqali saqlanadi)

5. **❤️ Sevimlilar (`/favorites`)**:
   - Yoqqan uylarni bir tugma bilan saqlash va boshqarish

6. **⚖️ Yonma-yon Solishtirish (`/compare`)**:
   - 4 tagacha uyni bir vaqtning o'zida narx, maydon, xonalar, ta'mir va sharoitlar bo'yicha taqqoslash jadvali

7. **💵 Valyuta almashtirish**:
   - AQSh Dollari ($ USD) va O'zbekiston So'mi (UZS) o'rtasida bir zumda narxlarni qayta hisoblash

---

## 🛠️ Loyihani Ishga Tushirish

### 1. Lokal rejimda ishga tushirish (Development):
```bash
npm run dev
```
Brauzeringizda oching: [http://localhost:3000](http://localhost:3000)

### 2. Ishlab chiqarish uchun yig'ish (Production Build):
```bash
npm run build
npm start
```

---

## ☁️ Vercel-ga Joylashtirish (Deploy)

Loyiha Vercel platformasiga 100% moslashtirilgan. Unda `vercel.json` va `vercel.config.json` fayllari mavjud.

### Vercel CLI orqali:
```bash
npx vercel
```
yoki GitHub repozitoriysiga yuklab, [vercel.com](https://vercel.com) da "Import Project" tugmasi orqali avtomatik joylashtirishingiz mumkin.
