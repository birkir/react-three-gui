import { Dispatch, SetStateAction, MouseEvent } from 'react';
import { SpringConfig } from '@react-spring/three';

export const DEFAULT_GROUP = 'DEFAULT_GROUP';

export type ControlItem = {
  id: string;
  name: string;
  value: any;
  options: ControlOptions;
};

export enum ControlType {
  NUMBER = 'number',
  STRING = 'string',
  BUTTON = 'button',
  BOOLEAN = 'boolean',
  SELECT = 'select',
  COLOR = 'color',
  XYPAD = 'xypad',
  FILE = 'file',
  CUSTOM = 'custom',
}

export type ControlComponentProps<T> = ControlItem & {
  setValue(value: any): void;
  options: T;
};

export type ControlOptionsBase = {
  /** Unique id for control */
  id?: string;
  /* The control type */
  type: ControlType | string;
  /** Default value */
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

export type ControlOptionsNumber = {
  type: ControlType.NUMBER | 'number';
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

export type ControlOptionsString = {
  type: ControlType.STRING | 'string';
  /* Initial value */
  value?: string;
};

export type ControlOptionsFile = {
  type: ControlType.FILE | 'file';
  /* Initial value */
  value?: string;
  /** Loader */
  loader?: {
    load(url: string): any;
  };
};

export type ControlOptionsButton = {
  type: ControlType.BUTTON | 'button';
  /* Fired on button click */
  onClick?(e: MouseEvent<HTMLButtonElement>): any;
};

export type ControlOptionsBoolean = {
  type: ControlType.BOOLEAN | 'boolean';
  value?: boolean;
};

export type ControlOptionsSelect = {
  type: ControlType.SELECT | 'select';
  /* List of items to select from */
  items: string[];
  /* Initial value */
  value?: string;
};

export type ControlOptionsColor = {
  type: ControlType.COLOR | 'color';
  /* Initial value as HEX code */
  value?: string;
  /* Show picker as inline */
  inline?: boolean;
  /* What kind of picker. Default Chrome */
  picker?:
    | 'chrome'
    | 'sketch'
    | 'hue'
    | 'alpha'
    | 'block'
    | 'github'
    | 'twitter'
    | 'circle'
    | 'material'
    | 'compact'
    | 'slider'
    | 'swatches';
  /* Disable alpha */
  disableAlpha?: boolean;
  /* Custom set of colors */
  colors?: string[];
};

export type ControlOptionsXYPad = {
  type: ControlType.XYPAD | 'xypad';
  /* Initial value as { x, y } object */
  value?: { x: number; y: number };
  /* Pad drag distance */
  distance?: number;
  /* Scrub value in both directions */
  scrub?: boolean;
};

export type ControlOptionsCustom = {
  type: ControlType.CUSTOM | 'custom';
  /* Custom React component */
  component?: any;
};

export type ControlOptions = ControlOptionsBase &
  (
    | ControlOptionsCustom
    | ControlOptionsNumber
    | ControlOptionsBoolean
    | ControlOptionsString
    | ControlOptionsButton
    | ControlOptionsColor
    | ControlOptionsSelect
    | ControlOptionsFile
    | ControlOptionsXYPad
  );
