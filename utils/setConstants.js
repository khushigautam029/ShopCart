export const STATUS_CODES = {

    // Success
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,

    // Client Errors
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,

    // Server Errors
    INTERNAL_SERVER_ERROR: 500
};

export const MESSAGES = {
    TOO_MANY_REQUESTS: "Too many requests. Please try again later.",
    API_RUNNING: "ShopCart API is running",
    VALIDATION_FAILED: "Validation failed",
    AUTHENTICATION_REQUIRED: "Authentication required",
    ACCESS_DENIED: "Access denied",
    OTP_SENT: "OTP sent successfully",
    LOGIN_SUCCESSFUL: "Login successful",
    AUTHENTICATION_REQUIRED: "Authentication required",
    SELLER_OTP_SENT: "Seller OTP sent successfully",
    SELLER_LOGIN_SUCCESSFUL: "Seller login successful",
    INVALID_TOKEN: "Invalid or expired token",
    CATEGORY_CREATED: "Category created successfully",
    CATEGORIES_FETCHED: "Categories fetched successfully",
    CATEGORY_UPDATED: "Category updated successfully",
    CATEGORY_DELETED: "Category deleted successfully",

    ADDRESS_CREATED:"Address created successfully",
    ADDRESS_FETCHED:"Addresses fetched successfully",
    ADDRESS_NOT_FOUND:"Address not found",
    ADDRESS_UPDATED:"Address updated successfully",
    ADDRESS_DELETED:"Address deleted successfully",
    DEFAULT_ADDRESS_UPDATED:"Default address updated successfully",
    ATTRIBUTE_CREATED:"Attribute created successfully",
    ATTRIBUTE_FETCHED:"Attributes fetched successfully",
    ATTRIBUTE_UPDATED:"Attribute updated successfully",
    ATTRIBUTE_DELETED:"Attribute deleted successfully",
    ATTRIBUTE_VALUE_CREATED:"Attribute value created successfully",
    ATTRIBUTE_VALUE_FETCHED:"Attribute values fetched successfully",
    ATTRIBUTE_VALUE_UPDATED:"Attribute value updated successfully",
    ATTRIBUTE_VALUE_DELETED:"Attribute value deleted successfully",

    INVENTORY_FETCHED:"Inventory fetched successfully",
    INVENTORY_UPDATED:"Inventory updated successfully",
    PRODUCT_CREATED:"Product created successfully",
    PRODUCT_FETCHED:"Product fetched successfully",
    PRODUCT_UPDATED:"Product updated successfully",
    PRODUCT_DELETED:"Product deleted successfully",
    PRODUCT_IMAGE_ADDED:"Product image added successfully",
    PRODUCT_IMAGES_FETCHED:"Product images fetched successfully",
    PRODUCT_IMAGE_UPDATED:"Product image updated successfully",
    PRODUCT_IMAGE_DELETED:"Product Image deleted successfully",
    PRODUCT_VARIANT_CREATED:"Product variant created successfully",
    PRODUCT_VARIANTS_FETCHED:"Product variants fetched successfully",
    PRODUCT_VARIANT_UPDATED:"Product variant updated successfully",
    PRODUCT_VARIANT_DELETED:"Product variant deleted successfully"
};