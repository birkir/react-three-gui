import React from 'react';
import { ChromePicker } from 'react-color';
import { BaseControl } from './BaseControl';

export function ColorControl({ control }: any) {
  return (
    <BaseControl label={control.name}>
      <ChromePicker
        color={control.value}
        onChange={color => control.set(color.hex)}
        disableAlpha
      />
    </BaseControl>
  );
}