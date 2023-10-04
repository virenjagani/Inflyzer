import { Alert } from "react-bootstrap";
import { persistor } from "../../../redux/store";

export function ErrorAlert(props) {
  const { error } = props;
  setTimeout(() => {
    if (error) {
      persistor.purge();
    }
  }, 200);
  return (
    <>
      {error && (
        <Alert key={"danger"} variant={"danger"}>
          {error}
        </Alert>
      )}
    </>
  );
}
