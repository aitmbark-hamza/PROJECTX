export const galleryCategories = {
  fr: ['Plats', 'Convives', 'Buffets'],
  en: ['Dishes', 'Guests', 'Buffets'],
  ar: ['أطباق', 'ضيوف', 'بوفيهات'],
};

export const categoryKeys = ['Plats', 'Convives', 'Buffets'];

const galleryData = [
  { file: 4, category: 'Plats', title: { fr: 'Assiette Gastronomique', en: 'Gourmet Plate', ar: 'طبق شهي' } },
  { file: 5, category: 'Plats', title: { fr: 'Plat Signature', en: 'Signature Dish', ar: 'طبق مميز' } },
  { file: 6, category: 'Buffets', title: { fr: 'Buffet Élégant', en: 'Elegant Buffet', ar: 'بوفيه أنيق' } },
  { file: 10, category: 'Buffets', title: { fr: "Buffet d'Exception", en: 'Exceptional Buffet', ar: 'بوفيه استثنائي' } },
  { file: 14, category: 'Plats', title: { fr: 'Plat Raffiné', en: 'Refined Dish', ar: 'طبق راقٍ' } },
  { file: 15, category: 'Convives', title: { fr: "Table d'Invites", en: 'Guests Table', ar: 'طاولة ضيوف' } },
  { file: 17, category: 'Buffets', title: { fr: 'Buffet Gastronomique', en: 'Gourmet Buffet', ar: 'بوفيه شهي' } },
  { file: 18, category: 'Buffets', title: { fr: 'Buffet Prestige', en: 'Premium Buffet', ar: 'بوفيه فاخر' } },
  { file: 25, category: 'Buffets', title: { fr: 'Buffet Prestige', en: 'Premium Buffet', ar: 'بوفيه فاخر' } },
  { file: 26, category: 'Plats', title: { fr: 'Création Culinaire', en: 'Culinary Creation', ar: 'إبداع طهوي' } },
  { file: 29, category: 'Convives', title: { fr: 'Mets Fins', en: 'Fine Bites', ar: 'مقبلات فاخرة' } },
  { file: 30, category: 'Plats', title: { fr: 'Salon de Réception', en: 'Reception Hall', ar: 'صالون استقبال' } },
  { file: 31, category: 'Convives', title: { fr: "Soirée d'Exception", en: 'Exceptional Evening', ar: 'أمسية استثنائية' } },
  { file: 33, category: 'Buffets', title: { fr: 'Buffet Royale', en: 'Royal Buffet', ar: 'بوفيه ملكي' } },
  { file: 34, category: 'Convives', title: { fr: 'Invités Réunis', en: 'Guests Gathering', ar: 'تجمع الضيوف' } },
  { file: 35, category: 'Convives', title: { fr: 'Ambiance Festive', en: 'Festive Ambiance', ar: 'أجواء احتفالية' } },
  { file: 36, category: 'Convives', title: { fr: 'Soirée Élégante', en: 'Elegant Evening', ar: 'أمسية أنيقة' } },
  { file: 37, category: 'Plats', title: { fr: 'Assiette Signature', en: 'Signature Plate', ar: 'طبق التوقيع' } },
  { file: 38, category: 'Convives', title: { fr: 'Convives Attablés', en: 'Dining Guests', ar: 'ضيوف على العشاء' } },
  { file: 39, category: 'Convives', title: { fr: 'Soirée Prestige', en: 'Prestige Evening', ar: 'أمسية برستيج' } },
  { file: 40, category: 'Convives', title: { fr: 'Dîner de Gala', en: 'Gala Dinner', ar: 'عشاء غالا' } },
  { file: 41, category: 'Convives', title: { fr: 'Grande Tablée', en: 'Grand Table', ar: 'طاولة كبيرة' } },
  { file: 42, category: 'Convives', title: { fr: 'Réception Privée', en: 'Private Reception', ar: 'استقبال خاص' } },
  { file: 43, category: 'Convives', title: { fr: 'Conviviale', en: 'Friendly Gathering', ar: 'لقاء ودي' } },
  { file: 44, category: 'Convives', title: { fr: 'Ambiance Chaleureuse', en: 'Warm Ambiance', ar: 'أجواء دافئة' } },
  { file: 45, category: 'Plats', title: { fr: 'Plat Gastronomique', en: 'Gourmet Dish', ar: 'طبق مذاق' } },
  { file: 46, category: 'Plats', title: { fr: 'Dégustation', en: 'Tasting', ar: 'تذوق' } },
  { file: 47, category: 'Plats', title: { fr: 'Mise en Bouche', en: 'Amuse Bouche', ar: 'مقبلات' } },
  { file: 48, category: 'Convives', title: { fr: 'Table Habillée', en: 'Dressed Table', ar: 'طاولة مُنسّقة' } },
  { file: 49, category: 'Convives', title: { fr: 'Buffet Chic', en: 'Chic Buffet', ar: 'بوفيه عصري' } },
  { file: 50, category: 'Convives', title: { fr: 'Invités en Fête', en: 'Celebrating Guests', ar: 'ضيوف في احتفال' } },
  { file: 51, category: 'Convives', title: { fr: "Dîner d'Exception", en: 'Exceptional Dinner', ar: 'عشاء استثنائي' } },
  { file: 52, category: 'Convives', title: { fr: 'Réception de Prestige', en: 'Prestige Reception', ar: 'استقبال برستيج' } },
  { file: 53, category: 'Convives', title: { fr: 'Grande Réception', en: 'Grand Reception', ar: 'استقبال كبير' } },
  { file: 54, category: 'Convives', title: { fr: 'Soirée Inoubliable', en: 'Unforgettable Evening', ar: 'أمسية لا تُنسى' } },
  { file: 55, category: 'Convives', title: { fr: 'Buffet de Gala', en: 'Gala Buffet', ar: 'بوفيه غالا' } },
];

export default galleryData;
