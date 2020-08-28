import React from 'react';
import styled from 'styled-components';

type SCProps = {
  stack?: boolean;
  flexLabel?: boolean;
};

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 0;
`;

const Label = styled.label<SCProps>`
  display: flex;
  font-family: sans-serif;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
  width: 56px;
  user-select: none;
  ${props => (props.flexLabel === true ? 'flex: 1;' : '')}
`;

const Content = styled.div<SCProps>`
  display: flex;
  ${props => (props.flexLabel !== true ? 'flex: 1;' : '')}
  justify-content: flex-end;
  padding: 0 8px;
`;

const Value = styled.div<SCProps>`
  display: flex;
  font-family: sans-serif;
  white-space: nowrap;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.75);
  justify-content: flex-end;
  ${props => (props.stack ? 'flex: 1;' : '')}
  ${props => (props.stack ? '' : 'width: 42px;')}
`;

type BaseControlProps = {
  label?: string;
  flexLabel?: boolean;
  value?: string;
  children?: any;
  stack?: boolean;
  htmlFor?: any;
};

export function BaseControl({
  htmlFor,
  label,
  flexLabel,
  value,
  stack,
  children,
}: BaseControlProps) {
  if (stack) {
    return (
      <div>
        <Row>
          <Label flexLabel={flexLabel}>{label}</Label>
          <Value stack flexLabel={flexLabel}>
            {value}
          </Value>
        </Row>
        {children}
      </div>
    );
  }

  return (
    <Row>
      <Label flexLabel={flexLabel} htmlFor={htmlFor}>
        {label}
      </Label>
      <Content flexLabel={flexLabel}>{children}</Content>
      {typeof value !== 'undefined' && <Value>{value}</Value>}
    </Row>
  );
}
