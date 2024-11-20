// routes/apiRoutes.js
import express from 'express';
import { CategoryController } from './category.controller';

const router = express.Router();

// Route for getting all categories
router.get('/', CategoryController.getSubCategoriesFromDB);

// Route for getting subcategories for a specific category
router.get('/:categoryId/subcategories', CategoryController.fetchSubcategories);

// Route for getting duas for a specific subcategory
router.get('/subcategories/duas', CategoryController.getDuasByCategoryAndSubcategory);

export const CategoryRoutes = router;
