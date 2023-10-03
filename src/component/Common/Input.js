import { TextField } from "@mui/material";

export function InputCommun(props) {
  const { type, className, ...restProps } = props;
  return (
    <>
      <input type={type} className={className} {...restProps} />
    </>
  );
}
