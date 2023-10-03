import { Link } from "react-router-dom";

export function LinkCommon(props) {
  const { to, className, children,...restProps } = props;
  return (
    <Link to={to} className={className} {...restProps}>
      {children}
    </Link>
  );
}
