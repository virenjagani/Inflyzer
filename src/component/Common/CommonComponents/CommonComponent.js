import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ButtonCommun(props) {
  const { children, type, className, ...restProps } = props;

  return (
    <Button type={type} className={className} {...restProps}>
      {children}
    </Button>
  );
}

function InputCommon(props) {
  const { type, className, ...restProps } = props;
  return <input type={type} className="m-2 border-2 rounded" {...restProps} />;
}

function LinkCommon(props) {
  const { to, className, children, ...restProps } = props;
  return (
    <Link to={to} className={className} {...restProps}>
      {children}
    </Link>
  );
}
function SelectCommon(props) {
  const { objectRowLimit, ...restProps } = props;

  const objectOption = objectRowLimit.map((item, index) => {
    return <option value={item}>{item}</option>;
  });

  return (
    <select class="form-select w-25" {...restProps}>
      {objectOption}
    </select>
  );
}

export { ButtonCommun, InputCommon, LinkCommon, SelectCommon };
