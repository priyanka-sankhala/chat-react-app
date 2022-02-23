import React, { useState, useEffect } from "react";
import { Form, Field, Formik, ErrorMessage } from "formik";
import { AsyncPaginate } from "react-select-async-paginate";
import { Button, Row, Container } from "react-bootstrap";
import Select from "react-select";
import FormError from "../static/FormError";

const defaultOptions = { page: 1 };


const validateComment = (value) => {
  let error;
  ///console.log("comment value", value);

  if (!value) {
    error = "Required";
  }
  return error;
};

function UserForm(props) {
  const [formValue, setFormValue] = useState(null);
  const [username, setUsername] = useState("");
  const [state, setState] = useState(null);
  const { formik, isEdit } = props;

  useEffect(() => {
    
    if (formik.values.first_name || formik.values.last_name) {
      //setUsername(formik.values.first_name+" "+formik.values.last_name)
      //console.log({...formValue, user_name:username});
      // setFormValue(formik.values)
      formik.setFieldValue(
        "user_name",
        formik.values.first_name + " " + formik.values.last_name
      );
    }
  }, [formik.values.first_name, formik.values.last_name]);

  return (
    
    <Form className="form">
      <div className="form-row">
        <div className="form-group col-md-6">
          <label for="first_name">First Name</label>
          <Field
            type="text"
            name="first_name"
            className="form-control form-control-sm"
            //   onChange={(e) => {
            //     formik.setFieldValue("first_name", e.target.value);
            //     formik.setFieldValue(
            //       "user_name",
            //       e.target.value + " " + formik.values.last_name
            //     );
            //   }}
          ></Field>
          <ErrorMessage name="first_name" component={FormError} />
        </div>
        <div className="form-group col-md-6">
          <label for="last_name">Last Name</label>
          <Field
            type="text"
            name="last_name"
            className="form-control"
            //   onChange={(e) => {
            //     formik.setFieldValue("last_name", e.target.value);
            //     formik.setFieldValue(
            //       "user_name",
            //       formik.values.first_name +" "+ e.target.value
            //     );
            //   }}
          ></Field>
          <ErrorMessage name="last_name" component={FormError} />
        </div>
      </div>

      <div className="form-group col-6">
        <label for="user_name">User Name</label>
        <Field
          type="text"
          name="user_name"
          className="form-control"
          id="user_name"
        ></Field>
        <ErrorMessage name="user_name" component={FormError} />
      </div>
      {/* <div className="form-group  col-md-6">
                  <label htmlFor="country">Country</label>
                  <AsyncPaginate
                    //name="country"
                    additional={defaultOptions}
                    // value={value}
                    loadOptions={loadOptionsValue}
                    //onChange={onChange}
                    onChange={(val) => {
                      formik.setFieldValue("country", val.name);
                       setState(val.states)
                     }}
                    getOptionLabel={(options) => {
                      return options.name;
                    }}
                    getOptionValue={(options) => {
                      return options._id;
                    }}
                  />
                </div>
                <div className="form-group  col-md-6">
                  <label htmlFor="country">State</label>
                  <Select
                    //value={state}
                    onChange={(value)=>{
                      formik.setFieldValue('state',value.name)
                    }}
                    options={state}
                    getOptionValue={(value)=>{
                      return value.name
                    }}
                    getOptionLabel={(value)=>{
                      return value.name
                    }}
                  />
                </div> */}
      <div className="form-group col-6">
        <label for="email">Email</label>
        <Field type="text" name="email" className="form-control"></Field>
        <ErrorMessage name="email" component={FormError} />
      </div>
      {!isEdit ? (
        <div className="form-group col-6">
          <label for="password">Password</label>
          <Field
            type="password"
            name="password"
            className="form-control"
          ></Field>
          <ErrorMessage name="password" component={FormError} />
        </div>
      ) : null}
      {/* <div className="form-group col-6">
                  <label for="comments">Comments</label>
                  <Field
                    as="textarea"
                    id="comments"
                    className="form-control"
                    name="comments"
                    validate={validateComment}
                  ></Field>
                  <ErrorMessage name="comments" component={FormError} />
                </div> */}
      {/* <div className="form-group col-6">
                  <label for="address">Address</label>
                  <Field
                    type="text"
                    name="address"
                    className="form-control"
                    id="address"
                  >
                    {(props) => {
                      // console.log("address props", props);
                      const { meta, fields } = props;
                      return (
                        <div>
                          <input
                            className="form-control"
                            id="address"
                            name="address"
                            {...fields}
                          />
                          {meta.touched && meta.error ? (
                            <div>{meta.error}</div>
                          ) : null}
                        </div>
                      );
                    }}
                  </Field>
                  <ErrorMessage name="address" component={FormError} />
                </div> */}
      <div>
        <label for="submit"></label>
        {isEdit ? 
        <Button
          className="mt-2"
          type="submit"
          disabled={!formik.isValid || formik.isSubmitting ? "true" : false}
        >
          Edit 
        </Button>
:  <Button
className="mt-2"
type="submit"
disabled={!formik.isValid || formik.isSubmitting ? "true" : false}
>
Submit
</Button> }
      </div>
      <div>
        {/* <Button
                    type="button"
                    onClick={() => setFormValue(savedValue)}
                  >
                    Set saved data
                  </Button> */}
      </div>
    </Form>
  );
}

export default UserForm;
