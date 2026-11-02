"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("otp_verifications", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },

            phone: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },

            otp: {
                type: Sequelize.STRING(6),
                allowNull: false,
            },

            expires_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },

            verified_at: {
                type: Sequelize.DATE,
                allowNull: true,
            },

            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable("otp_verifications");
    },
};