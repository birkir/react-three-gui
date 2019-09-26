import { ControlConfig } from 'types';

export const defaultConfig = {
  type: 'number' as 'number',
  value: 0,
};

export const defaultValue = (config: ControlConfig) => {
  switch (config.type) {
    case 'number': return 0;
    case 'color': return '#ff0000';
    case 'string': return '';
    case 'select': return (config.items || [''])[0];
    case 'boolean': return false;
    case 'xypad': return { x: 0, y: 0 };
  }
  return 0;
}
