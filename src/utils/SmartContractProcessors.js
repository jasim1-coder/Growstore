import { ethers, Contract } from "ethers";
import { NODE_API } from "../api/apiIndex";

const getContractProcessor = async () => {
  const { data: paymentContract } = await NODE_API.get(
    "/contracts/PaymentProcessor.json"
  );
  const { data: daiContract } = await NODE_API.get("/contracts/Dai.json");

  if (window.ethereum) {
    await window.ethereum.enable();
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const paymentProcessor = new Contract(
      paymentContract.networks[window.ethereum.networkVersion].address,
      paymentContract.abi,
      signer
    );

    const daiProcessor = new Contract(
      daiContract.networks[window.ethereum.networkVersion].address,
      daiContract.abi,
      signer
    );
    return { paymentProcessor, daiProcessor };
  } else {
    throw new Error("MetaMask Extension not found in your browser");
  }
};

export default getContractProcessor;
