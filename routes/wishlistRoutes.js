import express from "express";
import {
    add,
    get,
    remove,
} from "../controllers/wishlistController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post( "/:productId", protect, authorizeRoles("CUSTOMER"), add);
router.get( "/", protect, authorizeRoles("CUSTOMER"), get);
router.delete( "/:productId", protect, authorizeRoles("CUSTOMER"), remove);

export default router;