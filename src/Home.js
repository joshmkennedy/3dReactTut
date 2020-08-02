import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import * as THREE from "three";

function Swarm({ count }) {
  const ref = useRef();
  const tempObj = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const particleBucket = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -20 + Math.random() * 15;
      const yFactor = -17 + Math.random() * 15;
      const zFactor = -10 + Math.random() * 15;
      particleBucket.push({
        t,
        factor,
        speed,
        xFactor,
        yFactor,
        zFactor,
      });
    }
    return particleBucket;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, index) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const objectSize = Math.max(1.5, Math.cos(t) * 5);
      tempObj.position.set(
        a +
          xFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 1) * factor) / 10,
        b +
          yFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 2) * factor) / 10,
        b +
          zFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 3) * factor) / 10
      );
      tempObj.scale.set(objectSize, objectSize, objectSize);

      tempObj.updateMatrix();
      ref.current.setMatrixAt(index, tempObj.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[null, null, count]}>
      <sphereBufferGeometry attach="geometry" args={[0, 32, 32]} />
      <meshStandardMaterial attach="material" color="pink" />
    </instancedMesh>
  );
}

export default function Home() {
  return (
    <div
      style={{
        paddingTop: "3em",
        display: "grid",
        width: "100vw",
        height: "100vh",
        gridTemplate: "1fr / 1fr",
        background: "lightpink",
      }}
    >
      <Canvas
        camera={{ fov: 40, position: [0, 0, 70] }}
        style={{ marginTop: 0, gridArea: "1 / 1" }}
      >
        <Scene />
      </Canvas>
      <div className="content" style={{ gridArea: "1 / 1" }}>
        <h2
          style={{
            marginTop: 100,
            fontSize: "5em",
            marginLeft: "auto",
            width: "50%",
            minWidth: "300px",
            color: "lightpink",
            textShadow: "0 0 70px #953443, 0 0 10px #953443",
          }}
        >
          A React 3d Example
        </h2>
      </div>
    </div>
  );
}
function Scene() {
  return (
    <>
      <ambientLight />
      <pointLight intensity={0.3} position={[-20, 40, 4]} />
      <pointLight intensity={0.2} position={[20, 40, -20]} />
      <pointLight intensity={0.2} position={[20, -40, -10]} />
      <Swarm count={130} />
    </>
  );
}
