import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Wishlist = sequelize.define(
    "Wishlist",{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull:false,
            unique:true,
            field:"user_id",
        },
    },{
        tableName:"wishlists",
        timestamps:true,
        createdAt:"created_at",
        updatedAt:"updated_at",
    }
);

export default Wishlist;
