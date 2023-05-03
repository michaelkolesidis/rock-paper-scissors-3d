import React, { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";

export const Paper = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF("./models/paper.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        ref={ref}
        name="Cube_Cube001"
        castShadow
        receiveShadow
        geometry={nodes.Cube_Cube001.geometry}
        material={materials["Material.000"]}
      />
    </group>
  );
});

useGLTF.preload("./models/paper.glb");
