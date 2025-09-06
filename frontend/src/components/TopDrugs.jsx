import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const TopDrugs = () => {
  const { drugs, currencySymbol, cart, addToCart } = useContext(AppContext);
  const navigate = useNavigate();

  const [quantityMap, setQuantityMap] = useState({});
  const [disableMap, setDisableMap] = useState({});
  const [stockMap, setStockMap] = useState({});

  useEffect(() => {
    const initialQty = {};
    const initialDisable = {};
    const initialStock = {};

    drugs.slice(0, 10).forEach((drug) => {
      const cartItem = cart.find((item) => item._id === drug._id);
      initialQty[drug._id] = cartItem?.quantity || 1;
      initialDisable[drug._id] = !!cartItem;
      initialStock[drug._id] = drug.stock - (cartItem?.quantity || 0);
    });

    setQuantityMap(initialQty);
    setDisableMap(initialDisable);
    setStockMap(initialStock);
  }, [drugs, cart]);

  const handleQuantityChange = (drugId, delta) => {
    setQuantityMap((prev) => {
      let newQty = (prev[drugId] || 1) + delta;
      const stock = stockMap[drugId] || 0;

      if (newQty < 1) newQty = 1;
      if (newQty > stock) newQty = stock;

      setDisableMap((prev) => ({ ...prev, [drugId]: false }));
      return { ...prev, [drugId]: newQty };
    });
  };

  const handleAddToCart = (drug) => {
    const qty = quantityMap[drug._id] || 1;
    const stock = stockMap[drug._id] || 0;

    if (stock <= 0) return toast.info("Out of Stock");
    if (disableMap[drug._id]) return toast.info("Already in Cart");
    if (qty > stock) return toast.error("Not enough stock");

    // Backend sync: use AppContext's addToCart
    addToCart(drug, qty);

    // Update frontend state
    setDisableMap((prev) => ({ ...prev, [drug._id]: true }));
    setStockMap((prev) => ({ ...prev, [drug._id]: prev[drug._id] - qty }));
  };

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Drugs to Buy</h1>
      <p>Explore our trusted and best-selling drugs, verified and reliable.</p>

      <div className="w-full grid grid-auto-fill gap-4 gap-y-6 pt-5 px-3 sm:px-0">
        {drugs.slice(0, 10).map((drug) => {
          const qty = quantityMap[drug._id] || 1;
          const stock = stockMap[drug._id] || 0;
          const totalPrice = ((drug.unit_price || 0) * qty).toFixed(2);
          const isDisabled = disableMap[drug._id] || stock === 0;

          return (
            <div
              key={drug._id}
              className="border border-blue-200 rounded-xl overflow-hidden hover:translate-y-[-10px] transition-all duration-500 flex flex-col"
            >
              <img
                src={drug.image}
                alt={drug.name}
                className="bg-blue-50 h-40 object-contain w-full cursor-pointer"
                onClick={() => navigate(`/buy-drugs/${drug._id}`)}
              />

              <div className="p-4 flex flex-col justify-between flex-1">
                {/* Stock Status */}
                <div className="flex items-center gap-2 text-sm mb-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      stock > 0 ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <span
                    className={`${
                      stock > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stock > 0 ? `Stock: ${stock}` : "Out of Stock"}
                  </span>
                </div>

                {/* Details */}
                <p className="text-lg font-medium">{drug.name}</p>
                <p className="text-sm text-gray-600">{drug.company}</p>
                <p className="text-sm text-gray-500 mb-2">{drug.category}</p>

                {/* Quantity Selector */}
                <div className="flex items-center gap-2 mb-2">
                  <button
                    onClick={() => handleQuantityChange(drug._id, -1)}
                    className="px-2 bg-gray-200 rounded"
                    disabled={qty <= 1}
                  >
                    -
                  </button>
                  <span>{qty}</span>
                  <button
                    onClick={() => handleQuantityChange(drug._id, 1)}
                    className="px-2 bg-gray-200 rounded"
                    disabled={qty >= stock}
                  >
                    +
                  </button>
                </div>

                {/* Price */}
                <p className="text-gray-900 font-medium">
                  {currencySymbol} {totalPrice}
                </p>

                {/* Buttons */}
                <button
                  onClick={() => handleAddToCart(drug)}
                  disabled={isDisabled}
                  className={`mt-2 px-4 py-2 rounded-full text-white ${
                    isDisabled
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:opacity-90"
                  }`}
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => navigate("/my-cart")}
                  className="mt-2 px-4 py-2 rounded-full text-white bg-green-500 hover:opacity-90"
                >
                  View Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => {
          navigate("/drugs");
          scrollTo(0, 0);
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
      >
        More
      </button>
    </div>
  );
};

export default TopDrugs;