import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const CartItem = sequelize.define(
    "CartItem",{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        cartId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            field:"cart_id",
        },
        variantId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            field:"variant_id",
        },
        quantity:{
            type:DataTypes.INTEGER,
            defaultValue:1,
            allowNull:false,
        },
    },{
        tableName: "cart_items",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",

        indexes: [
            {
                unique: true,
                fields: ["cart_id", "variant_id"],
            },
        ],
    }
);

export default CartItem;