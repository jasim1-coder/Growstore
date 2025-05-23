// import React, { useState } from "react";
// import { FiCheckCircle, FiDownload, FiXCircle } from "react-icons/fi";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   cancelOrder,
//   getCancelStatus,
// } from "../../../../redux/slice/myOrderSlice";
// import { ImSpinner2 } from "react-icons/im";
// import { PRIVATE_API } from "../../../../api/apiIndex";

// const OrderActions = ({ orderStatus = "", id = "" }) => {
//   const dispatch = useDispatch();
//   const cancelStatus = useSelector(getCancelStatus);

//   const [cancelOrderActive, setCancelOrderActive] = useState(false);
//   const [downloadStatus, setDownloadStatus] = useState("idle");
//   const [downloadError, setDownloadError] = useState(null);

//   const handleCancel = async () => {
//     try {
//       await dispatch(cancelOrder(id)).unwrap();
//       setCancelOrderActive(false);
//     } catch (err) {
//       console.error("Failed to cancel order:", err);
//     }
//   };

//   const handleInvoiceDownload = async () => {
//     setDownloadStatus("loading");
//     setDownloadError(null);
//     try {
//       const invoice = await PRIVATE_API.get(`/order/invoice/${id}`, {
//         responseType: "blob",
//       });
//       const url = URL.createObjectURL(invoice.data);
//       window.open(url);
//       setDownloadStatus("success");
//     } catch (err) {
//       console.error("Invoice download failed:", err);
//       setDownloadStatus("failed");
//       setDownloadError("Failed to download invoice.");
//     }
//   };

//   return (
//     <div className="flex flex-col gap-3">
//       <div className="py-2 border-b border-b-greyLight">
//         <h3 className="heading4">Actions</h3>
//       </div>

//       {cancelOrderActive ? (
//         <div className="flex flex-col sm:gap-4 gap-3">
//           <p className="text-uiBlack font-medium">
//             Are you sure you want to cancel the order?
//           </p>
//           <div className="flex flex-row gap-4">
//             <button
//               type="button"
//               onClick={() => setCancelOrderActive(false)}
//               className="text-uiBlack border-uiGrey border py-2 px-4 rounded-sm hover:bg-greyLight transition-all duration-150 flex items-center gap-2"
//             >
//               <FiXCircle />
//               <span className="text-sm">Cancel</span>
//             </button>
//             <button
//               type="button"
//               onClick={handleCancel}
//               disabled={cancelStatus === "loading"}
//               className="text-white bg-uiRed border border-uiRed py-2 px-4 rounded-sm transition-all duration-150 flex items-center gap-2 min-w-[100px]"
//             >
//               {cancelStatus === "loading" ? (
//                 <ImSpinner2 className="animate-spin" />
//               ) : (
//                 <>
//                   <FiCheckCircle />
//                   <span className="text-sm">Confirm</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="flex flex-row gap-4">
//           {orderStatus === "Delivered" && (
//             <button
//               type="button"
//               onClick={handleInvoiceDownload}
//               disabled={downloadStatus === "loading"}
//               className="primary-button font-normal py-2 px-4"
//             >
//               {downloadStatus === "loading" ? (
//                 <ImSpinner2 className="animate-spin" />
//               ) : (
//                 <p className="flex flex-row items-center gap-2">
//                   <span>Invoice</span>
//                   <FiDownload />
//                 </p>
//               )}
//             </button>
//           )}

//           <button
//             type="button"
//             onClick={() => setCancelOrderActive(true)}
//             className="bg-uiRed border border-uiRed text-white text-sm py-2 px-4 rounded-sm disabled:bg-uiRed/40 disabled:border-uiRed/20"
//             disabled={orderStatus !== "Placed"}
//           >
//             Cancel Order
//           </button>
//         </div>
//       )}

//       {downloadError && (
//         <p className="text-red-500 text-sm mt-2">{downloadError}</p>
//       )}
//     </div>
//   );
// };

// export default OrderActions;

// import React, { useState } from "react";
// import { jsPDF } from "jspdf";
// import { FiCheckCircle, FiDownload, FiXCircle } from "react-icons/fi";
// import { useDispatch, useSelector } from "react-redux";
// import { cancelOrder, getCancelStatus } from "../../../../redux/slice/myOrderSlice";
// import { ImSpinner2 } from "react-icons/im";

// const OrderActions = ({ orderStatus = "", id = "", orderData }) => {
//   const dispatch = useDispatch();
//   const cancelStatus = useSelector(getCancelStatus);
//   const [cancelOrderActive, setCancelOrderActive] = useState(false);
//   const [downloadStatus, setDownloadStatus] = useState("idle");
//   const [downloadError, setDownloadError] = useState(null);

//   const handleCancel = async () => {
//     try {
//       await dispatch(cancelOrder(id)).unwrap();
//       setCancelOrderActive(false);
//     } catch (err) {
//       console.error("Failed to cancel order:", err);
//     }
//   };

//   const generateInvoicePDF = () => {
//     if (!orderData) {
//       setDownloadError("No order data found.");
//       return;
//     }

//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.text("Invoice", 20, 20);

//     doc.setFontSize(12);
//     doc.text(`Order ID: ${orderData.id}`, 20, 40);
//     doc.text(`Order Date: ${new Date(orderData.orderDate).toLocaleDateString()}`, 20, 50);
//     doc.text(`Total Amount: $${orderData.totalAmount}`, 20, 60);

//     let y = 90;
//     orderData.products.forEach((p, i) => {
//       doc.text(`${i + 1}. ${p.title} (${p.quantity} x $${p.price}) = $${p.price * p.quantity}`, 20, y);
//       y += 10;
//     });

//     doc.save(`Invoice-${orderData.id}.pdf`);
//   };

//   const handleInvoiceDownload = () => {
//     try {
//       setDownloadStatus("loading");
//       setTimeout(() => {
//         generateInvoicePDF();
//         setDownloadStatus("success");
//       }, 500);
//     } catch (err) {
//       console.error("Invoice generation failed:", err);
//       setDownloadStatus("failed");
//       setDownloadError("Failed to generate invoice.");
//     }
//   };

//   return (
//     <div className="flex flex-col gap-3">
//       {/* Your cancel order UI here */}
//       {orderStatus === "Delivered" && (
//         <button
//           onClick={handleInvoiceDownload}
//           disabled={downloadStatus === "loading"}
//           className="primary-button font-normal py-2 px-4"
//         >
//           {downloadStatus === "loading" ? <ImSpinner2 className="animate-spin" /> : <><span>Invoice</span> <FiDownload /></>}
//         </button>
//       )}
//       {/* Cancel order button & confirmation UI... */}
//       {downloadError && <p className="text-red-500 text-sm mt-2">{downloadError}</p>}
//     </div>
//   );
// };

// export default OrderActions;


import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { FiCheckCircle, FiDownload, FiXCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder, getCancelStatus } from "../../../../redux/slice/myOrderSlice";
import { ImSpinner2 } from "react-icons/im";
import autoTable from "jspdf-autotable";

// Optional: import PRIVATE_API if you ever add backend
// import { PRIVATE_API } from "../../../../api/apiIndex";

const OrderActions = ({ orderStatus = "", id = "", orderData }) => {
  const dispatch = useDispatch();
  const cancelStatus = useSelector(getCancelStatus);
  const logo = "logos"
  const [cancelOrderActive, setCancelOrderActive] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState("idle");
  const [downloadError, setDownloadError] = useState(null);

  const handleCancel = async () => {
    try {
      await dispatch(cancelOrder(id)).unwrap();
      setCancelOrderActive(false);
    } catch (err) {
      console.error("Failed to cancel order:", err);
    }
  };

const generateInvoicePDF = () => {
  if (!orderData) {
    setDownloadError("No order data found.");
    return;
  }

  const doc = new jsPDF();

  // Add a logo (assuming you have a base64 image string or URL)
  // doc.addImage(logoData, 'PNG', 15, 10, 50, 15);

  // Header
  doc.setFontSize(22);
  doc.setTextColor("#003366");
  doc.text("My Shop Invoice", 20, 25);

  // Sub header with order info
  doc.setFontSize(12);
  doc.setTextColor("#000");
  doc.text(`Order ID: ${orderData.id}`, 20, 40);
  doc.text(`Date: ${new Date(orderData.orderDate).toLocaleDateString()}`, 20, 48);
  doc.text(`Total: $${orderData.totalAmount}`, 150, 40, null, null, "right");

  // Draw a line
  doc.setDrawColor("#003366");
  doc.setLineWidth(0.5);
  doc.line(20, 52, 190, 52);

  // Table Headers
  doc.setFontSize(14);
  doc.setTextColor("#003366");
  doc.text("Product", 20, 60);
  doc.text("Qty", 120, 60);
  doc.text("Price", 140, 60);
  doc.text("Subtotal", 170, 60);

  // Draw another line
  doc.line(20, 62, 190, 62);

  // List products
  let y = 70;
  doc.setFontSize(12);
  doc.setTextColor("#000");

  orderData.products.forEach((p) => {
    doc.text(p.title, 20, y);
    doc.text(String(p.quantity), 120, y, null, null, "right");
    doc.text(`$${p.price.toFixed(2)}`, 140, y, null, null, "right");
    doc.text(`$${(p.price * p.quantity).toFixed(2)}`, 170, y, null, null, "right");
    y += 10;
  });

  // Footer with thank you note
  doc.setTextColor("#777");
  doc.setFontSize(10);
  doc.text("Thank you for your purchase!", 20, y + 20);

  doc.save(`Invoice-${orderData.id}.pdf`);
};

  // Uncomment if you add backend invoice API:
  /*
  const handleInvoiceDownloadFromAPI = async () => {
    setDownloadStatus("loading");
    setDownloadError(null);
    try {
      const invoice = await PRIVATE_API.get(`/order/invoice/${id}`, {
        responseType: "blob",
      });
      const url = URL.createObjectURL(invoice.data);
      window.open(url);
      setDownloadStatus("success");
    } catch (err) {
      console.error("Invoice download failed:", err);
      setDownloadStatus("failed");
      setDownloadError("Failed to download invoice.");
    }
  };
  */

  const handleInvoiceDownload = () => {
    if (orderData) {
      // Client side PDF generation
      try {
        setDownloadStatus("loading");
        setTimeout(() => {
          generateInvoicePDF();
          setDownloadStatus("success");
        }, 500);
      } catch (err) {
        console.error("Invoice generation failed:", err);
        setDownloadStatus("failed");
        setDownloadError("Failed to generate invoice.");
      }
    } else {
      // fallback or if you have API
      // handleInvoiceDownloadFromAPI();
      setDownloadError("Invoice data not available.");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {cancelOrderActive ? (
        <div className="flex flex-col sm:gap-4 gap-3">
          <p className="text-uiBlack font-medium">Are you sure you want to cancel the order?</p>
          <div className="flex flex-row gap-4">
            <button
              type="button"
              onClick={() => setCancelOrderActive(false)}
              className="text-uiBlack border-uiGrey border py-2 px-4 rounded-sm hover:bg-greyLight flex items-center gap-2"
            >
              <FiXCircle />
              <span className="text-sm">Cancel</span>
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={cancelStatus === "loading"}
              className="text-white bg-uiRed border border-uiRed py-2 px-4 rounded-sm flex items-center gap-2 min-w-[100px]"
            >
              {cancelStatus === "loading" ? (
                <ImSpinner2 className="animate-spin" />
              ) : (
                <>
                  <FiCheckCircle />
                  <span className="text-sm">Confirm</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-row gap-4">
          {orderStatus === "Delivered" && (
            <button
              type="button"
              onClick={handleInvoiceDownload}
              disabled={downloadStatus === "loading"}
              className="primary-button font-normal py-2 px-4"
            >
              {downloadStatus === "loading" ? (
                <ImSpinner2 className="animate-spin" />
              ) : (
                <p className="flex flex-row items-center gap-2">
                  <span>Invoice</span>
                  <FiDownload />
                </p>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={() => setCancelOrderActive(true)}
            className="bg-uiRed border border-uiRed text-white text-sm py-2 px-4 rounded-sm disabled:bg-uiRed/40 disabled:border-uiRed/20"
            disabled={orderStatus !== "Placed"}
          >
            Cancel Order
          </button>
        </div>
      )}

      {downloadError && <p className="text-red-500 text-sm mt-2">{downloadError}</p>}
    </div>
  );
};

export default OrderActions;
