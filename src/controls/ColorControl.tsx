import React, { useState } from 'react';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';
import { BaseControl } from './BaseControl';

const ColorPicker = styled.div`
  position: relative;
`;

const ColorBox = styled.div`
  width: 32px;
  height: 16px;
  border: 2px solid white;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;

const Picker = styled.div<{ hidden: boolean }>`
  position: absolute;
  top: 24px;
  right: 0px;
  z-index: 100;
`;

export function ColorControl({ control }: any) {
  const [open, setOpen] = useState(false);
  return (
    <BaseControl label={control.name}>
      <ColorPicker>
        <ColorBox
          style={{ backgroundColor: control.value }}
          onClick={() => setOpen(x => !x)}
        />
        <Picker hidden={open !== true}>
          <ChromePicker
            color={control.value}
            onChangeComplete={color => control.set(color.hex)}
            disableAlpha
          />
        </Picker>
      </ColorPicker>
    </BaseControl>
  );
}