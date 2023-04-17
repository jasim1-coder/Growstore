import React, { useState } from "react";
import { metamask } from "../../../../assets";
import getContractProcessor from "../../../../utils/SmartContractProcessors";

const CryptoPayment = ({
  setPaymentProcessor,
  setDai,
  paymentValidated,
  setPaymentValidated,
  inrValue,
}) => {
  const [error, setError] = useState("");

  const handleConnectToMetamask = async () => {
    try {
      setError("");
      const { paymentProcessor, daiProcessor } = await getContractProcessor();
      setPaymentProcessor(paymentProcessor);
      setDai(daiProcessor);
      setPaymentValidated(true);
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }
  };

  return (
    <div className="w-full p-6 flex flex-col gap-3">
      {error && (
        <div>
          <p className="text-red-500 font-medium">ERROR: {error}</p>
          <p className="text-sm text-textDim">
            Please install and setup MetaMask wallet to continue.
          </p>
        </div>
      )}
      <button
        className="w-full border border-uiGrey text-uiBlack flex flex-row gap-3 items-center py-2 justify-center font-medium bg-white hover:text-uiOrange transition-all duration-150 hover:border-uiOrange rounded-sm disabled:text-baseGreen disabled:bg-greyLight disabled:border-greyLight input-shadow"
        disabled={paymentValidated}
        onClick={handleConnectToMetamask}
      >
        <span className="">
          {paymentValidated ? "Connected to MetaMask" : "Connect to MetaMask"}
        </span>
        <img src={metamask} alt="" className="h-[32px]" />
      </button>
      <p className="text-textDim text-sm">
        Please connect our app with MetaMask to proceed.
      </p>
      <p className="text-textDim text-sm italic">
        Note : 1 DAI = INR {inrValue}
      </p>
    </div>
  );
};

export default CryptoPayment;
