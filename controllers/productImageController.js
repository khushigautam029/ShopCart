import {
    createProductImage,
    deleteProductImage,
    getProductImages,
    updateProductImage
} from "../services/productImageService.js";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

export const create = async(req, res)=>{
    try{
        const image = await createProductImage(
            req.params.productId,
            req.user.id,
            req.body
        );
        return res.status(STATUS_CODES.CREATED).json({
            success:true,
            message:MESSAGES.PRODUCT_IMAGE_ADDED,
            data:image,
        });
    }catch(error){
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            success:false,
            message:error.message,
        });
    }
};

export const getAll =async(req,res)=>{
    try{
        const images = await getProductImages(
            req.params.productId
        );
        return res.status(STATUS_CODES.OK).json({
            success:true,
            message:MESSAGES.PRODUCT_IMAGES_FETCHED,
            data:images,
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
        const image = await updateProductImage(
            req.params.productId,
            req.params.imageId,
            req.user.id,
            req.body
        );
        return res.status(STATUS_CODES.OK).json({
            success:true,
            message:MESSAGES.PRODUCT_IMAGE_UPDATED,
            data:image,
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
        await deleteProductImage(
            req.params.productId,
            req.params.imageId,
            req.user.id
        );
        return res.status(STATUS_CODES.OK).json({
            success:true,
            message:MESSAGES.PRODUCT_IMAGE_DELETED,
        });
    }catch(error){
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            success:false,
            message:error.message,
        });
    }
};