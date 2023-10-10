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
import { ButtonCommun } from "../component/Common/CommonComponents/CommonComponent";
import { ErrorAlert } from "../component/Common/FormikComponents/ErrorAlert";
import { FormikInput } from "../component/Common/FormikComponents/FormikInput";
import { FormikError } from "../component/Common/FormikComponents/FormikError";
import { FormikSubmitButton } from "../component/Common/FormikComponents/FormikSubmitButton";

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
                  <ErrorAlert error={this.props.auth?.error} />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormikInput type="text" name="name" />
                  <FormikError name="name" />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormikInput type="text" name="email" />
                  <FormikError name="email" />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormikInput type="password" name="password" />
                  <FormikError name="password" />
                </FormGroup>

                <ButtonCommun type="submit" variant="primary" className="m-3">
                  <FormikSubmitButton loading={this.props.auth.loading} />
                </ButtonCommun>
                <ButtonCommun onClick={() => this.handleErrorMoveToLogin()}>
                  Login
                </ButtonCommun>
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
