import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import validate from "../middleware/validateMiddleware.js";

import {
    createCustomerAddress,
    deleteCustomerAddress,
    getCustomerAddress,
    getCustomerAddresses,
    setDefaultCustomerAddress,
    updateCustomerAddress,
} from "../controllers/addressController.js";

import {
    createAddressSchema,
    updateAddressSchema,
} from "../validations/addressValidation.js";

const router = express.Router();

router.use(protect);
router.use(authorizeRoles("CUSTOMER"));

router.post(
    "/",
    validate(createAddressSchema),
    createCustomerAddress
);

router.get(
    "/",
    getCustomerAddresses
);

router.get(
    "/:id",
    getCustomerAddress
);

router.put(
    "/:id",
    validate(updateAddressSchema),
    updateCustomerAddress
);

router.delete(
    "/:id",
    deleteCustomerAddress
);

router.patch(
    "/:id/default",
    setDefaultCustomerAddress
);

export default router;