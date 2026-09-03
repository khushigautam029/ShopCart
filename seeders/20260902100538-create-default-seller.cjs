"use strict";

module.exports = {
    async up(queryInterface) {
        const [users] = await queryInterface.sequelize.query(`
            SELECT id
            FROM users
            WHERE phone = '9876543211'
            LIMIT 1
        `);

        let userId;

        if (users.length > 0) {
            userId = users[0].id;
        } else {
            await queryInterface.bulkInsert("users", [
                {
                    name: "ShopCart Seller",
                    phone: "9876543211",
                    role: "SELLER",
                    status: "ACTIVE",
                    is_verified: true,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ]);

            const [newUsers] = await queryInterface.sequelize.query(`
                SELECT id
                FROM users
                WHERE phone = '9876543211'
                LIMIT 1
            `);

            userId = newUsers[0].id;
        }

        const [profiles] =
            await queryInterface.sequelize.query(`
                SELECT id
                FROM seller_profiles
                WHERE user_id = ${userId}
                LIMIT 1
            `);

        if (profiles.length === 0) {
            await queryInterface.bulkInsert("seller_profiles", [
                {
                    user_id: userId,
                    store_name: "ShopCart Store",
                    store_description:
                        "Official ShopCart seller store",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ]);
        }
    },

    async down(queryInterface) {
        const [users] = await queryInterface.sequelize.query(`
            SELECT id
            FROM users
            WHERE phone = '9876543211'
            LIMIT 1
        `);

        if (users.length > 0) {
            await queryInterface.bulkDelete(
                "seller_profiles",
                {
                    user_id: users[0].id,
                }
            );

            await queryInterface.bulkDelete(
                "users",
                {
                    id: users[0].id,
                }
            );
        }
    },
};