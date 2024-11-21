"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = exports.getDuasByCategoryAndSubcategory = exports.getDuasByCategory = void 0;
const sqlite_1 = require("sqlite");
const sqlite3_1 = __importDefault(require("sqlite3"));
// Open a SQLite database connection
const dbPromise = (0, sqlite_1.open)({
    filename: './dua_main.sqlite', // Path to your SQLite database file
    driver: sqlite3_1.default.Database,
});
// Service methods
const getSubCategoriesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield dbPromise;
    const categories = yield db.all('SELECT * FROM category');
    return categories;
});
const getSubcategoriesFromDB = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield dbPromise;
    const subcategories = yield db.all('SELECT * FROM sub_category WHERE cat_id = ?', [categoryId]);
    return subcategories;
});
const getDuasByCategory = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield dbPromise;
    // Fetch all duas for the category
    const duas = yield db.all('SELECT * FROM dua WHERE cat_id = ?', [categoryId]);
    // Fetch all subcategories for the category
    const subcategories = yield db.all('SELECT subcat_id, subcat_name_en FROM sub_category WHERE cat_id = ?', [categoryId]);
    // Create a map to track if a subcategory has already been added
    const addedSubcategories = new Set();
    // Add `subcat_name_en` to the first matching `dua`
    duas.forEach((dua) => {
        const matchingSubcategory = subcategories.find((subcat) => subcat.subcat_id === dua.subcat_id);
        if (matchingSubcategory && !addedSubcategories.has(matchingSubcategory.subcat_id)) {
            // Add `subcat_name_en` to the first object with this subcat_id
            dua.subcat_name_en = matchingSubcategory.subcat_name_en;
            addedSubcategories.add(matchingSubcategory.subcat_id); // Mark as added
        }
    });
    return duas;
});
exports.getDuasByCategory = getDuasByCategory;
const getDuasByCategoryAndSubcategory = (categoryId, subcategoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield dbPromise;
    const duas = yield db.all('SELECT * FROM dua WHERE cat_id = ? AND subcat_id = ?', [categoryId, subcategoryId]);
    return duas;
});
exports.getDuasByCategoryAndSubcategory = getDuasByCategoryAndSubcategory;
exports.CategoryService = {
    getSubCategoriesFromDB,
    getSubcategoriesFromDB,
    getDuasByCategory: exports.getDuasByCategory,
    getDuasByCategoryAndSubcategory: exports.getDuasByCategoryAndSubcategory,
};
