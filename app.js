import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import addressRoutes from "./routes/addressRoutes.js";
import attributeRoutes from "./routes/attributeRoutes.js";
import attributeValueRoutes from "./routes/attributeValueRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentMethodRoutes from "./routes/paymentMethodRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import productImageRoutes from "./routes/productImageRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import productVariantRoutes from "./routes/productVariantRoutes.js";
import errorHandler from "./utils/errorHandler.js";
import { generalLimiter, } from "./utils/rateLimiter.js";
import { MESSAGES, STATUS_CODES } from "./utils/setConstants.js";

const app = express();

// Security
app.use(helmet());

// CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

// Rate limiter
app.use("/api", generalLimiter);

// Health check
app.get("/api/health", (req, res) => {
    res.status(STATUS_CODES.OK).json({
        success: true,
        message: MESSAGES.API_RUNNING,
    });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/product",productRoutes);
app.use("/api/image",productImageRoutes);
app.use("/api/attributes", attributeRoutes);
app.use( "/api/attribute-values", attributeValueRoutes);
app.use( "/api/product-variants", productVariantRoutes);
app.use("/api/inventory",inventoryRoutes);
app.use("/api/addresses",addressRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment-method",paymentMethodRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/checkout", checkoutRoutes);

//Global error handler
app.use(errorHandler);

export default app;