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
import { ButtonCommun } from "../component/Common/Button";

class LoginForm extends Component {
  handleSubmit = (values) => {
    this.props.getLogin(values);
  };

  componentDidUpdate() {
    if (this.props.auth.message === "success") {
      this.props.history.push("/user");
    } else {
      this.props.history.push("/login");
    }
  }
  handleErrorMoveToRegister =()=>{
    this.props.history.push('/register')
    this.props.nullError()
  }
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
                    {this.props.auth?.error && (
                      <Alert key={"danger"} variant={"danger"}>
                        {this.props.auth?.error}
                      </Alert>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Email</FormLabel>
                    <Field type="text" name="email" as={FormControl} />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error text-danger"
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Password</FormLabel>
                    <Field type="text" name="password" as={FormControl} />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error text-danger"
                    />
                  </FormGroup>

                  <ButtonCommun className="m-3 btn btn-primary" type="submit">
                    {this.props.auth.loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <> Loading...</>{" "}
                      </>
                    ) : (
                      <>Submit</>
                    )}
                  </ButtonCommun>
                  <ButtonCommun onClick={()=>this.handleErrorMoveToRegister()}>
                    Register
                  </ButtonCommun>
                  {/* <Link className="btn btn-primary" to="/register">
                    Register
                  </Link> */}
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
    nullError:()=>dispatch(nullError())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginForm));
