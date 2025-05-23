import React, { useState } from "react";
import { FiPrinter } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { jsPDF } from "jspdf";

// Sample function to generate PDF from frontend data
const generateInvoicePDF = (order) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Invoice", 20, 20);

  doc.setFontSize(12);
  doc.text(`Order ID: ${order.orderId}`, 20, 40);
  doc.text(`Order Date: ${new Date(order.orderDate).toLocaleDateString()}`, 20, 50);
  doc.text(`Total Amount: $${order.totalAmount}`, 20, 60);
  doc.text(`Payment Method: ${order.paymentMethod}`, 20, 70);

  let y = 90;
  order.products.forEach((p, index) => {
    doc.text(`${index + 1}. ${p.title} (${p.quantity} × $${p.price}) = $${p.subTotal}`, 20, y);
    y += 10;
  });

  doc.save(`Invoice-${order.orderId}.pdf`);
};

const DownloadInvoiceButton = ({ order }) => {
  const [status, setStatus] = useState("idle");

  const handleInvoiceDownload = async () => {
    try {
      setStatus("loading");
      // Simulate delay
      setTimeout(() => {
        generateInvoicePDF(order);
        setStatus("success");
      }, 500);
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
