import { ControlId, ControlItem } from 'types';
export { useControl } from './hooks/useControl';
export { Controls } from './Controls';
export const controlsEmitter = { update: () => null };
export const controls = new Map<ControlId, ControlItem>();