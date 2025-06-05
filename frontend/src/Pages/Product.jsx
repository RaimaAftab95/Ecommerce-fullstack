import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrums from '../Components/Breadcrums/Breadcrums';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DiscriptionBox from '../Components/DiscriptionBox/DiscriptionBox';
import RelatedProduct from '../Components/RelatedProduct/RelatedProduct';

const Product = () => {
  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  // now to accsess product id we use useparam as we set route in app.js
  const product = all_product.find((e) => e.id === Number(productId) )
  // converting string productid in number
  return (
    <div>
      <Breadcrums product={product} />
      <ProductDisplay product={product} />
      <DiscriptionBox />
      <RelatedProduct />

    </div>
  )
}

export default Product
