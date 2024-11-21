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
exports.CategoryService = exports.getDuasByCategoryAndSubcategory = void 0;
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
    const subcategories = yield db.all('SELECT * FROM  sub_category WHERE cat_id = ?', [categoryId]);
    return subcategories;
});
const getDuasByCategoryAndSubcategory = (categoryId, subcategoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield dbPromise;
    const duas = yield db.all('SELECT * FROM dua WHERE cat_id = ? AND subcat_id = ?', [categoryId, subcategoryId]);
    return duas;
});
exports.getDuasByCategoryAndSubcategory = getDuasByCategoryAndSubcategory;
const insertCategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield dbPromise;
    const result = yield db.run('INSERT INTO categories (name) VALUES (?)', [data.name]);
    return { id: result.lastID, name: data.name };
});
exports.CategoryService = {
    getSubCategoriesFromDB,
    getSubcategoriesFromDB,
    getDuasByCategoryAndSubcategory: exports.getDuasByCategoryAndSubcategory,
    insertCategory,
};
