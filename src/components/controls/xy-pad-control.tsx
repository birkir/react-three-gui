import React from 'react';
import { animated, useSpring, to } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';
import { clamp, map } from '../../utils';
import { BaseControl } from './base-control';
import { ControlComponentProps, ControlOptionsXYPad } from '../../types';

const THRESHOLD = 0.00001;

export const XYPadControl = React.memo(
  ({
    name,
    value,
    setValue,
    options,
  }: ControlComponentProps<ControlOptionsXYPad>) => {
    const stage = React.useRef(null);
    const { distance = 1, scrub = false } = options;
    const [{ width, height }] = React.useState({ width: 270, height: 152 });
    const [cursor, setCursor] = useSpring(() => ({
      from: {
        x: value.x,
        y: value.y,
      },

      onChange(value: any, b: any) {
        const v =
          clamp(map(value, 0, width / 2, 0, distance), -distance, distance) ||
          0;
        setValue((prev: any) => ({
          ...prev,
          [b.key]: v < THRESHOLD && v > -THRESHOLD ? 0 : v,
        }));
      },
    })) as any;

    const bind = useDrag(({ down, movement }) => {
      if (down && !stage.current) {
        stage.current = value;
      } else if (!down) {
        stage.current = null;
      }

      setCursor({ x: down ? movement[0] : 0, y: down ? movement[1] : 0 });

      if (scrub && down) {
        setValue(() => ({
          x:
            (stage as any).current.x +
            map(movement[0], 0, width / 2, 0, distance),
          y:
            (stage as any).current.y +
            map(movement[1], 0, height / 2, 0, distance),
        }));
      }
    });

    const x = cursor.x.to((n: number) => clamp(n + width / 2, 0, width));
    const y = cursor.y.to((n: number) => clamp(n + height / 2, 0, height));

    return (
      <BaseControl
        stack
        label={name}
        value={`x: ${value.x.toFixed(1)}, y: ${value.y.toFixed(1)}`}
      >
        <animated.svg
          style={{
            userSelect: 'none',
            borderRadius: 8,
            border: '1px solid #f0f0f0',
          }}
          width={width}
          height={height}
          xmlns="http://www.w3.org/2000/svg"
          {...bind()}
        >
          <rect fill="rgb(250, 250, 250)" width="100%" height="100%" />
          <animated.line x1={x} x2={x} y1={0} y2="100%" stroke="#ccc" />
          <animated.line x1={0} x2="100%" y1={y} y2={y} stroke="#ccc" />
          <animated.g
            style={{
              transform: to([x, y], (x, y) => `translate(${x}px, ${y}px)`),
            }}
          >
            <circle r={8} fill="#ccc" />
            <circle r={4} fill="#aaa" />
          </animated.g>
        </animated.svg>
      </BaseControl>
    );
  }
);
