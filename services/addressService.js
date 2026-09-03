import { Address } from "../models/index.js";

const setDefaultAddress = async (userId, addressId) => {
    await Address.update(
        {
            isDefault: false,
        },
        {
            where: {
                userId,
            },
        }
    );

    await Address.update(
        {
            isDefault: true,
        },
        {
            where: {
                id: addressId,
                userId,
            },
        }
    );
};

export const createAddress = async (
    userId,
    data
) => {
    const address = await Address.create({
        userId,
        ...data,
    });

    if (data.isDefault === true) {
        await setDefaultAddress(
            userId,
            address.id
        );
    }

    return address;
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
    const address = await Address.findOne({
        where: {
            id: addressId,
            userId,
        },
    });

    if (!address) {
        throw new Error("Address not found");
    }

    await address.update(data);

    if (data.isDefault === true) {
        await setDefaultAddress(
            userId,
            address.id
        );
    }

    return address;
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
    const address = await Address.findOne({
        where: {
            id: addressId,
            userId,
        },
    });

    if (!address) {
        throw new Error("Address not found");
    }

    await setDefaultAddress(
        userId,
        addressId
    );

    return await Address.findByPk(addressId);
};