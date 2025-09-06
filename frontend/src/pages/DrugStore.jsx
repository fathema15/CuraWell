import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const DrugStore = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { drugs, currencySymbol, cart, addToCart } = useContext(AppContext);

  const [filterDrug, setFilterDrug] = useState([]);
  const [quantityMap, setQuantityMap] = useState({});
  const [disableMap, setDisableMap] = useState({});
  const [stockMap, setStockMap] = useState({});

  const applyFilter = () => {
    if (category) {
      setFilterDrug(drugs.filter((drug) => drug.category === category));
    } else {
      setFilterDrug(drugs);
    }
  };

  useEffect(() => {
    applyFilter();

    // Initialize quantity, disable and stock maps
    const initialQty = {};
    const initialDisable = {};
    const initialStock = {};
    drugs.forEach((drug) => {
      const cartItem = cart.find((item) => item._id === drug._id);
      initialStock[drug._id] = drug.stock - (cartItem?.quantity || 0);
      if (cartItem) {
        initialQty[drug._id] = cartItem.quantity;
        initialDisable[drug._id] = true;
      }
    });
    setQuantityMap(initialQty);
    setDisableMap(initialDisable);
    setStockMap(initialStock);
  }, [drugs, category, cart]);

  const handleQuantityChange = (drugId, delta) => {
    setQuantityMap((prev) => {
      let newQty = (prev[drugId] || 1) + delta;
      if (newQty < 1) newQty = 1;
      if (newQty > (stockMap[drugId] || 0)) newQty = stockMap[drugId];

      // Enable Add to Cart button
      setDisableMap((prevDisable) => ({ ...prevDisable, [drugId]: false }));

      return { ...prev, [drugId]: newQty };
    });
  };

  const handleAddToCart = (drug) => {
    const isDisabled = disableMap[drug._id] || stockMap[drug._id] === 0;
    if (isDisabled) {
      toast.info("Already in My Cart");
      return;
    }

    const qty = quantityMap[drug._id] || 1;
    if (qty > (stockMap[drug._id] || 0)) return alert("Not enough stock");

    // Call context addToCart to sync with backend
    addToCart(drug, qty);

    // Disable button after adding
    setDisableMap((prev) => ({ ...prev, [drug._id]: true }));

    // Update stock map
    setStockMap((prev) => ({ ...prev, [drug._id]: prev[drug._id] - qty }));
  };

  return (
    <div>
      <p className="text-gray-600">Browse medicines by category.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Sidebar Categories */}
        <div className="flex flex-col gap-4 text-sm text-gray-600">
          {[
            "Pain Relief",
            "Allergy",
            "Antibiotic",
            "Antacid",
            "Diabetes",
            "Mental Health",
          ].map((cat, idx) => (
            <p
              key={idx}
              onClick={() =>
                category === cat
                  ? navigate("/drugstore")
                  : navigate(`/drugstore/${cat}`)
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                category === cat ? "bg-indigo-100 text-black" : ""
              }`}
            >
              {cat}
            </p>
          ))}
        </div>

        {/* Main Drug Grid */}
        <div className="w-full grid grid-auto-fill gap-4 gap-y-6">
          {filterDrug.map((drug, index) => {
            const qty = quantityMap[drug._id] || 1;
            const totalPrice = ((drug.price || 0) * qty).toFixed(2);
            const currentStock = stockMap[drug._id] || 0;
            const isDisabled = disableMap[drug._id] || currentStock === 0;

            const btnClass = isDisabled
              ? "mt-2 px-4 py-2 rounded-full text-white bg-gray-400 cursor-not-allowed"
              : "mt-2 px-4 py-2 rounded-full text-white bg-blue-500 hover:opacity-90";

            return (
              <div
                key={index}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 flex flex-col"
              >
                <img
                  src={drug.image}
                  alt={drug.name}
                  className="bg-blue-50 h-40 object-contain w-full"
                  onClick={() => navigate(`/buy-drugs/${drug._id}`)}
                />
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <p
                      className={`w-2 h-2 rounded-full ${
                        currentStock > 0 ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></p>
                    <p
                      className={`${
                        currentStock > 0 ? "text-green-500" : "text-red-500"
                      } text-sm`}
                    >
                      {currentStock > 0
                        ? `Stock: ${currentStock}`
                        : "Out of Stock"}
                    </p>
                  </div>

                  <p className="text-gray-900 text-lg font-medium">{drug.name}</p>
                  <p className="text-gray-600 text-sm mb-1">{drug.category}</p>

                  {/* Quantity selector */}
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
                      disabled={qty >= currentStock}
                    >
                      +
                    </button>
                  </div>

                  {/* Price display */}
                  <p className="text-gray-900 font-medium">
                    {currencySymbol} {totalPrice}
                  </p>

                  {/* Add to cart */}
                  <button
                    onClick={() => handleAddToCart(drug)}
                    disabled={isDisabled}
                    className={btnClass}
                  >
                    Add to Cart
                  </button>

                  {/* View Cart Button */}
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
      </div>
    </div>
  );
};

export default DrugStore;