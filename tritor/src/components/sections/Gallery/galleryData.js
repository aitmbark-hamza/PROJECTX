// Array of image filenames in the public/images folder
const platFilenames = [
  'plat1.jpg', 'plat 2.jpg', 'plat 3.jpg', 'plat4.jpg', 'plat 5.jpg',
  'plat 6.jpg', 'plat 7.jpg', 'plat8.jpg', 'plat 9.jpg', 'plat 10.jpg',
  'plat 11.jpg', 'plat 12.jpg', 'plat 13.jpg', 'plat 14.jpg', 'plat 15.jpg',
  'plat 16.jpg', 'plat 17.jpg', 'plat 18.jpg', 'plat 19.jpg', 'plat 20.jpg',
  'plat 21.jpg'
];

const conviveFilenames = [
  'convive 1.jpg', 'convive 2.jpg', 'convive 3.jpg', 'convive 4.jpg',
  'convive 5.jpg', 'convive 6.jpg'
];

const buffetFilenames = [
  'buffet 1.jpg', 'buffet 2.jpg', 'buffet 3.jpg', 'buffet 4.jpg'
];

// Helper function to encode filenames for URLs
const encodeImagePath = (filename) => {
  return `/images/${encodeURIComponent(filename)}`;
};

export const galleryCategories = {
  fr: ['Plats', 'Convives', 'Buffets'],
  en: ['Dishes', 'Guests', 'Buffets'],
  ar: ['أطباق', 'ضيوف', 'بوفيهات'],
};

export const categoryKeys = ['Plats', 'Convives', 'Buffets'];

let id = 1;
const galleryData = [
  ...platFilenames.map((filename, index) => ({
    id: id++,
    category: 'Plats',
    image: encodeImagePath(filename),
    file: `plat${index + 1}`,
    title: {
      fr: `Plat ${index + 1}`,
      en: `Dish ${index + 1}`,
      ar: `طبق ${index + 1}`
    }
  })),
  ...conviveFilenames.map((filename, index) => ({
    id: id++,
    category: 'Convives',
    image: encodeImagePath(filename),
    file: `convive${index + 1}`,
    title: {
      fr: `Convive ${index + 1}`,
      en: `Guest ${index + 1}`,
      ar: `ضيف ${index + 1}`
    }
  })),
  ...buffetFilenames.map((filename, index) => ({
    id: id++,
    category: 'Buffets',
    image: encodeImagePath(filename),
    file: `buffet${index + 1}`,
    title: {
      fr: `Buffet ${index + 1}`,
      en: `Buffet ${index + 1}`,
      ar: `بوفيه ${index + 1}`
    }
  })),
];

export default galleryData;
