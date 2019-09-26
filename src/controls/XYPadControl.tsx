import React from 'react'
import { useDrag } from 'react-use-gesture'
import { a, useSpring, to } from 'react-spring';
import { BaseControl } from './BaseControl';

const map = (value: number, x1: number, y1: number, x2: number, y2: number) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;
const clamp = (num: number, clamp: number, higher: number) => higher ? Math.min(Math.max(num, clamp), higher) : Math.min(num, clamp)

export function XYPadControl({ control }: any) {
  const ref = React.useRef<SVGElement>();
  const [{ width, height }, set] = React.useState({ width: 0, height: 0 });
  const [lines, setLines] = useSpring(() => ({ x: 0, y: 0, config: { tension: 230, friction: 20 } }));
  const [cursor, setCursor] = useSpring(() => ({ x: 0, y: 0, config: { tension: 210, friction: 20 } }));
  const { distance = 1, infinite = false } = control.config;
  const bind = useDrag(({ down, movement }) => {
    // visual update
    setLines({ x: down ? movement[0] : 0, y: down ? movement[1] : 0 });
    setCursor({ x: down ? movement[0] : 0, y: down ? movement[1] : 0 });

    if (infinite) {
      // todo
    }

    control.set(() => ({
      x: clamp(map(movement[0], 0, width, 0, distance), -distance, distance),
      y: clamp(map(movement[1], 0, height, 0, distance), -distance, distance)
    }));
  })

  React.useLayoutEffect(() => {
    if (ref.current && !width) {
      set(ref.current.getBoundingClientRect());
    }
  })

  const x = lines.x.to(n => clamp(n + width / 2, 0, width));
  const y = lines.y.to(n => clamp(n + height / 2, 0, height));

  return (
    <BaseControl stack label={control.name} value={`x: ${control.value.x.toFixed(1)}, y: ${control.value.y.toFixed(1)}`}>
      <a.svg ref={ref as any} style={{ userSelect: 'none', borderRadius: 8, border: '1px solid #f0f0f0' }} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" {...bind()}>
        <rect fill="rgb(250, 250, 250)" width="100%" height="100%" />
        <a.line x1={x} x2={x} y1={0} y2="100%" stroke="#ccc" />
        <a.line x1={0} x2="100%" y1={y} y2={y} stroke="#ccc" />
        <a.g style={{ transform: to([cursor.x, cursor.y], (x, y) => `translate(${clamp(x + width / 2, 0, width)}px, ${clamp(y + height / 2, 0, height)}px)`) }}>
          <circle r={8} fill="#ccc" />
          <circle r={4} fill="#aaa" />
        </a.g>
      </a.svg>
    </BaseControl>
  );
}