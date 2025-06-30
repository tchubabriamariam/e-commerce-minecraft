import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import products from "../products.json";
import { CartContext } from "./CartContext";
import { CurrencyContext } from "./CurrencyContext";
import "./ProductPage.css";
import NavBar from "./NavBar";

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  const { currency, rates, symbols } = useContext(CurrencyContext);
  const { addToCart } = useContext(CartContext);

  const [mainImage, setMainImage] = useState(product?.image || "");
  const [selectedSize, setSelectedSize] = useState("");

  if (!product) return <div>Product not found.</div>;

  const convertedPrice = (product.price * rates[currency]).toFixed(2);

  const handleAddToCart = () => {
    addToCart({ ...product, size: selectedSize }, currency);
  };

  return (
    <div>
      <NavBar />

      <div className="productPage">
        <div className="images">
          <div className="thumbnails">
            {[product.image, product.img1, product.img2]
              .filter(Boolean)
              .map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  onClick={() => setMainImage(img)}
                />
              ))}
          </div>

          <img src={mainImage} alt={product.title} className="mainImg" />
        </div>

        <div className="details">
          <h2>{product.title.split(" ")[0]}</h2>
          <p className="subtitle">
            {product.title.split(" ").slice(1).join(" ")}
          </p>

          <div className="sizes">
            <span>SIZE:</span>
            {product.availableSizes.map((size) => (
              <button
                key={size}
                className={selectedSize === size ? "selected" : ""}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <div className="price">
            <span>PRICE:</span>
            <p>
              {symbols[currency]} {convertedPrice}
            </p>
          </div>
          <button
            className="addToCart"
            onClick={handleAddToCart}
            disabled={!selectedSize}
            style={{
              opacity: selectedSize ? 1 : 0.5,
              cursor: selectedSize ? "pointer" : "not-allowed",
            }}
          >
            ADD TO CART
          </button>

          <div className="descriptionSection">
            <p className="description">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
