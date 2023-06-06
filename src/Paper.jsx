// Copyright (c) 2023 Michael Kolesidis <michael.kolesidis@gmail.com>
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import { forwardRef, useRef } from "react";
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
