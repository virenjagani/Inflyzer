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
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";
import API from "../Utils/axios";
import { Formik, Field, Form } from "formik";
import { current } from "@reduxjs/toolkit";
// import { getLength } from "../Utils/users";

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
    if (this.props.user.userList !== null) {
      data = this.props.user.userList.slice(firstIndex, lastIndex);
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
    if (this.props.user.message) {
      toast.success(this.props.user.message);
    }
    // const lastIndex = this.state.recordPerPage * this.state.currentPage;
    // const firstIndex = lastIndex - this.state.recordPerPage;
    // const records = this.props.user.userList.slice(firstIndex, lastIndex);

    let npage;
    if (this.props.user.userList !== null) {
      npage = Math.ceil(
        this.props.user.userList.length / this.state.recordPerPage
      );
    } else {
      npage = 1;
    }
    const number = Array.from({ length: npage }, (_, index) => index + 1);

    return (
      <div>
        <Link to={`/user/add`} className="btn btn-warning m-3">
          Add User
        </Link>

        <Link
          to={`/login`}
          onClick={() => this.handleLogout()}
          className="btn btn-warning m-3"
        >
          Logout
        </Link>
        <div>
          <form onSubmit={this.handleSearchSubmit}>
            Search:{" "}
            <input
              placeholder="Search by Title..."
              type="text"
              onChange={(e) => this.handleSearch(e)}
              value={this.state.searchField}
              className="border border-info border-2 rounded m-2"
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
            <button
              type="button"
              className="m-2 btn btn-primary"
              onClick={() => this.handleReset()}
            >
              Reset
            </button>
          </form>
        </div>

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
                          <Link
                            to={`/user/edit/` + _id}
                            className="btn btn-primary"
                          >
                            Edit
                          </Link>
                          &nbsp; &nbsp;
                          <button
                            onClick={() => this.handleDelete(_id)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
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
              <select
                class="form-select w-25"
                style={{ marginRight: "20px" }}
                onChange={(e) =>
                  this.setState({ recordPerPage: e.target.value })
                }
                aria-label="Default select example"
              >
                <option selected>Select Row limit</option>
                <option value={5}>5</option>
                <option value={7}>7</option>
                <option value={10}>10</option>
              </select>
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
