import React, { createContext, useState, useEffect } from 'react';
// import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};

    // all_product.length replace with 300

    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [all_product,setAllproduct] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    // fetching database all product data and save it in allproduct

    useEffect(()=>{
        fetch('http://localhost:4001/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAllproduct(data))

        // using cartdata end point
        if(localStorage.getItem('auth-token')) {
            fetch('http://localhost:4001/getcart',{
                 method:'POST',
                 headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                 },
                 body:"",
            }).then((response)=>response.json())
            .then((data)=>setCartItems(data));
        }

    },[])
// loaded once when the component is mounted
// we are now fetching data from database insted of importing them

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        // console.log(cartItems);

        if(localStorage.getItem('auth-token')){
            // if we are logging we update this item id in mongo db database like if i create login id i have cartdata 1-300 ids in mongo db as i add items they will add in db

            fetch('http://localhost:4001/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId})
                // this itemId id comig from above parameter itemId
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        // adding index.js endpoint for remove cart item
        if(localStorage.getItem('auth-token')) {
            fetch('http://localhost:4001/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId})
                // this itemId id comig from above parameter itemId
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
        }           
    }

    // funtion to getcart total amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                // passing individual product in find from all product array
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }

        }

        return totalAmount;

    }

    // function to display total cart items in nav bar
    const getTotalCartItems =  ()  =>{
        let totalItem = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem+= cartItems[item];
            }
        }
        return totalItem;
    }


    useEffect(() => {
        console.log("cartItems:", cartItems);
    }, [cartItems]); // Log cartItems whenever it changes

    const contextValue = {getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart };
    // these all props in above line of code are case sensetive when call in Cartitems.jsx be carefull

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
