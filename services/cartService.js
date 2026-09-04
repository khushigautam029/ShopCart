import {
    Attribute,
    AttributeValue,
    Cart,
    CartItem,
    Category,
    Inventory,
    Product,
    ProductVariant,
    VariantAttribute,
} from "../models/index.js";

import AppError from "../utils/AppError.js";
import { STATUS_CODES } from "../utils/setConstants.js";


const getOrCreateCart = async (userId) => {
    const [cart] = await Cart.findOrCreate({
        where: {
            userId,
        },
    });

    return cart;
};


const getVariantDetails = async (variantId) => {
    const variant = await ProductVariant.findOne({
        where: {
            id: variantId,
            status: "ACTIVE",
        },

        include: [
            {
                model: Product,
                as: "product",
                where: {
                    status: "ACTIVE",
                },
                include: [
                    {
                        model: Category,
                        as: "category",
                    },
                ],
            },

            {
                model: Inventory,
                as: "inventory",
            },

            {
                model: VariantAttribute,
                as: "variantAttributes",
                include: [
                    {
                        model: AttributeValue,
                        as: "attributeValue",
                        include: [
                            {
                                model: Attribute,
                                as: "attribute",
                            },
                        ],
                    },
                ],
            },
        ],
    });

    if (!variant) {
        throw new AppError(
            "Product variant not found or unavailable",
            STATUS_CODES.NOT_FOUND
        );
    }

    return variant;
};


const getAvailableStock = (inventory) => {
    if (!inventory) {
        return 0;
    }

    return Math.max(
        0,
        inventory.quantity - inventory.reservedQuantity
    );
};


export const addToCart = async (userId, variantId, quantity) => {
    const cart = await getOrCreateCart(userId);

    const variant = await getVariantDetails(variantId);

    const availableStock = getAvailableStock(
        variant.inventory
    );

    if (availableStock === 0) {
        throw new AppError(
            "Product is out of stock",
            STATUS_CODES.CONFLICT
        );
    }

    const existingItem = await CartItem.findOne({
        where: {
            cartId: cart.id,
            variantId,
        },
    });

    const newQuantity = existingItem
        ? existingItem.quantity + quantity
        : quantity;

    if (newQuantity > availableStock) {
        throw new AppError(
            `Only ${availableStock} item(s) available in stock`,
            STATUS_CODES.CONFLICT
        );
    }

    if (existingItem) {
        existingItem.quantity = newQuantity;

        await existingItem.save();

        return existingItem;
    }

    const cartItem = await CartItem.create({
        cartId: cart.id,
        variantId,
        quantity,
    });

    return cartItem;
};


export const getCart = async (userId) => {
    const cart = await getOrCreateCart(userId);

    const items = await CartItem.findAll({
        where: {
            cartId: cart.id,
        },

        include: [
            {
                model: ProductVariant,
                as: "variant",

                include: [
                    {
                        model: Product,
                        as: "product",
                        include: [
                            {
                                model: Category,
                                as: "category",
                            },
                        ],
                    },

                    {
                        model: Inventory,
                        as: "inventory",
                    },

                    {
                        model: VariantAttribute,
                        as: "variantAttributes",
                        include: [
                            {
                                model: AttributeValue,
                                as: "attributeValue",
                                include: [
                                    {
                                        model: Attribute,
                                        as: "attribute",
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],

        order: [["created_at", "ASC"]],
    });

    let totalItems = 0;
    let subtotal = 0;

    const formattedItems = items.map((item) => {
        const variant = item.variant;

        const price = Number(
            variant.price ?? variant.product.price
        );

        const itemSubtotal =
            price * item.quantity;

        totalItems += item.quantity;
        subtotal += itemSubtotal;

        return {
            id: item.id,
            quantity: item.quantity,
            variant: {
                id: variant.id,
                sku: variant.sku,
                price,
                product: {
                    id: variant.product.id,
                    name: variant.product.name,
                    description: variant.product.description,
                },
                attributes:
                    variant.variantAttributes.map(
                        (variantAttribute) => ({
                            attribute:
                                variantAttribute
                                    .attributeValue
                                    ?.attribute?.name,
                            value:
                                variantAttribute
                                    .attributeValue?.value,
                        })
                    ),
                availableStock:
                    getAvailableStock(
                        variant.inventory
                    ),
            },
            subtotal: Number(
                itemSubtotal.toFixed(2)
            ),
        };
    });
    return {
        id: cart.id,
        items: formattedItems,
        totalItems,
        subtotal: Number(subtotal.toFixed(2)),
    };
};

export const updateCartItem = async (
    userId,
    itemId,
    quantity
) => {
    const cart = await getOrCreateCart(userId);
    const cartItem = await CartItem.findOne({
        where: {
            id: itemId,
            cartId: cart.id,
        },
        include: [
            {
                model: ProductVariant,
                as: "variant",
                include: [
                    {
                        model: Inventory,
                        as: "inventory",
                    },
                ],
            },
        ],
    });
    if (!cartItem) {
        throw new AppError(
            "Cart item not found",
            STATUS_CODES.NOT_FOUND
        );
    }
    const availableStock = getAvailableStock(
        cartItem.variant.inventory
    );
    if (quantity > availableStock) {
        throw new AppError(
            `Only ${availableStock} item(s) available in stock`,
            STATUS_CODES.CONFLICT
        );
    }
    cartItem.quantity = quantity;
    await cartItem.save();
    return cartItem;
};


export const removeCartItem = async (
    userId,
    itemId
) => {
    const cart = await getOrCreateCart(userId);
    const cartItem = await CartItem.findOne({
        where: {
            id: itemId,
            cartId: cart.id,
        },
    });
    if (!cartItem) {
        throw new AppError(
            "Cart item not found",
            STATUS_CODES.NOT_FOUND
        );
    }
    await cartItem.destroy();
};


export const clearCart = async (userId) => {
    const cart = await getOrCreateCart(userId);
    await CartItem.destroy({
        where: {
            cartId: cart.id,
        },
    });
};