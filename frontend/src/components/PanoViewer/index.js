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
import t from './tiny.jpg';
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

//todo
//texture is flipped
function Dome() {
  const texture = useLoader(THREE.TextureLoader, t);
  return (
    <mesh>
      <sphereBufferGeometry attach='geometry' args={[500, 60, 40]} />
      <meshBasicMaterial
        attach='material'
        map={texture}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

const PanoViewer = () => {
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
          <Dome />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default PanoViewer;
