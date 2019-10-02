import * as React from 'react';
import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import { a } from 'react-spring/three';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';
import { Controls, useControl } from '../src';
import fontFile from './resources/unknown';

function Text({ children, size = 1, letterSpacing = 0.01, color = '#000000' }) {
  const [font] = React.useState(() => new THREE.FontLoader().parse(fontFile))
  const [shapes, [x, y]] = React.useMemo(() => {
    let x = 0,
      y = 0
    let letters = [...children]
    let mat = new THREE.MeshBasicMaterial({ color, opacity: 1, transparent: true })
    return [
      letters.map(letter => {
        const geom = new THREE.ShapeGeometry(font.generateShapes(letter, size, 1))
        geom.computeBoundingBox()
        const mesh = new THREE.Mesh(geom, mat)
        mesh.position.x = x
        x += geom.boundingBox.max.x + letterSpacing
        y = Math.max(y, geom.boundingBox.max.y)
        return mesh
      }),
      [x, y],
    ]
  }, [children])

  return (
    <group position={[-x / 2, -y / 2, 0]}>
      {shapes.map((shape, index) => (
        <primitive key={index} object={shape} />
      ))}
    </group>
  )
}

const Next = () => {
  const rotationX = useControl('Mega', { group: 'Test', type: 'number', spring: true });
  return (
    <a.mesh position={[1.5, 0, 0]} rotation-x={rotationX}>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" />
    </a.mesh>
  )
};

const Box = () => {
  const rotationX = useControl('Rotate X', { group: 'Basic', type: 'number', spring: true });
  const rotationY = useControl('Rotate Y', {
    type: 'number',
    group: 'Basic',
    scrub: true,
    min: 0,
    max: 20,
    distance: 10,
    spring: {
      friction: 2,
      mass: 2,
    },
  });
  const color = useControl('Material color', {
    type: 'color',
    group: 'Basic',
  });
  const position = useControl('Position', {
    group: 'More',
    type: 'xypad',
    value: { x: 0, y: 0 },
    distance: Math.PI,
  });
  const bool = useControl('Allowed', {
    group: 'More',
    type: 'boolean',
  });
  const dropdown = useControl('Pick one', {
    group: 'More',
    type: 'select',
    items: ['foo', 'bar', 'baz']
  });
  const str = useControl('Text', {
    group: 'More',
    type: 'string',
    value: 'example',
  });
  const btn = useControl('Clicky', {
    group: 'More',
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
    group: 'More',
    type: 'custom',
    value: 1,
    component: MyControl
  });

  const ref = React.useRef<THREE.Mesh>();
  return (
    <>
      <a.mesh
        ref={ref}
        position={[position.x, position.y, 0]}
        rotation-x={rotationX}
        rotation-y={rotationY}
      >
        <boxGeometry attach="geometry" args={[size, size, size]} />
        <a.meshStandardMaterial attach="material"
          color={color}
        />
      </a.mesh>
      <Text>{str}</Text>
      {dropdown === 'bar' && <Next />}
    </>
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
