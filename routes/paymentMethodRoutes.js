import express from "express";
import {
    createPaymentMethod,
    getMyPaymentMethods,
    makeDefaultPaymentMethod,
    removePaymentMethod,
} from "../controllers/paymentMethodController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import validate from "../middleware/validateMiddleware.js";
import { addPaymentMethodSchema } from "../validations/paymentMethodValidation.js";

const router = express.Router();

router.use(protect);
router.use(authorizeRoles("CUSTOMER"));
router.post( "/", validate(addPaymentMethodSchema), createPaymentMethod);
router.get( "/", getMyPaymentMethods);
router.patch( "/:id/default", makeDefaultPaymentMethod);
router.delete( "/:id", removePaymentMethod);

export default router;