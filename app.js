import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import addressRoutes from "./routes/addressRoutes.js";
import attributeRoutes from "./routes/attributeRoutes.js";
import attributeValueRoutes from "./routes/attributeValueRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import productImageRoutes from "./routes/productImageRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import productVariantRoutes from "./routes/productVariantRoutes.js";
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
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: MESSAGES.TOO_MANY_REQUESTS,
    },
});

app.use("/api", limiter);

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

export default app;