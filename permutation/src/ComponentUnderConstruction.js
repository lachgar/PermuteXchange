import React from 'react';
import styled from 'styled-components';

const UnderConstruction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 2rem;
`;

const ComponentUnderConstruction = () => (
  <UnderConstruction>
    <p>En cours de construction...</p>
  </UnderConstruction>
);

export default ComponentUnderConstruction;
