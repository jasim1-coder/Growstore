import React, { useState } from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

const OrderActions = () => {
  const [cancelOrder, setCancelOrder] = useState(false);

  const handleCancel = () => {
    setCancelOrder(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="py-2 border-b border-b-greyLight">
        <h3 className="heading4">Actions</h3>
      </div>

      {cancelOrder ? (
        <div className="flex flex-col sm:gap-4 gap-3">
          <p className="text-uiBlack font-medium">
            Are you sure you want to cancel the order?
          </p>
          <div className="flex flex-row gap-4 flex-1 h-min">
            <button
              type="button"
              onClick={() => setCancelOrder(false)}
              className="text-uiBlack border-uiGrey border py-2 px-4 rounded-sm hover:bg-greyLight transition-all duration-150 flex items-center justify-center gap-2"
            >
              <FiXCircle />
              <span className="text-sm">Cancel</span>
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="text-uiWhite border-uiRed bg-uiRed border py-2 px-4 rounded-sm transition-all duration-150 flex items-center justify-center gap-2"
            >
              <FiCheckCircle />
              <span className="text-sm">Confirm</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="">
          <button
            type="button"
            onClick={() => setCancelOrder(true)}
            className="bg-uiRed border border-uiRed text-uiWhite text-sm py-2 px-4 rounded-sm"
          >
            Cancel Order
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderActions;
