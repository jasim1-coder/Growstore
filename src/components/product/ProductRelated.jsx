import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PYTHON_API } from "../../api/apiIndex";
import ProductCard from "./ProductCard";

const ProductRelated = () => {
  const id = useParams().id;
  const [productData, setProductData] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const fetchRelatedToId = async () => {
    try {
      if (id) {
        setStatus("loading");
        const { data } = await PYTHON_API.get(`/product/related?id=${id}`);
        setProductData(data.data);
        setStatus("success");
      }
    } catch (error) {
      console.log(error);
      setError(error.response ? error.response.data : error.message);
      setStatus("failed");
    }
  };

  useEffect(() => {
    fetchRelatedToId();
  }, [id]);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="heading3">Related Products</h3>
      {status === "loading" ? <p>Loading...</p> : null}
      {status === "failed" ? <p>{error}</p> : null}
      {status === "success" ? (
        <div className="grid-list-4 w-full">
          {productData.map((entry) => (
            <ProductCard key={entry._id} data={entry} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ProductRelated;
