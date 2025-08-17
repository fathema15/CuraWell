import React from "react";
import { drugCategories } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";

const DrugCategoryMenu = () => {
  return (
    <div
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
      id="specialty"
    >
      <h1 className="text-3xl font-medium">Find by Drugs</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our range of authentic drugs organized by category for easier navigation and access.
      </p>
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
        {drugCategories.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
            key={index}
            to={`/drugstore/${item.category}`}
          >
            <img className="w-16 sm:w-24 mb-2" src={item.image} alt="" />
            <p>{item.category}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}; 

export default DrugCategoryMenu;






