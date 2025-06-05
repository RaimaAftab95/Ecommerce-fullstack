import React from 'react';
import './Breadcrums.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';

const Breadcrums = (props) => {

const {product} = props;
if (!product || !product.category) {
  return null; // or handle the case when product or category is undefined
}
console.log("breadcrums",product)
  return (
    <div className='breadcrum'>
      HOME <img src={arrow_icon} alt="" />  SHOP <img src={arrow_icon} alt=""  /> {product.category} <img src={arrow_icon} alt=""  />  {product.name}
    </div>
  )
}

export default Breadcrums
