import Address from "./Address.js";
import Attribute from "./Attribute.js";
import AttributeValue from "./AttributeValue.js";
import Cart from "./Cart.js";
import CartItem from "./CartItem.js";
import Category from "./Category.js";
import Inventory from "./Inventory.js";
import Order from "./Order.js";
import OrderItem from "./OrderItem.js";
import OtpVerification from "./OtpVerification.js";
import Payment from "./Payment.js";
import PaymentMethod from "./PaymentMethod.js";
import Product from "./Product.js";
import ProductImage from "./ProductImage.js";
import ProductVariant from "./ProductVariant.js";
import Review from "./Review.js";
import SellerProfile from "./SellerProfile.js";
import User from "./User.js";
import VariantAttribute from "./VariantAttribute.js";

// USER ↔ SELLER PROFILE
User.hasOne(SellerProfile, {
    foreignKey: "userId",
    as: "sellerProfile",
});

SellerProfile.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});

// USER ↔ PRODUCT
User.hasMany(Product, {
    foreignKey: "sellerId",
    as: "products",
});

Product.belongsTo(User, {
    foreignKey: "sellerId",
    as: "seller",
});

// CATEGORY ↔ PRODUCT
Category.hasMany(Product, {
    foreignKey: "categoryId",
    as: "products",
});

Product.belongsTo(Category, {
    foreignKey: "categoryId",
    as: "category",
});

// PRODUCT ↔ PRODUCT IMAGE
Product.hasMany(ProductImage, {
    foreignKey: "productId",
    as: "images",
});

ProductImage.belongsTo(Product, {
    foreignKey: "productId",
    as: "product",
});

// ATTRIBUTE ↔ ATTRIBUTE VALUE
Attribute.hasMany(AttributeValue, {
    foreignKey: "attributeId",
    as: "values",
});

AttributeValue.belongsTo(Attribute, {
    foreignKey: "attributeId",
    as: "attribute",
});

// PRODUCT ↔ PRODUCT VARIANT
Product.hasMany(ProductVariant, {
    foreignKey: "productId",
    as: "variants",
});

ProductVariant.belongsTo(Product, {
    foreignKey: "productId",
    as: "product",
});

// PRODUCT VARIANT ↔ VARIANT ATTRIBUTE
ProductVariant.hasMany(VariantAttribute, {
    foreignKey: "variantId",
    as: "variantAttributes",
});

VariantAttribute.belongsTo(ProductVariant, {
    foreignKey: "variantId",
    as: "variant",
});

// ATTRIBUTE VALUE ↔ VARIANT ATTRIBUTE
VariantAttribute.belongsTo(AttributeValue, {
    foreignKey: "attributeValueId",
    as: "attributeValue",
});

AttributeValue.hasMany(VariantAttribute, {
    foreignKey: "attributeValueId",
    as: "variantAttributes",
});

// PRODUCT VARIANT ↔ INVENTORY
ProductVariant.hasOne(Inventory, {
    foreignKey: "variantId",
    as: "inventory",
});

Inventory.belongsTo(ProductVariant, {
    foreignKey: "variantId",
    as: "variant",
});

// USER ↔ ADDRESS
User.hasMany(Address, {
    foreignKey: "userId",
    as: "addresses",
});

Address.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});

// USER ↔ CART
User.hasOne(Cart, {
    foreignKey: "userId",
    as: "cart",
});

Cart.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});

// CART ↔ CART ITEM
Cart.hasMany(CartItem, {
    foreignKey: "cartId",
    as: "items",
});

CartItem.belongsTo(Cart, {
    foreignKey: "cartId",
    as: "cart",
});

// PRODUCT VARIANT ↔ CART ITEM
ProductVariant.hasMany(CartItem, {
    foreignKey: "variantId",
    as: "cartItems",
});

CartItem.belongsTo(ProductVariant, {
    foreignKey: "variantId",
    as: "variant",
});


// USER ↔ ORDER
User.hasMany(Order, {
    foreignKey: "userId",
    as: "orders",
});

Order.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});


// ADDRESS ↔ ORDER
Address.hasMany(Order, {
    foreignKey: "addressId",
    as: "orders",
});

Order.belongsTo(Address, {
    foreignKey: "addressId",
    as: "address",
});


// ORDER ↔ ORDER ITEM
Order.hasMany(OrderItem, {
    foreignKey: "orderId",
    as: "items",
});

OrderItem.belongsTo(Order, {
    foreignKey: "orderId",
    as: "order",
});


// PRODUCT VARIANT ↔ ORDER ITEM
ProductVariant.hasMany(OrderItem, {
    foreignKey: "variantId",
    as: "orderItems",
});

OrderItem.belongsTo(ProductVariant, {
    foreignKey: "variantId",
    as: "variant",
});

// USER ↔ PAYMENT METHOD
User.hasMany(PaymentMethod, {
    foreignKey: "userId",
    as: "paymentMethods",
});

PaymentMethod.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});

// USER ↔ PAYMENT
User.hasMany(Payment, {
    foreignKey: "userId",
    as: "payments",
});

Payment.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});

// ORDER ↔ PAYMENT
Order.hasMany(Payment, {
    foreignKey: "orderId",
    as: "payments",
});

Payment.belongsTo(Order, {
    foreignKey: "orderId",
    as: "order",
});


// PAYMENT METHOD ↔ PAYMENT
PaymentMethod.hasMany(Payment, {
    foreignKey: "paymentMethodId",
    as: "payments",
});

Payment.belongsTo(PaymentMethod, {
    foreignKey: "paymentMethodId",
    as: "paymentMethod",
});


// USER ↔ REVIEW
User.hasMany(Review, {
    foreignKey: "userId",
    as: "reviews",
});

Review.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});


// PRODUCT ↔ REVIEW
Product.hasMany(Review, {
    foreignKey: "productId",
    as: "reviews",
});

Review.belongsTo(Product, {
    foreignKey: "productId",
    as: "product",
});


// EXPORT MODELS
export {
    Address,
    Attribute,
    AttributeValue,
    Cart,
    CartItem,
    Category,
    Inventory,
    Order,
    OrderItem,
    OtpVerification,
    Payment,
    PaymentMethod,
    Product,
    ProductImage,
    ProductVariant,
    Review,
    SellerProfile,
    User,
    VariantAttribute
};

