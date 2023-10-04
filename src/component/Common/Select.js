import { Select } from "@mui/material";

export function SelectCommon(props) {
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
