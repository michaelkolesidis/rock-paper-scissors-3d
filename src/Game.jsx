import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Text3D, Float } from "@react-three/drei";
import { Rock } from "./Rock";
import { Paper } from "./Paper";
import { Scissors } from "./Scissors";
import useGame from "./stores/useGame.js";

export default function Game() {
  const [player, setPlayer] = useState(null);
  const [computer, setComputer] = useState(null);
  const [winner, setWinner] = useState(null);

  const options = ["rock", "paper", "scissors"];

  const round = useGame((state) => state.round);
  const nextRound = useGame((state) => state.nextRound);
  const setRound = useGame((state) => state.setRound);
  const resetRound = useGame((state) => state.resetRound);

  const handleClick = (option) => {
    nextRound();
    window.localStorage.setItem("round", String(Number(round) + 1))
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

  const rock = useRef();
  const paper = useRef();
  const scissors = useRef();

  const [hovered, setHovered] = useState(false);

  const handleHover = (e) => {
    e.stopPropagation();
    setHovered(true);
  };

  const handleUnhover = (e) => {
    e.stopPropagation();
    setHovered(false);
  };

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "default";
    }
  }, [hovered]);

  let cameraY = window.innerWidth < 600 ? 8 : 5;

  // Storage
  const playerWinsTotal = useGame((state) => state.playerWinsTotal);
  const setplayerWinsTotal = useGame((state) => state.setplayerWinsTotal);
  const computerWinsTotal = useGame((state) => state.computerWinsTotal);
  const setComputerWinsTotal = useGame((state) => state.setComputerWinsTotal);
  const playerScore = useGame((state) => state.playerScore);
  const setPlayerScore = useGame((state) => state.setPlayerScore);
  const computerScore = useGame((state) => state.computerScore);
  const setComputerScore = useGame((state) => state.setComputerScore);

  useEffect(() => {
    // Round
    let storedRound = window.localStorage.getItem("round");
    console.log(storedRound);

    if (storedRound !== null) {
      setRound(storedRound);
    } else {
      window.localStorage.setItem("round", 0);
    }

    // // Total wins - player
    // playerWinsTotal = window.localStorage.getItem("playerWinsTotal");
    // if (playerWinsTotal === null) {
    //   playerWinsTotal = 0;
    //   window.localStorage.setItem("playerWinsTotal", 0);
    // }
    // // Totals wins - computer
    // computerWinsTotal = window.localStorage.getItem("computerWinsTotal");
    // if (computerWinsTotal === null) {
    //   computerWinsTotal = 0;
    //   window.localStorage.setItem("computerWinsTotal", 0);
    // }
    // // Player current score
    // playerScore = window.localStorage.getItem("playerScore");
    // if (playerScore === null) {
    //   playerScore = 0;
    //   window.localStorage.setItem("playerScore", 0);
    // }
    // // Computer current score
    // computerScore = window.localStorage.getItem("computerScore");
    // if (computerScore === null) {
    //   computerScore = 0;
    //   window.localStorage.setItem("computerScore", 0);
    // }
  }, []);

  return (
    <Canvas
      camera={{
        // fov: 45,
        near: 0.1,
        far: 50,
        position: [0, 0, cameraY],
      }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Rock
        ref={rock}
        position={[-2, -2.35, 0]}
        scale={[5, 5, 5]}
        onClick={() => handleClick("rock")}
        onPointerOver={handleHover}
        onPointerOut={handleUnhover}
      />
      <Paper
        ref={paper}
        position={[0, -2, 0]}
        rotation={[0, Math.PI / 4, 0]}
        onClick={() => handleClick("paper")}
        onPointerOver={handleHover}
        onPointerOut={handleUnhover}
      />
      <Scissors
        ref={scissors}
        position={[2, -2.3, 0]}
        scale={[5.5, 5.5, 5.5]}
        onClick={() => handleClick("scissors")}
        onPointerOver={handleHover}
        onPointerOut={handleUnhover}
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
            You chose {player}
          </Text>
        )}
        {computer && (
          <Text
            position={[0, 2, 0]}
            fontSize={0.4}
            font="./fonts/nickname.otf"
            color="black"
          >
            Computer chose {computer}
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
