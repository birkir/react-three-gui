import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { BaseControl } from './BaseControl';

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
    background: #f7f9fa;
    border-radius: 10px;
  }

  &::-webkit-slider-thumb {
    border: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #ffffff;
    cursor: pointer;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,.22);
    -webkit-appearance: none;
    margin-top: -4px;
  }

  &:focus::-webkit-slider-runnable-track {
    outline: none;
  }
`;

const PRECISION = 300;
const CENTER = PRECISION / 2;

const map = (value: number, x1: number, y1: number, x2: number, y2: number) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;
const clamp = (num: number, clamp: number, higher: number) => higher ? Math.min(Math.max(num, clamp), higher) : Math.min(num, clamp)

export function NumberControl({ control }: any) {
  const ref = useRef<HTMLInputElement | null>(null);
  const stage = useRef(null);
  const { config } = control;
  const [value, setValue] = useState(config.scrub ? CENTER : control.value);
  const { min = 0, max = Math.PI, distance = Math.PI } = config;

  const handleChange = () => {
    if (config.scrub) {
      setValue(CENTER);
      stage.current = null;
    }
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('change', handleChange);
    }
  }, [ref]);

  useEffect(() => {
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('change', handleChange);
      }
    }
  }, []);

  return (
    <BaseControl label={control.name} value={control.value.toFixed(2)}>
      <InputRange
        ref={ref}
        type="range"
        value={value}
        min={0}
        max={PRECISION}
        onChange={e => {
          const num = Number(e.currentTarget.value);
          setValue(num);
          if (stage.current === null) {
            stage.current = control.value;
          }
          const value = (stage as any).current + map(num - (config.scrub ? CENTER : 0), 0, PRECISION, 0, (config.scrub ? distance * 2 : distance));
          control.set(clamp(value, min, max));
        }}
      />
    </BaseControl>
  );
}