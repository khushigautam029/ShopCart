import {
    getInventory,
    getInventoryByVariant,
    updateInventory,
} from "../services/inventoryService.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
    MESSAGES,
    STATUS_CODES
} from "../utils/setConstants.js";

export const getAllInventory = asyncHandler(
    async (req, res) => {
        const inventory = await getInventory(
            req.user.id
        );
        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.INVENTORY_FETCHED,
            data: inventory,
        });
    }
);

export const getInventoryForVariant = asyncHandler(
    async (req, res) => {
        const inventory =
            await getInventoryByVariant(
                req.params.variantId,
                req.user.id
            );
        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.INVENTORY_FETCHED,
            data: inventory,
        });
    }
);

export const updateInventoryStock = asyncHandler(
    async (req, res) => {
        const inventory =
            await updateInventory(
                req.params.variantId,
                req.user.id,
                req.body
            );
        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.INVENTORY_UPDATED,
            data: inventory,
        });
    }
);