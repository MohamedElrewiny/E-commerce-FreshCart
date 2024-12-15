import axios from "axios";
import React, { createContext, useEffect, useState } from "react";


export let cartContext = createContext();

export default function CartContextProvider(props) {
  const [cartID, setcartID] = useState(null)
  async function getcart(){
    let {data}=await getLoggedUSerCart()
    setcartID(data?.data._id)
  }
  useEffect(()=>{
    getcart()
  },[])


  let headers = { token: localStorage.getItem("userToken") };
  function addToCart(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function getLoggedUSerCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then((response) => response)
      .catch((error) => error);
  }

  function removeCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  function updataProductQuentity(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function checkPayment(id,shippingData){
    let body={
      shippingAddress:shippingData
    }
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,body,{
      headers
    })
  }

  return (
    <cartContext.Provider
      value={{
        addToCart,
        getLoggedUSerCart,
        removeCartItem,
        updataProductQuentity,
        checkPayment,
        cartID,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
