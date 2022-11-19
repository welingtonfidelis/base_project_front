import styled from "styled-components";
import { FaUser, FaTimesCircle } from "react-icons/fa";

export const AvatarContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  & label {
    border: 4px solid ${(props) => props.theme.colors.primary};
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    transition: 0.5s;
    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
      cursor: pointer;
      filter: brightness(0.7);
    }
  }
`;

export const AvatarIcon = styled(FaUser)`
  font-size: 7rem;
`;

export const AvatarImageDelete = styled(FaTimesCircle)`
  font-size: 1rem;
  margin-top: 0.3em;
  color: ${(props) => props.theme.colors.primary};
  transition: 0.5s;

  :hover {
    cursor: pointer;
    filter: brightness(0.7);
  }
`;

export const AvatarImage = styled.img`
  width: 7rem;
  height: 7rem;
  display: inline;
  margin: 0 auto;
`;
