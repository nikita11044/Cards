import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import styled, { StyledComponentProps } from "styled-components/macro";

import { ThemeType } from "./Theme";

// тип пропсов обычной кнопки
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type PropsType = DefaultButtonPropsType;

export const Button: React.FC<PropsType> = ({ ...restProps }) => {
    return <StyledButton {...restProps} />;
};



// Styles
const StyledButton = styled.button<StyledComponentProps<any, ThemeType, any, any>>`
  border: none;
  cursor: pointer;
  color: white;
  background-color:blue;
  padding: 0.5rem 1rem;
  width: 400px;
  
 
  &:hover {
   background-color: grey;  
  }
`;
