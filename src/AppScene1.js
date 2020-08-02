import React, { useState, useRef, Suspense } from "react";
import "./App.css";
import { OrbitControls } from "drei";
import { Canvas, useFrame, useLoader } from "react-three-fiber";
import { a, useSpring } from "react-spring/three";

import { TextureLoader } from "three";
import LogoURL from "./assets/logo.png";
import LogoBWURL from "./assets/logoDisp.png";
function Cube(props) {
  const ref = useRef(null);
  useFrame(() => {
    ref.current.rotation.y += 0.01;
  });
  const [isBig, setIsbBig] = useState(false);
  const { size } = useSpring({ size: isBig ? [2, 2, 2] : [1, 1, 1] });

  const texture = useLoader(TextureLoader, LogoURL);
  const bumbMapTexure = useLoader(TextureLoader, LogoBWURL);
  return (
    <a.mesh
      {...props}
      onClick={() => setIsbBig((prev) => !prev)}
      scale={size}
      ref={ref}
      castShadow={true}
      receiveShadow={true}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1, 60, 60, 60]} />
      <meshPhongMaterial
        map={texture}
        displacementMap={bumbMapTexure}
        displacementScale={0.05}
        flatShading={true}
        attach="material"
        roughness={1}
        metalness={0.5}
        reflectivity={10}
        shininess={100}
      />
    </a.mesh>
  );
}

function Plane() {
  return (
    <mesh
      receiveShadow={true}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2, -5]}
    >
      <planeBufferGeometry attach="geometry" args={[20, 20]} />
      <meshPhongMaterial attach="material" color="#d3d3d3" />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight />
      <pointLight castShadow={true} position={[0, 3, 0]} intensity={0.5} />
      <Suspense fallback={null}>
        <Cube rotation={[1, 1, 0.3]} position={[0, 0, 0]} />
      </Suspense>
      <Suspense fallback={null}>
        <Cube rotation={[0.7, 0.5, 0.3]} position={[2, 2, 0]} />
      </Suspense>
      <Plane />
      <OrbitControls />
    </>
  );
}

function AppScene1() {
  return (
    <>
      <Canvas shadowMap={true}>
        <Scene />
      </Canvas>
      {/* <Controls /> */}
    </>
  );
}

export default AppScene1;
