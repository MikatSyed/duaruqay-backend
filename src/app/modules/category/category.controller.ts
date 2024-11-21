// controllers/category.controller.ts
import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync'; // Assuming catchAsync handles async errors
import sendResponse from '../../../shared/sendResponse'; // Assuming this sends standardized responses
import { CategoryService } from './category.service'; // Importing service methods

// Fetch all categories from the database
const getSubCategoriesFromDB: RequestHandler = catchAsync(async (req, res) => {
  const result = await CategoryService.getSubCategoriesFromDB();  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Categories fetched successfully',
    data: result,
  });
});

// Fetch subcategories for a specific category
const fetchSubcategories: RequestHandler = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const result = await CategoryService.getSubcategoriesFromDB(categoryId);  // Get subcategories from service
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `Subcategories for category ${categoryId} fetched successfully`,
    data: result,
  });
});

// Fetch duas for a specific subcategory
const getDuasByCategory: RequestHandler = catchAsync(async (req, res) => {
  const { cat } = req.query;
  const categoryId = parseInt(cat as string, 10); 
 
  const result = await CategoryService.getDuasByCategory(categoryId); 
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `Duas for category  fetched successfully`,
    data: result,
  });
});
const getDuasByCategoryAndSubcategory: RequestHandler = catchAsync(async (req, res) => {
  const { cat, subcat } = req.query;
  const categoryId = parseInt(cat as string, 10); 
  const subcategoryId = parseInt(subcat as string, 10);  

  const result = await CategoryService.getDuasByCategoryAndSubcategory(categoryId,subcategoryId); 
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `Duas for subcategory ${subcategoryId} fetched successfully`,
    data: result,
  });
});

// Insert a new category into the database




// Exporting all controller methods
export const CategoryController = {
  getSubCategoriesFromDB,  
  fetchSubcategories,
  getDuasByCategory,  
  getDuasByCategoryAndSubcategory
}
