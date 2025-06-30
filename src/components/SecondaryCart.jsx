import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { CurrencyContext } from "./CurrencyContext";
import "./SecondaryCart.css";
import { useNavigate } from "react-router-dom";

const SecondaryCart = ({ onClose }) => {
  const { currency, rates, symbols } = useContext(CurrencyContext);

  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    updateItemSize,
  } = useContext(CartContext);

  const totalItems = cartItems.reduce((sum, item) => sum + item.amount, 0);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * rates[currency] * item.amount,
    0
  );

  // const total = cartItems.reduce((sum, item) => {
  //   const price = item.prices?.[currency];
  //   const amount = item.amount;

  //   if (typeof price === "number" && typeof amount === "number") {
  //     return sum + amount * price;
  //   } else {
  //     console.warn("aklia ragac", item);
  //     return sum;
  //   }
  // }, 0);

  return (
    <div className="cartOverlay">
      <div className="secondaryCart">
        <h2 className="cartTitle">
          My Bag, <span>{cartItems.length} items</span>
        </h2>
        <div className="totalItemsContainer">
          <p className="totalItems">My Bag,</p>
          <p className="totalAmount">{totalItems} items</p>
        </div>

        <div className="cartItems">
          {cartItems.map((item) => (
            <div className="cartItem" key={item.uid}>
              <div className="cartItemDetails">
                <div className="cartLeft">
                  <p className="itemTitle">
                    {item.title.split(" ")[0]} <br />
                    {item.title.split(" ").slice(1).join(" ")}
                  </p>

                  <p className="itemPrice">
                    {symbols[currency]}{" "}
                    {(item.price * rates[currency]).toFixed(2)}
                  </p>

                  <p className="sizeName">Size: </p>
                  <div className="cartSizeButtons">
                    {item.availableSizes?.map((size) => (
                      <button
                        key={size}
                        className={size === item.size ? "selected" : ""}
                        onClick={() => updateItemSize(item.uid, size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="cartRight">
                  <div className="cartButtons">
                    <button onClick={() => incrementQuantity(item.uid)}>
                      +
                    </button>
                    <p>{item.amount}</p>
                    <button onClick={() => decrementQuantity(item.uid)}>
                      -
                    </button>
                  </div>
                </div>

                <img src={item.image} alt={item.title} className="cartImage" />
              </div>
            </div>
          ))}
        </div>

        <div className="cartTotal">
          <span>Total</span>
          <span>
            {currency} {total.toFixed(2)}
          </span>
        </div>

        <div className="cartActions">
          <button
            className="viewBag"
            onClick={() => {
              onClose();
              navigate("/cart");
            }}
          >
            View Bag
          </button>
          <button
            className="checkout"
            onClick={() => navigate("/shippingdetails")}
          >
            Checkout
          </button>
        </div>
      </div>
      <div className="cartBackdrop" onClick={onClose}></div>
    </div>
  );
};

export default SecondaryCart;
