import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiSave, FiXCircle } from "react-icons/fi";
import ConfirmBox from "../commons/ConfirmBox";
import { useNavigate } from "react-router-dom";
import {
  deleteAdminBrand,
  fetchAdminSingleBrand,
  getAdminSingleBrandData,
  getAdminSingleBrandFetchStatus,
  updateAdminBrand,
} from "../../../redux/adminSlice/brandsSlice";

const BrandMetadata = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const brandData = useSelector(getAdminSingleBrandData) || {};
  console.log("brandDATA:",brandData)

  const updateStatus = useSelector(getAdminSingleBrandFetchStatus);

  const [showBox, setShowBox] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [image, setImage] = useState(null);

  const handleDelete = async () => {
    try {
      await dispatch(deleteAdminBrand(id)).unwrap();
      setShowBox(false);
      navigate("/admin/brands", { replace: true });
    } catch (err) {}
  };

  const handleEdit = (e) => {
    e.preventDefault();

    if (!name || !name.trim()) {
      setNameError("Required!");
    } else {
      const formData = new FormData();
      formData.append("name", name);
      if (image) formData.append("logo", image);
      dispatch(updateAdminBrand({ id, data: formData }));
    }
  };

  useEffect(() => {
    setName(brandData.name || "");
  }, [brandData]);

  return (
    <form onSubmit={handleEdit} className="flex flex-col gap-4 mb-6">
      <div className="pb-3 border-b border-b-greyLight flex flex-row justify-between items-center">
        <h4 className="heading4">Brand Information</h4>
        <div className="flex flex-row gap-4 items-center">
          <button
            type="button"
            onClick={() => setShowBox(true)}
            className="hover:text-uiWhite text-uiRed border-uiRed hover:bg-uiRed border py-2 px-4 rounded-sm transition-all duration-150 flex items-center justify-center gap-2 min-w-[100px]"
            disabled={updateStatus === "loading"}
          >
            <FiXCircle />
            <span className="text-sm">Delete brand</span>
          </button>
          <button
            type="submit"
            className="text-uiWhite border-baseGreen bg-baseGreen border py-2 px-4 rounded-sm hover:bg-darkGreen transition-all duration-150 flex items-center justify-center gap-2 min-w-[100px]"
            disabled={updateStatus === "loading"}
          >
            <FiSave />
            <span className="text-sm">Save</span>
          </button>
        </div>
      </div>

      <div className="input-container gap-1">
        <label className="text-sm text-textDim" htmlFor="name">
          Brand Name
        </label>
        <input
          name="name"
          className="input-box h-[36px] text-sm"
          placeholder="Eg. Fresh Farms"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameError("");
          }}
        />
        {nameError ? <span className="input-error">{nameError}</span> : null}
      </div>

      <div className="grid-list-2">
        <div className="input-container gap-1">
          <span className="text-sm text-textDim">Current Logo</span>
          <div className="w-[200px] max-h-[200px] bg-greyLight flex justify-center items-center">
            <img
              src={brandData.logo}
              alt="Brand Logo"
              className="object-contain max-h-full min-h-[150px]"
            />
          </div>
        </div>

        <div className="input-container gap-1">
          <label className="text-sm text-textDim" htmlFor="image">
            Upload New Logo
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.currentTarget.files[0])}
          />
          {image && (
            <div className="w-[200px] max-h-[160px] bg-greyLight flex justify-center items-center relative">
              <div className="absolute top-0 right-0">
                <button className="p-1" onClick={() => setImage(null)}>
                  <FiXCircle className="text-red-500 text-[24px]" />
                </button>
              </div>
              <img
                src={URL.createObjectURL(image)}
                alt="New Logo Preview"
                className="object-contain w-full max-h-full min-h-[150px]"
              />
            </div>
          )}
        </div>
      </div>

      {showBox && (
        <ConfirmBox
          onConfirm={handleDelete}
          setShowBox={setShowBox}
          message={`Delete brand "${brandData.name}"?`}
        />
      )}
    </form>
  );
};

export default BrandMetadata;
