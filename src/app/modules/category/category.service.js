import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

// Open a SQLite database connection
const dbPromise = open({
  filename: './dua_main.sqlite', // Path to your SQLite database file
  driver: sqlite3.Database,
});

// Service methods
const getSubCategoriesFromDB = async () => {
  const db = await dbPromise;
  const categories = await db.all('SELECT * FROM category');
  return categories;
};

const getSubcategoriesFromDB = async (categoryId) => {
  const db = await dbPromise;
  const subcategories = await db.all(
    'SELECT * FROM sub_category WHERE cat_id = ?',
    [categoryId]
  );
  return subcategories;
};

const getDuasByCategory = async (categoryId) => {
  const db = await dbPromise;

  // Fetch all duas for the category
  const duas = await db.all('SELECT * FROM dua WHERE cat_id = ?', [categoryId]);

  // Fetch all subcategories for the category
  const subcategories = await db.all(
    'SELECT subcat_id, subcat_name_en FROM sub_category WHERE cat_id = ?',
    [categoryId]
  );

  // Create a map to track if a subcategory has already been added
  const addedSubcategories = new Set();

  // Add `subcat_name_en` to the first matching `dua`
  duas.forEach((dua) => {
    const matchingSubcategory = subcategories.find(
      (subcat) => subcat.subcat_id === dua.subcat_id
    );

    if (matchingSubcategory && !addedSubcategories.has(matchingSubcategory.subcat_id)) {
      // Add `subcat_name_en` to the first object with this subcat_id
      dua.subcat_name_en = matchingSubcategory.subcat_name_en;
      addedSubcategories.add(matchingSubcategory.subcat_id); // Mark as added
    }
  });

  return duas;
};

const getDuasByCategoryAndSubcategory = async (categoryId, subcategoryId) => {
  const db = await dbPromise;
  const duas = await db.all(
    'SELECT * FROM dua WHERE cat_id = ? AND subcat_id = ?',
    [categoryId, subcategoryId]
  );

  return duas;
};

// Export the service object
export const CategoryService = {
  getSubCategoriesFromDB,
  getSubcategoriesFromDB,
  getDuasByCategory,
  getDuasByCategoryAndSubcategory,
};
