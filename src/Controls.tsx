import React, { useEffect, useState } from 'react';
import { animated, interpolate, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import styled from 'styled-components';
import { ControlGroup } from './components/ControlGroup';
import { controls, controlsEmitter } from './index';
import { clamp } from './utils';

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
  padding-bottom: 8px;
`;

const DEFAULT_GROUP = 'DEFAULT_GROUP';

const groupByGroup = (items: any): any => {
  return Array.from(items).reduce((acc: any, item: any) => {
    const groupName = item[1].config.group || DEFAULT_GROUP;
    acc[groupName] = acc[groupName] || [];
    acc[groupName].push(item);
    return acc;
  }, {} as { [key: string]: any });
}

export const Controls = React.memo(() => {
  const [{ pos }, setPos] = useSpring(() => ({ pos: [0, 0] }));
  const bind = useDrag(({ movement, memo = ((pos as any).getValue ? (pos as any).getValue() : (pos as any).get()) }) => {
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
        {Object.entries(groupByGroup(controls)).map(([groupName, items]: any) => (
          <ControlGroup key={groupName} title={groupName} controls={items} />
        ))}
      </Items>
    </Float>
  );
});
