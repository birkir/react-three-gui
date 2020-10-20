import React, { useState, useRef } from 'react';
import { ControlsContext } from '../contexts/controls-context';
import { Canvas as R3FCanvas } from 'react-three-fiber';
import { ControlItem } from 'types';

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

  return (
    <ControlsContext.Provider value={context}>
      {children}
    </ControlsContext.Provider>
  );
};

export function withControls(CanvasEl: typeof R3FCanvas) {
  return ({ children, ...props }: any) => (
    <ControlsContext.Consumer>
      {value => (
        <CanvasEl {...props}>
          <ControlsContext.Provider value={value}>
            {children}
          </ControlsContext.Provider>
        </CanvasEl>
      )}
    </ControlsContext.Consumer>
  );
}

export const Canvas = withControls(R3FCanvas);
