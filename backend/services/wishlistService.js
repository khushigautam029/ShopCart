import { NUMBER } from "sequelize";
import {
    Cart,
    CartItem,
    Inventory,
    Product,
    ProductImage,
    ProductVariant,
    Wishlist,
    WishlistItem,
} from "../models/index.js";

export const addToWishlist = async (userId, productId) => {
    const product = await Product.findOne({
        where: {
            id: productId,
            status: "ACTIVE",
        },
    });
    if (!product) {
        throw new Error("Product not found");
    }
    let wishlist = await Wishlist.findOne({
        where: {
            userId,
        },
    });
    if (!wishlist) {
        wishlist = await Wishlist.create({
            userId
        });
    }
    const existingItem = await WishlistItem.findOne({
        where: {
            wishlistId: wishlist.id,
            productId,
        },
    });
    if (existingItem) {
        throw new Error("Product is already in the Wishlist");
    }

    //Add the product
    const wishlistItem = await WishlistItem.create({
        wishlistId: wishlist.id,
        productId
    });
    return wishlistItem;
};

export const getWishlist = async (userId) => {
    const wishlist = await Wishlist.findOne({
        where: {
            userId,
        },
        include: [{
            model: WishlistItem, as: "items",
            include: [{
                model: Product, as: "product",
                where: { status: "ACTIVE", },
                attributes: ["id", "name", "description", "price",],
                include: [{
                    model: ProductImage, as: "images",
                    attributes: ["id", "imageUrl", "isPrimary", "sortOrder",],
                    required: false,
                },],
            },],
        },],
    });

    //customer don't have a wishlist yet
    if (!wishlist) {
        return {
            id: null,
            userId,
            items: [],
        };
    }
    return wishlist;
};

//Remove product from the wishlist
export const removeFromWishlist = async (userId, productId) => {
    const wishlist = await Wishlist.findOne({
        where: {
            userId,
        }
    });
    if (!wishlist) {
        throw new Error("WishList not found");
    }
    const wishlistItem = await WishlistItem.findOne({
        where: {
            wishlistId: wishlist.id,
            productId,
        },
    });
    if (!wishlistItem) {
        throw new Error("Product is not in your wishlist");
    }
    await wishlistItem.destroy();
    return true;
};

export const addWishlistItemToCart = async (
    userId,
    productId,
    variantId,
    quantity,
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
    const wishlist = await Wishlist.findOne({
        where: {
            userId,
        },
    });
    if (!wishlist) {
        throw new Error("Wishlist not found");
    }
    const wishlistItem = await WishlistItem.findOne({
        where: {
            wishlistId: wishlist.id,
            productId,
        },
    });
    if (!wishlistItem) {
        throw new Error("Wishlist item not found");
    }
    const variant = await ProductVariant.findOne({
        where: {
            id: variantId,
            productId,
            status: "ACTIVE",
        },
        include: [
            {
                model: Inventory,
                as: "inventory",
            },
        ],
    });
    if (!variant) {
        throw new Error("Product variant not found or inactive");
    }
    const availableStock = NUMBER(Inventory.quantity) - NUMBER(Inventory.reservedQuantity);
    if (availableStock < Number(quantity)) {
        throw new Error(
            `Insufficient stock. Available quantity: ${availableStock}`
        );
    }
    // 5. Find customer's cart
    let cart = await Cart.findOne({
        where: {
            userId,
        },
    });
    // 6. Create cart if customer doesn't have one
    if (!cart) {
        cart = await Cart.create({
            userId,
        });
    }
    // 7. Check if variant is already in cart
    const existingCartItem = await CartItem.findOne({
        where: {
            cartId: cart.id,
            variantId,
        },
    });
    if (existingCartItem) {
        const newQuantity =
            Number(existingCartItem.quantity) +
            Number(quantity);
        if (newQuantity > availableStock) {
            throw new Error(
                `Cannot add more items. Available quantity: ${availableStock}`
            );
        }
        existingCartItem.quantity = newQuantity;
        await existingCartItem.save();
        return existingCartItem;
    }
    // 8. Add new item to cart
    const cartItem = await CartItem.create({
        cartId: cart.id,
        variantId,
        quantity,
    });
    return cartItem;
};