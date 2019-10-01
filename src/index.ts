import { ControlId, ControlItem } from './types';
export { Controls } from './Controls';
export { useControl } from './hooks/useControl';
export const controlsEmitter = { update: () => null };
export const controls = new Map<ControlId, ControlItem>();
