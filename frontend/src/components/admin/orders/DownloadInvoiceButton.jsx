import React, { useState } from "react";
import { PRIVATE_API } from "../../../api/apiIndex";
import { FiPrinter } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";

const DownloadInvoiceButton = ({ id }) => {
  const [status, setStatus] = useState("idle");
  const handleInvoiceDownload = async () => {
    try {
      setStatus("loading");
      const invoice = await PRIVATE_API.get(`/order/invoice/${id}`, {
        responseType: "blob",
      });
      window.open(URL.createObjectURL(invoice.data));
      setStatus("success");
    } catch (err) {
      console.log(err);
      setStatus("failed");
    }
  };
  return (
    <button
      className="primary-button px-4 py-1"
      onClick={handleInvoiceDownload}
      disabled={status === "loading"}
    >
      {status === "loading" ? (
        <ImSpinner2 className="animate-spin" />
      ) : (
        <FiPrinter className="text-[22px]" />
      )}
    </button>
  );
};

export default DownloadInvoiceButton;
