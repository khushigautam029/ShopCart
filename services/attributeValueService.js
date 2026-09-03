import {
    Attribute,
    AttributeValue,
} from "../models/index.js";

export const createAttributeValue = async (
    attributeId,
    data
) => {
    const attribute = await Attribute.findByPk(attributeId);

    if (!attribute) {
        throw new Error("Attribute not found");
    }

    const existingValue = await AttributeValue.findOne({
        where: {
            attributeId,
            value: data.value,
        },
    });

    if (existingValue) {
        throw new Error("Attribute value already exists");
    }

    return await AttributeValue.create({
        attributeId,
        value: data.value,
    });
};

export const getAttributeValues = async (attributeId) => {
    const attribute = await Attribute.findByPk(attributeId);

    if (!attribute) {
        throw new Error("Attribute not found");
    }

    return await AttributeValue.findAll({
        where: {
            attributeId,
        },
        order: [["created_at", "ASC"]],
    });
};

export const getAttributeValueById = async (
    attributeId,
    valueId
) => {
    const value = await AttributeValue.findOne({
        where: {
            id: valueId,
            attributeId,
        },
    });

    if (!value) {
        throw new Error("Attribute value not found");
    }

    return value;
};

export const updateAttributeValue = async (
    attributeId,
    valueId,
    data
) => {
    const value = await AttributeValue.findOne({
        where: {
            id: valueId,
            attributeId,
        },
    });

    if (!value) {
        throw new Error("Attribute value not found");
    }

    if (data.value !== value.value) {
        const existingValue =
            await AttributeValue.findOne({
                where: {
                    attributeId,
                    value: data.value,
                },
            });

        if (existingValue) {
            throw new Error(
                "Attribute value already exists"
            );
        }
    }

    await value.update({
        value: data.value,
    });

    return value;
};

export const deleteAttributeValue = async (
    attributeId,
    valueId
) => {
    const value = await AttributeValue.findOne({
        where: {
            id: valueId,
            attributeId,
        },
    });

    if (!value) {
        throw new Error("Attribute value not found");
    }

    await value.destroy();

    return true;
};