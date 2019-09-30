import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NumberControl } from './controls/NumberControl';
import { BooleanControl } from './controls/BooleanControl';
import { SelectControl } from './controls/SelectControl';
import { ColorControl } from './controls/ColorControl';
import { XYPadControl } from './controls/XYPadControl';
import { ButtonControl } from './controls/ButtonControl';
import { controls, controlsEmitter } from './index';
import { useSpring, animated, interpolate } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { clamp, map } from './utils';

const WIDTH = 300;

const Float = styled(animated.div) <{ expanded: boolean }>`
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

const Header = styled(animated.div) <{ expanded: boolean }>`
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
  box-shadow: 0 0 14px 0 rgba(0,0,0,.14);
`;

const Items = styled.div<{ expanded: boolean }>`
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
  const [{ pos }, setPos] = useSpring(() => ({ pos: [0, 0] }))
  const bind = useDrag(({ movement, memo = pos.getValue() }) => {
    setPos({
      pos: [
        clamp(movement[0] + memo[0], -window.innerWidth + WIDTH + 32, 1),
        clamp(movement[1] + memo[1], 0, window.innerHeight - 350)
      ],
    })
    return memo
  })
  const [, set] = useState<number>(0);

  useEffect(() => {
    controlsEmitter.update = () => {
      set(n => n + 1);
      return null;
    }
  }, []);

  return (
    <Float
      style={{ transform: interpolate([pos], ([x, y]) => `translate3d(${x}px,${y}px,0)`) }}
    >
      <Header {...bind()} />
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
