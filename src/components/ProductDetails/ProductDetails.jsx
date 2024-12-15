import React, { useContext } from "react";
import Style from "./ProductDetails.module.css";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { cartContext } from "../../context/Cart/CartContext";
import toast from "react-hot-toast";
import Slider from "react-slick";
import { RotatingLines } from "react-loader-spinner";



export default function ProductDetails() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  let params = useParams();

  let { addToCart } = useContext(cartContext);

  async function addProduct(productId) {
    let response = await addToCart(productId);
    if (response.data.status === "success") {
      toast.success("product successfully Added", {
        duration: 4000,
        position: "top-center",
      });
    } else {
      toast.error("Error adding product");
    }
  }

  function getPrductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let { isLoading, isError, data } = useQuery("productdetails", () =>
    getPrductDetails(params.id)
  );

  return (
    <>
      {isLoading ? (
        <div className="position-fixed top-50 start-50 translate-middle">
          <RotatingLines
            strokeColor="green"
            strokeWidth="5"
            animationDuration="1"
            width="85"
            visible={true}
          />
        </div>
      ) : (
        <>
          {data?.data.data ? (
            <>
              <div className="row py-2 align-items-center">
                <Helmet>
                  <meta
                    name="description"
                    content={data?.data.data.description}
                  />
                  <title>{data?.data.data.title}</title>
                </Helmet>
                <div className="col-md-4 my-3">
                  <Slider {...settings}>
                    {data?.data.data.images.map((image) => {
                      return (
                        <>
                          <img
                            src={image}
                            className="w-100"
                            alt={data?.data.data.title}
                          />
                        </>
                      );
                    })}
                  </Slider>
                </div>
                <div className="col-md-8">
                  <h2 className="h5">{data?.data.data.title}</h2>
                  <p>{data?.data.data.description}</p>
                  <h6 className="text-main">
                    {data?.data.data.category?.name}
                  </h6>
                  <h6 className="text-main">
                    Price : {data?.data.data.price} EGP
                  </h6>
                  <div className="d-flex justify-content-between">
                    <span>
                      ratingsQuentity : {data?.data.data.ratingsQuentity}
                    </span>
                    <span>
                      {" "}
                      <i className="fas fa-star rating-color"></i>{" "}
                      {data?.data.data.ratingsAverage}{" "}
                    </span>
                  </div>
                  <button
                    onClick={() => addProduct(data?.data.data._id)}
                    className="btn bg-main text-white w-100 mt-2"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
}
