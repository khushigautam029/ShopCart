import { checkout } from "../services/checkoutService.js";
import { STATUS_CODES } from "../utils/setConstants.js";

export const checkoutOrder = async (req, res) => {
    try {
        const result = await checkout(
            req.user.id,
            req.body
        );

        return res.status(STATUS_CODES.CREATED).json({
            success: true,
            message: "Order placed successfully",
            data: result,
        });
    } catch (error) {
        console.error("Checkout Error:", error);

        return res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: error.message,
        });
    }
};