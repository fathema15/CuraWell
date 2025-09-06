import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import RelatedDrugs from "../components/RelatedDrugs";

const BuyDrug = () => {
  const { drugId } = useParams();
  const navigate = useNavigate();
  const { drugs, currencySymbol, cart, addToCart } = useContext(AppContext);

  const [drugInfo, setDrugInfo] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  // Load drug info and initial states
  useEffect(() => {
    const drug = drugs.find((d) => d._id === drugId);
    if (drug) {
      setDrugInfo(drug);
      const cartItem = cart.find((item) => item._id === drug._id);
      const cartQty = cartItem?.quantity || 0;
      setQuantity(cartQty || 1);
      setStock(drug.stock - cartQty);
      setIsDisabled(cartQty > 0);
    }
  }, [drugs, drugId, cart]);

  // Handle quantity change
  const handleQuantityChange = (delta) => {
    if (!drugInfo) return;
    let newQty = quantity + delta;
    if (newQty < 1) newQty = 1;
    if (newQty > stock) newQty = stock;
    setQuantity(newQty);
    setIsDisabled(false);

    // Update cart in real-time if already in cart
    const existingIndex = cart.findIndex((item) => item._id === drugInfo._id);
    if (existingIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity = newQty;
      updatedCart[existingIndex].totalPrice = newQty * drugInfo.price;
      addToCart(drugInfo, newQty); // sync context
    }
  };

  // Add to Cart
  const handleAddToCart = () => {
    if (!drugInfo) return;
    if (isDisabled || stock === 0) {
      toast.info("Already in cart or out of stock");
      return;
    }

    addToCart(drugInfo, quantity);
    setStock((prev) => prev - quantity);
    setIsDisabled(true);
    toast.success(`${drugInfo.name} added to cart`);
  };

  if (!drugInfo) return null;

  const subtotal = (quantity * drugInfo.price).toFixed(2);

  return (
    <div className="max-w-3xl mx-auto my-10 px-4 sm:px-6 text-gray-900 space-y-6">
      {/* Drug Image */}
      <div className="w-full text-center">
        <img
          src={drugInfo.image}
          alt={drugInfo.name}
          className="inline-block h-64 object-contain bg-blue-50 rounded-lg p-4"
        />
      </div>

      {/* Basic Info */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{drugInfo.name}</h1>
        <p className="text-gray-600">Category: {drugInfo.category}</p>
        <p className="text-gray-600">Manufacturer: {drugInfo.manufacturer}</p>
        <p className="text-gray-600">
          Prescription Required:{" "}
          <span
            className={
              drugInfo.prescriptionRequired ? "text-red-500" : "text-green-500"
            }
          >
            {drugInfo.prescriptionRequired ? "Yes" : "No"}
          </span>
        </p>
        <p className="text-gray-600">
          Expiry Date: {new Date(drugInfo.expiryDate).toLocaleDateString()}
        </p>
      </div>

      {/* Price & Stock */}
      <div className="flex justify-between items-center">
        <p className="text-2xl font-semibold">
          Price: {currencySymbol} {drugInfo.price}
        </p>
        <p
          className={`font-medium ${
            stock > 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {stock > 0 ? `Stock: ${stock}` : "Out of Stock"}
        </p>
      </div>

      {/* Quantity & Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            -
          </button>
          <span className="font-medium">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= stock}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            +
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={handleAddToCart}
            disabled={isDisabled || stock === 0}
            className={`flex-1 px-6 py-3 rounded-full text-white font-medium transition ${
              isDisabled || stock === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:opacity-90"
            }`}
          >
            Add to Cart
          </button>
          <button
            onClick={() => navigate("/my-cart")}
            className="flex-1 px-6 py-3 rounded-full bg-green-500 text-white hover:opacity-90 transition"
          >
            View Cart
          </button>
        </div>
      </div>

      {/* Subtotal */}
      <p className="text-lg font-semibold mt-4">
        Subtotal: {currencySymbol} {subtotal}
      </p>

      {/* Related Drugs */}
      <RelatedDrugs category={drugInfo.category} drugId={drugId} />
    </div>
  );
};

export default BuyDrug;