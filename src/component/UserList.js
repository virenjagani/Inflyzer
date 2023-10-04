import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getDeleteDetails,
  getLogout,
  getSearchedUserList,
  getUser,
  sortData,
} from "../redux/ducks/userReducer";
import { Table } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";
import API from "../Utils/axios";
import { Formik, Field, Form } from "formik";
import { current } from "@reduxjs/toolkit";
import { ButtonCommun } from "./Common/CommonComponents/CommonComponent";
import { LinkCommon } from "./Common/CommonComponents/CommonComponent";
import { InputCommon } from "./Common/CommonComponents/CommonComponent";
import { SelectCommon } from "./Common/CommonComponents/CommonComponent";
import { Headers } from "./Common/Header/Headers";
class UserList extends Component {
  constructor(props) {
    super(props);
    if (this.props.auth.message === `success`) {
      toast.success("You are login Successfully!");
    }
    this.state = {
      deleteSuccessShown: false,
      searchField: null,
      currentPage: 1,
      recordPerPage: 5,
      order: "ASC",
      data: null,
    };
  }

  componentDidMount() {
    this.props.getUser();
    this.updateData();
  }

  componentDidUpdate(prevProps, prevState) {
    // Check if the props or state that affect the data have changed
    if (
      prevProps.user.userList !== this.props.user.userList ||
      prevState.currentPage !== this.state.currentPage ||
      prevState.recordPerPage !== this.state.recordPerPage
    ) {
      this.updateData();
    }
  }

  updateData = () => {
    const { currentPage, recordPerPage } = this.state;
    const lastIndex = recordPerPage * currentPage;
    const firstIndex = lastIndex - recordPerPage;
    let data;
    console.log(firstIndex, "==", lastIndex);
    if (this.props.user.userList !== null) {
      data = this.props.user.userList.slice(firstIndex, lastIndex);
      //check git
      const npage = Math.ceil(
        this.props.user.userList.length / this.state.recordPerPage
      );
      console.log("this.state.currentPage ==>", this.state.currentPage);
      if (this.state.currentPage > npage) {
        this.setState({ currentPage: npage });
      }
    } else {
      data = [];
    }

    this.setState({ data });
  };

  handleDelete = (id) => {
    this.props.getDeleteDetails(id);
  };

  handleLogout = () => {
    this.props.getLogout();
  };

  handleSearch = (e) => {
    this.setState({ searchField: e.target.value });
  };

  handleSearchSubmit = (e) => {
    e.preventDefault();
    if (this.state.searchField !== null) {
      this.props.getSearchedUserList(this.state.searchField.toLowerCase());
    } else {
      this.props.getSearchedUserList(null);
    }
    this.setState({ currentPage: 1 });
  };

  handleReset = () => {
    this.setState({ searchField: "" });
    this.props.getUser();
  };

  prevPage = () => {
    if (this.state.currentPage !== 1) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    }
  };

  currentPage = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  nextPage = () => {
    const npage = Math.ceil(
      this.props.user.userList.length / this.state.recordPerPage
    );

    if (this.state.currentPage !== npage) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    }
  };

  sorting = (col) => {
    if (this.state.order === "ASC") {
      this.props.sortData(this.props.user.userList, col, this.state.order);
      this.setState({ order: "DSC" });
    }
    if (this.state.order === "DSC") {
      this.props.sortData(this.props.user.userList, col, this.state.order);
      this.setState({ order: "ASC" });
    }
  };

  render() {
    const objectRowLimit = [5, 7, 10];
    if (this.props.user.message) {
      toast.success(this.props.user.message);
    }

    let npage;
    if (this.props.user && this.props.user.userList) {
      npage = Math.ceil(
        this.props.user.userList.length / this.state.recordPerPage
      );
    } else {
      npage = 1;
    }
    const number = Array.from({ length: npage }, (_, index) => index + 1);

    return (
      <div>
        <Headers
          handleLogout={this.handleLogout}
          handleSearchSubmit={this.handleSearchSubmit}
          handleSearch={this.handleSearch}
          searchValue={this.state.searchField}
          handleReset={this.handleReset}
        />

        {this.props.user?.loading ? (
          <div>
            <Spinner animation="border" />
          </div>
        ) : (
          <>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th onClick={() => this.sorting("title")}>Title</th>
                  <th onClick={() => this.sorting("description")}>
                    Description
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data ? (
                  this.state.data.map((item, index) => {
                    const { _id, title, description, creator } = item;
                    return (
                      <tr key={_id}>
                        <td>{_id}</td>
                        <td>{creator.name}</td>
                        <td>{title}</td>
                        <td>{description}</td>
                        <td>
                          <LinkCommon
                            to={`/user/edit/` + _id}
                            className="btn btn-primary"
                          >
                            Edit
                          </LinkCommon>
                          &nbsp; &nbsp;
                          <ButtonCommun
                            onClick={() => this.handleDelete(_id)}
                            className="btn btn-danger"
                          >
                            Delete
                          </ButtonCommun>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5">No Data Found</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <ul className="pagination m-2">
              <label className="ms-2 d-flex justify-content-center align-items-center">
                Select Row Limit:
              </label>

              <SelectCommon
                className="ms-1 me-3"
                onChange={(e) =>
                  this.setState({ recordPerPage: e.target.value })
                }
                objectRowLimit={objectRowLimit}
              />

              <li className="page-item">
                <a href="#" className="page-link" onClick={this.prevPage}>
                  Prev
                </a>
              </li>
              {number.map((numberOfPage, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    this.state.currentPage === numberOfPage ? "active" : ""
                  }`}
                >
                  <a
                    href="#"
                    className="page-link"
                    onClick={() => this.currentPage(numberOfPage)}
                  >
                    {numberOfPage}
                  </a>
                </li>
              ))}
              <li className="page-item">
                <a className="page-link" onClick={this.nextPage}>
                  Next
                </a>
              </li>
            </ul>
          </>
        )}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(getUser()),
    getDeleteDetails: (id) => dispatch(getDeleteDetails(id)),
    getLogout: () => dispatch(getLogout()),
    getSearchedUserList: (value) => dispatch(getSearchedUserList(value)),
    sortData: (value, col, order) => dispatch(sortData(value, col, order)),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    auth: state.auth,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
