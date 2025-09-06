import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDrugs = ({ category, drugId }) => {
  const { drugs } = useContext(AppContext);
  const navigate = useNavigate();

  const [relDrugs, setRelDrugs] = useState([]);

  useEffect(() => {
    if (drugs.length > 0 && category) {
      const filteredDrugs = drugs.filter(
        (drug) => drug.category === category && drug._id !== drugId
      );
      setRelDrugs(filteredDrugs);
    }
  }, [drugs, category, drugId]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Related Drugs</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Explore similar trusted and best-selling medicines.
      </p>

      <div className="w-full grid grid-auto-fill gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relDrugs.slice(0, 5).map((drug, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/buy-drugs/${drug._id}`);
              scrollTo(0, 0);
            }}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 flex flex-col"
          >
            <img
              className="bg-blue-50 h-40 object-contain w-full"
              src={drug.image}
              alt={drug.name}
            />
            <div className="p-4 flex flex-col justify-between flex-1">
              <div className="flex items-center gap-2 text-sm mb-2">
                <p
                  className={`w-2 h-2 rounded-full ${
                    drug.stock > 0 ? "bg-green-500" : "bg-red-500"
                  }`}
                ></p>
                <p
                  className={`text-sm ${
                    drug.stock > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {drug.stock > 0 ? `Stock: ${drug.stock}` : "Out of Stock"}
                </p>
              </div>

              <p className="text-gray-900 text-lg font-medium">{drug.name}</p>
              <p className="text-gray-600 text-sm">{drug.company}</p>
              <p className="text-sm text-gray-700">{drug.category}</p>

              <p className="text-gray-900 font-medium mt-2">
                Price: {drug.unit_price}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate("/drugs");
          scrollTo(0, 0);
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
      >
        more
      </button>
    </div>
  );
};

export default RelatedDrugs;