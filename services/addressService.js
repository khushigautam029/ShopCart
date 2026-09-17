import sequelize from "../config/database.js";
import { Address } from "../models/index.js";

const setDefaultAddress = async (
    userId,
    addressId,
    transaction
) => {
    // First remove default from all user's addresses
    await Address.update(
        {
            isDefault: false,
        },
        {
            where: {
                userId,
            },
            transaction,
        }
    );

    // Then make selected address default
    await Address.update(
        {
            isDefault: true,
        },
        {
            where: {
                id: addressId,
                userId,
            },
            transaction,
        }
    );
};

export const createAddress = async (
    userId,
    data
) => {
    const transaction = await sequelize.transaction();
    try {
        const address = await Address.create(
            {
                userId,
                ...data,
            },
            {
                transaction,
            }
        );
        if (data.isDefault === true) {
            await setDefaultAddress(
                userId,
                address.id,
                transaction
            );
        }
        await transaction.commit();
        return address;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export const getAddresses = async (userId) => {
    return await Address.findAll({
        where: {
            userId,
        },
        order: [
            ["isDefault", "DESC"],
            ["created_at", "DESC"],
        ],
    });
};

export const getAddressById = async (
    userId,
    addressId
) => {
    return await Address.findOne({
        where: {
            id: addressId,
            userId,
        },
    });
};

export const updateAddress = async (
    userId,
    addressId,
    data
) => {
    const transaction = await sequelize.transaction();
    try {
        const address = await Address.findOne({
            where: {
                id: addressId,
                userId,
            },
            transaction,
            lock: transaction.LOCK.UPDATE,
        });

        if (!address) {
            throw new Error("Address not found");
        }

        await address.update(data, {
            transaction,
        });

        if (data.isDefault === true) {
            await setDefaultAddress(
                userId,
                address.id,
                transaction
            );
        }
        await transaction.commit();
        return address;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export const deleteAddress = async (
    userId,
    addressId
) => {
    const address = await Address.findOne({
        where: {
            id: addressId,
            userId,
        },
    });
    if (!address) {
        throw new Error("Address not found");
    }
    await address.destroy();
    return true;
};

export const makeDefaultAddress = async (
    userId,
    addressId
) => {
    const transaction = await sequelize.transaction();
    try {
        const address = await Address.findOne({
            where: {
                id: addressId,
                userId,
            },
            transaction,
            lock: transaction.LOCK.UPDATE,
        });
        if (!address) {
            throw new Error("Address not found");
        }
        await setDefaultAddress(
            userId,
            addressId,
            transaction
        );
        await transaction.commit();
        return await Address.findOne({
            where: {
                id: addressId,
                userId,
            },
        });
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};