import { forwardRef, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export const Rock = (props) => {
  const { nodes, materials } = useGLTF("./models/rock.glb");

  const rock = useRef();

  useFrame((state, delta) => {
    rock.current.rotation.z += delta * 0.25;
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={rock}
        name="Rock"
        castShadow
        receiveShadow
        geometry={nodes.Rock.geometry}
        material={materials.Stone}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  );
};

useGLTF.preload("./models/rock.glb");
