// Copyright (c) 2023 Michael Kolesidis (michael.kolesidis@gmail.com)
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Image, OrbitControls, Text, Float } from "@react-three/drei";
import { Rock } from "./Rock";
import { Paper } from "./Paper";
import { Scissors } from "./Scissors";
import useGame from "./stores/useGame.js";

export default function Game() {
  const [player, setPlayer] = useState(null);
  const [computer, setComputer] = useState(null);
  const [winner, setWinner] = useState(null);

  const options = ["rock", "paper", "scissors"];
  // Mode
  const mode = useGame((state) => state.mode);
  const setMode = useGame((state) => state.setMode);
  // Round
  const round = useGame((state) => state.round);
  const nextRound = useGame((state) => state.nextRound);
  const setRound = useGame((state) => state.setRound);
  const resetRound = useGame((state) => state.resetRound);
  // Phase
  const phase = useGame((state) => state.phase);
  const setPhase = useGame((state) => state.setPhase);
  const start = useGame((state) => state.start);
  const restart = useGame((state) => state.restart);
  const end = useGame((state) => state.end);
  // Current score
  const playerScore = useGame((state) => state.playerScore);
  const setPlayerScore = useGame((state) => state.setPlayerScore);
  const computerScore = useGame((state) => state.computerScore);
  const setComputerScore = useGame((state) => state.setComputerScore);
  // Total wins
  const playerWinsTotal = useGame((state) => state.playerWinsTotal);
  const setPlayerWinsTotal = useGame((state) => state.setPlayerWinsTotal);
  const computerWinsTotal = useGame((state) => state.computerWinsTotal);
  const setComputerWinsTotal = useGame((state) => state.setComputerWinsTotal);

  /**
   * Mode
   */
  const [limit, setLimit] = useState(null);

  useEffect(() => {
    switch (mode) {
      case "threeWins":
        setLimit(3);
        break;
      case "fiveWins":
        setLimit(5);
        break;
      case "sevenWins":
        setLimit(7);
        break;
      case "endless":
        setLimit(Infinity);
        break;
    }
  }, [mode]);

  /**
   * Game Logic
   */
  useEffect(() => {
    if (Number(round) === 0) {
      restart();

      if (window.localStorage.getItem("phase") === "ended") {
        window.localStorage.setItem("playerScore", 0);
        window.localStorage.setItem("computerScore", 0);
        window.localStorage.setItem("phase", "ready");
      }

      setPlayer(null);
      setComputer(null);
      setWinner(null);
    }

    if (Number(round) === 1) {
      start();
      window.localStorage.setItem("phase", "playing");
    }

    if (Number(playerScore) === limit || Number(computerScore) === limit) {
      end();
      window.localStorage.setItem("phase", "ended");
      // resetRound();
      window.localStorage.setItem("round", "0");

      if (winner === "player") {
        setPlayerWinsTotal(String(Number(playerWinsTotal) + 1));
        window.localStorage.setItem(
          "playerWinsTotal",
          String(Number(playerWinsTotal) + 1)
        );
      } else {
        setComputerWinsTotal(String(Number(computerWinsTotal) + 1));
        window.localStorage.setItem(
          "computerWinsTotal",
          String(Number(computerWinsTotal) + 1)
        );
      }
    }
  }, [round]);

  /**
   * Handle clicks and round winning conditions
   */
  const handleClick = (option) => {
    if (phase !== "ended") {
      nextRound();
      window.localStorage.setItem("round", String(Number(round) + 1));
      const computerOption =
        options[Math.floor(Math.random() * options.length)];

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
        setPlayerScore(String(Number(playerScore) + 1));
        window.localStorage.setItem("playerScore", Number(playerScore) + 1);
      } else {
        setWinner("computer");
        setComputerScore(String(Number(computerScore) + 1));
        window.localStorage.setItem("computerScore", Number(computerScore) + 1);
      }
    }
  };

  /**
   * Handle restart
   */
  const handleRestart = () => {
    restart();
    window.localStorage.setItem("phase", "ready");
    resetRound();
    window.localStorage.setItem("round", 0);
    setPlayerScore(0);
    window.localStorage.setItem("playerScore", 0);
    setComputerScore(0);
    window.localStorage.setItem("computerScore", 0);
  };

  /**
   * Objects
   */
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

  /**
   * Camera
   */
  let cameraY = window.innerWidth < 600 ? 8 : 5;

  /**
   * Storage and state initiation
   */
  useEffect(() => {
    // Mode
    let storedMode = window.localStorage.getItem("mode");
    if (storedMode !== null) {
      setMode(storedMode);
    } else {
      window.localStorage.setItem("mode", "fiveWins");
    }

    // Round
    let storedRound = window.localStorage.getItem("round");
    if (storedRound !== null) {
      setRound(storedRound);
    } else {
      window.localStorage.setItem("round", 0);
    }

    // Phase
    let storedPhase = window.localStorage.getItem("phase");
    if (storedPhase !== null) {
      if (storedPhase === "ended") {
        handleRestart();
      }
      setPhase(storedPhase);
    } else {
      window.localStorage.setItem("phase", "ready");
    }

    // Player current score
    let storedPlayerScore = window.localStorage.getItem("playerScore");
    if (storedPlayerScore !== null) {
      setPlayerScore(storedPlayerScore);
    } else {
      window.localStorage.setItem("playerScore", 0);
    }

    // Computer current score
    let storedComputerScore = window.localStorage.getItem("computerScore");
    if (storedComputerScore !== null) {
      setComputerScore(storedComputerScore);
    } else {
      window.localStorage.setItem("computerScore", 0);
    }

    // Player total wins
    let storedPlayerWinsTotal = window.localStorage.getItem("playerWinsTotal");
    if (storedPlayerWinsTotal !== null) {
      setPlayerWinsTotal(storedPlayerWinsTotal);
    } else {
      window.localStorage.setItem("playerWinsTotal", 0);
    }

    // Computer total wins
    let storedComputerWinsTotal =
      window.localStorage.getItem("computerWinsTotal");
    if (storedComputerWinsTotal !== null) {
      setComputerWinsTotal(storedComputerWinsTotal);
    } else {
      window.localStorage.setItem("computerWinsTotal", 0);
    }
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
      <OrbitControls />
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
      <Float rotationIntensity={1} floatIntensity={0.25}>
        {player && (
          <Text
            position={[0, 2.5, 0]}
            fontSize={0.4}
            font="./fonts/nickname.otf"
            color={0x313131}
          >
            You chose {player}
          </Text>
        )}
        {computer && (
          <Text
            position={[0, 2, 0]}
            fontSize={0.4}
            font="./fonts/nickname.otf"
            color={0x313131}
          >
            Computer chose {computer}
          </Text>
        )}
        {winner && (
          <Text
            position={[0, 1, 0]}
            fontSize={0.7}
            font="./fonts/nickname.otf"
            color={0x313131}
          >
            {winner === "tie"
              ? `It is a tie!`
              : winner === "player"
              ? `You win${phase !== "ended" ? "!" : ""}`
              : `Computer wins${phase !== "ended" ? "!" : ""}`}
          </Text>
        )}
        {phase === "ended" && (
          <>
            <Text
              position={[0, 0.2, 0]}
              fontSize={1}
              font="./fonts/nickname.otf"
              color={0x313131}
            >
              The Game!
            </Text>
            <Text
              position={[0, -0.3, 0]}
              fontSize={0.17}
              font="./fonts/nickname.otf"
              color={0x313131}
            >
              (You have won {playerWinsTotal} games in total and computer has
              won {computerWinsTotal})
            </Text>
            <Image
              url="./icons/replay.png"
              position={[0, -0.8, 0]}
              scale={[0.6, 0.6, 0.6]}
              transparent
              opacity={0.75}
              onClick={() => handleRestart()}
              onPointerOver={handleHover}
              onPointerOut={handleUnhover}
            />
          </>
        )}
      </Float>
    </Canvas>
  );
}
