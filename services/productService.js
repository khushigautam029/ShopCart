import { Category, Product } from "../models/index.js";

export const createProduct = async(sellerId ,data )=>{
    const category = await Category.findByPk(data.categoryId);
    if (!category) {
        throw new Error("Category not found");
    }
    if (category.status !== "ACTIVE") {
        throw new Error("Selected category is inactive");
    }
    const product = await Product.create({
        sellerId,
        categoryId: data.categoryId,
        name: data.name,
        description: data.description,
        price: data.price,
    });
    return product;
};

export const getAllProducts = async () => {
    return await Product.findAll({
        where: {
            status: "ACTIVE",
        },
        include: [
            {
                model: Category,
                as: "category",
                attributes: ["id", "name"],
            },
        ],
        order: [["created_at", "DESC"]],
    });
};

export const getProductById = async (id) => {
    const product = await Product.findOne({
        where: {
            id,
            status: "ACTIVE",
        },
        include: [
            {
                model: Category,
                as: "category",
                attributes: ["id", "name"],
            },
        ],
    });
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
};

export const updateProduct = async (
    productId,
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
            "Product not found or you are not authorized to update it"
        );
    }
    // If category is being changed, verify it
    if (data.categoryId) {
        const category = await Category.findByPk(
            data.categoryId
        );
        if (!category) {
            throw new Error("Category not found");
        }
        if (category.status !== "ACTIVE") {
            throw new Error("Selected category is inactive");
        }
    }
    await product.update(data);
    return product;
};

export const deleteProduct = async (
    productId,
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
            "Product not found or you are not authorized to delete it"
        );
    }
    await product.update({
        status: "INACTIVE",
    });
    return true;
};