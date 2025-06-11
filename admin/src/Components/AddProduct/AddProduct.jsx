import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";

const API_URL = import.meta.env.VITE_API_URL;

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  // display the selected image instead of upload icon
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };
  // Add btn function
  //   const Add_Product = async () => {
  //     console.log(productDetails);
  //     let responseData;
  //     let product = productDetails;

  //     // it will create an empty formdata
  //     let formData = new FormData();
  //     // append the selcted img in product
  //     formData.append("product", image);

  //     // send thid formdata to api
  //     await fetch(`${API_URL}/upload`, {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //       },
  //       body: formData,
  //       // }).then((resp) => resp.json()).then((data)=>{responseData=data});
  //     })
  //       .then((resp) => resp.json())
  //       .then((data) => {
  //         responseData = data;
  //       });

  //     if (responseData.success) {
  //       product.image = responseData.image_url;
  //       console.log(product);
  //       await fetch(`${API_URL}/addproduct`, {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(product),
  //       })
  //         .then((resp) => resp.json())
  //         .then((data) => {
  //           data.success ? alert("Product Added") : alert("Failed");
  //         });
  //     }
  //   };

  const Add_Product = async () => {
    if (!image) {
      alert("Please select an image before submitting.");
      return;
    }

    setLoading(true); // ✅ start loading

    let formData = new FormData();
    formData.append("file", image); // ⬅️ IMPORTANT: name must match backend field (e.g., "file")

    try {
      const uploadRes = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadData.success) {
        alert("Image upload failed");
        setLoading(false);
        return;
      }

      // Set image URL from Cloudinary response
      const product = {
        ...productDetails,
        image: uploadData.image_url,
      };

      const addProductRes = await fetch(`${API_URL}/addproduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const addProductData = await addProductRes.json();

      if (addProductData.success) {
        setLoading(false);
        alert("✅ Product Added Successfully");
        setProductDetails({
          name: "",
          image: "",
          category: "women",
          new_price: "",
          old_price: "",
        });
        setImage(false);
      } else {
        alert("❌ Product creation failed");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred. Please check the console.");
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type here"
          />
        </div>

        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type here"
          />
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproduct-thumnail-img"
            alt="thumbnail"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button
        onClick={() => {
          Add_Product();
        }}
        className="addproduct-btn"
        disabled={loading}
      >
        {loading ? "Uploading..." : "ADD"}
      </button>
    </div>
  );
};

export default AddProduct;
