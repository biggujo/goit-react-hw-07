import styled from '@emotion/styled';

export const Label = styled.label`
  font-size: 24px;
`;

export const ContactFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
`;

export const Input = styled.input`
  padding: 5px;

  font-size: 14px;

  background-color: #ffffff;
  border: 1px solid #d3d3d3;
  border-radius: 7px;

  &:active, &:focus {
    border-color: #000000;

    outline: 1px solid #000000;
  }
`;

export const Button = styled.button`
  min-width: 60px;
  padding: 5px;

  font-size: 14px;

  background-color: #ffffff;
  border: 1px solid #d3d3d3;
  border-radius: 7px;

  &:hover {
    cursor: pointer;
  }

  &:active {
    border-color: #000000;

    outline: 1px solid #000000;
  }
`;
