import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import { ControlComponentProps, ControlOptionsButton } from '../../types';

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

export function ButtonControl({
  name,
  options,
}: ControlComponentProps<ControlOptionsButton>) {
  return (
    <div style={{ paddingTop: 8, paddingBottom: 8 }}>
      <Button
        onClick={(e: MouseEvent<HTMLButtonElement>) => {
          if (options.onClick) {
            options.onClick(e);
          }
        }}
      >
        {name}
      </Button>
    </div>
  );
}
