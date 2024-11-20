// // db/db.ts
// import { Database, open } from 'sqlite';
// import sqlite3 from 'sqlite3';

// // Define types for the data structures
// interface Category {
//   id: number;
//   name: string;
// }

// interface Subcategory {
//   id: number;
//   name: string;
//   category_id: number;
// }

// interface Dua {
//   id: number;
//   text: string;
//   subcategory_id: number;
// }

// // Function to open the database
// const openDatabase = async (): Promise<Database> => {
//   const db = await open({
//     filename: './dua_main.sqlite',
//     driver: sqlite3.Database,
//   });
//   return db;
// };

// // Queries for categories, subcategories, and duas

// // Function to get categories
// export const getCategories = async (): Promise<Category[]> => {
//   const db = await openDatabase();
//   const categories: Category[] = await db.all('SELECT * FROM categories');
//   await db.close();
//   return categories;
// };

// // Function to get subcategories by categoryId
// export const getSubcategories = async (categoryId: number): Promise<Subcategory[]> => {
//   const db = await openDatabase();
//   const subcategories: Subcategory[] = await db.all('SELECT * FROM subcategories WHERE category_id = ?', [categoryId]);
//   await db.close();
//   return subcategories;
// };

// // Function to get duas by subcategoryId
// export const getDuas = async (subcategoryId: number): Promise<Dua[]> => {
//   const db = await openDatabase();
//   const duas: Dua[] = await db.all('SELECT * FROM duas WHERE subcategory_id = ?', [subcategoryId]);
//   await db.close();
//   return duas;
// };
