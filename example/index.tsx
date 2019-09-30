import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Canvas } from 'react-three-fiber';
import { a } from 'react-spring/three';
import { Controls, useControl } from '../src';
import * as THREE from 'three';

const Box = () => {
  const rotationX = useControl('Rotate X', { type: 'number', spring: true });
  const rotationY = useControl('Rotate Y', {
    type: 'number',
    scrub: true,
    spring: {
      friction: 2,
      mass: 2,
    },
  });
  const color = useControl('Material color', {
    type: 'color',
  });
  const position = useControl('Position', {
    type: 'xypad',
    value: { x: 0, y: 0 },
    distance: Math.PI,
  });
  const bool = useControl('Allowed', {
    type: 'boolean',
  });
  const dropdown = useControl('Pick one', {
    type: 'select',
    items: ['foo', 'bar', 'baz']
  });
  const btn = useControl('Clicky', {
    type: 'button',
    onClick() {
      alert('Hello world');
    }
  });

  const MyControl = ({ control, value }) => (
    <label>Test:
      <input
        type="number"
        onChange={e => control.set(e.currentTarget.value)}
        value={value}
      />
    </label>
  );

  const size = useControl('Test', {
    value: 1,
    component: MyControl
  });

  const ref = React.useRef<THREE.Mesh>();
  return (
    <a.mesh ref={ref} position={[position.x, position.y, 0]} rotation-x={rotationX} rotation-y={rotationY}>
      <boxGeometry attach="geometry" args={[size, size, size]} />
      <a.meshStandardMaterial attach="material" color={color} />
    </a.mesh>
  )
}

const App = () => {
  return (
    <div>
      <Canvas style={{ width: 800, height: 600 }}>
        <ambientLight intensity={1} />
        <pointLight position={[0, 2, 2]} />
        <Box />
      </Canvas>
      <Controls />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
