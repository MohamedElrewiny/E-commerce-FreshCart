import React, { useContext } from "react";
import Style from "./Address.module.css";
import { useFormik } from "formik";
import { cartContext } from "../../context/Cart/CartContext";




export default function Address() { 
  let {cartID,checkPayment}=useContext(cartContext)

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit:function(val){
      payShipping(val)
    }
  })

  async function payShipping(val){
    
    let{data}= await checkPayment(cartID,val)
    console.log(data);
    if(data.status==='success'){
      window.location.href=data.session.url
    }
  }

  return (
    <>
      <div className="container py-3">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="details">Details : </label>
          <input
            value={formik.values.details}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            name="details"
            id="details"
            className="form-control mb-2"
          />

          <label htmlFor="phone">Phone : </label>
          <input
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="tel"
            name="phone"
            id="phone"
            className="form-control mb-2"
          />

          <label htmlFor="city">City : </label>
          <input
            value={formik.values.city}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            name="city"
            id="city"
            className="form-control mb-2"
          />

          <button type="submit" className="btn bg-main text-white my-3">Pay Now</button>
        </form>
      </div>
    </>
  );
}
