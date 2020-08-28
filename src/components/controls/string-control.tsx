import React from 'react';
import styled from 'styled-components';
import { BaseControl } from './base-control';
import { ControlComponentProps, ControlOptionsString } from '../../types';

const Input = styled.input`
  display: block;

  font-family: sans-serif;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);

  display: block;
  position: relative;

  width: 100%;
  height: 32px;

  color: #000;

  margin-left: 8px;

  border: 0;
  background-color: rgba(0, 0, 0, 0.025);
  border-radius: 4px;
  padding: 0 4px;
`;

export const StringControl = React.memo(
  ({ name, setValue, value }: ControlComponentProps<ControlOptionsString>) => {
    return (
      <BaseControl label={name}>
        <Input value={value} onChange={e => setValue(e.target.value)} />
      </BaseControl>
    );
  }
);
