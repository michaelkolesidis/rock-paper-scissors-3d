import { forwardRef, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export const Scissors = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF("./models/scissors.glb");

  const scissors = useRef();

  useFrame((state, delta) => {
    scissors.current.rotation.y += delta * 0.5;
  });

  return (
    <group {...props} ref={scissors} dispose={null}>
      <group
        name="scissors_group"
        ref={ref}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      >
        <mesh
          name="scissors"
          castShadow
          receiveShadow
          geometry={nodes.Scissors1_1.geometry}
          material={materials.Handle1Scissors1}
        />
        <mesh
          name="scissors"
          castShadow
          receiveShadow
          geometry={nodes.Scissors1_2.geometry}
          material={materials.Steel1Scissors1}
        />
      </group>
    </group>
  );
});

useGLTF.preload("./models/scissors.glb");
