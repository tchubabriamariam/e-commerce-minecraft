import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { CurrencyContext } from "./CurrencyContext";
import "./MainCart.css";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

const MainCart = () => {
  const { currency, rates, symbols } = useContext(CurrencyContext);

  const Navigate = useNavigate();

  const {
    cartItems,
    incrementQuantity,
    decrementQuantity,
    updateItemSize,
    setImageIndexForItem,
  } = useContext(CartContext);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.amount, 0);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * rates[currency] * item.amount,
    0
  );

  // ეს ძველია ახალი არ იღებს ობიექტიდან ფასებს აკონვერტირებს თავისით (ჭუბა)

  // const total = cartItems.reduce((sum, item) => {
  //   const price = item.prices?.[currency];
  //   const amount = item.amount;
  //   return typeof price === "number" && typeof amount === "number"
  //     ? sum + amount * price
  //     : sum;
  // }, 0);

  const getAvailableImages = (item) => {
    const images = [];
    if (item.image) images.push(item.image);
    if (item.img1) images.push(item.img1);
    if (item.img2) images.push(item.img2);
    return images.length > 0 ? images : ["https://via.placeholder.com/100"];
  };

  const handleImageNav = (item, direction) => {
    const images = getAvailableImages(item);
    const currentIndex = item.currentImageIndex || 0;

    if (direction === "next") {
      const nextIndex =
        currentIndex + 1 < images.length ? currentIndex + 1 : currentIndex;
      setImageIndexForItem(item.uid, nextIndex);
    } else if (direction === "prev") {
      const prevIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : currentIndex;
      setImageIndexForItem(item.uid, prevIndex);
    }
  };

  return (
    <>
      <NavBar />
      <div className="mainCartContainer">
        <div className="mainCartTitle">CART</div>
        <div className="mainCartItems">
          {cartItems.map((item) => {
            const images = getAvailableImages(item);
            const currentIndex = item.currentImageIndex || 0;

            return (
              <div className="mainCartItem" key={item.uid}>
                <div className="mainCartLeft">
                  <div className="mainCartItemName">
                    <div className="mainTitle">{item.title.split(" ")[0]} </div>
                    <div className="mainCartChanged">
                      {item.title.split(" ").slice(1).join(" ")}
                    </div>
                  </div>

                  <p className="mainCartItemPrice">
                    {symbols[currency]}{" "}
                    {(item.price * rates[currency]).toFixed(2)}
                  </p>
                  {/* <p className="mainCartItemPrice">
                    {currency} {item.prices[currency]}
                  </p> */}
                  <p className="mainCartItemSize">SIZE:</p>
                  <div className="mainCartSizes">
                    {item.availableSizes?.map((size) => (
                      <button
                        key={size}
                        className={`mainCartSizeButton ${
                          size === item.size ? "selected" : ""
                        }`}
                        onClick={() => updateItemSize(item.uid, size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mainCartRight">
                  <div className="mainCartQuantity">
                    <button onClick={() => incrementQuantity(item.uid)}>
                      +
                    </button>
                    <p>{item.amount}</p>
                    <button onClick={() => decrementQuantity(item.uid)}>
                      -
                    </button>
                  </div>

                  <div className="mainCartImageWrapper">
                    <img
                      src={images[currentIndex]}
                      alt={item.title}
                      className="mainCartImage"
                    />
                    <div className="mainCartImageButtons">
                      <button onClick={() => handleImageNav(item, "prev")}>
                        {"<"}
                      </button>
                      <button onClick={() => handleImageNav(item, "next")}>
                        {">"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mainCartSummary">
          <p className="mainCartTotalItems">
            Quantity: <strong className="mainStrong">{totalQuantity}</strong>
          </p>
          <div className="mainCartTotal">
            <span className="mainTotal">Total:</span>
            <span>
              {currency} {total.toFixed(2)}
            </span>
          </div>
          <button
            className="mainCartCheckout"
            onClick={() => Navigate("/shippingdetails")}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default MainCart;
