import { Op } from "sequelize";
import {
    Attribute,
    AttributeValue,
    Category,
    Inventory,
    Product,
    ProductImage,
    ProductVariant,
    VariantAttribute,
} from "../models/index.js";

// GET ALL PRODUCTS
export const getAllProducts = async (filters = {}) => {
    const {
        search,
        categoryId,
        brand,
        gender,
        discount,
        deliveryTime,
        minPrice,
        maxPrice,
        sortBy = "created_at",
        order = "DESC",
    } = filters;
    const where = {
        status: "ACTIVE",
    };
    // SEARCH
    if (search && search.trim() !== "") {
        where[Op.or] = [
            {
                name: {
                    [Op.like]: `%${search.trim()}%`,
                },
            },
            {
                description: {
                    [Op.like]: `%${search.trim()}%`,
                },
            },
            {
                brand: {
                    [Op.like]: `%${search.trim()}%`,
                },
            },
        ];
    }
    // CATEGORY
    if (
        categoryId !== undefined &&
        categoryId !== "" &&
        !isNaN(Number(categoryId))
    ) {
        where.categoryId = Number(categoryId);
    }
    // BRAND
    if (brand && brand.trim() !== "") {
        where.brand = {
            [Op.like]: `%${brand.trim()}%`,
        };
    }
    // GENDER
    if (gender && gender.trim() !== "") {
        where.gender = gender.trim().toUpperCase();
    }
    // DISCOUNT
    const hasDiscount =
        discount !== undefined &&
        discount !== "" &&
        !isNaN(Number(discount));
    if (hasDiscount) {
        where.discount = {
            [Op.gte]: Number(discount),
        };
    }
    // DELIVERY TIME
    const hasDeliveryTime =
        deliveryTime !== undefined &&
        deliveryTime !== "" &&
        !isNaN(Number(deliveryTime));
    if (hasDeliveryTime) {
        where.deliveryTime = {
            [Op.lte]: Number(deliveryTime),
        };
    }
    // PRICE
    const hasMinPrice =
        minPrice !== undefined &&
        minPrice !== "" &&
        !isNaN(Number(minPrice));
    const hasMaxPrice =
        maxPrice !== undefined &&
        maxPrice !== "" &&
        !isNaN(Number(maxPrice));
    if (hasMinPrice || hasMaxPrice) {
        where.price = {};

        if (hasMinPrice) {
            where.price[Op.gte] = Number(minPrice);
        }

        if (hasMaxPrice) {
            where.price[Op.lte] = Number(maxPrice);
        }
    }
    // SORT
    const allowedSortFields = [
        "price",
        "created_at",
        "name",
        "discount",
        "delivery_time",
    ];
    const finalSortBy = allowedSortFields.includes(sortBy)
        ? sortBy
        : "created_at";
    const finalOrder =
        String(order).toUpperCase() === "ASC"
            ? "ASC"
            : "DESC";
    return await Product.findAll({
        where,
        include: [
            {
                model: Category,
                as: "category",
                attributes: ["id", "name"],
            },
            {
                model: ProductImage,
                as: "images",
                attributes: [
                    "id",
                    "imageUrl",
                    "isPrimary",
                    "sortOrder",
                ],
            },
        ],
        order: [
            [finalSortBy, finalOrder],
        ],
    });
};

// GET PRODUCT BY ID
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
            {
                model: ProductImage,
                as: "images",
                attributes: [
                    "id",
                    "imageUrl",
                    "isPrimary",
                    "sortOrder",
                ],
            },
            {
                model: ProductVariant,
                as: "variants",
                where: {
                    status: "ACTIVE",
                },
                required: false,
                attributes: [
                    "id",
                    "sku",
                    "price",
                    "status",
                ],

                include: [
                    {
                        model: VariantAttribute,
                        as: "variantAttributes",
                        attributes: ["id"],
                        include: [
                            {
                                model: AttributeValue,
                                as: "attributeValue",
                                attributes: [
                                    "id",
                                    "value",
                                ],
                                include: [
                                    {
                                        model: Attribute,
                                        as: "attribute",
                                        attributes: [
                                            "id",
                                            "name",
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        model: Inventory,
                        as: "inventory",
                        attributes: [
                            "quantity",
                            "reservedQuantity",
                        ],
                    },
                ],
            },
        ],
    });
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
};

// CREATE PRODUCT
export const createProduct = async (
    sellerId,
    data
) => {
    // Check category
    const category = await Category.findByPk(
        data.categoryId
    );
    if (!category) {
        throw new Error("Category not found");
    }
    if (category.status !== "ACTIVE") {
        throw new Error(
            "Selected category is inactive"
        );
    }
    // Create product
    const product = await Product.create({
        sellerId,
        categoryId: data.categoryId,
        name: data.name,
        description: data.description,
        brand: data.brand,
        gender: data.gender,
        price: data.price,
        discount: data.discount ?? 0,
        deliveryTime: data.deliveryTime,
    });
    return product;
};

// UPDATE PRODUCT
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
    // Check category if category is being changed
    if (
        data.categoryId !== undefined &&
        data.categoryId !== ""
    ) {
        const category = await Category.findByPk(
            data.categoryId
        );
        if (!category) {
            throw new Error(
                "Category not found"
            );
        }
        if (category.status !== "ACTIVE") {
            throw new Error(
                "Selected category is inactive"
            );
        }
    }
    // Update product
    await product.update({
        ...(data.categoryId !== undefined && {
            categoryId: data.categoryId,
        }),
        ...(data.name !== undefined && {
            name: data.name,
        }),
        ...(data.description !== undefined && {
            description: data.description,
        }),
        ...(data.brand !== undefined && {
            brand: data.brand,
        }),
        ...(data.gender !== undefined && {
            gender: data.gender,
        }),
        ...(data.price !== undefined && {
            price: data.price,
        }),
        ...(data.discount !== undefined && {
            discount: data.discount,
        }),
        ...(data.deliveryTime !== undefined && {
            deliveryTime: data.deliveryTime,
        }),
        ...(data.status !== undefined && {
            status: data.status,
        }),
    });
    return product;
};

// DELETE PRODUCT
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