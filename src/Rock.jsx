import React, { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";

export const Rock = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF("./models/rock.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        ref={ref}
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
});

useGLTF.preload("./models/rock.glb");
