import React, { useEffect, useState } from 'react';
import { BooleanControl } from '../controls/BooleanControl';
import { ButtonControl } from '../controls/ButtonControl';
import { ColorControl } from '../controls/ColorControl';
import { NumberControl } from '../controls/NumberControl';
import { SelectControl } from '../controls/SelectControl';
import { StringControl } from '../controls/StringControl';
import { XYPadControl } from '../controls/XYPadControl';
import { defaultValue } from '../utils';

const ControlType = {
  number: NumberControl,
  boolean: BooleanControl,
  select: SelectControl,
  color: ColorControl,
  string: StringControl,
  button: ButtonControl,
  xypad: XYPadControl,
};

export function ControlItem({ control }: any) {
  const Control =
    control.config.component || (ControlType as any)[control.config.type];
  const [value, setValue] = useState(defaultValue(control.config));
  useEffect(() => {
    control.addEventListener(setValue);
  }, []);
  if (!Control) return null;
  return <Control key={control.id.current} control={control} value={value} />;
}