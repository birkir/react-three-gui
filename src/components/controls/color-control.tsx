import React, { useEffect, useRef, useState } from 'react';
import {
  AlphaPicker,
  BlockPicker,
  ChromePicker,
  CirclePicker,
  CompactPicker,
  GithubPicker,
  HuePicker,
  MaterialPicker,
  SketchPicker,
  SliderPicker,
  SwatchesPicker,
  TwitterPicker,
} from 'react-color';
import styled from 'styled-components';
import { BaseControl } from './base-control';
import { ControlComponentProps, ControlOptionsColor } from '../../types';

const ColorPicker = styled.div`
  position: relative;

  > div {
    box-sizing: border-box !important;
  }
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

export function ColorControl({
  name,
  value,
  setValue,
  options,
}: ControlComponentProps<ControlOptionsColor>) {
  const { inline = false, picker = 'chrome' } = options;
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

  const pickerProps: any = {
    color: value,
    onChange: (color: any) => setValue(color.rgb),
    disableAlpha: options.disableAlpha,
    colors: options.colors,
  };

  let PickerElement: any = ChromePicker;

  switch (picker) {
    case 'alpha':
      PickerElement = AlphaPicker;
      break;
    case 'block':
      PickerElement = BlockPicker;
      break;
    case 'circle':
      PickerElement = CirclePicker;
      break;
    case 'compact':
      PickerElement = CompactPicker;
      break;
    case 'github':
      PickerElement = GithubPicker;
      break;
    case 'hue':
      PickerElement = HuePicker;
      break;
    case 'material':
      PickerElement = MaterialPicker;
      break;
    case 'sketch':
      PickerElement = SketchPicker;
      pickerProps.presetColors = options.colors;
      break;
    case 'slider':
      PickerElement = SliderPicker;
      break;
    case 'swatches':
      PickerElement = SwatchesPicker;
      break;
    case 'twitter':
      PickerElement = TwitterPicker;
      break;
  }

  return (
    <BaseControl stack={inline} label={name} flexLabel>
      <ColorPicker>
        {inline ? (
          <PickerElement
            {...pickerProps}
            triangle={inline ? 'hide' : undefined}
            width={268}
          />
        ) : (
          <>
            <ColorBox
              style={{ backgroundColor: value }}
              onClick={() => setOpen(lastValue => !lastValue)}
            />
            <Picker hidden={open !== true} ref={pickerRef as any}>
              <PickerElement {...pickerProps} />
            </Picker>
          </>
        )}
      </ColorPicker>
    </BaseControl>
  );
}
