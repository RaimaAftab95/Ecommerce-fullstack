import React, { useEffect, useState } from "react";
import "./ListProduct.css";
// import cross_icon from '../..assets/cross_icon.png';
import cross_icon from "../../assets/cross_icon.png";

const API_URL = import.meta.env.VITE_API_URL;

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const fetchInfo = async () => {
    await fetch(`${API_URL}/allproducts`)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });
  };
  // run this fuction whenever this component is mounted
  useEffect(() => {
    fetchInfo();
  }, []);
  //  this function will call only once

  // function to remove product
  const remove_product = async (id) => {
    await fetch(`${API_URL}/removeproduct`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    // to update list after removing product
    await fetchInfo();
  };

  return (
    <div className="list-product">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproduct">
        {/* mapping product data which we fetch using api */}
        <hr />
        {allproducts.map((product, index) => {
          return (
            <>
              <div
                key={index}
                className="listproduct-format-main  listproduct-format"
              >
                <img
                  src={product.image}
                  alt="product"
                  className="listproduct-product-icon"
                />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img
                  onClick={() => {
                    // remove_product(product.id);
                    remove_product(product._id);
                  }}
                  className="listproduct-remove-icon"
                  src={cross_icon}
                  alt="Remove"
                />
              </div>
              <hr />
              {/* to insert line after each product we also insert empty tags */}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
