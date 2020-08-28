import styled from 'styled-components';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { clamp, map } from '../../utils';
import { BaseControl } from './base-control';
import { ControlComponentProps, ControlOptionsNumber } from '../../types';

const InputRange = styled.input`
  -webkit-appearance: none;
  width: 100%;
  background: transparent;
  display: inline-block;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 12px;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.045);
    border-radius: 10px;
  }

  &::-webkit-slider-thumb {
    border: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #ffffff;
    cursor: pointer;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.22);
    -webkit-appearance: none;
    margin-top: -4px;
  }

  &:focus::-webkit-slider-runnable-track {
    outline: none;
  }
`;

const PRECISION = 300;
const CENTER = PRECISION / 2;

export const NumberControl = ({
  name,
  value,
  setValue,
  options,
}: ControlComponentProps<ControlOptionsNumber>) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const stage = useRef(null);
  const {
    min = options.scrub ? -Infinity : 0,
    max = options.scrub ? Infinity : Math.PI,
  } = options;

  const distance = options.distance ?? options.scrub ? 2 : max - min;

  const [val, setVal] = useState(
    options.scrub ? CENTER : map(value, min, max, 0, PRECISION)
  );

  const handleChange = useCallback(() => {
    if (options.scrub) {
      setVal(CENTER);
      stage.current = null;
    }
  }, [options.scrub]);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.addEventListener('change', handleChange);
    }
    return () => {
      if (el) {
        el.removeEventListener('change', handleChange);
      }
    };
  }, [handleChange, ref]);

  return (
    <BaseControl label={name} value={(value || 0).toFixed(2)}>
      <InputRange
        ref={ref}
        type="range"
        value={val}
        min={0}
        max={PRECISION}
        onChange={e => {
          const num = Number(e.target.value);
          setVal(num);
          if (stage.current === null) {
            stage.current = value;
          }
          const cvalue =
            (options.scrub ? (stage as any).current : 0) +
            map(
              num - (options.scrub ? CENTER : 0),
              0,
              PRECISION,
              options.scrub ? 0 : min,
              options.scrub ? distance * 2 : max
            );
          setValue(clamp(cvalue, min, max));
        }}
      />
    </BaseControl>
  );
};
