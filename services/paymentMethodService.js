import PaymentMethod from "../models/PaymentMethod.js";

export const getPaymentMethods = async (userId) => {
    return await PaymentMethod.findAll({
        where: {
            userId,
        },
        attributes: [
            "id",
            "type",
            "provider",
            "last4",
            "cardBrand",
            "isDefault",
            "createdAt",
        ],
        order: [["createdAt", "DESC"]],
    });
};

export const addPaymentMethod = async (userId, data) => {
    const paymentMethod = await PaymentMethod.create({
        userId,
        type: data.type,
        provider: data.provider,
        providerPaymentMethodId: data.providerPaymentMethodId,
    });

    return paymentMethod;
};

export const deletePaymentMethod = async (userId, paymentMethodId) => {
    const paymentMethod = await PaymentMethod.findOne({
        where: {
            id: paymentMethodId,
            userId,
        },
    });

    if (!paymentMethod) {
        throw new Error("Payment method not found");
    }

    await paymentMethod.destroy();
};

export const setDefaultPaymentMethod = async (
    userId,
    paymentMethodId
) => {
    const paymentMethod = await PaymentMethod.findOne({
        where: {
            id: paymentMethodId,
            userId,
        },
    });

    if (!paymentMethod) {
        throw new Error("Payment method not found");
    }

    await PaymentMethod.update(
        {
            isDefault: false,
        },
        {
            where: {
                userId,
            },
        }
    );

    paymentMethod.isDefault = true;
    await paymentMethod.save();

    return paymentMethod;
};