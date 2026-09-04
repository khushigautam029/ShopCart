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
import User from "./User.js";
import VariantAttribute from "./VariantAttribute.js";
import SellerProfile from "./sellerProfile.js";

User.hasOne(SellerProfile, {
    foreignKey: "userId",
    as: "sellerProfile",
});

SellerProfile.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});

User.hasMany(Product,{
    foreignKey: "sellerId",
    as: "products",
});

Product.belongsTo(User,{
    foreignKey: "sellerId",
    as: "seller",
});

Category.hasMany(Product,{
    foreignKey: "categoryId",
    as: "products",
});

Product.belongsTo(Category,{
    foreignKey:"categoryId",
    as:"category",
});

Product.hasMany(ProductImage, {
    foreignKey: "productId",
    as: "images",
});

ProductImage.belongsTo(Product, {
    foreignKey: "productId",
    as: "product",
});

Attribute.hasMany(AttributeValue, {
    foreignKey: "attributeId",
    as: "values",
});

AttributeValue.belongsTo(Attribute, {
    foreignKey: "attributeId",
    as: "attribute",
});

Product.hasMany(ProductVariant, {
    foreignKey: "productId",
    as: "variants",
});

ProductVariant.belongsTo(Product, {
    foreignKey: "productId",
    as: "product",
});

ProductVariant.hasMany(VariantAttribute, {
    foreignKey: "variantId",
    as: "variantAttributes",
});

VariantAttribute.belongsTo(ProductVariant, {
    foreignKey: "variantId",
    as: "variant",
});

VariantAttribute.belongsTo(AttributeValue, {
    foreignKey: "attributeValueId",
    as: "attributeValue",
});

AttributeValue.hasMany(VariantAttribute, {
    foreignKey: "attributeValueId",
    as: "variantAttributes",
});

ProductVariant.hasOne(Inventory, {
    foreignKey: "variantId",
    as: "inventory",
});

Inventory.belongsTo(ProductVariant, {
    foreignKey: "variantId",
    as: "variant",
});

User.hasMany(Address, {
    foreignKey: "userId",
    as: "addresses",
});

Address.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});

User.hasOne(Cart, {
    foreignKey: "userId",
    as: "cart",
});

Cart.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});

Cart.hasMany(CartItem, {
    foreignKey: "cartId",
    as: "items",
});

CartItem.belongsTo(Cart, {
    foreignKey: "cartId",
    as: "cart",
});

ProductVariant.hasMany(CartItem, {
    foreignKey: "variantId",
    as: "cartItems",
});

CartItem.belongsTo(ProductVariant, {
    foreignKey: "variantId",
    as: "variant",
});

User.hasMany(Order, {
    foreignKey: "userId",
    as: "orders",
});

Order.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});


Address.hasMany(Order, {
    foreignKey: "addressId",
    as: "orders",
});

Order.belongsTo(Address, {
    foreignKey: "addressId",
    as: "address",
});


Order.hasMany(OrderItem, {
    foreignKey: "orderId",
    as: "items",
});

OrderItem.belongsTo(Order, {
    foreignKey: "orderId",
    as: "order",
});


ProductVariant.hasMany(OrderItem, {
    foreignKey: "variantId",
    as: "orderItems",
});

OrderItem.belongsTo(ProductVariant, {
    foreignKey: "variantId",
    as: "variant",
});

User.hasMany(PaymentMethod, {
    foreignKey: "userId",
    as: "paymentMethods",
});

PaymentMethod.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});

User.hasMany(Payment, {
    foreignKey: "userId",
    as: "payments",
});

Payment.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});

Order.hasMany(Payment, {
    foreignKey: "orderId",
    as: "payments",
});

Payment.belongsTo(Order, {
    foreignKey: "orderId",
    as: "order",
});

PaymentMethod.hasMany(Payment, {
    foreignKey: "paymentMethodId",
    as: "payments",
});

Payment.belongsTo(PaymentMethod, {
    foreignKey: "paymentMethodId",
    as: "paymentMethod",
});



export {
    Address, Attribute,
    AttributeValue, Cart, CartItem, Category, Inventory, Order, OrderItem, OtpVerification, Payment, PaymentMethod, Product,
    ProductImage, ProductVariant, SellerProfile, User, VariantAttribute
};

