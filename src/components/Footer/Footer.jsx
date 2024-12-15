import React from "react";
import Style from "./Footer.module.css";
export default function Footer() {
  return (
    <footer className="bg-main-light pt-5">
      <div className="container">
        <h4>Get The Fresh Cart App</h4>
        <p>
          We will send you a link , ioen it on your phone to download the app.
        </p>
        <div className={`d-flex gap-2 ${Style.mediainput}`}>
          <div className={`w-75`}>
            <input
              type="email"
              className={`form-control py-2  `}
              placeholder="Email..."
            />
          </div>
          <div className={`w-25`}>
            <button className={`btn bg-main form-control fw-bold text-white`}>
              Share App Link
            </button>
          </div>
        </div>
        <div className="line border-bottom border-2 my-4"></div>
      </div>
      <div className=" text-black text-center pt-4">
        &copy; Copyright 2023 reserved to{" "}
        <span className="text-main fw-bold">Mohamed Morad</span>
      </div>;
    </footer>
  );
}


