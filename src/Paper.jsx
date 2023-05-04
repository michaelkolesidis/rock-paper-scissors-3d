import { forwardRef, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export const Paper = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF("./models/paper.glb");

  const paper = useRef();

  useFrame((state, delta) => {
    paper.current.rotation.y += delta * 0.25;
  });

  return (
    <group {...props} ref={paper} dispose={null}>
      <mesh
        ref={ref}
        name="paper"
        castShadow
        receiveShadow
        geometry={nodes.Cube_Cube001.geometry}
        material={materials["Material.000"]}
      />
    </group>
  );
});

useGLTF.preload("./models/paper.glb");
