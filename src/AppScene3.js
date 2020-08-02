import * as THREE from "three";
import React, { useState, useRef, useEffect, Suspense } from "react";
import { OrbitControls } from "drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, useFrame, useLoader } from "react-three-fiber";
import "./App.css";

// https://sketchfab.com/3d-models/indoorflower-241421729f38400cad10e6905bbb0de5
function Plant(props) {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.y += 0.01;
  });
  const gltf = useLoader(GLTFLoader, "/plant/scene.gltf");
  return (
    <primitive
      dispose={null} //this is required to get the router to work
      ref={ref}
      object={gltf.scene}
      position={[0, -1, 0]}
      rotation-x={0.1}
    />
  );
}

function Scene() {
  return (
    <>
      <ambientLight />
      {/* <pointLight intensity={0.6} position={[0, 10, 4]} /> */}
      <pointLight intensity={2} position={[0, 20, 0]} />
      <pointLight intensity={2} position={[0, -20, 0]} />
      <Suspense fallback={null}>
        <Plant />
      </Suspense>
      <OrbitControls enableZoom={false} />
    </>
  );
}

function AppScene3() {
  return (
    <>
      <Canvas camera={{}}>
        <Scene />
      </Canvas>
    </>
  );
}

export default AppScene3;
