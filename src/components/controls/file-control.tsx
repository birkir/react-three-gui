import React from 'react';
import styled from 'styled-components';
import { BaseControl } from './base-control';
import { ControlComponentProps, ControlOptionsFile } from '../../types';
import * as THREE from 'three';

const FileInput = styled.input`
  width: 100%;
`;

export const FileControl = ({
  name,
  setValue,
  options,
}: ControlComponentProps<ControlOptionsFile>) => {
  return (
    <BaseControl label={name}>
      <FileInput
        type="file"
        onChange={e => {
          const loader = options.loader ?? new THREE.FileLoader();
          if ((loader as any).setCrossOrigin) {
            (loader as THREE.TextureLoader).setCrossOrigin('');
          }
          const file = e.currentTarget.files && e.currentTarget.files[0];
          const texture = loader.load(URL.createObjectURL(file));
          setValue(texture);
        }}
      />
    </BaseControl>
  );
};
