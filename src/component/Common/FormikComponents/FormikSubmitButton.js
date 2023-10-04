import { Spinner } from "react-bootstrap";

export function FormikSubmitButton(props) {
  const { loading } = props;
  return (
    <>
      {loading ? (
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
    </>
  );
}
