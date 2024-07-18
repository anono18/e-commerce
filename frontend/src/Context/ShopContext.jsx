import React, { createContext, useEffect, useState } from 'react'
import Item from '../components/Item';

export const ShopContext = createContext(null);


const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300; index++) {
        cart[index] = 0;
    }
    return cart;
}



const ShopContextProvider = (props) => {

    // const [all_products, setall_products] = useState([]);
    const [allproducts, setall_products] = useState([]);
    const [CartItems, setCartItems] = useState(getDefaultCart());



    useEffect(() => {
        fetch('http://localhost:4000/allproducts').then((Response) => Response.json()).then((data) => setall_products(data));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/getcart', {
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=> response.json()).then((data)=>setCartItems(data));
        }
    },[])

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        // console.log(CartItems);
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtoCart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body : JSON.stringify({"itemId":itemId},)
            }).then((Response)=> Response.json())
            .then((data)=> console.log(data));
        }

    }


    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removeFromCart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body : JSON.stringify({"itemId":itemId},)
            }).then((Response)=> Response.json())
            .then((data)=> console.log(data));
        }
    }


    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in CartItems) {
            if (CartItems[item] > 0) {
                let itemInfo = allproducts.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * CartItems[item];
            }
        }
        return totalAmount;
    }
    
    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in CartItems) {
            if (CartItems[item] > 0) {
                totalItem += CartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = { allproducts, CartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems };
    {/**console.log(CartItems); */ }



    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;