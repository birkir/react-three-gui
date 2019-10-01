import React, { useEffect, useRef, useState } from 'react';
import { ChromePicker } from 'react-color';
import styled from 'styled-components';
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

export function ColorControl({ control, value }: any) {
  const [open, setOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>();
  const handleClick = (e: any) => {
    if (pickerRef.current && !pickerRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', handleClick);
    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <BaseControl label={control.name} flexLabel>
      <ColorPicker>
        <ColorBox
          style={{ backgroundColor: value }}
          onClick={() => setOpen(lastValue => !lastValue)}
        />
        <Picker hidden={open !== true} ref={pickerRef as any}>
          <ChromePicker
            color={value}
            onChange={color => control.set(color.hex)}
            disableAlpha
          />
        </Picker>
      </ColorPicker>
    </BaseControl>
  );
}
