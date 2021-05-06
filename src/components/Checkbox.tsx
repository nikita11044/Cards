import React, {DetailedHTMLProps, InputHTMLAttributes} from "react";
import styled, {StyledComponentProps} from "styled-components/macro";

type DefaultCheckboxPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperCheckboxPropsType = DefaultCheckboxPropsType & {
    error?: string;
};

export const Checkbox: React.FC<SuperCheckboxPropsType> = ({
                                                               type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
                                                               error,
                                                               ...restProps // все остальные пропсы попадут в объект restProps
                                                           }) => {
    return (
        <InputTextWrapper>
            <StyledInput
                type="checkbox"
                {...restProps}
            />
            <StyledError>{error && <span>{error}</span>}</StyledError>
        </InputTextWrapper>
    );
};

const InputTextWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input<StyledComponentProps<any, any, any, any>>`
  // Общие стили инпута
  padding: 1rem 0.5rem;
  margin-bottom: 20px;
  height: 20px;
  width: 400px;


  border: 1px solid rgb(109, 109, 109);
`;
// Стили контейнера с ошибкой
const StyledError = styled.div`
  position: absolute;
  bottom: 1px;
  // Стили текста ошибки
  & > span {

    color: red;
  }
`;

/*
font-size: ${({ theme }) => theme.font.size.s1};*/