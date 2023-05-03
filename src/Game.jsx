import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Text3D, Float } from "@react-three/drei";
import { Rock } from "./Rock";
import { Paper } from "./Paper";
import { Scissors } from "./Scissors";

export default function Game() {
  const [player, setPlayer] = useState(null);
  const [computer, setComputer] = useState(null);
  const [winner, setWinner] = useState(null);

  const options = ["rock", "paper", "scissors"];

  const handleClick = (option) => {
    const computerOption = options[Math.floor(Math.random() * options.length)];

    setPlayer(option);
    setComputer(computerOption);

    if (option === computerOption) {
      setWinner("tie");
    } else if (
      (option === "rock" && computerOption === "scissors") ||
      (option === "paper" && computerOption === "rock") ||
      (option === "scissors" && computerOption === "paper")
    ) {
      setWinner("player");
    } else {
      setWinner("computer");
    }
  };

  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) {
      // document.body.style.cursor = "pointer";
    } else {
      // document.body.style.cursor = "auto";
    }
  }, [hovered]);

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Rock
        position={[-2, -2.35, 0]}
        scale={[5, 5, 5]}
        onClick={() => handleClick("rock")}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
      <Paper
        position={[0, -2, 0]}
        rotation={[0, Math.PI / 4, 0]}
        onClick={() => handleClick("paper")}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
      <Scissors
        position={[2, -2.3, 0]}
        scale={[5.5, 5.5, 5.5]}
        onClick={() => handleClick("scissors")}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
      <OrbitControls />
      <Float rotationIntensity={1} floatIntensity={0.25}>
        {player && (
          <Text
            position={[0, 2.5, 0]}
            fontSize={0.4}
            font="./fonts/nickname.otf"
            color="black"
          >
            You chose {player},
          </Text>
        )}
        {computer && (
          <Text
            position={[0, 2, 0]}
            fontSize={0.4}
            font="./fonts/nickname.otf"
            color="black"
          >
            Computer {computer}.
          </Text>
        )}
        {winner && (
          <Text
            position={[0, 1, 0]}
            fontSize={0.7}
            font="./fonts/nickname.otf"
            color="black"
          >
            {winner === "tie"
              ? "It is a tie!"
              : winner === "player"
              ? "You win!"
              : "Computer wins!"}
          </Text>
        )}
      </Float>
    </Canvas>
  );
}
