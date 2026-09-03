import { Category } from "../models/index.js";

export const createCategory = async (categoryData) =>{
    const existingCategory = await Category.findOne({
        where:{
            name: categoryData.name,
        },
    });
    if (existingCategory) {
        throw new Error("Category with this name already exists");
    }
    return await Category.create(categoryData);
};

export const getAllCategories = async ()=>{
    return await Category.findAll({
        order:[["created_at","DESC"]],
    });
};

export const getCategoryById = async (categoryId) =>{
    const category = await Category.findByPk(categoryId);
    if (!category){
        throw new Error("Category not found");
    }
    return category;
};

export const updateCategory = async (categoryId,updateData)=>{
    const category = await Category.findByPk(categoryId);
    if (!category){
        throw new Error("Category not found");
    }
    if (updateData.name && updateData.name !== category.name){
        const existingCategory = await Category.findOne({
            where:{
                name:updateData.name,
            },
        });
        if (existingCategory){
            throw new Error("Category with this name already exists");
        }
    }
    await category.update(updateData);
    return category;
};

export const deleteCategory = async (categoryId)=>{
    const category = await Category.findByPk(categoryId);
    if (!category){
        throw new Error("Category not found");
    }
    await category.destroy();
    return true;
};
