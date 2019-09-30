import { RefObject, Dispatch, SetStateAction } from 'react';
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
  value?: string;
};

type ControlConfigButton = {
  type: 'button';
  onClick?(): void;
};

type ControlConfigBoolean = {
  type: 'boolean';
  value?: boolean;
};

type ControlConfigSelect = {
  type: 'select';
  items: string[];
  value?: string;
};

type ControlConfigColor = {
  type: 'color';
  value?: string;
};

type ControlConfigXYPad = {
  type: 'xypad';
  value?: { x: number; y: number };
  distance?: number;
};

type ControlConfigCustom = {
  type: 'custom';
  component?: any;
};

type ControlConfigBase = {
  value?: any;
  spring?: boolean | SpringConfig;
  group?: string;
  state?: [any, Dispatch<SetStateAction<any>>];
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
