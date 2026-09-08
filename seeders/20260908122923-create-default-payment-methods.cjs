"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("payment_methods", [
            {
                name: "Cash on Delivery",
                code: "COD",
                type: "CASH",
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "UPI",
                code: "UPI",
                type: "ONLINE",
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Net Banking",
                code: "NET_BANKING",
                type: "ONLINE",
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Credit Card",
                code: "CREDIT_CARD",
                type: "CARD",
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Debit Card",
                code: "DEBIT_CARD",
                type: "CARD",
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("payment_methods", {
            code: {
                [Sequelize.Op.in]: [
                    "COD",
                    "UPI",
                    "NET_BANKING",
                    "CREDIT_CARD",
                    "DEBIT_CARD",
                ],
            },
        });
    },
};