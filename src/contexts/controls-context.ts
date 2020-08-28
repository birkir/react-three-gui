import { createContext, RefObject, SetStateAction } from 'react';
import { ControlItem } from 'types';

interface IControlsContext {
  values: RefObject<Map<string, any>>;
  gui: RefObject<Map<string, SetStateAction<any>>>;
  state: RefObject<Map<string, SetStateAction<any>>>;
  controls: ControlItem[];
  addControl(control: ControlItem): ControlItem;
  removeControl(control: ControlItem): any;
}

export const ControlsContext = createContext<IControlsContext>({
  values: { current: new Map() },
  gui: { current: new Map() },
  state: { current: new Map() },
  controls: [],
  addControl(control: ControlItem) {
    return control;
  },
  removeControl() {},
});
