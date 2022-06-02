//https://codesandbox.io/s/r3f-sky-dome-dgbmm?file=/src/index.js:64-112
import * as THREE from 'three';
import {
  Canvas,
  extend,
  useFrame,
  useThree,
  useLoader,
} from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import React, { Suspense, useRef, useState } from 'react';
import styles from './styles.module.scss';

extend({ OrbitControls });

function Controls(props) {
  const { camera, gl } = useThree();
  const ref = useRef();
  useFrame(() => ref.current.update());
  return (
    <orbitControls
      ref={ref}
      target={[0, 0, 0]}
      {...props}
      args={[camera, gl.domElement]}
    />
  );
}

function Dome({ texture }) {
  const t = useLoader(THREE.TextureLoader, texture);

  //mesh or texture is flipped for some reason, flipping back
  const scale = new THREE.Vector3(1, 1, 1);
  scale.x *= -1;
  return (
    <mesh scale={scale}>
      <sphereBufferGeometry attach='geometry' args={[500, 60, 40]} />
      <meshBasicMaterial attach='material' map={t} side={THREE.BackSide} />
    </mesh>
  );
}

const PanoViewer = ({ projection }) => {
  console.log(projection);
  const [interactedWithCanvas, setInteractedWithCanvas] = useState(false);
  return (
    <div
      className={styles['pano-viewer-wrapper']}
      style={{ paddingBottom: `${(9 / 16) * 100}%` }}
    >
      <Canvas
        camera={{ position: [0, 0, 0.1] }}
        onClick={() => setInteractedWithCanvas(true)}
        className={styles.canvas}
      >
        <Controls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.2}
          autoRotate={!interactedWithCanvas}
          rotateSpeed={-0.2}
        />
        <Suspense fallback={null}>
          <Dome texture={projection} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default PanoViewer;
