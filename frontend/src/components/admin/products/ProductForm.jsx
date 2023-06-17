import React from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { FiSave, FiXCircle } from "react-icons/fi";
import CustomMultiSelect from "./CustomMultiSelect";
import { NODE_API } from "../../../api/apiIndex";

const productSchema = Yup.object().shape({
  title: Yup.string().min(6, "Too Short!").required("Required"),
  brand: Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.string().required(),
  }),
  category: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string(),
        value: Yup.string(),
      })
    )
    .min(1, "Required"),
  price: Yup.number().required("Required").positive("Enter valid number"),
  MRP: Yup.number().required("Required").positive("Enter valid number"),
  quantity: Yup.number()
    .required("Required")
    .positive("Enter valid number")
    .integer("Enter valid number"),
  feature: Yup.string().min(6, "Too Short!").required("Required"),
  description: Yup.string().min(6, "Too Short!").required("Required"),
});

const ProductForm = ({ handleCancel, initialValues, handleSubmit }) => {
  const loadCategories = async (searchQuery) => {
    try {
      const { data } = await NODE_API.get(
        `/category/select-search?searchQuery=${searchQuery}`
      );
      return data.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const loadBrands = async (searchQuery) => {
    try {
      const { data } = await NODE_API.get(
        `/brand/select-search?searchQuery=${searchQuery}`
      );
      return data.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      validationSchema={productSchema}
      initialValues={initialValues}
      className=""
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form
          className="flex flex-col gap-4 w-full"
          encType="multipart/form-data"
        >
          <div className="input-container gap-1">
            <label className="text-sm text-textDim" htmlFor="title">
              Title
            </label>
            <Field
              name="title"
              className="input-box h-[38px] border border-[#CCCCCC] focus:border-[#2684ff] focus:border-[2px] rounded-[4px] text-sm"
              placeholder="Title of the product"
            />
            {errors.title && touched.title ? (
              <span className="input-error">{errors.title}</span>
            ) : null}
          </div>

          {values?.imageURLHighRes ? (
            <div className="input-container gap-1">
              <span className="text-sm text-textDim">Images</span>
              <div className="grid-list-5">
                {values?.imageURLHighRes?.map((imageUrl) => (
                  <div
                    className="w-full max-h-[130px] bg-greyLight flex justify-center items-center relative"
                    key={imageUrl}
                  >
                    <div className="absolute top-0 right-0">
                      <button
                        className="p-1"
                        onClick={() =>
                          setFieldValue(
                            "imageURLHighRes",
                            values.imageURLHighRes.filter((i) => i !== imageUrl)
                          )
                        }
                      >
                        <FiXCircle className="text-red-500 text-[24px]" />
                      </button>
                    </div>
                    <img
                      src={imageUrl}
                      alt=""
                      className="object-contain w-full max-h-full min-h-[150px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="input-container gap-1">
            <label className="text-sm text-textDim" htmlFor="images">
              Upload Image
            </label>
            <input
              type="file"
              name="images"
              accept="image/*"
              onChange={(e) => {
                if (
                  !values.images.find(
                    (i) => i.name === e.currentTarget.files[0].name
                  )
                )
                  setFieldValue("images", [
                    ...values.images,
                    ...e.currentTarget.files,
                  ]);
              }}
              multiple
            />
            <div className="grid-list-5 pt-2">
              {values?.images?.map((entry) => (
                <div
                  className="w-full bg-greyLight flex justify-center items-center relative"
                  key={entry.name}
                >
                  <div className="absolute top-0 right-0">
                    <button
                      className="p-1"
                      onClick={() =>
                        setFieldValue(
                          "images",
                          values.images.filter((i) => i.name !== entry.name)
                        )
                      }
                    >
                      <FiXCircle className="text-red-500 text-[24px]" />
                    </button>
                  </div>
                  <img
                    src={URL.createObjectURL(entry)}
                    alt=""
                    className="object-contain max-w-full max-h-full min-h-[150px]"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid-list-2">
            <div className="input-container gap-1">
              <label className="text-sm text-textDim" htmlFor="price">
                Price
              </label>
              <Field
                name="price"
                className="input-box h-[38px] border border-[#CCCCCC] focus:border-[#2684ff] focus:border-[2px] rounded-[4px] text-sm"
                placeholder="Actual selling price"
              />
              {errors.price && touched.price ? (
                <span className="input-error">{errors.price}</span>
              ) : null}
            </div>

            <div className="input-container gap-1">
              <label className="text-sm text-textDim" htmlFor="MRP">
                MRP
              </label>
              <Field
                name="MRP"
                className="input-box h-[38px] border border-[#CCCCCC] focus:border-[#2684ff] focus:border-[2px] rounded-[4px] text-sm"
                placeholder="Maximum Retail Price"
              />
              {errors.MRP && touched.MRP ? (
                <span className="input-error">{errors.MRP}</span>
              ) : null}
            </div>
          </div>

          <div className="grid-list-2">
            <div className="input-container gap-1">
              <label className="text-sm text-textDim" htmlFor="brand">
                Brand
              </label>
              <Field
                className="text-sm text-bodyText"
                name="brand"
                component={CustomMultiSelect}
                loadData={loadBrands}
                placeholder="Select brand"
                isMulti={false}
              />
              {errors.brand && touched.brand ? (
                <span className="input-error">{errors.brand}</span>
              ) : null}
            </div>

            <div className="input-container gap-1">
              <label className="text-sm text-textDim" htmlFor="quantity">
                Stock
              </label>
              <Field
                name="quantity"
                className="input-box h-[38px] border border-[#CCCCCC] focus:border-[#2684ff] focus:border-[2px] rounded-[4px] text-sm"
                placeholder="Product's total stocks"
              />
              {errors.quantity && touched.quantity ? (
                <span className="input-error">{errors.quantity}</span>
              ) : null}
            </div>
          </div>

          <div className="input-container gap-1">
            <label className="text-sm text-textDim" htmlFor="category">
              Categories
            </label>
            <Field
              className="text-sm text-bodyText"
              name="category"
              component={CustomMultiSelect}
              loadData={loadCategories}
              placeholder="Select category"
              isMulti={true}
            />
            {errors.category && touched.category ? (
              <span className="input-error">{errors.category}</span>
            ) : null}
          </div>

          <div className="input-container gap-1">
            <label className="text-sm text-textDim" htmlFor="feature">
              Feature
            </label>
            <Field
              name="feature"
              className="input-box h-[200px] text-sm py-2 border border-[#CCCCCC] focus:border-[#2684ff] focus:border-[2px] rounded-[4px]"
              as="textarea"
              placeholder="Product features"
            />
            {errors.feature && touched.feature ? (
              <span className="input-error">{errors.feature}</span>
            ) : null}
          </div>

          <div className="input-container gap-1">
            <label className="text-sm text-textDim" htmlFor="description">
              Description
            </label>
            <Field
              name="description"
              className="input-box h-[300px] text-sm py-2 border border-[#CCCCCC] focus:border-[#2684ff] focus:border-[2px] rounded-[4px]"
              as="textarea"
              placeholder="Product description"
            />
            {errors.description && touched.description ? (
              <span className="input-error">{errors.description}</span>
            ) : null}
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
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
