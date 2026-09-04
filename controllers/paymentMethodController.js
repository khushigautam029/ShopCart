import {
    addPaymentMethod,
    deletePaymentMethod,
    getPaymentMethods,
    setDefaultPaymentMethod,
} from "../services/paymentMethodService.js";

export const createPaymentMethod = async (req, res) => {
    try {
        const paymentMethod = await addPaymentMethod(
            req.user.id,
            req.body
        );

        return res.status(201).json({
            success: true,
            message: "Payment method added successfully",
            data: paymentMethod,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getMyPaymentMethods = async (req, res) => {
    try {
        const paymentMethods = await getPaymentMethods(
            req.user.id
        );

        return res.status(200).json({
            success: true,
            message: "Payment methods fetched successfully",
            data: paymentMethods,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const removePaymentMethod = async (req, res) => {
    try {
        await deletePaymentMethod(
            req.user.id,
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message: "Payment method deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const makeDefaultPaymentMethod = async (req, res) => {
    try {
        const paymentMethod = await setDefaultPaymentMethod(
            req.user.id,
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message: "Default payment method updated successfully",
            data: paymentMethod,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};