import { Attribute } from "../models/index.js";

export const createAttribute = async (data) => {
    const existingAttribute = await Attribute.findOne({
        where: {
            name: data.name,
        },
    });

    if (existingAttribute) {
        throw new Error("Attribute already exists");
    }

    return await Attribute.create({
        name: data.name,
    });
};

export const getAllAttributes = async () => {
    return await Attribute.findAll({
        order: [["created_at", "DESC"]],
    });
};

export const getAttributeById = async (id) => {
    const attribute = await Attribute.findByPk(id);

    if (!attribute) {
        throw new Error("Attribute not found");
    }

    return attribute;
};

export const updateAttribute = async (id, data) => {
    const attribute = await Attribute.findByPk(id);

    if (!attribute) {
        throw new Error("Attribute not found");
    }

    if (data.name !== attribute.name) {
        const existingAttribute = await Attribute.findOne({
            where: {
                name: data.name,
            },
        });

        if (existingAttribute) {
            throw new Error("Attribute already exists");
        }
    }

    await attribute.update({
        name: data.name,
    });

    return attribute;
};

export const deleteAttribute = async (id) => {
    const attribute = await Attribute.findByPk(id);

    if (!attribute) {
        throw new Error("Attribute not found");
    }

    await attribute.destroy();

    return true;
};