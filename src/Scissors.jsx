import React, { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";

export const Scissors = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF("./models/scissors.glb");
  return (
    <group {...props} dispose={null}>
      <group
        name="Scissors1"
        ref={ref}
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
});

useGLTF.preload("./models/scissors.glb");
