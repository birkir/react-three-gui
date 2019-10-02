import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: block;

  font-family: sans-serif;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);

  display: block;
  position: relative;

  width: 100%;
  height: 32px;

  color: #000;

  border: 0;
  background-color: rgba(0, 0, 0, 0.045);
  border-radius: 4px;
  padding: 0 4px;
`;

export function ButtonControl({ control }: any) {
  return (
    <div style={{ paddingTop: 8, paddingBottom: 8 }}>
      <Button
        onClick={() => {
          if (control.config.onClick) {
            control.config.onClick();
          }
        }}
      >
        {control.name}
      </Button>
    </div>
  );
}
