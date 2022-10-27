import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const FormContainer = styled.div`
  flex: 1;

  & form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    overflow: auto;
    padding: 0.5rem;
  }
`;

export const FomrInputContainer = styled.div`
  flex: 1;
`;

export const FormButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;

  & button:first-child {
    margin-right: 0.5rem;
  }
  & button {
    flex: 1;
  }
`;
