import React, { useContext } from 'react';
import { ControlsProvider, Canvas } from './controls-provider';
import styled from 'styled-components';
import { animated, useSpring, to } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';
import useMeasure from 'react-use-measure';
import { clamp } from '../utils';
import { DEFAULT_GROUP } from '../types';
import { ControlsContext } from '../contexts/controls-context';
import { useLocalStorage } from '../hooks/use-local-storage';
import { ControlGroup } from './control-group';

const mq = `@media only screen and (max-width: 600px)`;

interface FloatProps {
  'data-width': number;
  'data-anchor': ControlsAnchor | string;
}

export enum ControlsAnchor {
  TOP_LEFT = 'top_left',
  TOP_RIGHT = 'top_right',
  BOTTOM_LEFT = 'bottom_left',
  BOTTOM_RIGHT = 'bottom_right',
}

export interface ControlsProps {
  /**
   * Title to show on the controls
   */
  title?: string;
  /**
   * Collapsed by default
   */
  collapsed?: boolean;
  /**
   * Array of group names as strings
   */
  defaultClosedGroups?: string[];
  /**
   * Defaults to 300
   */
  width?: number;
  /**
   * Anchor point
   */
  anchor?:
    | ControlsAnchor
    | 'top_left'
    | 'bottom_left'
    | 'top_right'
    | 'bottom_right';
  /**
   * Styles
   */
  style?: any;
}

function posProps(positions: ControlsAnchor[]) {
  return function posPropsFn(props: any) {
    return positions.includes(props['data-anchor']) ? '16px' : 'auto';
  };
}

const Float = styled(animated.div)<FloatProps>`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: ${posProps([ControlsAnchor.TOP_LEFT, ControlsAnchor.TOP_RIGHT])};
  right: ${posProps([ControlsAnchor.BOTTOM_RIGHT, ControlsAnchor.TOP_RIGHT])};
  bottom: ${posProps([
    ControlsAnchor.BOTTOM_RIGHT,
    ControlsAnchor.BOTTOM_LEFT,
  ])};
  left: ${posProps([ControlsAnchor.TOP_LEFT, ControlsAnchor.BOTTOM_LEFT])};
  width: ${props => props['data-width']}px;
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
  position: relative;
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
  ${mq} {
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }
`;

const Items = styled(animated.div)`
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

interface ControlsFn {
  (props: ControlsProps): JSX.Element;
  Provider: typeof ControlsProvider;
  Canvas: typeof Canvas;
}

export const Controls: ControlsFn = (props: ControlsProps) => {
  const {
    title = 'react-three-gui',
    defaultClosedGroups = [],
    width = 300,
    style = {},
    anchor = ControlsAnchor.TOP_RIGHT,
  } = props;
  const { controls } = useContext(ControlsContext);
  const [collapsed, setCollapsed] = useLocalStorage(
    'REACT_THREE_GUI__COLLAPSED',
    props.collapsed
  );
  const [position, setPosition] = useLocalStorage(
    `REACT_THREE_GUI__${anchor}`,
    [0, 0]
  );
  const [ref, bounds] = useMeasure();
  const [{ pos }, setPos] = useSpring(() => ({
    pos: position,
    onRest({ value }) {
      setPosition(value);
    },
  }));
  const left = [ControlsAnchor.TOP_LEFT, ControlsAnchor.BOTTOM_LEFT].includes(
    anchor as any
  );
  const top = [ControlsAnchor.TOP_RIGHT, ControlsAnchor.TOP_LEFT].includes(
    anchor as any
  );
  const bind = useDrag(
    ({
      movement,
      memo = pos
        ? (pos as any).getValue
          ? (pos as any).getValue()
          : (pos as any).get()
        : 0,
    }) => {
      const [x, y] = [movement[0] + memo[0], movement[1] + memo[1]];
      setPos({
        pos: [
          left
            ? clamp(x, 1, window.innerWidth - width - 32)
            : clamp(x, -window.innerWidth + width + 32, 1),
          top
            ? clamp(y, 1, window.innerHeight)
            : clamp(y, -window.innerHeight + bounds.height + 32, 1),
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
      data-width={width}
      data-anchor={anchor}
      ref={ref}
      style={{
        ...style,
        transform: to(
          [pos] as any,
          ([x, y]) => `translate3d(${x}px,${y}px,0)` as any
        ),
      }}
    >
      <Header data-collapsed={collapsed} {...bind()}>
        {title}
        <CollapseIcon
          collapsed={collapsed}
          onClick={() => setCollapsed((c: boolean) => !c)}
        />
      </Header>
      <Items
        hidden={!collapsed}
        style={{
          maxHeight: top
            ? to([pos] as any, ([_, y]) => `calc(100vh - ${y + 92}px)` as any)
            : undefined,
        }}
      >
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

Controls.Provider = ControlsProvider;
Controls.Canvas = Canvas;
