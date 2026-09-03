import {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
} from "../services/categoryService.js";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

export const create = async (req,res)=>{
    try{
        const category = await createCategory(req.body);
        return res.status(STATUS_CODES.CREATED).json({
            success:true,
            message:MESSAGES.CATEGORY_CREATED,
            data:category,
        });
    }catch(error){
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            success:false,
            message:error.message,
        });
    }
};

export const getAll = async (req,res)=>{
    try{
        const categories = await getAllCategories();
        return res.status(STATUS_CODES.OK).json({
            success:true,
            message:MESSAGES.CATEGORIES_FETCHED,
            data:categories,
        });
    }catch (error) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
};

export const getById = async (req, res) => {
    try {
        const category = await getCategoryById(req.params.id);

        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.CATEGORY_FETCHED,
            data: category,
        });
    } catch (error) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
            success: false,
            message: error.message,
        });
    }
};

export const update = async (req, res) => {
    try {
        const category = await updateCategory(
            req.params.id,
            req.body
        );

        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.CATEGORY_UPDATED,
            data: category,
        });
    } catch (error) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: error.message,
        });
    }
};

export const remove = async (req, res) => {
    try {
        await deleteCategory(req.params.id);

        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.CATEGORY_DELETED,
        });
    } catch (error) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
            success: false,
            message: error.message,
        });
    }
};