import React, { useState } from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { PRIVATE_API } from "../../../api/apiIndex";

const DeleteReviewButton = ({ id, setOldReview, setEditReview }) => {
  const [deleteActive, setDeleteActive] = useState(false);
  const [status, setStatus] = useState("idle");

  const handleDelete = async () => {
    try {
      setStatus("loading");
      await PRIVATE_API.delete(`/review/${id}`);
      setStatus("idle");

      setOldReview("");
      setEditReview(false);
    } catch (error) {
      setStatus("failed");

      setTimeout(() => {
        setStatus("idle");
      }, 2000);
    }
  };

  return deleteActive ? (
    <div className="flex flex-row gap-4 flex-1 h-min">
      <button
        type="button"
        onClick={() => setDeleteActive(false)}
        className="text-uiBlack border-uiGrey border py-2 px-4 rounded-sm hover:bg-greyLight transition-all duration-150 flex items-center justify-center gap-2"
      >
        <FiXCircle />
        <span className="text-sm">Cancel</span>
      </button>
      <button
        type="button"
        onClick={handleDelete}
        className="text-uiWhite border-uiRed bg-uiRed border py-2 px-4 rounded-sm transition-all duration-150 flex items-center justify-center gap-2 min-w-[100px]"
        disabled={status === "loading"}
      >
        {status == "loading" ? (
          <ImSpinner2 className="animate-spin" />
        ) : (
          <>
            <FiCheckCircle />
            <span className="text-sm">Confirm</span>
          </>
        )}
      </button>
    </div>
  ) : (
    <div className="">
      <button
        type="button"
        onClick={() => setDeleteActive(true)}
        className="bg-transparent border border-uiRed text-uiRed text-sm py-2 px-4 rounded-sm"
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteReviewButton;
