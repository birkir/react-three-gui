import React from 'react';
import { useDrag } from 'react-use-gesture';
import { a, useSpring, to } from 'react-spring';
import { BaseControl } from './BaseControl';
import { map, clamp } from '../utils';

export function XYPadControl({ control, value }: any) {
  const ref = React.useRef<SVGElement>();
  const stage = React.useRef(null);
  const { distance = 1, scrub = false } = control.config;
  const [{ width, height }] = React.useState({ width: 270, height: 152 });
  const [cursor, setCursor] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { tension: 230, friction: 20 },
    onFrame({ x, y }: any) {
      if (!scrub) {
        control.set(() => ({
          x: clamp(map(x, 0, width / 2, 0, distance), -distance, distance),
          y: clamp(map(y, 0, height / 2, 0, distance), -distance, distance),
        }));
      }
    },
  }));

  const bind = useDrag(({ down, movement }) => {
    if (down && !stage.current) {
      stage.current = value;
    } else if (!down) {
      stage.current = null;
    }
    setCursor({ x: down ? movement[0] : 0, y: down ? movement[1] : 0 });
    if (scrub && down) {
      control.set(() => ({
        x:
          (stage as any).current.x +
          map(movement[0], 0, width / 2, 0, distance),
        y:
          (stage as any).current.y +
          map(movement[1], 0, height / 2, 0, distance),
      }));
    }
  });

  const x = cursor.x.to(n => clamp(n + width / 2, 0, width));
  const y = cursor.y.to(n => clamp(n + height / 2, 0, height));

  return (
    <BaseControl
      stack
      label={control.name}
      value={`x: ${value.x.toFixed(1)}, y: ${value.y.toFixed(1)}`}
    >
      <a.svg
        ref={ref as any}
        style={{
          userSelect: 'none',
          borderRadius: 8,
          border: '1px solid #f0f0f0',
        }}
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        {...bind()}
      >
        <rect fill="rgb(250, 250, 250)" width="100%" height="100%" />
        <a.line x1={x} x2={x} y1={0} y2="100%" stroke="#ccc" />
        <a.line x1={0} x2="100%" y1={y} y2={y} stroke="#ccc" />
        <a.g
          style={{
            transform: to([x, y], (x, y) => `translate(${x}px, ${y}px)`),
          }}
        >
          <circle r={8} fill="#ccc" />
          <circle r={4} fill="#aaa" />
        </a.g>
      </a.svg>
    </BaseControl>
  );
}
