import React, { useContext } from 'react';
import styled from 'styled-components';
import { animated, useSpring, to } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';
import { clamp } from '../utils';
import { DEFAULT_GROUP } from '../types';
import { ControlsContext } from '../contexts/controls-context';
import { useLocalStorage } from '../hooks/use-local-storage';
import { ControlGroup } from './control-group';

const mq = `@media only screen and (max-width: 600px)`;

const WIDTH = 300;

const Float = styled(animated.div)`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 16px;
  right: 16px;
  width: ${WIDTH}px;
  border-radius: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.12);

  ${mq} {
    transform: none !important;
    flex-direction: column-reverse;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    width: auto;
  }
`;

const Header = styled(animated.div)<{ 'data-collapsed': boolean }>`
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
  border-bottom-left-radius: ${props => (props['data-collapsed'] ? 0 : 8)}px;
  border-bottom-right-radius: ${props => (props['data-collapsed'] ? 0 : 8)}px;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.14);
  ${mq} {
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
`;

const CollapseIcon = styled.div<{ collapsed: boolean }>`
  width: 30px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  cursor: pointer;
  &:after {
    content: '';
    display: block;
    height: 3px;
    width: 16px;
    background-color: white;
  }
`;

const Items = styled.div`
  padding-bottom: 8px;
  overflow-y: auto;
  max-height: calc(100vh - 42px);
`;

const groupByGroup = (items: any): any => {
  return Array.from(items).reduce((acc: any, item: any) => {
    const groupName = item?.options?.group || DEFAULT_GROUP;
    acc[groupName] = acc[groupName] || [];
    acc[groupName].push(item);
    return acc;
  }, {} as { [key: string]: any });
};

export interface ControlsProps {
  title?: string;
  collapsed?: boolean;
  defaultClosedGroups?: string[];
}

export const Controls = (props: ControlsProps) => {
  const { title = 'react-three-gui', defaultClosedGroups = [] } = props;
  const { controls } = useContext(ControlsContext);
  const [collapsed, setCollapsed] = useLocalStorage(
    'REACT_THREE_GUI__COLLAPSED',
    props.collapsed
  );
  const [{ pos }, setPos] = useSpring(() => ({ pos: [0, 0] }));
  const bind = useDrag(
    ({
      movement,
      memo = pos
        ? (pos as any).getValue
          ? (pos as any).getValue()
          : (pos as any).get()
        : 0,
    }) => {
      setPos({
        pos: [
          clamp(movement[0] + memo[0], -window.innerWidth + WIDTH + 32, 1),
          clamp(movement[1] + memo[1], 0, window.innerHeight - 350),
        ],
      });
      return memo;
    }
  );

  const getGroupOptions = (groupName: string): any => {
    return {
      defaultClosed: defaultClosedGroups?.includes(groupName) ?? false,
    };
  };

  const groups = groupByGroup(controls);

  return (
    <Float
      style={
        pos?.get && {
          transform: to([pos], ([x, y]) => `translate3d(${x}px,${y}px,0)`),
        }
      }
    >
      <Header data-collapsed={collapsed} {...bind()}>
        {title}
        <CollapseIcon
          collapsed={collapsed}
          onClick={() => setCollapsed((c: boolean) => !c)}
        />
      </Header>
      <Items hidden={!collapsed}>
        {Object.entries(groups).map(([groupName, items]: any) => (
          <ControlGroup
            key={groupName}
            title={groupName}
            controls={items}
            options={getGroupOptions(groupName)}
          />
        ))}
      </Items>
    </Float>
  );
};
