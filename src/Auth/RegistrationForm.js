import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Container,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";
import { getRegisterDetail, nullError } from "../redux/ducks/userReducer";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Link, withRouter } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

class RegistrationForm extends Component {
  handleSubmit = (values) => {
    this.props.getRegisterDetail(values);
  };
  componentDidUpdate() {
    if (this.props.auth.message === "success") {
      this.props.history.push("/login");
    } else {
      this.props.history.push("/register");
    }
  }
  handleErrorMoveToLogin = () => {
    this.props.history.push("/login");
    this.props.nullError();
  };
  render() {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Formik
              enableReinitialize
              initialValues={{ name: "", email: "", password: "" }}
              validationSchema={Yup.object({
                name: Yup.string().required("Name is required"),
                email: Yup.string()
                  .email("Invalid email address")
                  .matches(
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    "Invalid email address"
                  )
                  .required("Email is required"),
                password: Yup.string()
                  .required("Please Enter your password")
                  .matches(
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number, and one special Character"
                  ),
              })}
              onSubmit={(values) => {
                this.handleSubmit(values);
              }}
            >
              <Form className="border border-3 p-3 rounded border-primary">
                <FormGroup>
                  <h1>Signup</h1>
                </FormGroup>
                <FormGroup>
                  {this.props.auth?.error && (
                    <Alert key={"danger"} variant={"danger"}>
                      {this.props.auth?.error}
                    </Alert>
                  )}
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Field type="text" name="name" as={FormControl} />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger error"
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Field type="text" name="email" as={FormControl} />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger error"
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field type="text" name="password" as={FormControl} />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger error"
                  />
                </FormGroup>

                <Button type="submit" variant="primary" className="m-3">
                  {this.props.auth.loading === true ? (
                    <>
                      {" "}
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      Loading...
                    </>
                  ) : (
                    <>Submit</>
                  )}
                </Button>
                <Button onClick={() => this.handleErrorMoveToLogin()}>
                  Login
                </Button>
              </Form>
            </Formik>
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getRegisterDetail: (value) => dispatch(getRegisterDetail(value)),
    nullError: () => dispatch(nullError()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RegistrationForm));
