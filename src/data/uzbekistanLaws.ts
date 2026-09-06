export interface LegalDocument {
  id: string;
  title: string;
  code: string;
  description: string;
  articles: {
    number: string;
    title: string;
    summary: string;
  }[];
}

export const UZBEKISTAN_REAL_ESTATE_LAWS: LegalDocument[] = [
  {
    id: 'civil-code-sale',
    title: "O'zbekiston Respublikasi Fuqarolik Kodeksi (Ko'chmas mulk oldi-sotdisi)",
    code: 'O\'zR FK 54-bob (479-488 moddalar)',
    description: "Ko'chmas mulkni sotish shartnomasi, uning yozma shakli, narxi, notarial tasdiqlash va davlat ro'yxatidan o'tkazishning qat'iy qonuniy asoslari.",
    articles: [
      {
        number: '479-modda',
        title: "Ko'chmas mulkni sotish shartnomasining shakli",
        summary: "Ko'chmas mulkni sotish shartnomasi taraflar imzolaydigan yozma shaklda tuziladi va notarial tasdiqlanib, davlat ro'yxatidan o'tkazilishi shart. Ushbu qoidaga rioya etmaslik shartnomaning haqiqiy emasligiga olib keladi.",
      },
      {
        number: '481-modda',
        title: "Ko'chmas mulkka bo'lgan mulk huquqining o'tishini davlat ro'yxatidan o'tkazish",
        summary: "Ko'chmas mulk oldi-sotdi shartnomasi bo'yicha mulk huquqi xaridorga ushbu huquq tegishli davlat reyestrida (Kadastr agentligi) davlat ro'yxatidan o'tkazilgan paytdan boshlab o'tadi.",
      },
      {
        number: '483-modda',
        title: "Ko'chmas mulk bahosi",
        summary: "Ko'chmas mulkni sotish shartnomasida mulkning bahosi ko'rsatilishi shart. Agar baho kelishilmagan bo'lsa, shartnoma tuzilmagan hisoblanadi.",
      },
      {
        number: '487-modda',
        title: "Tegishli sifatga ega bo'lmagan ko'chmas mulk topshirilgan holatdagi oqibatlar",
        summary: "Agar sotuvchi shartnoma shartlariga mos kelmaydigan, yashirin nuqsonlarga ega ko'chmas mulkni topshirsa, xaridor narxni mutanosib ravishda kamaytirishni yoki kamchiliklarni bartaraf etishni talab qilishga haqli.",
      },
    ],
  },
  {
    id: 'civil-code-rent',
    title: "O'zbekiston Respublikasi Fuqarolik Kodeksi (Mulk ijarasi)",
    code: 'O\'zR FK 34-bob (535-557 moddalar)',
    description: "Turar-joy va noturar joylarni ijaraga berish, ijara haqi, shartnomaning amal qilish muddati, mulkni saqlash va ta'mirlash qoidalari.",
    articles: [
      {
        number: '539-modda',
        title: "Ijara shartnomasining shakli",
        summary: "Ko'chmas mulk ijarasi shartnomasi yozma shaklda tuziladi. Agar ijara muddati bir yildan ortiq bo'lsa, u davlat ro'yxatidan o'tkazilishi talab etiladi.",
      },
      {
        number: '544-modda',
        title: "Ijara haqi",
        summary: "Ijarachi mol-mulkdan foydalanganlik uchun haqni shartnomada belgilangan tartibda va muddatlarda o'z vaqtida to'lashi shart. Ijara haqi miqdori taraflarning kelishuvi bilan o'zgartiriladi.",
      },
      {
        number: '547-modda',
        title: "Ijara shartnomasi bo'yicha taraflarning mulkni ta'mirlash majburiyatlari",
        summary: "Ijaraga beruvchi o'z hisobidan asosiy (kapital) ta'mirlashni, ijarachi esa joriy ta'mirlashni amalga oshirishga va mulkni soz holatda saqlashga majbur (agar shartnomada boshqacha ko'rsatilmagan bo'lsa).",
      },
    ],
  },
  {
    id: 'tax-code-rent',
    title: "O'zbekiston Respublikasi Soliq Qonunchiligi (ijara.soliq.uz)",
    code: 'O\'zR Soliq Kodeksi 375-modda va Vazirlar Mahkamasi qarorlari',
    description: "Jismoniy va yuridik shaxslar o'rtasidagi turar-joy ijara shartnomalarini davlat soliq xizmati organlarida hisobga qo'yish majburiyati.",
    articles: [
      {
        number: 'ijara.soliq.uz',
        title: "Ijara shartnomasini soliq organlarida majburiy ro'yxatdan o'tkazish",
        summary: "O'zbekistonda ko'chmas mulkni ijaraga berish bo'yicha shartnomalar soliq organlarining maxsus axborot tizimi (ijara.soliq.uz yoki Soliq mobil ilovasi) orqali hisobga qo'yilishi shart. Bu ijarachi va ijaraga beruvchi uchun qonuniy himoya kafolatidir.",
      },
      {
        number: 'Imtiyozlar',
        title: "Talabalar uchun ijara solig'i imtiyozi",
        summary: "Oliy ta'lim muassasalarida tahsil olayotgan talabalarga turar-joyni ijaraga bergan jismoniy shaxslar ushbu daromadlari bo'yicha jismoniy shaxslardan olinadigan daromad solig'idan ozod etiladi.",
      },
    ],
  },
  {
    id: 'housing-code',
    title: "O'zbekiston Respublikasi Uy-joy Kodeksi",
    code: 'O\'zR Uy-joy Kodeksi',
    description: "Fuqarolarning uy-joy huquqlarini amalga oshirish, turar-joy fondidan foydalanish va qo'shnilar huquqlariga rioya etish normalari.",
    articles: [
      {
        number: '13-modda',
        title: "Fuqarolarning turar-joyga bo'lgan mulk huquqi",
        summary: "Fuqarolar qonunchilikka muvofiq har qanday turar joyga cheklanmagan miqdorda va qiymatda mulk huquqiga ega bo'lishlari mumkin. Mulk daxlsizdir va qonun himoyasidadir.",
      },
      {
        number: '24-modda',
        title: "Turar joydan foydalanish qoidalari",
        summary: "Turar joy faqat fuqarolarning yashashi uchun mo'ljallangan. Undan foydalanishda qo'shnilarning qonuniy manfaatlari, yong'in xavfsizligi, sanitariya-gigiyena qoidalariga rioya etilishi shart.",
      },
    ],
  },
];

export const SAFETY_TIPS = [
  {
    title: "Kadastr hujjatini doimo tekshiring",
    desc: "Mulk sotib olishdan yoki uzoq muddatga ijaraga olishdan oldin, mulkdorning kadastr pasporti va Davlat reyestridan elektron ko'chirmasini (Davlat xizmatlari portali - my.gov.uz orqali) shaxsan tekshiring.",
  },
  {
    title: "Notarial tasdiqlanmagan oldi-sotdiga pul to'lamang",
    desc: "Uy sotib olayotganda, barcha to'lovlar notarius huzurida rasmiy oldi-sotdi shartnomasi imzolangandan keyin yoki notarius depozit hisob raqami orqali o'tkazilishi eng xavfsiz yo'ldir.",
  },
  {
    title: "Ijara shartnomasini soliqda (ijara.soliq.uz) hisobga qo'ying",
    desc: "Bu ijarachini kutilmagan ko'chirishlardan, ijaraga beruvchini esa mol-mulkiga yetkazilishi mumkin bo'lgan zararlardan qonuniy himoya qiladi.",
  },
  {
    title: "Kommunal to'lovlar qarzdorligi yo'qligiga ishonch hosil qiling",
    desc: "Elektr energiyasi (HET), gaz (Hududgazta'minot), sovuq va issiq suv, chiqindi va maishiy xizmatlardan qarzdorlik yo'qligi to'g'risida MIB va billing tizimi kvitansiyalarini talab qiling.",
  },
];
