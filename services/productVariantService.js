import {
    AttributeValue,
    Product,
    ProductVariant,
    VariantAttribute,
} from "../models/index.js";

export const createProductVariant = async (
    productId,
    sellerId,
    data
) => {
    // Check product ownership
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

    // Check SKU
    const existingSku = await ProductVariant.findOne({
        where: {
            sku: data.sku,
        },
    });

    if (existingSku) {
        throw new Error("SKU already exists");
    }

    // Check attribute values
    const attributeValues =
        await AttributeValue.findAll({
            where: {
                id: data.attributeValueIds,
            },
        });

    if (
        attributeValues.length !==
        data.attributeValueIds.length
    ) {
        throw new Error(
            "One or more attribute values not found"
        );
    }

    // Make sure attribute values are unique by attribute
    const attributeIds = attributeValues.map(
        (item) => item.attributeId
    );

    if (
        new Set(attributeIds).size !==
        attributeIds.length
    ) {
        throw new Error(
            "A variant cannot have multiple values of the same attribute"
        );
    }

    const variant = await ProductVariant.create({
        productId,
        sku: data.sku,
        price: data.price ?? product.price,
        status: data.status ?? "ACTIVE",
    });

    await VariantAttribute.bulkCreate(
        data.attributeValueIds.map(
            (attributeValueId) => ({
                variantId: variant.id,
                attributeValueId,
            })
        )
    );

    return await getProductVariantById(
        productId,
        variant.id
    );
};

export const getProductVariants = async (
    productId
) => {
    const product = await Product.findOne({
        where: {
            id: productId,
            status: "ACTIVE",
        },
    });

    if (!product) {
        throw new Error("Product not found");
    }

    return await ProductVariant.findAll({
        where: {
            productId,
        },
        include: [
            {
                model: VariantAttribute,
                as: "variantAttributes",
                include: [
                    {
                        model: AttributeValue,
                        as: "attributeValue",
                    },
                ],
            },
        ],
        order: [["created_at", "ASC"]],
    });
};

export const getProductVariantById = async (
    productId,
    variantId
) => {
    const variant =
        await ProductVariant.findOne({
            where: {
                id: variantId,
                productId,
            },
            include: [
                {
                    model: VariantAttribute,
                    as: "variantAttributes",
                    include: [
                        {
                            model: AttributeValue,
                            as: "attributeValue",
                        },
                    ],
                },
            ],
        });

    if (!variant) {
        throw new Error("Product variant not found");
    }

    return variant;
};

export const updateProductVariant = async (
    productId,
    variantId,
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

    const variant =
        await ProductVariant.findOne({
            where: {
                id: variantId,
                productId,
            },
        });

    if (!variant) {
        throw new Error("Product variant not found");
    }

    if (
        data.sku &&
        data.sku !== variant.sku
    ) {
        const existingSku =
            await ProductVariant.findOne({
                where: {
                    sku: data.sku,
                },
            });

        if (existingSku) {
            throw new Error("SKU already exists");
        }
    }

    if (data.attributeValueIds) {
        const attributeValues =
            await AttributeValue.findAll({
                where: {
                    id: data.attributeValueIds,
                },
            });

        if (
            attributeValues.length !==
            data.attributeValueIds.length
        ) {
            throw new Error(
                "One or more attribute values not found"
            );
        }

        const attributeIds =
            attributeValues.map(
                (item) => item.attributeId
            );

        if (
            new Set(attributeIds).size !==
            attributeIds.length
        ) {
            throw new Error(
                "A variant cannot have multiple values of the same attribute"
            );
        }

        await VariantAttribute.destroy({
            where: {
                variantId,
            },
        });

        await VariantAttribute.bulkCreate(
            data.attributeValueIds.map(
                (attributeValueId) => ({
                    variantId,
                    attributeValueId,
                })
            )
        );
    }

    await variant.update({
        ...(data.sku !== undefined && {
            sku: data.sku,
        }),

        ...(data.price !== undefined && {
            price: data.price,
        }),

        ...(data.status !== undefined && {
            status: data.status,
        }),
    });

    return await getProductVariantById(
        productId,
        variantId
    );
};

export const deleteProductVariant = async (
    productId,
    variantId,
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

    const variant =
        await ProductVariant.findOne({
            where: {
                id: variantId,
                productId,
            },
        });

    if (!variant) {
        throw new Error("Product variant not found");
    }

    await VariantAttribute.destroy({
        where: {
            variantId,
        },
    });

    await variant.destroy();

    return true;
};