"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
// routes/apiRoutes.js
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
// Route for getting all categories
router.get('/', category_controller_1.CategoryController.getSubCategoriesFromDB);
// Route for getting subcategories for a specific category
router.get('/:categoryId/subcategories', category_controller_1.CategoryController.fetchSubcategories);
// Route for getting duas for a specific subcategory
router.get('/subcategories/duas', category_controller_1.CategoryController.getDuasByCategoryAndSubcategory);
exports.CategoryRoutes = router;
