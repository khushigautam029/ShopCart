import {
    Product,
    ProductImage,
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
    if (!wishlist){
        return {
            id:null,
            userId,
            items:[],
        };
    }
    return wishlist;
};

//Remove product from the wishlist
export const removeFromWishlist = async(userId , productId) => {
    const wishlist = await Wishlist.findOne({
        where:{
            userId,
        }
    });
    if (!wishlist){
        throw new Error ("WishList not found");
    }
    const wishlistItem = await WishlistItem.findOne({
    where: {
        wishlistId: wishlist.id,
        productId,
    },
});
    if (!wishlistItem){
        throw new Error ("Product is not in your wishlist");
    }
    await wishlistItem.destroy();
    return true;
};