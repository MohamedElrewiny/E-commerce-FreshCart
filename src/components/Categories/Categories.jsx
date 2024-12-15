import React from "react";
import Style from "./Categories.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import { RotatingLines } from "react-loader-spinner";


export default function Categories() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { isLoading, isError, data } = useQuery("categoryslider", getCategories);

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
        <div className="container py-2">
          <h2 className="main-title">Categories</h2>
          <div className="row">
            {data?.data.data.map((category) => (
              <div
                key={category._id}
                className="col-lg-3 col-md-4 col-sm-6 my-2"
              >
                <div className="product cursor-pointer py-3 px-2">
                  <img
                    src={category.image}
                    className="w-100"
                    alt={category.name}
                    height={300}
                  />
                  <p className="text-main text-center my-2">{category.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
