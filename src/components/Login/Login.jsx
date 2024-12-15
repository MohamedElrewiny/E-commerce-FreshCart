import React, { useContext, useState } from "react";
import Style from "./Login.module.css";
import { useFormik } from "formik";
import * as YUP from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { UserContext } from "../../context/User/context";


export default function Login() {
  let { setUserToken,setUserData } = useContext(UserContext);

  let regExPassword = /^[A-Z][a-z0-9_@#$]{6,}$/;

  let validationSchema = YUP.object({
    email: YUP.string().required("Email is required"),
    password: YUP.string()
      .matches(regExPassword, "Passwoed start with Uppercase")
      .required("Password is required"),
  });

  let navigate = useNavigate();
  const [error, seterror] = useState(null);
  const [isLodding, setisLodding] = useState(false);

  async function loginSubmit(values) {
    setisLodding(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((err) => {
        setisLodding(false);
        seterror(err.response.data.message);
      });

    if (data.message === "success") {
      setisLodding(false);
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      setUserData(data.user);
      navigate("/");
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: loginSubmit,
  });

  return (
    <>
      <div className="w-75 mx-auto py-5">
        {error ? <div className="alert alert-danger">{error}</div> : ""}
        <h2>Login Now</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email :</label>
          <input
            id="email"
            type="email"
            value={formik.values.email}
            name="email"
            className="form-control mb-3"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="password">Password :</label>
          <input
            id="password"
            type="password"
            value={formik.values.password}
            name="password"
            className="form-control mb-3"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}

          {isLodding ? (
            <button type="button" className="btn bg-main text-white mt-2">
              <RotatingLines
                strokeColor="white"
                strokeWidth="4"
                animationDuration="1"
                width="25"
                visible={true}
              />
            </button>
          ) : (
            <>
              <div className="d-flex align-items-center">
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className="btn mx-2 bg-main text-white mt-2"
                >
                  Login
                </button>
                <Link className="btn mt-2 fs-6" to={"/register"}>
                  Register Now
                </Link>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
}
