import styled from "styled-components";

import imageBackground from "../../assets/background_1.jpg";

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  /* background-image: url(${imageBackground}); */
  /* box-shadow: inset 0 0 0 1000px rgb(25 118 210 / 45%); */
`;

export const Content = styled.div`
  min-height: 24rem;
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.separator};
  box-shadow: 1px 0px 12px 2px rgba(0, 0, 0, 0.35);
  border-radius: ${(props) => props.theme.border.radius};
  background: #fff;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;

  @media (min-width: 800px) {
    width: 30rem;
    min-height: 26rem;
  }
`;


export const WellcomeMessageText = styled.span`
  text-align: center;
  margin-top: 4.5rem;
  margin-bottom: 2rem;
`;

export const FormContainer = styled.div`
  height: 100%;
  
  & form {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

export const WrongUserPassword = styled.span`
  font-size: .9rem;
  text-align: center;
  color: ${props => props.theme.colors.error};
  margin-top: 1rem;
  margin-bottom: .5rem;
`;

export const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 1rem;
  justify-content: flex-end;
`;
