"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.removeColumn("users", "email");
        await queryInterface.removeColumn("users", "password");

        await queryInterface.changeColumn("users", "name", {
            type: Sequelize.STRING(100),
            allowNull: true,
        });

        await queryInterface.changeColumn("users", "phone", {
            type: Sequelize.STRING(15),
            allowNull: false,
            unique: true,
        });

        await queryInterface.changeColumn("users", "role", {
            type: Sequelize.ENUM("CUSTOMER", "SELLER"),
            allowNull: false,
            defaultValue: "CUSTOMER",
        });

        await queryInterface.addColumn("users", "status", {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE", "BLOCKED"),
            allowNull: false,
            defaultValue: "ACTIVE",
        });

        await queryInterface.changeColumn("users", "is_verified", {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.addColumn("users", "email", {
            type: Sequelize.STRING(150),
            allowNull: true,
            unique: true,
        });

        await queryInterface.addColumn("users", "password", {
            type: Sequelize.STRING(255),
            allowNull: true,
        });

        await queryInterface.removeColumn("users", "status");

        await queryInterface.changeColumn("users", "name", {
            type: Sequelize.STRING(100),
            allowNull: false,
        });

        await queryInterface.changeColumn("users", "phone", {
            type: Sequelize.STRING(15),
            allowNull: false,
            unique: true,
        });

        await queryInterface.changeColumn("users", "role", {
            type: Sequelize.ENUM("CUSTOMER", "SELLER"),
            allowNull: false,
            defaultValue: "CUSTOMER",
        });

        await queryInterface.changeColumn("users", "is_verified", {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        });
    },
};