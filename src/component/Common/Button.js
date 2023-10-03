import { Button } from "react-bootstrap";
export function ButtonCommun(props) {
  const { children } = props;

  return <Button {...props}>{children}</Button>;
}
