import React from "react";
import { drugCategories } from "../assets/assets/assets";
import { Link } from "react-router-dom";

const CategoryMenu = () => {
  return (
    <div
      id="category"
      className="flex flex-col items-center gap-4 py-16 text-[#262626]"
    >
      <h1 className="text-3xl font-medium">Find by Category</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Browse medicines by category and quickly find what you need for your
        health and wellbeing.
      </p>
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
        {drugCategories.map((item, index) => (
          <Link
            to={`/drugs/${item.category}`}
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
            key={index}
          >
            <img className="w-16 sm:w-24 mb-2" src={item.image} alt="" />
            <p>{item.category}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu;