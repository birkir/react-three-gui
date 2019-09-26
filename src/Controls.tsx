import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NumberControl } from './controls/NumberControl';
import { BooleanControl } from './controls/BooleanControl';
import { SelectControl } from './controls/SelectControl';
import { ColorControl } from './controls/ColorControl';
import { XYPadControl } from './controls/XYPadControl';
import { ButtonControl } from './controls/ButtonControl';
import { controls, controlsEmitter } from './index';

const Float = styled.div`
  display: block;
  position: fixed;
  top: 16px;
  right: 16px;
  width: 300px;
  border-radius: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.12);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  height: 42px;
  font-family: sans-serif;
  font-size: 14px;
  color: #fff;
  cursor: move;
  cursor: grab;
  background-color: #000;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  box-shadow: 0 0 14px 0 rgba(0,0,0,.14);
`;

const Items = styled.div`
  padding: 16px;
`;

const ControlType = {
  number: NumberControl,
  boolean: BooleanControl,
  select: SelectControl,
  color: ColorControl,
  button: ButtonControl,
  xypad: XYPadControl,
};

export function Controls() {
  const [, set] = useState<number>(0);
  useEffect(() => {
    controlsEmitter.update = () => {
      set(n => n + 1);
      return null;
    }
  }, []);

  return (
    <Float>
      <Header>react-three-gui</Header>
      <Items>
        {Array.from(controls).map(([id, control]) => {
          const Control = (ControlType as any)[control.config.type];
          if (!Control) return null;
          return (
            <Control key={id.current} control={control} />
          )
        })}
      </Items>
    </Float>
  );
}
