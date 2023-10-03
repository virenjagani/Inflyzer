import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import {
  addUserDetailForUpdate,
  getAddDetails,
  getUserObject,
} from "../redux/ducks/userReducer";
import { withRouter } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";
import {ButtonCommun} from "./Common/Button"

class UserForm extends Component {
  constructor(props) {
    super(props);
    if (this.props.match.params.id) {
      this.props.getUserObject(this.props.match.params.id);
    }
    this.state = {};
  }

  componentDidUpdate() {
    if (this.props.match.params.id) {
      if (this.props.user.message === "Post update Successfully") {
        this.props.history.push("/user");
      }
    } else {
      if (this.props.user.message === "New Post Added Successfully") {
        this.props.history.push("/user");
      }
    }
  }

  render() {
    if (
      !this.props.user.error === `Request failed with status code 400` ||
      this.props.user.error === "this title is already taken "
    ) {
      if (this.props.user.error) {
        toast.warning(this.props.user.error);
      }
    }

    return (
      <div className="container mt-5">
        <Formik
          enableReinitialize
          initialValues={
            this.props.match.params.id
              ? {
                  id: this.props?.user?.userObject?._id,
                  name: this.props?.user?.userObject?.creator?.name,
                  title: this.props?.user?.userObject?.title,
                  description: this.props?.user?.userObject?.description,
                }
              : {
                  title: "",
                  description: "",
                }
          }
          validationSchema={
            this.props.match.params.id
              ? Yup.object({
                  id: Yup.string().required("ID is required"),
                  name: Yup.string().required("Name is required"),
                  title: Yup.string().required("Title is required"),
                  description: Yup.string().required("Description is required"),
                })
              : Yup.object({
                  title: Yup.string().required("Title is required"),
                  description: Yup.string().required("Description is required"),
                })
          }
          onSubmit={(values) => {
            if (this.props.match.params.id) {
              const id = this.props.match.params.id;
              const updateValues = { values, id };
              this.props.addUserDetailForUpdate(updateValues);
            } else {
              this.props.getAddDetails(values);
            }
          }}
        >
          {this.props.match.params.id ? (
            <>
              {this.props.user.loading ? (
                <>
                  <Spinner animation="grow" />
                </>
              ) : (
                <Form className="border border-3 border-primary rounded p-3">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <Field
                      type="text"
                      id="name"
                      disabled
                      name="name"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <Field
                      type="text"
                      id="title"
                      name="title"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <Field
                      type="text"
                      id="description"
                      name="description"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <ButtonCommun type="submit" className="btn btn-primary mt-3">
                    {this.props.user.loading ? (
                      <>
                        {" "}
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <>Loading...</>
                      </>
                    ) : (
                      <>Submit</>
                    )}
                  </ButtonCommun>
                </Form>
              )}
            </>
          ) : (
            <>
              {this.props.user.loading ? (
                <>
                  <Spinner animation="grow" />
                </>
              ) : (
                <Form className="border border-3 border-primary rounded p-3">
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <Field
                      type="text"
                      id="title"
                      name="title"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <Field
                      type="text"
                      id="description"
                      name="description"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <ButtonCommun type="submit" className="btn btn-primary mt-3">
                    {this.props.user.loading ? (
                      <>
                        {" "}
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <>Loading...</>
                      </>
                    ) : (
                      <>Submit</>
                    )}
                  </ButtonCommun>
                </Form>
              )}
            </>
          )}
        </Formik>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getAddDetails: (value) => dispatch(getAddDetails(value)),
    getUserObject: (id) => dispatch(getUserObject(id)),
    addUserDetailForUpdate: (value) => dispatch(addUserDetailForUpdate(value)),
  };
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserForm));
