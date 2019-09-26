import React from 'react';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 0;
`;

const Label = styled.label`
  display: flex;
  font-family: sans-serif;
  font-size: 14px;
  color: rgba(0,0,0,0.4);
  width: 56px;
  user-select: none;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  padding: 0 8px;
`;

const Value = styled.div<{ stack?: boolean }>`
  display: flex;
  font-family: sans-serif;
  white-space: nowrap;
  font-size: 14px;
  color: rgba(0,0,0,0.75);
  justify-content: flex-end;
  ${props => props.stack ? 'flex: 1;' : ''}
  ${props => props.stack ? '' : 'width: 42px;'}
`;

type BaseControlProps = {
  label?: string;
  value?: string;
  children?: any;
  stack?: boolean;
  htmlFor?: any;
}

export function BaseControl({ htmlFor, label, value, stack, children }: BaseControlProps) {
  if (stack) {
    return (
      <div>
        <Row>
          <Label>{label}</Label>
          <Value stack>{value}</Value>
        </Row>
        {children}
      </div>
    );
  }

  return (
    <Row>
      <Label htmlFor={htmlFor}>{label}</Label>
      <Content>
        {children}
      </Content>
      {typeof value !== 'undefined' && <Value>{value}</Value>}
    </Row>
  )
}