import express from "express";
import { checkoutOrder } from "../controllers/checkoutController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import validate from "../middleware/validateMiddleware.js";
import { checkoutSchema } from "../validations/checkoutValidation.js";

const router = express.Router();

router.use(protect);
router.use(authorizeRoles("CUSTOMER"));

router.post( "/", validate(checkoutSchema), checkoutOrder);

export default router;