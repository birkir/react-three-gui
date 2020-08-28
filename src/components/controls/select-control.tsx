import React from 'react';
import styled from 'styled-components';
import { BaseControl } from './base-control';
import { ControlComponentProps, ControlOptionsSelect } from '../../types';

const Select = styled.select`
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

export function SelectControl({
  name,
  setValue,
  value,
  options,
}: ControlComponentProps<ControlOptionsSelect>) {
  const { items = [] } = options;
  return (
    <BaseControl label={name}>
      <Select value={value} onChange={e => setValue(e.currentTarget.value)}>
        {items.map((item: string, i: number) => (
          <option key={i}>{item}</option>
        ))}
      </Select>
    </BaseControl>
  );
}
