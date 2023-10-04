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
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getLogin, nullError } from "../redux/ducks/userReducer";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { toast } from "react-toastify";
import { ButtonCommun } from "../component/Common/CommonComponents/CommonComponent";
import { FormikInput } from "../component/Common/FormikComponents/FormikInput";
import { FormikError } from "../component/Common/FormikComponents/FormikError";
import { FormikSubmitButton } from "../component/Common/FormikComponents/FormikSubmitButton";
import { ErrorAlert } from "../component/Common/FormikComponents/ErrorAlert";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleSubmit = (values) => {
    this.props.getLogin(values);
  };
  componentDidMount() {}

  componentDidUpdate() {
    if (this.props.auth.message === "success") {
      this.props.history.push("/user");
    } else {
      this.props.history.push("/login");
    }
  }
  handleErrorMoveToRegister = () => {
    this.props.history.push("/register");
    this.props.nullError();
  };
  render() {
    return (
      <div>
        <Container>
          <Row className="justify-content-center">
            <Col md={6}>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .email("Invalid email address")
                    .matches(
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      "Invalid email address"
                    )
                    .required("Email is required"),
                  password: Yup.string()
                    .required("Password is required")
                    .matches(
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number, and one special Character"
                    ),
                })}
                onSubmit={(values) => {
                  this.handleSubmit(values);
                }}
              >
                <Form className="border border-3 border-primary rounded p-3">
                  <FormGroup>
                    <h1>Login</h1>
                  </FormGroup>
                  <FormGroup>
                    <ErrorAlert error={this.props.auth?.error} />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Email</FormLabel>
                    <FormikInput type="text" name="email" />
                    <FormikError name="email" />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Password</FormLabel>
                    <FormikInput type="text" name="password" />
                    <FormikError name="password" />
                  </FormGroup>

                  <ButtonCommun className="m-3 btn btn-primary" type="submit">
                    <FormikSubmitButton loading={this.props.auth.loading} />
                  </ButtonCommun>
                  <ButtonCommun
                    onClick={() => this.handleErrorMoveToRegister()}
                  >
                    Register
                  </ButtonCommun>
                </Form>
              </Formik>
            </Col>
          </Row>
        </Container>
      </div>
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
    getLogin: (value) => dispatch(getLogin(value)),
    nullError: () => dispatch(nullError()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginForm));
