import "../../../Assets/header.css";
import DynamicFormRoundedIcon from "@mui/icons-material/DynamicFormRounded";
import { LinkCommon } from "../CommonComponents/CommonComponent";
import { ButtonCommun } from "../CommonComponents/CommonComponent";
import { InputCommon } from "../CommonComponents/CommonComponent";


export function Headers(props) {
  return (
    <>
      <div className="header_container">
        <div className="header_left">
          <DynamicFormRoundedIcon />
          <label>
            <LinkCommon
              to="/user"
              className="text-decoration-none text-black logos"
            >
              CRUD's
            </LinkCommon>
          </label>
        </div>

        <div className="header_center">
          <form onSubmit={props.handleSearchSubmit}>
            <label className="searchLabel">Search:</label>
            <InputCommon
              placeholder="Search Title"
              label="Search Title"
              type="text"
              onChange={(e) => props.handleSearch(e)}
              value={props.searchValue}
            />
            <ButtonCommun className="Text btn btn-primary" type="submit">
              Search
            </ButtonCommun>
            <ButtonCommun
              type="button"
              className="Text m-2 btn btn-primary"
              onClick={() => props.handleReset()}
            >
              Reset
            </ButtonCommun>
          </form>
        </div>
        <div className="header_right">
          <LinkCommon to={`/user/add`} className="btn btn-warning">
            Add User
          </LinkCommon>
          <LinkCommon
            to={`/login`}
            onClick={() => props.handleLogout()}
            className="btn btn-warning m-2"
          >
            Logout
          </LinkCommon>
        </div>
      </div>
    </>
  );
}
