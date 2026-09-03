import { Product, ProductImage } from "../models/index.js";

export const createProductImage = async (productId, sellerId, data) => {
    const product = await Product.findOne({
        where: {
            id: productId,
            sellerId,
        },
    });

    if (!product){
        throw new Error(
            "Product not found or you are not authorized"
        );
    }
    if (data.isPrimary === true) {
        await ProductImage.update(
            {
                isPrimary: false,
            },
            {
                where: {
                    productId,
                },
            }
        );
    }
    const image = await ProductImage.create({
        productId,
        imageUrl: data.imageUrl,
        isPrimary: data.isPrimary,
        sortOrder: data.sortOrder,
    });
    return image;
};

export const getProductImages = async (productId) => {
    const product = await Product.findOne({
        where: {
            id: productId,
            status: "ACTIVE",
        },
    });
    if (!product) {
        throw new Error("Product not found");
    }
    return await ProductImage.findAll({
        where: {
            productId,
        },
        order: [["sortOrder", "ASC"]],
    });
};

export const updateProductImage = async (
    productId,
    imageId,
    sellerId,
    data
) => {
    const product = await Product.findOne({
        where: {
            id: productId,
            sellerId,
        },
    });
    if (!product) {
        throw new Error(
            "Product not found or you are not authorized"
        );
    }
    const image = await ProductImage.findOne({
        where: {
            id: imageId,
            productId,
        },
    });
    if (!image) {
        throw new Error("Product image not found");
    }
    if (data.isPrimary === true) {
        await ProductImage.update(
            {
                isPrimary: false,
            },
            {
                where: {
                    productId,
                },
            }
        );
    }
    await image.update(data);
    return image;
};

export const deleteProductImage = async (
    productId,
    imageId,
    sellerId
) => {
    const product = await Product.findOne({
        where: {
            id: productId,
            sellerId,
        },
    });
    if (!product) {
        throw new Error(
            "Product not found or you are not authorized"
        );
    }
    const image = await ProductImage.findOne({
        where: {
            id: imageId,
            productId,
        },
    });
    if (!image) {
        throw new Error("Product image not found");
    }
    await image.destroy();
    return true;
};
