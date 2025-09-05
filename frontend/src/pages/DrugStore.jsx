// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import { CartContext } from "../context/CartContext";



// const DrugStore = () => {
//   const { category } = useParams();
//   const [filterDrug, setFilterDrug] = useState([]);
//   const navigate = useNavigate();

//   const { drugs } = useContext(AppContext);
//   const { addToCart } = useContext(CartContext);

//   const handleAddToCart = (drug) => {
//     addToCart(drug);
//     alert(`${drug.name} added to cart!`);
//     navigate('/my-carts'); // navigate to cart page
//   };

//   const applyFilter = () => {
//     if (category) {
//       setFilterDrug(drugs.filter((drug) => drug.category === category));
//     } else {
//       setFilterDrug(drugs);
//     }
//   };

//   useEffect(() => {
//     applyFilter();
//   }, [drugs, category]);

//   return (
//     <div>
//       <p className="text-gray-600">Browse through the drugs category.</p>
//       <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
//         <div className="w-64 flex flex-col gap-4 text-sm text-gray-600">
//           <p
//             onClick={() =>
//               category === "Pain Relief"
//                 ? navigate("/drugstore")
//                 : navigate("/drugstore/Pain Relief")
//             }
//             className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
//               category === "Pain Relief" ? "bg-indigo-100 text-black" : ""
//             }`}
//           >
//             Pain Relief
//           </p>
//           <p
//             onClick={() =>
//               category === "Allergy"
//                 ? navigate("/drugstore")
//                 : navigate("/drugstore/Allergy")
//             }
//             className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
//               category === "Allergy" ? "bg-indigo-100 text-black" : ""
//             }`}
//           >
//             Allergy
//           </p>

//           <p
//             onClick={() =>
//               category === "Antibiotic"
//                 ? navigate("/drugstore")
//                 : navigate("/drugstore/Antibiotic")
//             }
//             className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
//               category === "Antibiotic" ? "bg-indigo-100 text-black" : ""
//             }`}
//           >
//             Antibiotic
//           </p>

//           <p
//             onClick={() =>
//               category === "Antacid"
//                 ? navigate("/drugstore")
//                 : navigate("/drugstore/Antacid")
//             }
//             className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
//               category === "Antacid" ? "bg-indigo-100 text-black" : ""
//             }`}
//           >
//             Antacid
//           </p>

//           <p
//             onClick={() =>
//               category === "Diabetes"
//                 ? navigate("/drugstore")
//                 : navigate("/drugstore/Diabetes")
//             }
//             className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
//               category === "Diabetes" ? "bg-indigo-100 text-black" : ""
//             }`}
//           >
//             Diabetes
//           </p>

//           <p
//             onClick={() =>
//               category === "Mental Health"
//                 ? navigate("/drugstore")
//                 : navigate("/drugstore/Mental Health")
//             }
//             className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
//               category === "Mental Health" ? "bg-indigo-100 text-black" : ""
//             }`}
//           >
//             Mental Health
//           </p>
//         </div>
//         <div className="w-full grid grid-auto-fill gap-4 gap-y-6">
//           {filterDrug.map((drug, index) => (
//             <div
//               key={index}
//               className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 flex flex-col"
//             >
//               <img
//                 className="bg-blue-50 h-40 object-contain w-full"
//                 src={drug.image}
//                 alt={drug.name}
//               />

//               <div className="p-4 flex flex-col justify-between flex-1">
//                 <div className="flex items-center gap-2 text-sm text-green-500 mb-2">
//                   <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//                   <p>Available</p>
//                 </div>

//                 <p className="text-gray-900 text-lg font-medium">{drug.name}</p>
//                 <p className="text-gray-600 text-sm mb-1">{drug.company}</p>
//                 <p className="text-sm text-gray-700 mb-2">{drug.category}</p>

//                 <div className="text-sm text-gray-800 mb-3">
//                   <p>
//                     <span className="font-semibold">Unit Price:</span>{" "}
//                     {drug.unit_price}
//                   </p>
//                   <p>
//                     <span className="font-semibold">Strip Price:</span>{" "}
//                     {drug.strip_price}
//                   </p>
//                 </div>

//                 <button
//                   onClick={() => handleAddToCart(drug)}
//                   className="bg-primary text-white text-sm px-4 py-2 rounded-full hover:opacity-90 transition duration-300"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DrugStore;
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DrugStore = () => {
  const { category } = useParams();
  const [filterDrug, setFilterDrug] = useState([]);
  const navigate = useNavigate();

  const { drugs } = useContext(AppContext);
  const { addToCart } = useContext(CartContext);

  // Add drug to cart and navigate
  const handleAddToCart = (drug) => {
    addToCart(drug);
    toast.success(`${drug.name} added to cart!`);
    navigate("/my-carts");
  };

  // Filter drugs by category
  const applyFilter = () => {
    if (category) {
      setFilterDrug(drugs.filter((drug) => drug.category === category));
    } else {
      setFilterDrug(drugs);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [drugs, category]);

  return (
    <div>
      <p className="text-gray-600">Browse through the drugs category.</p>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Category Filters */}
        <div className="w-64 flex flex-col gap-4 text-sm text-gray-600">
          {["Pain Relief", "Allergy", "Antibiotic", "Antacid", "Diabetes", "Mental Health"].map(
            (cat) => (
              <p
                key={cat}
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
            )
          )}
        </div>

        {/* Drugs Grid */}
        <div className="w-full grid grid-auto-fill gap-4 gap-y-6">
          {filterDrug.map((drug, index) => (
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
                  className="bg-indigo-500 text-white text-sm px-4 py-2 rounded-full hover:opacity-90 transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrugStore;

