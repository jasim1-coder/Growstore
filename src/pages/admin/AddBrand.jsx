import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import { useNavigate } from "react-router-dom";
import { NODE_API, PRIVATE_API } from "../../api/apiIndex";
import AdminLayout from "../../components/common/AdminLayout";
import AlertBox from "../../components/common/AlertBox";
import AdminPageHeader from "../../components/admin/commons/AdminPageHeader";
import SimpleLoading from "../../components/common/loaders/SimpleLoading";
import AdminBackButton from "../../components/admin/commons/AdminBackButton";
import { FiSave, FiXCircle } from "react-icons/fi";

const AdminAddBrand = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState("");

  const loadProducts = async (searchQuery) => {
    try {
      const { data } = await NODE_API.get("/product/select-search", {
        params: { searchQuery },
      });
      return data.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const handleCancel = () => {
    navigate("/admin/brands");
  };

  const handleAddBrand = async (e) => {
    e.preventDefault();
    try {
      let _err = false;
      if (!title || !title.trim()) {
        _err = true;
        setTitleError("Required!");
      }
      if (!image) {
        _err = true;
        setImageError("Required!");
      }
      if (!_err) {
        setStatus("loading");
        const formData = new FormData();
        formData.append("title", title);
        formData.append("image", image);
        for (const entry of products) {
          formData.append("products", entry.value);
        }
        await PRIVATE_API.post("/brand/add", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setStatus("success");
        setTitle("");
        setImage("");
        setProducts([]);
      }
    } catch (err) {
      setStatus("failed");
      setError(err.response ? err.response.data.message : err);
    }
  };

  return (
    <AdminLayout>
      {status == "failed" ? <AlertBox message={error} type={status} /> : null}
      {status == "success" ? (
        <AlertBox message="Successfully added brand" type={status} />
      ) : null}
      <div className="adminContainer">
        <AdminPageHeader title="Add Brand" />

        <section className="adminMainContainer relative gap-0">
          {status == "loading" ? <SimpleLoading /> : null}
          <div className="flex flex-row w-full justify-between items-center mb-10">
            <AdminBackButton />
          </div>
          <form onSubmit={handleAddBrand} className="flex flex-col gap-4">
            <div className="input-container gap-1">
              <label className="text-sm text-textDim" htmlFor="title">
                Title
              </label>
              <input
                name="title"
                className="input-box h-[38px] border border-[#CCCCCC] focus:border-[#2684ff] focus:border-[2px] rounded-[4px] text-sm"
                placeholder="Eg. Chocolate"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setTitleError("");
                }}
              />
              {titleError ? (
                <span className="input-error">{titleError}</span>
              ) : null}
            </div>

            <div className="input-container gap-1">
              <label className="text-sm text-textDim" htmlFor="image">
                Featured Image
              </label>
              <div className="flex flex-row gap-3 flex-wrap">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) => {
                    setImage(e.currentTarget.files[0]);
                    setImageError("");
                  }}
                />
                {image ? (
                  <div className="w-[200px] max-h-[200px] bg-greyLight flex justify-center items-center relative">
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
              {imageError ? (
                <span className="input-error">{imageError}</span>
              ) : null}
            </div>

            <div className="input-container gap-1">
              <label className="text-sm text-textDim" htmlFor="products">
                Products
              </label>
              <span className="text-xs text-uiRed">
                The products existing brand will be replaced by new brand
              </span>
              <AsyncSelect
                cacheOptions
                loadOptions={loadProducts}
                defaultOptions
                name="products"
                onChange={setProducts}
                value={products}
                placeholder="Select products"
                isMulti
              />
            </div>

            <div className="flex flex-row items-center gap-4 self-end">
              <button
                type="button"
                onClick={handleCancel}
                className="text-uiBlack border-uiGrey border py-2 min-w-[100px] rounded-sm hover:bg-greyLight transition-all duration-150 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-uiWhite border-baseGreen bg-baseGreen border py-2 px-4 rounded-sm hover:bg-darkGreen transition-all duration-150 flex items-center justify-center gap-2 min-w-[100px]"
              >
                <FiSave />
                <span className="text-sm">Save</span>
              </button>
            </div>
          </form>
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminAddBrand;
