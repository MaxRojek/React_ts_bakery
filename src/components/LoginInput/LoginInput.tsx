import React, { FC, InputHTMLAttributes } from "react";
import { Input } from "./LoginInputStyle";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  value?: string;
}

const LoginInput: FC<InputProps> = ({
  placeholder,
  value,
  ...rest
}: InputProps): JSX.Element => {
  return (
    <Input type="text" placeholder={placeholder} value={value} {...rest} />
  );
};
export default LoginInput;
