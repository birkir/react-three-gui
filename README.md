# react-three-gui

A graphical user interface for changing variable states in React.

## Examples

https://codesandbox.io/s/react-three-fiber-gui-62pvp

![Example](https://media.giphy.com/media/hrvUiMXTTu1aEprRhj/giphy.gif)

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

Use the spring option to return a react-spring value:
```tsx
useControl('My ctrl', {
  type: 'number',
  spring: true,
})

// or pass a react-spring configuration value

useControl('My ctrl', {
  type: 'number',
  spring: { mass: 5, tension: 280, friction: 50 },
})
```

Also possible to pass in your own state:
```tsx
const [value, set] = useState(0);

useControl('Adjust value', {
  type: 'number',
  state: [value, set],
});
```

Also you can pass your own control component:
```tsx
const MyControl = ({ control, value }) => (
  <input
    type="number"
    onChange={e => control.set(e.currentTarget.value)}
    value={value}
  />
);

useControl('Test', {
  type: 'custom',
  value: 2,
  component: MyControl,
});
```

### Supported controls

- number
  - min/max
  - `scrub` for scrubbing option
  - `distance` for configuring scroll distance
  - Returns `number`
- xypad
  - min/max
  - `scrub` for scrubbing option
  - `distance` for configuring scroll distance
  - Returns `{ x: number, y: number }` object
- boolean
  - Returns `boolean`
- button
  - `onPress` option is the callback function
  - Returns `void`
- color
  - Returns `string` (as hex: #ffffff)
- select
  - Has `items: string[]` option to define list of options
  - Returns `string`
- string
  - Returns `string`

### Future plans

- [x] Support custom control components
- [ ] Support passing refs and directly manipulate THREE objects
- [x] Groups
- [x] Draggable Widget
- [ ] Collapsable widget
- [ ] Multi platform?
