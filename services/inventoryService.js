import {
    Inventory,
    Product,
    ProductVariant,
} from "../models/index.js";

const getVariantForSeller = async (variantId, sellerId) => {
    const variant = await ProductVariant.findOne({
        where: {
            id: variantId,
        },
        include: [
            {
                model: Product,
                as: "product",
                where: {
                    sellerId,
                },
            },
        ],
    });

    return variant;
};

export const getInventory = async (sellerId) => {
    const inventory = await Inventory.findAll({
        include: [
            {
                model: ProductVariant,
                as: "variant",
                required: true,
                include: [
                    {
                        model: Product,
                        as: "product",
                        where: {
                            sellerId,
                        },
                        attributes: [
                            "id",
                            "name",
                            "sellerId",
                        ],
                    },
                ],
            },
        ],
        order: [["updated_at", "DESC"]],
    });

    return inventory;
};

export const getInventoryByVariant = async (
    variantId,
    sellerId
) => {
    const variant = await getVariantForSeller(
        variantId,
        sellerId
    );

    if (!variant) {
        throw new Error("Product variant not found");
    }

    const inventory = await Inventory.findOne({
        where: {
            variantId,
        },
        include: [
            {
                model: ProductVariant,
                as: "variant",
                include: [
                    {
                        model: Product,
                        as: "product",
                        attributes: [
                            "id",
                            "name",
                            "sellerId",
                        ],
                    },
                ],
            },
        ],
    });

    return inventory;
};

export const updateInventory = async (
    variantId,
    sellerId,
    data
) => {
    const variant = await getVariantForSeller(
        variantId,
        sellerId
    );

    if (!variant) {
        throw new Error("Product variant not found");
    }

    const quantity = data.quantity;

    const reservedQuantity =
        data.reservedQuantity ?? 0;

    if (reservedQuantity > quantity) {
        throw new Error(
            "Reserved quantity cannot be greater than total quantity"
        );
    }

    let inventory = await Inventory.findOne({
        where: {
            variantId,
        },
    });

    if (!inventory) {
        inventory = await Inventory.create({
            variantId,
            quantity,
            reservedQuantity,
        });
    } else {
        inventory.quantity = quantity;
        inventory.reservedQuantity = reservedQuantity;

        await inventory.save();
    }

    return inventory;
};