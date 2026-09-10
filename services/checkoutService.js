import sequelize from "../config/database.js";
import Address from "../models/Address.js";
import Cart from "../models/Cart.js";
import CartItem from "../models/CartItem.js";
import Inventory from "../models/Inventory.js";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import OrderStatusHistory from "../models/OrderStatusHistory.js";
import Product from "../models/Product.js";
import ProductVariant from "../models/ProductVariant.js";
import AppError from "../utils/AppError.js";
import { STATUS_CODES } from "../utils/setConstants.js";

export const checkout = async (userId, data) => {
    const transaction = await sequelize.transaction();

    try {
        const { addressId } = data;

        // 1. Check address
        const address = await Address.findOne({
            where: {
                id: addressId,
                userId,
            },
            transaction,
        });

        if (!address) {
            throw new AppError(
                "Address not found",
                STATUS_CODES.NOT_FOUND
            );
        }

        // 2. Check cart
        const cart = await Cart.findOne({
            where: {
                userId,
            },
            transaction,
        });

        if (!cart) {
            throw new AppError(
                "Cart not found",
                STATUS_CODES.NOT_FOUND
            );
        }

        // 3. Get cart items with product, variant and inventory
        const cartItems = await CartItem.findAll({
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
                            attributes: [
                                "id",
                                "name",
                                "price",
                                "status",
                            ],
                        },
                        {
                            model: Inventory,
                            as: "inventory",
                        },
                    ],
                },
            ],
            transaction,
            lock: transaction.LOCK.UPDATE,
        });

        if (cartItems.length === 0) {
            throw new AppError(
                "Cart is empty",
                STATUS_CODES.BAD_REQUEST
            );
        }

        // 4. Calculate subtotal and prepare order items
        let subtotal = 0;
        const orderItemsData = [];

        for (const cartItem of cartItems) {
            const variant = cartItem.variant;

            if (!variant) {
                throw new AppError(
                    `Product variant not found for cart item ${cartItem.id}`,
                    STATUS_CODES.NOT_FOUND
                );
            }

            const product = variant.product;

            if (!product) {
                throw new AppError(
                    `Product not found for variant ${variant.id}`,
                    STATUS_CODES.NOT_FOUND
                );
            }

            // Product status
            if (product.status !== "ACTIVE") {
                throw new AppError(
                    `Product "${product.name}" is inactive`,
                    STATUS_CODES.BAD_REQUEST
                );
            }

            // Variant status
            if (variant.status !== "ACTIVE") {
                throw new AppError(
                    `Product variant "${variant.sku}" is inactive`,
                    STATUS_CODES.BAD_REQUEST
                );
            }

            // Variant price
            if (!variant.price) {
                throw new AppError(
                    `Price not available for variant "${variant.sku}"`,
                    STATUS_CODES.BAD_REQUEST
                );
            }

            const inventory = variant.inventory;

            if (!inventory) {
                throw new AppError(
                    `Inventory not found for variant "${variant.sku}"`,
                    STATUS_CODES.NOT_FOUND
                );
            }

            // Available stock = actual quantity - already reserved
            const availableQuantity =
                Number(inventory.quantity) -
                Number(inventory.reservedQuantity);

            if (availableQuantity < Number(cartItem.quantity)) {
                throw new AppError(
                    `Insufficient stock for "${product.name}". Available: ${availableQuantity}`,
                    STATUS_CODES.BAD_REQUEST
                );
            }

            const unitPrice = Number(variant.price);
            const quantity = Number(cartItem.quantity);
            const itemSubtotal = unitPrice * quantity;

            subtotal += itemSubtotal;

            orderItemsData.push({
                variantId: variant.id,
                productName: product.name,
                sku: variant.sku,
                quantity,
                unitPrice,
                subtotal: itemSubtotal,
            });
        }

        // 5. Calculate totals
        const discount = 0;

        // Free shipping for now
        const shippingFee = 0;

        const totalAmount =
            subtotal - discount + shippingFee;

        // 6. Generate order number
        const orderNumber = `ORD-${Date.now()}-${userId}`;

        // 7. Create order
        // Payment is NOT created here.
        // Order remains PENDING until payment succeeds.
        const order = await Order.create(
            {
                userId,
                addressId,
                orderNumber,
                subtotal,
                discount,
                shippingFee,
                totalAmount,
                status: "PENDING",
                paymentStatus: "PENDING",
            },
            {
                transaction,
            }
        );

        // 8. Create order items
        const orderItems = orderItemsData.map((item) => ({
            orderId: order.id,
            ...item,
        }));

        await OrderItem.bulkCreate(orderItems, {
            transaction,
        });

        // 9. Reserve inventory
        for (const cartItem of cartItems) {
            const inventory = cartItem.variant.inventory;

            inventory.reservedQuantity =
                Number(inventory.reservedQuantity) +
                Number(cartItem.quantity);

            await inventory.save({
                transaction,
            });
        }

        // 10. Add initial order history
        await OrderStatusHistory.create(
            {
                orderId: order.id,
                status: "PENDING",
                note: "Order placed and awaiting payment",
                changedBy: userId,
            },
            {
                transaction,
            }
        );

        // 11. Clear cart
        await CartItem.destroy({
            where: {
                cartId: cart.id,
            },
            transaction,
        });

        await transaction.commit();

        return {
            order,
            orderItems,
        };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};
