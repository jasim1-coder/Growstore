import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NODE_API, PYTHON_API } from "../api/apiIndex";
import Layout from "../components/common/Layout";
import ProductCard from "../components/product/ProductCard";
import { getSearchQuery } from "../redux/slice/productSlice";

const ProductListing = () => {
  const query = useSelector(getSearchQuery);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("idle");

  const fetchProducts = async () => {
    try {
      setStatus("loading");
      const { data } = await PYTHON_API.get(`/product/search?query=${query}`);
      console.log(data);
      setData(data.data);
      setStatus("idle");
    } catch (error) {
      setStatus("idle");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [query]);

  return (
    <Layout>
      <div className="container sm:py-12 py-6">
        <div className="grid-list-4 w-full">
          {status === "loading" ? (
            <p>Loading...</p>
          ) : data.length === 0 ? (
            <p>No product found</p>
          ) : (
            data.map((entry, key) => <ProductCard key={key} data={entry} />)
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductListing;
