import React, { useContext, useEffect, useState } from 'react';
import { ControlsContext } from '../contexts/controls-context';
import {
  ControlType,
  ControlOptions,
  ControlComponentProps,
  ControlOptionsCustom,
} from '../types';
import { NumberControl } from './controls/number-control';
import { BooleanControl } from './controls/boolean-control';
import { BaseControl } from './controls/base-control';
import { ButtonControl } from './controls/button-control';
import { ColorControl } from './controls/color-control';
import { SelectControl } from './controls/select-control';
import { StringControl } from './controls/string-control';
import { XYPadControl } from './controls/xy-pad-control';
import { FileControl } from './controls/file-control';

const ControlComponents = {
  [ControlType.NUMBER]: NumberControl,
  [ControlType.BOOLEAN]: BooleanControl,
  [ControlType.SELECT]: SelectControl,
  [ControlType.COLOR]: ColorControl,
  [ControlType.STRING]: StringControl,
  [ControlType.BUTTON]: ButtonControl,
  [ControlType.FILE]: FileControl,
  [ControlType.XYPAD]: XYPadControl,
};

const Noop = ({ name, options }: any) => (
  <BaseControl label={name}>"{options.type}" not found</BaseControl>
);

export const ControlItem = ({
  name,
  id,
  value: defaultValue,
  options,
}: ControlComponentProps<ControlOptions>) => {
  const context = useContext(ControlsContext);

  const [value, setValue] = useState(
    context.values.current && context.values.current.has(id)
      ? context.values.current.get(id)
      : defaultValue
  );

  useEffect(() => {
    context.values.current!.set(id, value);
  }, [context.values, id, value]);

  useEffect(() => {
    context.gui.current!.set(id, setValue);
  }, [context.gui, id]);

  const Component =
    (options as ControlOptionsCustom).component ??
    (ControlComponents as any)[options.type ?? ControlType.NUMBER] ??
    Noop;

  return (
    <Component
      id={id}
      name={name}
      value={value}
      setValue={(newValue: any) => {
        context.gui.current?.get(id)?.(newValue);
        context.state.current?.get(id)?.(newValue);
      }}
      options={options}
    />
  );
};
