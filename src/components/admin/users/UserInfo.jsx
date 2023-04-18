import moment from "moment";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FiCheck, FiSave, FiXCircle } from "react-icons/fi";
import {
  getAdminSingleUserFetchStatus,
  updateUserAdmin,
} from "../../../redux/adminSlice/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ConfirmBox from "../commons/ConfirmBox";

const userSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  mobileNumber: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Enter valid number")
    .required("Required"),
  password: Yup.string().min(6, "Too Short!"),
});

const UserInfo = ({ data, createdAt, active }) => {
  const dispatch = useDispatch();
  const id = useParams().id;

  const updateStatus = useSelector(getAdminSingleUserFetchStatus);

  const [showBox, setShowBox] = useState(false);

  const handleDeactivate = () => {
    dispatch(updateUserAdmin({ id, data: { deactivate: true } }));
    setShowBox(false);
  };

  const handleActivate = () => {
    dispatch(updateUserAdmin({ id, data: { deactivate: false } }));
  };

  const handleEdit = (values) => {
    dispatch(updateUserAdmin({ id, data: { ...values } }));
  };

  return (
    <Formik
      onSubmit={handleEdit}
      validationSchema={userSchema}
      initialValues={data}
      className=""
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-4">
          <div className="pb-3 border-b border-b-greyLight flex flex-row justify-between items-center">
            <h4 className="heading4">Account Information</h4>
            <div className="flex flex-row gap-4 items-center">
              {active ? (
                <button
                  type="button"
                  onClick={() => setShowBox(true)}
                  className="hover:text-uiWhite text-uiRed border-uiRed hover:bg-uiRed border py-2 px-4 rounded-sm transition-all duration-150 flex items-center justify-center gap-2 min-w-[100px]"
                  disabled={updateStatus === "loading"}
                >
                  <FiXCircle />
                  <span className="text-sm">Deactivate Account</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleActivate}
                  className="hover:text-uiWhite text-baseGreen border-baseGreen hover:bg-baseGreen  border py-2 px-4 rounded-sm transition-all duration-150 flex items-center justify-center gap-2 min-w-[100px]"
                  disabled={updateStatus === "loading"}
                >
                  <FiCheck />
                  <span className="text-sm">Activate Account</span>
                </button>
              )}
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
          <div className="p-3 grid-list-3">
            <div className="input-container gap-1">
              <label className="text-sm text-textDim" htmlFor="name">
                Name
              </label>
              <Field
                name="name"
                className="input-box h-[36px] text-sm"
                placeholder="Eg. John doe"
              />
              {errors.name && touched.name ? (
                <span className="input-error">{errors.name}</span>
              ) : null}
            </div>
            <div className="input-container gap-1">
              <label className="text-sm text-textDim" htmlFor="mobileNumber">
                Mobile Number
              </label>
              <Field
                name="mobileNumber"
                className="input-box h-[36px] text-sm"
                placeholder="Eg. 870000000"
              />
              {errors.mobileNumber && touched.mobileNumber ? (
                <span className="input-error">{errors.mobileNumber}</span>
              ) : null}
            </div>
            <div className="input-container gap-1">
              <label className="text-sm text-textDim" htmlFor="email">
                Email
              </label>
              <Field
                name="email"
                className="input-box h-[36px] text-sm"
                placeholder="Eg. abc@example.com"
              />
              {errors.email && touched.email ? (
                <span className="input-error">{errors.email}</span>
              ) : null}
            </div>

            <div className="input-container gap-1">
              <label className="text-sm text-textDim" htmlFor="password">
                Change Password
              </label>
              <Field
                name="password"
                type="password"
                className="input-box h-[36px] text-sm"
                placeholder="Eg. password"
              />
              {errors.password && touched.password ? (
                <span className="input-error">{errors.password}</span>
              ) : null}
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-textDim">Joined</span>
              <span className="py-2">
                {moment(createdAt).format("DD MMMM YYYY, HH:mm")}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-textDim">Status</span>
              <span className="py-2">{active ? "Active" : "Deactivated"}</span>
            </div>
          </div>
          {showBox && (
            <ConfirmBox
              onConfirm={handleDeactivate}
              setShowBox={setShowBox}
              message="Deactivate Account"
            />
          )}
        </Form>
      )}
    </Formik>
  );
};

export default UserInfo;
