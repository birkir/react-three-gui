import * as React from 'react';
import 'react-app-polyfill/ie11';
import { Engine, Scene, useCustomPropsHandler, ICustomPropsHandler, CustomPropsHandler, PropChangeType, PropertyUpdateProcessResult, CreatedInstance } from 'react-babylonjs';
import { animated as a } from 'react-babylon-spring';
import { Vector3, AbstractMesh, Color3, Color4, Texture, Mesh } from '@babylonjs/core';
import { ControlsProvider, Controls, useControl } from '../src';
import { Types } from '../types';
import { ControlsContext } from '../src/contexts/controls-context';

import './babylon.css';

class CustomVector3ArrayHandler implements ICustomPropsHandler<number[], Vector3> {
    get name() {
        return 'testing:Vector3Array'
    }

    public propChangeType: string = PropChangeType.Vector3;

    accept(newProp: []): boolean {
        return Array.isArray(newProp);
    }

    process(oldProp: number[], newProp: number[]): PropertyUpdateProcessResult<Vector3> {

        if (oldProp === undefined || oldProp.length !== newProp.length) {
            console.log(`found diff length (${oldProp?.length}/${newProp?.length}) Color3Array new? ${oldProp === undefined}`)
            return {
                processed: true,
                value: Vector3.FromArray(newProp)
            };
        }

        for (let i = 0; i < oldProp.length; i++) {
            if (oldProp[i] !== newProp[i]) {
                console.log(`found diff value (${oldProp[i]} -> ${newProp[i]}) Color3Array new? index: ${i}`)
                return {
                    processed: true,
                    value: Vector3.FromArray(newProp)
                };
            }
        }

        return { processed: false, value: null };
    }
}

CustomPropsHandler.RegisterPropsHandler(new CustomVector3ArrayHandler());

const Next = () => {
    const rotationX = useControl('Mega', { group: 'Test', type: 'number', spring: true });
    return (
        <a.box name='next-box' position={new Vector3(1.5, 0, 0)} rotation-x={rotationX}>
            <a.standardMaterial />
        </a.box>
    )
};

const Box = () => {
    console.log('rendering box')
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

    const ref = React.useRef<CreatedInstance<AbstractMesh>>();

    return (
        <>
            <a.box
                size={size}
                ref={ref}
                name='box1'
                position={[position.x, -position.y, 0]}
                rotation-x={rotationX}
                rotation-y={rotationY}
            >
                <a.standardMaterial name='box1mat' emissiveColor={Color3.FromHexString(color)} />
            </a.box>
            <plane name="dialog" size={10} position={new Vector3(0, 0, 2)} sideOrientation={Mesh.BACKSIDE}>
                <advancedDynamicTexture
                    name="dialogTexture"
                    height={1024} width={1024}
                    createForParentMesh={true}
                    generateMipMaps={true}
                    samplingMode={Texture.TRILINEAR_SAMPLINGMODE}
                >
                    <rectangle name="rect-1" height={0.5} width={1}>
                        <textBlock text={str} fontSize={120} color="black" />
                    </rectangle>
                </advancedDynamicTexture>
            </plane>
            {dropdown === 'bar' && <Next />}
        </>
    )
}


export const Babylon = () => {
    const [controls, setControls] = React.useState<ControlItem[]>([]);
    // Persist values between reloads
    const values = React.useRef(new Map());
    // GUI control state setters
    const gui = React.useRef(new Map());
    // useControl state setters
    const state = React.useRef(new Map());
    const context = {
        values,
        gui,
        state,
        controls,
        addControl: (control: ControlItem) => {
            control.id = String(Math.random());
            setControls(ctrls => {
                // control.id = control.id ?? String(ctrls.length);
                return [...ctrls, control];
            });
            return control;
        },
        removeControl: (ctrl: ControlItem) => {
            setControls(ctrls => ctrls.filter(c => c.id !== ctrl.id));
        },
    };


    return (
        <ControlsContext.Provider value={context}>
            <ControlsContext.Consumer>
                {value => (
                    <Engine antialias adaptToDeviceRatio canvasId='babylonCanvas'>
                        <Scene clearColor={new Color4(1, 1, 1, 0)} >
                            <pointLight name='pointLight' position={new Vector3(0, 2, 2)} intensity={0.2} />
                            <hemisphericLight name='hemiLight' intensity={0.7} direction={Vector3.Up()} />
                            <arcRotateCamera name="camera" target={new Vector3(0, 1, 0)} minZ={0.001}
                                alpha={-Math.PI / 2} beta={(0.5 + (Math.PI / 4))} radius={5} />
                            <ControlsContext.Provider value={value}>
                                <Box />
                            </ControlsContext.Provider>

                        </Scene>
                    </Engine>
                )}
            </ControlsContext.Consumer>
            <Controls />
        </ControlsContext.Provider>
    );
};