import React, { useState } from "react";
import { FiCheckCircle, FiEdit, FiTrash, FiXCircle } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteAddress,
  getDeleteAddressError,
  getDeleteAddressStatus,
  removeDeleteErrorMessage,
} from "../../../../redux/slice/addressSlice";
import AlertBox from "../../../common/AlertBox";

const AddressActions = ({ id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteStatus = useSelector(getDeleteAddressStatus);
  const deleteError = useSelector(getDeleteAddressError);

  const [deleteActive, setDeleteActive] = useState(false);

  const handleEdit = () => {
    navigate(`/profile/address/edit/${id}`);
  };
  const handleDelete = async () => {
    try {
      await dispatch(deleteAddress(id)).unwrap();
      setDeleteActive(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-row items-center gap-4 mt-2">
      {deleteStatus === "failed" ? (
        <AlertBox
          type={deleteStatus}
          message={deleteError}
          toDispatch={removeDeleteErrorMessage}
        />
      ) : null}
      {deleteActive ? (
        <>
          <button
            type="button"
            onClick={() => setDeleteActive(false)}
            className="text-uiBlack border-uiGrey border py-1 px-4 rounded-sm hover:bg-greyLight transition-all duration-150 flex items-center justify-center gap-2 text-sm"
          >
            <FiXCircle />
            <span className="text-sm">Cancel</span>
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="text-uiWhite border-uiRed bg-uiRed border py-1 px-4 rounded-sm transition-all duration-150 flex items-center justify-center gap-2 min-w-[100px] text-sm"
            disabled={deleteStatus === "loading"}
          >
            {deleteStatus == "loading" ? (
              <ImSpinner2 className="animate-spin" />
            ) : (
              <>
                <FiCheckCircle />
                <span>Confirm</span>
              </>
            )}
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={() => setDeleteActive(true)}
            className="text-uiRed border-uiRed border py-1 px-4 rounded-sm hover:bg-uiRed/10 transition-all duration-150 flex items-center justify-center gap-2 text-sm"
          >
            <FiTrash />
            <span className="">Delete</span>
          </button>
          <button
            type="button"
            onClick={handleEdit}
            className="text-uiBlack border-uiGrey border py-1 px-4 rounded-sm hover:bg-greyLight transition-all duration-150 flex items-center justify-center gap-2 text-sm"
          >
            <FiEdit />
            <span className="">Edit</span>
          </button>
        </>
      )}
    </div>
  );
};

export default AddressActions;
