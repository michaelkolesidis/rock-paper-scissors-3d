import { forwardRef, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export const Scissors = (props) => {
  const { nodes, materials } = useGLTF("./models/scissors.glb");

  const scissors = useRef();

  useFrame((state, delta) => {
    scissors.current.rotation.z += delta * 0.25;
  });

  return (
    <group {...props} dispose={null}>
      <group
        name="Scissors1"
        ref={scissors}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      >
        <mesh
          name="Scissors1_1"
          castShadow
          receiveShadow
          geometry={nodes.Scissors1_1.geometry}
          material={materials.Handle1Scissors1}
        />
        <mesh
          name="Scissors1_2"
          castShadow
          receiveShadow
          geometry={nodes.Scissors1_2.geometry}
          material={materials.Steel1Scissors1}
        />
      </group>
    </group>
  );
};

useGLTF.preload("./models/scissors.glb");
