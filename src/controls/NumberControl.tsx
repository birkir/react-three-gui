import React from 'react';
import styled from 'styled-components';
import { BaseControl } from './BaseControl';

const InputRange = styled.input`
  -webkit-appearance: none;
  width: 100%;
  background: transparent;
  display: inline-block;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 12px;
    cursor: pointer;
    background: #f7f9fa;
    border-radius: 10px;
  }

  &::-webkit-slider-thumb {
    border: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #ffffff;
    cursor: pointer;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,.22);
    -webkit-appearance: none;
    margin-top: -4px;
  }

  &:focus::-webkit-slider-runnable-track {
    /* background: #367ebd; */
    outline: none;
  }
`;

export function NumberControl({ control }: any) {
  return (
    <BaseControl label={control.name} value={control.value}>
      <InputRange
        type="range"
        defaultValue="0"
        min={0}
        max={Math.PI * 200}
        onChange={e => {
          const value = Number(e.currentTarget.value) / 100;
          control.set(value);
        }}
      />
    </BaseControl>
  );
}