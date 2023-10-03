import { Button } from "react-bootstrap";
export function ButtonCommun(props) {
  const { children, type, className, ...restProps } = props;

  return (
    <Button type={type} className={className} {...restProps}>
      {children}
    </Button>
  );
}
