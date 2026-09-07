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

export const createProduct = async (sellerId, data) => {
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

export const getAllProducts = async (filters = {}) => {
    const {
        search,
        categoryId,
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
        ];
    }

    // CATEGORY
    if (categoryId) {
        where.categoryId = Number(categoryId);
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
                                attributes: ["id", "value"],
                                include: [
                                    {
                                        model: Attribute,
                                        as: "attribute",
                                        attributes: ["id", "name"],
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
