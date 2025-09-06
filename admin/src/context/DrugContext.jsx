import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DrugContext = createContext();

const DrugContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
  const [drugs, setDrugs] = useState([]);
  const [currentDrug, setCurrentDrug] = useState(null); // for editing

  // ================= FETCH ALL DRUGS =================
  const getAllDrugs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/all-drugs`, {
        headers: { aToken },
      });
      if (data.success) setDrugs(data.drugs);
      else toast.error(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ================= DELETE DRUG =================
  const deleteDrug = async (drugId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/delete-drug`,
        { drugId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDrugs();
      } else toast.error(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ================= EDIT DRUG =================
  const editDrug = (drug) => {
    setCurrentDrug(drug);
  };

  // ================= UPDATE DRUG FIELD (Checkbox support) =================
  const updateDrugField = async (drugId, field, value) => {
    try {
      let updateData = {};

      if (field === "inStock") {
        // If checkbox unchecked → stock = 0
        updateData.stock = value ? value : 0; // value can be admin-provided or default
      } else {
        updateData[field] = value; // e.g., prescriptionRequired
      }

      const { data } = await axios.post(
        `${backendUrl}/api/admin/update-drug`,
        { drugId, ...updateData },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllDrugs(); // refresh list
      } else toast.error(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  
  const value = {
    aToken,
    setAToken,
    drugs,
    getAllDrugs,
    deleteDrug,
    currentDrug,
    setCurrentDrug,
    editDrug,
    backendUrl,
    updateDrugField, // ✅ add this
  };

  return (
    <DrugContext.Provider value={value}>
      {props.children}
    </DrugContext.Provider>
  );
};

export default DrugContextProvider;