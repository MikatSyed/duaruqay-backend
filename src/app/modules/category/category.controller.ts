import { NextFunction, Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';

const getSubCategoriesFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await CategoryService.getSubCategoriesFromDB();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Categories fetched successfully',
      data: result,
    });
  }
);

const fetchSubcategories: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { categoryId } = req.params;
    const result = await CategoryService.getSubcategoriesFromDB(categoryId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Subcategories for category ${categoryId} fetched successfully`,
      data: result,
    });
  }
);

const getDuasByCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { cat } = req.query;
    const categoryId = parseInt(cat as string, 10);
    const result = await CategoryService.getDuasByCategory(categoryId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Duas for category fetched successfully`,
      data: result,
    });
  }
);

const getDuasByCategoryAndSubcategory: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { cat, subcat } = req.query;
    const categoryId = parseInt(cat as string, 10);
    const subcategoryId = parseInt(subcat as string, 10);

    const result = await CategoryService.getDuasByCategoryAndSubcategory(categoryId, subcategoryId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Duas for subcategory ${subcategoryId} fetched successfully`,
      data: result,
    });
  }
);

export const CategoryController = {
  getSubCategoriesFromDB,
  fetchSubcategories,
  getDuasByCategory,
  getDuasByCategoryAndSubcategory,
};
