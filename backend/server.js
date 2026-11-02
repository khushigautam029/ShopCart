import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import sequelize from "./config/database.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {

    try {
        await sequelize.authenticate();
        console.log("✅ MySQL database connected successfully");
        await sequelize.sync();
        // const [results] = await sequelize.query("SHOW TABLES;");
        // console.log("📋 Tables in Aiven database:");
        // console.table(results);
        app.listen(PORT, () => {
            console.log(
                `🚀 ShopCart server running on port ${PORT}`
            );
        });
    } catch (error) {
        console.error("❌ Unable to connect to database");
        console.error(error.message);
        process.exit(1);
    }
};

startServer();