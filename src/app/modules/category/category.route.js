// routes/apiRoutes.js
import express from 'express';
import { CategoryController } from './category.controller.js';

const router = express.Router();

router.get('/duas', CategoryController.getDuasByCategory);
router.get('/', CategoryController.getSubCategoriesFromDB);
router.get('/:categoryId/subcategories', CategoryController.fetchSubcategories);
router.get('/subcategories/duas', CategoryController.getDuasByCategoryAndSubcategory);

export const CategoryRoutes = router;
