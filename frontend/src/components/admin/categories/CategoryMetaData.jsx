import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAdminCategories,
  getAdminSingleCategoryData,
  getAdminSingleCategoryFetchStatus,
  updateAdminCategories,
} from "../../../redux/adminSlice/categoriesSlice";
import { FiSave, FiXCircle } from "react-icons/fi";
import ConfirmBox from "../commons/ConfirmBox";
import { useNavigate } from "react-router-dom";

const CategoryMetaData = ({ id }) => {
  console.log("id for fetching the category data:",id)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoryData = useSelector(getAdminSingleCategoryData);
  const updateStatus = useSelector(getAdminSingleCategoryFetchStatus);

  const [showBox, setShowBox] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [image, setImage] = useState(null);

  const handleDelete = async () => {
    try {
      await dispatch(deleteAdminCategories(id)).unwrap();
      setShowBox(false);
      navigate("/admin/categories", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();

    if (!name || !name.trim()) {
      setNameError("Required!");
    } else {
      const formData = new FormData();
      formData.append("name", name);
      if (image) formData.append("image", image);
      dispatch(updateAdminCategories({ id, data: formData }));
    }
  };
  
  useEffect(() => {
    if (categoryData?.name) {
      setName(categoryData.name);
    }
  }, [categoryData]);
console.log("category data:",categoryData)
  return (
    <form onSubmit={handleEdit} className="flex flex-col gap-4 mb-6">
      <div className="pb-3 border-b border-b-greyLight flex flex-row justify-between items-center">
        <h4 className="heading4">Category Information</h4>
        <div className="flex flex-row gap-4 items-center">
          <button
            type="button"
            onClick={() => setShowBox(true)}
            className="hover:text-uiWhite text-uiRed border-uiRed hover:bg-uiRed border py-2 px-4 rounded-sm transition-all duration-150 flex items-center justify-center gap-2 min-w-[100px]"
            disabled={updateStatus === "loading"}
          >
            <FiXCircle />
            <span className="text-sm">Delete category</span>
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
          Name
        </label>
        <input
          name="name"
          className="input-box h-[36px] text-sm"
          placeholder="Eg. Dairy"
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
          <span className="text-sm text-textDim">Featured Image</span>
          <div className="w-[200px] max-h-[200px] bg-greyLight flex justify-center items-center">
            <img
              src={categoryData.featuredImage}
              alt=""
              className="object-contain max-h-full min-h-[150px]"
            />
          </div>
        </div>

        <div className="input-container gap-1">
          <label className="text-sm text-textDim" htmlFor="image">
            Upload New Image
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
                alt=""
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
          message="Delete Category"
        />
      )}
    </form>
  );
};

export default CategoryMetaData;
