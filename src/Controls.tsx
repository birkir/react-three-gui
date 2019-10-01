import React, { useEffect, useState } from 'react';
import { animated, interpolate, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import styled from 'styled-components';
import { BooleanControl } from './controls/BooleanControl';
import { ButtonControl } from './controls/ButtonControl';
import { ColorControl } from './controls/ColorControl';
import { NumberControl } from './controls/NumberControl';
import { SelectControl } from './controls/SelectControl';
import { StringControl } from './controls/StringControl';
import { XYPadControl } from './controls/XYPadControl';
import { controls, controlsEmitter } from './index';
import { clamp, defaultValue } from './utils';

const WIDTH = 300;

const Float = styled(animated.div)`
  display: block;
  position: fixed;
  top: 16px;
  right: 16px;
  width: ${WIDTH}px;
  border-radius: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.12);
`;

const Header = styled(animated.div)`
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
  user-select: none;
  background-color: #000;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.14);
`;

const Items = styled.div`
  padding: 16px;
`;

const ControlType = {
  number: NumberControl,
  boolean: BooleanControl,
  select: SelectControl,
  color: ColorControl,
  string: StringControl,
  button: ButtonControl,
  xypad: XYPadControl,
};

function ControlItem({ control }: any) {
  const Control =
    control.config.component || (ControlType as any)[control.config.type];
  const [value, setValue] = useState(defaultValue(control.config));
  useEffect(() => {
    if (!Control.skipEvents)
      control.addEventListener(setValue);
  }, []);
  if (!Control) return null;
  return <Control key={control.id.current} control={control} value={value} />;
}

export const Controls = React.memo(() => {
  const [{ pos }, setPos] = useSpring(() => ({ pos: [0, 0] }));
  const bind = useDrag(({ movement, memo = pos.getValue() }) => {
    setPos({
      pos: [
        clamp(movement[0] + memo[0], -window.innerWidth + WIDTH + 32, 1),
        clamp(movement[1] + memo[1], 0, window.innerHeight - 350),
      ],
    });
    return memo;
  });
  const [, set] = useState<number>(0);

  useEffect(() => {
    controlsEmitter.update = () => {
      set(n => n + 1);
      return null;
    };
  }, []);

  return (
    <Float
      style={{
        transform: interpolate(
          [pos],
          ([x, y]) => `translate3d(${x}px,${y}px,0)`
        ),
      }}
    >
      <Header {...bind()} />
      <Items>
        {Array.from(controls).map(([id, control]) => (
          <ControlItem key={id.current} control={control} />
        ))}
      </Items>
    </Float>
  );
});
