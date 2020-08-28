import React from "react";
import styled from "styled-components";
import { BaseControl } from "./base-control";
import { ControlComponentProps, ControlOptionsBoolean } from "../../types";

const FakeCheckbox = styled.label`
  height: 16px;
  width: 16px;
  border: 2px solid rgba(0, 0, 0, 0.065);
  border-radius: 4px;
  position: relative;
  margin-top: -1px;
  transition: ease-in-out 125ms;
  transition-property: background-color, border-color;
`;

const Checkbox = styled.input`
  opacity: 0;
  margin-right: -15px;
  & + ${FakeCheckbox}:after {
    position: absolute;
    content: "";
    display: inline-block;
    height: 4px;
    width: 8px;
    border-left: 2px solid;
    border-bottom: 2px solid;
    left: 3px;
    top: 4px;
    opacity: 0;
    transform: translate(0px, 2px) rotate(-45deg);
    transition: ease-in-out 125ms;
    transition-property: opacity, transform;
  }
  &:checked + ${FakeCheckbox}:after {
    opacity: 1;
    transform: translate(0px, 0px) rotate(-45deg);
  }
  &:checked + ${FakeCheckbox} {
    background: rgba(0, 0, 0, 0.045);
    border-color: rgba(0, 0, 0, 0.085);
  }
`;

export function BooleanControl({
  id,
  name,
  value,
  setValue
}: ControlComponentProps<ControlOptionsBoolean>) {
  const htmlFor = `Control${id}`;
  return (
    <BaseControl flexLabel label={name} htmlFor={htmlFor}>
      <Checkbox
        id={htmlFor}
        type="checkbox"
        checked={value}
        onChange={(e) => setValue(e.currentTarget.checked)}
      />
      <FakeCheckbox htmlFor={htmlFor} />
    </BaseControl>
  );
}
