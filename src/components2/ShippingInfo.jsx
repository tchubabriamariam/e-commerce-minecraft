import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";
import { CurrencyContext } from "../components/CurrencyContext";
import "./ShippingInfo.css";

const ShippingInfoPage = () => {
  const { cartItems } = useContext(CartContext);
  const { currency, rates, symbols } = useContext(CurrencyContext);
  const navigate = useNavigate();
  const [shipping, setShipping] = useState("standard");

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * rates[currency] * item.amount,
    0
  );
  const shippingCost = shipping === "standard" ? 0 : 4.99 * rates[currency];
  const total = subtotal + shippingCost;
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    shippingNote: "",
    city: "",
    postalCode: "",
    province: "",
    country: "Italy",
    saveInfo: false,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email";
    if (!form.firstName.trim()) newErrors.firstName = "Required";
    if (!form.lastName.trim()) newErrors.lastName = "Required";
    if (!form.address.trim()) newErrors.address = "Required";
    if (!form.city.trim()) newErrors.city = "Required";
    if (!form.postalCode.trim()) newErrors.postalCode = "Required";
    if (!form.province) newErrors.province = "Required";
    if (!form.country) newErrors.country = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      localStorage.setItem("checkoutInfo", JSON.stringify(form));
      navigate("/shippingsecond");
    }
  };

  return (
    <div className="shippingPage">
      <div className="shippingLeft">
        <div className="infoForm">
          <div className="infoSteps">
            <span className="stepGreen">Cart</span>
            <span className="more">{">"}</span>
            <span className="secondDetails1">Details</span>
            <span className="more">{">"}</span>
            <span className="secondSome">Shipping</span>
            <span className="more">{">"}</span>
            <span className="secondSome">Payment</span>
          </div>

          <div className="infoSection">
            <h3 className="infoH3">Contact</h3>
            <input
              type="email"
              placeholder="Email or mobile phone number"
              value={form.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`shippingInput ${errors.email ? "error" : ""}`}
              title={errors.email || ""}
            />
          </div>

          <div className="infoSection">
            <h3 className="infoH3">Shipping Address</h3>
            <div className="infoRow">
              <input
                placeholder="Name"
                value={form.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={`shippingInput ${errors.firstName ? "error" : ""}`}
              />
              <input
                placeholder="Second Name"
                value={form.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={`shippingInput ${errors.lastName ? "error" : ""}`}
              />
            </div>

            <input
              placeholder="Address and number"
              value={form.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className={`shippingInput ${errors.address ? "error" : ""}`}
            />

            <input
              placeholder="Shipping note (optional)"
              value={form.shippingNote}
              onChange={(e) =>
                handleInputChange("shippingNote", e.target.value)
              }
              className="shippingInput"
            />

            <div className="infoRow">
              <input
                placeholder="City"
                value={form.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className={`shippingInput ${errors.city ? "error" : ""}`}
              />
              <input
                placeholder="Postal Code"
                value={form.postalCode}
                onChange={(e) =>
                  handleInputChange("postalCode", e.target.value)
                }
                className={`shippingInput ${errors.postalCode ? "error" : ""}`}
              />

              <div
                className={`selectWrapper ${
                  errors.province ? "error" : ""
                }`.trim()}
              >
                <select
                  value={form.province}
                  onChange={(e) =>
                    handleInputChange("province", e.target.value)
                  }
                  className="shippingSelect"
                >
                  <option value="">Province</option>
                  <option value="Ge">Georgia</option>
                  <option value="AL">Alaska</option>
                  <option value="CA">California</option>
                  <option value="HW">Hawaii</option>
                  {/* <option value="OT">Other</option> */}
                </select>
                <span className="verticalDivider" />
                <span className="customArrow">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.75012 2.68701C8.8074 2.68707 8.86418 2.69833 8.91711 2.72021C8.97024 2.74222 9.01903 2.77526 9.05969 2.81592C9.10016 2.85649 9.13249 2.90457 9.15442 2.95752C9.1764 3.01063 9.18762 3.06801 9.18762 3.12549C9.18757 3.18278 9.17632 3.23954 9.15442 3.29248C9.13241 3.34561 9.10035 3.3944 9.05969 3.43506L5.30969 7.18506C5.26907 7.22575 5.22021 7.25775 5.16711 7.27979C5.11416 7.30172 5.05744 7.31293 5.00012 7.31299C4.94262 7.31299 4.88527 7.3018 4.83215 7.27979C4.77902 7.25774 4.73021 7.22578 4.68958 7.18506V7.18408L0.940552 3.43506C0.899809 3.39442 0.866904 3.34563 0.844849 3.29248C0.822929 3.23954 0.8117 3.18278 0.811646 3.12549C0.811646 3.06801 0.822843 3.01062 0.844849 2.95752C0.866904 2.90437 0.899809 2.85558 0.940552 2.81494C0.981067 2.77448 1.02926 2.74216 1.08215 2.72021C1.13525 2.69821 1.19264 2.68701 1.25012 2.68701C1.30742 2.68707 1.36418 2.69829 1.41711 2.72021C1.47027 2.74227 1.51905 2.77518 1.55969 2.81592L4.99915 6.25635L8.43958 2.81592H8.44055C8.48121 2.77526 8.52903 2.74222 8.58215 2.72021C8.63525 2.69824 8.69266 2.68701 8.75012 2.68701Z"
                      fill="#1D252C"
                      stroke="#1D252C"
                      strokeWidth="0.25"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div
              className={`selectWrapper ${
                errors.country ? "error" : ""
              }`.trim()}
            >
              <select
                value={form.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                className="shippingSelect"
              >
                <option value="">Select Country</option>
                <option value="Italy">Italy</option>
                <option value="Georgia">Georgia</option>
                <option value="Japan">Japan</option>
                <option value="USA">USA</option>
                <option value="China">China</option>
              </select>
              <span className="verticalDivider" />
              <span className="customArrow">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.75012 2.68701C8.8074 2.68707 8.86418 2.69833 8.91711 2.72021C8.97024 2.74222 9.01903 2.77526 9.05969 2.81592C9.10016 2.85649 9.13249 2.90457 9.15442 2.95752C9.1764 3.01063 9.18762 3.06801 9.18762 3.12549C9.18757 3.18278 9.17632 3.23954 9.15442 3.29248C9.13241 3.34561 9.10035 3.3944 9.05969 3.43506L5.30969 7.18506C5.26907 7.22575 5.22021 7.25775 5.16711 7.27979C5.11416 7.30172 5.05744 7.31293 5.00012 7.31299C4.94262 7.31299 4.88527 7.3018 4.83215 7.27979C4.77902 7.25774 4.73021 7.22578 4.68958 7.18506V7.18408L0.940552 3.43506C0.899809 3.39442 0.866904 3.34563 0.844849 3.29248C0.822929 3.23954 0.8117 3.18278 0.811646 3.12549C0.811646 3.06801 0.822843 3.01062 0.844849 2.95752C0.866904 2.90437 0.899809 2.85558 0.940552 2.81494C0.981067 2.77448 1.02926 2.74216 1.08215 2.72021C1.13525 2.69821 1.19264 2.68701 1.25012 2.68701C1.30742 2.68707 1.36418 2.69829 1.41711 2.72021C1.47027 2.74227 1.51905 2.77518 1.55969 2.81592L4.99915 6.25635L8.43958 2.81592H8.44055C8.48121 2.77526 8.52903 2.74222 8.58215 2.72021C8.63525 2.69824 8.69266 2.68701 8.75012 2.68701Z"
                    fill="#1D252C"
                    stroke="#1D252C"
                    strokeWidth="0.25"
                  />
                </svg>
              </span>
            </div>

            <label className="checkboxRow">
              <input
                type="checkbox"
                checked={form.saveInfo}
                onChange={(e) =>
                  handleInputChange("saveInfo", e.target.checked)
                }
              />
              Save this information for a future fast checkout
            </label>

            <div className="formActions">
              <button className="backBtn" onClick={() => navigate("/cart")}>
                Back to cart
              </button>
              <button className="continueBtn" onClick={handleContinue}>
                Go to shipping
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="secondRight infoRight">
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
            <span>Calculated at the next step</span>
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

export default ShippingInfoPage;
