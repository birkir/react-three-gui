import { ControlOptions, ControlType } from './types';
import * as THREE from 'three';

export const defaultOptions: ControlOptions = {
  type: ControlType.NUMBER,
  value: 0,
};

export const defaultValue = (options: ControlOptions) => {
  if (options.hasOwnProperty('value')) {
    return options.value;
  }

  switch (options.type) {
    case ControlType.NUMBER:
      return 0;
    case ControlType.COLOR:
      return '#ff0000';
    case ControlType.STRING:
      return '';
    case ControlType.SELECT:
      return (options.items || [''])[0];
    case ControlType.BOOLEAN:
      return false;
    case ControlType.FILE:
      return new THREE.FileLoader();
    case ControlType.XYPAD:
      return { x: 0, y: 0 };
  }

  return undefined;
};

export const clamp = (num: number, clamp: number, higher: number) =>
  higher ? Math.min(Math.max(num, clamp), higher) : Math.min(num, clamp);

export const map = (
  value: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;
