import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct
} from "../services/productService.js";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";


export const create = async(req, res)=>{
    try{
        const product = await createProduct(
            req.user.id,
            req.body
        );
        return res.status(STATUS_CODES.CREATED).json({
            success:true,
            message:MESSAGES.PRODUCT_CREATED,
            data:product,
        });
    }catch(error){
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            success:false,
            message:error.message,
        });
    }
};

export const getAll = async(req,res)=>{
    try{
        const products = await getAllProducts();
        return res.status(STATUS_CODES.OK).json({
            success:true,
            message:MESSAGES.PRODUCT_FETCHED,
            data:products,
        });
    }catch (error) {
        return res.status(
            STATUS_CODES.INTERNAL_SERVER_ERROR
        ).json({
            success: false,
            message: error.message,
        });
    }
};

export const getById = async (req,res) =>{
    try{
        const product = await getProductById(
            req.params.id
        );
        return res.status(STATUS_CODES.OK).json({
            success:true,
            message:MESSAGES.PRODUCT_FETCHED,
            data:product,
        });
    }catch(error){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            success:false,
            message:error.message,
        });
    }
};

export const update = async(req,res)=>{
    try{
        const product = await updateProduct(
            req.params.id,
            req.user.id,
            req.body
        );
        return res.status(STATUS_CODES.OK).json({
            success:true,
            message:MESSAGES.PRODUCT_UPDATED,
            data:product,
        });
    }catch(error){
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            success:false,
            message:error.message,
        });
    }
};

export const remove = async(req,res)=>{
    try{
        await deleteProduct(
            req.params.id,
            req.user.id
        );
        return res.status(STATUS_CODES.OK).json({
            success:true,
            message:MESSAGES.PRODUCT_DELETED,
        });
    }catch(error){
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            success:false,
            message:error.message,
        });
    }
};