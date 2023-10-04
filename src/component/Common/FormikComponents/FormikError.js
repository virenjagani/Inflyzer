import { ErrorMessage } from "formik";

export function FormikError(props) {
  const { children } = props;
  return (
    <ErrorMessage {...props} component="div" className="error text-danger">
      {children}
    </ErrorMessage>
  );
}
