import React, { useState, useRef } from 'react';
import { ControlsContext } from '../contexts/controls-context';
// import { Canvas } from 'react-three-fiber';
import { ControlItem } from 'types';
import { isMemo } from 'react-is';

const mapCanvasNode = (
  children: React.ReactElement,
  value: any
): React.ReactElement[] => {
  return React.Children.map(children, item => {
    if (!item || !item.props) {
      return null;
    }

    const isCanvas =
      // item.type === Canvas ||
      (isMemo(item) && (item.type as any)?.type?.name === 'Canvas');

    const childs = isCanvas ? (
      <ControlsContext.Provider value={value}>
        {item.props.children}
      </ControlsContext.Provider>
    ) : (
        mapCanvasNode(item.props.children, value)
      );

    return React.cloneElement(item, {
      ...item.props,
      children: childs,
    });
  });
};

export const ControlsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [controls, setControls] = useState<ControlItem[]>([]);
  // Persist values between reloads
  const values = useRef(new Map());
  // GUI control state setters
  const gui = useRef(new Map());
  // useControl state setters
  const state = useRef(new Map());

  const context = {
    values,
    gui,
    state,
    controls,
    addControl: (control: ControlItem) => {
      control.id = String(Math.random());
      setControls(ctrls => {
        // control.id = control.id ?? String(ctrls.length);
        return [...ctrls, control];
      });
      return control;
    },
    removeControl: (ctrl: ControlItem) => {
      setControls(ctrls => ctrls.filter(c => c.id !== ctrl.id));
    },
  };

  const childs = mapCanvasNode(children as React.ReactElement, context);

  return (
    <ControlsContext.Provider value={context}>
      {childs}
    </ControlsContext.Provider>
  );
};
