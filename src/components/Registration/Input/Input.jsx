import React from "react";

export default function Input(props) {
  let { type, placeholder, fullName, name } = props;
  return (
    <input
      type={type ? props.type : "text"}
      placeholder={placeholder}
      value={fullName}
      onChange={(e) => props.onChange(e)}
      name={name}
    />
  );
}
