export function InputCommon(props) {
  const { type, className, ...restProps } = props;
  return <input type={type} className="m-2 border-2 rounded" {...restProps} />;
}
