import { useRef, useState, useEffect } from 'react';
import { ControlConfig, ControlItem } from '../types';
import { defaultConfig, defaultValue } from '../utils';
import { controls, controlsEmitter } from '../index';
import { useSpring } from 'react-spring/three';

let uid = 0;

export const useControl = (
  name: string,
  config: ControlConfig = defaultConfig
) => {
  const id = useRef(uid++);
  const listener = useRef<Function>();
  let [value, set] = useState(defaultValue(config));

  const [spring, setSpring] = useSpring(() => ({
    value,
    config: typeof config.spring === 'object' ? config.spring : undefined,
  }));

  if (config.state) {
    value = config.state[0];
    set = config.state[1];
  }

  useEffect(() => {
    const control: ControlItem = {
      id,
      name,
      set,
      value,
      config,
      addEventListener(fn: Function) {
        listener.current = fn;
      },
    };
    controls.set(id, control);
    controlsEmitter.update();
    return () => {
      controls.delete(id);
    };
  }, [config, name, value]);

  useEffect(() => {
    config.spring && void setSpring({ value });
    listener.current && void listener.current(value);
  }, [config.spring, setSpring, value]);

  if (config.spring) {
    return spring.value;
  }

  return value;
};
