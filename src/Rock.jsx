import { forwardRef, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export const Rock = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF("./models/rock.glb");

  const rock = useRef();

  useFrame((state, delta) => {
    rock.current.rotation.y += delta * 0.25;
  });

  return (
    <group {...props} ref={rock} dispose={null}>
      <mesh
        ref={ref}
        name="rock"
        castShadow
        receiveShadow
        geometry={nodes.Rock.geometry}
        material={materials.Stone}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  );
});

useGLTF.preload("./models/rock.glb");
