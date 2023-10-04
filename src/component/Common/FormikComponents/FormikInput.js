import { Field } from "formik";
import { FormControl } from "react-bootstrap";

export function FormikInput(props) {
  return <Field {...props} as={FormControl} />;
}
