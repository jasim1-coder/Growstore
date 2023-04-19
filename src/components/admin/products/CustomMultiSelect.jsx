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
    form.setFieldValue(
      field.name,
      isMulti ? option.map((item) => item.value) : option.value
    );
  };

  return (
    <AsyncSelect
      cacheOptions
      loadOptions={loadData}
      defaultOptions
      defaultValue={
        isMulti
          ? field.value?.map((entry) => ({
              label: entry,
              value: entry,
            }))
          : { label: field.value, value: field.value }
      }
      className={className}
      name={field.name}
      onChange={onChange}
      placeholder={placeholder}
      isMulti={isMulti}
    />
  );
};

export default CustomMultiSelect;
