import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { Button} from "react-bootstrap";
import Select from "react-select";
import { useParams, useHistory, Link } from 'react-router-dom';
import { Container, Row } from "reactstrap";
import { Form, Field, Formik, ErrorMessage } from "formik";
//import { AsyncPaginate } from "react-select-async-paginate";
//import { button } from 'react-bootstrap'
import * as Yup from "yup";
import FormError from "./static/FormError";
import { register as add } from '../slices/user';
import { selectIsloggedIn } from "../slices/auth";
import { nuLifeSuccessToastr, nuLifeErrorToastr } from './../utility/nulifeToastr'
import UserForm from "./form/UserForm";
import { userDetail, editUser } from './../services/user.service';



const initialsValue = {
  first_name: "",
  last_name: "",
  user_name: "",
  email: "",
  password: "",
  address: "",
  comments: "",
  country: "",
  state: ''
};


const validationSchema = Yup.object({
  first_name: Yup.string().max(15, "Must be 15 characters or less").required(),
  last_name: Yup.string().max(20, "Must be 20 characters or less").required(),
  email: Yup.string().email("Invalid email address").required(),
});




const User = () => {
  console.log("params ", useParams());
  const isLoggedIn = useSelector(selectIsloggedIn);
  console.log("isLoggedIn", isLoggedIn);

  const [formValue, setFormValue] = useState(null);
  const [username, setUsername] = useState("");
  const [state, setState] = useState(null);
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useParams()?.id;

  const onSubmit = (formData, onSubmitProps) => {
    console.log(onSubmitProps);
    if (userId) {
      delete formData._id;
      editUser(userId, formData).then(result => {
        setSuccessful(true);
        history.push('/user-list')
      })
    } else {
      dispatch(add(formData))
        .unwrap()
        .then((response) => {

          setSuccessful(true);
          onSubmitProps.resetForm()

        })
        .catch(() => {
          setSuccessful(false);
        });
    }

    onSubmitProps.setSubmitting(false);
  };


  useEffect(() => {
    if (userId) {
      console.log("User Id", userId);
      userDetail(userId).then(result => {
        console.log(result);
        setFormValue(result)
      }).catch(error => {

      })
    }

  }, []);

  return (
    <Container>
      <Row>


        <Formik
          initialValues={formValue || initialsValue}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnMount={true}
          enableReinitialize={true}
        //   validateOnChange={false}
        //   validateOnBlur={false}
        >
          {(formik) => {
            //  console.log("formik props", formik);
            //  if(formik.values.first_name || formik.values.last_name){
            //    setUsername(formik.values.first_name+" "+formik.values.last_name)
            //    console.log({...formValue, user_name:username});
            //    setFormValue(formik.values)
            //  }

            return (
              <UserForm formik={formik} isEdit={userId ? true : false} />
            );
          }}
        </Formik>
      </Row>
      {message && (
        <div className="form-group">
          <div
            className={successful ? "alert alert-success" : "alert alert-danger"}
            role="alert"
          >
            {message}
          </div>
        </div>
      )}
      {!isLoggedIn ?
        <Link to="/login">Login</Link>
        : <Link to="/user-list">User List</Link>}
    </Container>
  );
};

export default User;
