import { useRef, useState, useEffect } from 'react';
import { ControlConfig, ControlItem } from '../types';
import { defaultConfig, defaultValue } from '../utils';
import { controls, controlsEmitter } from '../index';
import { useSpring } from 'react-spring/three';

let uid = 0;

export const useControl = (name: string, config: ControlConfig = defaultConfig) => {
  const id = useRef(uid++);
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
    const control: ControlItem = { id, name, set, value, config };
    // const shouldUpdate = !controls.has(id) || controls.get(id)!.config === config;
    controls.set(id, control);
    controlsEmitter.update();
  }, [id, name, config, value]);

  useEffect(() => {
    config.spring && void setSpring({ value });
  }, [value]);

  if (config.spring) {
    return spring.value;
  }

  return value;
};
