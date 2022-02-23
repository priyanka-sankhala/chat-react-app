import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputText from "./form/InputText";
import Button from "./form/Button";
import { login as userLogin, refresh } from "../slices/auth";
//import {refresh} from './slices/auth';
import Header from "./../component/static/Header";
import Footer from "./../component/static/Footer";

//import {setUser} from '../slices/auth';

import FormError from "./static/FormError";

const initialsValue = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  password: Yup.string().required(),
  email: Yup.string().email("Invalid email address").required(),
});

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  // const isLoggedIn  = useSelector((state) => {
	// 	return   (state.hasOwnProperty('auth')) ?  state.auth.isLoggedIn : localStorage.getItem('isLoggedIn')
	//   })
  const { message } = useSelector((state) => state.message);
  const onSubmit = (formData, onSubmitProps) => {
    // console.log("onSubmit", formData);
    //console.log("onsubmitPrp", onSubmitProps);
    dispatch(userLogin(formData))
      .unwrap()
      .then((result) => {
       // console.log("Login js", result);
        if (result.status === 1) {
          history.push("/user-list");
        }
        //setUser(result)
      })
      .catch((err) => {
        console.log(err);
      });
  };
 
  return (
    <div className="container">
      <div className="row">
        <div className="card bg-info  pt-2 d-flex align-items-center">
          <div>{message}</div>
          <Formik
            initialValues={initialsValue}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnMount={true}
            //  enableReinitialize={true}
            //   validateOnChange={false}
            //   validateOnBlur={false}
          >
            {(formik) => {
              return (
                <div className="col">
                  <Form>
                    <InputText
                      label="Email"
                      name="email"
                      id="email"
                      className="form-control"
                    />
                    <InputText
                      label="Password"
                      name="password"
                      id="password"
                      type="password"
                      className="form-control"
                    />

                    <Button
                      type="submit"
                      name="Login"
                      value="Submit"
                      className="mt-2 mb-2"
                    />
                  </Form>
                </div>
              );
            }}
          </Formik>
          <Link to="/register">Register</Link>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Login;
