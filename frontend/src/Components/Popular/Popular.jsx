import React, {useEffect,useState} from 'react';
import './Popular.css';
// import data_product from '../Assets/data';
import Item from '../Item/Item';

const Popular = () => {

    // remove import data from assets and fetch data from api for popular products
const [popularProducts,setPopularProducts] = useState([]);

// now popular products will come from this link
useEffect(()=>{
    fetch('http://localhost:4001/popularinwomen')
    .then((response)=>response.json())
    .then((data)=>setPopularProducts(data));
},[])



    return (
        <div className='popular'>
            <h1>POPULAR IN WOMEN</h1>
            <hr />
            <div className="popular-item">
                {/* instead of data_product we map popularProducts */}
                {popularProducts.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div>
    )
}

export default Popular
