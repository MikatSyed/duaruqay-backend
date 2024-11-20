import { open } from 'sqlite';
import sqlite3 from 'sqlite3';


// Open a SQLite database connection
const dbPromise = open({
  filename: './dua_main.sqlite', // Path to your SQLite database file
  driver: sqlite3.Database,
});

// Service methods
const getSubCategoriesFromDB = async (): Promise<any[]> => {
  console.log('Hitted1')
  const db = await dbPromise;
  console.log('Hitted2')
  const categories = await db.all('SELECT * FROM category');
  console.log('Hitted3')
  return categories;
};


const getSubcategoriesFromDB = async (categoryId: string): Promise<any[]> => {
  const db = await dbPromise;
  const subcategories = await db.all(
    'SELECT * FROM  sub_category WHERE cat_id = ?',
    [categoryId]
  );
  return subcategories;
};


export const getDuasByCategoryAndSubcategory = async (categoryId: number, subcategoryId: number): Promise<Dua[]> => {
  const db = await dbPromise;
  const duas = await db.all(
    'SELECT * FROM dua WHERE cat_id = ? AND subcat_id = ?',
    [categoryId, subcategoryId]
  );
  await db.close();
  return duas;
};


const insertCategory = async (data: { name: string }): Promise<any> => {
  const db = await dbPromise;
  const result = await db.run(
    'INSERT INTO categories (name) VALUES (?)',
    [data.name]
  );
  return { id: result.lastID, name: data.name };
};




export const CategoryService = {
  getSubCategoriesFromDB,
  getSubcategoriesFromDB,
  getDuasByCategoryAndSubcategory,
  insertCategory,
};
