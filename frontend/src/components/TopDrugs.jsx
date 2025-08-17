import React from "react";
import { drugs } from "../assets/assets_frontend/assets";

const TopDrugs = () => {
  const handleAddToCart = (drug) => {
    console.log(`Added to cart: ${drug.name}`);
  };

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Drugs to Buy</h1>
      <p>Explore our trusted and best-selling drugs, verified and reliable.</p>

      <div className="w-full grid-auto-fill gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {drugs.slice(0, 10).map((drug, index) => (
          <div
            key={index}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 flex flex-col"
          >
            <img
              className="bg-blue-50 h-40 object-contain w-full"
              src={drug.image}
              alt={drug.name}
            />

            <div className="p-4 flex flex-col justify-between flex-1">
              <div className="flex items-center gap-2 text-sm text-green-500 mb-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <p>Available</p>
              </div>

              <p className="text-gray-900 text-lg font-medium">{drug.name}</p>
              <p className="text-gray-600 text-sm mb-1">{drug.company}</p>
              <p className="text-sm text-gray-700 mb-2">{drug.category}</p>

              <div className="text-sm text-gray-800 mb-3">
                <p>
                  <span className="font-semibold">Unit Price:</span>{" "}
                  {drug.unit_price}
                </p>
                <p>
                  <span className="font-semibold">Strip Price:</span>{" "}
                  {drug.strip_price}
                </p>
              </div>

              <button
                onClick={() => handleAddToCart(drug)}
                className="bg-primary text-white text-sm px-4 py-2 rounded-full hover:opacity-90 transition duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          window.scrollTo(0, 0);
          // Add routing to full drug page if needed
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
      >
        more
      </button>
    </div>
  );
};

export default TopDrugs;
