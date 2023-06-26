import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import styled from 'styled-components';

const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProgressText = styled.p`
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

const ProgressBarWithLabel = () => (
  <ProgressContainer>
    <ProgressWrapper>
      <ProgressSpinner strokeWidth="4" style={{ width: '50px', height: '50px' }} />
      <ProgressText>Loading...</ProgressText>
    </ProgressWrapper>
  </ProgressContainer>
);

export default ProgressBarWithLabel;
