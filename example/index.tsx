import * as React from 'react';
import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import { animated } from 'react-spring';
import { a } from '@react-spring/three';
import { Canvas, useLoader } from 'react-three-fiber';
import * as THREE from 'three';
import { Controls, ControlsProvider, useControl, BaseControl } from '../src';
import fontFile from './resources/unknown';
import { useEffect } from 'react';

function Text({ children, size = 1, letterSpacing = 0.01, color = '#000000' }) {
  const [font] = React.useState(() => new THREE.FontLoader().parse(fontFile));
  const [shapes, [x, y]] = React.useMemo(() => {
    let x = 0,
      y = 0;
    let letters = [...children];
    let mat = new THREE.MeshBasicMaterial({
      color,
      opacity: 1,
      transparent: true,
    });
    return [
      letters.map(letter => {
        const geom = new THREE.ShapeGeometry(font.generateShapes(letter, size));
        geom.computeBoundingBox();
        const mesh = new THREE.Mesh(geom, mat);
        mesh.position.x = x;
        x += geom.boundingBox?.max?.x! + letterSpacing;
        y = Math.max(y, geom.boundingBox?.max?.y!);
        return mesh;
      }),
      [x, y],
    ];
  }, [children]);

  return (
    <group position={[-x / 2, -y / 2, 0]}>
      {shapes.map((shape, index) => (
        <primitive key={index} object={shape} />
      ))}
    </group>
  );
}

const Next = () => {
  const rotationX = useControl('Mega', {
    group: 'Test',
    type: 'number',
    spring: true,
  });
  return (
    <a.mesh position={[1.5, 0, 0]} rotation-x={rotationX}>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" />
    </a.mesh>
  );
};

const Box = () => {
  const ref = React.useRef<THREE.Mesh>();

  const rotationX = useControl('Rotate X', {
    group: 'Basic',
    type: 'number',
    spring: true,
  });

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
  const bool = useControl('Boolean', {
    group: 'More',
    type: 'boolean',
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
  const dropdown = useControl('Pick one', {
    group: 'More',
    type: 'select',
    items: ['foo', 'bar', 'baz'],
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
    },
  });

  const texture = useControl('Texture', {
    group: 'More',
    type: 'file',
    value: undefined,
    loader: new THREE.TextureLoader(),
  });

  useEffect(() => {
    if (ref.current) {
      (ref.current.material as THREE.Material).needsUpdate = true;
    }
  }, [texture]);

  return (
    <>
      <a.mesh
        ref={ref}
        position={[position.x, position.y, 0]}
        rotation-x={rotationX}
        rotation-y={rotationY}
      >
        <boxGeometry attach="geometry" args={[1, 1, 1]} />
        <a.meshPhongMaterial attach="material" map={texture} color={color} />
      </a.mesh>
      <Text>{str}</Text>
      {dropdown === 'bar' && <Next />}
    </>
  );
};

const Hello = () => {
  const a1 = useControl('1', { type: 'number' });
  const a2 = useControl('2', { type: 'number', max: 10 });
  const a3 = useControl('3', { type: 'number', min: -5, max: 5, value: -2.5 });
  const a4 = useControl('4', { type: 'number', min: 0, max: 200, value: 100 });
  const a5 = useControl('5', { type: 'number', scrub: true });
  const a6 = useControl('6', { type: 'number', scrub: true, distance: 1000 });
  return (
    <animated.div style={{ width: 180, background: 'orange', padding: 20 }}>
      <p>This is a div</p>
      <div>1: {a1}</div>
      <div>2: {a2}</div>
      <div>3: {a3}</div>
      <div>4: {a4}</div>
      <div>5: {a5}</div>
      <div>6: {a6}</div>
    </animated.div>
  );
};

const App = () => {
  return (
    <ControlsProvider>
      <Canvas style={{ width: 800, height: 600 }}>
        <ambientLight intensity={1} />
        <pointLight position={[0, 2, 2]} />
        <React.Suspense fallback={null}>
          <Box />
        </React.Suspense>
      </Canvas>
      <Hello />
      <Controls />
    </ControlsProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
