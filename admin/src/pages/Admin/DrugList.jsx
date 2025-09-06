import React, { useContext, useEffect, useState } from "react";
import { DrugContext } from "../../context/DrugContext";

const DrugsList = () => {
  const { drugs, getAllDrugs, updateDrugField, aToken } =
    useContext(DrugContext);

  const [editMode, setEditMode] = useState({}); // track which drug is being edited
  const [localData, setLocalData] = useState({}); // store temporary edits

  useEffect(() => {
    if (aToken) getAllDrugs();
  }, [aToken]);

  // Track input changes locally
  const handleFieldChange = (drugId, field, value) => {
    setLocalData((prev) => ({
      ...prev,
      [drugId]: { ...prev[drugId], [field]: value },
    }));
  };

  // Track checkbox changes locally
  const handleCheckboxChange = (drugId, field, value) => {
    setLocalData((prev) => ({
      ...prev,
      [drugId]: { ...prev[drugId], [field]: value },
    }));
  };

  // Save changes to backend
  const saveChanges = (drugId) => {
    if (!localData[drugId]) return;

    const updates = localData[drugId];
    Object.keys(updates).forEach((field) => {
      updateDrugField(drugId, field, updates[field]);
    });

    // Exit edit mode and clear localData for this drug
    setEditMode((prev) => ({ ...prev, [drugId]: false }));
    setLocalData((prev) => {
      const copy = { ...prev };
      delete copy[drugId];
      return copy;
    });
  };

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-xl font-bold mb-4">All Drugs</h1>
      <div className="flex flex-wrap gap-4">
        {drugs.map((drug) => {
          const isEditing = editMode[drug._id] || false;
          const data = localData[drug._id] || {};

          return (
            <div
              key={drug._id}
              className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden p-4 group"
            >
              {/* Image */}
              <div className="mb-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={data.image ?? drug.image}
                    onChange={(e) =>
                      handleFieldChange(drug._id, "image", e.target.value)
                    }
                    className="w-full border p-1 rounded"
                  />
                ) : (
                  <img
                    src={drug.image || "/placeholder.png"}
                    alt={drug.name}
                    className="w-full h-32 object-cover rounded"
                  />
                )}
              </div>

              {/* Name */}
              <p className="text-lg font-medium">
                {isEditing ? (
                  <input
                    type="text"
                    value={data.name ?? drug.name}
                    onChange={(e) =>
                      handleFieldChange(drug._id, "name", e.target.value)
                    }
                    className="w-full border p-1 rounded"
                  />
                ) : (
                  drug.name
                )}
              </p>

              {/* Category */}
              <p className="text-sm text-gray-600">
                {isEditing ? (
                  <input
                    type="text"
                    value={data.category ?? drug.category}
                    onChange={(e) =>
                      handleFieldChange(drug._id, "category", e.target.value)
                    }
                    className="w-full border p-1 rounded"
                  />
                ) : (
                  drug.category
                )}
              </p>

              {/* Manufacturer */}
              <p className="text-sm text-gray-600">
                {isEditing ? (
                  <input
                    type="text"
                    value={data.manufacturer ?? drug.manufacturer}
                    onChange={(e) =>
                      handleFieldChange(
                        drug._id,
                        "manufacturer",
                        e.target.value
                      )
                    }
                    className="w-full border p-1 rounded"
                  />
                ) : (
                  `Manufacturer: ${drug.manufacturer}`
                )}
              </p>

              {/* Price */}
              <p className="text-sm text-gray-600">
                {isEditing ? (
                  <input
                    type="number"
                    value={data.price ?? drug.price}
                    onChange={(e) =>
                      handleFieldChange(drug._id, "price", e.target.value)
                    }
                    className="w-full border p-1 rounded"
                  />
                ) : (
                  `Price: ${drug.price}`
                )}
              </p>

              {/* Stock */}
              <p className="text-sm text-gray-600">
                {isEditing ? (
                  <input
                    type="number"
                    value={data.stock ?? drug.stock}
                    onChange={(e) =>
                      handleFieldChange(drug._id, "stock", e.target.value)
                    }
                    className="w-full border p-1 rounded"
                  />
                ) : (
                  `Stock: ${drug.stock}`
                )}
              </p>

              {/* Checkboxes */}
              <div className="mt-2 flex flex-col gap-2 text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={
                      data.prescriptionRequired ?? drug.prescriptionRequired
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        drug._id,
                        "prescriptionRequired",
                        e.target.checked
                      )
                    }
                  />
                  Prescription Required
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={(data.inStock ?? drug.stock) > 0}
                    onChange={(e) =>
                      handleCheckboxChange(
                        drug._id,
                        "inStock",
                        e.target.checked ? (data.stock ?? drug.stock) || 1 : 0
                      )
                    }
                  />
                  <span
                    className={
                      (data.stock ?? drug.stock) === 0 ? "text-red-500" : ""
                    }
                  >
                    In Stock
                  </span>
                </label>
              </div>

              {/* Edit / Save Button */}
              <div className="mt-2 flex justify-between">
                {isEditing ? (
                  <button
                    onClick={() => saveChanges(drug._id)}
                    className="px-3 py-1 border rounded text-sm hover:bg-indigo-500 hover:text-white transition"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      setEditMode((prev) => ({
                        ...prev,
                        [drug._id]: true,
                      }))
                    }
                    className="px-3 py-1 border rounded text-sm hover:bg-indigo-500 hover:text-white transition"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DrugsList;