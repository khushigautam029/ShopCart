"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("users", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },

            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            email: {
                type: Sequelize.STRING(150),
                allowNull: false,
                unique: true,
            },

            phone: {
                type: Sequelize.STRING(15),
                allowNull: false,
                unique: true,
            },

            password: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },

            role: {
                type: Sequelize.ENUM("SELLER", "CUSTOMER"),
                allowNull: false,
                defaultValue: "CUSTOMER",
            },

            is_verified: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },

            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },

            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable("users");

        // Required for MySQL when using Sequelize ENUM.
        await queryInterface.sequelize.query(
            'DROP TYPE IF EXISTS "enum_users_role";'
        );
    },
};