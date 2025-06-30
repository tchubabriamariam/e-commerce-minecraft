import { createContext, useState, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const addToCart = (newItem) => {
    const defaultCurrency = "USD";

    setCartItems((prevItems) => {
      const selectedCurrency = newItem.selectedCurrency || defaultCurrency;
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.size === (newItem.size || "M") &&
          item.selectedCurrency === selectedCurrency
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].amount += 1;
        return updatedItems;
      } else {
        const uid = crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`;
        return [
          ...prevItems,
          {
            ...newItem,
            uid,
            amount: 1,
            size: newItem.size || "M",
            selectedCurrency,
            availableSizes: newItem.availableSizes || ["S", "M", "L"],
            currentImageIndex: 0,
          },
        ];
      }
    });
  };
  const updateItemSize = (uid, newSize) => {
    setCartItems((prev) =>
      prev.map((item) => (item.uid === uid ? { ...item, size: newSize } : item))
    );
  };

  const incrementQuantity = (uid) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.uid === uid ? { ...item, amount: item.amount + 1 } : item
      )
    );
  };

  const decrementQuantity = (uid) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.uid === uid ? { ...item, amount: item.amount - 1 } : item
        )
        .filter((item) => item.amount > 0)
    );
  };

  const removeFromCart = (uid) => {
    setCartItems((prev) => prev.filter((item) => item.uid !== uid));
  };
  const updateImageIndex = (itemToUpdate, direction) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.uid !== itemToUpdate.uid) return item;

        const maxIndex = item.images?.length - 1 || 0;
        let newIndex = item.currentImageIndex ?? 0;

        if (direction === "next" && newIndex < maxIndex) {
          newIndex += 1;
        } else if (direction === "prev" && newIndex > 0) {
          newIndex -= 1;
        }

        return { ...item, currentImageIndex: newIndex };
      })
    );
  };
  const setImageIndexForItem = (uid, newIndex) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.uid === uid ? { ...item, currentImageIndex: newIndex } : item
      )
    );
  };

  const cartCount = cartItems.reduce((total, item) => total + item.amount, 0);
  const nextImage = (uid) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.uid === uid
          ? {
              ...item,
              currentImageIndex:
                (item.currentImageIndex + 1) % item.images.length,
            }
          : item
      )
    );
  };

  const prevImage = (uid) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.uid === uid
          ? {
              ...item,
              currentImageIndex:
                (item.currentImageIndex - 1 + item.images.length) %
                item.images.length,
            }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
        updateItemSize,
        cartCount,
        updateImageIndex,
        setImageIndexForItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
