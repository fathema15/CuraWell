import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AddDrug = () => {
  const [drugImg, setDrugImg] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Pain Relief");
  const [manufacturer, setManufacturer] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [prescriptionRequired, setPrescriptionRequired] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");

  const { backendUrl } = useContext(AppContext);
  const { aToken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!drugImg) return toast.error("Drug image not selected");

    try {
      const formData = new FormData();
      formData.append("image", drugImg);
      formData.append("name", name);
      formData.append("category", category);
      formData.append("manufacturer", manufacturer);
      formData.append("price", price);
      formData.append("stock", stock || 0);
      formData.append("description", description);
      formData.append("prescriptionRequired", prescriptionRequired);
      formData.append("expiryDate", expiryDate);

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-drug`,
        formData,
        {
          headers: {
            aToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);

        // Reset form
        setDrugImg(null);
        setName("");
        setCategory("Pain Relief");
        setManufacturer("");
        setPrice("");
        setStock("");
        setDescription("");
        setPrescriptionRequired(false);
        setExpiryDate("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Drug</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        {/* Image Upload */}
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="drug-img">
            <img
              className="w-16 bg-gray-100 rounded cursor-pointer"
              src={drugImg ? URL.createObjectURL(drugImg) : assets.upload_area}
              alt="drug"
            />
          </label>
          <input
            type="file"
            id="drug-img"
            hidden
            onChange={(e) => setDrugImg(e.target.files[0])}
          />
          <p>
            Upload drug <br /> image
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 text-gray-600">
          {/* Left Column */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Drug Name</p>
              <input
                type="text"
                placeholder="Drug name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded px-3 py-2"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Category</p>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border rounded px-2 py-2"
              >
                <option value="Pain Relief">Pain Relief</option>
                <option value="Allergy">Allergy</option>
                <option value="Antibiotic">Antibiotic</option>
                <option value="Antacid">Antacid</option>
                <option value="Diabetes">Diabetes</option>
                <option value="Mental Health">Mental Health</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Manufacturer</p>
              <input
                type="text"
                placeholder="Manufacturer"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
                className="border rounded px-3 py-2"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Price</p>
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border rounded px-3 py-2"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Stock</p>
              <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="border rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Prescription Required?</p>
              <select
                value={prescriptionRequired}
                onChange={(e) =>
                  setPrescriptionRequired(e.target.value === "true")
                }
                className="border rounded px-2 py-2"
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Expiry Date</p>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="border rounded px-3 py-2"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Description</p>
              <textarea
                placeholder="Write about the drug"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full px-4 pt-2 border rounded"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
        >
          Add Drug
        </button>
      </div>
    </form>
  );
};

export default AddDrug;