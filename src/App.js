import { Route, Routes, Navigate } from "react-router-dom";
import MainPage from "./components/MainPage";
import ProductPage from "./components/ProductPage";

import { useContext } from "react";
import { CartContext } from "./components/CartContext";
import MainCart from "./components/MainCart";
import ShippingInfoPage from "./components2/ShippingInfo";
import ShippingSecondPage from "./components2/ShippingSecondPage";

import CheckoutPage from "./components2/CheckoutPage";
import ConfirmationPage from "./components2/ConfirmationPage";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<MainPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<MainCart />} />
      <Route path="/shippingdetails" element={<ShippingInfoPage />} />
      <Route path="/shippingsecond" element={<ShippingSecondPage />}></Route>
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/confirmation" element={<ConfirmationPage />} />
    </Routes>
  );
}

export default App;
