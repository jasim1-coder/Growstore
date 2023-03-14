import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NODE_API } from "../api/apiIndex";
import Layout from "../components/common/Layout";
import { getSearchQuery } from "../redux/slice/productSlice";

const ProductListing = () => {
  const query = useSelector(getSearchQuery);
  const [data, setData] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await NODE_API.get(`/product/search?query=${query}`);
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [query]);

  return (
    <Layout>
      <div className="container sm:py-12 py-6">
        {data.length === 0 ? (
          <p>No product found</p>
        ) : (
          data.map((entry, key) => <p key={key}>{entry.title}</p>)
        )}
      </div>
    </Layout>
  );
};

export default ProductListing;
