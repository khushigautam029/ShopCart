
import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Add a product to the cart
    const addToCart = useCallback((product, quantity = 1) => {
        if (!product?.id) {
            console.error("Product ID is required to add an item to cart.");
            return;
        }

        const productId = String(product.id);
        const variantId = product.variantId
            ? String(product.variantId)
            : null;

        const itemKey = `${productId}-${variantId || "default"}`;

        const price = Number(
            product.finalPrice ?? product.price ?? 0
        );

        const image =
            product.imageUrl ||
            product.image ||
            product.images?.[0]?.imageUrl ||
            "";

        const productName = product.name || product.title || "Product";

        const requestedQuantity = Math.max(
            1,
            Number(quantity) || 1
        );

        const availableStock =
            product.stock ?? product.availableStock ?? Infinity;

        setCartItems((previousItems) => {
            const existingItem = previousItems.find(
                (item) => item.itemKey === itemKey
            );

            if (existingItem) {
                return previousItems.map((item) => {
                    if (item.itemKey !== itemKey) return item;

                    return {
                        ...item,
                        quantity: Math.min(
                            item.quantity + requestedQuantity,
                            availableStock
                        ),
                    };
                });
            }

            return [
                ...previousItems,
                {
                    ...product,
                    id: productId,
                    itemKey,
                    variantId,
                    name: productName,
                    price,
                    image,
                    quantity: Math.min(
                        requestedQuantity,
                        availableStock
                    ),
                    stock: availableStock,
                },
            ];
        });
    }, []);

    // Remove an item
    const removeFromCart = useCallback((itemKey) => {
        setCartItems((previousItems) =>
            previousItems.filter(
                (item) => item.itemKey !== itemKey
            )
        );
    }, []);

    // Update product quantity
    const updateQuantity = useCallback((itemKey, quantity) => {
        const newQuantity = Number(quantity);

        if (!Number.isFinite(newQuantity)) return;

        if (newQuantity <= 0) {
            setCartItems((previousItems) =>
                previousItems.filter(
                    (item) => item.itemKey !== itemKey
                )
            );
            return;
        }

        setCartItems((previousItems) =>
            previousItems.map((item) => {
                if (item.itemKey !== itemKey) return item;

                return {
                    ...item,
                    quantity: Math.min(
                        Math.floor(newQuantity),
                        item.stock
                    ),
                };
            })
        );
    }, []);

    // Clear the entire cart
    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    // Total number of products
    const totalItems = useMemo(
        () =>
            cartItems.reduce(
                (total, item) => total + item.quantity,
                0
            ),
        [cartItems]
    );

    // Total cart price
    const subtotal = useMemo(
        () =>
            cartItems.reduce(
                (total, item) =>
                    total + item.price * item.quantity,
                0
            ),
        [cartItems]
    );

    const value = useMemo(
        () => ({
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalItems,
            subtotal,
        }),
        [
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalItems,
            subtotal,
        ]
    );

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to access cart functionality
export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart must be used inside CartProvider"
        );
    }

    return context;
};
