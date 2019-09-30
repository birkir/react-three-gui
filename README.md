# react-three-gui

A graphical user interface for changing variable states in React.

## Examples

https://codesandbox.io/s/react-three-fiber-gui-62pvp

## Usage

Basic example

```tsx
import { Controls, useControl } from 'react-three-gui';

export const App = () => {
  const rotationX = useControl('Rotation X', { type: 'number' });
  return (
     <>
       <Canvas>
         <mesh rotation-x={rotationX} />
       </Canvas>
       <Controls />
     </>
   );
};
```

Also possible to pass in your own state:
```tsx
const [value, set] = useState(0);

useControl('Adjust value', {
  type: 'number',
  state: [value, set],
});
```

### Supported controls
- number
- xypad
- boolean
- button
- color
- select

### Future plans

- [ ] Support custom control components
- [ ] Support passing refs and directly manipulate THREE objects
- [ ] Use Context instead of global Map<>
- [ ] Groups
- [ ] Draggable/Collapsable widget
- [ ] Multi platform?
