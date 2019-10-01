import React from 'react';
import styled from 'styled-components';
import { BaseControl } from './BaseControl';

const Input = styled.input`
  display: block;

  font-family: sans-serif;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);

  display: block;
  position: relative;

  width: 100%;
  height: 32px;

  color: #000;

  margin-left: 8px;

  border: 0;
  background-color: #fafafa;
  border-radius: 4px;
  padding: 0 4px;
`;

export const StringControl = React.memo(({ control, value }: any) => {
  // const [val, setVal] = React.useState(control.value);
  // React.useEffect(() => {
  //   setVal(value);
  //   control.set(value);
  // }, [value]);
  return (
    <BaseControl label={control.name}>
      <Input value={value} onChange={e => control.set(e.target.value)} />
    </BaseControl>
  );
});
