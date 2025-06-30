import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";
import { CurrencyContext } from "../components/CurrencyContext";
import "./ShippingSecondPage.css";

const ShippingSecondPage = ({
  contact: initialContact,
  address: initialAddress,
  onBack,
  onNext,
}) => {
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [shipping, setShipping] = useState("standard");

  const { cartItems } = useContext(CartContext);
  const { currency, rates, symbols } = useContext(CurrencyContext);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * rates[currency] * item.amount,
    0
  );

  const navigate = useNavigate();

  const shippingOptions = [
    {
      id: "standard",
      label: "Standard Shipping",
      cost: 0,
      description: "Free",
      title: "Free Shipping",
    },
    {
      id: "express",
      label: "Express Shipping",
      cost: 4.99 * rates[currency],
      description: `${symbols[currency]}${(4.99 * rates[currency]).toFixed(2)}`,
      title: `${symbols[currency]}${(4.99 * rates[currency]).toFixed(2)}`,
    },
  ];

  const shippingCost = shipping === "standard" ? 0 : 4.99 * rates[currency];
  const total = subtotal + shippingCost;

  useEffect(() => {
    if (initialContact) setContact(initialContact);
    if (initialAddress) setAddress(initialAddress);
  }, [initialContact, initialAddress]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("checkoutInfo"));
    if (saved) {
      setContact(saved.email);
      setAddress(
        `${saved.address}, ${saved.city}, ${saved.province}, ${saved.postalCode}, ${saved.country}`
      );
    }
  }, []);

  return (
    <div className="secondPage">
      <div className="secondLeft">
        <div className="secondFormWrapper">
          <div className="secondSteps">
            <span className="secondGreen">Cart</span>
            <span className="secondGreen more">{">"}</span>
            <span className="secondGreen">Details</span>
            <span className="secondGreen more">{">"}</span>
            <span className="secondBold">Shipping</span>
            <span className="more">{">"}</span>
            <span className="secondSome">Payment</span>
          </div>

          <div className="secondContactAddressBox">
            {contact && (
              <div className="secondInfoRow">
                <strong>Contact </strong> {contact}
              </div>
            )}
            <div className="greenLine"></div>
            {address && (
              <div className="secondInfoRow">
                <strong>Ship to </strong> {address}
              </div>
            )}
          </div>

          <div className="secondSection">
            <h3 className="secondh3">Shipping method</h3>
            {shippingOptions.map((opt) => (
              <label
                key={opt.id}
                className={`secondOption ${
                  shipping === opt.id ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="shipping"
                  value={opt.id}
                  checked={shipping === opt.id}
                  onChange={() => setShipping(opt.id)}
                />
                <span>{opt.label}</span>
                <span className="price">{opt.description}</span>
              </label>
            ))}
          </div>

          <div className="secondFormActions">
            <button
              className="secondBackBtn"
              onClick={() => navigate("/shippingdetails")}
            >
              Back to details
            </button>
            <button
              className="secondNextBtn"
              onClick={() => {
                const saved =
                  JSON.parse(localStorage.getItem("checkoutInfo")) || {};
                saved.shippingMethod = shipping;
                localStorage.setItem("checkoutInfo", JSON.stringify(saved));
                navigate("/checkout");
              }}
              disabled={!contact || !address}
            >
              Go to payment
            </button>
          </div>
        </div>
      </div>

      <div className="secondRight">
        <div className="secondSummary">
          <div className="secondProductList">
            {cartItems.map((item) => (
              <div key={item.id} className="secondCartItem">
                <div className="secondCartImgWrapper">
                  <img src={item.image} alt={item.title} />
                  <div className="secondItemQty">{item.amount}</div>
                </div>
                <div className="secondItemDetails">
                  <p className="secondItemName">{item.title}</p>
                  <p className="secondItemPrice">
                    {symbols[currency]}
                    {(item.price * rates[currency]).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <hr className="secondDivider" />

          <div className="secondLine">
            <span>Subtotal</span>
            <span>
              {symbols[currency]}
              {subtotal.toFixed(2)}
            </span>
          </div>

          <div className="secondLine">
            <span>Shipping</span>
            <span>
              {shippingOptions.find((opt) => opt.id === shipping)?.title}
            </span>
          </div>

          <hr className="secondDivider" />

          <div className="secondLine total">
            <span>Total</span>
            <span>
              {symbols[currency]}
              {total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingSecondPage;
