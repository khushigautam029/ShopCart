import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const WishlistItem = sequelize.define(
    "WishlistItem",{
        "id":{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        "wishlistId":{
            type:DataTypes.INTEGER,
            allowNull:false,
            field:"wishlist_id",
        },
        "productId":{
            type:DataTypes.INTEGER,
            allowNull:false,
            field: "product_id",
        },
    },{
        tableName: "wishlist_items",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        indexes: [
            { unique: true, fields: ["wishlist_id", "product_id"], },
        ],
    }
);

export default WishlistItem;