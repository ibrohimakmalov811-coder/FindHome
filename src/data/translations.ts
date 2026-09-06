export type Language = 'uz' | 'ru' | 'en' | 'zh';

export interface TranslationDict {
  // Navigation
  nav_home: string;
  nav_catalog: string;
  nav_rent: string;
  nav_sale: string;
  nav_security: string;
  nav_compare: string;
  nav_favorites: string;
  nav_login: string;
  nav_register: string;
  nav_logout: string;
  nav_add_property: string;
  nav_admin_panel: string;
  nav_portal_subtitle: string;
  
  // Roles
  role_admin: string;
  role_owner: string;
  role_realtor: string;
  role_buyer: string;
  role_user: string;

  // Hero Section
  hero_badge: string;
  hero_title_1: string;
  hero_title_2: string;
  hero_subtitle: string;
  hero_stat_active: string;
  hero_stat_legal: string;
  hero_stat_commission: string;
  hero_stat_support: string;

  // Search Widget
  search_tab_rent: string;
  search_tab_sale: string;
  search_city_label: string;
  search_all_cities: string;
  search_type_label: string;
  search_all_types: string;
  search_rooms_label: string;
  search_all_rooms: string;
  search_rooms_suffix: string;
  search_rooms_4plus: string;
  search_max_price: string;
  search_button: string;

  // Property Types
  type_apartment: string;
  type_house: string;
  type_villa: string;
  type_commercial: string;
  type_new_building: string;

  // Legal Banner
  legal_badge: string;
  legal_title: string;
  legal_desc: string;
  legal_button: string;

  // Categories
  cat_title: string;
  cat_subtitle: string;
  cat_all: string;
  cat_view_ads: string;
  cat_apartment_desc: string;
  cat_apartment_badge: string;
  cat_new_desc: string;
  cat_new_badge: string;
  cat_villa_desc: string;
  cat_villa_badge: string;
  cat_comm_desc: string;
  cat_comm_badge: string;

  // Featured & Listings
  featured_badge: string;
  featured_title: string;
  featured_view_all: string;
  rent_badge: string;
  rent_title: string;
  rent_subtitle: string;
  rent_view_all: string;

  // Property Card
  card_verified: string;
  card_vip: string;
  card_cadastre_ready: string;
  card_per_month: string;
  card_per_day: string;
  card_details: string;
  card_rooms: string;
  card_area: string;
  card_floor: string;

  // Trust & CTA Section
  trust_badge: string;
  trust_title: string;
  trust_desc: string;
  trust_point_1: string;
  trust_point_2: string;
  trust_point_3: string;
  cta_title: string;
  cta_desc: string;
  cta_button: string;

  // Mortgage Calculator
  mortgage_badge: string;
  mortgage_title: string;
  mortgage_subtitle: string;

  // Footer
  footer_desc: string;
  footer_sections: string;
  footer_rules: string;
  footer_security: string;
  footer_contacts: string;
  footer_rights: string;
}

export const translations: Record<Language, TranslationDict> = {
  uz: {
    // Navigation
    nav_home: 'Bosh sahifa',
    nav_catalog: 'Katalog',
    nav_rent: 'Ijara',
    nav_sale: 'Sotuv',
    nav_security: 'Xavfsizlik & Qonun',
    nav_compare: 'Taqqoslash',
    nav_favorites: 'Sevimlilar',
    nav_login: 'Kirish',
    nav_register: 'Ro\'yxatdan o\'tish',
    nav_logout: 'Chiqish',
    nav_add_property: "+ E'lon berish",
    nav_admin_panel: 'Admin Panel',
    nav_portal_subtitle: "Ko'chmas mulk portali",

    // Roles
    role_admin: 'Administrator',
    role_owner: 'Mulk egasi',
    role_realtor: 'Rieltor',
    role_buyer: 'Xaridor / Ijarachi',
    role_user: 'Foydalanuvchi',

    // Hero Section
    hero_badge: "O'zbekistondagi #1 Zamonaviy Ko'chmas Mulk Markazi",
    hero_title_1: "Orzuingizdagi uyni toping:",
    hero_title_2: "Ijara yoki Sotib olish",
    hero_subtitle: "+ dan ortiq tekshirilgan e'lonlar, qulay narxlar va to'g'ridan-to'g'ri uy egalari bilan bog'lanish imkoniyati.",
    hero_stat_active: "Faol e'lonlar",
    hero_stat_legal: "Qonuniy himoya",
    hero_stat_commission: "Vositachilik to'lovi",
    hero_stat_support: "Tezkor aloqa",

    // Search Widget
    search_tab_rent: '🔑 Ijaraga olish',
    search_tab_sale: '🏠 Sotib olish',
    search_city_label: 'Shahar / Viloyat',
    search_all_cities: 'Barcha shaharlar',
    search_type_label: 'Mulk turi',
    search_all_types: 'Barcha turlar',
    search_rooms_label: 'Xonalar soni',
    search_all_rooms: 'Istalgan',
    search_rooms_suffix: 'xona',
    search_rooms_4plus: '4+ xona',
    search_max_price: 'Maksimal narx ($)',
    search_button: "Qidirish",

    // Property Types
    type_apartment: 'Kvartira',
    type_house: 'Hovli',
    type_villa: 'Kottej / Villa',
    type_commercial: 'Tijorat maydoni',
    type_new_building: 'Novostroyka',

    // Legal Banner
    legal_badge: 'Davlat Standartlari & Kafolat',
    legal_title: "O'zbekiston Qonunchiligiga To'liq Mos Xavfsiz Bitimlar",
    legal_desc: "Fuqarolik va Uy-joy Kodeksi talablari, ijara.soliq.uz ro'yxati va rasmiy namunaviy shartnomalar.",
    legal_button: 'Qoidalar va Shartnomalar',

    // Categories
    cat_title: 'Toifalar',
    cat_subtitle: "Mulk toifalari bo'yicha qidiruv",
    cat_all: 'Barcha toifalarni ko\'rish',
    cat_view_ads: "E'lonlarni ko'rish",
    cat_apartment_desc: 'Shinam shahar xonadonlari',
    cat_apartment_badge: 'Ijara va Sotuv',
    cat_new_desc: 'Yangi zamonaviy majmualar',
    cat_new_badge: 'Ipotekaga ham',
    cat_villa_desc: 'Bog\'li va basseynli kottejlar',
    cat_villa_badge: 'Katta oilalar uchun',
    cat_comm_desc: 'Ofislar va do\'konlar',
    cat_comm_badge: 'Biznes uchun',

    // Featured & Listings
    featured_badge: 'Tavsiya etamiz',
    featured_title: "Saralangan va eng ko'p ko'rilgan uylar",
    featured_view_all: "Barchasini ko'rish",
    rent_badge: 'Ijara bozori',
    rent_title: 'Shinam va qulay ijara xonadonlari',
    rent_subtitle: 'Toshkent, Samarqand va boshqa shaharlarda talabalar, oilalar va mehmonlar uchun eng so\'nggi takliflar',
    rent_view_all: "Barcha ijara e'lonlari",

    // Property Card
    card_verified: 'Tekshirilgan',
    card_vip: 'VIP',
    card_cadastre_ready: 'Kadastr bor',
    card_per_month: '/oy',
    card_per_day: '/kun',
    card_details: 'Batafsil',
    card_rooms: 'xona',
    card_area: 'm²',
    card_floor: 'qavat',

    // Trust & CTA Section
    trust_badge: 'Nega aynan UyBozor?',
    trust_title: "Ko'chmas mulk oldi-sotdisi va ijarasini xavfsiz bajaring",
    trust_desc: "Biz ko'chmas mulk bozoridagi ortiqcha qiyinchiliklarni bartaraf etamiz. Har bir e'lon haqiqiyligi tekshiriladi, to'lovlar shaffof va bevosita tomonlar o'rtasida amalga oshiriladi.",
    trust_point_1: '100% haqiqiy fotosuratlar va batafsil xususiyatlar',
    trust_point_2: 'Vositachisiz to\'g\'ridan-to\'g\'ri uy egasi bilan aloqa',
    trust_point_3: 'O\'zbekiston Qonunchiligi asosida tuzilgan shartnomalar',
    cta_title: "Uyingiz bormi? E'loningizni bepul joylashtiring!",
    cta_desc: 'Kvartirangizni ijaraga bering yoki hovlingizni soting. Minglab xaridorlar sizning taklifingizni kutmoqda.',
    cta_button: "Hoziroq bepul e'lon berish",

    // Mortgage Calculator
    mortgage_badge: 'Moliya va hisob-kitob',
    mortgage_title: 'Ipoteka kreditini onlayn hisoblang',
    mortgage_subtitle: "O'zingizga ma'qul narxdagi xonadon uchun boshlang'ich to'lov va oylik xarajatlarni darhol hisoblab oling.",

    // Footer
    footer_desc: "O'zbekistonda uylarni ijaraga olish va sotib olish bo'yicha eng ishonchli va zamonaviy ko'chmas mulk ekotizimi.",
    footer_sections: 'Bo\'limlar',
    footer_rules: 'Qoidalar',
    footer_security: 'Xavfsizlik portali',
    footer_contacts: 'Aloqa markazi',
    footer_rights: 'Barcha huquqlar himoyalangan.',
  },

  ru: {
    // Navigation
    nav_home: 'Главная',
    nav_catalog: 'Каталог',
    nav_rent: 'Аренда',
    nav_sale: 'Продажа',
    nav_security: 'Безопасность и Закон',
    nav_compare: 'Сравнение',
    nav_favorites: 'Избранное',
    nav_login: 'Войти',
    nav_register: 'Регистрация',
    nav_logout: 'Выйти',
    nav_add_property: '+ Подать объявление',
    nav_admin_panel: 'Панель администратора',
    nav_portal_subtitle: 'Портал недвижимости',

    // Roles
    role_admin: 'Администратор',
    role_owner: 'Собственник',
    role_realtor: 'Риелтор',
    role_buyer: 'Покупатель / Арендатор',
    role_user: 'Пользователь',

    // Hero Section
    hero_badge: 'Центр недвижимости №1 в Узбекистане',
    hero_title_1: 'Найдите дом своей мечты:',
    hero_title_2: 'Аренда или Покупка',
    hero_subtitle: '+ проверенных объявлений, выгодные цены и прямая связь с собственниками без посредников.',
    hero_stat_active: 'Активных объявлений',
    hero_stat_legal: 'Юридическая защита',
    hero_stat_commission: 'Комиссия сервиса',
    hero_stat_support: 'Быстрая поддержка',

    // Search Widget
    search_tab_rent: '🔑 Снять в аренду',
    search_tab_sale: '🏠 Купить недвижимость',
    search_city_label: 'Город / Регион',
    search_all_cities: 'Все города',
    search_type_label: 'Тип недвижимости',
    search_all_types: 'Все типы',
    search_rooms_label: 'Количество комнат',
    search_all_rooms: 'Любое',
    search_rooms_suffix: 'комн.',
    search_rooms_4plus: '4+ комн.',
    search_max_price: 'Макс. цена ($)',
    search_button: 'Найти',

    // Property Types
    type_apartment: 'Квартира',
    type_house: 'Дом / Участок',
    type_villa: 'Коттедж / Вилла',
    type_commercial: 'Коммерческая',
    type_new_building: 'Новостройка',

    // Legal Banner
    legal_badge: 'Госстандарты и Гарантии',
    legal_title: 'Безопасные сделки по законам Узбекистана',
    legal_desc: 'Требования ГК и ЖК РУз, учет в ijara.soliq.uz и официальные типовые договора.',
    legal_button: 'Правила и Договоры',

    // Categories
    cat_title: 'Категории',
    cat_subtitle: 'Поиск по категориям недвижимости',
    cat_all: 'Смотреть все категории',
    cat_view_ads: 'Смотреть объекты',
    cat_apartment_desc: 'Уютные городские квартиры',
    cat_apartment_badge: 'Аренда и Продажа',
    cat_new_desc: 'Современные жилые комплексы',
    cat_new_badge: 'Доступна ипотека',
    cat_villa_desc: 'Коттеджи с садом и бассейном',
    cat_villa_badge: 'Для больших семей',
    cat_comm_desc: 'Офисы и торговые площади',
    cat_comm_badge: 'Для бизнеса',

    // Featured & Listings
    featured_badge: 'Рекомендуем',
    featured_title: 'Избранные и популярные объекты',
    featured_view_all: 'Смотреть все',
    rent_badge: 'Рынок аренды',
    rent_title: 'Комфортное жилье в аренду',
    rent_subtitle: 'Свежие предложения для семей, студентов и гостей столицы и регионов',
    rent_view_all: 'Все объявления аренды',

    // Property Card
    card_verified: 'Проверено',
    card_vip: 'VIP',
    card_cadastre_ready: 'Кадастр готов',
    card_per_month: '/мес',
    card_per_day: '/день',
    card_details: 'Подробнее',
    card_rooms: 'комн.',
    card_area: 'м²',
    card_floor: 'этаж',

    // Trust & CTA Section
    trust_badge: 'Почему UyBozor?',
    trust_title: 'Безопасная покупка и аренда недвижимости',
    trust_desc: 'Мы устраняем сложности на рынке недвижимости. Каждое объявление проверяется, расчеты прозрачны и производятся напрямую между сторонами.',
    trust_point_1: '100% реальные фотографии и точные параметры',
    trust_point_2: 'Прямая связь с владельцем без посредников',
    trust_point_3: 'Договоры в полном соответствии с законами Узбекистана',
    cta_title: 'Есть жилье? Разместите объявление бесплатно!',
    cta_desc: 'Сдайте квартиру или продайте дом. Тысячи покупателей ждут ваше предложение.',
    cta_button: 'Разместить объявление сейчас',

    // Mortgage Calculator
    mortgage_badge: 'Финансы и расчет',
    mortgage_title: 'Онлайн-калькулятор ипотеки',
    mortgage_subtitle: 'Рассчитайте первоначальный взнос и ежемесячный платеж для выбранной недвижимости.',

    // Footer
    footer_desc: 'Надежная экосистема недвижимости для аренды и покупки жилья в Узбекистане.',
    footer_sections: 'Разделы',
    footer_rules: 'Правила',
    footer_security: 'Портал безопасности',
    footer_contacts: 'Контакты',
    footer_rights: 'Все права защищены.',
  },

  en: {
    // Navigation
    nav_home: 'Home',
    nav_catalog: 'Catalog',
    nav_rent: 'Rent',
    nav_sale: 'Buy',
    nav_security: 'Security & Laws',
    nav_compare: 'Compare',
    nav_favorites: 'Favorites',
    nav_login: 'Sign In',
    nav_register: 'Register',
    nav_logout: 'Log Out',
    nav_add_property: '+ Post Property',
    nav_admin_panel: 'Admin Dashboard',
    nav_portal_subtitle: 'Real Estate Marketplace',

    // Roles
    role_admin: 'Administrator',
    role_owner: 'Property Owner',
    role_realtor: 'Real Estate Agent',
    role_buyer: 'Buyer / Tenant',
    role_user: 'User',

    // Hero Section
    hero_badge: '#1 Modern Real Estate Platform in Uzbekistan',
    hero_title_1: 'Find your ideal home:',
    hero_title_2: 'Rent or Buy Properties',
    hero_subtitle: '+ verified listings, market-best rates, and direct communication with verified property owners.',
    hero_stat_active: 'Active Listings',
    hero_stat_legal: 'Legal Protection',
    hero_stat_commission: 'Service Fee',
    hero_stat_support: 'Fast Support',

    // Search Widget
    search_tab_rent: '🔑 For Rent',
    search_tab_sale: '🏠 For Sale',
    search_city_label: 'City / Region',
    search_all_cities: 'All Cities',
    search_type_label: 'Property Type',
    search_all_types: 'All Types',
    search_rooms_label: 'Number of Rooms',
    search_all_rooms: 'Any',
    search_rooms_suffix: 'rooms',
    search_rooms_4plus: '4+ rooms',
    search_max_price: 'Max Price ($)',
    search_button: 'Search Now',

    // Property Types
    type_apartment: 'Apartment',
    type_house: 'Private House',
    type_villa: 'Villa / Cottage',
    type_commercial: 'Commercial Space',
    type_new_building: 'New Development',

    // Legal Banner
    legal_badge: 'State Compliance & Guarantees',
    legal_title: 'Secure Real Estate Deals Grounded in Uzbekistan Law',
    legal_desc: 'Compliant with Civil and Housing Codes, registered via ijara.soliq.uz with official lease agreement templates.',
    legal_button: 'Rules & Agreements',

    // Categories
    cat_title: 'Categories',
    cat_subtitle: 'Browse by Property Category',
    cat_all: 'View All Categories',
    cat_view_ads: 'Browse Listings',
    cat_apartment_desc: 'Cozy urban apartments & flats',
    cat_apartment_badge: 'Rent & Sale',
    cat_new_desc: 'Brand new modern residential complexes',
    cat_new_badge: 'Mortgage eligible',
    cat_villa_desc: 'Spacious cottages with gardens & pools',
    cat_villa_badge: 'For large families',
    cat_comm_desc: 'Offices, shops & retail units',
    cat_comm_badge: 'Commercial',

    // Featured & Listings
    featured_badge: 'Featured Selection',
    featured_title: 'Top Rated & Most Viewed Properties',
    featured_view_all: 'View All',
    rent_badge: 'Rental Market',
    rent_title: 'Comfortable Rental Homes',
    rent_subtitle: 'Latest listings in Tashkent, Samarkand and across Uzbekistan for expats, families and students',
    rent_view_all: 'All Rental Listings',

    // Property Card
    card_verified: 'Verified',
    card_vip: 'VIP',
    card_cadastre_ready: 'Cadastre Ready',
    card_per_month: '/mo',
    card_per_day: '/day',
    card_details: 'View Details',
    card_rooms: 'rooms',
    card_area: 'm²',
    card_floor: 'floor',

    // Trust & CTA Section
    trust_badge: 'Why Choose UyBozor?',
    trust_title: 'Safe and Transparent Real Estate Transactions',
    trust_desc: 'We eliminate hassle and hidden fees. Every listing is verified, and payments and agreements are made directly between buyer and seller.',
    trust_point_1: '100% genuine photos and verified dimensions',
    trust_point_2: 'Direct communication with owners without middleman fees',
    trust_point_3: 'Standardized legal agreements under Uzbekistan Law',
    cta_title: 'Own a property? Post your ad for free!',
    cta_desc: 'Rent out your apartment or sell your house. Thousands of active buyers are waiting for your offer.',
    cta_button: 'Post Free Listing Now',

    // Mortgage Calculator
    mortgage_badge: 'Financial Calculator',
    mortgage_title: 'Calculate Mortgage Online',
    mortgage_subtitle: 'Quickly estimate your down payment and monthly payment for your desired real estate.',

    // Footer
    footer_desc: 'The premier real estate marketplace for renting and buying apartments and homes in Uzbekistan.',
    footer_sections: 'Sections',
    footer_rules: 'Regulations',
    footer_security: 'Security Hub',
    footer_contacts: 'Support',
    footer_rights: 'All rights reserved.',
  },

  zh: {
    // Navigation
    nav_home: '首页',
    nav_catalog: '房源目录',
    nav_rent: '房屋租赁',
    nav_sale: '房屋买卖',
    nav_security: '安全与法律',
    nav_compare: '房源对比',
    nav_favorites: '我的收藏',
    nav_login: '登录',
    nav_register: '注册',
    nav_logout: '退出登录',
    nav_add_property: '+ 免费发布房源',
    nav_admin_panel: '管理控制台',
    nav_portal_subtitle: '乌兹别克斯坦房地产门户',

    // Roles
    role_admin: '系统管理员',
    role_owner: '房东 / 业主',
    role_realtor: '房产经纪人',
    role_buyer: '买家 / 租客',
    role_user: '用户',

    // Hero Section
    hero_badge: '乌兹别克斯坦 #1 现代化房地产服务中心',
    hero_title_1: '寻找您的理想家园：',
    hero_title_2: '房屋租赁与买卖',
    hero_subtitle: '+ 真实认证房源，优惠价格，直接与业主沟通，免除中介繁琐。',
    hero_stat_active: '在架房源',
    hero_stat_legal: '法律保障',
    hero_stat_commission: '平台服务费',
    hero_stat_support: '全天候支持',

    // Search Widget
    search_tab_rent: '🔑 我要租房',
    search_tab_sale: '🏠 我要买房',
    search_city_label: '城市 / 地区',
    search_all_cities: '所有城市',
    search_type_label: '房源类型',
    search_all_types: '所有类型',
    search_rooms_label: '居室数量',
    search_all_rooms: '不限',
    search_rooms_suffix: '居室',
    search_rooms_4plus: '4居室及以上',
    search_max_price: '最高价格 ($)',
    search_button: '立即搜索',

    // Property Types
    type_apartment: '公寓套房',
    type_house: '独栋住宅 / 庭院',
    type_villa: '高端别墅',
    type_commercial: '商业写字楼 / 商铺',
    type_new_building: '新楼盘 / 期房',

    // Legal Banner
    legal_badge: '国家法定标准与履约保障',
    legal_title: '完全符合乌兹别克斯坦法律的安全交易',
    legal_desc: '严格遵循民法典与住房法典规范，接入 ijara.soliq.uz 税务登记，提供官方正规合同范本。',
    legal_button: '法律规范与合同',

    // Categories
    cat_title: '房源分类',
    cat_subtitle: '按房源类型精准查找',
    cat_all: '查看所有分类',
    cat_view_ads: '浏览房源',
    cat_apartment_desc: '便利舒适的市区精品公寓',
    cat_apartment_badge: '租售兼顾',
    cat_new_desc: '现代化配套齐全的全新住宅区',
    cat_new_badge: '支持按揭贷款',
    cat_villa_desc: '带私家花园和泳池的高端独栋',
    cat_villa_badge: '适合大家庭居住',
    cat_comm_desc: '写字楼办公室、临街旺铺',
    cat_comm_badge: '商业投资首选',

    // Featured & Listings
    featured_badge: '精选推荐',
    featured_title: '高热度与高品质精选房源',
    featured_view_all: '查看全部',
    rent_badge: '租赁专区',
    rent_title: '舒适便利的高品质租房推荐',
    rent_subtitle: '为外籍人士、家庭及学生提供塔什干及各大城市最新优质出租房源',
    rent_view_all: '查看所有出租房源',

    // Property Card
    card_verified: '已官方认证',
    card_vip: 'VIP 特推',
    card_cadastre_ready: '产权地籍齐全',
    card_per_month: '/月',
    card_per_day: '/天',
    card_details: '查看详情',
    card_rooms: '室',
    card_area: '平方米',
    card_floor: '楼层',

    // Trust & CTA Section
    trust_badge: '为什么选择 UyBozor？',
    trust_title: '安全透明的房产买卖与租赁保障',
    trust_desc: '我们致力于消除房产交易中的隐形费用与欺诈风险。每套房源均经核实，资金交易清晰，买卖双方直接签约沟通。',
    trust_point_1: '100% 实地实景拍摄，尺寸数据精准核实',
    trust_point_2: '直接与房东业主对话，无额外中介差价',
    trust_point_3: '依乌兹别克斯坦法律制定的标准法律合同',
    cta_title: '有房出租或出售？立即免费发布！',
    cta_desc: '出租您的闲置公寓或出售住宅，成千上万买家租客正在寻找您的房源。',
    cta_button: '立即免费发布房源',

    // Mortgage Calculator
    mortgage_badge: '金融与预算测算',
    mortgage_title: '房贷月供在线计算器',
    mortgage_subtitle: '输入意向房源价格，即刻计算首付比例及每月还款预算。',

    // Footer
    footer_desc: '乌兹别克斯坦领先的房地产线上综合服务平台，提供安全便捷的租赁与买卖服务。',
    footer_sections: '网站栏目',
    footer_rules: '使用指南',
    footer_security: '安全合规中心',
    footer_contacts: '客户服务中心',
    footer_rights: '版权所有，保留一切权利。',
  },
};
