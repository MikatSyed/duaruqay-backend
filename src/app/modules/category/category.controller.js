import catchAsync from '../../../shared/catchAsync.js';
import sendResponse from '../../../shared/sendResponse.js';
import { CategoryService } from './category.service.js';

const getSubCategoriesFromDB = catchAsync(async (req, res, next) => {
  const result = await CategoryService.getSubCategoriesFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Categories fetched successfully',
    data: result,
  });
});

const fetchSubcategories = catchAsync(async (req, res, next) => {
  const { categoryId } = req.params;
  const result = await CategoryService.getSubcategoriesFromDB(categoryId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `Subcategories for category ${categoryId} fetched successfully`,
    data: result,
  });
});

const getDuasByCategory = catchAsync(async (req, res, next) => {
  const { cat } = req.query;
  const categoryId = parseInt(cat, 10);
  const result = await CategoryService.getDuasByCategory(categoryId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `Duas for category fetched successfully`,
    data: result,
  });
});

const getDuasByCategoryAndSubcategory = catchAsync(async (req, res, next) => {
  const { cat, subcat } = req.query;
  const categoryId = parseInt(cat, 10);
  const subcategoryId = parseInt(subcat, 10);

  const result = await CategoryService.getDuasByCategoryAndSubcategory(
    categoryId,
    subcategoryId
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `Duas for subcategory ${subcategoryId} fetched successfully`,
    data: result,
  });
});

export const CategoryController = {
  getSubCategoriesFromDB,
  fetchSubcategories,
  getDuasByCategory,
  getDuasByCategoryAndSubcategory,
};
