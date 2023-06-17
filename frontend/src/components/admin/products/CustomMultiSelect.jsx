import React from "react";
import AsyncSelect from "react-select/async";

const CustomMultiSelect = ({
  className,
  placeholder,
  field,
  form,
  isMulti = true,
  loadData,
}) => {
  const onChange = (option) => {
    form.setFieldValue(field.name, option);
  };

  return (
    <AsyncSelect
      cacheOptions
      loadOptions={loadData}
      defaultOptions
      defaultValue={field.value}
      className={className}
      name={field.name}
      onChange={onChange}
      placeholder={placeholder}
      isMulti={isMulti}
    />
  );
};

export default CustomMultiSelect;
