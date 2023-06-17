import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiSave, FiXCircle } from "react-icons/fi";
import ConfirmBox from "../commons/ConfirmBox";
import { useNavigate } from "react-router-dom";
import {
  deleteAdminBrand,
  getAdminSingleBrandData,
  getAdminSingleBrandFetchStatus,
  updateAdminBrand,
} from "../../../redux/adminSlice/brandsSlice";

const BrandMetadata = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const brandData = useSelector(getAdminSingleBrandData);

  const updateStatus = useSelector(getAdminSingleBrandFetchStatus);

  const [showBox, setShowBox] = useState(false);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [image, setImage] = useState(null);

  const handleDelete = async () => {
    try {
      await dispatch(deleteAdminBrand(id)).unwrap();
      setShowBox(false);
      navigate("/admin/brands", { replace: true });
    } catch (err) {
      // eslint-disable-next-line no-empty
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();

    if (!title || !title.trim()) {
      setTitleError("Required!");
    } else {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", image);
      dispatch(updateAdminBrand({ id, data: formData }));
    }
  };

  useEffect(() => {
    setTitle(brandData.title);
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
        <label className="text-sm text-textDim" htmlFor="title">
          Title
        </label>
        <input
          name="title"
          className="input-box h-[36px] text-sm"
          placeholder="Eg. Chocolate"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setTitleError("");
          }}
        />
        {titleError ? <span className="input-error">{titleError}</span> : null}
      </div>

      <div className="grid-list-2">
        <div className="input-container gap-1">
          <span className="text-sm text-textDim">Featured Image</span>
          <div className="w-[200px] max-h-[200px] bg-greyLight flex justify-center items-center">
            <img
              src={brandData.featuredImage}
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
          {image ? (
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
          ) : null}
        </div>
      </div>

      {showBox && (
        <ConfirmBox
          onConfirm={handleDelete}
          setShowBox={setShowBox}
          message={`Delete ${brandData.title}`}
        />
      )}
    </form>
  );
};

export default BrandMetadata;
