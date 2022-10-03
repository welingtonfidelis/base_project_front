import styled from 'styled-components';

export const MenuContainer = styled.div`
    background: blue;
    display: flex;
    flex-direction: column;
    height: 100%;

    @media (max-width: 600px) {
        position: absolute;
    }
`;