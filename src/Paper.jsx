import { forwardRef, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export const Paper = (props) => {
  const { nodes, materials } = useGLTF("./models/paper.glb");

  const paper = useRef();

  useFrame((state, delta) => {
    paper.current.rotation.y += delta * 0.25;
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={paper}
        name="Cube_Cube001"
        castShadow
        receiveShadow
        geometry={nodes.Cube_Cube001.geometry}
        material={materials["Material.000"]}
      />
    </group>
  );
};

useGLTF.preload("./models/paper.glb");
