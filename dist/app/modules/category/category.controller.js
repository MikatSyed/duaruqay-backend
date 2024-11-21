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
exports.CategoryController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync")); // Assuming catchAsync handles async errors
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse")); // Assuming this sends standardized responses
const category_service_1 = require("./category.service"); // Importing service methods
// Fetch all categories from the database
const getSubCategoriesFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.CategoryService.getSubCategoriesFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Categories fetched successfully',
        data: result,
    });
}));
// Fetch subcategories for a specific category
const fetchSubcategories = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const result = yield category_service_1.CategoryService.getSubcategoriesFromDB(categoryId); // Get subcategories from service
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `Subcategories for category ${categoryId} fetched successfully`,
        data: result,
    });
}));
// Fetch duas for a specific subcategory
const getDuasByCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cat } = req.query;
    const categoryId = parseInt(cat, 10);
    const result = yield category_service_1.CategoryService.getDuasByCategory(categoryId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `Duas for category  fetched successfully`,
        data: result,
    });
}));
const getDuasByCategoryAndSubcategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cat, subcat } = req.query;
    const categoryId = parseInt(cat, 10);
    const subcategoryId = parseInt(subcat, 10);
    const result = yield category_service_1.CategoryService.getDuasByCategoryAndSubcategory(categoryId, subcategoryId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `Duas for subcategory ${subcategoryId} fetched successfully`,
        data: result,
    });
}));
// Insert a new category into the database
// Exporting all controller methods
exports.CategoryController = {
    getSubCategoriesFromDB,
    fetchSubcategories,
    getDuasByCategory,
    getDuasByCategoryAndSubcategory
};
