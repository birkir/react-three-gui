import { Dispatch, RefObject, SetStateAction } from 'react';
import { SpringConfig } from 'react-spring/three';

export type ControlId = RefObject<number>;

export type ControlItem = {
  id: ControlId;
  name: string;
  set: any;
  value: any;
  config: ControlConfig;
  addEventListener: any;
};

type ControlConfigNumber = {
  type: 'number';
  /* Minimum value */
  min?: number;
  /* Maximum value */
  max?: number;
  /* Initial value */
  value?: number;
  /* Slider distance */
  distance?: number;
  /* Scrub value in both directions */
  scrub?: boolean;
};

type ControlConfigString = {
  type: 'string';
  /* Initial value */
  value?: string;
};

type ControlConfigButton = {
  type: 'button';
  /* Fired on button click */
  onClick?(): void;
};

type ControlConfigBoolean = {
  type: 'boolean';
  value?: boolean;
};

type ControlConfigSelect = {
  type: 'select';
  /* List of items to select from */
  items: string[];
  /* Initial value */
  value?: string;
};

type ControlConfigColor = {
  type: 'color';
  /* Initial value as HEX code */
  value?: string;
};

type ControlConfigXYPad = {
  type: 'xypad';
  /* Initial value as { x, y } object */
  value?: { x: number; y: number };
  /* Pad drag distance */
  distance?: number;
};

type ControlConfigCustom = {
  type: 'custom';
  /* Custom React component */
  component?: any;
};

type ControlConfigBase = {
  value?: any;
  /* Return useSpring instead of useState */
  spring?: boolean | SpringConfig;
  /* Group this control */
  group?: string;
  /* Use your own state */
  state?: [any, Dispatch<SetStateAction<any>>];
  /* onChange callback */
  onChange?(value: any): void;
};

export type ControlConfig = ControlConfigBase &
  (
    | ControlConfigCustom
    | ControlConfigNumber
    | ControlConfigBoolean
    | ControlConfigString
    | ControlConfigButton
    | ControlConfigColor
    | ControlConfigSelect
    | ControlConfigXYPad);
